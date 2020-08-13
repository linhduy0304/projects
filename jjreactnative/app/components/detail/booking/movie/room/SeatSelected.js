import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import PropTypes from 'prop-types';

import {BaseComponent} from "../../../../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_SUB,
} from "../../../../../resources/dimens";
import {
    COLOR_GRAY_BG,
    COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE,
    COLOR_TEXT_INACTIVE_DISABLE
} from "../../../../../resources/colors";
import JJIcon from '../../../../common/JJIcon';
import {StringUtil} from '../../../../../utils/string-util'

export default class SeatSelected extends BaseComponent {

    render() {

        if (!this.props.seat) return null;

        return (
            <View
                style={{
                    minWidth: this.props.itemWidth,
                    marginRight: DIMENSION_PADDING_SMALL,
                    paddingRight: 6
                }}>

                <View
                    style={{
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        borderWidth: 1,
                        marginTop: 4,
                        borderColor: COLOR_TEXT_INACTIVE_DISABLE,
                        paddingLeft: DIMENSION_PADDING_SMALL,
                        paddingRight: DIMENSION_PADDING_SMALL,
                        paddingTop: DIMENSION_PADDING_TINY,
                        paddingBottom: DIMENSION_PADDING_TINY,
                        minWidth: this.props.itemWidth,
                        justifyContent: 'center'
                    }}>

                    <Text
                        style={{
                            color: COLOR_TEXT_BLACK_1,
                            fontSize: DIMENSION_TEXT_SUB,
                            fontWeight: 'bold'
                        }}>

                        {this.props.seat.get('seatName')}

                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <Text
                            style={{
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_SUB,
                                marginRight: DIMENSION_PADDING_TINY,
                                textDecorationLine: 'line-through'
                            }}>

                            {!!this.props.seat.get('ticket_price') ? StringUtil.numberFormat(this.props.seat.get('ticket_price')) : ''}

                        </Text>

                        <Text
                            style={{
                                color: COLOR_PRIMARY,
                                fontSize: DIMENSION_TEXT_SUB,
                                fontWeight: 'bold',
                                textAlign: 'right'
                            }}
                            numberOfLines={1}>

                            {StringUtil.numberFormat(this.props.seat.get('highlight', ''))}

                        </Text>
                    </View>

                    <View
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            borderColor: COLOR_TEXT_INACTIVE_DISABLE,
                            borderWidth: 1,
                            backgroundColor: 'white',
                            position: 'absolute',
                            left: -6
                        }}/>

                </View>

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        paddingLeft: 16,
                        paddingBottom: 12
                    }}
                    activeOpacity={0.8}
                    onPress={this._onRemovePress}>

                    <View style={{backgroundColor: COLOR_GRAY_BG}}>
                        <JJIcon
                            name={'x_circle_o'}
                            color={COLOR_TEXT_INACTIVE}
                            size={12}/>
                    </View>

                </TouchableOpacity>

            </View>
        )
    }

    _onRemovePress = () => {
        this.props.onRemoveSeatSelectedPress(this.props.seat);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.itemWidth !== this.props.itemWidth) return true;
        if (!nextProps.seat) return true;
        if (!this.props.seat) return true;

        if (nextProps.seat.get('id') !== this.props.seat.get('id')) return true;
        if (nextProps.seat.get('rowIndex') !== this.props.seat.get('rowIndex')) return true;

        return false;
    }
}

SeatSelected.propTypes = {
    itemWidth: PropTypes.any,
    seat: PropTypes.any,
    onRemoveSeatSelectedPress: PropTypes.any
}