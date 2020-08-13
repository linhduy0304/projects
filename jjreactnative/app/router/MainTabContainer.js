import React from 'react';
import {Linking, AppState, Alert, StatusBar} from 'react-native';
import {createBottomTabNavigator, TabRouter} from 'react-navigation';
import {connect} from "react-redux";
import OneSignal from 'react-native-onesignal';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen, RemoteMessage } from 'react-native-firebase';
import moment from 'moment/min/moment-with-locales';
import {LoginManager} from "react-native-fbsdk";

import TabBooking from '../components/home/tabBooking';
import TabDiscovery from '../components/home/tabDiscovery';
import TabEvent from '../components/home/tabEvent';

import BottomTabBar from '../common/view/tab/BottomTabBar'
import CommonHandler from "../common/native/CommonHandler";
import BaseScreen from "../common/base/BaseScreen";
import FadeInView from '../common/view/FadeInView';
import PopupBanner300x400 from '../components/banner/PopupBanner300x400';

import {StringUtil} from '../utils/string-util';
import {AppInfo} from '../common/native/AppInfo';
import {NativeCommon} from '../common/native/NativeCommon';
import {ObjectUtil} from '../utils/object-utils';
import {ConfigDb} from "../api/storage/ConfigDb";
import JJLocationManager from "../utils/locationmanager/JJLocationManager";
import {provinceChanged} from "../utils/locationmanager/action";
import {couponApi} from "../api/coupon-api";
import {AppConfig} from '../common/config'
import {INIT, NAVIGATE, SET_PARAMS} from './navigation-actions';
import {fetchEvent, fetchHomePages} from "../components/home/repo/action";
import {KEY, PARAMS} from '../common/config/key_configs';
import {NotificationSubject} from "../common/subject/notification-subject";
import {NotificationUtil} from '../utils/notification-util';
import {commonApi} from '../api/common-api';
import {logoutUser} from "../components/login/action";

moment.locale('vi');

export const MainTabRouteAction = {
    open_tab: 'open_tab'
};

const BottomTabBarComponent = (props) => (<BottomTabBar {...props} />);

const Tabs = createBottomTabNavigator(
    {
        TabDiscovery: TabDiscovery,
        TabEvent: TabEvent,
        TabBooking: TabBooking
    },
    {
        initialRouteName: 'TabDiscovery',
        backBehavior: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#e73948',
            inactiveTintColor: '#999999',
            showIcon: true,
            showLabel: true
        },
        tabBarComponent: props => {
            return (
                <BottomTabBarComponent
                    {...props}/>
            )
        }
    }
);

const STATE_PREPARING = 'preparing';
const STATE_INITIALIZED = 'initialized';
const PROMISE_BREAK = 'break';

let ReduxDispatcher;
export function dispatch(d) {
    !!ReduxDispatcher && ReduxDispatcher(d);
}

class MainTabContainer extends BaseScreen {

    static router = TabRouter(
        {
            TabDiscovery: {
                screen: TabDiscovery,
                params: {
                    activeIcon: 'search_deal_o',
                    inactiveIcon: 'search_deal_o',
                    activeColor: '#e73948',
                    inactiveColor: '#999999',
                    label: 'Dạo xem'
                }
            },
            TabBooking: {
                screen: TabBooking,
                params: {
                    activeIcon: 'booking_o',
                    inactiveIcon: 'booking_o',
                    activeColor: '#e73948',
                    inactiveColor: '#999999',
                    label: 'Đặt chỗ'
                }
            }
        }
    );

    TAG = 'MainTabContainer';
    commonHandler;
    initializeDeepLinkCompleted = false;
    hasInitialOneSignalNotificationOpened = false;
    locationManager: JJLocationManager;
    hasRequestChangeProvince = false;
    lastAppState = undefined;
    oneSignalUID = undefined;

    constructor(props) {
        super(props);
        console.debug(`${this.TAG}:constructor`, props);
        this.state = {
            viewState: 'preparing',
            canShowPopupBanner: false
        };
        this.commonHandler = new CommonHandler(props.navigation, props.dispatch);
        this.commonHandler.create();
        this.locationManager = new JJLocationManager(props.dispatch);
        this._startInitOneSignal();
        this._initSetupFirebaseNotification();

    }

