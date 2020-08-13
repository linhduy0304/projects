import React from 'react'
import PropTypes from 'prop-types'
import {Dimensions, TouchableOpacity, View} from "react-native";
import {Text} from "native-base";

import {BasePureComponent} from "../../../common/base/BasePureComponent";
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_BUTTON_SMALL,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_HEADER, DIMENSION_TEXT_SUB
} from "../../../resources/dimens";
import IOSNotificationGuideItem from "./IOSNotificationGuideItem";
import {COLOR_PRIMARY} from "../../../resources/colors";

const {width, height} = Dimensions.get("window");

export default class IOSNotificationGuideView extends BasePureComponent {

    render() {

        const bunnyEarWidth = width * 0.4;
        const bunnyEarMarginLeft = (width - bunnyEarWidth) / 2;
        const bunnyEarHeight = width * 0.064;
        const notiLayoutMargin = width * 0.07;

        const paddingWidthMedium = width * 0.04;
        const paddingWidthLarge = width * 0.064;
        const paddingHeightExtra = height * 0.04;

        const notificationPaddingTop = height * 0.1;
        const notiLayoutRadius = width * 0.09;

        let notiFontSize = DIMENSION_TEXT_SUB;
        let notificationImageHeight = height * 0.08;
        let headerHeight = DIMENSION_TEXT_HEADER;

        if (width <= 320) {
            notiFontSize -= 2;
            headerHeight -= 2;
        }

        return (
            <View style={{flex: 1, backgroundColor: '#FA8893', justifyContent: 'flex-end'}}>
                <View>
                    <View
                        style={{
                            paddingTop: notificationPaddingTop,
                            paddingBottom: DIMENSION_PADDING_SMALL,
                            marginLeft: notiLayoutMargin,
                            marginRight: notiLayoutMargin,
                            borderTopLeftRadius: notiLayoutRadius,
                            borderTopRightRadius: notiLayoutRadius,
                            borderColor: '#FFCACA',
                            borderWidth: 1,
                            borderBottomColor: '#FA8893'
                        }}>

                        <IOSNotificationGuideItem image={require('../../../resources/images/splash/tiki_logo.png')}
                                                  imageSize={notificationImageHeight}
                                                  fontSize={notiFontSize}
                                                  brand={'TIKI.VN'}
                                                  message={' - [SÁCH] MCBooks GIẢM ĐẾN 50% sách ngoại ngữ các loại'}/>

                        <IOSNotificationGuideItem image={require('../../../resources/images/splash/hm_logo.png')}
                                                  imageSize={notificationImageHeight}
                                                  fontSize={notiFontSize}
                                                  brand={'H&M'}
                                                  message={' - [MEGA SALE] Giảm đến 60 tất cả các mặt hàng'}/>

                        <IOSNotificationGuideItem image={require('../../../resources/images/splash/pizzahut_logo.png')}
                                                  imageSize={notificationImageHeight}
                                                  fontSize={notiFontSize}
                                                  brand={'PIZZA HUT'}
                                                  message={' - Còn 2 ngày nữa là khuyến mãi Mua 1 tặng 1 hết hạn!'}/>

                    </View>
                    <View
                        style={{
                            backgroundColor: '#FA8893',
                            width: bunnyEarWidth,
                            height: bunnyEarHeight,
                            position: 'absolute',
                            top: 0,
                            left: bunnyEarMarginLeft,
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15,
                            borderTopColor: '#FA8893',
                            borderLeftColor: '#FFCACA',
                            borderRightColor: '#FFCACA',
                            borderBottomColor: '#FFCACA',
                            borderWidth: 1
                        }}/>

                </View>

                <View
                    style={{
                        backgroundColor: '#E0606C',
                        height: height / 3
                    }}>

                    <Text
                        style={{
                            color: 'white',
                            fontSize: headerHeight,
                            fontWeight: 'bold',
                            marginLeft: paddingWidthLarge,
                            marginRight: paddingWidthLarge,
                            marginTop: paddingHeightExtra
                        }}>
                        BẠN CẦN ĐƯỢC NHẮC NHỞ KHUYẾN MÃI?
                    </Text>

                    <View style={{height: 2, width: width / 6, backgroundColor: 'white', marginTop: 2, marginLeft: DIMENSION_PADDING_LARGE}}/>

                    <TouchableOpacity
                        style={{
                            marginLeft: paddingWidthMedium,
                            marginRight: paddingWidthMedium,
                            marginTop: paddingHeightExtra,
                            height: DIMENSION_BUTTON_MEDIUM,
                            backgroundColor: 'white',
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this._onAllowPressed}>

                        <Text
                            style={{
                                color: COLOR_PRIMARY,
                                fontSize: DIMENSION_TEXT_HEADER,
                                fontWeight: 'bold'
                            }}>
                            ĐỒNG Ý!
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            marginTop: DIMENSION_PADDING_SMALL,
                            height: DIMENSION_BUTTON_SMALL,
                            backgroundColor: 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this._onDenyPressed}>

                        <Text
                            style={{
                                color: '#FA8893',
                                fontSize: DIMENSION_TEXT_HEADER
                            }}>
                            Để sau
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    _onAllowPressed = () => {
        !!this.props.onAllowPressed && this.props.onAllowPressed();
    }

    _onDenyPressed = () => {
        !!this.props.onDenyPressed && this.props.onDenyPressed();
    }
}

IOSNotificationGuideView.propTypes = {
    onAllowPressed: PropTypes.any,
    onDenyPressed: PropTypes.any
}