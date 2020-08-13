import React from 'react'
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'native-base';
import {BaseComponent} from "../../../../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_SUB
} from "../../../../../resources/dimens";
import {
    COLOR_LINE,
    COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE,
    COLOR_TEXT_INACTIVE_DISABLE
} from "../../../../../resources/colors";
import JJIcon from "../../../../common/JJIcon";
import {StringUtil} from "../../../../../utils/string-util";
import {TimeBaseStatus} from "../../repo/BookingRepo";
import {DEAL_TYPE_MOVIE} from "../../../../../const";

export default class StoreSelectBox extends BaseComponent {

    render() {
        if (!this.props.timebaseBooking) return null;

        const disable = !!this.props.timebaseBooking.get('isLoading') ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.LOADING ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.NOT_GO_LIVE ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.EMPTY_STORE;

        const color = disable ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_TEXT_BLACK_1;

        return (
            <View
                style={{
                    flex: 1
                }}>
                <Text
                    style={{
                        color: COLOR_TEXT_INACTIVE,
                        fontSize: DIMENSION_TEXT_SUB,
                        marginLeft: DIMENSION_PADDING_MEDIUM
                    }}>
                    {`Chọn ${this.props.dealType === DEAL_TYPE_MOVIE ? 'rạp chiếu' : 'cửa hàng'} (${this.props.storeCount})`}
                </Text>
                <TouchableOpacity
                    onPress={this.props.onPressed}
                    disabled={disable}
                    activeOpacity={0.8}
                    style={{
                        padding: DIMENSION_PADDING_SMALL,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: COLOR_LINE,
                        borderWidth: 1,
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        marginRight: DIMENSION_PADDING_MEDIUM,
                        marginTop: DIMENSION_PADDING_SMALL
                    }}>
                    <JJIcon name={'map_pin_o'}
                            size={12}
                            color={color} />

                    <Text numberOfLines={1}
                          style={{
                              marginLeft: 2,
                              marginRight: 2,
                              flex: 1,
                              fontSize: DIMENSION_TEXT_CONTENT,
                              color: color
                          }}>
                        {this.props.timebaseBooking.getIn(['selected', 'store', 'address'], '')}
                    </Text>
                    {
                        !StringUtil.isEmpty(this.props.timebaseBooking.getIn(['selected', 'store', 'distance'])) &&
                        <Text style={{color: color, fontSize: DIMENSION_TEXT_CONTENT, marginRight: 2}}>
                            ({this.props.timebaseBooking.getIn(['selected', 'store', 'distance'])}km)
                        </Text>
                    }
                    <JJIcon style={{ alignSelf: 'flex-end', marginBottom: 3 }}
                            name={'chevron_down_o'}
                            size={8}
                            color={color} />
                </TouchableOpacity>
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            if (!nextProps.timebaseBooking) return true;
            if (!this.props.timebaseBooking) return true;
            if (nextProps.timebaseBooking.get('status') !== this.props.timebaseBooking.get('status')) return true;
            if (nextProps.timebaseBooking.get('isLoading') !== this.props.timebaseBooking.get('isLoading')) return true;
        } catch (e) {
            console.log(e);
        }
        return false;
    }
}

StoreSelectBox.propTypes = {
    onPressed: PropTypes.any,
    storeCount: PropTypes.any,
    dealType: PropTypes.any,
    timebaseBooking: PropTypes.any
}
