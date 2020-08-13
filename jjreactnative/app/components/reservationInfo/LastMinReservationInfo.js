import React from 'react';
import {Spinner} from 'native-base';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity, Alert, Clipboard
} from 'react-native';
import {connect} from "react-redux";
import moment from 'moment/min/moment-with-locales';
import {fromJS} from 'immutable'
import FastImage from 'react-native-fast-image';

import JJIcon from '../common/JJIcon';
import {strings} from '../../../locates/i18n';
import {COLOR_GRAY_BG, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from '../../resources/colors'
import DealConditionInfo from './DealConditionInfo'
import ActionsButton from './ActionsButton'
import RedeemGateway from '../redeemCode/RedeemGateway'
import {couponIsValid} from '../../utils/CouponUtil'
import {getQRCodeUrl} from "../../utils/Utils";
import ReservationMapView from "../common/ReservationMapView";
import JJHeader from '../common/JJHeader';
import {
    STATUS_ADMIN_CANCEL,
    STATUS_EXPIRED,
    STATUS_MERCHANT_CANCEL,
    STATUS_MERCHANT_REJECT,
    STATUS_REDEEMED,
    STATUS_REJECTED,
    STATUS_USER_CANCEL
} from '../../const'
import QRCodePreview from '../common/qrcode/QRCodePreview'
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_EXTRA,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_HEADER_X
} from "../../resources/dimens";
import LoadingViewPopup from "../../common/view/loading/LoadingViewPopup";
import {couponApi} from '../../api/coupon-api'
import {couponChangeAction} from '../detail/booking/action'
import {BasePureComponent} from "../common/BasePureComponent";
import {DateUtil} from "../../utils/date-utils";
import {StringUtil} from '../../utils/string-util'
import {ObjectUtil} from '../../utils/object-utils'
import {CommonUtil} from '../../utils/common-utils'
import {AnalyticsUtil} from "../common/analytics/analytics";
import {Toast} from '../common/alert/Toast'
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";
import Text from '../../common/view/text/JJText';
import FormInfoVertical from "../../common/view/form/FormInfoVertical";
import BookingHighlight from '../../common/view/highlight/BookingHighlight';
import ButtonFilled from '../../common/view/button/ButtonFilled';
import {NotificationSubject} from '../../common/subject/notification-subject';
import {ServiceInteractionModel} from '../../model/data/ServiceInteractionModel';
import {DealSubject} from '../../common/subject/deal-subject';
import { DeliveryDraffDb } from '../../api/storage/DeliveryDraffDb';
import ToolTipTopCenter from '../../common/view/notice/ToolTipTopCenter';
import RedeemByLocation from "../../screens/AliasBookingSuccess/RedeemByLocation";
import ReservationHotLine from '../../common/view/notice/ReservationHotLine';
import {AnalyticsHelper} from '../../common/analytics';

moment.locale('vi');

class LastMinReservationInfo extends BasePureComponent {

    static navigationOptions = {
        header: null,
    };

    TAG = 'reservation';
    SCREEN = 'LastMinReservationInfo';

