import React from 'react';
import {
    View, TouchableOpacity, Dimensions, BackHandler, StatusBar, Animated, Easing,
} from 'react-native';
import { Text } from 'native-base';
import FastImage from 'react-native-fast-image'
import {connect} from "react-redux";
import moment from 'moment/min/moment-with-locales';

import {STATUS_MERCHANT_ACCEPTED, STATUS_MERCHANT_REJECT, STATUS_WAIT_FOR_MERCHANT} from '../../../const';
import {
    DIMENSION_BUTTON_SMALL, DIMENSION_PADDING_EXTRA, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER
} from "../../../resources/dimens";
import {COLOR_TEXT_INACTIVE, COLOR_TEXT_INACTIVE_DISABLE} from "../../../resources/colors";

import {couponApi} from '../../../api/coupon-api'
import {couponChangeAction} from './action'
import {BasePureComponent} from "../../common/BasePureComponent";
import {AnalyticsUtil} from '../../common/analytics/analytics'
import {Alert} from '../../common/alert/JJAlert'
import {ObjectUtil} from '../../../utils/object-utils'
import {CouponDb} from '../../../api/storage/CouponDb'
import {NavigationUtils} from '../../../router/navigation-utils';

const { width } = Dimensions.get('window');
moment.locale('vi');