    render() {

        console.debug(`${this.TAG}:render`);

        if (this.state.viewState === STATE_PREPARING) return null;

        return (
            <FadeInView style={{flex: 1}}>
                <Tabs screenProps={this.props} navigation={this.props.navigation}/>

                {
                    !!this.props.banner52 &&
                    !!this.state.canShowPopupBanner &&
                    <PopupBanner300x400
                        banner={this.props.banner52}
                        onCloseBanner={this._onClosePopupBanner}
                        navigation={this.props.navigation}/>
                }
            </FadeInView>
        )
    }

    _startAddListener = () => {
        Linking.addEventListener('url', this._onUrlLinkingListener);
        this.unsubscribeFirebaseDynamicLink = firebase.links()
            .onLink(link => {
                console.debug(`${this.TAG}:firebase:onLink: `, link);
                this._onUrlLinkingListener(link);
            });

        this.unsubcribeFcmOnMessage = firebase.messaging().onMessage((message: RemoteMessage) => {
            const data = NotificationUtil.getNotificationData(message);
            console.debug(`${this.TAG}:firebase:onMessage: `, data);
            if (!!data) NotificationSubject.dispatch('receive_notification', data);
        });

        this.unsubscribeFirebaseNotificationReceiver = firebase.notifications()
            .onNotification((notification: Notification) => {
                console.debug(`${this.TAG}:firebase:onNotificationReceiver: `, notification);
                notification.setSound("default");

                if (!AppConfig.ios) {
                    notification.android.setChannelId(AppConfig.ANDROID_NOTIFICATION_CHANNEL_ID);
                    notification.android.setPriority(firebase.notifications.Android.Priority.Max);
                    notification.android.setAutoCancel(true);
                    notification.android.setSmallIcon('ic_notification_icon');
                    notification.android.setLargeIcon('ic_onesignal_large_icon_default');
                }

                if (!!AppConfig.ios) {
                    NotificationSubject.dispatch('receive_notification', NotificationUtil.getNotificationData(notification));
                }

                firebase.notifications().displayNotification(notification);
            });

        this.unsubscribeFirebaseNotificationOpened = firebase.notifications()
            .onNotificationOpened((notificationOpen: NotificationOpen) => {
                if (!!notificationOpen && !!notificationOpen.notification) {
                    console.debug(`${this.TAG}:firebase:onNotificationOpened: `, notificationOpen);
                    this._onFirebaseInitNotificationOpened(notificationOpen);
                }
            });
    }

    _initStateHandleCompleted = () => {
        this.needReRender = true;
        this.initializeDeepLinkCompleted = true;
        this.setState({
            viewState: STATE_INITIALIZED
        });
    }

    _initSetupFirebaseNotification = () => {
        if (!AppConfig.ios) {
            const channel = new firebase.notifications.Android.Channel(AppConfig.ANDROID_NOTIFICATION_CHANNEL_ID, 'JAMJA', firebase.notifications.Android.Importance.Max)
                .setDescription('JAMJA notification channel');
            firebase.notifications().android.createChannel(channel)
                .then(response => {
                    console.debug('Create android notification channel success ', response);
                })
                .catch(error => {
                    console.debug('Create android notification channel error ', error);
                });
        }
    }

    /**
     * override onFocus of navigation on the screen
     * @param payload
     */
    onFocus = payload => {
        console.debug(`${this.TAG}:onFocus: `, payload, this.state, this.initializeDeepLinkCompleted, this.mounted);
        this.canRender = true;

        if (this.state.viewState === STATE_PREPARING && !!this.initializeDeepLinkCompleted) {
            this.needReRender = true;
            this.setState({ viewState: STATE_INITIALIZED });
        }
        !!super.onFocus && super.onFocus(payload);
    }

    _startInitDetectionLink = () => {
        !!this.commonHandler && this.commonHandler.setDetectedTrigger(this._onInitLinkCompleted);
        setTimeout(() => {
            if (!this.initializeDeepLinkCompleted) {
                this.initializeDeepLinkCompleted = true;
                this.setState({
                    viewState: STATE_INITIALIZED
                });
            }
        }, 1000);
    }

    _onInitLinkCompleted = () => {
        this.initializeDeepLinkCompleted = true;
    }

    _onUrlLinkingListener = deepLink => {
        if (!deepLink) return;
        console.debug(`${this.TAG}:_onUrlLinkingListener": `, deepLink);
        let url = '';

        if (!!deepLink.url) url = deepLink.url;
        if (typeof deepLink === 'string') url = deepLink;

        if (url.indexOf('.page.link/') >= 0) return;

        NativeCommon.openUrl(url);
    }

