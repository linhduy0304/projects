import React from 'react';
import {fromJS} from 'immutable';
import {Alert, AppState, BackHandler, Platform} from 'react-native';
import moment from 'moment/min/moment-with-locales';

import {ObjectUtil} from '../../../../../utils/object-utils';
import {BasePureComponent} from "../../../../common/BasePureComponent";
import {bookingApi} from '../../../../../api/booking-api';
import {commonApi} from '../../../../../api/common-api';
import {StringUtil} from '../../../../../utils/string-util';
import {validateEmail, validatePhoneNumber} from '../../../../../utils/validation-util';
import {
    ALERT_TITLE_ERROR, ALERT_TITLE_NORMAL,
    ALERT_TITLE_WARNING, BHD_ERROR_TIMEOUT,
    BHD_NOTICE_NOT_ALLOW_RATING,
    ERROR_EMAIL, ERROR_NORMAL,
    ERROR_PHONE, getErrorMessage
} from '../../../../../utils/text-message';
import {UserDb} from "../../../../../api/storage/UserDb";
import {updateUser} from "../../../../login/action";
import {DEAL_TYPE_MOVIE} from "../../../../../const";
import {AnalyticsUtil} from "../../../../common/analytics/analytics";

moment.locale('vi');

const ios = Platform.OS === 'ios';

export default class Repository extends BasePureComponent {

    deal;
    booking;
    order;

    remoteListener;
    openFrom;
    baseLogParams;

    isFocus = false;
    timeOutOpening = false;

