import React from 'react'
import {
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Text,
} from 'react-native'
import {connect} from "react-redux";
import FastImage from 'react-native-fast-image'

import {getPaddingTopBar, isIphoneBunnyEar} from "../../../utils/common-utils";
import GameBoard from "./board/GameBoard";
import Repository from "./Repository";
import {GameState} from './GameUtil'
import SplashView from './SplashView'
import GameTut from "./GameTut";
import BottomView from "./BottomView";
import FadeInView from "../../common/view/FadeInView";
import {SFUFont} from "../sfu-font-util";
import ShakeProgressView from "./ShakeProgressView";
import ReturnGift from "./ReturnGift";
import ButtonBack from '../ButtonBack';
import GameBackground from './GameBackground';
import {DIMENSION_PADDING_LARGE} from "../../../resources/dimens";
import {ObjectUtil} from "../../../utils/object-utils";

const {width} = Dimensions.get('window');
const SCALABLE = width / 375;
const GAME_LOGO_WIDTH = 147 * SCALABLE;
const GAME_LOGO_HEIGHT = 73 * SCALABLE;
const GAME_BOARD_MARGIN_TOP = 16 * SCALABLE;
const GAME_BOARD_WIDTH = 305 * SCALABLE;
const GAME_BOARD_HEIGHT = 397 * SCALABLE;
const GAME_BOARD_BOX_HEIGHT = GAME_BOARD_HEIGHT - GAME_BOARD_MARGIN_TOP;
const GAME_BOX_WIDTH = GAME_BOARD_WIDTH - 48;
const SHAKE_PROGRESS_WIDTH = GAME_BOX_WIDTH - 18;

const BUTTON_ACTIVITY = 0.7;

const iphoneX = isIphoneBunnyEar();
const paddingTopBar = getPaddingTopBar();
const sizeStyle = {
    size_8: 8*SCALABLE,
    size_10: 10*SCALABLE,
    size_12: 12*SCALABLE,
    size_14: 14*SCALABLE,
    size_16: 16*SCALABLE,
    size_43: 43*SCALABLE,
    size_40: 40*SCALABLE,
    size_58: 58*SCALABLE,
    size_52: 52*SCALABLE,
};

class Campaign11Game extends Repository {

    render() {
        if (this.state.gameState === GameState.STATE_PREPARING) return <SplashView scalable={SCALABLE} navigation={this.props.navigation}/>;

        return (
            <View
                style={{flex: 1, alignItems: 'center'}}>

                <GameBackground scalable={SCALABLE}/>

                <View
                    style={{
                        backgroundColor: 'transparent',
                        height: paddingTopBar + (iphoneX ? 34 : 0),
                        width: '100%'
                    }}/>

                <Text
                    style={{
                        ...SFUFont.demi,
                        fontSize: sizeStyle.size_14,
                        color: 'white',
                        marginTop: DIMENSION_PADDING_LARGE
                    }}>
                    ID: {!!this.state.data ? this.state.data.get('user_game_id', '') : ''}
                </Text>

                <GameBoard scalable={SCALABLE}
                           status={this.state.gameState}
                           onPressLogin={this.state.errorStatus === 'auth' ? this._onLoginClicked : undefined}
                           giftImage={!!this.state.data ? this.state.data.getIn(['gift', 'gift_image']) : undefined}
                           controller={this._setGameBoardController}
                           errorStatus={this.state.errorStatus}
                           onGameStopped={this._onRunningFinished}
                           onPressGetMoreTurn={this.state.gameState === GameState.STATE_NOT_ENOUGH_TURN ? this._onGetMoreTurnClicked : undefined}/>

                 {/*Top controll*/}
                 <View
                     style={{
                         justifyContent: 'space-between',
                         flexDirection: 'row',
                         marginTop: 0,
                         position: 'absolute',
                         top: 32,
                         left: 0,
                         right: 0
                     }}>
                     <ButtonBack onPress={this._onBackPressClicked}/>

                     {
                         this.state.gameState !== GameState.STATE_PREPARING
                         &&
                         this.state.gameState !== GameState.STATE_ERROR
                         &&
                         <TouchableOpacity
                             style={styles.buttonSound}
                             activeOpacity={BUTTON_ACTIVITY}
                             onPress={this._buttonSoundClicked}>

                             <FastImage
                                 source={this.state.isOpenSound ? require('../../../resources/game/button_sound_on.png') : require('../../../resources/game/button_sound_off.png')}
                                 style={{
                                     width: 42,
                                     height: 42
                                 }}
                                 resizeMode={FastImage.resizeMode.contain}/>

                         </TouchableOpacity>
                     }
                 </View>

                {
                    this.state.gameState !== GameState.STATE_ERROR
                    &&
                    <FadeInView>
                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 4
                            }}>

                            <ShakeProgressView width={SHAKE_PROGRESS_WIDTH}
                                               isEnableSound={this.state.isOpenSound}
                                               setShakeProgressViewListener={this._setShakeProgressViewListener}
                                               onStartRunning={this._onStartRunningGift}/>

                            <FastImage
                                source={require('../../../resources/game/button_shake.png')}
                                style={{
                                    width: 32,
                                    height: 32,
                                    marginTop: sizeStyle.size_8,
                                    opacity: this.state.gameState === GameState.STATE_NOT_ENOUGH_TURN ? 0.5 : 1
                                }}
                                resizeMode={FastImage.resizeMode.contain}/>
                        </View>
                    </FadeInView>
                }

