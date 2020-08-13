import React from 'react';
import {PushNotificationIOS, NativeModules, AsyncStorage, Alert, Linking} from 'react-native';
import connect from 'react-redux/es/connect/connect';
import {fromJS} from 'immutable';
import firebase from 'react-native-firebase';
import VersionNumber from 'react-native-version-number';

import {JJAppConfig} from '../../config/JJAppConfig';
import WelcomeNewVersionView from './WelcomeNewVersionView';
import IOSNotificationGuideView from './IOSNotificationGuideView';
import SplashLoadingView from './SplashLoadingView';
import {fetchLocationSupport, provinceChanged} from '../../../utils/locationmanager/action';
import {AnalyticsUtil} from '../../common/analytics/analytics';
import {commonApi} from '../../../api/common-api';
import {fetcherConfig} from '../../../api/fetcher';
import {loginUserSuccess} from '../../login/action';
import {StringUtil} from '../../../utils/string-util';
import {ObjectUtil} from '../../../utils/object-utils';
import {AppInfo} from '../../../common/native/AppInfo';

import {RealmDbHelper} from '../../../api/storage/RealmDbHelper';
import {UserDb} from '../../../api/storage/UserDb';
import {STORAGE} from '../../../const';
import {ConfigDb} from '../../../api/storage/ConfigDb';
import {CouponDb} from '../../../api/storage/CouponDb';
import {NativeCommon} from '../../../common/native/NativeCommon';
import {updateEventConfig} from '../repo/action';
import {FIREBASE_CONFIGS, KEY, PARAMS} from '../../../common/config/key_configs';

import BaseScreen from '../../../common/base/BaseScreen';
import {AppConfig} from '../../../common/config';

const ios = AppConfig.ios;
const TAG = 'SplashScreen';

class SplashScreen extends BaseScreen {
    TAG = 'SplashScreen';
    finishOnboardFlows = false;
    finishInitDataProcess = false;
    currentConfig;

    didCheckFirebaseConfig = false;
    didInitDataConfig = false;

    eventConfig;

    constructor() {
        super();
        this.state = {
            status: 'init'
        };
    }

