import React from 'react'
import {Text} from 'native-base';
import {
    View, StyleSheet, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types'
import moment from 'moment/min/moment-with-locales';
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT
} from "../../../../../resources/dimens";
import {
    COLOR_ORANGE, COLOR_PRIMARY, COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE,
} from "../../../../../resources/colors";
import {BaseComponent} from "../../../../common/BaseComponent";
import {TimeBaseStatus} from "../../repo/BookingRepo";
import {DEAL_TYPE_MOVIE} from "../../../../../const";

moment.locale('vi');

const HeightOfTimeBase = 56;

export default class TimeSelectionItem extends BaseComponent {

    isSelected = false;

    render() {
        if (!this.props.time || !!this.props.time.get('divider')) {
            return (
                <View style={{paddingTop: DIMENSION_PADDING_SMALL, paddingBottom: DIMENSION_PADDING_MEDIUM, paddingRight: DIMENSION_PADDING_MEDIUM}}>
                    <View style={{height: HeightOfTimeBase, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={[styles.dividerTimebaseSelection, {marginLeft: 0}]}/>
                    </View>
                </View>
            )
        }

        const disabled = this.props.time.get('status') !== TimeBaseStatus.AVAILABLE;
        this.isSelected = false;
        try {
            this.isSelected = !!this.props.selectedTime && moment(this.props.time.get('time')).isSame(this.props.selectedTime.get('time'), 'minutes') && this.props.time.get('id') === this.props.selectedTime.get('id');
        } catch (e) {
            console.log(e);
        }

        return (
            <TouchableOpacity style={{paddingTop: DIMENSION_PADDING_SMALL, paddingBottom: DIMENSION_PADDING_MEDIUM, paddingRight: DIMENSION_PADDING_MEDIUM}}
                              disabled={disabled}
                              onPress={this._onItemSelected}
                              activeOpacity={0.8}>
                <View style={[styles.container, { borderColor: disabled ? COLOR_TEXT_INACTIVE_DISABLE : this.isSelected ? COLOR_PRIMARY : COLOR_ORANGE }]}>

                    <View style={[styles.timer, { backgroundColor: disabled ? COLOR_TEXT_INACTIVE_DISABLE : this.isSelected ? COLOR_PRIMARY : COLOR_ORANGE }]}>
                        <Text style={{ color: disabled ? COLOR_TEXT_INACTIVE : 'white', fontSize: DIMENSION_TEXT_CONTENT }}>
                            {`${this._getTimeIcon()}${moment(this.props.time.get('time', '')).format('hh:mm A')}`}
                        </Text>
                    </View>

                    <View style={styles.tittle}>
                        <Text style={{ fontWeight: 'bold', color: disabled ? COLOR_TEXT_INACTIVE_DISABLE : this.isSelected ? COLOR_PRIMARY : COLOR_ORANGE, fontSize: DIMENSION_TEXT_CONTENT  }}>
                            {this._getHighlight()}
                        </Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    _getTimeIcon = () => {
        if (this.props.time.get('type') === 'flash_sale') return '⚡ ';
        return '';
    }

    _getHighlight = () => {
        switch (this.props.time.get('status')) {
            case TimeBaseStatus.AVAILABLE:
                return this.props.time.get('highlight', '');

            case TimeBaseStatus.SOLD_OUT:
                return this.props.dealType === DEAL_TYPE_MOVIE ? 'CHÁY VÉ' : 'CHÁY BÀN';

            case TimeBaseStatus.NOT_ENOUGH_SLOT:
                return 'K ĐỦ CHỖ';

            case TimeBaseStatus.OVER_SLOT:
                return `${this.props.time.get('highlight', '')} SL≤(${this.props.time.get('max_slot_per_voucher', '')})`;

            case TimeBaseStatus.NOT_ENOUGH_MIN_SLOT:
                return `${this.props.time.get('highlight', '')} SL≥(${this.props.time.get('min_slot', '')})`;
            default:
                return '';
        }
    }

    _onItemSelected = () => {
        try {
            if (!!this.props.selectedTime && moment(this.props.time.get('time')).isSame(this.props.selectedTime, 'minutes') && this.props.time.get('id') === this.props.selectedTime.get('id')) return;
        } catch (e) {
            console.log(e);
        }
        this.props.onSlotSelected(this.props.time, this.props.index);
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            if (!!nextProps.time && !nextProps.time.equals(this.props.time)) return true;

            const newSelected = !!nextProps.selectedTime &&
                moment(nextProps.time.get('time')).isSame(nextProps.selectedTime.get('time'), 'minutes') &&
                nextProps.time.get('id') === nextProps.selectedTime.get('id');

            if (this.isSelected !== newSelected) return true;
        } catch (e) {
            console.log(e);
            return true;
        }
        return false;
    }
}

TimeSelectionItem.propTypes = {
    time: PropTypes.any,
    index: PropTypes.any,
    dealType: PropTypes.any,
    selectedTime: PropTypes.any,
    onSlotSelected: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1
    },
    timer: {
        paddingTop: DIMENSION_PADDING_TINY,
        paddingBottom: DIMENSION_PADDING_TINY,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        alignItems: 'center'
    },
    tittle: {
        alignItems: 'center',
        paddingTop: DIMENSION_PADDING_TINY,
        paddingBottom: DIMENSION_PADDING_TINY,
    },
    dividerTimebaseSelection: {
        backgroundColor: COLOR_TEXT_INACTIVE_DISABLE,
        height: 10,
        width: 10,
        borderRadius: 5
    }
});