    constructor(props) {
        super(props);
        this.deal = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'deal']);
        this.booking = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'booking']);
        this.order = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'order']);
        this.remoteListener = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'remoteListener']);
        this.openFrom = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'from']);

        let full_name = '';
        let phone_number = '';
        let email = '';
        if (this.openFrom === 'deal_detail') {
            full_name = this.order.getIn(['jamja_order', 'coupon', 'user_name']);
            phone_number = this.order.getIn(['jamja_order', 'coupon', 'phone_number']);
            email = this.order.getIn(['jamja_order', 'coupon', 'email']);
        }
        if (StringUtil.isEmpty(full_name)) full_name = ObjectUtil.getValue(props, '', ['user', 'contact_info_full_name']);
        if (StringUtil.isEmpty(phone_number)) phone_number = ObjectUtil.getValue(props, '', ['user', 'contact_info_phone_number']);
        if (StringUtil.isEmpty(email)) email = ObjectUtil.getValue(props, '', ['user', 'contact_info_email']);

        let time = 250;
        try {
            time = moment.utc(this.order.getIn(['jamja_order', 'expires'])).utc().diff(moment(), 'seconds');
        } catch (e) {
            console.log(e);
            time = 250;
        }

        console.log('ConfirmBooking:cons', time, this.booking.toJS(), this.order.toJS());

        let promocode = this.order.getIn(['jamja_order', 'coupon', 'promocode']);
        let draftTotalPrice = this.order.getIn(['jamja_order', 'total_price'], 0);
        if (!!promocode && !!promocode.get('id')) {
            draftTotalPrice = this.order.getIn(['jamja_order', 'price_with_promocode'], 0);
        }
        else {
            promocode = undefined;
        }

        this.state = {
            time: time,
            loading: false,
            ratingChecked: false,
            full_name: full_name,
            phone_number: phone_number,
            email: email,
            enableConfirmButton: false,
            stopCountDown: false,
            isLoadingPromoCode: false,
            draftTotalPrice,
            data: fromJS({
                promocode
            })
        };

        this.baseLogParams = {
            item_id: this.deal.get('slug', ''),
            item_brand: this.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: DEAL_TYPE_MOVIE,
            deal_type: DEAL_TYPE_MOVIE
        };

        const enableConfirmButton = this._isValidUserNameInput(this.state.full_name) &&
            this._isValidPhoneNumberInput(this.state.phone_number) &&
            this._isValidEmailInput(this.state.email);

        this.state.enableConfirmButton = enableConfirmButton;
    }

    componentDidMount() {
        super.componentDidMount();

        this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload => {
            this.isFocus = true;
            !ios && BackHandler.addEventListener('hardwareBackPress', this._onBackPressListener);
        });
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            this.isFocus = false;
            !ios && BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener);
        });
        AppState.addEventListener('change', this._onAppStateChanged);
    }

    _fetchCancelOrder = () => {
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
                price: this.state.draftTotalPrice
            }
        );

        bookingApi.bhdCancelOrder(
            this.order.getIn(['jamja_order', 'bhd_order', 'user_session_id']),
            this.order.getIn(['jamja_order', 'id']))
            .then(response => {
                if (!this.mounted) return;
                console.log('_fetchCancelOrder:response', response);
                !!this.remoteListener && this.remoteListener('refresh');
                this.props.navigation.goBack();
            })
            .catch(error => {
                console.log('_fetchCancelOrder:error', error);
                !!this.remoteListener && this.remoteListener('refresh');
                this.props.navigation.goBack();
            });
    }

    _fetchNotifyPayment = () => {
        this.timeOutOpening = false;
        AnalyticsUtil.logMovieNotifyOrder(
            ObjectUtil.getValue(this.baseLogParams, '', ['item_brand']),
            ObjectUtil.getValue(this.baseLogParams, '', ['item_id']),
            DEAL_TYPE_MOVIE,
            {
                store_id: this.order.getIn(['jamja_order', 'coupon', 'store', 'id'], ''),
                slot: this.order.getIn(['jamja_order', 'count'], 0),
                time: this.order.getIn(['jamja_order', 'coupon', 'check_in_time'], ''),
                avg_billing_value: this.deal.getIn(['avg_billing_value'], 0),
                price: this.state.draftTotalPrice,
                coupon_id: this.order.getIn(['jamja_order', 'coupon', 'coupon_id'], ''),
            }
        );

        AnalyticsUtil.beginCheckOut(
            this.deal.get('title', ''),
            this.deal.get('slug', ''),
            this.deal.getIn(['brand', 'brand_slug'], ''),
            this.deal.get('cat1', ''),
            this.deal.get('cat2', ''),
            this.deal.get('deal_type', ''),
            this.deal.getIn(['avg_billing_value'], 0),
            this.state.draftTotalPrice,
            this.order.getIn(['jamja_order', 'count'], 0),
            this.order.getIn(['jamja_order', 'coupon', 'check_in_time'], ''),
            this.state.data.getIn(['promocode', 'code_name'], '')
        );

        bookingApi.bhdNotifyPayment(
            this.order.getIn(['jamja_order', 'bhd_order', 'user_session_id']),
            this.order.getIn(['jamja_order', 'id']),
            this.state.full_name,
            this.state.phone_number,
            this.state.email,
            )
            .then(response => {
                console.log('_fetchNotifyPayment:response', response);

                if (!!response && response.payment_url) {
                    this.order = this.order.updateIn(['payment_url'], () => response.payment_url);
                    AnalyticsUtil.logMovieNotifyOrderSuccess(
                        ObjectUtil.getValue(this.baseLogParams, '', ['item_brand']),
                        ObjectUtil.getValue(this.baseLogParams, '', ['item_id']),
                        DEAL_TYPE_MOVIE,
                        {
                            store_id: this.order.getIn(['jamja_order', 'coupon', 'store', 'id'], ''),
                            slot: this.order.getIn(['jamja_order', 'count'], 0),
                            time: this.order.getIn(['jamja_order', 'coupon', 'check_in_time'], ''),
                            avg_billing_value: this.deal.getIn(['avg_billing_value'], 0),
                            price: this.state.draftTotalPrice,
                            coupon_id: this.order.getIn(['jamja_order', 'coupon', 'coupon_id'], ''),
                        }
                    );

                    this.setState({
                        ...this.state,
                        stopCountDown: true,
                        loading: false
                    }, this._openPayment);
                }
                else {
                    Alert.alert(
                        ALERT_TITLE_ERROR,
                        getErrorMessage(error),
                        [
                            {
                                text: 'OK'
                            },
                        ],
                        {cancelable: false}
                    );
                }
            })
            .catch(error => {
                console.log('_fetchNotifyPayment:error', error);

                AnalyticsUtil.logMovieNotifyOrderFailure(
                    ObjectUtil.getValue(this.baseLogParams, '', ['item_brand']),
                    ObjectUtil.getValue(this.baseLogParams, '', ['item_id']),
                    DEAL_TYPE_MOVIE,
                    {
                        store_id: this.order.getIn(['jamja_order', 'coupon', 'store', 'id'], ''),
                        slot: this.order.getIn(['jamja_order', 'count'], 0),
                        time: this.order.getIn(['jamja_order', 'coupon', 'check_in_time'], ''),
                        avg_billing_value: this.deal.getIn(['avg_billing_value'], 0),
                        price: this.state.draftTotalPrice,
                        coupon_id: this.order.getIn(['jamja_order', 'coupon', 'coupon_id'], ''),
                    },
                    ObjectUtil.getValue(error, '', ['message'])
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

    _fetchPromoCode = (promoCode) => {
        console.log('_fetchPromoCode', this.props, this.booking.toJS(), this.deal.toJS(), this.order.toJS());
        commonApi.getPromoCodeDetail(
            promoCode,
            this.deal.get('id'),
            this.order.getIn(['jamja_order', 'coupon', 'store', 'id'], ''),
            this.order.getIn(['jamja_order', 'coupon', 'check_in_time'], ''),
            this.order.getIn(['jamja_order', 'count'], 0),
            this.order.getIn(['jamja_order', 'id'])
        )
            .then(response => {
                console.log('getPromoCodeDetailByOrder:response: ', response);
                this._handlePromoCodeResponse(response);
            })
            .catch(error => {
                console.log('getPromoCodeDetailByOrder:error: ', error);
                this.setState({
                    isLoadingPromoCode: false
                }, () => {
                    Alert.alert(
                        ALERT_TITLE_ERROR,
                        getErrorMessage(error),
                        [
                            {
                                text: 'OK'
                            },
                        ],
                        {cancelable: false}
                    );
                });
            })
    }

    _fetchClearPromoCode = (promoCode) => {
        commonApi.clearPromoCode(
            promoCode,
            this.order.getIn(['jamja_order', 'id']))
            .then(response => {
                console.log('clearPromoCode:response: ', response);
            })
            .catch(error => {
                console.log('clearPromoCode:error: ', error);
            })
    }

    _openPayment = () => {
        this.props.navigation.push(
            'BhdPayment',
            {
                from: this.openFrom,
                deal: this.deal,
                booking: this.booking,
                order: this.order,
                draftTotalPrice: this.state.draftTotalPrice,
                time: this.state.time,
                remoteListener: this._onRemoteListener
            })
    }

    _onBackPressListener = () => {
        this._onBackButtonClicked();
        return true;
    }

    _isValidUserNameInput = (text) => {
        if (!!text) {
            return !StringUtil.isBlank(text) && text.length > 1 && text.length < 200;
        }
        return !StringUtil.isBlank(this.state.full_name) && this.state.full_name.length > 1 && this.state.full_name.length < 200;
    }

    _isValidPhoneNumberInput = (text) => {
        if (!!text) {
            return !StringUtil.isBlank(text) && text.length > 9 && text.length < 13;
        }
        return !StringUtil.isBlank(this.state.phone_number) && this.state.phone_number.length > 9 && this.state.phone_number.length < 13;
    }

    _isValidEmailInput = (text) => {
        if (!!text) {
            return !StringUtil.isBlank(text) && text.length > 4 && text.length < 200 && text.indexOf('@') > 0;
        }
        return !StringUtil.isBlank(this.state.email) && this.state.email.length > 4 && this.state.email.length < 200 && this.state.email.indexOf('@') > 0;
    }

    _checkForEnableConfirmButton = (type, text) => {
        switch (type) {
            case 'user_name':
                return this._isValidUserNameInput(text) && this._isValidPhoneNumberInput() && this._isValidEmailInput();
            case 'email':
                return this._isValidUserNameInput() && this._isValidPhoneNumberInput() && this._isValidEmailInput(text);
            case 'phone_number':
                return this._isValidUserNameInput() && this._isValidPhoneNumberInput(text) && this._isValidEmailInput();
        }
        return false;
    }

    _onUserNameInputChanged = (text) => {
        this.setState({
            ...this.state,
            enableConfirmButton: this._checkForEnableConfirmButton('user_name', text),
            full_name: text
        });
    }

    _onUserNameInputSubmitClicked = () => this.refs.edtEmail.focus();

    _onPhoneNumberInputChanged = (text) => {
        this.setState({
            ...this.state,
            enableConfirmButton: this._checkForEnableConfirmButton('phone_number', text.trim()),
            phone_number: text.trim()
        });
    }

    _onEmailSubmitClicked = () => this.refs.edtPhoneNumber.focus();

    _onEmailInputChanged = (text) => {
        this.setState({
            ...this.state,
            enableConfirmButton: this._checkForEnableConfirmButton('email', text.trim()),
            email: text.trim()
        });
    }

    _validateInput = () => {
        if (!this._isValidUserNameInput()) {
            Alert.alert(ALERT_TITLE_ERROR, 'Họ và tên không hợp lệ. Vui lòng nhập thông tin hợp lệ');
            return false;
        }

        if (!validateEmail(this.state.email)) {
            Alert.alert(ALERT_TITLE_ERROR, ERROR_EMAIL);
            return false;
        }

        if (!validatePhoneNumber(this.state.phone_number)) {
            Alert.alert(ALERT_TITLE_ERROR, ERROR_PHONE);
            return false;
        }

        if (!!this.deal.get('rating') && this.deal.get('rating').toLowerCase().indexOf('p') < 0 && !this.state.ratingChecked) {
            Alert.alert(
                ALERT_TITLE_WARNING,
                BHD_NOTICE_NOT_ALLOW_RATING);
            return false;
        }

        return true;
    }

    _onPressSubmit = () => {
        if (!this._validateInput()) {
            return;
        }

        this._cacheUserInfo();

        this.setState({
            ...this.state,
            loading: true
        }, this._fetchNotifyPayment);
    }

    _cacheUserInfo = () => {
        UserDb.updateUserContactInfo(
            this.state.full_name,
            this.state.phone_number,
            this.state.email
        );
        let currentUser = this.props.user;
        currentUser.contact_info_full_name = this.state.full_name;
        currentUser.contact_info_phone_number = this.state.phone_number;
        currentUser.contact_info_email = this.state.email;

        this.props.dispatch(updateUser(currentUser));
    }

    _onRemoteListener = action => {
        console.log('ConfirmBooking:action:', this.remoteListener, action);
        if (action === 'refresh') {
            !!this.remoteListener && this.remoteListener('refresh');
            this.props.navigation.goBack();
        }
    }

    _getSeatSelected = () => {
        const tickets = this.order.getIn(['jamja_order', 'bhd_order', 'tickets']);
        if (!tickets || tickets.size < 1) return '';

        return tickets.map(tk => tk.get('SeatData', '')).join(', ') + ` (${this.order.getIn(['jamja_order', 'count'], 0)} ghế)`;
    }

    _onTimeOutHolding = () => {
        if (!!this.timeOutOpening) return;

        AnalyticsUtil.logNormalEvent(
            'movie_booking_confirm_timeout',
            this.baseLogParams,
            'booking'
        );

        this.timeOutOpening = true;

        Alert.alert(
            ALERT_TITLE_NORMAL,
            BHD_ERROR_TIMEOUT,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        this.timeOutOpening = false;
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

    _onApplyPromoCodePressed = (promoCode) => {
        AnalyticsUtil.logNormalEvent(
            'get_code_selections',
            {
                ...this.baseLogParams,
                screen_name: this.TAG,
                interaction_type: 'apply_promotion_press',
                interaction_value: !!promoCode ? promoCode : ''
            },
            'Engagement'
        );

        this.setState({
            isLoadingPromoCode: true
        }, () => this._fetchPromoCode(promoCode));
    }

    _onClearPromoCodePressed = () => {
        AnalyticsUtil.logNormalEvent(
            'get_code_selections',
            {
                ...this.baseLogParams,
                screen_name: this.TAG,
                interaction_type: 'clear_promotion_press',
                interaction_value: this.state.data.getIn(['promocode', 'code_name'], 'not_set')
            },
            'Engagement'
        );

        if (!!this.state.data.getIn(['promocode', 'code_name'])) {
            this._fetchClearPromoCode(this.state.data.getIn(['promocode', 'code_name']));
        }
        this.setState({
            isLoadingPromoCode: false,
            draftTotalPrice: this.order.getIn(['jamja_order', 'total_price'], 0),
            data: this.state.data.updateIn(['promocode'], () => undefined)
        })
    }

    _onOpenPromoCodeDetailPressed = () => {
        if (!!this.state.data.get('promocode')) {
            this.props.navigation.navigate(
                'PromoCodeDetailDialog',
                {
                    promocode: this.state.data.get('promocode')
                });
        }
    }

    _handlePromoCodeResponse = (response) => {

        if (!response) {
            this.setState({
                isLoadingPromoCode: false
            }, () => this._showAlertError(ERROR_NORMAL));
            return;
        }

        if (!!response.error) {
            this.setState({
                isLoadingPromoCode: false
            }, () => this._showAlertError(response.error));
            return;
        }

        if (!!response.errors && response.errors.length > 0) {
            AnalyticsUtil.logNormalEvent(
                'get_code_selections',
                {
                    ...this.baseLogParams,
                    screen_name: this.TAG,
                    interaction_type: 'apply_promotion_not_valid',
                    interaction_value: ObjectUtil.getValue(response, 'not_set', ['code_name'])
                },
                'Engagement'
            );
            this.setState({
                isLoadingPromoCode: false
            }, () => this._showAlertError(response.errors.join('\n')));
            return;
        }

        AnalyticsUtil.logNormalEvent(
            'get_code_selections',
            {
                ...this.baseLogParams,
                screen_name: this.TAG,
                interaction_type: 'apply_promotion_success',
                interaction_value: ObjectUtil.getValue(response, 'not_set', ['code_name'])
            },
            'Engagement'
        );

        this.setState({
            isLoadingPromoCode: false,
            draftTotalPrice: ObjectUtil.getValue(response, 0, ['price_with_promocode']),
            data: this.state.data.updateIn(['promocode'], () => fromJS(response))
        })
    }

    _showAlertError = message => {
        Alert.alert(
            ALERT_TITLE_ERROR,
            message,
            [
                {
                    text: 'OK'
                },
            ],
            {cancelable: false}
        );
    }

    _onAppStateChanged = state => {
        try {
            if (this.isFocus &&
                state === 'active' &&
                !this.state.stopCountDown &&
                !!this.order) {
                let time = 0;
                try {
                    time = moment.utc(this.order.getIn(['jamja_order', 'expires'])).utc().diff(moment(), 'seconds');
                } catch (e) {
                    console.log(e);
                }

                console.log('MovieRoom:nextTime:', time);

                this.setState({
                    ...this.state,
                    stopCountDown: time <= 1,
                    time: time
                }, () => {
                    if (time <= 1) {
                        this._onTimeOutHolding();
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount() {
        !ios && BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener);
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();

        AppState.removeEventListener('change', this._onAppStateChanged);
        super.componentWillUnmount();
    }
}