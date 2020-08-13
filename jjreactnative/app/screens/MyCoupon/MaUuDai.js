import React from 'react';
import { Text, Container } from 'native-base';
import { View, VirtualizedList } from 'react-native';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import moment from 'moment/min/moment-with-locales';

import { strings } from '../../../locates/i18n';
import { TYPE_GOT } from '../../const';
import EmptyView from './EmptyView';
import LoginRequiredView from '../../components/tabwallet/LoginRequiredView';
import ItemDealGot from './ItemDealGot';
import JJHeader from '../../components/common/JJHeader';
import LoadingView from '../../components/common/LoadingView';
import LoadMoreView from '../../components/common/LoadMoreView';
import { AVAILABLE_HEADER_TYPE, NOT_AVAILABLE_HEADER_TYPE } from '../../const';
import { COLOR_GRAY_BG, COLOR_PRIMARY } from '../../resources/colors';
import { BasePureComponent } from '../../components/common/BasePureComponent';
import { StringUtil } from '../../utils/string-util';
import { couponApi } from '../../api/coupon-api';
import { CouponDb } from '../../api/storage/CouponDb';
import { from } from 'rxjs';
import { AppConfig } from '../../common/config';
import { DeliveryDraffDb } from '../../api/storage/DeliveryDraffDb';
import {NotificationSubject} from '../../common/subject/notification-subject';

moment.locale('vi');


const ITEM_LIMIT = 20;

