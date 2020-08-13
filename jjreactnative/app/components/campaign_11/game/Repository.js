import React from 'react'
import {fromJS} from 'immutable'
import {
    DeviceEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Platform,
    Alert,
    Vibration,
    AppState
} from "react-native";

import {campaignApi} from '../../../api/campaign-api'
import {BasePureComponent} from "../../common/BasePureComponent";
import {Toast} from '../../common/alert/Toast'
import {StringUtil} from '../../../utils/string-util'
import {ObjectUtil} from '../../../utils/object-utils'
import {Sound} from '../../common/Sound';
import {ConfigDb} from '../../../api/storage/ConfigDb'
import {ERROR_AUTH_MESSAGE, ERROR_NORMAL} from "../../../const";
import {AnalyticsUtil} from "../../common/analytics/analytics";
import {GameState} from './GameUtil'

const Accelerometer = NativeModules.Accelerometer;
const ios = Platform.OS === 'ios';
const AccelerometerEmitter = !!ios ? new NativeEventEmitter(Accelerometer) : undefined;
const PREFIX = 'publish' === NativeModules.AppInfo.BuildEnv ? '' : 'dev.';

export default class Repository extends BasePureComponent {

    onShakeProgressListener;
    onResetShakeProgress;
    gameBoardController;

    enableShakeProgress = false;
    runningDelay = false;

    isFocus = false;

    constructor(props) {
        super(props);
        this.state = {
            gameState: GameState.STATE_PREPARING,
            errorStatus: undefined,
            isOpenSound: true,
            data: undefined
        };
        this._startHandlerScreenFocus(props);
    }

    _startHandlerScreenFocus = (props) => {
        AppState.addEventListener('change', this._handleAppState);
        if (!!props && !!props.navigation) {
            this._didFocusSubscription = props.navigation.addListener('willFocus', payload =>
                {
                    this.isFocus = true;
                }
            );

            this._willBlurSubscription = props.navigation.addListener('willBlur', payload =>
                {
                    this.isFocus = false;
                }
            );
        }
    }

