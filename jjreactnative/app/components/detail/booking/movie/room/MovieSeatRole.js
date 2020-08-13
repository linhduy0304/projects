import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import {BaseComponent} from "../../../../common/BaseComponent";
import {COLOR_TEXT_BLACK_1} from "../../../../../resources/colors";
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_SUB
} from "../../../../../resources/dimens";

export default class MovieSeatRole extends BaseComponent {

    render() {
        return (
            <View
                style={{
                    width: '100%',
                    paddingLeft: DIMENSION_PADDING_LARGE,
                    paddingRight: DIMENSION_PADDING_LARGE,
                    paddingTop: DIMENSION_PADDING_SMALL,
                    paddingBottom: DIMENSION_PADDING_SMALL
                }}>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}>

                        <FastImage
                            style={{
                                width: 16,
                                height: 16,
                            }}
                            source={require('../../../../../resources/bhd/seat_normal.png')}
                            resizeMode={FastImage.resizeMode.contain}/>

                        <Text
                            style={{
                                color: COLOR_TEXT_BLACK_1,
                                fontSize: DIMENSION_TEXT_SUB,
                                marginLeft: 2
                            }}>
                            Trống
                        </Text>

                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}>

                        <FastImage
                            style={{
                                width: 16,
                                height: 16,
                            }}
                            source={require('../../../../../resources/bhd/seat_selected.png')}
                            resizeMode={FastImage.resizeMode.contain}/>

                        <Text
                            style={{
                                color: COLOR_TEXT_BLACK_1,
                                fontSize: DIMENSION_TEXT_SUB,
                                marginLeft: 2
                            }}>
                            Đang chọn
                        </Text>

                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}>

                        <FastImage
                            style={{
                                width: 16,
                                height: 16,
                            }}
                            source={require('../../../../../resources/bhd/seat_locked.png')}
                            resizeMode={FastImage.resizeMode.contain}/>

                        <Text
                            style={{
                                color: COLOR_TEXT_BLACK_1,
                                fontSize: DIMENSION_TEXT_SUB,
                                marginLeft: 2
                            }}>
                            Không thể chọn
                        </Text>

                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: DIMENSION_PADDING_SMALL
                    }}>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}>

                        <FastImage
                            style={{
                                width: 35,
                                height: 13,
                            }}
                            source={require('../../../../../resources/bhd/seat_couple.png')}
                            resizeMode={FastImage.resizeMode.contain}/>

                        <Text
                            style={{
                                color: COLOR_TEXT_BLACK_1,
                                fontSize: DIMENSION_TEXT_SUB,
                                marginLeft: 2
                            }}>
                            Couple
                        </Text>

                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}>

                        <FastImage
                            style={{
                                width: 16,
                                height: 16,
                            }}
                            source={require('../../../../../resources/bhd/seat_first_class.png')}
                            resizeMode={FastImage.resizeMode.contain}/>

                        <Text
                            style={{
                                color: COLOR_TEXT_BLACK_1,
                                fontSize: DIMENSION_TEXT_SUB,
                                marginLeft: 2
                            }}>
                            First Class
                        </Text>

                    </View>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}>

                        <FastImage
                            style={{
                                width: 16,
                                height: 16,
                            }}
                            source={require('../../../../../resources/bhd/seat_vip.png')}
                            resizeMode={FastImage.resizeMode.contain}/>

                        <Text
                            style={{
                                color: COLOR_TEXT_BLACK_1,
                                fontSize: DIMENSION_TEXT_SUB,
                                marginLeft: 2
                            }}>
                            VIP
                        </Text>

                    </View>
                </View>
            </View>
        )
    }

    shouldComponentUpdate(nextProps) {
        return false;
    }
}

MovieSeatRole.propTypes = {
    scalable: PropTypes.any
}