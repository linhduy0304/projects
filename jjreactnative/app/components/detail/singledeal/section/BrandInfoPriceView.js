import React from 'react'
import PropTypes from 'prop-types'
import {BaseComponent} from "../../../common/BaseComponent";
import {StringUtil} from "../../../../utils/string-util";
import {Text} from "native-base";
import {COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE} from "../../../../resources/colors";

export default class BrandInfoPriceView extends BaseComponent {

    render() {
        let price = this.props.price;
        if (StringUtil.isEmpty(price)) price = '';

        const priceCount = price.length;

        let priceSelected = '';
        for (let i = 0; i < priceCount; i++) {
            priceSelected += '$';
        }
        let priceUnselected = '';
        for (let i = 0; i < 4 - priceCount; i++) {
            priceUnselected += '$';
        }

        return (
            <Text style={{
                color: COLOR_TEXT_INACTIVE_DISABLE,
                fontWeight: 'bold',
                fontSize: 14,
                padding: 4
            }}>
                <Text style={{ color: COLOR_TEXT_INACTIVE }}>
                    {priceSelected}
                </Text>
                {priceUnselected}
            </Text>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.price !== this.props.price;
    }
}

BrandInfoPriceView.propTypes = {
    price: PropTypes.any
};