    /**
     * Firebase notificaiton handle
     * @param notificationOpen
     * @returns {boolean}
     * @private
     */

    _onFirebaseInitNotificationOpened = (notificationOpen: NotificationOpen) => {
        if (!notificationOpen || !notificationOpen.notification) return false;

        const notification: Notification = notificationOpen.notification;

        let data = ObjectUtil.getValue(notification, undefined, ['data', 'custom', 'a', 'nof_data']);
        const oneSignalUrl = ObjectUtil.getValue(notification, undefined, ['data', 'custom', 'u']);
        if (!StringUtil.isEmpty(oneSignalUrl)) {
            NativeCommon.openUrl(oneSignalUrl);
            return;
        }
        if (!data) {
            data = notification.data;
        }

        console.debug('_onFirebaseInitNotificationOpened: ', data);

        if (!!data && (data.data_type === 'custom' || !!data.type)) {
            this._onNotificationDataHandler(data);
            return true;
        }

        return false;
    }

    _onNotificationDataHandler = data => {
        if (StringUtil.isEmpty(data.utm_source)) {
            data.utm_source = 'push';
        }
        NotificationSubject.dispatch('open_notification', { ...data });
        switch (data.type) {
            case 'deal':
                this.initializeDeepLinkCompleted = true;
                return !!this.commonHandler.openDealDetailFromPush(data);
            case 'collection':
                this.initializeDeepLinkCompleted = true;
                return !!this.commonHandler.openCollectionDetailFromPush(data);
            case 'coupon':
                this.initializeDeepLinkCompleted = true;
                return !!this.commonHandler.openCouponDetailFromPush(data);
            case 'comment':
                this.initializeDeepLinkCompleted = true;
                return !!this.commonHandler.openCommentFromPush(data);
            case 'url':
                NativeCommon.openUrl(data.targetUrl);
                return true;
        }
    }

    /**
     * OneSignal
     * @private
     */
    _startInitOneSignal = () => {
        OneSignal.init(AppInfo.ONE_SIGNAL_KEY);
        OneSignal.inFocusDisplaying(2);
        OneSignal.setSubscription(true);

        OneSignal.addEventListener('ids', this._onOneSignalIds);
        OneSignal.addEventListener('opened', this._onOneSignalOpened);

        OneSignal.configure();
    }

    _onOneSignalIds = device => {
        console.debug(`${this.TAG}:_onOneSignalIds: `, device);
        if (device === undefined || device === null) return;
        const player = {
            player_id: device.userId,
            device_token: device.pushToken
        };

        //device token has been changed -> send apns to update to server
        // const currentOneSignalUser = ConfigDb.getOneSignalPlayer();
        if (!this.oneSignalUID && !!device.userId) {
            this.oneSignalUID = device.userId;
            ConfigDb.updateOneSignalPlayer(player);
            commonApi.sendDeviceTokenToServer(player);
        }
    }

    _onOneSignalOpened = openResult => {
        console.debug(`${this.TAG}:_onOneSignalOpened: `, openResult);

        const notificationData = ObjectUtil.getValue(openResult, undefined, ['notification', 'payload', 'additionalData', 'nof_data']);

        if (!!notificationData) {
            console.debug(`${this.TAG}:notificationData: `, notificationData);
            this.hasInitialOneSignalNotificationOpened = true;
            if (!ObjectUtil.getValue(openResult, undefined, ['notification', 'payload', 'launchURL'])) {
                this._onNotificationDataHandler(notificationData);
            }
            this._startInitDetectionLink();
            setTimeout(() => {
                if (!!this.mounted) this.initializeDeepLinkCompleted = true;
            }, 500);
        }
    }

    /** ---- end of OneSignal config ---- **/

    _handleAppState = (newState) => {
        console.debug('***Home:_handleAppState:', newState, this.lastAppState);
        this.lastAppState = newState;
    }

