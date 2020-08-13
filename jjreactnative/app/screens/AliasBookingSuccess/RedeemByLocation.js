import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import moment from "moment/min/moment-with-locales";
moment.locale('vi');
import {from} from 'rxjs';

import {BaseComponent} from "../../common/base/BaseComponent";
import LocationManager from '../../common/library/location';

import RequestLocationPopup from '../../common/library/location/RequestLocationPopup';
import Alert from '../../common/view/alert/Alert';
import LoadingViewPopup from '../../common/view/loading/LoadingViewPopup';

import CountDownPopup from './CountDownPopup';
import {couponApi} from '../../api/coupon-api';
import {ObjectUtil} from '../../utils/object-utils';
import {NavigationUtils} from "../../router/navigation-utils";
import {getErrorMessage} from '../../utils/text-message';
import {couponChangeAction} from "../../components/detail/booking/action";
import {dispatch} from '../../router/MainTabContainer';
import {CommonUtil} from '../../utils/common-utils';
import {AnalyticsHelper} from '../../common/analytics';

export default class RedeemByLocation extends BaseComponent {

    start_redeem_time;
    start_countdown_time;
    coupon;
    userLocation;
    locationRequestError;

    itemIds = {};

    constructor(props) {
        super(props);
        this.state = {
            showLocationRequestPopup: false,
            showCountdownPopup: false,
            isLoading: false,
            processing: false
        }
    }

    render() {

        if (!this.state.processing) return null;

        console.debug('RedeemByLocation:render', this.state);

        return (
            <View style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 12}}>

                {
                    !!this.state.showCountdownPopup &&
                    <CountDownPopup
                        start_countdown_time={this.start_countdown_time}
                        start_redeem_time={this.start_redeem_time}
                        check_in_time={this.props.coupon.get('check_in_time')}
                        situation={{
                            screen_name: this.props.screen,
                            section: 'popup_notice_about_redeem_time'
                        }}
                        onTimeOut={this._onTimeOutCountDown}
                        onSubmitPress={this._onSubmitCountDownPress}/>
                }

                {
                    !!this.state.showLocationRequestPopup &&
                    <RequestLocationPopup
                        situation={{
                            screen_name: this.props.screen,
                            section: 'popup_request_location_services'
                        }}
                        onOpenPress={this._onOpenLocationSettings}
                        onClosePress={this._onCloseOpenLocation}/>
                }

                {
                    !!this.state.isLoading &&
                    <LoadingViewPopup
                        style={{zIndex: 99}}
                        visible={this.state.isLoading}
                        situation={{
                            screen_name: this.props.screen,
                            section: 'popup_loading'
                        }}/>
                }

                <Alert ref={'alert'}/>

