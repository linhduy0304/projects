import React from 'react';
import {Text} from 'native-base';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types'

import JJIcon from '../common/JJIcon';
import {COLOR_LINE, COLOR_PRIMARY} from "../../resources/colors";
import {couponInValidInfo} from '../../utils/CouponUtil'
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../resources/dimens";
import {BaseComponent} from "../common/BaseComponent";
import {STATUS_REDEEMED} from "../../const";

export default class ActionsButton extends BaseComponent {

    render() {
        let {coupon, couponInValid} = this.props;
        if (!coupon) return (<Text style={{color: COLOR_PRIMARY}}>Không có thông tin</Text>);

        let actionName = couponInValid ? couponInValidInfo(coupon) : '';

        if (coupon.get('status') === STATUS_REDEEMED && !!coupon.getIn(['deal', 'is_display_as_alias'])) return null;

        return (
            <View style={{flex: 1}}>
                {
                    couponInValid &&
                    <View style={[styles.buttonAlarm,{width: '100%', backgroundColor: '#c2c2c2'}]}>
                        <Text style={{color: '#ffffff', fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}>
                            {actionName}
                        </Text>
                    </View>
                }
                {
                    !couponInValid && !this.props.disableCancelCouponButton &&
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableOpacity style={[styles.buttonAlarm,{marginLeft: 0, borderColor: COLOR_PRIMARY}]}
                                              onPress={() => this._onActionCancelCoupon()}>
                                <JJIcon name={'trash_o'}
                                        color={COLOR_PRIMARY}
                                        size={14}
                                        style={{paddingTop: 2, marginRight: 5}}/>

                                <Text style={{paddingLeft: 0, color: COLOR_PRIMARY, fontSize: 16, fontWeight: 'bold'}}>
                                    Huỷ đặt chỗ
                                </Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        )
    }

    _onActionCancelCoupon = () => {
        Alert.alert(
            'Chú ý',
            'Bạn có chắc chắn muốn hủy mã đặt chỗ?',
            [
                { text: "ĐÓNG" },
                { text: "ĐỒNG Ý", onPress: () => { if (this.props.onCancelBooking !== undefined) this.props.onCancelBooking() } }
            ],
            {
                cancelable: true
            }
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.coupon && (nextProps.coupon.get('status') !== this.props.coupon.get('status')) ||
            nextProps.couponInValid !== this.props.couponInValid;
    }
}

ActionsButton.propTypes = {
    coupon: PropTypes.object,
    couponInValid: PropTypes.bool,
    onCancelBooking: PropTypes.func,
    navigation: PropTypes.object,
    disableCancelCouponButton: PropTypes.bool,
    from: PropTypes.any
}

const styles = StyleSheet.create({
    buttonAlarm: {
        flex: 1,
        height: DIMENSION_BUTTON_MEDIUM,
        borderWidth: 1,
        borderColor: COLOR_LINE,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});