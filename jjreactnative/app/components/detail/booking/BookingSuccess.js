import React from 'react';
import { View, StyleSheet, TouchableOpacity, BackHandler, ScrollView, Clipboard } from 'react-native';
import { Text, Container } from 'native-base';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { COLOR_PRIMARY, COLOR_GRAY_BG, COLOR_TEXT_INACTIVE, COLOR_LINE, COLOR_TEXT_BLACK_1 } from '../../../resources/colors';
import moment from 'moment/min/moment-with-locales';
import LoadingViewPopup from '../../../common/view/loading/LoadingViewPopup';
import { getQRCodeUrl } from '../../../utils/Utils';
import { DateUtil } from '../../../utils/date-utils';
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER_X,
    DIMENSION_TEXT_SUB
} from '../../../resources/dimens';
import ActionsButton from '../../reservationInfo/ActionsButton';
import JJIcon from '../../common/JJIcon';
import RedeemGateway from '../../redeemCode/RedeemGateway';
import { STATUS_USER_CANCEL } from '../../../const';
import { couponChangeAction } from './action';
import { couponApi } from '../../../api/coupon-api';
import { BasePureComponent } from '../../common/BasePureComponent';
import { AnalyticsUtil } from '../../common/analytics/analytics';
import { Toast } from '../../common/alert/Toast';
import { Alert } from '../../common/alert/JJAlert';
import JJStatusBar from '../../common/view/JJStatusBar';
import { getPaddingTopBar } from '../../../utils/common-utils';
import { buildImageSource, IMAGE_INTERNET } from '../../../utils/image-util';
import { AppConfig } from '../../../common/config';
import FormInfoVertical from '../../../common/view/form/FormInfoVertical';
import ButtonFilled from '../../../common/view/button/ButtonFilled';
import BookingHighlight from '../../../common/view/highlight/BookingHighlight';
import type {ServiceInteractionModel} from "../../../model/data/ServiceInteractionModel";
import {NotificationSubject} from "../../../common/subject/notification-subject";
import {ObjectUtil} from "../../../utils/object-utils";
import { DeliveryDraffDb } from '../../../api/storage/DeliveryDraffDb';

const windowWidth = AppConfig.windowWidth;
const isIOS = AppConfig.ios;
const paddingTopBar = getPaddingTopBar();
const topHeight = 180;
moment.locale('vi');

class BookingSuccess extends BasePureComponent {
    static navigationOptions = {
        header: null
    };

    highlight = null;

    constructor(props) {
        super(props);
        const {coupon} = props.navigation.state.params;
        this.state = {
            modalVisible: false,
            isCanceling: false,
            coupon: coupon
        };
        if (!isIOS) {
            this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
                BackHandler.addEventListener('hardwareBackPress', this._handlePressBack)
            );
        }

