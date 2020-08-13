import React from 'react';
import {View, VirtualizedList} from 'react-native';
import {fromJS, Map} from 'immutable';
import {from} from 'rxjs';

import {BasePureComponent} from "../../common/base/BasePureComponent";
import ScreenTitleHeader from '../../common/view/header/ScreenTitleHeader';
import {
    COLOR_GRAY_BG,
} from "../../resources/colors";
import {DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import SearchInput from '../../common/view/form/SearchInput';
import {bookingApi} from '../../api/booking-api';
import MenuListItem from './MenuListItem';
import LoadingMore from '../../common/view/loading/LoadingMore';
import EmptyListItem from '../../common/view/notice/EmptyListItem';
import {ObjectUtil} from '../../utils/object-utils';
import PickMenuDialog from './PickMenuDialog';
import {CommonUtil} from '../../utils/common-utils';
import ButtonSubTitle from './ButtonSubTitle';
import Alert from '../../common/view/alert/Alert';
import type {ServiceInteractionModel} from "../../model/data/ServiceInteractionModel";
import {AnalyticsUtil} from "../../components/common/analytics/analytics";
import {StringUtil} from "../../utils/string-util";
import { DeliveryDraffDb } from '../../api/storage/DeliveryDraffDb';
import {ERROR_NORMAL, getErrorMessage} from '../../utils/text-message';

const LIMIT_ITEM = 20;
export default class DeliveryPickMenu extends BasePureComponent {

    offset = 0;
    canLoadMore = false;
    coupon;
    deliveryInfo;
    SCREEN = 'DeliveryPickMenu';

    constructor(props) {
        super(props);
        this.coupon = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'coupon']);
        this.deliveryInfo = ObjectUtil.getValue(props, undefined, ['navigation', 'state', 'params', 'deliveryInfo']);

        props.navigation.state.params.couponId = this.coupon.get('id');

        this.state = {
            isRefreshing: false,
            isLoadingMore: false,
            pickUpDialogIsOpen: false,
            query: undefined,
            data: fromJS({
                selectedItem: undefined,
                selectedList: [],
                totalQuantity: 0,
                list: []
            })
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: COLOR_GRAY_BG}}>
                <ScreenTitleHeader
                    title={'DANH MỤC SẢN PHẨM'}
                    subTitle={this.coupon.getIn(['deal', 'brand', 'brand_name'], '')}
                    onGoBackPress={this._onGoBackPress}/>

                <SearchInput
                    style={{margin: DIMENSION_PADDING_MEDIUM}}
                    placeHolder={'Tìm món nhanh'}
                    value={this.state.query}
                    disable={this.state.isRefreshing}
                    onSubmit={this._onSubmitSearch}
                    onClear={this._onClearInput}/>

                <VirtualizedList
                    style={{flex: 1}}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onPullToRefreshMenu}
                    initialNumToRender={3}
                    maxToRenderPerBatch={10}
                    data={this.state.data.get('list')}
                    getItem={this._getMenuDataItem}
                    getItemCount={this._getMenuItemCount}
                    onEndReachedThreshold={0.5}
                    onEndReached={this._onMenuLoadMore}
                    keyExtractor={this._getMenuItemKeyExtractor}
                    renderItem={this._renderMenuItem}
                    ListEmptyComponent={this._renderEmptyMenuList}
                    ListFooterComponent={this._renderFooterMenuList}
                    removeClippedSubviews={true}
                    />

                {
                    !!this.state.data.get('totalQuantity', 0) > 0 &&
                    !this.state.pickUpDialogIsOpen &&
                    <ButtonSubTitle
                        title={'XEM ĐƠN MUA HỘ'}
                        subTitle={`${this.state.data.get('totalQuantity', 0)} sản phẩm - ${StringUtil.beautyNumber(this._getTotalPrice())}đ (giá gốc)`}
                        onPress={this._onViewOrderPress}/>

                }

                <PickMenuDialog
                    onRef={this._onRefPickMenuDialog}
                    item={this.state.data.get('selectedItem')}
                    onClosed={this._onClosePickMenuDialog}
                    onAddItem={this._onAddMenuItem}
                    onUpdateItem={this._onUpdateMenuItem}
                    onRemoveItem={this._onRemoveMenuItem}
                />

                <Alert ref={'alert'}/>

            </View>
        )
    }

    _getTotalPrice = () => {
        const data = this.state.data;
        const selectedList = data.get('selectedList');
        if(!selectedList) return 0;
        let totalPrice = 0;
        selectedList.map(l => {
            let price = l.get('original_price', 0) ;

            if (!l.get('customizations') && !l.get('options')) return;
            if(!!l.get('customizations')) {
                l.get('customizations').map(c => {
                    if (!!c.get('options')) {
                        price += c.get('options').filter(o => !!o.get('selected')).reduce((acc,o) => acc + o.get('original_price', 0), 0);
                    }
                });
            }else if (!!l.get('options')) {
                price += l.get('options').reduce((acc,o) => acc + o.get('original_price', 0), 0);
            }
            price *= l.get('quantity', 0)
            totalPrice += price;
        })
        return totalPrice
    }

    _onGoBackPress = () => {
        this.props.navigation.goBack();
    }

    _onSubmitSearch = text => {
        this._trackInDeliveryPickMenu('submit_search', text);

        this.setState({
            isRefreshing: true,
            query: !!text ? text.trim() : undefined
        }, this._fetchMenu);
    }

    _onClearInput = () => {
        this.setState({
            isRefreshing: true,
            query: undefined
        }, this._fetchMenu);
    }

    _onPullToRefreshMenu = () => {
        this.setState({
            isRefreshing: true,
            isLoadingMore: false
        }, this._fetchMenu);
    }

    _onViewOrderPress = () => {
        this._trackInDeliveryPickMenu('view_order_click', this.state.data.get('totalQuantity', 0));

        this.props.navigation.navigate(
            'DeliveryOrderConfirmation',
            {
                coupon: this.coupon,
                onUpdateMenuItem: this._onUpdateMenuItem,
                onRemoveMenuItem: this._onRemoveMenuItem,
                deliveryInfo: this.deliveryInfo,
                menuItems: this.state.data.get('selectedList'),
                totalQuantity: this.state.data.get('totalQuantity', 0),
                from: ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'from'])
            }
        )
    }

    /**
     * List menu items setup
     */
    _getMenuDataItem = (data, index) => !!data && data.get(index);

    _getMenuItemCount = (data) => !!data ? data.size : 0;

    _onMenuLoadMore = () => {
        if (!!this.state.isLoadingMore || !!this.state.isRefreshing) return;

        console.debug('_onMenuLoadMore:', this.state.data.toJS());
        this.setState({
            isLoadingMore: true
        }, this._fetchMenu);
    }

    _getMenuItemKeyExtractor = (item, index) => {
        let key = `menu_item_${index}_`;
        if (item) {
            if (Map.isMap(item)) {
                key += item.get('id', '');
            }
            else if (typeof item === 'string') {
                key += item
            }
            else {
                key += index
            }
        }
        return key;
    }

    _renderMenuItem = ({ item, index }) => <MenuListItem item={item} onPress={this._onMenuItemPress}/>;

    _renderEmptyMenuList = () => !this.state.isRefreshing && !this.state.isLoadingMore && <EmptyListItem/>;

    _renderFooterMenuList = () => {
        return (
            <View style={{paddingBottom: 64}}>
                {!!this.canLoadMore && <LoadingMore/>}
            </View>
        )
    };
    /**
     * End of List menu items setup
     */

    /**
     * Prepare pickup dialog
     */
    _onRefPickMenuDialog = ref => this.pickUpMenuDialog = ref;

    _onMenuItemPress = item => {
        this.setState({
            data: this.state.data.updateIn(['selectedItem'], () => item)
        }, this._openPickMenuDialog);

    }

    _openPickMenuDialog = () => {
        if (!!this.pickUpMenuDialog) {
            this._trackInDeliveryPickMenu('open_pickup_item');
            this.setState({
                pickUpDialogIsOpen: true
            }, this.pickUpMenuDialog.open);
        }
    }

    _onClosePickMenuDialog = () => {
        this._trackInDeliveryPickMenu('close_pickup_item');
        this.setState({
            pickUpDialogIsOpen: false
        })
    }
    /**
     * End of Prepare pickup dialog
     */

    /**
     * Pick Menu item actions
     */
    _onAddMenuItem = item => {
        if (!item) return;
        this._trackInDeliveryPickMenu('add_item', item.get('title', ''));

        const idPicking = CommonUtil.generateRandomId(`${item.get('itemIndex')}_${item.get('id')}`);
        const menuItem = item.updateIn(['idPicking'], () => idPicking);

        let data = this.state.data;
        let selectedList = data.get('selectedList');
        
        if (!selectedList) selectedList = fromJS([]);
        selectedList = selectedList.push(menuItem);
        data = data.updateIn(['selectedList'], () => selectedList);

        let list = data.get('list');
        const itemIndexInList = list.findIndex(d => d.get('id') === item.get('id'));
        let totalQuantity = 0;
        let totalQuantityOfProducts = 0;

        if (itemIndexInList >= 0) {
            if (selectedList.size < 2) {
                totalQuantity = item.get('quantity', 0);
                totalQuantityOfProducts = totalQuantity;
            }
            else {
                const productsSelected = selectedList.filter(d => d.get('id') === item.get('id'));
                totalQuantity = productsSelected.reduce((acc,p) => acc + p.get('quantity', 0), 0);
            }
            list = list.updateIn([itemIndexInList, 'totalQuantity'], () => totalQuantity);
            data = data.updateIn(['list'], () => list);
        }

        if (totalQuantityOfProducts < 1) {
            totalQuantityOfProducts = selectedList.reduce((acc,p) => acc + p.get('quantity', 0), 0);
        }

        data = data.updateIn(['totalQuantity'], () => totalQuantityOfProducts);

        console.debug('_onAddMenuItem:result', data.toJS());

        this._addDraffToDb(
            this.coupon.get('id'),
            this.coupon.get('check_in_time', 0),
            selectedList.toJS(),
            totalQuantityOfProducts
        )

        this.setState({
            data
        });
    }

    _onUpdateMenuItem = item => {
        console.debug('Pickup:_onUpdateMenuItem: ', item.toJS());
        if (!item) return;
        let data = this.state.data;
        let selectedList = data.get('selectedList');

        if (!selectedList) return;

        const selectedIndex = selectedList.findIndex(d => d.get('idPicking') === item.get('idPicking'));
        if (selectedIndex < 0) return;

        selectedList = selectedList.updateIn([selectedIndex], () => item);
        data = data.updateIn(['selectedList'], () => selectedList);

        let list = data.get('list');
        const itemIndexInList = list.findIndex(d => d.get('id') === item.get('id'));
        let totalQuantity = 0;
        let totalQuantityOfProducts = 0;

        if (itemIndexInList >= 0) {
            if (selectedList.size < 2) {
                totalQuantity = item.get('quantity', 0);
                totalQuantityOfProducts = totalQuantity;
            }
            else {
                const productsSelected = selectedList.filter(d => d.get('id') === item.get('id'));
                totalQuantity = productsSelected.reduce((acc,p) => acc + p.get('quantity', 0), 0);
            }
            list = list.updateIn([itemIndexInList, 'totalQuantity'], () => totalQuantity);
            data = data.updateIn(['list'], () => list);
        }

        if (totalQuantityOfProducts < 1) {
            totalQuantityOfProducts = selectedList.reduce((acc,p) => acc + p.get('quantity', 0), 0);
        }

        data = data.updateIn(['totalQuantity'], () => totalQuantityOfProducts);

        console.debug('Pickup:_onUpdateMenuItem:result', data.toJS());
        
        this._addDraffToDb(
            this.coupon.get('id'),
            this.coupon.get('check_in_time', 0),
            selectedList.toJS(),
            totalQuantityOfProducts
        )

        this.setState({
            data
        });
    }

    _onRemoveMenuItem = item => {
        console.debug('Pickup:_onRemoveMenuItem: ', item.toJS());
        if (!item || !item.get('id')) return;
        let data = this.state.data;
        let selectedList = data.get('selectedList');

        if (!selectedList) return;

        const selectedIndex = selectedList.findIndex(d => d.get('idPicking') === item.get('idPicking'));
        if (selectedIndex < 0) return;

        selectedList = selectedList.delete(selectedIndex);
        selectedList = selectedList.filter(s => !!Map.isMap(s));

        data = data.updateIn(['selectedList'], () => selectedList);

        let list = data.get('list');
        if (!list) list = fromJS([]);

        const itemIndexInList = list.findIndex(d => Map.isMap(d) && d.get('id') === item.get('id'));
        let totalQuantity = 0;
        let totalQuantityOfProducts = 0;

        if (itemIndexInList >= 0) {
            const productsSelected = selectedList.filter(d => Map.isMap(d) && d.get('id') === item.get('id'));
            totalQuantity = productsSelected.reduce((acc,p) => acc + (!!p && !!p.get ? p.get('quantity', 0) : 0), 0);

            list = list.updateIn([itemIndexInList, 'totalQuantity'], () => totalQuantity);
            data = data.updateIn(['list'], () => list);
        }

        if (totalQuantityOfProducts < 1) {
            totalQuantityOfProducts = selectedList.reduce((acc,p) => acc + (!!p && !!p.get ? p.get('quantity', 0) : 0), 0);
        }

        data = data.updateIn(['totalQuantity'], () => totalQuantityOfProducts);

        console.debug('Pickup:_onRemoveMenuItem:result', data.toJS());

        this._addDraffToDb(
            this.coupon.get('id'),
            this.coupon.get('check_in_time', 0),
            selectedList.toJS(),
            totalQuantityOfProducts
        )

        this.setState({
            data
        });
    }

    _addDraffToDb = (coupon_id, check_in_time, products, totalQuantity) => {
        const draff = {
            coupon_id,
            check_in_time,
            products,
            totalQuantity,
        }
        DeliveryDraffDb.add(draff);
    }
    /**
     * End of Pick Menu item actions
     */

    /**
     * Data repository
     */

    _onFetchMenuSuccess = response => {
        if (!this.mounted) return;
        console.debug('_fetchMenu:response', response);
        this.canLoadMore = !!response && !!response.objects && response.objects.length >= LIMIT_ITEM;

        let data = this.state.data;
        if (!!response.objects) {
            let objects = response.objects.map((o,i) => {
                o.itemIndex = this.offset + i;
                return o;
            });

            objects  = fromJS(objects);

            //Map quantity of product selected to new product list
            const selectedList = data.get('selectedList');

            if (!!selectedList && selectedList.size > 0 && objects.size > 0) {
                const productIds = selectedList.groupBy(p => p.get('id')).map((k,i) => i);

                console.debug('_onFetchMenuSuccess: ', productIds.toJS());

                productIds.map((items, id) => {
                    console.debug('_onFetchMenuSuccess_@: ', id);
                    const foundIndex = objects.findIndex(p => p.get('id') === id);
                    console.debug('foundIndex: ', id, foundIndex);

                    if (foundIndex >= 0) {
                        objects = objects.updateIn([foundIndex, 'totalQuantity'], () => {
                            return selectedList.filter(p => p.get('id') === id).reduce((acc,p) => acc + p.get('quantity', 0), 0);
                        });
                    }
                });
            }

            console.debug('objects', objects.toJS());

            data = data.updateIn(['list'], list => {
                if (!list || this.offset < 1) return objects;
                return list.push(...objects);
            });
        }

        this.setState({
            isRefreshing: false,
            isLoadingMore: false,
            data
        })
    }

    _onFetchMenuError = error => {
        if (!this.mounted) return;
        console.debug('_fetchMenu:error', error);
        this.setState({
            isRefreshing: false,
            isLoadingMore: false
        })
    }

    _onFetchMenuCompleted = () => {
        if (!this.mounted) return;
        console.debug('_onFetchMenuCompleted');
        try {
            !!this.fetcherTask && !!this.fetcherTask.unsubscribe && this.fetcherTask.unsubscribe();
        }
        catch (e) {}
        this.fetcherTask = undefined;
    }

    _fetchMenu = () => {
        this._onFetchMenuCompleted();
        if (!this.coupon) {
            return;
        }

        this.offset = !!this.state.isRefreshing ? 0 : this.state.data.get('list', {size: () => 0}).size;
        this.fetcherTask = from(bookingApi.getMenuOrder(
            this.coupon.get('id'),
            undefined,
            this.state.query,
            this.offset,
            LIMIT_ITEM));

        this.fetcherTask.subscribe(this._onFetchMenuSuccess, this._onFetchMenuError, this._onFetchMenuCompleted);
    }
    /**
     * End of Data repository
     */

    _trackInDeliveryPickMenu = (action, value) => {
        if (!this.coupon) return;
        const params: ServiceInteractionModel = {};
        params.screen_name = this.SCREEN;
        params.item_id = this.coupon.getIn(['deal', 'slug']);
        params.item_brand = this.coupon.getIn(['deal', 'brand', 'brand_slug']);
        params.item_category = this.coupon.getIn(['deal', 'deal_type']);
        params.interaction_type = action;
        if (!!value) {
            params.interaction_value = value;
        }
        params.coupon_id = this.coupon.get('id');

        AnalyticsUtil.trackDeliveryServiceInteraction(params);
    }

    //fetch draff

    _mergeDataChanged = (products) => {
        let data = this.state.data;
        if(products.length === 0) {
            data = data.updateIn(['selectedList'], () => fromJS([]))
                        .updateIn(['totalQuantity'], () => 0)
            this.setState({
                data,
            })

            DeliveryDraffDb.remove(this.coupon.get('id'))

            return
        }

        let selectedList = data.get('selectedList')

        let totalQuantity = 0;
        let newSelectedList = fromJS([]);
        selectedList.map(s => {

            if (!s || !s.get) return;
            const itemIndex = products.findIndex(p => s.get('product_code') === p.product_code);
            if(itemIndex >= 0) {
                let product = products[itemIndex];
                let customizations_data = s.getIn(['customizations'])

                if(!customizations_data || !product || !product.customizations) return
                customizations_data = customizations_data.map(c_data => {
                    
                    if(!c_data || !c_data.get) return;
                    let c_data_ = c_data.get('options');
                    let newOptions = fromJS([])
                    c_data_ = c_data_.map(o_data => {

                        if(!o_data || !o_data.get) return;
                        let a = o_data
                        
                        product.customizations.map(c_product => {
                            
                            if(!c_product || !c_product.options) return;
                            c_product.options.map(o_product => {
                                if(!o_product) return;

                                if(o_data.get('product_code') === o_product.product_code) {
                                    a = o_data.updateIn(['title'], () => o_product.title)
                                        .updateIn(['original_price'], () => o_product.original_price)
                                    newOptions = newOptions.push(a)
                                    return o_product
                                }
                            })
                        })
                        return a
                        
                    })
                    return c_data.updateIn(['options'], () => newOptions)
                })
                s = s.updateIn(['customizations'], () => customizations_data)
                    .updateIn(['image'], () => product.image)
                    .updateIn(['ipos_image_url'], () => product.ipos_image_url)
                    .updateIn(['is_discounted'], () => product.is_discounted)
                    .updateIn(['original_price'], () => product.original_price)
                    .updateIn(['title'], () => product.title)
                totalQuantity += s.getIn(['quantity'], 0)
                newSelectedList = newSelectedList.push(s)
            }
        })
        
        data = data.updateIn(['selectedList'], () => newSelectedList)
                    .updateIn(['totalQuantity'], () => totalQuantity);
        this.setState({
            data
        })

        this._addDraffToDb(
            this.coupon.get('id'),
            this.coupon.get('check_in_time', 0),
            newSelectedList.toJS(),
            data.get('totalQuantity')
        )
    }

    _checkChangeDraffSuccess = response => {
        if (!this.mounted) return;
        if(!!response && !!response.products && !response.check_result) {
            this.refs.alert.show(
                'Thông báo',
                'Đơn mua hộ của bạn có sự thay đổi về sản phẩm. Bấm OK để xem chi tiết đơn.',
                [{
                    title: 'OK',
                    isHighlight: true,
                    onPress: this._onViewOrderPress
                }]
            )
            this._mergeDataChanged(response.products)
        }
    }

    _checkChangeDraffError = error => {
        if (!this.mounted) return;
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
    }

    _checkChangeDraffCompleted = () => {
        if (!this.mounted) return;
        try {
            !!this.checkChangeTask && this.checkChangeTask.unsubscribe();
        }
        catch (e) {}
        this.checkChangeTask = undefined;
    }

    _fetchChangeDraff = (data) => {
        this._checkChangeDraffCompleted();
        if(!data || !data.get) return;
        let menuItems = data.get('selectedList');
        let products = [];

        menuItems.map((item, i) => {
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
                                options.push(option.toJS());
                            }
                        });
                    }
                })
            }
            product.options = options;

            products.push(product);
            
            return item.updateIn(['product_index'], () => i)
        });

        this.checkChangeTask = from(bookingApi.checkChangeDraff(this.coupon.get('id'),products));

        this.checkChangeTask.subscribe(this._checkChangeDraffSuccess, this._checkChangeDraffError, this._checkChangeDraffCompleted);
    }

    _fetchDraff = () => {
        const draffs = DeliveryDraffDb.get(this.coupon.get('id'));
        if(!draffs || draffs.length === 0) return;
        let data = this.state.data;
        data = data.updateIn(['selectedList'], () => fromJS(draffs[0].products));
        data = data.updateIn(['totalQuantity'], () => draffs[0].totalQuantity);
        this.setState({
            data
        }, () => this._fetchChangeDraff(data))
    }

    componentDidMount() {
        super.componentDidMount();
        this.setState({
            isRefreshing: !!this.coupon
        }, this._fetchMenu);
        this._fetchDraff();
        
    }

    componentWillUnmount() {
        this._onFetchMenuCompleted();
        this._checkChangeDraffCompleted();
        !!this.refs.alert && this.refs.alert.cancel();
        super.componentWillUnmount();
    }
}