    constructor(props) {
        super(props);
        this.state = {
            canceling: false,
            isLoading: true,
            coupon: undefined,
            modalVisible: false,
            networkError: false
        };

        const coupon = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'coupon']);
        if (!!coupon) {
            this.state.coupon = fromJS(coupon);
        }
    }

    render() {
        const {isLoading, coupon} = this.state;
        let content = null;

        if (coupon !== undefined) {
            content = this._renderContent();
        } else if (isLoading) {
            content = this._renderLoading();
        } else {
            content = this._renderErrorFetch();
        }

        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                {/*toolbar*/}
                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={false}
                    title={'THÔNG TIN ĐẶT CHỖ'}
                />
                {
                    coupon !== undefined && coupon !== null && coupon.get('deal') &&
                    <RedeemGateway deal={coupon.get('deal')}
                                   navigation={this.props.navigation}
                                   visible={this.state.modalVisible}
                                   onCloseModal={() => this.setState({modalVisible: false})}
                                   onRedeemSuccess={() => this.setState({modalVisible: false})}
                                   onSubmitGateWayPress={!!coupon.getIn(['deal', 'is_display_as_alias']) ? this._onSubmitRedeemGateWayPress : undefined}/>
                }
                {/*body*/}
                {content}

                {
                    !!coupon && !!coupon.getIn(['deal', 'is_display_as_alias']) &&
                    <RedeemByLocation
                        ref={this._onRedeemByLocationRef}
                        screen={this.SCREEN}
                        coupon={coupon}
                        navigation={this.props.navigation}/>
                }

                <LoadingViewPopup visible={this.state.canceling}
                                  message={'Đang xử lý...'}/>
            </View>
        )
    }

    _renderLoading = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_GRAY_BG}}>
                <Spinner color={COLOR_PRIMARY} />
            </View>
        )
    };

    _renderErrorFetch = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_GRAY_BG}}>
                <Text style={{color: '#999999'}}>
                    Không có thông tin
                </Text>
            </View>
        )
    };

    _renderContent = () => {
        let {coupon} = this.state;
        let status = coupon.get('status', 0);
        let couponInValid = !couponIsValid(status);

        let slotUnit = coupon.getIn(['deal','hint_text'], '').toLowerCase().replace("số ", " ");
        const isFromDealDetail = this.props.navigation.state.params.isFromDealDetail ? this.props.navigation.state.params.isFromDealDetail : false;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <ReservationMapView deal={coupon.get('deal')}
                                        userLat={this.props.latitude}
                                        userLong={this.props.longitude}
                                        navigation={this.props.navigation}/>

                    <View style={styles.qrLayout}>
                        <TouchableOpacity
                            onPress={this._onOpenQRCodePreview}
                            activeOpacity={0.8}>
                            <FastImage
                                source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(coupon.get('code', ''), 144))}
                                style={{height: 72, width: 72}}
                                resizeMode={FastImage.resizeMode.contain}/>
                        </TouchableOpacity>

                        <Text style={{marginTop: DIMENSION_PADDING_SMALL}}>
                            Mã đặt chỗ
                        </Text>

                        <TouchableOpacity
                            style={{flexDirection: 'row', paddingLeft: 4}}
                            onPress={this._onCopyClicked}
                        >
                            <Text style={styles.textCode}>
                                {coupon.get('code', '')}
                            </Text>
                            <JJIcon color={COLOR_TEXT_INACTIVE}
                                    size={10}
                                    name={'copy_o'}/>
                        </TouchableOpacity>

                        {
                            !!coupon.getIn(['deal', 'is_display_as_alias']) &&
                            !!coupon.get('start_redeem_time') &&
                            !!this._canShowAliasTooltip(status) &&
                            <ToolTipTopCenter
                                message={
                                    coupon.get('code', '').indexOf('*') >= 0 ?
                                        `Vui lòng đến cửa hàng trong ${this._getTimeToRedeem()} trước giờ đặt chỗ và bấm nút "Sử Dụng Mã", hệ thống sẽ hiển thị mã dựa trên vị trí của bạn` :
                                        `Vui lòng cung cấp mã đặt chỗ này cho cửa hàng để được áp dụng khuyến mãi.`
                                }
                                style={{
                                    width: '100%',
                                    marginBottom: 0,
                                    marginTop: DIMENSION_PADDING_MEDIUM
                                }}
                                />
                        }

                    </View>

                    {
                        !!this._canShowAliasTooltip(status) &&
                        <ReservationHotLine/>

                    }

                    {
                        !!coupon.getIn(['deal', 'use_delivery']) &&
                        (status === STATUS_REDEEMED || status === STATUS_EXPIRED || !couponInValid) &&
                        this._renderButtonDelivery(status, coupon)
                    }

                    <View style={{backgroundColor: '#ffffff', padding: DIMENSION_PADDING_MEDIUM}}>

                        <FormInfoVertical
                            label={"Thời gian đến"}
                            value={
                                <Text style={styles.contentValue}>
                                    <Text style={{color: COLOR_PRIMARY}}>
                                        {moment.unix(coupon.get('check_in_time', 0)).local().format('hh:mm A')}
                                    </Text>
                                    {', ' + DateUtil.formatFullDateFromUnix(coupon.get('check_in_time', 0))}
                                </Text>
                            }/>

                        <View style={styles.formLine}/>

                        <FormInfoVertical
                            label={"Số lượng"}
                            value={coupon.get('slot_count', 0) + ' ' + slotUnit}/>

                        <View style={styles.formLine}/>

                        <FormInfoVertical
                            label={"Ưu đãi"}
                            value={
                                <BookingHighlight
                                    textAlign={'right'}
                                    viewAlign={'flex-end'}
                                    bookingHighlight={coupon.get('coupon_highlight', '')}
                                    promoCodeHighlight={coupon.getIn(['promocode', 'description'])}
                                    promoCodeType={coupon.getIn(['promocode', 'type_promocode'])}/>
                            }/>

                        <View style={styles.formLine}/>

                        <FormInfoVertical
                            label={"Khách đặt"}
                            value={coupon.get('user_name', '')}/>

                        <View style={styles.formLine}/>

                        <FormInfoVertical
                            label={"Điện thoại liên hệ"}
                            value={coupon.get('phone_number', '')}/>

                        <View style={styles.formLine}/>

                        <FormInfoVertical
                            label={"Email"}
                            value={coupon.get('email', '')}/>

                        {
                            !StringUtil.isBlank(coupon.get('booking_survey')) &&
                            <View>
                                <View style={styles.formLine}/>

                                <FormInfoVertical
                                    label={"Dịp đặc biệt"}
                                    value={coupon.get('booking_survey', '')}/>
                            </View>
                        }
                    </View>

                    <Text style={styles.headerLabel}>
                        THÔNG TIN THÊM
                    </Text>

                    <Text style={{color: '#999999', backgroundColor: '#ffffff', padding: 16}}>
                        {coupon.get('booking_note') ? coupon.get('booking_note', '') : 'Không có dữ liệu'}
                    </Text>

                    <View style={{padding: 16}}>
                        {
                            !coupon.get('shipping_order_id') &&
                            <ActionsButton coupon={coupon}
                                           couponInValid={couponInValid}
                                           onCancelBooking={this._onCancelBooking}
                                           from={'last_min_reservation_info'}
                                           navigation={this.props.navigation}/>
                        }
                    </View>

                    <DealConditionInfo condition={coupon.getIn(['deal', 'condition'], '')}/>

                    {
                        !isFromDealDetail &&
                        <View style={styles.buttonDealDetail}>
                            <TouchableOpacity style={styles.buttonRounder}
                                              onPress={() => this._actionDealDetail()}>
                                <Text style={{color: '#999999', fontWeight: 'bold', fontSize: 16}}
                                      uppercase={true}>
                                    {strings('last_min_reservation.deal_detail')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <View style={{height: DIMENSION_PADDING_EXTRA}}/>
                </ScrollView>

                {
                    !couponInValid &&
                    !this.state.networkError &&
                    !coupon.get('shipping_order_id') &&
                    <View style={styles.useCodeBackground}>
                        <ButtonFilled
                            title={'SỬ DỤNG MÃ'}
                            textColor={'white'}
                            style={styles.buttonUserCode}
                            backgroundColor={COLOR_PRIMARY}
                            onPress={this._actionRedeemCode}/>
                    </View>
                }
            </View>
        )
    }

    _renderButtonDelivery = (status, coupon) => {

        if(!coupon || !coupon.get) return null;
        if((status === STATUS_REDEEMED || status === STATUS_EXPIRED) && !coupon.get('shipping_order_id')) {
            return null
        }
        return <ButtonFilled
                title={!!coupon.get('shipping_order_id') ? 'XEM THÔNG TIN MUA HỘ' : 'NHỜ MUA HỘ'}
                textColor={'white'}
                backgroundColor={'#22C300'}
                style={styles.buttonDelivery}
                onPress={this._onUseDeliveryButtonInReservationPress}/>
    }

    _getTimeToRedeem = () => {
        let {coupon} = this.state;
        if (!coupon || !coupon.get('start_redeem_time')) return '';
        const time = moment.unix(coupon.get('check_in_time')).local().diff(moment.utc(coupon.get('start_redeem_time')).local(), 'minutes');

        const hours = Math.floor(time/60);
        let minutes = hours > 0 ? time%(60*hours) : time;
        if (minutes < 10) minutes = '0' + minutes;

        if (hours < 1) return minutes + ' phút';
        return `${hours} giờ ${minutes} phút`;
    }

    _canShowAliasTooltip = status => {
        return STATUS_EXPIRED !== status &&
            STATUS_REJECTED !== status &&
            STATUS_MERCHANT_REJECT !== status &&
            STATUS_MERCHANT_CANCEL !== status &&
            STATUS_USER_CANCEL !== status &&
            STATUS_ADMIN_CANCEL !== status;
    }

    _onCopyClicked = () => {
        Clipboard.setString(this.state.coupon.get('code', ''));
        Toast.showToast('Đã Copy');
    }

    _fetchCouponDetail = () => {
        couponApi.getCouponDetail(this.props.navigation.state.params.couponId)
            .then(response => {
                console.log('getCouponDetail', response);
                let coupon = fromJS(response);
                if (coupon.getIn(['promocode', 'id'])) coupon = coupon.updateIn(['deal', 'promocode_applied'], () => coupon.get('promocode'));
                coupon = coupon.updateIn(['deal', 'coupon_highlight'], () => coupon.get('coupon_highlight'));

                return coupon;
            })
            .then(coupon => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    networkError: false,
                    coupon
                }, () => {
                    this._logScreen();
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    networkError: CommonUtil.isNetworkConnectionError(error)
                });
            })
    }

    _cancelCoupon = () => {
        const paramsTracking = {
            action_location: 'last_min_reservation_info',
            action_name: 'click_cancel_coupon',
            item_id: this.state.coupon.getIn(['deal', 'slug'], ''),
            item_name: this.state.coupon.getIn(['deal', 'slug'], ''),
            item_brand: this.state.coupon.getIn(['deal', 'brand', 'brand_slug'], ''),
            deal_type: this.state.coupon.getIn(['deal', 'deal_type'], ''),
            coupon: this.state.coupon.get('id', '')
        };
        AnalyticsUtil.logNormalEvent(
            'cancel_coupon_start_request',
            paramsTracking,
            'action_coupon'
        );

        couponApi.cancelCoupon(this.state.coupon.get('id'))
            .then(response => {
                console.log('_onCancelBooking:response:', response);
                this._onCancelCouponComplete(response);
            })
            .catch(error => {
                console.log('_onCancelBooking:error:', error);
                this._onCancelCouponFailure(error);
            });
        
        DeliveryDraffDb.remove(this.state.coupon.get('id'));
    }

    _onCancelCouponComplete = (response) => {
        response.text()
            .then(result => {
                if (!response.status || response.status < 200 || response.status > 299) {
                    try {
                        this._onCancelCouponFailure(JSON.parse(result));
                    } catch (error) {
                        this._onCancelCouponFailure(result);
                    }
                    return;
                }
                AnalyticsUtil.logCancelCouponSuccess(
                    this.state.coupon.getIn(['deal', 'brand', 'brand_slug'], ''),
                    this.state.coupon.getIn(['deal', 'slug'], ''),
                    this.state.coupon.getIn(['deal', 'deal_type'], ''),
                    this.state.coupon.get('id', '')
                );

                AnalyticsUtil.cancelCoupon(
                    this.state.coupon.getIn(['deal', 'title'], ''),
                    this.state.coupon.getIn(['deal', 'slug'], ''),
                    this.state.coupon.getIn(['deal', 'brand', 'brand_slug'], ''),
                    this.state.coupon.getIn(['deal', 'cat1'], ''),
                    this.state.coupon.getIn(['deal', 'cat2'], ''),
                    this.state.coupon.getIn(['deal', 'deal_type'], ''),
                    this.state.coupon.getIn(['deal', 'avg_billing_value'], 0),
                    this.state.coupon.get('slot', 0) * this.state.coupon.getIn(['deal', 'avg_billing_value'], 0),
                    this.state.coupon.get('slot', 0),
                    moment.unix(this.state.coupon.get('check_in_time', 0)).local().toDate(),
                    this.state.coupon.get('id', ''),
                    this.state.coupon.getIn(['promocode', 'code_name'], '')
                );

                this.state.coupon = this.state.coupon.updateIn(['status'], () => STATUS_USER_CANCEL);
                this.props.dispatch(couponChangeAction(this.state.coupon.getIn(['deal', 'id'], ''), this.state.coupon));
                this.setState({
                    ...this.state,
                    isLoading: false,
                    canceling: false
                });
            }).catch(error => {
                this._onCancelCouponFailure('Không thể huỷ đặt chỗ lúc này. Vui lòng thử lại sau!');
                console.log('_onCancelCouponComplete:error:', error);
            })
    }

    _onCancelCouponFailure = (error) => {
        const paramsTracking = {
            action_location: 'last_min_reservation_info',
            action_name: 'click_cancel_coupon',
            item_id: this.state.coupon.getIn(['deal', 'slug'], ''),
            item_name: this.state.coupon.getIn(['deal', 'slug'], ''),
            item_brand: this.state.coupon.getIn(['deal', 'brand', 'brand_slug'], ''),
            deal_type: this.state.coupon.getIn(['deal', 'deal_type'], ''),
            coupon: this.state.coupon.get('id', '')
        };
        AnalyticsUtil.logNormalEvent(
            'cancel_coupon_request_error',
            paramsTracking,
            'action_coupon'
        );

        console.log('_onCancelCouponFailure:error:', error);
        this.setState({isLoading: false, canceling: false});

        let message = 'Không thể huỷ đặt chỗ lúc này. Vui lòng thử lại sau!';
        if (typeof error === 'string') {
            message = error;
        } else if (typeof error === 'object') {
            if (error.error_message) message = error.error_message
            else if (error.error) message = error.error
        }
        Alert.alert("Lỗi", message);
    }

    _actionRedeemCode = () => {

        if (!this.state.coupon) return;

        if (!!this.state.coupon.getIn(['deal', 'is_display_as_alias'])) {
            AnalyticsHelper.trackItemListInteraction(
                {
                    screen_name: this.SCREEN,
                    section: 'bottom'
                },
                'button_use_code_click',
                'start_redeem_by_location',
                this.state.coupon.getIn(['deal', 'slug']),
                this.state.coupon.getIn(['deal', 'brand', 'brand_slug']),
                this.state.coupon.getIn(['deal', 'deal_type']),
                this.state.coupon.getIn(['deal', 'title'])
            );

            !!this.redeemByLocation && this.redeemByLocation.redeem(this.state.coupon);
            return;
        }

        this.setState({modalVisible: true});

        AnalyticsUtil.logNormalEvent(
            'open_redeem_gateway',
            {
                action_location: 'last_min_reservation_info',
                action_name: 'click_redeem_button',
                coupon: this.state.coupon.get('id', '')
            },
            'action_coupon'
        )
    }

    _actionDealDetail = () => {
        let {coupon} = this.state;
        if (!coupon) return;
        this.props.navigation.navigate(
            'DealDetail',
            {
                "deal": coupon.get('deal').toJS(),
                source_deal_detail: 'reservation_info',
                from_coupon_id: this.props.navigation.state.params.couponId
            }
        )
    }

    _onCancelBooking = () => {
        this.setState({canceling: true});
        this._cancelCoupon();
    }

    _onOpenQRCodePreview = () => {
        let {coupon} = this.state;
        if (!coupon) return;

        this.props.navigation.navigate('QRCodePreview', {qrCode: coupon.get('code', '')});
    }

    _onSubmitRedeemGateWayPress = () => {
        !!this.redeemByLocation && this.redeemByLocation.redeem(this.state.coupon);
    }

    _onRedeemByLocationRef = ref => this.redeemByLocation = ref;

    _logScreen = () => {
        AnalyticsUtil.logCurrentScreen(
            'last_min_reservation_info',
            {
                item_id: this.state.coupon.getIn(['deal', 'slug'], ''),
                item_name: this.state.coupon.getIn(['deal', 'slug'], ''),
                item_brand: this.state.coupon.getIn(['deal', 'brand', 'brand_slug'], ''),
                deal_type: this.state.coupon.getIn(['deal', 'deal_type'], ''),
                coupon: this.state.coupon.get('id', '')
            }
        );
    }

    _onAction = (action) => {
        if (action === 'refresh') {
            this._fetchCouponDetail();
        }
    }

    _onUseDeliveryButtonInReservationPress = () => {
        let {coupon} = this.state;
        if (!coupon) return;

        const d: ServiceInteractionModel = {};
        d.screen_name = this.SCREEN;
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
                    from: this.TAG
                }
            )
        }
        else {

            d.interaction_type = 'use_delivery';
            AnalyticsUtil.trackDeliveryServiceInteraction(d);

            this.props.navigation.navigate(
                'DeliveryConfirm',
                {
                    deal: coupon.get('deal'),
                    from: this.TAG,
                    coupon
                }
            )
        }
    }

    _onHandleNotificationDispatcher = event => {
        if (!event || !this.mounted || !event.action || !this.state.coupon) return;
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

    _onHandleDealDispatcher = event => {
        if (!event || !this.mounted || !this.state.coupon) return;

        if (event.action === 'update_coupon_alias' && ObjectUtil.getValue(event, undefined, ['data', 'couponId']) === this.state.coupon.get('id')) {
            this.setState({
                coupon: this.state.coupon.updateIn(['code'], () => ObjectUtil.getValue(event, undefined, ['data', 'code']))
            })
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._fetchCouponDetail();
        this.props.navigation.state.params.onAction = this._onAction;
        this.onNotificationSubscription = NotificationSubject.subscribe(this._onHandleNotificationDispatcher);
        this.onDealSubscription = DealSubject.subscribe(this._onHandleDealDispatcher);
    }

    componentWillUnmount() {
        !!this.onNotificationSubscription && this.onNotificationSubscription.unsubscribe();
        !!this.onDealSubscription && this.onDealSubscription.unsubscribe();
        super.componentWillUnmount();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.coupon &&
            nextProps.couponDataChange.get('coupon') &&
            this.state.coupon.get('code') === nextProps.couponDataChange.getIn(['coupon', 'code'])) {

            const coupon = nextProps.couponDataChange.get('coupon');

            this.setState({
                ...this.state,
                coupon: this.state.coupon.updateIn(['deal', 'code_status'], () => coupon.get('status'))
                                        .updateIn(['status'], () => coupon.get('status'))
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLOR_GRAY_BG
    },
    qrLayout: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: DIMENSION_PADDING_MEDIUM
    },
    textCode: {
        color: COLOR_PRIMARY,
        fontSize: DIMENSION_TEXT_HEADER_X,
        fontWeight: 'bold',
        marginRight: 2
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderBottomWidth: 0.5,
        borderColor: COLOR_LINE,
        paddingTop: 16,
        paddingBottom: 16,
        marginLeft: 16,
        marginRight: 16
    },
    contentLabel: {
        color: '#999999'
    },
    contentValue: {
        flex: 1,
        textAlign: 'right',
        color: '#454545'
    },
    couponHighlightRed: {
        textAlign: 'right',
        color: COLOR_PRIMARY,
        fontSize: 14,
        fontWeight: 'bold'
    },
    headerLabel: {
        padding: 16,
        fontWeight: 'bold',
        color: '#666666',
        fontSize: 14
    },
    rowBookingSurvey: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderTopWidth: 0.5,
        borderColor: COLOR_LINE,
        paddingTop: 16,
        paddingBottom: 16,
        marginLeft: 16,
        marginRight: 16
    },
    buttonAlarm: {
        width: '100%',
        height: 48,
        borderWidth: 0.5,
        borderColor: '#ededed',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonRounder: {
        height: 48,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 4
    },
    useCodeBackground: {
        paddingTop: 4,
        paddingBottom: 16,
        width: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ededed',
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM
    },
    buttonDealDetail: {
        flex: 1,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_EXTRA,
        paddingTop: DIMENSION_PADDING_MEDIUM
    },
    formInfo: {
        marginTop: DIMENSION_PADDING_MEDIUM
    },
    formLine: {
        backgroundColor: COLOR_LINE,
        width: '100%',
        height: 0.8,
        marginTop: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_MEDIUM
    },
    buttonUserCode: {
        width: '100%',
        height: DIMENSION_BUTTON_MEDIUM
    },
    buttonDelivery: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_MEDIUM
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.loginReducer.user,

        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),

        couponDataChange: state.couponDataChangeReducer,
    }
};

export default connect(mapStateToProps)(LastMinReservationInfo);