import React from 'react';
import {
    View,
    Platform,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Linking,
    StyleSheet,
    ScrollView,
    BackHandler
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import { fromJS } from 'immutable';
import {from} from 'rxjs';

import {
    COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1,
    COLOR_ORANGE,
    COLOR_TEXT_GRAY,
    COLOR_GREEN,
    COLOR_GRAY_BG_2,
    COLOR_TEXT_INACTIVE
} from '../../resources/colors';
import { DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_HEADER, DIMENSION_RADIUS_LARGE } from '../../resources/dimens';
import callButton from '../../resources/images/callButton.png';
import JJHeader from '../../components/common/JJHeader';
import JJIcon from '../../common/view/icon/JJIcon';
import JamjaStatus from './JamjaStatus';
import DeliveryStatus from './DeliveryStatus';
import DeliveryDetail from './DeliveryDetail';
import { bookingApi } from '../../api/booking-api';
import HotlineBottom from './HotlineBottom';
import HoldingStatus from './HoldingStatus';
import { Toast } from '../../components/common/alert/Toast';
import { ObjectUtil } from '../../utils/object-utils';
import { NotificationSubject } from '../../common/subject/notification-subject';
import { ERROR_NORMAL, getErrorMessage } from '../../utils/text-message';
import Text from '../../common/view/text/JJText';
import {BaseComponent} from "../../common/base/BaseComponent";
import moment from 'moment/min/moment-with-locales';
import {AppConfig} from '../../common/config';
import {CommonUtil} from '../../utils/common-utils';
import Alert from '../../common/view/alert/Alert';
import type {ServiceInteractionModel} from "../../model/data/ServiceInteractionModel";
import {AnalyticsUtil} from "../../components/common/analytics/analytics";
import {StringUtil} from '../../utils/string-util';

export default class DeliveryStatusScreen extends BaseComponent {

    SCREEN = 'DeliveryStatusScreen';

    constructor(props) {
        super(props);
        this.shipping_order_id = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'shipping_order_id']);
        const order = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'shippingorder']);
        let visibleHolding = false;
        if (!!order) {
            props.navigation.state.params.shipping_order_id = order.get('id');
            this.shipping_order_id = order.get('id');
            visibleHolding = !!order.get('broadcast_time') && (moment().add(1, 'seconds')).isBefore(moment.utc(order.get('broadcast_time')))
        }
        this.state = {
            refreshing: false,
            isCanceling: false,
            visibleHolding,
            data: fromJS({
                order
            })
        };
    }

    render() {
        const { data, refreshing, isCanceling } = this.state;

        const orderStatus = data.getIn(['order', 'status']);
        return (
            <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={false}
                    customTitleView={this._renderHeader}
                    overrideGoBack={true}
                    onGoBackAction={this.goBack}
                    leftIconColor={COLOR_TEXT_INACTIVE}
                />

                {
                    !!this.state.visibleHolding &&
                    <HoldingStatus
                        openModalDetail={this._openModalDetail}
                        date={this.state.data.getIn(['order', 'broadcast_time'])}
                        refreshTimeOutHolding={this._onRefresh}
                    />
                }

                {
                    (orderStatus !== 'holding') &&
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />}>
                        {this._renderStatusDetail()}
                    </ScrollView>
                }

                <View style={{ 
                        padding: 16,
                        backgroundColor: orderStatus === 'holding' ? '#fff' : '#fafafa'
                    }}>
                    {
                        (orderStatus === 'assigning' ||
                        orderStatus === 'accepted' ||
                        orderStatus === 'holding') &&
                        <TouchableOpacity
                            onPress={this._onCancelOrder}
                            style={styles.cancelButton}
                            disabled={isCanceling}
                            activeOpacity={0.8}>
                            {
                                isCanceling ?
                                    <ActivityIndicator size="large" color= {COLOR_PRIMARY}/>
                                :
                                    <Text style={{ color: COLOR_ORANGE, fontSize: 16, fontWeight: 'bold' }}>
                                        HUỶ MUA HỘ
                                    </Text>
                            }
                        </TouchableOpacity>
                    }
                    <HotlineBottom />
                </View>
                <ModalBox
                    style={{
                        height: '90%',
                        borderTopLeftRadius: DIMENSION_RADIUS_LARGE,
                        borderTopRightRadius: DIMENSION_RADIUS_LARGE
                    }}
                    position={'bottom'}
                    ref={'detailModal'}
                    swipeArea={50}
                    backButtonClose={true}
                    backdropPressToClose={false}
                    backdropContent={
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            activeOpacity={0.9}
                            onPress={() => this.refs.detailModal.close()}
                        />
                    }>
                    {
                        !!data.get('order') &&
                        <DeliveryDetail
                            slotUnit={CommonUtil.dealSlotUnit(data.getIn(['order', 'coupon', 'deal', 'hint_text'], ''))}
                            storeAddress={data.getIn(['order', 'coupon', 'store', 'address'], '')}
                            shippingAddress={data.getIn(['order', 'receiving_info', 'address'], '')}
                            shippingAddressNote={data.getIn(['order', 'receiving_info', 'address_note'], '')}
                            userName={data.getIn(['order', 'receiving_info', 'user_name'], '')}
                            userPhone={data.getIn(['order', 'receiving_info', 'phone_number'], '')}
                            couponHighlight={data.getIn(['order', 'coupon', 'coupon_highlight'], '')}
                            originalPrice={data.getIn(['order', 'original_cod'], 0)}
                            discountPrice={data.getIn(['order', 'original_cod'], 0) - data.getIn(['order', 'cod'], 0)}
                            deliverPromoCode={data.getIn(['order', 'shipping_promocode', 'code_name'])}
                            deliveryDiscountPrice={data.getIn(['order', 'original_price'], 0) - data.getIn(['order', 'total_price'], 0)}
                            deliveryPrice={data.getIn(['order', 'original_price'], 0)}
                            finalPrice={data.getIn(['order', 'total_price'], 0) + data.getIn(['order', 'cod'], 0)}
                            products={data.getIn(['order', 'products'])}
                            close={() => this.refs.detailModal.close()}
                        />
                    }
                </ModalBox>

                <Alert ref={'alert'}/>
            </View>
        );
    }

    _renderHeader = () => {
        return (
            <View>
                <Text style={styles.subHeaderText}>
                    {this.state.data.getIn(['order', 'coupon', 'deal', 'brand_name'], '')}
                </Text>
                <Text style={styles.headerText}>TÌNH TRẠNG MUA HỘ</Text>
            </View>
        );
    };

    _openModalDetail = () => {
        this._trackInDeliveryStatus('open_order_detail');
        this.refs.detailModal.open()
    }

    _renderStatusDetail = () => {
        const { data } = this.state;
        if (!data.get('order')) return null;

        return (
            <View>
                <JamjaStatus
                    onReBroadCast={this._onReBroadCast}
                    status={data.getIn(['order', 'status'])}
                    auto_cancel_time={data.getIn(['order', 'auto_cancel_time'])}
                    estimate_start_shipping_time={data.getIn(['order', 'estimate_start_shipping_time'])}
                    cancelOrder={this._fetchCancel}
                    refreshTimeOut = {this._onRefresh}
                />
                <View
                    style={{
                        paddingVertical: 24,
                        paddingHorizontal: 16
                    }}
                >
                    <DeliveryStatus
                        title={'Đang xác nhận đơn hàng'}
                        titleAfter={'Đã xác nhận đơn hàng'}
                        status={'done'}
                        timeCheck={data.getIn(['order', 'broadcast_time'])}
                        renderContent={this._renderUserInfo}
                    />
                    <DeliveryStatus
                        titleBefore={'Nhận giao'}
                        title={'Đang tìm người giao'}
                        titleAfter={'Đã nhận giao'}
                        timeCheck={data.getIn(['order', 'accept_time'])}
                        status={this._getStatusAssigning()}
                    />
                    <DeliveryStatus
                        titleBefore={'Đến lấy hàng'}
                        title={'Đang đến lấy hàng'}
                        titleAfter={'Đã lấy hàng'}
                        timeCheck={data.getIn(['order', 'start_shipping_time'])}
                        status={this._getStatusAccepted()}
                        renderContent={this._renderContentStep3}
                    />
                    <DeliveryStatus
                        titleBefore={'Giao hàng thành công'}
                        title={'Đang giao hàng'}
                        timeCheck={data.getIn(['order', 'complete_time'])}
                        titleAfter={'Giao hàng thành công'}
                        status={this._getStatusShipping()}
                        renderContent={this._renderContentStep4}
                        last
                    />
                </View>
            </View>
        );
    };

    _renderContentStep3 = () => {
        const { data } = this.state
        if(data.getIn(['order', 'status']) ==='accepted') {
            return this._renderShipperInfo()
        }
    }

    _renderContentStep4 = () => {
        const { data } = this.state
        if(data.getIn(['order', 'status']) === 'shipping' || data.getIn(['order', 'status']) === 'completed') {
            return this._renderShipperInfo()
        }
    }

    _renderUserInfo = onLayout => {
        const { data } = this.state;
        if (!data.get('order')) return null;
        return (
            <TouchableOpacity style={styles.infoStyle} activeOpacity={0.8} onLayout={onLayout} onPress={() => this.refs.detailModal.open()}>
                <Text style={{ fontWeight: '700' }}>
                    {data.getIn(['order', 'receiving_info', 'user_name'], '')} - {data.getIn(['order', 'receiving_info', 'phone_number'], '')}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <JJIcon name="map_pin_o" size={14} color={COLOR_GREEN} />
                    <View style={{ marginLeft: 8, flex: 1 }}>
                        <Text style={{ marginBottom: 8, fontSize: 12 }}>Nhờ mua hộ tới:</Text>

                        <Text>{data.getIn(['order', 'receiving_info', 'address'], '')} {!!data.getIn(['order', 'receiving_info', 'address_note'], '') && `- ${data.getIn(['order', 'receiving_info', 'address_note'], '')}`}</Text>

                        <Text style={{marginTop: 5}}>Tổng tiền tạm tính: <Text style={{fontWeight: 'bold'}}>{StringUtil.beautyNumber(data.getIn(['order', 'total_price'], 0) + data.getIn(['order', 'cod'], 0))}đ</Text></Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 8
                            }}
                        >
                            <Text style={{ color: COLOR_PRIMARY, marginRight: 2 }}>Xem thêm</Text>
                            <JJIcon name="chevron_right_o" size={8} color={COLOR_PRIMARY} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    _renderShipperInfo = onLayout => {
        const { data } = this.state;
        if (!data.getIn(['order', 'shipper_info'])) return null;
        return (
            <View
                onLayout={onLayout}
                style={[
                    styles.infoStyle,
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%'
                    }
                ]}
            >
                <View>
                    <Text style={{ fontSize: 12, marginBottom: 4 }}>Người mua hộ</Text>
                    <Text style={{ fontWeight: '700', marginBottom: 8 }}>{data.getIn(['order', 'shipper_info', 'name'], '')}</Text>
                    <Text style={{ fontWeight: '700' }}>{data.getIn(['order', 'shipper_info', 'phone_number'], '')}</Text>
                </View>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${data.getIn(['order', 'shipper_info', 'phone_number'], '')}`)}>
                    <Image style={{ width: 40, height: 40 }} source={callButton} />
                </TouchableOpacity>
            </View>
        );
    };

    _getStatusAssigning = () => {
        if (!this.state.data.get('order')) return '';
        const status = this.state.data.getIn(['order', 'status']);
        if (status === 'auto_cancel') {
            return 'undone';
        }
        if (status === 'assigning') {
            return 'inprogress';
        } else {
            return 'done';
        }
    };

    _getStatusAccepted = () => {
        if (!this.state.data.get('order')) return '';

        const status = this.state.data.getIn(['order', 'status']);
        if (status === 'accepted') {
            return 'inprogress';
        }
        if (status === 'shipping' || status === 'completed') {
            return 'done';
        } else {
            return 'undone';
        }
    };

    _getStatusShipping = () => {
        if (!this.state.data.get('order')) return '';
        const status = this.state.data.getIn(['order', 'status']);
        if (status === 'shipping') {
            return 'inprogress';
        }
        if (status === 'completed') {
            return 'done';
        } else {
            return 'undone';
        }
    };

    _onCancelOrder = () => {
        if (!!this.state.isCanceling) return;
        this.refs.alert.show(
            'XÁC NHẬN',
            'Bạn chắc chắn muốn huỷ mua hộ?',
            [
                {
                    title: 'Không',
                    onPress: () => {
                        if (!this.mounted) return;
                    }
                },
                {
                    title: 'Đồng ý',
                    isHighlight: true,
                    onPress: () => {
                        if (!this.mounted) return;
                        this.setState({
                            isCanceling: true
                        }, this._fetchCancel);
                    }
                }
            ]
        )

    };

    _onReBroadCast = () => {
        this.setState({
            refreshing: true
        }, this._fetchReBroadCast);
    };

    /**
     *  Data repository
     */
    _onRefresh = () => {
        if (!!this.state.refreshing) return;
        this.setState({
           refreshing: true
        }, this._fetchOrderDetail);
    }

    _fetchOrderDetailSuccess = response => {
        if (!this.mounted) return;
        console.debug('_fetchOrderDetailSuccess:response:', response);
        const order = fromJS(response);
        const status = order.get('status');
        this.shipping_order_id = order.get('id');
        let showAlert = false;
        if (!this.state.isCanceling) {
            if (status === 'user_cancel')
            {
                showAlert = true;
                this.refs.alert.show(
                    undefined,
                    'Bạn đã huỷ đơn mua hộ này!',
                    [
                        {
                            title: 'OK',
                            isHighlight: true,
                            onPress: () => {
                                if (!this.mounted) return;
                                this.goBack();
                            }
                        }
                    ]
                );

                NotificationSubject.dispatch(
                    'cancel_delivery_order',
                    {
                        shipping_order_id: this.shipping_order_id
                    });

            }
            else if (status === 'auto_cancel')
            {
                showAlert = true;
                this.refs.alert.show(
                    undefined,
                    'Chưa có người nhận đơn mua hộ. Bạn muốn thử tìm lại không?',
                    [
                        {
                            title: 'Huỷ đơn',
                            onPress: () => {
                                if (!this.mounted) return;
                                this._trackInDeliveryStatus('cancel_after_auto_cancel');
                                this.setState({
                                    isCanceling: true
                                }, this._fetchCancel);
                            }
                        },
                        {
                            title: 'OK',
                            isHighlight: true,
                            onPress: () => {
                                if (!this.mounted) return;
                                this._trackInDeliveryStatus('re_broadcast_auto_cancel');
                                this.setState({
                                    refreshing: true
                                }, this._fetchReBroadCast);
                            }
                        }
                    ]
                );
            }
            else if (status === 'partner_cancel' || status === 'shipper_cancel' || status === 'admin_cancel')
            {
                showAlert = true;
                this.refs.alert.show(
                    undefined,
                    'Shipper đã huỷ đơn mua hộ. Bạn muốn thử tìm lại không?',
                    [
                        {
                            title: 'Huỷ đơn',
                            onPress: () => {
                                if (!this.mounted) return;
                                this._trackInDeliveryStatus('cancel_after_partner_cancel');
                                this.setState({
                                    isCanceling: true
                                }, this._fetchCancel);
                            }
                        },
                        {
                            title: 'OK',
                            isHighlight: true,
                            onPress: () => {
                                if (!this.mounted) return;
                                this._trackInDeliveryStatus('re_broadcast_partner_cancel');
                                this.setState({
                                    refreshing: true
                                }, this._fetchReBroadCast);
                            }
                        }
                    ]
                );
            }
        }

        if (!showAlert) {
            this.refs.alert.cancel();
        }

        this.setState({
            refreshing: false,
            visibleHolding: status === 'holding',
            data: this.state.data.updateIn(['order'], () => order)
        });

        NotificationSubject.dispatch(
            'update_delivery_order_status',
            {
                shipping_order_id: order.get('id'),
                coupon_id: order.getIn(['coupon', 'coupon_id']),
                shipping_status: order.get('status'),
                shipping_can_cancel: order.get('status') !== 'shipping' && order.get('status') !== 'completed'
            });
    }

    _fetchOrderDetailError = error => {
        if (!this.mounted || !!this.state.isCanceling) return;
        console.debug('_fetchOrderDetailError:', error);
        this.refs.alert.show(
            undefined,
            getErrorMessage(error, ERROR_NORMAL),
            {
                title: 'OK',
                isHighlight: true,
                onPress: () => {
                    if (!this.mounted) return;
                    this.setState({
                        refreshing: false,
                    })
                }
            }
        )
    }

    _fetchOrderDetailCompleted = () => {
        try {
            if (!this.mounted) return;
            !!this.fetchOrderDetailTask && this.fetchOrderDetailTask.unsubscribe();
        }
        catch (e) {}
        this.fetchOrderDetailTask = undefined;
    }

    _fetchOrderDetail = () => {
        this._fetchOrderDetailCompleted();
        this.fetchOrderDetailTask = from(bookingApi.getShippingOrder(this.shipping_order_id));
        this.fetchOrderDetailTask.subscribe(this._fetchOrderDetailSuccess, this._fetchOrderDetailError, this._fetchOrderDetailCompleted);
    }

    _fetchReBroadCast = () => {
        this._fetchOrderDetailCompleted();
        this.fetchOrderDetailTask = from(bookingApi.rebroadcast(this.shipping_order_id));
        this.fetchOrderDetailTask.subscribe(this._fetchOrderDetailSuccess, this._fetchOrderDetailError, this._fetchOrderDetailCompleted);
    }

    _fetchCancelOrderSuccess = response => {
        if (!this.mounted) return;
        console.debug('_fetchCancelOrderSuccess:', response);
        Toast.showToast('Huỷ đơn hàng thành công!');
        NotificationSubject.dispatch(
            'cancel_delivery_order',
            {
                shipping_order_id: this.shipping_order_id
            });
        
        this.goBack();
    }

    _fetchCancelOrderError = error => {
        if (!this.mounted) return;
        console.debug('_fetchCancelOrderError:', error);

    }

    _fetchCancelCompleted = () => {
        try {
            if (!this.mounted) return;
            !!this.fetchCancelOrderTask && this.fetchCancelOrderTask.unsubscribe();
        }
        catch (e) {}
        this.fetchCancelOrderTask = undefined;
    }

    _fetchCancel = () => {
        this._fetchCancelCompleted();
        this.fetchCancelOrderTask = from(bookingApi.deleteShippingOrder(this.shipping_order_id));
        this.fetchCancelOrderTask.subscribe(this._fetchCancelOrderSuccess, this._fetchCancelOrderError, this._fetchCancelCompleted);
    }
    /**
     * End of data repository
     */

    goBack = () => {
        const from = ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'from']);

        if (from === 'reservation_order') {
            // this.props.navigation.pop(4);
            this.props.navigation.goBack();
            return;
        }
        if (from === 'booking_order') {
            this.props.navigation.pop(2);
            return;
        }

        this.props.navigation.goBack();
    };

    _onNotificationCallback = event => {
        const shipping_order_id = this.state.data.getIn(['order', 'id']);
        if (
            ObjectUtil.getValue(event, undefined, ['action']) === 'receive_notification' &&
            ObjectUtil.getValue(event, undefined, ['data', 'shipping_order_id']) === shipping_order_id
        ) {
            this._onRefresh();
        }
    };

    _onActionInDeliveryStatus = (action) => {
        if (action === 'refresh') {
            this._onRefresh();
        }
    }

    _onBackPressListener = () => {
        this.goBack();
        return true;
    }

    _trackInDeliveryStatus = (action) => {
        if (!this.state.data || !this.state.data.get('order')) return;
        let params: ServiceInteractionModel = {};
        params.screen_name = this.SCREEN;
        params.item_id = this.state.data.getIn(['order', 'coupon', 'deal', 'slug'], '');
        params.item_brand = this.state.data.getIn(['order', 'coupon', 'deal', 'brand_slug'], '');
        params.item_category = this.state.data.getIn(['order', 'coupon', 'deal', 'deal_type'], '');
        params.interaction_type = action;
        params.interaction_value = this.shipping_order_id;
        params.coupon_id = this.state.data.getIn(['order', 'coupon', 'coupon_id'], '');

        AnalyticsUtil.trackDeliveryServiceInteraction(params);
    }

    componentDidMount() {
        super.componentDidMount();
        if ((!this.state.data.get('order') && !!this.shipping_order_id) || (!!this.state.data.get('order') && !this.state.visibleHolding)) {
            this._onRefresh();
        }
        this.notificationSubscription = NotificationSubject.subscribe(this._onNotificationCallback);
        this.props.navigation.state.params.shipping_order_id = this.shipping_order_id;
        this.props.navigation.state.params.onAction = this._onActionInDeliveryStatus;

        try {
            if (!AppConfig.ios) {
                this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload => {
                    BackHandler.addEventListener('hardwareBackPress', this._onBackPressListener);
                });
                this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
                    BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener)
                });
            }
        } catch (e) {
            console.debug(e);
        }
    };

    componentWillUnmount() {
        !!this.notificationSubscription && this.notificationSubscription.unsubscribe();
        !AppConfig.ios && BackHandler.removeEventListener('hardwareBackPress', this._onBackPressListener);
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
        this._fetchOrderDetailCompleted();
        this._fetchCancelCompleted();
        !!this.refs.alert && this.refs.alert.cancel();
        super.componentWillUnmount();
    }
}

const styles = StyleSheet.create({
    headerText: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_HEADER,
        marginBottom: Platform.OS === 'ios' ? 4 : 0,
        fontWeight: 'bold'
    },
    subHeaderText: {
        color: COLOR_TEXT_GRAY,
        fontSize: 14,
        marginBottom: Platform.OS === 'ios' ? 4 : 0,
        textAlign: 'center'
    },
    infoStyle: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        backgroundColor: COLOR_GRAY_BG_2,
        padding: 12,
        paddingRight: 15,
        marginLeft: 13,
        marginTop: 8,
        marginBottom: 16,
        width: '100%'
    },
    cancelButton: {
        backgroundColor: '#ffffff',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: COLOR_ORANGE
    }
});
