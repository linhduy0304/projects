import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import { BaseComponent } from '../../../../common/BaseComponent';
import { DEAL_TYPE_ECOUPON, DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE, STATUS_WAIT_FOR_MERCHANT } from '../../../../../const';
import { StringUtil } from '../../../../../utils/string-util';
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_TINY
} from '../../../../../resources/dimens';
import { COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE } from '../../../../../resources/colors';
import EcouponGetCode from '../../../cta/EcouponGetCode';
import Communications from 'react-native-communications';
import RedeemGateway from '../../../../redeemCode/RedeemGateway';
import { AnalyticsUtil } from '../../../../common/analytics/analytics';
export default class BottomCTA extends BaseComponent {
    constructor() {
        super();
        this.state = {
            modalVisible: false
        };
    }

    render() {
        if (!this.props.deal || this.props.deal.get('status', 0) !== 1) return null;

        if (this.props.deal.get('is_get', false)) {
            if (this.props.deal.get('code_status', 0) === STATUS_WAIT_FOR_MERCHANT) {
                return this._renderButton(this._renderContactingMerchantButton());
            } else {
                return this._renderButton(this._renderUseCodeButton());
            }
        }

        const dealType = this.props.deal.get('deal_type', '');

        if (dealType === DEAL_TYPE_ECOUPON) {
            return this._renderButton(this._renderEcouponButton());
        }
        if (dealType === DEAL_TYPE_EXCLUSIVE) {
            return this._renderButton(this._renderExclusiveButton());
        }
        if (dealType === DEAL_TYPE_LAST_MIN || dealType === DEAL_TYPE_MOVIE) {
            if (this.props.timebaseBooking === undefined) return null;
            return this._renderButton(this._renderLastMinButton());
        }

        return this._renderButton(this._renderNormalButton());
    }

    _renderButton = child => {
        return (
            <Animated.View
                style={[
                    styles.useCodeBackground,
                    {
                        transform: [{ translateY: this.props.translateY }]
                    }
                ]}
            >
                {child}
            </Animated.View>
        );
    };

    _renderUseCodeButton = () => {
        const dealType = this.props.deal.get('deal_type', '');
        return (
            <View style={{ width: '100%' }}>
                <TouchableOpacity
                    style={[styles.useCodeButton, { backgroundColor: COLOR_PRIMARY, borderColor: COLOR_PRIMARY }]}
                    onPress={this._onOpenCouponDetailPress}
                >
                    <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }} uppercase={true}>
                        {!!this.props.onBookMoreTicket
                            ? 'ĐẶT THÊM VÉ'
                            : `XEM CHI TIẾT ${dealType === DEAL_TYPE_LAST_MIN || dealType === DEAL_TYPE_MOVIE ? 'ĐẶT CHỖ' : 'ƯU ĐÃI'}`}
                    </Text>
                </TouchableOpacity>

