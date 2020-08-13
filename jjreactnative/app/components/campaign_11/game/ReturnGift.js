import React from 'react'
import {View, Dimensions, TouchableOpacity, Text, Platform} from 'react-native'
import LottieView from "lottie-react-native";
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import {BasePureComponent} from "../../common/BasePureComponent";
import SpringView from '../../common/view/SpringView'
import {SFUFont} from "../sfu-font-util";

const {width, height} = Dimensions.get('window');
const SCALABLE = width/375;
const BUTTON_CLOSE_SIZE = SCALABLE * 53;
const BUTTON_GET_SIZE = SCALABLE * 48;
const GIFT_BG_W = SCALABLE * 185;
const GIFT_BG_H = SCALABLE * 201;
const GIFT_ITEM_SIZE = GIFT_BG_W/2;
const GIFT_ITEM_TOP = GIFT_ITEM_SIZE/3;
const FONT_20 = SCALABLE*20;
const FONT_18 = SCALABLE*18;
const ios = Platform.OS === 'ios';
const CONTENT_MARGIN = BUTTON_CLOSE_SIZE/3.3;
const BG_WIDTH = (SCALABLE*329) - 12;
const BG_HEIGHT = (SCALABLE*459) - 12;

export default class ReturnGift extends BasePureComponent {


    constructor(props) {
        super(props);
        this.state = {
            initialization: true
        };
    }

    render() {

        if (!this.props.gift) return null;

        let image = this.props.gift.get('gift_image');
        if (!image || image === 'no_gift') {
            image = require('../../../resources/game/gift/no_gift.png');
        }
        else {
            image = {uri: image};
        }

        return (
            <View
                style={{
                    position: 'absolute',
                    width,
                    height,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                {
                    !!this.state.initialization &&
                    <LottieView
                        style={{
                            width,
                            height,
                            opacity: ios ? 1 : 0.8
                        }}
                        autoPlay={true}
                        resizeMode={'cover'}
                        source={ios ? require('../../../resources/lottie/star_success.json') : require('../../../resources/lottie/fireworks.json')}
                    />
                }

                {
                    !this.state.initialization &&
                    <View
                        style={{
                            width,
                            height,
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute'
                        }}>

                        <SpringView>
                            <FastImage
                                style={{
                                    width: BG_WIDTH,
                                    height: BG_HEIGHT,
                                    margin: CONTENT_MARGIN
                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                                source={require('../../../resources/game/gift_return_background.png')}/>

                            <View
                                style={{
                                    height: BG_HEIGHT,
                                    width: BG_WIDTH,
                                    margin: CONTENT_MARGIN,
                                    padding: 24,
                                    position: 'absolute',
                                    justifyContent: 'center'
                                }}>

                                <Text style={{color: '#fff', fontSize: FONT_18, textAlign: 'center', ...SFUFont.bold}}
                                      uppercase={true}>
                                    {this.props.gift.get('alert_title', '')}
                                </Text>

                                <Text style={{color: '#fff', fontSize: FONT_18, textAlign: 'center', ...SFUFont.demi}}>
                                    {this.props.gift.get('alert_sub_title', '')}
                                </Text>

                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                                    <FastImage
                                        source={require('../../../resources/game/gift/bg.png')}
                                        style={{
                                            width: GIFT_BG_W,
                                            height: GIFT_BG_H
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}/>

                                    <FastImage
                                        source={image}
                                        style={{
                                            width: GIFT_ITEM_SIZE,
                                            height: GIFT_ITEM_SIZE,
                                            position: 'absolute',
                                            top: GIFT_ITEM_TOP
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}/>

                                </View>

                                <Text style={{color: 'white', fontSize: FONT_20, textAlign: 'center', ...SFUFont.demi}}>
                                    {this.props.gift.get('gift_title', '')}
                                </Text>

                                <Text style={{color: 'white', fontSize: FONT_20, textAlign: 'center', ...SFUFont.regular}}>
                                    {this.props.gift.get('gift_sub_title', '')}
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        height: BUTTON_GET_SIZE,
                                        backgroundColor: 'white',
                                        marginLeft: 8,
                                        marginRight: 8,
                                        marginBottom: 8,
                                        borderRadius: 14,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 4
                                    }}
                                    activeOpacity={0.8}
                                    onPress={this.props.openGiftDetail}>

                                    <Text style={{color: '#BC1729', fontSize: FONT_18, ...SFUFont.bold}}
                                          uppercase={true}>
                                        {this.props.gift.get('btn_label', '')}
                                    </Text>

                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0
                                }}
                                activeOpacity={0.8}
                                onPress={this.props.onCloseReturnGift}>

                                <FastImage
                                    style={{
                                        width: BUTTON_CLOSE_SIZE,
                                        height: BUTTON_CLOSE_SIZE
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={require('../../../resources/game/button_x.png')}/>
                            </TouchableOpacity>
                        </SpringView>

                    </View>
                }

            </View>
        )
    }

    _startFirework = () => {
        this.fireworkDelayTimeout = setTimeout(() => {
            this.setState({
                ...this.state,
                initialization: false
            })
        }, 4000);
    }

    componentDidMount() {
        super.componentDidMount();
        this._startFirework();
    }

    componentWillUnmount() {
        clearTimeout(this.fireworkDelayTimeout);
        super.componentWillUnmount();
    }
}

ReturnGift.propTypes = {
    onCloseReturnGift: PropTypes.any,
    gift: PropTypes.any,
    openGiftDetail: PropTypes.any
}