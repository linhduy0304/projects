import React from 'react';
import {Text} from 'native-base';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';

import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_SUB
} from "../../../../../resources/dimens";
import JJIcon from '../../../../common/JJIcon';
import {BasePureComponent} from "../../../../common/BasePureComponent";

moment.locale('vi');

export default class MovieRoomHeader extends BasePureComponent {

    render() {

        console.log('MovieRoomHeader:render', this.props);

        const bookingTime = moment(this.props.bookingTime);

        return (
            <View
                style={{
                    paddingTop: DIMENSION_PADDING_SMALL,
                    paddingBottom: DIMENSION_PADDING_SMALL,
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                    paddingRight: DIMENSION_PADDING_MEDIUM,
                    backgroundColor: 'white'
                }}>
                <Text
                    style={{
                        color: COLOR_TEXT_BLACK_1,
                        fontSize: DIMENSION_TEXT_CONTENT,
                        fontWeight: 'bold',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    {this.props.name}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginTop: DIMENSION_PADDING_TINY,
                        marginBottom: DIMENSION_PADDING_TINY
                    }}>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>

                            <JJIcon
                                name={'clock_o'}
                                color={COLOR_TEXT_INACTIVE}
                                size={DIMENSION_TEXT_SUB}/>

                            <Text
                                style={{
                                    color: COLOR_PRIMARY,
                                    fontSize: DIMENSION_TEXT_SUB,
                                    marginLeft: 2
                                }}>
                                {bookingTime.format('hh:mm A')}
                            </Text>

                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: DIMENSION_PADDING_MEDIUM
                            }}>

                            <JJIcon
                                name={'calendar_o'}
                                color={COLOR_TEXT_INACTIVE}
                                size={DIMENSION_TEXT_SUB}/>

                            <Text
                                style={{
                                    color: COLOR_PRIMARY,
                                    fontSize: DIMENSION_TEXT_SUB,
                                    marginLeft: 2
                                }}>
                                {bookingTime.format('DD/MM/YYYY')}
                            </Text>

                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignSelf: 'flex-end'
                        }}>

                        <Text
                            style={{
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_SUB
                            }}>
                            Ưu đãi:
                        </Text>

                        <Text
                            style={{
                                color: COLOR_PRIMARY,
                                fontSize: DIMENSION_TEXT_SUB,
                                marginLeft: 2
                            }}>
                            {this.props.highlight}
                        </Text>

                    </View>

                </View>

                <Text
                    style={{
                        color: COLOR_TEXT_INACTIVE,
                        fontSize: DIMENSION_TEXT_SUB,
                    }}
                    numberOfLines={1}>
                    {this.props.storeAddress}
                </Text>

            </View>
        )
    }
}

MovieRoomHeader.propTypes = {
    name: PropTypes.any,
    bookingTime: PropTypes.any,
    highlight: PropTypes.any,
    storeAddress: PropTypes.any,
}