class BookingCountDown extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    rotateAnimate;
    rotateAnimation;

    constructor(props) {
        super(props);
        this.state = {
            second: 60,
        }
        this.rotateAnimate = new Animated.Value(0);
        this.rotateAnimation = this.rotateAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle="light-content"
                />
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}>

                    <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                        <FastImage
                            style={{ width: '100%', height: '100%' }}
                            source={require('../../../resources/images/deal/bg_contacting.png')}
                            resizeMode={FastImage.resizeMode.cover}/>
                    </View>

                    <View style={{
                        width: width / 3,
                        height: width / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: DIMENSION_PADDING_SMALL,
                    }}>

                        <Animated.Image
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                                transform: [
                                    {
                                        rotate: this.rotateAnimation
                                    }
                                ]
                            }}
                            source={require('../../../resources/images/deal/icon_ring_contacting.png')} />

                        <View style={{
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}>
                            <Text style={{
                                fontSize: 50,
                                color: 'white',
                                fontWeight: this.state.second === 0 ? 'normal' : 'bold',
                                textAlign: 'center'
                            }}>
                                {this.state.second === 0 ? 'T .T' : this.state.second}
                            </Text>
                        </View>

                    </View>

                    <Text style={{
                        fontSize: DIMENSION_TEXT_HEADER,
                        color: COLOR_TEXT_INACTIVE_DISABLE,
                        backgroundColor: 'transparent',
                        marginTop: DIMENSION_PADDING_MEDIUM,
                        marginBottom: DIMENSION_PADDING_SMALL,
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        marginRight: DIMENSION_PADDING_MEDIUM
                    }}>
                        {this.state.second === 0 ? 'Yêu cầu đang được xử lý...' : 'Đang liên hệ với cửa hàng...'}
                    </Text>

                    <Text style={{
                        color: COLOR_TEXT_INACTIVE,
                        backgroundColor: 'transparent',
                        textAlign: 'center',
                        marginLeft: DIMENSION_PADDING_SMALL,
                        marginRight: DIMENSION_PADDING_SMALL,
                        fontSize: DIMENSION_TEXT_CONTENT
                    }}>
                        {this.state.second === 0 ? '' : 'Quá trình có thể mất khoảng 1 phút,\nvui lòng chờ trong giây lát...'}
                    </Text>

                    {
                        this.state.second === 0 &&
                        <TouchableOpacity style={{
                            height: DIMENSION_BUTTON_SMALL,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: DIMENSION_PADDING_MEDIUM,
                            paddingRight: DIMENSION_PADDING_MEDIUM,
                            marginTop: DIMENSION_PADDING_EXTRA,
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            borderWidth: 1,
                            borderColor: COLOR_TEXT_INACTIVE
                        }}
                                          onPress={() => this.props.navigation.pop(2)}>
                            <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT}}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    }

                </View>
            </View>
        )
    }

    _handlePressBack = () => {
        this.props.navigation.pop(2);
        return true;
    }

    _startRotate = () => {
        if (this.state.second <= 0) return;
        this.rotateAnimate.setValue(0);
        Animated.timing(
            this.rotateAnimate,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => this._startRotate())
    }

    _countDown = () => {
        if (this.state.second > 0) {
            this.setState({
                ...this.state,
                second: this.state.second - 1,
            })
        } else {
            this._stopInterval();
            clearInterval(this.interval);
        }
    }

    _checkCouponStatus = () => {
        const {coupon} = this.props.navigation.state.params;
        couponApi.checkCouponStatus(coupon.get('id', ''))
            .then(response => {
                console.log('checkCouponStatus:success', response)
                this._onCheckCouponComplete(response)
            })
            .catch(error => {
                console.log('checkCouponStatus:error', error)
                this._onCheckCouponFailure(error)
            })
    }

    _onCheckCouponComplete = (response) => {
        if (!response.status || response.status === STATUS_WAIT_FOR_MERCHANT) return;

        if (response.status === STATUS_MERCHANT_ACCEPTED) {
            this._onGetCouponSuccess(response);
            return;
        }

        if (response.status === STATUS_MERCHANT_REJECT) {
            this._stopInterval();
            let {deal, coupon} = this.props.navigation.state.params;
            coupon = coupon.updateIn(['status'], () => response.status);
            this.props.dispatch(couponChangeAction(coupon.getIn(['deal', 'id'], ''), coupon));

            const booking = {
                coupon_id: coupon.get('id', ''),
                slot: ObjectUtil.getValue(response, response.slot, ['slot_count']),
                avg_billing_value: deal.get('avg_billing_value', 0)
            };

            AnalyticsUtil.logBookingComplete(
                deal.getIn(['brand', 'brand_slug'], ''),
                deal.getIn(['slug'], ''),
                deal.getIn(['deal_type'], ''),
                booking,
                -1
            );

            Alert.alert(
                "Thông báo",
                `Yêu cầu đặt bàn của bạn đã bị từ chối với lý do: ${response.reject_reason}`,
                [
                    {
                        text: 'ĐÓNG', onPress: () => {
                            this.props.navigation.pop(2)
                        }
                    }
                ],
                { cancelable: false }
            )
        }
    }

    _onGetCouponSuccess = (response) => {
        this._stopInterval();
        let { deal, coupon} = this.props.navigation.state.params;
        deal = deal.updateIn(['code_status'], () => response.status);
        coupon = coupon.updateIn(['status'], () => response.status);

        this.props.dispatch(couponChangeAction(coupon.getIn(['deal', 'id'], ''), coupon));
        CouponDb.add(coupon.toJS());

        const booking = {
            coupon_id: coupon.get('id', ''),
            slot: ObjectUtil.getValue(response, response.slot, ['slot_count']),
            avg_billing_value: deal.get('avg_billing_value', 0)
        }

        AnalyticsUtil.logBookingComplete(
            deal.getIn(['brand', 'brand_slug'], ''),
            deal.getIn(['slug'], ''),
            deal.getIn(['deal_type'], ''),
            booking,
            1
        );

        AnalyticsUtil.purchase(
            deal.getIn(['title'], ''),
            deal.getIn(['slug'], ''),
            deal.getIn(['brand', 'brand_slug'], ''),
            deal.getIn(['cat1'], ''),
            deal.getIn(['cat2'], ''),
            deal.getIn(['deal_type'], ''),
            booking.avg_billing_value,
            booking.slot * booking.avg_billing_value,
            booking.slot,
            moment.unix(coupon.get('check_in_time', 0)).local().toDate(),
            coupon.get('id', ''),
            coupon.getIn(['promocode', 'code_name'], '')
        );

        //Goto BookingSuccess screen
        NavigationUtils.replaceWith(
            this.props.navigation,
            2,
            !!coupon.getIn(['deal', 'is_display_as_alias']) ? "AliasBookingSuccess" : "BookingSuccess",
            {
                coupon: coupon,
                deal: deal
            });
    }

    _onCheckCouponFailure = (error) => {
        console.log('_onBookingFailure:error:', error);
        // let message = 'Có lỗi xảy ra. Vui lòng thử lại sau!';
        // if (typeof error === 'string') {
        //     message = error;
        // } else if (typeof error === 'object') {
        //     if (error.error_message) message = error.error_message
        //     else if (error.error) message = error.error
        // }
        // Alert.alert("Lỗi", message);
    }

    _stopInterval = () => {
        clearInterval(this.countDownInterval);
        clearInterval(this.checkCouponStatusInterval);
        clearTimeout(this.threadToStartCheckCoupon);
    }

    componentDidMount() {
        super.componentDidMount();

        let {deal, coupon} = this.props.navigation.state.params;
        AnalyticsUtil.logCurrentScreen(
            'booking_contact_merchant',
            {
                item_id: deal.getIn(['slug'], ''),
                item_name: deal.getIn(['slug'], ''),
                item_brand: deal.getIn(['brand', 'brand_slug'], ''),
                deal_type: deal.getIn(['deal_type'], ''),
                coupon: coupon.get('id', '')
            }
        );

        BackHandler.addEventListener('hardwareBackPress', this._handlePressBack);
        this.countDownInterval = setInterval(this._countDown, 1000);

        this.threadToStartCheckCoupon = setTimeout(() => {
            this.checkCouponStatusInterval = setInterval(this._checkCouponStatus, 5000);
        }, 15000);
        this._startRotate();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handlePressBack);
        this._stopInterval()
        super.componentWillUnmount();
    }
}

export default connect()(BookingCountDown);