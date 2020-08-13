import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Intl from "intl";

import {BasePureComponent} from "../../base/BasePureComponent";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_HEADER
} from "../../../resources/dimens";
import {COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import FormValueVertical from './FormValueVertical';

export default class FromPaymentValue extends BasePureComponent {

    numberFormat;

    constructor(props) {
        super(props);
        this.numberFormat = new Intl.NumberFormat('vi', { style: 'decimal', maximumFractionDigits: 3});
    }


    render() {

        let finalValue = this.props.discountValue;
        if (!!this.props.promoValue) finalValue = this.props.promoValue;

        return (
            <View style={this.props.style}>

                <FormValueVertical
                    label={'Giá gốc'}
                    value={this._getNumberFormat(this.props.originalValue)}/>

                <FormValueVertical
                    style={{
                        marginTop: DIMENSION_PADDING_SMALL
                    }}
                    label={'Khuyến mãi JAMJA'}
                    value={this._getNumberFormat(this.props.discountValue - this.props.originalValue)}/>

                {
                    !!this.props.promoValue &&
                    !!this.props.promoCode &&
                    <FormValueVertical
                        style={{
                            marginTop: DIMENSION_PADDING_SMALL
                        }}
                        label={'Mã giảm thêm:'}
                        subLabel={this.props.promoCode}
                        value={this._getNumberFormat(this.props.promoValue - this.props.discountValue)}/>
                }

                <View style={styles.line}/>

                <FormValueVertical
                    style={{
                        marginTop: DIMENSION_PADDING_MEDIUM
                    }}
                    label={'Tổng tiền thanh toán'}
                    value={this._getNumberFormat(finalValue)}
                    valueColor={COLOR_PRIMARY}
                    valueWeight={'bold'}/>

            </View>
        )
    }

    _getNumberFormat = number => {
        try {
            return this.numberFormat.format(number);
        }
        catch (e) {
            console.log(e);
        }
        return number;
    }

}

FromPaymentValue.propTypes = {
    style: PropTypes.any,
    originalValue: PropTypes.number,
    discountValue: PropTypes.number,
    promoValue: PropTypes.number,
    promoCode: PropTypes.string,
    promoOffer: PropTypes.string
};

const styles = StyleSheet.create({
    textOriginal: {
        color: COLOR_TEXT_INACTIVE,
        fontWeight: 'bold',
        fontSize: DIMENSION_TEXT_HEADER,
        textDecorationLine: 'line-through'
    },
    textLatest: {
        color: COLOR_PRIMARY,
        fontWeight: 'bold',
        fontSize: DIMENSION_TEXT_HEADER
    },
    line: {
        backgroundColor: COLOR_LINE,
        width: '100%',
        height: 0.5,
        marginTop: DIMENSION_PADDING_MEDIUM
    }
});