                {
                    this.state.gameState === GameState.STATE_TUT
                    &&
                    <GameTut onCloseClicked={this._onCloseTutClicked}/>
                }

                {
                    this.state.gameState !== GameState.STATE_ERROR &&
                    <BottomView
                        scalable={SCALABLE}
                        newActivityCount={this.state.data.get('new_activities')}
                        newGiftCount={this.state.data.get('new_gift')}
                        turnCount={this.state.data.get('turn_count', 0)}
                        sizeStyle={sizeStyle}
                        onGetMoreTurnClicked={this._onGetMoreTurnClicked}
                        onOpenGameIntroClicked={this._onOpenGameIntro}
                        onOpenGiftListClicked={this._onOpenGiftList}
                        onOpenNewActivityClicked={this._onOpenNewActivity}/>
                }

                {
                    this.state.gameState === GameState.STATE_RETURN_GIFT
                    &&
                    <ReturnGift onCloseReturnGift={this._onCloseReturnGift}
                                gift={this.state.data.get('gift')}
                                openGiftDetail={this._openGiftDetail}/>
                }

            </View>
        )
    }

    _onBackPressClicked = () => this.props.navigation.goBack();

    componentWillReceiveProps(nextProps) {
        console.log('Game:componentWillReceiveProps:', nextProps);
        try {
            if (!!nextProps.isLoginned && !this.props.isLoginned) {
                this.setState({
                    ...this.state,
                    gameState: GameState.STATE_PREPARING,
                    errorStatus: undefined
                }, this._fetchGameUserInfo);
            }

            if (!!nextProps.isLoginned &&
                ObjectUtil.getValue(nextProps, undefined, ['navigation', 'state', 'params', 'referral', 'player_id']) !==
                ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'referral', 'player_id'])) {

                this._dispatchInvitationTrigger(ObjectUtil.getValue(nextProps, undefined, ['navigation', 'state', 'params', 'referral', 'player_id']));
            }
        } catch (e) {
            console.log(e);
        }
    }
}

const styles = StyleSheet.create({
    buttonBack: {
    },
    buttonSound: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 42,
        height: 42,
        marginRight: sizeStyle.size_14
    },
    viewBoardMain: {
        width: GAME_BOARD_WIDTH,
        height: GAME_BOARD_HEIGHT,
        alignItems: 'center',
        alignSelf: 'center'
    },

    gameBox: {
        width: GAME_BOARD_WIDTH,
        height: GAME_BOARD_BOX_HEIGHT,
        marginTop: GAME_BOARD_MARGIN_TOP
    },

    gameLogo: {
        width: GAME_LOGO_WIDTH,
        height: GAME_LOGO_HEIGHT,
        position: 'absolute'
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    badgeNumberBg: {
        backgroundColor: '#11BD00',
        borderRadius: 7,
        borderColor: '#11BD00',
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 5,
        paddingRight: 5,
        position: 'absolute',
        left: 35
    },
    badgeNumber: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: sizeStyle.size_12
    }
});

function mapStateToProps(state) {
    return {
        isLoginned: state.loginReducer.isLoginned
    };
}

export default connect(mapStateToProps)(Campaign11Game);
