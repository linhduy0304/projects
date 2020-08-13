import React from 'react';
import PropTypes from 'prop-types'
import { Text, Container } from 'native-base';
import {View, FlatList, ActivityIndicator} from 'react-native';

import LoadMoreView from '../../common/LoadMoreView';
import BigDealItem from '../../common/BigDealItem'
import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import {BasePureComponent} from "../../common/BasePureComponent";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {dealApi} from '../../../api/deal-api'
import {fromJS} from "immutable";
import {connect} from "react-redux";
import {StringUtil} from "../../../utils/string-util";

const ITEM_LIMIT = 12;

class TabDealsOfBrand extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            deals: fromJS([]),
            isRefreshing: false,
            isLoading: true,
            isSuccess: false,
            hasMore: false,
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: COLOR_GRAY_BG}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    {this._renderContent()}
                </View>
            </Container>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        this._refreshDeals();
    }

    _renderContent = () => {
        if (this.state.isLoading) {
            return <ActivityIndicator
                        style={{padding: 24}}
                        animating
                        size="small" />
        }
        else {
            if (this.state.isSuccess) {
                if (!!this.state.deals && this.state.deals.size > 0) {
                    return this._renderListView();
                } else {
                    return this._renderNoData();
                }
            }
        }
    }

    _renderListView() {
        return (
            <FlatList
                scrollEventThrottle={1}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingTop: DIMENSION_PADDING_MEDIUM}}
                overScrollMode="never"
                removeClippedSubviews={true}
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshDeals}
                style={{ flex: 1, backgroundColor: COLOR_GRAY_BG}}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                data={this.state.deals.toJS()}
                onEndReachedThreshold={0.5}
                onEndReached={this._onLoadMoreHandle}
                keyExtractor={this._getDealOfBrandKey}
                renderItem={this._renderItem}
                ListFooterComponent={this._renderFooter}
            />
        )
    }

    _getDealOfBrandKey = (item, index) => `${index}_${item.id}`;

    _renderFooter = () => {
        if (!this.state.hasMore) {
            return null;
        } else {
            return <LoadMoreView />
        }
    }

    _renderItem = ({item}) => {
        if (item.hasOwnProperty('type') && item.type === 'space') {
            return (
                <View style={{height: 60}}/>
            )
        }
        return (
            <View style={{paddingBottom: 15}}>
                <BigDealItem
                    item={item}
                    path={'brand_detail'}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }

    _renderNoData = () => {
        return (
            <View style={{flex: 1}}>
                <Text style={{
                    color: COLOR_TEXT_INACTIVE,
                    fontSize: DIMENSION_TEXT_CONTENT,
                    padding: DIMENSION_PADDING_MEDIUM
                }}>
                    Danh sách ưu đãi đang được cập nhật!
                </Text>
            </View>
        )
    }

    _refreshDeals = () => {
        this._fetchData(true);
    }

    _onLoadMoreHandle = () => {
        if (this.state.hasMore) this._fetchData(false);
    }

    _fetchData = (refresh) => {
        dealApi.getDealByBrand(this.props.brand.id, refresh === true || !this.state.deals ? 0 : this.state.deals.size, ITEM_LIMIT)
            .then(response => {
                console.log('TabDealsOfBrand:searchDealOfUser:response', response);
                let deals;
                if (refresh === true || !this.state.deals) {
                    deals = fromJS(response);
                } else {
                    deals = this.state.deals.push(...fromJS(response));
                }

                this.setState({
                    ...this.state,
                    isLoading: false,
                    isRefreshing: false,
                    isFail: false,
                    isSuccess: true,
                    deals: deals,
                    hasMore: response.length >= ITEM_LIMIT,
                })
            })
            .catch(error => {
                console.log('TabDealsOfBrand:searchDealOfUser:error:', error);
                this.setState({
                    ...this.state,
                    isLoading: false,
                    isRefreshing: false,
                    isSuccess: true
                })
            })
    }

    _tabDealOfBrandUpdateSaveDealStatus = (id, is_save, save_count) => {

        const foundIndex = this.state.deals.findIndex((deal, index) => deal.get('id', '') === id);
        if (foundIndex < 0) return;
        let deals = this.state.deals.update(foundIndex, deal => {
            return deal.updateIn(['is_saved'], () => is_save).updateIn(['save_count'], () => save_count);
        });

        this.setState({
            ...this.state,
            deals
        })
    }

    _tabDealOfBrandUpdateFollowBrandStatus = (brand_id, following) => {
        let hasChanged = false;
        const deals = this.state.deals.map((deal, index) => {
            if (deal.getIn(['brand', 'id'], '') !== brand_id) return deal;
            hasChanged = true;
            return deal.updateIn(['is_following'], () => following);
        });
        if (hasChanged) {
            this.setState({
                ...this.state,
                deals
            })
        }
    }

    _onTabDealOfBrandDataChangeDealInfo = (dispatcher) => {
        switch (dispatcher.get('action')) {

            case 'save':
                this._tabDealOfBrandUpdateSaveDealStatus(
                    dispatcher.get('id'),
                    dispatcher.get('is_save'),
                    dispatcher.get('save_count'),
                );
                return;

            case 'follow_brand':
                this._tabDealOfBrandUpdateFollowBrandStatus(
                    dispatcher.get('brand_id'),
                    dispatcher.get('following'),
                );
                return;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!StringUtil.isEmpty(nextProps.dealAction.get('action'))) {
            this._onTabDealOfBrandDataChangeDealInfo(nextProps.dealAction);
        }
        else if (nextProps.isLoginned !== this.props.isLoginned) {
            this._refreshDeals();
        }
    }
}

TabDealsOfBrand.propTypes = {
    brand: PropTypes.object,
    navigation: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        isLoginned: state.loginReducer.isLoginned,

        //deal action dispatcher
        dealAction: state.dealActionReducer,
    }
};

export default connect(mapStateToProps)(TabDealsOfBrand);