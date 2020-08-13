import React from 'react';
import {View} from 'react-native';
import {BaseComponent} from "../../base/BaseComponent";
import PropTypes from 'prop-types';

import FormInfoHorizontal from './FormInfoHorizontal';
import {DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_LARGE} from "../../../resources/dimens";
import {COLOR_LINE} from "../../../resources/colors";
import {CommonUtil} from '../../../utils/common-utils';
import {DateUtil} from "../../../utils/date-utils";
import BookingHighlight from "../highlight/BookingHighlight";

export default class BookingDetailForm1 extends BaseComponent {

    render() {

        if (!this.props.coupon) return null;

        const coupon = this.props.coupon;

        return (
            <View style={{margin: 16, borderRadius: DIMENSION_RADIUS_LARGE, borderWidth: 1, borderColor: COLOR_LINE, padding: 16}}>

                <FormInfoHorizontal
                    icon={'map_pin_o'}
                    label={'Cửa hàng áp dụng'}
                    value={this.props.coupon.getIn(['store', 'address'], '')}
                    valueWeight={'bold'}
                    style={{paddingBottom: DIMENSION_PADDING_SMALL}}/>

                <FormInfoHorizontal
                    icon={'users_o'}
                    label={'Số lượng'}
                    value={`${coupon.get('slot', 0)} ${CommonUtil.dealSlotUnit(coupon.getIn(['deal', 'hint_text'], ''))}`}
                    valueWeight={'bold'}
                    style={{paddingBottom: DIMENSION_PADDING_SMALL, paddingTop: DIMENSION_PADDING_SMALL}}/>

                <FormInfoHorizontal
                    icon={'clock_o'}
                    label={'Thời gian'}
                    value={DateUtil.formatFullTimeAndDateFromUnix(coupon.get('check_in_time', 0))}
                    valueWeight={'bold'}
                    style={{paddingBottom: DIMENSION_PADDING_SMALL, paddingTop: DIMENSION_PADDING_SMALL}}/>

                <FormInfoHorizontal
                    icon={'gift_box_o'}
                    label={'Ưu đãi'}
                    value={<BookingHighlight
                        bookingHighlight={coupon.get('coupon_highlight', '')}
                        promoCodeHighlight={coupon.getIn(['promocode', 'description'])}
                        promoCodeType={coupon.getIn(['promocode', 'type_promocode'])}/>}
                    style={{paddingTop: DIMENSION_PADDING_SMALL}}
                    removeDivider={true}/>

            </View>
        )
    }



    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (!nextProps.coupon) return true;
        if (!this.props.coupon) return true;

        return false;
    }
}

BookingDetailForm1.propTypes = {
    coupon: PropTypes.object
}