    render() {
        switch (this.state.status) {
            case 'waiting_ios_notification_permission':
                return (
                    <IOSNotificationGuideView
                        onAllowPressed={this._onIOSAllowNotificationPermission}
                        onDenyPressed={this._onIODenyNotificationPermission}
                    />
                );
            case 'show_welcome_view':
                return <WelcomeNewVersionView onPress={this._onBoardFLowsSuccess}/>;

            default:
                return <SplashLoadingView/>;
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._checkFirebaseConfig();

        if (RealmDbHelper.getRealm().empty) {
            console.debug(`${TAG}:start migrate db`);
            this._migrateDb();
            return;
        }
        console.debug(`${TAG}:start init data flows`);
        this._startInitDataFlows();
    }

    _initCompleted = () => {
        try {
            !!NativeCommon.initCompleted && NativeCommon.initCompleted();
        } catch (e) {
            console.debug(e);
        }
    };

    _migrateDb = () => {
        console.debug(`${TAG}:_migrateDb`);

        AsyncStorage.getAllKeys()
            .then(keys => {
                try {
                    console.debug(`${TAG}:getAllKeys:keys`, keys);
                    if (!!keys && keys.length > 0) {
                        this._migrateUserInAsyncStorage();
                    } else {
                        this._migrateOldDbToRealmDb();
                    }
                } catch (e) {
                    console.debug(e);
                    AnalyticsUtil.logCrash(e, 0, '_migrateDb_write');
                    this._migrateOldDbToRealmDb();
                }
            })
            .catch(error => {
                console.debug(`${TAG}:getAllKeys:error`, error);
                AnalyticsUtil.logCrash(error, 0, '_migrateDb_read');
                this._migrateOldDbToRealmDb();
            });
    };

    _migrateOldDbToRealmDb = () => {
        const oldUserStorage = NativeModules.OldUserStorage;
        console.debug(`${TAG}:_migrateOldDbToRealmDb`, oldUserStorage);
        if (StringUtil.isEmpty(oldUserStorage) || StringUtil.isEmpty(oldUserStorage.userId)) {
            this._startInitDataFlows();
            return;
        }

        const user = {
            access_token: oldUserStorage.accessToken,
            avatar: oldUserStorage.userAvatar,
            email: oldUserStorage.userEmail,
            full_name: oldUserStorage.userDisplayName,
            id: oldUserStorage.userId,
            phone_number: oldUserStorage.userPhone,
            token_type: oldUserStorage.tokenType
        };
        UserDb.set(user);
        this._startInitDataFlows();
    };

    _migrateUserInAsyncStorage = () => {
        console.debug(`${TAG}:_migrateUserInAsyncStorage`);
        AsyncStorage.getItem(`${STORAGE}:current_user`)
            .then(response => {
                let user = {};
                try {
                    user = JSON.parse(response);
                } catch (e) {
                    console.debug(e);
                }
                console.debug(`${TAG}:_migrateUserInAsyncStorage:response`, user);
                if (!!user && !!user.id && !!user.access_token) {
                    UserDb.set(user);
                }
                this._migrateUserConfigInAsyncStorage();
            })
            .catch(error => {
                console.debug(`${TAG}:_migrateUserInAsyncStorage:error`, error);
                AnalyticsUtil.logCrash(error, 0, '_migrateUserInAsyncStorage');
                this._migrateUserConfigInAsyncStorage();
            });
    };

    _migrateUserConfigInAsyncStorage = () => {
        const keys = [
            `${STORAGE}:did_show_save_deal_popover`,
            `${STORAGE}:current_selected_city`,
            `${STORAGE}:login:one_signal_player`,
            `${STORAGE}:filter_button_popover_visible`,
            `${STORAGE}:tab_discovery_button_popover_visible`,
            `${STORAGE}:tab_booking_button_popover_visible`,
            `${STORAGE}:booking_change_date_button_popover_visible`
        ];
        AsyncStorage.multiGet(keys)
            .then(response => {
                console.debug(`${TAG}:_migrateUserConfigInAsyncStorage:multiGet:response`, response);
                let config = {};
                try {
                    if (!!response && response.length > 0) {
                        response.map((item, index) => {
                            try {
                                switch (item[0]) {
                                    case `${STORAGE}:did_show_save_deal_popover`:
                                        config.show_save_deal_popover = !StringUtil.isEmpty(item[1]);
                                        break;

                                    case `${STORAGE}:current_selected_city`:
                                        try {
                                            if (StringUtil.isEmpty(item[1])) {
                                                config.selected_province = {name: 'Hà Nội', id: 'ha-noi'};
                                            } else {
                                                config.selected_province = JSON.parse(item[1]);
                                            }
                                        } catch (e) {
                                            console.debug(e);
                                            config.selected_province = {name: 'Hà Nội', id: 'ha-noi'};
                                        }
                                        break;

                                    case `${STORAGE}:login:one_signal_player`:
                                        try {
                                            config.one_signal = JSON.parse(item[1]);
                                        } catch (e) {
                                            console.debug(e);
                                        }
                                        break;

                                    case `${STORAGE}:filter_button_popover_visible`:
                                        config.filter_button_popover_visible = !StringUtil.isEmpty(item[1]);
                                        break;

                                    case `${STORAGE}:tab_discovery_button_popover_visible`:
                                        config.tab_discovery_button_popover_visible = !StringUtil.isEmpty(item[1]);
                                        break;

                                    case `${STORAGE}:tab_booking_button_popover_visible`:
                                        config.tab_booking_button_popover_visible = !StringUtil.isEmpty(item[1]);
                                        break;

                                    case `${STORAGE}:booking_change_date_button_popover_visible`:
                                        config.booking_change_date_button_popover_visible = !StringUtil.isEmpty(item[1]);
                                        break;
                                }
                            } catch (e) {
                                console.debug(e);
                                AnalyticsUtil.logCrash(e, 0, '_migrateUserConfigInAsyncStorage_migrating');
                            }
                        });
                    }
                } catch (e) {
                    console.debug(e);
                    AnalyticsUtil.logCrash(e, 0, '_migrateUserConfigInAsyncStorage_migrating_2');
                }
                this._migrateConfigInAsyncStorage(config);
            })
            .catch(error => {
                console.debug(`${TAG}:_migrateUserConfigInAsyncStorage:multiGet:error`, error);
                AnalyticsUtil.logCrash(e, 0, '_migrateUserConfigInAsyncStorage_migrating_0');
                this._migrateConfigInAsyncStorage({});
            });
    };

    _migrateConfigInAsyncStorage = config => {
        const keys = [
            `${JJAppConfig.CONFIG_STORAGE}:uuid_config`,
            `${JJAppConfig.CONFIG_STORAGE}:tracking:first_source`,
            `${JJAppConfig.CONFIG_STORAGE}:tracking:last_source`,
            `${JJAppConfig.CONFIG_STORAGE}:ios_notification_permission_request`,
            `${JJAppConfig.CONFIG_STORAGE}:did_merge_user_profile`
        ];
        AsyncStorage.multiGet(keys)
            .then(response => {
                console.debug(`${TAG}:_migrateConfigInAsyncStorage:multiGet:response`, response);
                if (!!response && response.length > 0) {
                    let tracking = {};
                    response.map((item, index) => {
                        try {
                            switch (item[0]) {
                                case `${JJAppConfig.CONFIG_STORAGE}:uuid_config`:
                                    try {
                                        config.uuid_config = JSON.parse(item[1]);
                                    } catch (e) {
                                        console.debug(e);
                                    }
                                    break;

                                case `${JJAppConfig.CONFIG_STORAGE}:tracking:first_source`:
                                    tracking.first_campaign = item[1];
                                    break;

                                case `${JJAppConfig.CONFIG_STORAGE}:tracking:last_source`:
                                    tracking.last_campaign = item[1];
                                    break;

                                case `${JJAppConfig.CONFIG_STORAGE}:ios_notification_permission_request`:
                                    config.ios_notification_permission_request = !StringUtil.isEmpty(item[1]);
                                    break;

                                case `${JJAppConfig.CONFIG_STORAGE}:did_merge_user_profile`:
                                    config.did_merge_user_profile = !StringUtil.isEmpty(item[1]);
                                    break;
                            }
                        } catch (e) {
                            console.debug(e);
                            AnalyticsUtil.logCrash(e, 0, '_migrateConfigInAsyncStorage_merge_config');
                        }
                    });
                    try {
                        config.tracking = tracking;
                        ConfigDb.set(config);
                    } catch (e) {
                        console.debug(e);
                        AnalyticsUtil.logCrash(e, 0, '_migrateConfigInAsyncStorage_set_config');
                    }
                }
                this._startInitDataFlows();
            })
            .catch(error => {
                console.debug(`${TAG}:_migrateConfigInAsyncStorage:multiGet:error`, error);
                AnalyticsUtil.logCrash(error, 0, '_migrateConfigInAsyncStorage_set_config');
                this._startInitDataFlows();
            });
    };

    _startInitDataFlows = () => {
        console.debug(`${TAG}:_startInitDataFlows`);
        try {
            let currentUser = UserDb.get();
            console.debug(`${TAG}:currentUser:`, currentUser);
            if (!StringUtil.isEmpty(currentUser)) {
                if (StringUtil.isEmpty(currentUser.contact_info_full_name)) {
                    RealmDbHelper.getRealm().write(() => {
                        currentUser.contact_info_full_name = currentUser.full_name;
                        currentUser.contact_info_phone_number = currentUser.phone_number;
                        currentUser.contact_info_email = currentUser.email;
                    });
                }

                this.props.dispatch(loginUserSuccess(RealmDbHelper.copyObjectFromRealm(currentUser)));
                CouponDb.removeUnAvailable();
            }
            this.currentConfig = ConfigDb.get();

            if (StringUtil.isEmpty(this.currentConfig)) {
                ConfigDb.set(RealmDbHelper.defaultConfig, config => (this.currentConfig = config));
            }

            setTimeout(this._startOnBoardFlows, 250);
            console.debug(`${TAG}:currentConfig`, this.currentConfig);

            if (StringUtil.isEmpty(ObjectUtil.getValue(this.currentConfig, undefined, ['uuid_config']))) {
                this._initUUID();
            } else {
                this._dispatchConfig();
            }
        } catch (e) {
            console.debug(e);
            AnalyticsUtil.logCrash(e, 0, '_migrateConfigInAsyncStorage_set_config');
            this._initUUID();
        }
    };

    _initUUID = () => {
        const UUID = AppInfo.UUID;
        const APPVERSION = AppInfo.VersionCode;

        const acs = ObjectUtil.getValue(this.currentConfig, 'direct', ['tracking', 'first_campaign']);
        const drs = ObjectUtil.getValue(this.currentConfig, 'direct', ['tracking', 'last_campaign']);

        const data = {
            client_uuid: UUID,
            platform: ios ? 'App/Ios' : 'App/Android',
            platform_version: APPVERSION + '',
            acs,
            drs
        };

        console.debug(`${TAG}:_initUUID:start`, this.currentConfig);

        commonApi
            .initUUID(data)
            .then(result => {
                console.debug(`${TAG}:initUUID:result`, result);
                RealmDbHelper.getRealm().write(() => {
                    try {
                        if (!this.currentConfig) {
                            try {
                                this.currentConfig = ConfigDb.get();
                            } catch (e) {
                                console.debug(`${TAG}:initUUID:empty config`, e);
                                this.currentConfig = RealmDbHelper.defaultConfig;
                            }
                        }
                        this.currentConfig.uuid_config = result;
                        console.debug(`${TAG}:initUUID:result_2`, this.currentConfig);
                        if (StringUtil.isEmpty(this.currentConfig.tracking)) {
                            this.currentConfig.tracking = {
                                first_campaign: result.acs,
                                last_campaign: result.drs
                            };
                        }
                    } catch (e) {
                        console.debug(`${TAG}:initUUID:error_1:`, e);
                        AnalyticsUtil.logCrash(e, 0, '_initUUID_uuid_config');
                    }
                    fetcherConfig.setUUIDToConfig(result.id);
                    this._dispatchConfig();
                });
            })
            .catch(error => {
                console.debug(`${TAG}:initUUID:error_2:`, error);
                this._dispatchConfig();
            });
    };

    _dispatchConfig = () => {
        if (!this.currentConfig) {
            try {
                this.currentConfig = ConfigDb.get();
            } catch (e) {
                console.debug(`${TAG}:_dispatchConfig:empty config`, e);
            }
        }
        console.debug(`${TAG}:_dispatchConfig`, this.currentConfig.uuid_config, ObjectUtil.getValue(this.currentConfig, '', ['uuid_config', 'id']));
        fetcherConfig.setUUIDToConfig(ObjectUtil.getValue(this.currentConfig, '', ['uuid_config', 'id']));
        this.props.dispatch(provinceChanged(RealmDbHelper.copyObjectFromRealm(this.currentConfig.selected_province)));
        fetcherConfig.setTrackingConfig(() => {
            return {
                acs: ObjectUtil.getValue(this.currentConfig, 'direct', ['tracking', 'first_campaign']),
                drs: ObjectUtil.getValue(this.currentConfig, 'direct', ['tracking', 'last_campaign'])
            };
        });
        this.props.dispatch(fetchLocationSupport());

        if (!!this.finishOnboardFlows) this._initFlowsCompleted();
        else this.finishInitDataProcess = true;
    };

    _startOnBoardFlows = () => {
        if (ios) {
            this._startOnBoardIOSFlows();
        } else {
            this._startOnBoardAndroidFlows();
        }
    };

    _showWelcomeView = () => {
        if (!!this.finishInitDataProcess) {
            this._initFlowsCompleted();
        } else {
            //we have disabled welcomeview, so need to pass to show welcomeview in this step
            this._onBoardFLowsSuccess();
        }
    };

    _startOnBoardAndroidFlows = () => {
        if (!this.currentConfig) {
            this._initCompleted();
            this._showWelcomeView();
            return;
        }
        if (!!this.finishInitDataProcess) this._initFlowsCompleted();
        else this.finishOnboardFlows = true;
    };

    _checkIOSNotificationPermission = () => {
        PushNotificationIOS.checkPermissions(result => {
            console.debug('Splash:checkPermissions', result);
            if (!!result && result.alert === 1) {
                this._showWelcomeView();
                RealmDbHelper.getRealm().write(() => {
                    if (!!this.currentConfig) {
                        this.currentConfig.ios_notification_permission_request = true;
                    }
                });
            } else {
                this.setState({
                    status: 'waiting_ios_notification_permission'
                });
            }
        });
    };

    _startOnBoardIOSFlows = () => {
        this._initCompleted();
        if (!this.currentConfig || !this.currentConfig.ios_notification_permission_request) {
            this._checkIOSNotificationPermission();
        } else {
            this._showWelcomeView();
        }
    };

    _onIOSAllowNotificationPermission = () => {
        RealmDbHelper.getRealm().write(() => {
            if (!!this.currentConfig) this.currentConfig.ios_notification_permission_request = true;
        });
        PushNotificationIOS.requestPermissions()
            .then(result => {
                console.debug('requestPermissions:result', result);
                this._showWelcomeView();
            })
            .catch(error => {
                console.debug('requestPermissions:error', error);
                this._showWelcomeView();
            });

        const from = {
            action_location: 'splash_screen',
            action_name: 'ios_allow_notification_permission'
        };

        AnalyticsUtil.logNormalEvent('ios_allow_notification_permission', from);
    };

    _onIODenyNotificationPermission = () => {
        RealmDbHelper.getRealm().write(() => {
            if (!!this.currentConfig) this.currentConfig.ios_notification_permission_request = true;
        });

        const from = {
            action_location: 'splash_screen',
            action_name: 'ios_deny_notification_permission'
        };

        AnalyticsUtil.logNormalEvent('ios_deny_notification_permission', from);

        this._showWelcomeView();
    };

    _onBoardFLowsSuccess = () => {
        this.setState(
            {
                status: 'preparing'
            },
            () => {
                if (!!this.finishInitDataProcess) this._initFlowsCompleted();
                else this.finishOnboardFlows = true;
            }
        );
    };

    _initFlowsCompleted = () => {
        commonApi
            .getEventConfig()
            .then(response => {
                console.debug('SplashScreen:_initEventConfig:response', response);
                if (!!response && response.length > 0) {
                    this.eventConfig = fromJS(response);
                    this.props.dispatch(updateEventConfig(this.eventConfig));
                }
                this._initConfigDone();
            })
            .catch(error => {
                console.debug('SplashScreen:_initEventConfig:error', error);
                this._initConfigDone();
            });
    };

    _initConfigDone = () => {
        if (!!this.didCheckFirebaseConfig) this._replaceToMain();
        this.didInitDataConfig = true;
    };

    _replaceToMain = () => {
        this.props.navigation.replace('Home', {
            selectedProvinceId: ObjectUtil.getValue(this.currentConfig, 'ha-noi', ['selected_province', 'id']),
            eventConfig: this.eventConfig
        });

        this._initCompleted();
    };

    _didInitFirebaseConfig = () => {
        if (!!this.didInitDataConfig) this._replaceToMain();
        this.didCheckFirebaseConfig = true;
    };

    _checkFirebaseConfig = () => {
        if (__DEV__) {
            firebase.config().enableDeveloperMode();
        }
        const defaultConfig = {
            force_update: false,
            update_message: '',
            latest_version_code: VersionNumber.buildVersion,
            latest_version_name: VersionNumber.appVersion
        };
        console.debug('SplashScreen:FirebaseConfig:defaultConfig:', defaultConfig);

        firebase.config().setDefaults(defaultConfig);

        let updateData = {};

        firebase
            .config()
            .fetch(0)
            .then(() => {
                return firebase.config().activateFetched();
            })
            .then(activated => {
                if (!activated) {
                    console.debug('SplashScreen:FirebaseConfig:_not_activated_fetch');
                }
                return firebase.config().getValues(FIREBASE_CONFIGS);
            })
            .then(snapshot => {
                console.debug('SplashScreen:FirebaseConfig:KEY_FORCE_UPDATE:snapshot:', snapshot);
                if (!snapshot) {
                    this._didInitFirebaseConfig();
                    return;
                }

                for (let key of FIREBASE_CONFIGS) {
                    try {
                        if (!!snapshot[key] && !StringUtil.isEmpty(snapshot[key].val())) {
                            let valueObj = JSON.parse(snapshot[key].val());
                            valueObj = fromJS(valueObj);
                            AppConfig.firebaseConfig = AppConfig.firebaseConfig.updateIn([key], () => valueObj);
                        }
                    } catch (e) {
                        console.debug(e);
                    }
                }

                console.debug('SplashScreen:FirebaseConfig:config_values:', AppConfig.firebaseConfig.toJS());
                if (!AppConfig.firebaseConfig.get(KEY.UPDATE, false) || !AppConfig.firebaseConfig.getIn([KEY.UPDATE, PARAMS.FORCE_UPDATE], false)) {
                    this._didInitFirebaseConfig();
                    return;
                }
                return AppConfig.firebaseConfig.get(KEY.UPDATE);
            })
            .then(updateConfig => {
                if (StringUtil.isEmpty(updateConfig)) return;

                if (updateConfig.get(PARAMS.VERSION_CODE, 0) <= VersionNumber.buildVersion) {
                    this._didInitFirebaseConfig();
                    return;
                }
                return updateConfig;
            })
            .then(updateConfig => {
                if (StringUtil.isEmpty(updateConfig)) return;
                if (!updateConfig.get(PARAMS.VERSION_NAME, false)) {
                    this._didInitFirebaseConfig();
                    return;
                }
                updateData.versionName = updateConfig.get(PARAMS.VERSION_NAME, '');
                return updateConfig;
            })
            .then(updateConfig => {
                if (StringUtil.isEmpty(updateConfig) || StringUtil.isEmpty(updateData.versionName)) {
                    this._didInitFirebaseConfig();
                    return;
                }

                let message = updateConfig.get(PARAMS.UPDATE_MESSAGE);
                if (!StringUtil.isEmpty(message)) {
                    message = 'Vui lòng cập nhật phiên bản mới để có nhiều trải nghiệm tốt hơn.';
                }
                console.debug('SplashScreen:FirebaseConfig:updateMessage', message);
                updateData.message = message;
                this._alertUpdate(updateData, 'Vui lòng cập nhật phiên bản mới để có nhiều trải nghiệm tốt hơn.');
            })
            .catch(error => {
                console.debug('SplashScreen:FirebaseConfig:error', error);
                this._didInitFirebaseConfig();
            });
    };

    _alertUpdate = (data, defaultMessage) => {
        Alert.alert(
            `Cập nhật phiên bản ${data.versionName}`,
            ObjectUtil.getValue(data, defaultMessage, ['message']),
            [{text: 'Cập nhật', onPress: this._onUpdatePressed}],
            {cancelable: false}
        );
    };

    _onUpdatePressed = () => {
        const url = ios ? 'itms-apps://itunes.apple.com/app/id980165889' : 'market://details?id=com.jamjavn.jamja';
        Linking.canOpenURL(url)
            .then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!');
                }
            })
            .catch(error => {
                console.debug(error);
                Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!');
            });
    };

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: *) {
        this.needReRender = this.state.status !== nextState.status;
        return super.shouldComponentUpdate(nextProps, nextState, nextContext);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.currentConfig = undefined;
    }
}

export default connect()(SplashScreen);