                {/*<RedeemGateway deal={this.props.deal}*/}
                {/*navigation={this.props.navigation}*/}
                {/*visible={this.state.modalVisible}*/}
                {/*onCloseModal={this._onCloseRedeemGateway}*/}
                {/*onRedeemSuccess={this._onCloseRedeemGateway}*/}
                {/*fromDealDetail={true}/>*/}
            </View>
        );
    };

    _onCloseRedeemGateway = () => this.setState({ modalVisible: false });

    _renderContactingMerchantButton = () => {
        return (
            <View
                style={[
                    styles.useCodeButton,
                    {
                        backgroundColor: COLOR_PRIMARY,
                        borderColor: COLOR_PRIMARY
                    }
                ]}
            >
                <Text style={{ color: COLOR_TEXT_INACTIVE_DISABLE, fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold' }} uppercase={true}>
                    Đang đặt chỗ...
                </Text>
                <Text style={{ color: COLOR_TEXT_INACTIVE_DISABLE, fontSize: DIMENSION_TEXT_TINY }}>Vui lòng đợi và tải lại trong giây lát!</Text>
            </View>
        );
    };

    _renderEcouponButton = () => {
        let hasCode = this.props.deal.get('pre_generated_code', []).size > 0;
        return (
            <View style={{ width: '100%' }}>
                <TouchableOpacity
                    style={[styles.useCodeButton, { backgroundColor: hasCode ? '#4bc731' : '#ef863b' }]}
                    onPress={this._onEcouponButtonClicked}
                >
                    <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>{hasCode ? 'LẤY MÃ' : 'CHI TIẾT'}</Text>
                </TouchableOpacity>

                <EcouponGetCode
                    navigation={this.props.navigation}
                    deal={this.props.deal}
                    visible={this.state.modalVisible}
                    onCloseModal={() => (this.state.modalVisible = false)}
                />
            </View>
        );
    };

    _renderExclusiveButton = () => {
        return (
            <TouchableOpacity
                style={[
                    styles.useCodeButton,
                    {
                        backgroundColor: COLOR_PRIMARY,
                        borderColor: COLOR_PRIMARY
                    }
                ]}
                onPress={this._onExclusiveGetCodeClicked}
            >
                <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }} uppercase={true}>
                    Lấy mã
                </Text>
            </TouchableOpacity>
        );
    };

    _renderLastMinButton = () => {
        return (
            <TouchableOpacity
                style={[
                    styles.useCodeButton,
                    {
                        backgroundColor: COLOR_PRIMARY,
                        borderColor: COLOR_PRIMARY
                    }
                ]}
                onPress={this._onLastMinButtonClicked}
            >
                <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }} uppercase={true}>
                    {this.props.timebaseBooking.getIn(['selected', 'time']) === undefined ? 'Đặt chỗ nhanh' : 'Xác nhận đặt chỗ'}
                </Text>
            </TouchableOpacity>
        );
    };

    _renderNormalButton = () => {
        const stores = this.props.deal.get('stores', []);
        const notHavePhone = stores.size < 1 || (stores.size === 1 && StringUtil.isEmpty(stores.get(0).get('phone_number')));
        const showCallButton = !(notHavePhone && StringUtil.isEmpty(this.props.deal.get('online_store')));
        return (
            <View style={{ flexDirection: 'row' }}>
                {showCallButton && (
                    <TouchableOpacity
                        style={[
                            styles.twinButtonFillColor,
                            {
                                backgroundColor: COLOR_PRIMARY,
                                marginRight: DIMENSION_PADDING_SMALL
                            }
                        ]}
                        onPress={this._onCallStoreClicked}
                    >
                        <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>
                            {StringUtil.isEmpty(this.props.deal.get('online_store')) ? 'GỌI CỬA HÀNG' : 'XEM WEBSITE'}
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[
                        styles.twinButtonFillColor,
                        {
                            backgroundColor: 'white',
                            marginLeft: showCallButton ? DIMENSION_PADDING_SMALL : 0,
                            borderWidth: 1,
                            borderColor: COLOR_LINE
                        }
                    ]}
                    onPress={this._onNoNeedCodeClicked}
                >
                    <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>KHÔNG CẦN MÃ</Text>
                </TouchableOpacity>
            </View>
        );
    };

    _onRedeemCodeClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent('bottom_cta_use_code_click', baseLogParams, 'deal_detail');

        this.setState({ modalVisible: true });
    };

    _onEcouponButtonClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent('bottom_cta_ecoupon_get_code', baseLogParams, 'deal_detail');
        this.setState({ modalVisible: true });
    };

    _onCallStoreClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        if (!StringUtil.isEmpty(this.props.deal.get('online_store'))) {
            AnalyticsUtil.logNormalEvent('bottom_cta_normal_open_website', baseLogParams, 'deal_detail');

            Communications.web(this.props.deal.get('online_store'));
            return;
        }
        AnalyticsUtil.logNormalEvent('bottom_cta_normal_call_store', baseLogParams, 'deal_detail');

        const stores = this.props.deal.get('stores', []);
        if (stores.size === 1 && stores.get(0).get('phone_number')) {
            Communications.phonecall(stores.get(0).get('phone_number'), true);
            return;
        }
        this.props.navigation.navigate('ListStores', { deal: this.props.deal });
    };

    _onNoNeedCodeClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent('bottom_cta_normal_no_need_code', baseLogParams, 'deal_detail');

        let message = `Chương trình khuyến mãi ${this.props.deal.get('highlight_title', '')} này của ${this.props.deal.getIn(
            ['brand', 'brand_name'],
            ''
        )} được JAMJA tổng hợp thông tin về giúp bạn, không phải là chương trình hợp tác với JAMJA. \n\n Xem chi tiết tại mục "Điều kiện áp dụng"`;
        Alert.alert('Khuyến mãi tổng hợp', message, [{ text: 'ĐÓNG', style: 'cancel' }]);
    };

    _onExclusiveGetCodeClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent('bottom_get_code_exclusive_alert', baseLogParams, 'deal_detail');

        Alert.alert('XIN ĐỌC KỸ', this.props.deal.get('alert_message', 'Bạn đã đọc kỹ điều kiện áp dụng chưa?'), [
            { text: 'HỦY', style: 'cancel' },
            { text: 'ĐỒNG Ý & LẤY MÃ', onPress: this._onExclusiveConfirmGetCode }
        ]);
    };

    _onExclusiveConfirmGetCode = () => {
        if (this.props.listener) this.props.listener.onGetCodeClicked(DEAL_TYPE_EXCLUSIVE);
    };

    _onLastMinButtonClicked = () => {
        if (!this.props.listener) return;
        if (!this.props.deal) return;

        const dealType = this.props.deal.get('deal_type', '');

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: dealType,
            deal_type: dealType
        };

        AnalyticsUtil.logNormalEvent(`bottom_cta_${dealType === DEAL_TYPE_MOVIE ? 'movie' : 'lastmin'}_click`, baseLogParams, 'deal_detail');

        if (this.props.timebaseBooking.getIn(['selected', 'time']) === undefined) {
            this.props.listener.onScrollToCTARequest();
        } else this.props.listener.onGetCodeClicked(dealType);
    };

    _onOpenCouponDetailPress = () => {
        if (!this.props.deal) return;
        if (!!this.props.onBookMoreTicket) {
            this.props.onBookMoreTicket();
            return;
        }

        const dealType = this.props.deal.get('deal_type', '');

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: dealType,
            deal_type: dealType
        };

        AnalyticsUtil.logNormalEvent('cta_use_code_coupon_detail', baseLogParams, 'deal_detail');

        if (dealType === DEAL_TYPE_EXCLUSIVE) {
            this.props.navigation.push('ExclusiveReservationInfo', {
                couponId: this.props.deal.get('coupon_id', ''),
                isFromDealDetail: true
            });
        } else if (dealType === DEAL_TYPE_LAST_MIN) {
            this.props.navigation.push('LastMinReservationInfo', {
                couponId: this.props.deal.get('coupon_id', ''),
                isFromDealDetail: true
            });
        } else if (dealType === DEAL_TYPE_MOVIE) {
            this.props.navigation.push('MovieReservationInfo', {
                couponId: this.props.deal.get('coupon_id', ''),
                isFromDealDetail: true
            });
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.modalVisible !== this.state.modalVisible) return true;
        if (nextProps.deal !== undefined && this.props.deal === undefined) return true;
        if (!this.props.deal) return true;
        if (nextProps.deal.get('is_get', 0) !== this.props.deal.get('is_get', 0)) return true;
        if (nextProps.deal.get('status', 0) !== this.props.deal.get('status', 0)) return true;
        if (nextProps.deal.get('code_status', 0) !== this.props.deal.get('code_status', 0)) return true;
        if (nextProps.deal.get('code', '') !== this.props.deal.get('code', '')) return true;
        if (nextProps.timebaseBooking !== undefined && this.props.timebaseBooking === undefined) return true;
        if (!!nextProps.onBookMoreTicket && !!nextProps.bookedItem && nextProps.bookedItem !== this.props.bookedItem) return true;
        if (
            nextProps.timebaseBooking !== undefined &&
            this.props.timebaseBooking !== undefined &&
            nextProps.timebaseBooking.getIn(['selected', 'time']) !== undefined &&
            !nextProps.timebaseBooking.getIn(['selected', 'time']).equals(this.props.timebaseBooking.getIn(['selected', 'time']))
        ) {
            return true;
        }

        return false;
    }
}

BottomCTA.propTypes = {
    translateY: PropTypes.object,
    navigation: PropTypes.object,
    deal: PropTypes.object,
    timebaseBooking: PropTypes.object,
    listener: PropTypes.object,
    onBookMoreTicket: PropTypes.func,
    bookedItem: PropTypes.bool
};

const styles = StyleSheet.create({
    useCodeBackground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 4,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        width: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ededed'
    },
    useCodeButton: {
        width: '100%',
        height: DIMENSION_BUTTON_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: DIMENSION_RADIUS_MEDIUM
    },
    twinButtonFillColor: {
        flex: 1,
        height: DIMENSION_BUTTON_MEDIUM,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
