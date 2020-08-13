import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import CodePush from "react-native-code-push";
import RNInsider from 'react-native-insider';

import {AppContainer} from './router';
import {isIphoneBunnyEar} from './utils/common-utils'
import NavigationService from './router/NavigationService';

//Theme
import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';

//Redux
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers'

//Redux Saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import firebase from 'react-native-firebase';
import {
    GoogleAnalyticsSettings
} from "../modules/react-native-google-analytics-bridge";
import {AppInfo} from "./common/native/AppInfo";
import {defaultTextStyle} from './resources/styles';
import {COLOR_TEXT_HINT} from "./resources/colors";
import UpdateNotice from './common/view/notice/UpdateNotice';
import {removeAllBackgroundGeolocation} from './common/library/location';

//Store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

console.disableYellowBox = true;

const iphoneBunnyEar = isIphoneBunnyEar();


class App extends Component {

    mounted = false;

    constructor() {
        super();
        firebase.analytics().setAnalyticsCollectionEnabled(true);
        GoogleAnalyticsSettings.setDispatchInterval(30);

        if (!Text.defaultProps) Text.defaultProps = {};
        Text.defaultProps.allowFontScaling = false;
        Text.defaultProps.style = defaultTextStyle;

        if (!TextInput.defaultProps) TextInput.defaultProps = {};
        TextInput.underlineColorAndroid = 'transparent';
        TextInput.placeholderTextColor = COLOR_TEXT_HINT;
        TextInput.autoCorrect = false;
        TextInput.style = defaultTextStyle;

        this.state = {
            updateNoticeMessage: undefined
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StyleProvider style={getTheme(commonColor)}>
                    <Provider store={store}>
                        <AppContainer
                            ref={navigatorRef => {
                                NavigationService.setTopLevelNavigator(navigatorRef);
                            }}/>
                    </Provider>
                </StyleProvider>
                {
                    iphoneBunnyEar &&
                    <View style={{backgroundColor: 'white', height: 16, width: '100%'}}/>
                }

                {
                    !!this.state.updateNoticeMessage &&
                    <UpdateNotice
                        message={this.state.updateNoticeMessage}
                        onClose={this._onCloseUpdateNotice}
                        />
                }

            </View>
        );
    }

    _onCloseUpdateNotice = () => {
        this.setState({
            updateNoticeMessage: undefined
        })
    }

    _checkUpdateMetaDataAfterUpdate = () => {
        try {
            CodePush.getUpdateMetadata(CodePush.UpdateState.LATEST)
                .then(result => {
                    console.debug('getUpdateMetadata:', result);
                    if (!result || !result.isPending) return;

                    const description = result.description;
                    if (!!description && description.length > 0 && !!this.mounted) {
                        this.setState({
                            updateNoticeMessage: description
                        });
                    }
                })
                .catch(error => {
                    console.log('getUpdateMetadata:error', error);
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    _codePushStatusDidChange = status => {
        switch(status) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("CodePush:Checking for updates.");
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("CodePush:Downloading package.");
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log("CodePush:Installing update.");
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                console.log("CodePush:Up-to-date.");
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                console.log("CodePush:Update installed.");
                break;
        }
    }

    _codePushDownloadDidProgress = progress => {
        console.log("CodePush:" + progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }

    _codePushSyncError = error => {
        console.log('CodePush:onCodePushSyncError:', error);
    }

    _startHandleCodePush = () => {
        CodePush.sync({
                installMode: CodePush.InstallMode.ON_NEXT_RESTART,
                checkFrequency: CodePush.CheckFrequency.ON_APP_START
            },
            this._codePushStatusDidChange,
            this._codePushDownloadDidProgress,
            this._codePushSyncError)
            .then(result => {
                console.log('CodePush:startHandleCodePush:result: ', result);
                if (result > 0) {
                    return this._checkUpdateMetaDataAfterUpdate();
                }
            })
            .catch(error => {
                console.log('CodePush:startHandleCodePush:error:', error);
            })
        ;
    }

    componentDidMount() {
        this.mounted = true;
        try {
            !!AppInfo.initCompleted && AppInfo.initCompleted();

            CodePush.disallowRestart();
            RNInsider.init(AppInfo.INSIDER_PARTNER, AppInfo.FCM_SENDER_ID, false, 60);
            this._startHandleCodePush();
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount(): void {
        this.mounted = false;
        removeAllBackgroundGeolocation();
        CodePush.allowRestart();
    }
}
sagaMiddleware.run(rootSaga);

// App = CodePush({installMode: CodePush.InstallMode.ON_NEXT_RESTART, checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME })(App);
export default App;