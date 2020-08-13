import React from 'react';
import {View, ScrollView} from 'react-native';
import {fromJS, Map} from 'immutable';
import {from} from 'rxjs';

import {BaseComponent} from "../../common/base/BaseComponent";
import ScreenTitleHeader from "../../common/view/header/ScreenTitleHeader";
import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import Text from '../../common/view/text/JJText';
import {ObjectUtil} from '../../utils/object-utils';
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
} from "../../resources/dimens";
import MenuSelectedItem from './MenuSelectedItem';
import DeliveryInfo from './DeliveryInfo';
import PaymentInfo from './PaymentInfo';
import ButtonFilled from '../../common/view/button/ButtonFilled';
import PickMenuDialog from "../DeliveryPickMenu/PickMenuDialog";
import LoadingViewPopup from '../../common/view/loading/LoadingViewPopup';
import {bookingApi} from '../../api/booking-api';
import {ERROR_NORMAL, getErrorMessage} from '../../utils/text-message';
import UpdateContactDialog from './UpdateContactDialog';
import {NotificationSubject} from "../../common/subject/notification-subject";
import {CommonUtil} from '../../utils/common-utils';
import Alert from '../../common/view/alert/Alert';
import {NavigationUtils} from '../../router/navigation-utils';
import type {ServiceInteractionModel} from "../../model/data/ServiceInteractionModel";
import {AnalyticsUtil} from "../../components/common/analytics/analytics";

export default class DeliveryOrderConfirmation extends BaseComponent {

    coupon;
    deliveryInfo;
    onUpdateMenuItem;
    onRemoveMenuItem;
    SCREEN = 'DeliveryOrderConfirmation';

