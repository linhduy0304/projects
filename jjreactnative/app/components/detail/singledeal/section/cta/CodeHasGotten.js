import React from 'react'
import {View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM,
} from "../../../../../resources/dimens";
import {COLOR_GRAY_BG, COLOR_LINE, COLOR_PRIMARY} from "../../../../../resources/colors";
import {DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE} from "../../../../../const";
import {BaseComponent} from "../../../../common/BaseComponent";
import {AnalyticsUtil} from "../../../../common/analytics/analytics";
import ButtonFilled from '../../../../../common/view/button/ButtonFilled';
import {ObjectUtil} from '../../../../../utils/object-utils';
export default class CodeHasGotten extends BaseComponent {

    constructor() {
        super();
        this.state = {
            modalVisible: false
        }
    }

    render() {
        return (
            <View>

                <View style={styles.topLine}/>

                <ButtonFilled
                    title={`XEM CHI TIẾT ${this.props.isBookingDeal ? 'ĐẶT CHỖ' : 'ƯU ĐÃI'}`}
                    textColor={'white'}
                    backgroundColor={COLOR_PRIMARY}
                    style={styles.buttonUseCode}
                    onPress={this._onCouponDetailClicked}/>

                {/*<TouchableOpacity style={[styles.singleButtonFillColor, {backgroundColor: COLOR_PRIMARY}]}*/}
                                  {/*onPress={() => this._onRedeemCodeClicked()}>*/}
                    {/*<Text style={{color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold'}}>*/}
                        {/*SỬ DỤNG MÃ*/}
                    {/*</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity style={[styles.textButton, {*/}
                    {/*paddingTop: 0,*/}
                    {/*paddingBottom: DIMENSION_PADDING_MEDIUM,*/}
                    {/*flexDirection: 'row'*/}
                {/*}]}*/}
                                  {/*onPress={this._onCouponDetailClicked}>*/}
                    {/*<Text style={{*/}
                        {/*color: COLOR_PRIMARY,*/}
                        {/*fontSize: DIMENSION_TEXT_CONTENT,*/}
                        {/*paddingRight: DIMENSION_PADDING_TINY,*/}
                        {/*textDecorationLine: 'underline'*/}
                    {/*}}>*/}
                        {/*Xem chi tiết mã {this.props.isBookingDeal ? 'đặt chỗ' : 'khuyến mãi'}*/}
                    {/*</Text>*/}
                    {/*<JJIcon size={8}*/}
                            {/*name={'chevron_right_o'}*/}
                            {/*color={COLOR_PRIMARY}/>*/}
                {/*</TouchableOpacity>*/}

                {/*<RedeemGateway deal={this.props.deal}*/}
                               {/*navigation={this.props.navigation}*/}
                               {/*visible={this.state.modalVisible}*/}
                               {/*onCloseModal={() => this.setState({modalVisible: false})}*/}
                               {/*onRedeemSuccess={() => this.setState({modalVisible: false})}*/}
                               {/*fromDealDetail={true}/>*/}

                <View style={{backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE}}/>
            </View>
        )
    }

    _onRedeemCodeClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'cta_use_code_click',
            baseLogParams,
            'deal_detail'
        );
        this.setState({modalVisible: true})
    }

    _onCouponDetailClicked = () => {
        if (!this.props.deal) return;

        const dealType = this.props.deal.get('deal_type', '');

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: dealType,
            deal_type: dealType
        };

        AnalyticsUtil.logNormalEvent(
            'cta_use_code_coupon_detail',
            baseLogParams,
            'deal_detail'
        );

        if (dealType === DEAL_TYPE_EXCLUSIVE) {
            this.props.navigation.navigate("ExclusiveReservationInfo", {
                couponId: this.props.deal.get('coupon_id', ''),
                isFromDealDetail: true
            })
        }
        else if (dealType === DEAL_TYPE_LAST_MIN) {
            if(this.props.deal.get('coupon_id', '') === ObjectUtil.getValue(this.props, '', ['navigation', 'state', 'params', 'from_coupon_id'])) {
                this.props.navigation.navigate("LastMinReservationInfo", {
                    couponId: this.props.deal.get('coupon_id', ''),
                    isFromDealDetail: true,
                })
            } else {
                this.props.navigation.push("LastMinReservationInfo", {
                    couponId: this.props.deal.get('coupon_id', ''),
                    isFromDealDetail: true,
                })
            }
        }
        else if (dealType === DEAL_TYPE_MOVIE) {
            this.props.navigation.navigate("MovieReservationInfo", {
                couponId: this.props.deal.get('coupon_id', ''),
                isFromDealDetail: true
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isBookingDeal !== this.props.isBookingDeal ||
            nextState.modalVisible !== this.state.modalVisible;
    }
}

CodeHasGotten.propTypes = {
    deal: PropTypes.object,
    noPublicPromoCode: PropTypes.bool,
    isBookingDeal: PropTypes.bool,
    listener: PropTypes.object,
    navigation: PropTypes.object,
}

const styles = StyleSheet.create({
    topLine: {
        backgroundColor: COLOR_LINE,
        height: 1,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM
    },
    buttonUseCode: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        marginTop: DIMENSION_PADDING_MEDIUM
    },
    singleButtonFillColor: {
        flex: 1,
        margin: DIMENSION_PADDING_MEDIUM,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        height: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    },
})