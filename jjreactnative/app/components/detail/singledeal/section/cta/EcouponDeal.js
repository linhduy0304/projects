import React from 'react'
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {Text} from 'native-base'
import PropTypes from 'prop-types'
import Communications from 'react-native-communications'
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_HEADER
} from "../../../../../resources/dimens";
import {COLOR_GRAY_BG, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";
import DividerLine from "../../../../common/DividerLine";
import EcouponGetCode from "../../../cta/EcouponGetCode";
import {BaseComponent} from "../../../../common/BaseComponent";
import {AnalyticsUtil} from "../../../../common/analytics/analytics";

export default class EcouponDeal extends BaseComponent {

    constructor() {
        super();
        this.state = {
            modalVisible: false
        }
    }

    render() {
        let hasCode = this.props.deal.get('pre_generated_code', []).size > 0;
        return (
            <View style={{backgroundColor: 'white'}}>

                <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>

                <TouchableOpacity
                    style={[styles.singleButtonFillColor, {backgroundColor: hasCode ? '#4bc731' : '#ef863b'}]}
                    onPress={this._onEcouponButtonClicked}>
                    <Text style={{color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold'}}>
                        {hasCode ? 'LẤY MÃ' : 'CHI TIẾT'}
                    </Text>
                </TouchableOpacity>

                <View style={{backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE}}/>

                <EcouponGetCode navigation={this.props.navigation}
                                deal={this.props.deal}
                                visible={this.state.modalVisible}
                                onCloseModal={() => this.state.modalVisible = false}/>
            </View>
        )
    }

    _onEcouponButtonClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'cta_ecoupon_get_code',
            baseLogParams,
            'deal_detail'
        );

        this.setState({modalVisible: true});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.modalVisible !== this.state.modalVisible ||
            nextProps.deal !== undefined && this.props.deal === undefined;
    }
}

EcouponDeal.propTypes = {
    deal: PropTypes.object,
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    singleButtonFillColor: {
        flex: 1,
        margin: DIMENSION_PADDING_MEDIUM,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        height: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    },
})