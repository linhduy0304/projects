import React from 'react'
import {View, Dimensions, TouchableOpacity, Text} from 'react-native'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import {BasePureComponent} from "../../common/BasePureComponent";
import SpringView from '../../common/view/SpringView'
import {SFUFont} from "../sfu-font-util";
import LinearGradient from "react-native-linear-gradient";
import {DIMENSION_PADDING_SMALL} from "../../../resources/dimens";

const {width, height} = Dimensions.get('window');
const SCALABLE = width/375;
const POPUP_WIDTH = SCALABLE*305;
const POPUP_HEIGHT = SCALABLE*435;
const BUTTON_GET_SIZE = SCALABLE * 48;
const GIFT_BG_W = SCALABLE * 185;
const GIFT_ITEM_SIZE = GIFT_BG_W/1.2;
const FONT_18 = SCALABLE*18;
const PADDING = SCALABLE*32;

export default class GameTut extends BasePureComponent {

    render() {

        return (
            <View
                style={{
                    position: 'absolute',
                    width,
                    height,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <View
                    style={{
                        width,
                        height,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 31,
                        position: 'absolute'
                    }}>

                    <SpringView>
                        <FastImage
                            style={{
                                width: POPUP_WIDTH,
                                height: POPUP_HEIGHT
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                            source={require('../../../resources/game/game_tut_bg.png')}/>

                        <View
                            style={{
                                height: POPUP_HEIGHT,
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                padding: PADDING,
                                position: 'absolute',
                                justifyContent: 'center'
                            }}>

                            <Text style={{color: 'white', fontSize: FONT_18, textAlign: 'center', ...SFUFont.demi}}>
                                HƯỚNG DẪN CHƠI
                            </Text>

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                                <FastImage
                                    source={require('../../../resources/game/phone_shake.png')}
                                    style={{
                                        width: GIFT_ITEM_SIZE,
                                        height: GIFT_ITEM_SIZE
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}/>

                            </View>

                            <LinearGradient
                                colors={['#E98514', '#F7E21B', '#15EB00']}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                style={{
                                    width: '70%',
                                    height: 6,
                                    borderRadius: 2,
                                    borderColor: '#d1d1d1',
                                    alignSelf: 'center'
                                }}/>

                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: FONT_18,
                                    marginTop: DIMENSION_PADDING_SMALL,
                                    marginBottom: DIMENSION_PADDING_SMALL,
                                    textAlign: 'center',
                                    ...SFUFont.demi
                                }}>
                                Lắc mạnh điện thoại đến khi thanh năng lượng được làm đầy
                            </Text>

                            <TouchableOpacity
                                style={{
                                    height: BUTTON_GET_SIZE,
                                    backgroundColor: 'white',
                                    borderRadius: 14,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 4
                                }}
                                activeOpacity={0.8}
                                onPress={this.props.onCloseClicked}>

                                <Text style={{color: '#E85002', fontSize: FONT_18, ...SFUFont.bold}}
                                      uppercase={true}>
                                    LẮC NGAY!
                                </Text>

                            </TouchableOpacity>

                        </View>
                    </SpringView>

                </View>

            </View>
        )
    }
}

GameTut.propTypes = {
    onCloseClicked: PropTypes.any
}