        if (!!coupon) {
            this.highlight = (
                <BookingHighlight
                    viewAlign={'flex-end'}
                    textAlign={'right'}
                    bookingHighlight={coupon.get('coupon_highlight', '')}
                    promoCodeHighlight={coupon.getIn(['promocode', 'description'], '')}
                    promoCodeType={coupon.getIn(['promocode', 'type_promocode'], '')}
                />
            );
        }
    }

    render() {
        const { deal } = this.props.navigation.state.params;
        const coupon = this.state.coupon;

        return (
            <Container>
                <JJStatusBar bgColor={'#101010'} styleColor={'light'} />

                <ScrollView style={styles.scrollContent}>
                    <View style={styles.headerSize}>
                        <FastImage
                            style={styles.headerSize}
                            source={require('../../../resources/images/deal/bg_contacting.png')}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <Text style={styles.textCongratulation}>
                            {`Chúc mừng bạn, ${coupon.get('user_name', '')}!\nYêu cầu đặt chỗ đã được chấp nhận!`}
                        </Text>
                    </View>

                    <View style={styles.qrCodeContainerBackground}>
                        <TouchableOpacity onPress={this._onOpenQRCodePreview} style={styles.qrCodeBackground}>
                            <FastImage
                                style={{ width: 124, height: 124 }}
                                source={require('../../../resources/images/deal/icon_ring_contacting.png')}
                                resizeMode={FastImage.resizeMode.contain}
                            />

                            <FastImage
                                source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(coupon.get('code', ''), 144))}
                                style={styles.qrImage}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contentLayout}>
                        <View style={styles.codeLayout}>
                            <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>Mã đặt chỗ</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: 4 }} onPress={this._onCopyClicked}>
                                <Text style={{ color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_HEADER_X, fontWeight: 'bold', marginRight: 2 }}>
                                    {coupon.get('code', '')}
                                </Text>
                                <JJIcon color={COLOR_TEXT_INACTIVE} size={10} name={'copy_o'} />
                            </TouchableOpacity>
                            <View style={{ height: 2, width: 76, backgroundColor: COLOR_PRIMARY }} />
                        </View>

                        {
                            !!coupon.getIn(['deal', 'is_display_as_alias']) &&
                            <Text style={{
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_SUB,
                                paddingTop: DIMENSION_PADDING_MEDIUM,
                                paddingBottom: DIMENSION_PADDING_MEDIUM,
                                paddingLeft: DIMENSION_PADDING_SMALL,
                                paddingRight: DIMENSION_PADDING_SMALL,
                                textAlign: 'center'
                            }}>
                                Mã đặt chỗ sẽ được kích hoạt khi thực hiện Sử dụng mã
                            </Text>
                        }

                        {
                            !!deal.get('use_delivery', false) &&
                            <ButtonFilled
                                title={!!coupon.get('shipping_order_id') ? 'XEM THÔNG TIN MUA HỘ' : 'NHỜ MUA HỘ'}
                                textColor={'white'}
                                backgroundColor={'#22C300'}
                                style={styles.buttonDelivery}
                                onPress={this._onUseDeliveryButtonPress}
                            />
                        }

                        <View style={styles.orderInfoLayout}>
                            <FormInfoVertical
                                icon={'map_pin_o'}
                                label={'Cửa hàng áp dụng'}
                                value={coupon.getIn(['store', 'address'], '')}
                                valueWeight={'bold'}
                            />

                            <View style={styles.formLine} />

                            <FormInfoVertical
                                style={styles.formInfo}
                                icon={'user_o'}
                                label={'Số lượng'}
                                value={`${coupon.get('slot_count', 0)} ${coupon
                                    .getIn(['deal', 'hint_text'], '')
                                    .toLowerCase()
                                    .replace('số ', '')}`}
                                valueWeight={'bold'}
                            />

                            <View style={styles.formLine} />

                            <FormInfoVertical
                                style={styles.formInfo}
                                icon={'calendar_o'}
                                label={'Ngày đặt'}
                                value={DateUtil.formatFullDateFromUnix(coupon.get('check_in_time', 0))}
                                valueWeight={'bold'}
                            />

                            <View style={styles.formLine} />

                            <FormInfoVertical
                                style={styles.formInfo}
                                icon={'clock_o'}
                                label={'Giờ đặt'}
                                value={moment
                                    .unix(coupon.get('check_in_time', 0))
                                    .local()
                                    .format('hh:mm A')}
                                valueWeight={'bold'}
                            />

                            <View style={styles.formLine} />

                            <FormInfoVertical
                                style={styles.formInfo}
                                icon={'gift_box_o'}
                                label={'Ưu đãi'}
                                value={this.highlight}
                                valueWeight={'bold'}
                            />
                        </View>

                        <Text
                            style={{
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_CONTENT,
                                textAlign: 'center'
                            }}
                        >
                            Lưu ý: Mã đặt chỗ đã được gửi về mail của bạn. Vui lòng kiểm tra email hoặc xem lại trong{' '}
                            <Text
                                style={{
                                    color: COLOR_TEXT_INACTIVE,
                                    fontSize: DIMENSION_TEXT_CONTENT,
                                    fontWeight: 'bold'
                                }}
                            >
                                Mã khuyến mãi của tôi
                            </Text>{' '}
                            trên ứng dụng.
                        </Text>

                        <Text
                            style={{
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_SUB,
                                width: '100%',
                                textAlign: 'center',
                                marginTop: DIMENSION_PADDING_MEDIUM
                            }}
                        >
                            Để nhận ưu đãi, bấm <Text style={{ color: COLOR_PRIMARY }}>Sử dụng mã</Text> & làm theo hướng dẫn
                        </Text>

                        {
                            !coupon.get('shipping_order_id') &&
                            <View>
                                <ButtonFilled
                                    title={'SỬ DỤNG MÃ'}
                                    textColor={'white'}
                                    backgroundColor={COLOR_PRIMARY}
                                    onPress={this._onRedeemCodeClicked}
                                    style={styles.buttonUseCode}
                                />
                                <View style={{ paddingTop: DIMENSION_PADDING_MEDIUM, paddingBottom: DIMENSION_PADDING_MEDIUM }}>
                                    <ActionsButton
                                        coupon={coupon}
                                        couponInValid={false}
                                        onCancelBooking={this._onCancelBooking}
                                        from={'booking_return_code'}
                                    />
                                </View>
                            </View>

                        }
                    </View>

                    <View style={{ height: 48 }} />
                </ScrollView>

                <TouchableOpacity onPress={this._onCloseClicked} style={styles.buttonClose}>
                    <JJIcon name={'x_o'} size={16} color={'white'} />
                </TouchableOpacity>

                <RedeemGateway
                    deal={deal}
                    navigation={this.props.navigation}
                    visible={this.state.modalVisible}
                    onCloseModal={this._onCloseModal}
                    onRedeemSuccess={this._onRedeemSuccess}
                />

                <LoadingViewPopup visible={this.state.isCanceling} message={'Đang xử lý...'} />
            </Container>
        );
    }

    _onCloseModal = () => this.setState({ modalVisible: false });

    _onRedeemSuccess = () => {
        this.props.navigation.goBack();
    };

    _onCloseClicked = () => {
        const { deal } = this.props.navigation.state.params;
        const coupon = this.state.coupon;
        const paramsTracking = {
            action_location: 'booking_return_code',
            action_name: 'click_close_button',
            item_id: deal.getIn(['slug'], ''),
            item_name: deal.getIn(['slug'], ''),
            item_brand: deal.getIn(['brand', 'brand_slug'], ''),
            deal_type: deal.getIn(['deal_type'], ''),
            coupon: coupon.get('id', '')
        };
        AnalyticsUtil.logNormalEvent('close_booking_return_code', paramsTracking, 'action_coupon');
        this._handlePressBack();
    };

    _handlePressBack = () => {
        console.log('----------------- handle back pressed');
        this.props.navigation.goBack();
        return true;
    };

    _onCancelBooking = () => {
        this.setState({
            isCanceling: true
        });
        const { deal } = this.props.navigation.state.params;
        const coupon = this.state.coupon;
        const paramsTracking = {
            action_location: 'booking_return_code',
            action_name: 'click_cancel_coupon',
            item_id: deal.getIn(['slug'], ''),
            item_name: deal.getIn(['slug'], ''),
            item_brand: deal.getIn(['brand', 'brand_slug'], ''),
            deal_type: deal.getIn(['deal_type'], ''),
            coupon: coupon.get('id', '')
        };
        AnalyticsUtil.logNormalEvent('cancel_coupon_start_request', paramsTracking, 'action_coupon');

        couponApi
            .cancelCoupon(coupon.get('id', ''))
            .then(response => {
                console.log('_onCancelBooking:response:', response);
                this._onCancelCouponComplete(response);
            })
            .catch(error => {
                console.log('_onCancelBooking:error:', error);
                this._onCancelCouponFailure(error);
            });
        
        DeliveryDraffDb.remove(coupon.get('id', ''));
    };

    _onCancelCouponComplete = response => {
        let { deal } = this.props.navigation.state.params;
        const coupon = this.state.coupon;

        this.setState({ isCanceling: false });

        response
            .text()
            .then(result => {
                console.log('_onCancelCouponComplete', response.status, response.status % 200);
                if (!response.status || response.status < 200 || response.status > 299) {
                    this._onCancelCouponFailure(result);
                    return;
                }
                AnalyticsUtil.logCancelCouponSuccess(
                    deal.getIn(['brand', 'brand_slug'], ''),
                    deal.getIn(['slug'], ''),
                    deal.getIn(['deal_type'], ''),
                    coupon.get('id', '')
                );

                AnalyticsUtil.cancelCoupon(
                    deal.getIn(['title'], ''),
                    deal.getIn(['slug'], ''),
                    deal.getIn(['brand', 'brand_slug'], ''),
                    deal.getIn(['cat1'], ''),
                    deal.getIn(['cat2'], ''),
                    deal.getIn(['deal_type'], ''),
                    deal.get('avg_billing_value', 0),
                    coupon.get('slot', 0) * deal.get('avg_billing_value', 0),
                    coupon.get('slot', 0),
                    moment.unix(coupon.get('check_in_time', 0)).local().toDate(),
                    coupon.get('id', ''),
                    coupon.getIn(['promocode', 'code_name'], '')
                );

                const couponCanceled = coupon.updateIn(['status'], () => STATUS_USER_CANCEL);
                this.props.dispatch(couponChangeAction(coupon.getIn(['deal', 'id'], ''), couponCanceled));
                this._handlePressBack();
            })
            .catch(error => {
                this._onCancelCouponFailure('Không thể huỷ đặt chỗ lúc này. Vui lòng thử lại sau!');
                console.log('_onCancelCouponComplete:error:', error);
            });
    };

    _onCancelCouponFailure = error => {
        console.log('_onCancelCouponFailure:error:', error);

        let { deal } = this.props.navigation.state.params;
        const coupon = this.state.coupon;
        const paramsTracking = {
            action_location: 'booking_return_code',
            action_name: 'click_cancel_coupon',
            item_id: deal.getIn(['slug'], ''),
            item_name: deal.getIn(['slug'], ''),
            item_brand: deal.getIn(['brand', 'brand_slug'], ''),
            deal_type: deal.getIn(['deal_type'], ''),
            coupon: coupon.get('id', '')
        };
        AnalyticsUtil.logNormalEvent('cancel_coupon_request_error', paramsTracking, 'action_coupon');

        this.setState({ isCanceling: false });

        let message = 'Không thể huỷ đặt chỗ lúc này. Vui lòng thử lại sau!';
        if (typeof error === 'string') {
            message = error;
        } else if (typeof error === 'object') {
            if (error.error_message) message = error.error_message;
            else if (error.error) message = error.error;
        }
        Alert.alert('Lỗi', message);
    };

    _onRedeemCodeClicked = () => {
        this.setState({ modalVisible: true });
        const coupon = this.state.coupon;
        if (coupon === undefined || coupon === null) return;
        AnalyticsUtil.logNormalEvent(
            'open_redeem_gateway',
            {
                action_location: 'booking_return_code',
                action_name: 'click_redeem_button',
                coupon: coupon.get('id', '')
            },
            'action_coupon'
        );
    };

    _onOpenQRCodePreview = () => {
        let coupon = this.state.coupon;
        if (coupon === undefined || coupon === null) return;

        let qrcode = coupon.get('code', '');
        if (qrcode === undefined || qrcode === null) return;

        AnalyticsUtil.logNormalEvent(
            'open_qr_code_preview',
            {
                action_location: 'booking_return_code',
                action_name: 'click_qr_code_image',
                qr: qrcode
            },
            'action_coupon'
        );

        this.props.navigation.navigate('QRCodePreview', { qrCode: qrcode });
    };

    _onCopyClicked = () => {
        const coupon = this.state.coupon;
        Clipboard.setString(coupon.get('code', ''));
        Toast.showToast('Đã Copy');
    };

    _onUseDeliveryButtonPress = () => {
        const { deal} = this.props.navigation.state.params;
        const coupon = this.state.coupon;
        if (!coupon) return;

        const d: ServiceInteractionModel = {};
        d.screen_name = 'BookingSuccess';
        d.item_id = coupon.getIn(['deal', 'slug']);
        d.item_brand = coupon.getIn(['deal', 'brand', 'brand_slug']);
        d.item_category = coupon.getIn(['deal', 'deal_type']);

        if (!!coupon.get('shipping_order_id')) {

            d.interaction_type = 'open_status_detail';
            AnalyticsUtil.trackDeliveryServiceInteraction(d);


            this.props.navigation.navigate(
                'DeliveryStatus',
                {
                    shipping_order_id: coupon.get('shipping_order_id'),
                    from: 'booking'
                }
            )
        }
        else {

            d.interaction_type = 'use_delivery';
            AnalyticsUtil.trackDeliveryServiceInteraction(d);

            this.props.navigation.navigate(
                'DeliveryConfirm',
                {
                    deal,
                    from: 'booking',
                    coupon
                }
            )
        }
    };

    __onHandleNotificationDispatcherInBookingSuccess = event => {
        if (!event || !event.action || !this.state.coupon) return;
        console.debug('_onHandleNotificationDispatcher:', event);

        if (event.action === 'cancel_delivery_order' &&
            ObjectUtil.getValue(event, undefined, ['data', 'shipping_order_id']) === this.state.coupon.get('shipping_order_id')) {

            this.setState({
                ...this.state,
                coupon: this.state.coupon.deleteIn(['shipping_order_id']).deleteIn(['shipping_status']).deleteIn(['shipping_can_cancel'])
            });
            return;
        }
        if (event.action === 'update_delivery_order_status' && ObjectUtil.getValue(event, undefined, ['data', 'coupon_id']) === this.state.coupon.get('id', '')) {
            this.setState({
                ...this.state,
                coupon: this.state.coupon.updateIn(['shipping_order_id'], () => ObjectUtil.getValue(event, undefined, ['data', 'shipping_order_id']))
                    .updateIn(['shipping_status'], () => ObjectUtil.getValue(event, undefined, ['data', 'shipping_status']))
                    .updateIn(['shipping_can_cancel'], () => ObjectUtil.getValue(event, undefined, ['data', 'shipping_can_cancel']))
            })
        }
    }

    componentDidMount() {
        super.componentDidMount();
        if (!isIOS) {
            this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
                BackHandler.removeEventListener('hardwareBackPress', this._handlePressBack)
            );
        }

        const { deal} = this.props.navigation.state.params;
        const coupon = this.state.coupon;

        AnalyticsUtil.logCurrentScreen('booking_return_code', {
            item_id: deal.getIn(['slug'], ''),
            item_name: deal.getIn(['slug'], ''),
            item_brand: deal.getIn(['brand', 'brand_slug'], ''),
            deal_type: deal.getIn(['deal_type'], ''),
            coupon: coupon.get('id', '')
        });

        this.onNotificationSubscription = NotificationSubject.subscribe(this.__onHandleNotificationDispatcherInBookingSuccess);
    }

    componentWillUnmount() {
        console.log('------ === componentWillUnmount');
        if (!isIOS) {
            BackHandler.removeEventListener('hardwareBackPress', this._handlePressBack);
            this._didFocusSubscription && this._didFocusSubscription.remove();
            this._willBlurSubscription && this._willBlurSubscription.remove();
        }
        !!this.onNotificationSubscription && this.onNotificationSubscription.unsubscribe();
        super.componentWillUnmount();
    }
}