            </View>
        )
    }

    _hideAll = () => {
        this.setState({
            showLocationRequestPopup: false,
            showCountdownPopup: false,
            isLoading: false,
            processing: false
        })
    }

    _onGetLocationPress = () => {
        console.debug('_onGetLocationPress');

        this.setState({
            isLoading: true,
            processing: true
        }, () => {
            this.locationManager.requestLocation(
                location => {
                    console.debug('_onGetLocationPress:requestLocation: ', location);
                    this._fetchRedeem(location);
                },
                this._onErrorLocation
            )
        });
    }

    _onErrorLocation = error => {
        console.debug('RedeemByLocation:_onErrorLocation: ', error)
        if (!this.mounted) return;
        this._onErrorGetLocationHandle(error);
    }

    _onOpenLocationSettings = () => {
        console.debug('RedeemByLocation:_onOpenLocationSettings:', this.state);
        AnalyticsHelper.trackItemListInteraction(
            {
                screen_name: this.props.screen,
                section: 'popup_request_location_services'
            },
            'button_open_location_services_click',
            'open_location_settings',
            this.itemIds.item_id,
            this.itemIds.item_brand,
            this.itemIds.item_category,
            this.itemIds.item_name
        );
        this.setState({
            showLocationRequestPopup: false,
            isLoading: true,
            processing: true
        });
        this.requestBySettingsTimeout = setTimeout(this._requestLocationBySettings, 500);
        // this._requestLocationBySettings();
    }

    _onRequestLocationBySettingsError = error => {
        console.debug('RedeemByLocation:_onRequestLocationBySettingsError: ', error);
        if (!this.mounted) return;
        this._onErrorGetLocationHandle(error);
    }

    _onErrorGetLocationHandle = error => {
        if (!this.mounted) return;
        if (!!error && (error.code === 401 || error.code === 403)) {
            AnalyticsHelper.trackItemResult(
                {
                    screen_name: this.props.screen,
                    section: 'redeem_by_location'
                },
                'permission_do_not_grant',
                this.itemIds.item_id,
                this.itemIds.item_brand,
                this.itemIds.item_category,
                this.itemIds.item_name
            );
            this.locationRequestError = error.code;
            this.setState({
                isLoading: false,
                showLocationRequestPopup: true
            })
        }
        else if (!!this.refs && !!this.refs.alert){
            this.refs.alert.show(
                'Thông báo',
                'Rất tiếc, hệ thống chưa thể xác định được vị trí của bạn, bạn có muốn thử lại?',
                [
                    {
                        title: 'Không',
                        onPress: () => {
                            AnalyticsHelper.trackItemListInteraction(
                                {
                                    screen_name: this.props.screen,
                                    section: 'alert_cannot_get_location'
                                },
                                'button_do_not_try_click',
                                'close_alert',
                                this.itemIds.item_id,
                                this.itemIds.item_brand,
                                this.itemIds.item_category,
                                this.itemIds.item_name
                            );
                            this._hideAll();
                        }
                    },
                    {
                        title: 'Thử lại',
                        isHighlight: true,
                        onPress: () => {
                            AnalyticsHelper.trackItemListInteraction(
                                {
                                    screen_name: this.props.screen,
                                    section: 'alert_cannot_get_location'
                                },
                                'button_try_again_click',
                                'redeem_again',
                                this.itemIds.item_id,
                                this.itemIds.item_brand,
                                this.itemIds.item_category,
                                this.itemIds.item_name
                            );
                            this._onGetLocationPress();
                        }
                    }
                ]
            )
        }
    }

    _requestLocationBySettings = () => {
        this.requestBySettingsTimeout = undefined;
        console.debug('RedeemByLocation:_requestLocationBySettings: ', this.locationRequestError, this.state);
        if (this.locationRequestError === 401) {
            this.locationRequestError = undefined;
            this.locationManager.requestBySettings(
                location => {
                    console.debug('requestBySettings: ', location);
                    this._fetchRedeem(location);
                },
                this._onRequestLocationBySettingsError
            )
            return;
        }
        if (this.locationRequestError === 403) {
            this.locationRequestError = undefined;
            this.locationManager.requestByPermission(
                location => {
                    console.debug('requestByPermission: ', location);
                    this._fetchRedeem(location);
                },
                this._onRequestLocationBySettingsError
            )
        }
    }

    _onCloseOpenLocation = () => {
        console.debug('_onCloseOpenLocation');
        AnalyticsHelper.trackItemListInteraction(
            {
                screen_name: this.props.screen,
                section: 'popup_request_location_services'
            },
            'backdrop_popup_location_services_click',
            'close_popup_request_location_services',
            this.itemIds.item_id,
            this.itemIds.item_brand,
            this.itemIds.item_category,
            this.itemIds.item_name
        );

        this.setState({
            showLocationRequestPopup: false,
            showCountdownPopup: false,
            isLoading: false,
            processing: false
        })
    }

    _canRedeem = (start_redeem_time) => {
        if (moment.utc(start_redeem_time).local().isSameOrBefore(moment())) return true;
        return false;
    }

    _onTimeOutCountDown = () => {
        AnalyticsHelper.trackItemImpression(
            {
                screen_name: this.props.screen,
                section: 'popup_notice_about_redeem_time'
            },
            'hide_popup_redeem_time_by_over_countdown',
            this.itemIds.item_id,
            this.itemIds.item_brand,
            this.itemIds.item_category,
            this.itemIds.item_name
        );
        this._hideAll();
    }

    _onSubmitCountDownPress = () => {
        AnalyticsHelper.trackItemListInteraction(
            {
                screen_name: this.props.screen,
                section: 'popup_notice_about_redeem_time'
            },
            'button_submit_click',
            'close_popup',
            this.itemIds.item_id,
            this.itemIds.item_brand,
            this.itemIds.item_category,
            this.itemIds.item_name
        );
        this._hideAll();
    }

    _getLocationManager = () => {
        if (!this.locationManager) this.locationManager = new LocationManager();
        return this.locationManager;
    }


    /**
     * request redeem info to server
     * @private
     */

    _fetchRedeem = location => {
        if (!this.mounted) return;
        this.userLocation = location;

        if (!this.coupon) return;

        this.redeemTask = from(
            couponApi.redeemCoupon({
                action: 'accept_redeem',
                coupon_id: this.coupon.get('id'),
                slot: this.coupon.get('slot_count', 0),
                lat: location.latitude,
                lon: location.longitude
            })
        );

        this.redeemTask = this.redeemTask.subscribe(this._fetchRedeemSuccess, this._fetchRedeemFailure, this._fetchRedeemCompleted);
    }

    _fetchRedeemSuccess = response => {
        console.log('_fetchRedeemFailure:response', response);
        if (!this.mounted) return;

        this.coupon = this.coupon.updateIn(['deal', 'code_status'], () => response.coupon_status);
        dispatch(couponChangeAction(this.coupon.getIn(['deal', 'id'], ''), ObjectUtil.createBaseCouponFromDeal(this.coupon.get('deal'))));

        AnalyticsHelper.trackItemResult(
            {
                screen_name: this.props.screen,
                section: 'redeem_by_location'
            },
            'redeem_success',
            this.itemIds.item_id,
            this.itemIds.item_brand,
            this.itemIds.item_category,
            this.itemIds.item_name
        );

        NavigationUtils.replaceWith(this.props.navigation, 1, 'LastMinReservationInfo', {
            couponId: this.coupon.get('id')
        });
    }

    _fetchRedeemFailure = error => {
        console.log('_fetchRedeemFailure:error', error);
        if (!this.mounted) return;

        if (CommonUtil.isNetworkConnectionError(error)) {
            AnalyticsHelper.trackItemResult(
                {
                    screen_name: this.props.screen,
                    section: 'redeem_by_location'
                },
                'redeem_failure_by_network_connection',
                this.itemIds.item_id,
                this.itemIds.item_brand,
                this.itemIds.item_category,
                this.itemIds.item_name
            );

            this.setState({
                showLocationRequestPopup: false,
                showCountdownPopup: false,
                isLoading: false
            }, () => {
                !!this.refs.alert && this.refs.alert.show(
                    'Thông báo',
                    getErrorMessage(error),
                    [
                        {
                            title: 'Để sau',
                            color: '#454545',
                            onPress: () => {
                                AnalyticsHelper.trackItemListInteraction(
                                    {
                                        screen_name: this.props.screen,
                                        section: 'alert_redeem_failure_network_connection'
                                    },
                                    'button_for_later_click',
                                    'close_alert',
                                    this.itemIds.item_id,
                                    this.itemIds.item_brand,
                                    this.itemIds.item_category,
                                    this.itemIds.item_name
                                );
                                this._hideAll();
                            }
                        },
                        {
                            title: 'Thử lại',
                            isHighlight: true,
                            onPress: () => {
                                AnalyticsHelper.trackItemListInteraction(
                                    {
                                        screen_name: this.props.screen,
                                        section: 'alert_redeem_failure_network_connection'
                                    },
                                    'button_try_again_click',
                                    'redeem_again',
                                    this.itemIds.item_id,
                                    this.itemIds.item_brand,
                                    this.itemIds.item_category,
                                    this.itemIds.item_name
                                );
                                this._onGetLocationPress();
                            }
                        }
                    ]
                )
            });
            return;
        }

        if (ObjectUtil.getValue(error, '', ['error']).indexOf('#RD021') >= 0) {
            AnalyticsHelper.trackItemResult(
                {
                    screen_name: this.props.screen,
                    section: 'redeem_by_location'
                },
                'redeem_failure_by_out_of_coordinate',
                this.itemIds.item_id,
                this.itemIds.item_brand,
                this.itemIds.item_category,
                this.itemIds.item_name
            );

            this.setState({
                showLocationRequestPopup: false,
                showCountdownPopup: false,
                isLoading: false,
                processing: false
            }, () => {
                this.props.navigation.navigate(
                    'OutOfLocationZone',
                    {
                        storeLocation: {
                            lat: this.coupon.getIn(['store', 'latitude'], 0),
                            lon: this.coupon.getIn(['store', 'longitude'], 0)
                        },
                        userLocation: {
                            lat: this.userLocation.latitude,
                            lon: this.userLocation.longitude
                        }
                    });
            })
            return;
        }

        AnalyticsHelper.trackItemResult(
            {
                screen_name: this.props.screen,
                section: 'redeem_by_location'
            },
            'redeem_failure_by_other_way',
            this.itemIds.item_id,
            this.itemIds.item_brand,
            this.itemIds.item_category,
            this.itemIds.item_name
        );

        this.setState({
            showLocationRequestPopup: false,
            showCountdownPopup: false,
            isLoading: false
        }, () => {
            !!this.refs.alert && this.refs.alert.show(
                'Thông báo',
                getErrorMessage(error),
                [
                    {
                        title: 'Đóng',
                        onPress: () => {
                            AnalyticsHelper.trackItemListInteraction(
                                {
                                    screen_name: this.props.screen,
                                    section: 'alert_redeem_failure_by_other_way'
                                },
                                'button_close_click',
                                'close_alert',
                                this.itemIds.item_id,
                                this.itemIds.item_brand,
                                this.itemIds.item_category,
                                this.itemIds.item_name
                            );
                            this._hideAll();
                        }
                    }
                ]
            )
        })
    }

    _fetchRedeemCompleted = () => {
        try {
            !!this.redeemTask && this.redeemTask.unsubscribe();
            this.setState({
                processing: false
            })
        }
        catch (e) {
            console.log(e);
        }
        this.redeemTask = undefined;
    }

    /**
     * End of request to server
     */

    redeem(coupon) {
        console.debug('RedeemByLocation:redeem: ', coupon);
        if (!coupon || !this.mounted) return;
        this.coupon = coupon;
        this.itemIds = {
            item_id: coupon.getIn(['deal', 'slug']),
            item_brand: coupon.getIn(['deal', 'brand', 'brand_slug']),
            item_category: coupon.getIn(['deal', 'deal_type']),
            item_name: coupon.getIn(['deal', 'title'])
        };

        if (!this._canRedeem(coupon.get('start_redeem_time'))) {
            this.start_redeem_time = coupon.get('start_redeem_time');
            this.start_countdown_time = coupon.get('start_countdown_time');

            this.setState({
                showCountdownPopup: true,
                processing: true
            });
            return;
        }

        this.setState({
            isLoading: true,
            processing: true
        }, () => {
            if (!!this._getLocationManager()) {
                this._getLocationManager().requestLocation(
                    location => {
                        console.debug('redeem:requestLocation: ', location);
                        this._fetchRedeem(location);
                    },
                    this._onErrorLocation
                )
            }
        });
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        !!this.locationManager && this.locationManager.stop();
        !!this.requestBySettingsTimeout && clearTimeout(this.this.requestBySettingsTimeout);
        super.componentWillUnmount();
    }
}

RedeemByLocation.propTypes = {
    coupon: PropTypes.object,
    screen: PropTypes.string,
    navigation: PropTypes.object
}