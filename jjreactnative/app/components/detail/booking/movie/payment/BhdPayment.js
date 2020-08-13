import React from 'react';
import {BaseComponent} from "../../../../common/BaseComponent";
import {COLOR_GRAY_BG, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";
import JJHeader from "../../../../common/JJHeader";
import {AppState, BackHandler, View} from "react-native";
import {TouchableOpacity} from "react-native";
import JJIcon from "../../../../common/JJIcon";
import {Platform} from "react-native";
import {ObjectUtil} from "../../../../../utils/object-utils";
import JJWebView from "../../../../webview/JJWebView";
import {Alert} from "react-native";
import {fromJS} from 'immutable';
import moment from 'moment/min/moment-with-locales';

import {
    ALERT_TITLE_CONFIRM,
    ALERT_TITLE_ERROR, ALERT_TITLE_NORMAL, ALERT_TITLE_WARNING, BHD_ERROR_TIMEOUT,
    BHD_NOTICE_CANCEL_ORDER, ERROR_NORMAL,
    getErrorMessage
} from "../../../../../utils/text-message";
import {bookingApi} from "../../../../../api/booking-api";
import {NativeCommon} from "../../../../../common/native/NativeCommon";
import LoadingViewPopup from "../../../../../common/view/loading/LoadingViewPopup";
import {couponChangeAction} from "../../action";
import {CouponDb} from "../../../../../api/storage/CouponDb";
import connect from "react-redux/es/connect/connect";
import {DEAL_TYPE_MOVIE, STATUS_MERCHANT_ACCEPTED} from "../../../../../const";
import {StringUtil} from '../../../../../utils/string-util';
import HeaderCountDown from "../HeaderCountDown";
import {AnalyticsUtil} from "../../../../common/analytics/analytics";

const ios = Platform.OS === 'ios';
const headerHeight = ios ? 44 : 56;
moment.locale('vi');

class BhdPayment extends BaseComponent {

    deal;
    booking;
    order;
    remoteListener;

    instanceId;
    paymentResult;

    source;

    orderVerified;
    payComplete = false;
    openFrom;

    retryCount = 0;
    baseLogParams;

    isFocus = false;
    timeCountDown;
    timeOutOpening = false;

    constructor(props) {
        super(props);

        this.deal = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'deal']);
        this.booking = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'booking']);
        this.order = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'order']);
        this.remoteListener = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'remoteListener']);
        this.openFrom = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'from']);

        console.log('BhdPayment:cons', props);

        this.instanceId = this.order.getIn(['jamja_order', 'id']) + new Date().getTime();

        this.timeCountDown = moment().add(5, 'm');

        this.source = {
            uri: this.order.get('payment_url', '')
        };
        this.state = {
            url: this.order.get('payment_url', ''),
            progress: 0,
            canGoBack: false,
            canGoForward: false,
            loading: false,
            stopCountDown: false,
            time: 300
        };

        this.baseLogParams = {
            item_id: this.deal.get('slug', ''),
            item_brand: this.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: DEAL_TYPE_MOVIE,
            deal_type: DEAL_TYPE_MOVIE
        };
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: COLOR_GRAY_BG}}>
                {/* Toolbar */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={'THANH TOÁN VÉ PHIM'}
                    titleColor={COLOR_TEXT_BLACK_1}
                    leftItem={this._renderLeftHeader}
                    rightItem={() => this._renderRightHeader()}/>

                <JJWebView
                    url={this.source.uri}
                    disableRefresh={true}
                    instanceId={this.instanceId}
                    style={{
                        flex: 1,
                        backgroundColor: COLOR_GRAY_BG
                    }}
                />

                <LoadingViewPopup
                    visible={this.state.loading}/>
            </View>
        )
    }

    _renderLeftHeader = () => {
        return (
            <TouchableOpacity
                style={{
                    height: headerHeight,
                    width: headerHeight,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={this._onBackButtonClicked}>
                <JJIcon
                    style={{ marginBottom: Platform.OS === 'ios' ? 4 : 0 }}
                    name={'x_o'}
                    color={COLOR_TEXT_INACTIVE}
                    size={16} />
            </TouchableOpacity>
        )
    }

    _renderRightHeader = () => {
        if (!!this.state.stopCountDown) return null;
        return (
            <HeaderCountDown
                time={this.state.time}
                onTimeOut={this._onTimeOutHolding}/>
        )
    }

    _fetchCancelOrder = () => {
        console.log('_fetchCancelOrder', this.remoteListener, this.order.toJS());
        this.timeOutOpening = false;
        AnalyticsUtil.logMovieRemoveFromCart(
            ObjectUtil.getValue(this.baseLogParams, '', ['item_brand']),
            ObjectUtil.getValue(this.baseLogParams, '', ['item_id']),
            DEAL_TYPE_MOVIE,
            {
                store_id: this.order.getIn(['jamja_order', 'coupon', 'store', 'id'], ''),
                slot: this.order.getIn(['jamja_order', 'count'], 0),
                time: this.order.getIn(['jamja_order', 'coupon', 'check_in_time'], ''),
                avg_billing_value: this.deal.getIn(['avg_billing_value'], 0),
                price: ObjectUtil.getValue(this.props, 0, ['navigation', 'state', 'params', 'draftTotalPrice'])
            }
        );

        bookingApi.bhdCancelOrder(
            this.order.getIn(['jamja_order', 'bhd_order', 'user_session_id']),
            this.order.getIn(['jamja_order', 'id']))
            .then(response => {
                if (!this.mounted) return;
                console.log('_fetchCancelOrder:response', this.remoteListener, response);
                !!this.remoteListener && this.remoteListener('refresh');
                this.props.navigation.goBack();
            })
            .catch(error => {
                console.log('_fetchCancelOrder:error', this.remoteListener, error);
                !!this.remoteListener && this.remoteListener('refresh');
                this.props.navigation.goBack();
            });
    }

    _retryFetchVerifyOrder = () => {
        this.retryCount += 1;
        if (this.retryCount > 5) {

            AnalyticsUtil.logNormalEvent(
                'movie_booking_payment_failure',
                this.baseLogParams,
                'booking'
            );

            Alert.alert(
                ALERT_TITLE_ERROR,
                ERROR_NORMAL,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            !!this.remoteListener && this.remoteListener('refresh');
                            this.props.navigation.goBack();
                        }
                    },
                ],
                {cancelable: false}
            );
            return;
        }
        this.retryVerifySub = setTimeout(this._fetchVerifyOrder, 1000);
    }

    _fetchVerifyOrder = () => {
        if (!this.mounted) return;
        this.timeOutOpening = false;
        bookingApi.bhdVerifyPayment(
                this.order.getIn(['jamja_order', 'bhd_order', 'user_session_id']),
                this.order.getIn(['jamja_order', 'id']),
                this.paymentResult)

            .then(response => {
                console.log('_fetchVerifyOrder:response', response);

                if (!StringUtil.isEmpty(response.error_msg) && !response.coupon) {
                    AnalyticsUtil.logNormalEvent(
                        'movie_booking_payment_failure',
                        this.baseLogParams,
                        'booking'
                    );

                    Alert.alert(
                        ALERT_TITLE_WARNING,
                        response.error_msg + '',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    !!this.remoteListener && this.remoteListener('refresh');
                                    this.props.navigation.goBack();
                                }
                            },
                        ],
                        {cancelable: false}
                    );
                    return;
                }

                if (!!response && !response.coupon && !response.error && response.error_code === null && response.error_msg == null) {
                    this._retryFetchVerifyOrder();
                    return;
                }

                this.orderVerified = fromJS(response);

                if (!!this.orderVerified && !!this.orderVerified.get('coupon')) {
                    this._onVerifySuccess();
                }
            })
            .catch(error => {
                console.log('_fetchVerifyOrder:error', error);
                AnalyticsUtil.logNormalEvent(
                    'movie_booking_payment_failure',
                    this.baseLogParams,
                    'booking'
                );
                Alert.alert(
                    ALERT_TITLE_ERROR,
                    getErrorMessage(error),
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                !!this.remoteListener && this.remoteListener('refresh');
                                this.props.navigation.goBack();
                            }
                        },
                    ],
                    {cancelable: false}
                );
            })
    }

    _onVerifySuccess = () => {
        AnalyticsUtil.logNormalEvent(
            'movie_booking_payment_success',
            this.baseLogParams,
            'booking'
        );

        AnalyticsUtil.logMovieNotifyOrderSuccess(
            ObjectUtil.getValue(this.baseLogParams, '', ['item_brand']),
            ObjectUtil.getValue(this.baseLogParams, '', ['item_id']),
            DEAL_TYPE_MOVIE,
            {
                store_id: this.orderVerified.getIn(['coupon', 'store', 'id'], ''),
                slot: this.orderVerified.getIn(['count'], 0),
                time: this.orderVerified.getIn(['coupon', 'check_in_time'], ''),
                avg_billing_value: this.deal.getIn(['avg_billing_value'], 0),
                price: this.orderVerified.get('total_price', 0),
                coupon_id: this.orderVerified.getIn(['coupon', 'coupon_id'], ''),
            }
        );

        AnalyticsUtil.logMovieBookingComplete(
            ObjectUtil.getValue(this.baseLogParams, '', ['item_brand']),
            ObjectUtil.getValue(this.baseLogParams, '', ['item_id']),
            DEAL_TYPE_MOVIE,
            {
                store_id: this.orderVerified.getIn(['coupon', 'store', 'id'], ''),
                slot: this.orderVerified.getIn(['count'], 0),
                time: this.orderVerified.getIn(['coupon', 'check_in_time'], ''),
                avg_billing_value: this.deal.getIn(['avg_billing_value'], 0),
                price: this.orderVerified.get('total_price', 0),
                coupon_id: this.orderVerified.getIn(['coupon', 'coupon_id'], ''),
            }
        );

        AnalyticsUtil.purchase(
            this.deal.get('title', ''),
            this.deal.get('slug', ''),
            this.deal.getIn(['brand', 'brand_slug'], ''),
            this.deal.get('cat1', ''),
            this.deal.get('cat2', ''),
            this.deal.get('deal_type', ''),
            this.deal.getIn(['avg_billing_value'], 0),
            this.orderVerified.get('total_price', 0),
            this.orderVerified.getIn(['count'], 0),
            moment.unix(this.orderVerified.getIn(['coupon', 'check_in_time'], '')).local().toDate(),
            this.orderVerified.getIn(['coupon', 'promocode', 'code_name'], '')
        );

        let couponStatus = this.orderVerified.getIn(['coupon', 'status']);
        if (couponStatus === undefined) {
            couponStatus = STATUS_MERCHANT_ACCEPTED;
            this.orderVerified = this.orderVerified.updateIn(['coupon', 'status'], () => couponStatus);
        }

        this.deal = this.deal.updateIn(['coupon_id'], () => this.orderVerified.getIn(['coupon', 'coupon_id']));
        this.deal = this.deal.updateIn(['redeem_url'], () => this.orderVerified.getIn(['coupon', 'redeem_url']));
        this.deal = this.deal.updateIn(['code'], () => this.orderVerified.getIn(['coupon', 'code']));
        this.deal = this.deal.updateIn(['code_status'], () => couponStatus);
        this.orderVerified = this.orderVerified.updateIn(['coupon', 'deal'], () => this.deal);
        if (!this.orderVerified.getIn(['coupon', 'id'])) {
            this.orderVerified = this.orderVerified.updateIn(['coupon', 'id'], () => this.orderVerified.getIn(['coupon', 'coupon_id']));
        }

        this.props.dispatch(couponChangeAction(this.deal.get('id', ''), this.orderVerified.get('coupon')));
        CouponDb.add(this.orderVerified.get('coupon').toJS());

        this.props.navigation.push(
            'MovieBookingSuccess',
            {
                from: this.openFrom,
                deal: this.deal,
                booking: this.booking,
                order: this.orderVerified
            }
        )
    }

    _onBackButtonClicked = () => {
        if (!!this.payComplete) return;
        Alert.alert(
            ALERT_TITLE_CONFIRM,
            BHD_NOTICE_CANCEL_ORDER,
            [
                {
                    text: 'Không',
                    onPress: () => console.log('_onBackButtonClicked:no')
                },
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        AnalyticsUtil.logNormalEvent(
                            'movie_booking_payment_back',
                            this.baseLogParams,
                            'booking'
                        );
                        this.setState({
                            ...this.state,
                            loading: true
                        }, this._fetchCancelOrder);
                    }
                }
            ],
            {cancelable: false}
        );
    }

    _handlerPaymentStatus = (result) => {
        console.log('BhdPayment:_handlerPaymentStatus: ', result);
        if (!result ||
            !this.mounted ||
            !result.action ||
            result.action !== 'payment_action' ||
            result.id !== this.instanceId ||
            !!this.state.loading ||
            !!this.state.stopCountDown) return;

        this.paymentResult = result.slug;
        this.payComplete = true;

        AnalyticsUtil.logNormalEvent(
            'movie_booking_payment_complete',
            this.baseLogParams,
            'booking'
        );

        this.setState({
            ...this.state,
            loading: true,
            stopCountDown: true
        }, () => {
            this.verifySub = setTimeout(this._fetchVerifyOrder, 10000);
        });
    }

    _onBackPressListener = () => {
        this._onBackButtonClicked();
        return true;
    }

    _verifyOrderOnTimeOut = () => {
        if (!this.mounted) return;
        bookingApi.bhdVerifyPayment(
            this.order.getIn(['jamja_order', 'bhd_order', 'user_session_id']),
            this.order.getIn(['jamja_order', 'id']),
            undefined)

            .then(response => {
                this.timeOutOpening = false;
                console.log('_fetchVerifyOrder:response', response);

                if (!!response.coupon) {
                    this.orderVerified = fromJS(response);
                    this._onVerifySuccess();
                    return;
                }

                this._onAlertTimeOut();
            })
            .catch(error => {
                this.timeOutOpening = false;
                console.log('_fetchVerifyOrder:error', error);
                this._onAlertTimeOut();
            });
    }

    _onAlertTimeOut = () => {
        AnalyticsUtil.logNormalEvent(
            'movie_booking_payment_timeout',
            this.baseLogParams,
            'booking'
        );
        Alert.alert(
            ALERT_TITLE_NORMAL,
            BHD_ERROR_TIMEOUT,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        this.setState({
                            ...this.state,
                            loading: true,
                            stopCountDown: true
                        }, this._fetchCancelOrder);
                    }
                }
            ],
            {cancelable: false}
        );
    }

    _onTimeOutHolding = () => {
        if (!!this.state.loading || !!this.timeOutOpening) return;
        this.timeOutOpening = true;
        this.setState({
            ...this.state,
            loading: true,
            stopCountDown: true
        }, () => {
            this.verifyTimeOutSub = setTimeout(this._verifyOrderOnTimeOut, 10000);
        });
    }

    _onAppStateChanged = state => {
        try {
            if (this.isFocus &&
                state === 'active' &&
                !this.state.stopCountDown &&
                !!this.order) {
                let time = 0;
                try {
                    time = this.timeCountDown.diff(moment(), 'seconds');
                } catch (e) {
                    console.log(e);
                }

                console.log('MovieRoom:BhdPayment:nextTime:', time);

                if (time <= 1) {
                    this._onTimeOutHolding();
                    return;
                }

                this.setState({
                    ...this.state,
                    time: time
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        super.componentDidMount();
        AnalyticsUtil.logCurrentScreen('movie_booking_payment', this.baseLogParams);
        try {
            NativeCommon.addListener(this._handlerPaymentStatus);
            this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload => {
                this.isFocus = true;
                !ios && BackHandler.addEventListener('hardwareBackPress', this._onBackPressListener);
            });
            this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
                this.isFocus = false;
                !ios && BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener)
            });
            AppState.addEventListener('change', this._onAppStateChanged);
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount() {
        try {
            NativeCommon.removeListener(this._handlerPaymentStatus);
            !!this.verifySub && clearTimeout(this.verifySub);
            !!this.retryVerifySub && clearTimeout(this.retryVerifySub);
            !!this.verifyTimeOutSub && clearTimeout(this.verifyTimeOutSub);

            !ios && BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener);
            this._didFocusSubscription && this._didFocusSubscription.remove();
            this._willBlurSubscription && this._willBlurSubscription.remove();

            AppState.removeEventListener('change', this._onAppStateChanged);
        } catch (e) {
            console.log(e);
        }
        super.componentWillUnmount();
    }
}

export default connect()(BhdPayment);