    _onProvinceChanged = (province) => {
        console.debug('_onProvinceChanged', province);
        if (!this.props.selectedProvince) return;

        if (this.props.navigation.isFocused() && !this.hasRequestChangeProvince && this.props.selectedProvince.get('id') !== province.id) {
            this.hasRequestChangeProvince = true;
            Alert.alert(
                'Lưu ý',
                `JAMJA nhận thấy bạn không còn ở khu vực ${this.props.selectedProvince.get('name', '')}. Bạn có muốn thay đổi khu vực đến ${province.name} để xem các khuyến mãi xung quanh?`,
                [
                    { text: "ĐÓNG" },
                    {
                        text: "ĐỒNG Ý",
                        onPress: () => {
                            ConfigDb.updateSelectedProvince(province);
                            this.props.dispatch(provinceChanged(province));
                        }
                    }
                ],
                {
                    cancelable: true
                }
            )
        }
    }

    /**
     * deal rating
     * @private
     */
    _getUnRateCoupon = () => {
        if (!this.props.isLoginned) return;
        couponApi.getUnRateCoupon()
            .then(response => {
                console.debug('_getUnRateCoupon', response);
                if (response.status === 401) {
                    console.debug('------>>>> logout')
                    try {
                        LoginManager.logOut();
                        firebase.auth().signOut();
                        this.props.dispatch(logoutUser());
                    } catch (e) {
                        console.log(e);
                    }
                    return undefined;
                }
                return response.json();
            })
            .then(response => {
                if (response === undefined || response === null || !response.hasOwnProperty('objects')) return;
                let coupons = response.objects;
                if (coupons === undefined || coupons === null || coupons.length < 1) return;
                this._openRateCoupon(coupons)
            })
            .catch(error => {
                console.debug('getUnRateCoupon:error', error);
            })
    }

    _openRateCoupon = (cps) => {
        const coupons = [];
        if (cps === undefined || cps === null || cps.length < 1) return;
        let timeNow = moment();
        for (let i = 0; i < cps.length; i++) {
            let coupon = cps[i];
            let now = moment.utc(coupon.created).local().diff(timeNow, 'minutes');
            if (now < -30) coupons.push(coupon);
        }
        if (coupons.length < 1) return;
        this.props.navigation.navigate('RateCoupon', { coupons: coupons })
    }

    _onClosePopupBanner = () => {
        this.needReRender = true;
        this.setState({
            ...this.state,
            canShowPopupBanner: false
        })
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: *) {
        this.needReRender = true;
        return super.shouldComponentUpdate(nextProps, nextState, nextContext);
    }

    componentDidMount() {
        super.componentDidMount();
        // !!this.commonHandler && this.commonHandler.create();

        ReduxDispatcher = this.props.dispatch;

        const catchError =  error => {
            console.debug(`${this.TAG}:error: `, error);
            this._startAddListener();
        };

        Linking.getInitialURL()
            .then(deepLink => {
                if (!deepLink) return;
                console.debug(`${this.TAG}:deepLink: `, deepLink);
                //ignore handle if deep link is empty or is firebase dynamic link
                if (!StringUtil.isEmpty(deepLink) && deepLink.indexOf('.page.link/') < 0) {

                    this._startInitDetectionLink();
                    NativeCommon.openUrl(deepLink);

                    return PROMISE_BREAK;
                }
                return firebase.links().getInitialLink();

            }, catchError)

            //handle firebase init dynamic link
            .then(dynamicLink => {
                if (dynamicLink === PROMISE_BREAK) return PROMISE_BREAK;

                console.debug(`${this.TAG}:dynamicLink: `, dynamicLink);
                if (!StringUtil.isEmpty(dynamicLink) && dynamicLink.indexOf('.page.link/') < 0) {
                    this._startInitDetectionLink();
                    NativeCommon.openUrl(dynamicLink);

                    return PROMISE_BREAK;
                }
                return firebase.notifications().getInitialNotification();

            }, catchError)

            //handle firebase init notification
            .then(notification => {
                if (notification === PROMISE_BREAK) return PROMISE_BREAK;

                console.debug(`${this.TAG}:firebase:notification: `, notification);

                if (this._onFirebaseInitNotificationOpened(notification)) {
                    this._startInitDetectionLink();
                    return PROMISE_BREAK;
                }
            }, catchError)

            //Final
            .then(result => {
                console.debug(`${this.TAG}:final_init: `, this.mounted, result);
                if (!!this.mounted && !result && !this.hasInitialOneSignalNotificationOpened) {
                    this._initStateHandleCompleted();
                }
                this._startAddListener();
            }, catchError);

        if (!!this.props.locationSupport) {
            this.locationManager.setProvinceSupport(this.props.locationSupport);
        }
        this.locationManager.startInitLocation(this._onProvinceChanged);

        AppState.addEventListener('change', this._handleAppState);

        setTimeout(() => {
            if (!!this.mounted) this._getUnRateCoupon();
        }, 500);

        setTimeout(() => {
            if (!!this.mounted) {
                this.props.dispatch(fetchEvent());
                this.props.dispatch(fetchHomePages());
            }
        }, 500);
    }