class MaUuDai extends BasePureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            isRefreshing: true,
            isLoadingMore: false,
            hasMore: false,
            coupons: fromJS([]),
            removeClippedSubviews: false,
        };
    }

    render() {
        return (
            <Container>
                {/* Toolbar */}
                <JJHeader navigation={this.props.navigation} title={'MÃ KHUYẾN MÃI CỦA TÔI'} />
                {/* Content */}
                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG, justifyContent: 'center' }}>
                    {!this.props.isLoginned ? <LoginRequiredView type={TYPE_GOT} navigation={this.props.navigation} /> : this._renderContent()}
                </View>
            </Container>
        );
    }

    _renderContent() {
        if (this.state.coupons.size < 1 && this.state.isRefreshing) {
            return <LoadingView />;
        }
        if (!this.state.isRefreshing && !this.state.isLoadingMore && this.state.coupons.size < 1) {
            return (
                <EmptyView
                    onRefresh={this._refreshCoupon}
                    onOpenMarketTabSelected={this.props.navigation.goBack}
                    error={this.props.coupons === null}
                />
            );
        }
        return this._renderListView();
    }

    _renderListView() {
        return (
            <VirtualizedList
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshCoupon}
                initialNumToRender={7}
                maxToRenderPerBatch={21}
                data={this.state.coupons}
                getItem={this._getItem}
                getItemCount={this._getItemCouponCount}
                onEndReached={this._fetchCouponUnAvailable}
                onEndReachedThreshold={0.5}
                keyExtractor={this._getKeyItem}
                renderItem={this._renderItem}
                ListFooterComponent={this._renderFooter}
                removeClippedSubviews={this.state.removeClippedSubviews}
                extraData={this.state}
                windowSize={10}
            />
        );
    }

    _getKeyItem = (item, index) => `item_got_${item.get('id', '')}_${index}`;

    _getItemCouponCount = data => (!!data ? data.size : 0);

    _getItem = (data, index) => data.get(index);

    _renderFooter = () => {
        if (!this.state.hasMore || this.state.isRefreshing) {
            return null;
        } else {
            return <LoadMoreView />;
        }
    };

    _renderItem = ({ item }) => {
        if (item.get('row_type') === AVAILABLE_HEADER_TYPE || item.get('row_type') === NOT_AVAILABLE_HEADER_TYPE) {
            return this._renderHeader(item.get('row_type'));
        }

        return <ItemDealGot coupon={item} navigation={this.props.navigation} />;
    };

    _renderHeader = type => {
        return (
            <View style={{ padding: 16, flex: 1, flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', color: '#454545', fontSize: 18 }}>
                    {type === AVAILABLE_HEADER_TYPE
                        ? strings('wallet.deal_got.header.code_available')
                        : strings('wallet.deal_got.header.code_not_available')}
                </Text>
                <View style={{ backgroundColor: COLOR_PRIMARY, width: 62, height: 2, marginTop: 2 }} />
            </View>
        );
    };

    _removeDraffDelivery = () => {
        if(!this.props.isLoginned) return;
        const draffs = DeliveryDraffDb.get('all');
        const now = moment().unix();
        if(!!draffs && draffs.length > 0) {
            draffs.map(item => {
                if(!!item.check_in_time && (now - item.check_in_time > 7200)) {
                    DeliveryDraffDb.remove(item.coupon_id)
                }
            })
        }
    }

    _initData = () => {
        const cacheCoupons = CouponDb.get(true);
        this._removeDraffDelivery()
        if (!!cacheCoupons && cacheCoupons.length > 0) {
            this.setState(
                {
                    ...this.state,
                    isRefreshing: true,
                    offset: 0,
                    coupons: fromJS([{ row_type: AVAILABLE_HEADER_TYPE }, ...cacheCoupons])
                },
                this._fetchCouponAvailable
            );
            return;
        }
        this._refreshCoupon();
    };

    _refreshCoupon = () => {
        this.setState(
            {
                ...this.state,
                isRefreshing: true,
                offset: 0
            },
            this._fetchCouponAvailable
        );
    };

    _fetchCouponAvailable = () => {
        this._fetchCouponAvailableTask = from(couponApi.getCouponList(true, 0, 100));
        this._fetchCouponAvailableTask.subscribe(
            this._fetchCouponAvailableSuccess,
            this._fetchCouponAvailableError,
            this._fetchCouponAvailableCompleted
        );
    };

    _fetchCouponAvailableSuccess = response => {
        if (!!response && response.length > 0) {
            CouponDb.addList(response);
            this.setState(
                {
                    ...this.state,
                    offset: 0,
                    hasMore: true,
                    isRefreshing: false,
                    coupons: fromJS([{ row_type: AVAILABLE_HEADER_TYPE }, ...response])
                },
                this._fetchCouponUnAvailable
            );
            return;
        }
        CouponDb.removeAll();
        this.setState(
            {
                ...this.state,
                offset: 0,
                coupons: fromJS([])
            },
            this._fetchCouponUnAvailable
        );
    };

    _fetchCouponAvailableError = () => {
        this.setState({
            isRefreshing: false,
            hasMore: true,
        }, this._fetchCouponUnAvailable)
    };

    _fetchCouponAvailableCompleted = () => {
        try {
            if (!this.mounted) return;
            !!this._fetchCouponAvailableTask && this._fetchCouponAvailableTask.unsubscribe();
        } catch (e) {}
        this._fetchCouponAvailableTask = undefined;
    };

    _fetchCouponUnAvailable = () => {
        if (this.state.isLoadingMore) return;
        this.setState(
            {
                ...this.state,
                isLoadingMore: true
            },
            () => {
                this._fetchCouponUnAvailableTask = from(couponApi.getCouponList(false, this.state.offset, ITEM_LIMIT));
                this._fetchCouponUnAvailableTask.subscribe(
                    this._fetchCouponUnAvailableSuccess,
                    this._fetchCouponUnAvailableError,
                    this._fetchCouponUnAvailableCompleted
                );
            }
        );
    };

    _fetchCouponUnAvailableSuccess = response => {
        if (!!response && response.length > 0) {
            let coupons = this.state.coupons;
            if (!coupons) coupons = fromJS([]);
            if (this.state.offset === 0) {
                coupons = coupons.push(...fromJS([{ row_type: NOT_AVAILABLE_HEADER_TYPE }, ...response]));
            } else {
                coupons = coupons.push(...fromJS(response));
            }
            let offset = this.state.offset + response.length
            this.setState({
                ...this.state,
                offset,
                isRefreshing: false,
                isLoadingMore: false,
                hasMore: response.length >= ITEM_LIMIT,
                coupons,
                removeClippedSubviews: offset > ITEM_LIMIT
            });
            return;
        }
        this.setState({
            ...this.state,
            isRefreshing: false,
            isLoadingMore: false,
            hasMore: false
        });
    };

    _fetchCouponUnAvailableError = () => {
        this.setState({
            ...this.state,
            isRefreshing: false,
            isLoadingMore: false,
            hasMore: false
        });
    };

    _fetchCouponUnAvailableCompleted = () => {
        try {
            if (!this.mounted) return;
            !!this._fetchCouponUnAvailableTask && this._fetchCouponUnAvailableTask.unsubscribe();
        } catch (e) {}
        this._fetchCouponUnAvailableTask = undefined;
    };

    _onHandleNotificationDispatcher = event => {
        if (!event || !this.mounted || !event.action) return;
        console.debug('_onHandleNotificationDispatcher:', event);

        if (event.action === 'update_delivery_order_status' || event.action === 'cancel_delivery_order') {
            this._refreshCoupon();
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.onNotificationSubscription = NotificationSubject.subscribe(this._onHandleNotificationDispatcher);
        if (!!this.props.isLoginned) this._initData();
    }

    componentDidUpdate(prevProps) {
        if (
            (prevProps.user === undefined || prevProps.user === null || !prevProps.user.hasOwnProperty('access_token')) &&
            this.props.user !== undefined &&
            this.props.user !== null &&
            this.props.user.hasOwnProperty('access_token')
        ) {
            this._refreshCoupon();
        }
    }

    componentWillUnmount() {
        !!this.onNotificationSubscription && this.onNotificationSubscription.unsubscribe();
        this._fetchCouponUnAvailableCompleted();
        this._fetchCouponAvailableCompleted();
        super.componentWillUnmount();
    }

    componentWillReceiveProps(nextProps) {
        if (!StringUtil.isEmpty(nextProps.couponDataChange.get('did'))) {
            this._refreshCoupon();
        }
    }
}

const mapStateToProps = state => {
    return {
        isLoginned: state.loginReducer.isLoginned,
        user: state.loginReducer.user,

        couponDataChange: state.couponDataChangeReducer
    };
};

export default connect(mapStateToProps)(MaUuDai);