    constructor(props) {
        super(props);
        this.coupon = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'coupon']);
        this.deliveryInfo = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'deliveryInfo']);
        this.onUpdateMenuItem = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'onUpdateMenuItem']);
        this.onRemoveMenuItem = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'onRemoveMenuItem']);

        if (!!this.coupon) {
            props.navigation.state.params.couponId = this.coupon.get('id');
        }

        this.state = {
            isPopupLoading: false,
            isLoading: false,
            original_price: 0,
            discounted_price: 0,
            user_name: this.coupon.get('user_name', ''),
            phone_number: this.coupon.get('phone_number', ''),
            data: fromJS({
                menuItems: ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'menuItems']),
                totalQuantity: ObjectUtil.getValue(props, 0, ['navigation', 'state', 'params', 'totalQuantity'])
            })
        }
    }

    render() {

        return (
            <View style={{flex: 1, backgroundColor: COLOR_GRAY_BG}}>

                <ScreenTitleHeader
                    title={'ĐƠN NHỜ MUA HỘ'}
                    subTitle={this.coupon.getIn(['deal', 'brand', 'brand_name'], '')}
                    onGoBackPress={this._onGoBackPress}/>

                <ScrollView
                    style={{
                        flex: 1
                    }}>

                    <DeliveryInfo
                        userName={this.state.user_name}
                        phoneNumber={this.state.phone_number}
                        address={this.deliveryInfo.get('address', '') + (!!this.deliveryInfo.get('addressNote') ? ` - ${this.deliveryInfo.get('addressNote')}` : '')}
                        onEditNamePress={this._onEditNamePress}/>

                    <View style={{flex: 1, marginTop: DIMENSION_PADDING_LARGE}}>
                        {
                            !!this.state.data.get('menuItems') &&
                            this.state.data.get('menuItems').map((item, index) => {
                                
                                if (!item || !item.get) return null;
                                return <MenuSelectedItem item={item} key={item.get('idPicking')} lastItem={index >= this.state.data.get('menuItems').size - 1} onPress={this._onItemSelectedPress}/>
                            })
                        }

                        {
                            (!this.state.data.get('menuItems') || this.state.data.get('menuItems').size < 1) &&
                            <Text style={{color: COLOR_TEXT_INACTIVE, padding: DIMENSION_PADDING_MEDIUM, textAlign: 'center', fontStyle: 'italic'}}>
                                {`Chưa có sản phẩm nào trong đơn hàng.\nQuay lại để tiếp tục chọn sản phẩm`}
                            </Text>
                        }

                    </View>

                    <PaymentInfo
                        totalQuantity={`${this.state.data.get('totalQuantity')} ${CommonUtil.dealSlotUnit(this.coupon.getIn(['deal', 'hint_text'], ''))}`}
                        couponHighlight={this.coupon.get('coupon_highlight', '')}
                        originalPrice={this.state.original_price}
                        discountPrice={this.state.original_price - this.state.discounted_price}
                        deliverPromoCode={this.deliveryInfo.getIn(['promoCode', 'name'])}
                        deliveryDiscountPrice={this.deliveryInfo.getIn(['partner', 'estimate_original_fee'], 0) - this.deliveryInfo.getIn(['promoCode', 'price'], 0)}
                        deliveryPrice={this.deliveryInfo.getIn(['partner', 'estimate_original_fee'], 0)}
                        finalPrice={this.state.discounted_price + this.deliveryInfo.getIn(['promoCode', 'price'], this.deliveryInfo.getIn(['partner', 'estimate_original_fee'], 0))}
                        />

                    <View style={{height: 32}}/>

                </ScrollView>

                <View style={{
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                    paddingTop: DIMENSION_PADDING_SMALL,
                    paddingRight: DIMENSION_PADDING_MEDIUM,
                    paddingBottom: DIMENSION_PADDING_SMALL,
                    backgroundColor: 'white'
                }}>
                    {
                        !!this.state.data.get('menuItems') &&
                        this.state.data.get('menuItems').size > 0 &&
                        <ButtonFilled
                            title={'GỬI YÊU CẦU MUA HỘ'}
                            textColor={'white'}
                            isLoading={this.state.isLoading}
                            loadingColor={'white'}
                            backgroundColor={'#22C300'}
                            align={'center'}
                            onPress={this._onCreateOrder}
                        />
                    }
                </View>

                <PickMenuDialog
                    onRef={this._onRefPickMenuDialog}
                    item={this.state.data.get('selectedItem')}
                    onUpdateItem={this._onUpdateMenuItem}
                    onRemoveItem={this._onRemoveMenuItem}
                />

                <UpdateContactDialog
                    phoneNumber={this.state.phone_number}
                    userName={this.state.user_name}
                    onRef={this._onRefUpdateContact}
                    onSubmitPress={this._onSubmitUpdateContact}/>

                <LoadingViewPopup visible={this.state.isPopupLoading}/>

                <Alert ref={'alert'}/>
            </View>
        )
    }

    _onGoBackPress = () => {
        this.props.navigation.goBack();
    }

    _onCreateOrder = () => {
        this.setState({
            isLoading: true
        }, this._createOrder);
    }

    /**
     * Prepare pickup dialog
     */
    _onRefPickMenuDialog = ref => this.pickUpMenuDialog = ref;

    _onItemSelectedPress = item => {
        if (!!this.state.isLoading) return;
        this.setState({
            data: this.state.data.updateIn(['selectedItem'], () => item)
        }, this._openPickMenuDialog);
    }

    _openPickMenuDialog = () => {
        if (!!this.pickUpMenuDialog) {
            this._trackInDeliveryOrderConfirmation('open_item_editor');
            this.setState({
                pickUpDialogIsOpen: true
            }, this.pickUpMenuDialog.open);
        }
    }

    _onUpdateMenuItem = item => {
        if (!item || !item.get) return;

        this._trackInDeliveryOrderConfirmation('update_item', item.get('title', ''));

        let data = this.state.data;
        const menuItemIndex = data.get('menuItems').findIndex(d => d.get('idPicking') === item.get('idPicking'));

        !!this.onUpdateMenuItem && this.onUpdateMenuItem(item);

        data = data.updateIn(['menuItems', menuItemIndex], () => item);
        data = data.updateIn(['totalQuantity'], () => this._getTotalQuantity(data));
        const needToRefresh = !data.get('menuItems').equals(this.state.data.get('menuItems'));

        console.debug('DeliveryOrderConfirmation:_onUpdateMenuItem:', data.toJS());
        if (menuItemIndex >= 0) {
            this.setState({
                isLoading: needToRefresh,
                data
            }, () => {
                !!needToRefresh && this._fetchCalculatePreOrderPrice();
            })
        }
    }

    _onRemoveMenuItem = item => {
        if (!item || !item.get) return;

        this._trackInDeliveryOrderConfirmation('remove_item', item.get('title', ''));

        !!this.onRemoveMenuItem && this.onRemoveMenuItem(item);

        let data = this.state.data;
        const menuItemIndex = data.get('menuItems').findIndex(d => d.get('idPicking') === item.get('idPicking'));

        console.debug('_onRemoveMenuItem', item.toJS())

        if (menuItemIndex >= 0) {
            let menuItems =  data.get('menuItems').delete(menuItemIndex);
            menuItems = menuItems.filter(m => !!Map.isMap(m));

            data = data.updateIn(['menuItems'], () => menuItems);
            data = data.updateIn(['totalQuantity'], () => this._getTotalQuantity(data));

            const needToRefresh = data.get('menuItems').size > 0;

            this.setState({
                isLoading: needToRefresh,
                original_price: !needToRefresh ? 0 : this.state.original_price,
                discounted_price: !needToRefresh ? 0 : this.state.discounted_price,
                data
            }, () => {
                !!needToRefresh && this._fetchCalculatePreOrderPrice();
            })
        }
    }

    _getTotalQuantity = data => {
        if (!data || !data.get('menuItems')) return 0;

        console.debug('_getTotalQuantity: menuitems', data.toJS());

        return data.get('menuItems').reduce((acc, i) => acc + (!!i && !!i.get ? i.get('quantity', 0) : 0), 0);
    }
    /**
     * End of Prepare pickup dialog
     */

    /**
     * Update contact dialog
     */
    _onRefUpdateContact = ref => {
        this.updateContactDialogRef = ref;
    }

    _onSubmitUpdateContact = (userName, phoneNumber) => {
        this._trackInDeliveryOrderConfirmation('update_contact');
        this.setState({
            user_name: userName,
            phone_number: phoneNumber,
        })
    }

    _onEditNamePress = () => {
        this._trackInDeliveryOrderConfirmation('open_update_contact');
        !!this.updateContactDialogRef && this.updateContactDialogRef.open();
    }
    /**
     * End of Update contact
     */


    /**
     * Data repository
     */
    _onFetchCalculateSuccess = response => {
        if (!this.mounted) return;
        if(!!response && !!response.products) {
            let data = this.state.data
            response.products.map(p => {
                const productIndex = data.get('menuItems').findIndex(m => m.get('product_index') === p.index);
                data = data.updateIn(['menuItems', productIndex, 'total_price'], () => p.total_price);
            })
            this.setState({
                isLoading: false,
                original_price: response.original_price,
                discounted_price: response.discounted_price,
                data
            })
        }
        
    }

    _onFetchCalculateError = error => {
        console.debug('_onFetchCalculateError:', error);
        if (!this.mounted) return;
        this.setState({
            isLoading: false
        }, () => {
            this.refs.alert.show(
                'LỖI',
                getErrorMessage(error, ERROR_NORMAL),
                [{
                    title: 'OK',
                    isHighlight: true,
                    onPress: () => {
                    }
                }]
            )
        });
    }

    _onFetchCalculateCompleted = () => {
        console.debug('_onFetchCalculateCompleted');
        if (!this.mounted) return;
        try {
            !!this.calculateTask && this.calculateTask.unsubscribe();
        }
        catch (e) {}
        this.calculateTask = undefined;
    }

    _fetchCalculatePreOrderPrice = () => {
        this._onFetchCalculateCompleted();
        if (!this.mounted) return;

        const data = this.state.data;
        let menuItems = data.get('menuItems');
        let products = [];

        const newMenuItem = menuItems.map((item, i) => {
            if (!item || !item.get) return item;

            const product = {
                product_code: item.get('product_code'),
                count: item.get('quantity'),
                note: item.get('note'),
                index: i,
                title: item.get('title'),
                original_price: item.get('original_price', 0),
                is_discounted: item.get('is_discounted', false),
            };

            const options = [];
            const customizations = item.get('customizations');

            if (!!customizations) {
                customizations.map(c => {
                    if (!!c.get('options')) {

                        c.get('options').map(option => {
                            if (!!option.get('selected', false)) {
                                options.push(option.get('product_code'));
                            }
                        });
                    }
                })
            }
            product.options = options;

            products.push(product);
            return item.updateIn(['product_index'], () => i)
        });
        this.setState({
            data: this.state.data.updateIn(['menuItems'], () => newMenuItem)
        })

        this.calculateTask = from(bookingApi.calculatePreOrderPrice(
            this.coupon.get('id'),
            undefined,
            products
        ));

        this.calculateTask.subscribe(this._onFetchCalculateSuccess, this._onFetchCalculateError, this._onFetchCalculateCompleted);
    }


    //create order
    _onFetchCreateOrderSuccess = response => {
        console.debug('_onFetchCreateOrderSuccess:', response);
        if (!this.mounted || !response) return;
        console.debug('_onFetchCreateOrderSuccess: ', ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params']));

        if (response.status === 'holding') {
            this._trackInDeliveryOrderConfirmation('order_is_holding');
            this.refs.alert.show(
                'LƯU Ý',
                'Để đảm bảo chất lượng đơn hàng được giao tới bạn, JAMJA sẽ bắt đầu tìm người mua hộ trước giờ đặt chỗ của bạn 1 tiếng.',
                [
                    {
                        title: 'Huỷ',
                        isHighlight: false,
                        onPress: () => {
                            if (!this.mounted) return;
                            this._trackInDeliveryOrderConfirmation('cancel_order_when_holding');
                            this._cancelOrder(response.id)
                        }
                    },
                    {
                        title: 'OK',
                        isHighlight: true,
                        onPress: () => {
                            if (!this.mounted) return;
                            this._trackInDeliveryOrderConfirmation('confirm_order_when_holding');

                            NavigationUtils.replaceWith(this.props.navigation, 3, 'DeliveryStatus', {
                                shippingorder: fromJS(response),
                                from: ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'from'])
                            });
                            NotificationSubject.dispatch('update_delivery_order_status', {
                                shipping_order_id: response.id,
                                coupon_id: ObjectUtil.getValue(response, undefined, ['coupon', 'coupon_id']),
                                shipping_status: response.status,
                                shipping_can_cancel: response.status !== 'shipping' && response.status !== 'completed'
                            });
                        }
                    },
                ]
            );
        } else {
            this._trackInDeliveryOrderConfirmation('order_is_created');
            NavigationUtils.replaceWith(this.props.navigation, 3, 'DeliveryStatus', {
                shippingorder: fromJS(response),
                from: ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'from'])
            });

            NotificationSubject.dispatch('update_delivery_order_status', {
                shipping_order_id: response.id,
                coupon_id: ObjectUtil.getValue(response, undefined, ['coupon', 'coupon_id']),
                shipping_status: response.status,
                shipping_can_cancel: response.status !== 'shipping' && response.status !== 'completed'
            });
        }

        this.setState({
            isLoading: false
        })
    }

    _onFetchCreateOrderError = error => {
        console.debug('_onFetchCreateOrderError:', error);
        if (!this.mounted) return;
        this.setState({
            isLoading: false
        }, () => {
            this.refs.alert.show(
                'LỖI',
                getErrorMessage(error, ERROR_NORMAL),
                [{
                    title: 'OK',
                    isHighlight: true,
                    onPress: () => {
                    }
                }]
            );
        });
    }

    _onFetchCreateOrderCompleted = () => {
        console.debug('_onFetchCreateOrderCompleted');
        if (!this.mounted) return;
        try {
            !!this.createOrderTask && this.createOrderTask.unsubscribe();
        }
        catch (e) {}
        this.createOrderTask = undefined;
    }

    _createOrder = () => {
        this._onFetchCreateOrderCompleted();
        const request = {};
        request.partner = this.deliveryInfo.getIn(['partner', 'partner_name']);
        request.coupon_id = this.coupon.get('id');
        request.address = this.deliveryInfo.get('address');
        request.address_note = this.deliveryInfo.get('addressNote');
        request.note = this.deliveryInfo.get('note', '');
        request.latitude = this.deliveryInfo.get('lat');
        request.longitude = this.deliveryInfo.get('long');
        request.shipping_promocode_id = this.deliveryInfo.getIn(['promoCode', 'id']);
        request.user_name = this.state.user_name;
        request.phone_number = this.state.phone_number;

        this._trackInDeliveryOrderConfirmation('create_order', request.partner, request.address);

        const data = this.state.data;
        const menuItems = data.get('menuItems');
        let products = [];
        menuItems.map(item => {
            const product = {
                product_code: item.get('product_code'),
                count: item.get('quantity'),
                note: item.get('note'),
                title: item.get('title'),
                original_price: item.get('original_price', 0),
                is_discounted: item.get('is_discounted', false),
            };

            const options = [];
            const customizations = item.get('customizations');

            if (!!customizations) {
                customizations.map(c => {
                    if (!!c.get('options')) {

                        c.get('options').map(option => {
                            if (!!option.get('selected', false)) {
                                options.push(option.get('product_code'));
                            }
                        });
                    }
                })
            }
            product.options = options;

            products.push(product);
        });

        request.products = products;

        this.createOrderTask = from(bookingApi.createShippingOrder(request));
        this.createOrderTask.subscribe(this._onFetchCreateOrderSuccess, this._onFetchCreateOrderError, this._onFetchCreateOrderCompleted);
    }

    //cancel order
    _onFetchCancelOrderSuccess = response => {
        console.debug('_onFetchCancelOrderSuccess:', response);
        const from = ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'from']);

        if (from === 'reservation_order') {
            this.props.navigation.pop(3);
            return;
        }
        if (from === 'booking_order') {
            this.props.navigation.pop(4);
        }
    }

    _onFetchCancelOrderError = error => {
        console.debug('_onFetchCancelOrderError:', error);
    }

    _onFetchCancelOrderCompleted = () => {
        console.debug('_onFetchCancelOrderCompleted');
        if (!this.mounted) return;
        try {
            !!this.cancelOrderTask && this.cancelOrderTask.unsubscribe();
        }
        catch (e) {}
        this.cancelOrderTask = undefined;
    }

    _cancelOrder = id => {
        this._onFetchCancelOrderCompleted();
        this._trackInDeliveryOrderConfirmation('cancel_order', id);
        this.cancelOrderTask = from(bookingApi.deleteShippingOrder(id));
        this.cancelOrderTask.subscribe(this._onFetchCancelOrderSuccess, this._onFetchCancelOrderError, this._onFetchCancelOrderError);
    }
    /**
     * End of Data repository
     */

    _trackInDeliveryOrderConfirmation = (action, value, address) => {
        if (!this.coupon) return;
        let params: ServiceInteractionModel = {};
        params.screen_name = this.SCREEN;
        params.item_id = this.coupon.getIn(['deal', 'slug']);
        params.item_brand = this.coupon.getIn(['deal', 'brand', 'brand_slug']);
        params.item_category = this.coupon.getIn(['deal', 'deal_type']);
        params.interaction_type = action;
        if (!!value) {
            params.interaction_value = value;
        }
        if (!!address) {
            params.address = address;
        }
        params.coupon_id = this.coupon.get('id', '');

        AnalyticsUtil.trackDeliveryServiceInteraction(params);
    }

    componentDidMount() {
        super.componentDidMount();
        this.setState({
            isLoading: true
        }, this._fetchCalculatePreOrderPrice);
    }

    componentWillUnmount() {
        !!this.refs.alert && this.refs.alert.cancel();
        super.componentWillUnmount();
        this._onFetchCalculateCompleted();
        this._onFetchCreateOrderSuccess();
        this._onFetchCancelOrderCompleted();
    }
}