    componentWillUnmount() {
        ReduxDispatcher = undefined;
        //remove linking listener
        Linking.removeEventListener('url', this._onUrlLinkingListener);
        if (!!this.commonHandler) this.commonHandler.destroy();
        if (!!this.locationManager) this.locationManager.stop();

        //remove firebase listener
        !!this.unsubscribeFirebaseDynamicLink && this.unsubscribeFirebaseDynamicLink();
        !!this.unsubscribeFirebaseNotificationOpened && this.unsubscribeFirebaseNotificationOpened();
        !!this.unsubscribeFirebaseNotificationReceiver && this.unsubscribeFirebaseNotificationReceiver();
        !!this.unsubcribeFcmOnMessage && this.unsubcribeFcmOnMessage();

        //remove onesignal listener
        OneSignal.removeEventListener('ids', this._onOneSignalIds);
        OneSignal.removeEventListener('opened', this._onOneSignalOpened);
        OneSignal.clearListeners();

        AppState.removeEventListener('change', this._handleAppState);

        super.componentWillUnmount();
    }

    async componentWillReceiveProps(nextProps) {
        try {
            console.debug(`${this.TAG}:componentWillReceiveProps: `, nextProps, this.props);
            if (!!nextProps.banner52 && !nextProps.banner52.equals(this.props.banner52)) {
                const canShowBanner = ConfigDb.canShowBanner(nextProps.banner52.get('id'));
                console.debug('Drawer:canShowBanner', canShowBanner);
                if (!!canShowBanner) {
                    this.needReRender = true;
                    this.setState({
                        ...this.state,
                        canShowPopupBanner: canShowBanner
                    })
                }
            }
            else if (!!nextProps.locationSupport && !this.props.locationSupport) {
                !!this.locationManager && this.locationManager.setProvinceSupport(nextProps.locationSupport);
            }

            if (nextProps.selectedProvince.get('id', '') !== this.props.selectedProvince.get('id', '')) {
                this.props.navigation.setParams({
                    selectedProvinceId: nextProps.selectedProvince.get('id', 'ha-noi'),
                    eventConfig: nextProps.eventConfig
                })
            }
        } catch (e) {
            console.debug(e);
        }
    }
}

const defaultTabGetStateForAction = MainTabContainer.router.getStateForAction;
const defaultTabGetComponentForRouteName = MainTabContainer.router.getComponentForRouteName;
const defaultTabGetActionForPathAndParams = MainTabContainer.router.getActionForPathAndParams;


function addEventTabToRouter(state, tabConfig, provinceSupport) {
    state.routes.splice(1, 0, {
        key: 'main-tab-event',
        routeName: 'TabEvent',
        params: {
            activeIcon: tabConfig.get('icon', ''),
            inactiveIcon: tabConfig.get('icon', ''),
            activeColor: '#e73948',
            inactiveColor: '#999999',
            label: tabConfig.get('icon_title', 'Sự kiện'),
            themeColor: tabConfig.get('theme_color', '#fff'),
            landing_page_url: tabConfig.get('landing_page_url'),
            province_support: provinceSupport
        }
    });

    if (!!tabConfig.get('app_event_active', false)) {
        state.index = 1;
        StatusBar.setBarStyle('dark-content', true);
        if (!AppConfig.ios) {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor(tabConfig.get('theme_color', 'transparent'));
        }
    }
    return true;
}

function getTabIndexByName(state, name) {
    let routeName = undefined;
    switch (name) {
        case 'dao-xem':
            routeName = 'TabDiscovery';
            break;

        case 'dat-cho':
            routeName = 'TabBooking';
            break;

        case 'event':
            routeName = 'TabEvent';
            break;
    }

    if (!routeName) return -1;

    return state.routes.findIndex(r => r.routeName === routeName);
}

