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
import {StringUtil} from '../../../../../utils/string-util'
import {AnalyticsUtil} from "../../../../common/analytics/analytics";

export default class NormalDeal extends React.PureComponent {


    render() {

        const stores = this.props.deal.get('stores', []);
        const notHavePhone = stores.size < 1 || (stores.size === 1 && StringUtil.isEmpty(stores.get(0).get('phone_number')));
        const showCallButton = !(notHavePhone && StringUtil.isEmpty(this.props.deal.get('online_store')));
        return (
            <View style={{backgroundColor: 'white'}}>
                <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>

                <View style={{flexDirection: 'row', padding: DIMENSION_PADDING_MEDIUM}}>
                    {
                        showCallButton &&
                        <TouchableOpacity style={[styles.twinButtonFillColor, {
                            backgroundColor: COLOR_PRIMARY,
                            marginRight: DIMENSION_PADDING_SMALL
                        }]}
                                          onPress={this._onCallStoreClicked}>
                            <Text style={{color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold'}}>
                                 {StringUtil.isEmpty(this.props.deal.get('online_store')) ? 'GỌI CỬA HÀNG' : 'XEM WEBSITE'}
                            </Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={[styles.twinButtonFillColor, {
                        backgroundColor: 'white',
                        marginLeft: showCallButton ? DIMENSION_PADDING_SMALL : 0,
                        borderWidth: 1,
                        borderColor: COLOR_LINE
                    }]}
                                      onPress={this._onNoNeedCodeClicked}>
                        <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold'}}>
                            KHÔNG CẦN MÃ
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE}}/>
            </View>
        )
    }

    _onCallStoreClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        if(!StringUtil.isEmpty(this.props.deal.get('online_store'))){
            AnalyticsUtil.logNormalEvent(
                'cta_normal_open_website',
                baseLogParams,
                'deal_detail'
            );

            Communications.web(this.props.deal.get('online_store'));
            return;
        }
        const stores = this.props.deal.get('stores', []);
        AnalyticsUtil.logNormalEvent(
            'cta_normal_call_store',
            baseLogParams,
            'deal_detail'
        );

        if (stores.size === 1 && stores.get(0).get('phone_number')) {
            Communications.phonecall(stores.get(0).get('phone_number'), true);
            return;
        }
        this.props.navigation.navigate('ListStores', { deal: this.props.deal })
    }

    _onNoNeedCodeClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'cta_normal_no_need_code',
            baseLogParams,
            'deal_detail'
        );

        let message = `Chương trình khuyến mãi ${this.props.deal.get('highlight_title', '')} này của ${this.props.deal.getIn(['brand', 'brand_name'], '')} được JAMJA tổng hợp thông tin về giúp bạn, không phải là chương trình hợp tác với JAMJA. \n\n Xem chi tiết tại mục "Điều kiện áp dụng"`
        Alert.alert(
            'Khuyến mãi tổng hợp',
            message,
            [
                {text: "ĐÓNG", style: 'cancel'},
            ]
        )
    }
}

NormalDeal.propTypes = {
    deal: PropTypes.object,
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    twinButtonFillColor: {
        flex: 1,
        height: DIMENSION_BUTTON_MEDIUM,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    },
})