const styles = StyleSheet.create({
    scrollContent: {
        backgroundColor: COLOR_GRAY_BG,
        flex: 1
    },
    qrCodeBackground: {
        height: 124,
        width: 124,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 62,
        borderWidth: 0.1,
        backgroundColor: COLOR_GRAY_BG
    },
    headerSize: {
        width: windowWidth,
        height: topHeight
    },
    textCongratulation: {
        fontSize: DIMENSION_TEXT_CONTENT,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: paddingTopBar + 24,
        left: 0,
        right: 0,
        padding: DIMENSION_PADDING_MEDIUM
    },
    qrImage: {
        height: 72,
        width: 72,
        position: 'absolute',
        top: 26,
        left: 26
    },
    contentLayout: {
        padding: DIMENSION_PADDING_MEDIUM,
        marginTop: DIMENSION_PADDING_SMALL
    },
    codeLayout: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: DIMENSION_PADDING_MEDIUM
    },
    orderInfoLayout: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        marginTop: DIMENSION_PADDING_SMALL,
        marginBottom: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        backgroundColor: 'white'
    },
    couponInfo: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_LINE,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textCouponInfoLabel: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_CONTENT,
        marginLeft: DIMENSION_PADDING_TINY
    },
    textCouponInfoValue: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_CONTENT,
        textAlign: 'right',
        flex: 1,
        fontWeight: 'bold'
    },
    qrCodeContainerBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth,
        marginTop: -124 / 2,
        backgroundColor: 'transparent'
    },
    couponHighlightRed: {
        textAlign: 'right',
        color: COLOR_PRIMARY,
        fontSize: DIMENSION_TEXT_CONTENT,
        fontWeight: 'bold'
    },
    formInfo: {
        marginTop: DIMENSION_PADDING_MEDIUM
    },
    formLine: {
        backgroundColor: COLOR_LINE,
        width: '100%',
        height: 0.8,
        marginTop: DIMENSION_PADDING_MEDIUM
    },
    buttonDelivery: {
        height: DIMENSION_BUTTON_MEDIUM,
        marginBottom: DIMENSION_PADDING_SMALL
    },
    buttonUseCode: {
        marginTop: DIMENSION_PADDING_MEDIUM,
        height: DIMENSION_BUTTON_MEDIUM
    },
    buttonClose: {
        height: DIMENSION_BUTTON_MEDIUM,
        width: DIMENSION_BUTTON_MEDIUM,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: paddingTopBar + 24,
        left: 0
    }
});

function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
        isLoginned: state.loginReducer.isLoginned
    };
}

export default connect(mapStateToProps)(BookingSuccess);