MainTabContainer.router.getStateForAction = (action, state) => {
    // console.debug(`MainTabContainer:getStateForAction`, action, state);

    const actionType = !!action && !!action.type ?  action.type.toLowerCase() : '';
    if (!actionType || !state) return defaultTabGetStateForAction(action, state);

    if (actionType === INIT)
    {
        let hasChangeInitState = false;

        if (!!ObjectUtil.getValue(action, undefined, ['params', 'eventConfig']) &&
            ObjectUtil.getValue(action, {size:0}, ['params', 'eventConfig']).size > 0)
        {
            const config = ObjectUtil.getValue(action, {size:0}, ['params', 'eventConfig']);

            const currentSelectedProvinceId = ObjectUtil.getValue(action, 'ha-noi', ['params', 'selectedProvinceId']);
            const tabConfig = config.find((e, i) => e.get('province') === currentSelectedProvinceId);
            if (!!tabConfig) {
                const added = addEventTabToRouter(state, tabConfig, currentSelectedProvinceId);
                console.debug('MainTabContainer:addEventTabToRouter: ', added);
                hasChangeInitState = true;
            }
        }

        const tabAutoActiveName = AppConfig.firebaseConfig.getIn([KEY.MAIN_TAB_CONFIG, PARAMS.AUTO_ACTIVE_TAB]);

        if (!!tabAutoActiveName) {
            const currentIndex = state.index;
            const activeIndex = getTabIndexByName(state, tabAutoActiveName);
            if (activeIndex >= 0 && currentIndex !== activeIndex) {
                state.index = activeIndex;
                hasChangeInitState = true;
            }
        }

        if (!!hasChangeInitState) return state;
    }

    else if (actionType === NAVIGATE && state && state.routes)
    {
        const currentRouters = state.routes;
        for (let i = 0; i < currentRouters.length; i++) {
            if (action.routeName === currentRouters[i].routeName) {
                return {
                    ...state,
                    index: i
                };
            }
        }
    }

    //currently, set params for main only update province
    else if (actionType === SET_PARAMS &&
        action.key === 'Main' &&
        state.routes &&
        !!ObjectUtil.getValue(action, undefined, ['params', 'eventConfig']))
    {
        const tabEventIndex = state.routes.findIndex((r, i) => r.routeName === 'TabEvent');
        const provinceSupport = ObjectUtil.getValue(action, 'ha-noi', ['params', 'selectedProvinceId']);
        const config = action.params.eventConfig;
        const tabConfig = config.find((e, i) => e.get('province') === provinceSupport);

        console.debug('********************Index: ', tabEventIndex);

        if (!!tabConfig) {

            if (tabEventIndex >= 0)
            {
                state.routes[tabEventIndex].params = {
                    activeIcon: tabConfig.get('icon', ''),
                    inactiveIcon: tabConfig.get('icon', ''),
                    activeColor: '#e73948',
                    inactiveColor: '#999999',
                    label: tabConfig.get('icon_title', 'Sự kiện'),
                    themeColor: tabConfig.get('theme_color', '#fff'),
                    landing_page_url: tabConfig.get('landing_page_url'),
                    province_support: provinceSupport
                };
            }
            else
            {
                const added = addEventTabToRouter(state, tabConfig, provinceSupport);
                console.debug('MainTabContainer:addEventTabToRouter: ', added);
            }
            return state;
        }
    }

    //go to booking tab
    else if (actionType === MainTabRouteAction.open_tab && !!action.routeName && !!state.routes) {

        const currentRouters = state.routes;
        for (let i = 0; i < currentRouters.length; i++) {
            if (action.routeName === currentRouters[i].routeName) {
                return {
                    ...state,
                    index: i
                };
            }
        }
    }

    return defaultTabGetStateForAction(action, state);
};

MainTabContainer.router.getComponentForRouteName = (routeName) => {
    if (routeName === 'TabEvent') return TabEvent;
    return defaultTabGetComponentForRouteName(routeName);
};

MainTabContainer.router.getActionForPathAndParams = (path, params) => {
    return defaultTabGetActionForPathAndParams(path, params);
}

function mapStateToProps(state) {
    return {
        isLoginned: state.loginReducer.isLoginned,
        banner52: state.homeReducer.getIn(['banners', 'banner_52']),
        eventConfig: state.homeReducer.get('eventConfig'),
        //Location
        selectedProvince: state.locationReducer.get('province'),
        locationSupport: state.locationReducer.get('locationSupport')
    };
}

export default connect(mapStateToProps)(MainTabContainer)