    _removeHandlerScreenFocus = () => {
        !!this._didFocusSubscription && this._didFocusSubscription.remove();
        !!this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    _handleAppState = (newState) => {
        if (!this.state.isOpenSound) return;
        if (newState === 'active') {
            Sound.resume();
        }
        else {
            Sound.pause();
        }
    }

    _fetchGameUserInfo = () => {
        campaignApi.initGameInfo()
            .then(response => {
                console.log('game:init:response:', response);
                if (StringUtil.isEmpty(response) || !!response.error) {
                    this._error(response, true);
                }
                else {
                    this.setState({
                        ...this.state,
                        gameState: response.turn_count > 0 ? GameState.STATE_TUT : GameState.STATE_NOT_ENOUGH_TURN,
                        errorStatus: response.turn_count > 0 ? undefined : 'turn',
                        data: fromJS(response)
                    }, this._prepareCompleted);
                }
            })
            .catch(error => {
                console.log('game:init:error:', error);
                if (error.errorCode === 401) {
                    Alert.alert(
                        'Lỗi đăng nhập',
                        ERROR_AUTH_MESSAGE
                    );
                }
                this._error(error, true);
            });
    }

    _prepareCompleted = () => {
        if (!!this.state.isOpenSound) {
            Sound.playBackground();
        }
        this._dispatchInvitationTrigger();
    }

    _onCloseTutClicked = () => {
        this.setState({
            ...this.state,
            gameState: GameState.STATE_START
        }, this._onStartGame);
    }

    _onStartGame = () => {
        if (!!Accelerometer) {
            Accelerometer.startHandler();
            if (!!ios) {
                !!AccelerometerEmitter && AccelerometerEmitter.addListener(Accelerometer.EVENT, this._onShakeListener);
            }
            else {
                DeviceEventEmitter.addListener(Accelerometer.EVENT, this._onShakeListener);
            }
            this.enableShakeSubscription = setTimeout(() => {
                this.enableShakeProgress = true
            }, 3000);
        }
    }

    _onShakeListener = (e) => {
        console.log('enableShakeProgress', this.enableShakeProgress);
        if (!Accelerometer || !e) return;
        if (this.enableShakeProgress === false || !this.isFocus) return;

        if (this.state.gameState === GameState.STATE_START || this.state.gameState === GameState.STATE_SHAKING) {
            !!this.onShakeProgressListener && this.onShakeProgressListener(e);
        }
    }

    _setShakeProgressViewListener = (shakeListener, resetListener) => {
        this.onShakeProgressListener = shakeListener;
        this.onResetShakeProgress = resetListener;
    }

    _startGameBoard = () => {
        !!this.gameBoardController && !!this.gameBoardController.start && this.gameBoardController.start();
    }

    _stopGameBoard = () => {
        !!this.gameBoardController && !!this.gameBoardController.stop && this.gameBoardController.stop();
    }

    _releaseGameBoard = () => {
        !!this.gameBoardController && !!this.gameBoardController.release && this.gameBoardController.release();
    }

    _onStartRunningGift = () => {
        console.log('game:_onStartRunningGift');
        Vibration.vibrate(200);
        this.setState({
            ...this.state,
            gameState: GameState.STATE_RUNNING
        }, this._delayRunningGift);
    }

    _delayRunningGift = () => {
        if (!!this.runningDelay) return;
        this._getGift();
        this.runningDelay = true;
        this._startGameBoard();
        setTimeout(() => {
            this.runningDelay = false;
            if (!!this.state.data.get('gift')) {
                this._stopGameBoard();
            }
        }, 2000);
    }

    _onRunningFinished = () => {
        if (this.state.gameState === GameState.STATE_ERROR || this.state.gameState === GameState.STATE_NOT_ENOUGH_TURN) return;
        let data = this.state.data;
        if (!data) return;
        if (data.get('turn_count', 0) > 0) data = data.updateIn(['turn_count'], () => data.get('turn_count') - 1);
        this._openReturnGiftSound();
        this.setState({
            ...this.state,
            gameState: GameState.STATE_RETURN_GIFT,
            data
        }, () => {
            Vibration.vibrate(500);
        });
    }

    _onCloseReturnGift = () => {
        console.log('_onCloseReturnGift');
        this.setState({
            ...this.state,
            gameState: this.state.data.get('turn_count', 0) <= 0 ? GameState.STATE_NOT_ENOUGH_TURN : GameState.STATE_START,
            errorStatus: this.state.data.get('turn_count', 0) <= 0 ? 'turn' : undefined,
            data: this.state.data.updateIn(['gift'], () => undefined)
        });
        !!this.onResetShakeProgress && this.onResetShakeProgress();

        if (!!this.state.isOpenSound) {
            Sound.playBackground();
        }
        else {
            Sound.pause();
        }
    }

    _openGiftDetail = () => {
        !!this.onResetShakeProgress && this.onResetShakeProgress();

        console.log('_openGiftDetail');
        if (!this.state.data.get('gift')) return;
        this.setState({
            ...this.state,
            gameState: this.state.data.get('turn_count', 0) <= 0 ? GameState.STATE_NOT_ENOUGH_TURN : GameState.STATE_START,
            errorStatus: this.state.data.get('turn_count', 0) <= 0 ? 'turn' : undefined,
            data: this.state.data.updateIn(['gift'], () => undefined)
        });

        if (this.state.data.getIn(['gift', 'status']) === 0 || this.state.data.getIn(['gift', 'status']) === 2) {
            this.props.navigation.push('GameWebView', {url: this.state.data.getIn(['gift', 'btn_link']), enableDirect: true});
        }

        if (!!this.state.isOpenSound) {
            Sound.playBackground();
        }
        else {
            this._stopSound();
        }
    }

    _setGameBoardController = (start, stop, release) => {
        this.gameBoardController = {start, stop, release};
    }

    _getGift = () => {
        campaignApi.getGift()
            .then(response => {
                console.log('game:get_gift:response:', response);
                if (StringUtil.isEmpty(response) || !!response.error) {
                    this._error(response, true);
                }
                else {
                    let data = this.state.data;
                    if (response.status === 1) {
                        data = data.updateIn(['turn_count'], () => data.get('turn_count', 0) + 1);
                    }
                    data = data.updateIn(['gift'], () => fromJS(response));
                    if (!this.runningDelay) {
                        this.setState({
                            ...this.state,
                            data
                        }, this._stopGameBoard);
                    }
                    else {
                        this.setState({
                            ...this.state,
                            data
                        });
                    }
                }
            })
            .catch(error => {
                console.log('game:get_gift:error:', error);
                this._error(error, true);
            })
    }

    _onLoginClicked = () => {
        const logInAction = {
            name: `game_login`,
            category: 'campaign'
        };

        this.props.navigation.navigate(
            'Login',
            {
                from: {
                    action_location: 'game',
                    action_name: 'game_login'
                },
                action: logInAction
            });
    }

    _buttonSoundClicked = () => {
        ConfigDb.enableSound(!this.state.isOpenSound);
        this.setState({
            ...this.state,
            isOpenSound: !this.state.isOpenSound
        }, () => this.state.isOpenSound ? Sound.playBackground() : Sound.pause());
    }

    _error = (message, errorPlaceholder) => {
        if (!!errorPlaceholder) {
            const errorCode = ObjectUtil.getValue(message, undefined, ['errorCode']);
            this.setState({
                ...this.state,
                gameState: GameState.STATE_ERROR,
                errorStatus: errorCode === 401 ? 'auth' : 'unknown'
            });
            this._releaseGameBoard();
            Sound.pause();
        }
        let error = ERROR_NORMAL;
        if (typeof message === 'object') {
            if (!StringUtil.isEmpty(message.error)) {
                error = message.error;
                Alert.alert(
                    'Lỗi',
                    message.error
                );
            }
        }
        else if (typeof message === 'string') error = message;

        Toast.showToast(error);
    }

    _stopSound = () => {
        console.log('game:stopsound');
        Sound.pause();
    }

    _openReturnGiftSound = () => {
        if (!this.state.isOpenSound || !Sound) return;
        console.log('_openReturnGiftSound');
        Sound.playReturnGift();
    }

    _onGetMoreTurnClicked = () => {
        if (!this.state.data) {
            this.props.navigation.navigate('GameGetTurnIntro', {
                onSuccess: this._onGetMoreTurnSuccess,
                hotLink:  'https://jamja.vn/yes-party/?inApp=1',
                fbLink:  'https://www.facebook.com/groups/sanjamja/',
            })
        }
        else {
            this.props.navigation.navigate('GameGetTurnIntro', {
                player_id: !!this.state.data ? this.state.data.get('user_game_id', '') : '',
                onSuccess: this._onGetMoreTurnSuccess,
                hotLink:  this.state.data.get('hot_link', 'https://jamja.vn/yes-party/?inApp=1'),
                fbLink:  this.state.data.get('fb_share_link', 'https://www.facebook.com/groups/sanjamja/'),
            })
        }
    }

    _onGetMoreTurnSuccess = (response) => {
        if (!!response.inc_turn) {
            this.setState({
                ...this.state,
                gameState: response.turn_count <= 0 ? GameState.STATE_NOT_ENOUGH_TURN : GameState.STATE_START,
                data: this.state.data.updateIn(['turn_count'], () => response.turn_count)
            });
        }
    }

    _onOpenNewActivity = () => {
        this.props.navigation.push('GameWebView', {url: `https://${PREFIX}jamja.vn/black-friday/activity/?inApp=1`, enableDirect: false});
        if (!this.state.data) return;
        this.setState({
            ...this.state,
            data: this.state.data.updateIn(['new_activities'], () => 0)
        })
    }

    _onOpenGiftList = () => {
        this.props.navigation.push('GameWebView', {url: `https://${PREFIX}jamja.vn/black-friday/giftbag/?inApp=1`, enableDirect: true});
        if (!this.state.data) return;
        this.setState({
            ...this.state,
            data: this.state.data.updateIn(['new_gift'], () => 0)
        })
    }

    _onOpenGameIntro = () => {
        this.props.navigation.push('GameWebView', {url: 'https://jamja.vn/yes-party/game/?inApp=1', enableDirect: false});
    }

    _dispatchInvitationTrigger = (id) => {
        try {
            const playerId = StringUtil.isEmpty(id) ? ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'referral', 'player_id']) : id;
            if (StringUtil.isEmpty(playerId)) return;
            campaignApi.shareReceived(playerId)
                .then(response => {
                    console.log('shareReceived:response:', response);
                })
                .catch(error => {
                    console.log('shareReceived:error:', error);
                });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        super.componentDidMount();
        console.log('Game:isEnableSound', ConfigDb.isEnableSound(), this.props);
        AnalyticsUtil.logCurrentScreen('game_screen');
        if (!this.props.isLoginned) {
            this.setState({
                ...this.state,
                gameState: GameState.STATE_ERROR,
                errorStatus: 'auth',
                isOpenSound: ConfigDb.isEnableSound()
            });
        }
        else {
            this.setState({
                ...this.state,
                gameState: GameState.STATE_PREPARING,
                errorStatus: undefined,
                isOpenSound: ConfigDb.isEnableSound()
            }, this._fetchGameUserInfo);
        }
    }

    componentWillUnmount() {
        if (!!Accelerometer) {
            if (!!ios) {
                !!AccelerometerEmitter && AccelerometerEmitter.removeListener(Accelerometer.EVENT, this._onShakeListener);
            }
            else {
                DeviceEventEmitter.removeListener(Accelerometer.EVENT, this._onShakeListener);
            }
            Accelerometer.stopHandler();
        }
        Sound.release();
        clearTimeout(this.enableShakeSubscription);
        AppState.removeEventListener('change', this._handleAppState);
        this._removeHandlerScreenFocus();

        super.componentWillUnmount();
    }
}
