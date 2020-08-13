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
import {dealSlotUnit} from '../../../../../utils/TextUtils'
import {TimeBaseStatus} from "../../repo/BookingRepo";

export default class SlotSelectBox extends BaseComponent {

    render() {
        if (!this.props.timebaseBooking) return null;

        const disable = !!this.props.timebaseBooking.get('isLoading') ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.LOADING ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.NOT_GO_LIVE ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.UNKNOWN_ERROR ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.EMPTY_STORE ||
            this.props.timebaseBooking.get('minOfMinSlot', 0) < 1;

        return (
            <View
                style={{
                    marginRight: DIMENSION_PADDING_MEDIUM
                }}>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                    <Text style={{ color: COLOR_TEXT_INACTIVE, alignSelf: 'flex-start', fontSize: DIMENSION_TEXT_SUB }}>
                        Số lượng
                    </Text>
                    <Text style={{ color: COLOR_TEXT_INACTIVE, alignSelf: 'flex-end', fontSize: DIMENSION_TEXT_SUB }}>
                        (SL≥{this.props.timebaseBooking.get('minOfMinSlot', 0)})
                    </Text>
                </View>
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
                        marginTop: DIMENSION_PADDING_SMALL,
                        justifyContent: 'space-between'
                    }}>
                    <JJIcon name={'user_o'}
                            size={12}
                            color={COLOR_TEXT_BLACK_1} />

                    <Text numberOfLines={1}
                          style={{
                              marginLeft: 2,
                              marginRight: 2,
                              fontSize: DIMENSION_TEXT_CONTENT,
                              color: disable ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_TEXT_BLACK_1
                          }}>
                        {this.props.timebaseBooking.getIn(['selected', 'slot'], '')}{` ${dealSlotUnit(this.props.hintText)}`}
                    </Text>

                    <JJIcon style={{ alignSelf: 'flex-end', marginBottom: 3 }}
                            name={'chevron_down_o'}
                            size={8}
                            color={disable ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_TEXT_BLACK_1} />
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
            if (nextProps.timebaseBooking.getIn(['selected', 'slot']) !== this.props.timebaseBooking.getIn(['selected', 'slot'])) return true;
            if (nextProps.timebaseBooking.get('minOfMinSlot') !== this.props.timebaseBooking.get('minOfMinSlot')) return true;
        } catch (e) {
            console.log(e);
        }
        return false;
    }
}

SlotSelectBox.propTypes = {
    onPressed: PropTypes.any,
    hintText: PropTypes.any,
    timebaseBooking: PropTypes.any
}
