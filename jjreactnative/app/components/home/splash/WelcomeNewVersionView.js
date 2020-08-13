import React from 'react'
import PropTypes from 'prop-types'
import {View, TouchableOpacity, Dimensions} from "react-native";
import {Text} from "native-base";
import FastImage from 'react-native-fast-image'

import {BasePureComponent} from "../../../common/base/BasePureComponent";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_HEADER, DIMENSION_TEXT_HEADER_XX
} from "../../../resources/dimens";

import {CommonUtil} from '../../../utils/common-utils'
import {COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../../resources/colors";
import FadeInView from '../../common/view/FadeInView'

const {height, width} = Dimensions.get("window");
const iphoneX = CommonUtil.isIphoneBunnyEar();

const IMAGE_ORIGIN_WIDTH = 375;
const IMAGE_ORIGIN_HEGIHT = 433;
const imageScaleValue = width / IMAGE_ORIGIN_WIDTH;

export default class WelcomeNewVersionView extends BasePureComponent {

    render() {

        const welcomeMarginBottom = height * 0.07;
        const imageHeight = imageScaleValue * IMAGE_ORIGIN_HEGIHT;
        let welcomeTextSize = DIMENSION_TEXT_HEADER_XX;
        if (width <= 330) welcomeTextSize -= 4;

        return (
            <FadeInView style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: 'white'}}>

                    <FastImage
                        source={require('../../../resources/images/splash/welcome_new_version.png')}
                        style={{width: width, height: imageHeight}}
                        resizeMode={FastImage.resizeMode.cover}/>

                    <View
                        style={{
                            position: 'absolute',
                            left: DIMENSION_PADDING_MEDIUM,
                            right: DIMENSION_PADDING_MEDIUM,
                            bottom: iphoneX ? 101 : 88,
                            top: height * 0.3,
                            justifyContent: 'center'
                        }}>

                        <View
                            style={{
                                height: 80,
                                width: 80,
                                borderWidth: 1,
                                borderRadius: 40,
                                borderColor: COLOR_LINE,
                                backgroundColor: '#fafafa',
                                justifyContent: 'center'
                            }}>

                            <FastImage
                                source={require('../../../resources/images/splash/jamja_logo_with_color.png')}
                                style={{height: 48}}
                                resizeMode={FastImage.resizeMode.contain}/>
                        </View>

                        <Text
                            style={{
                                color: COLOR_TEXT_BLACK_1,
                                fontSize: welcomeTextSize,
                                marginTop: DIMENSION_PADDING_MEDIUM
                            }}>
                            CHÚC MỪNG!
                        </Text>

                        <Text
                            style={{
                                color: COLOR_TEXT_BLACK_1,
                                fontSize: welcomeTextSize,
                                marginTop: welcomeMarginBottom,
                                fontWeight: 'bold'
                            }}>
                            {
                                `Ứng dụng yêu thích của bạn\nvừa được nâng cấp trải nghiệm\nhoàn toàn mới.`
                            }
                        </Text>

                        <View style={{width: width / 3, height: 4, backgroundColor: COLOR_PRIMARY, marginTop: DIMENSION_PADDING_SMALL}}/>


                    </View>

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: iphoneX ? 37 : DIMENSION_PADDING_LARGE,
                            left: DIMENSION_PADDING_MEDIUM,
                            right: DIMENSION_PADDING_MEDIUM,
                            height: DIMENSION_BUTTON_MEDIUM,
                            backgroundColor: COLOR_PRIMARY,
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this._onPressed}>

                        <Text
                            style={{
                                color: 'white',
                                fontSize: DIMENSION_TEXT_HEADER,
                                fontWeight: 'bold'
                            }}>
                            JAMJA NGAY!
                        </Text>

                    </TouchableOpacity>

                </View>
            </FadeInView>
        )
    }

    _onPressed = () => {
        !!this.props.onPress && this.props.onPress();
    }
}

WelcomeNewVersionView.propTypes = {
    onPress: PropTypes.any,
}