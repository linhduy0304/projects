import { connect } from 'react-redux';
import {Container, Text} from 'native-base';
import {View, ActivityIndicator, VirtualizedList} from 'react-native';
import React from 'react';
import {Map} from "immutable";

import {COLOR_GRAY_BG, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from '../../../resources/colors';
import BigDealItem from '../../common/BigDealItem';
import JJHeader from '../../common/JJHeader';
import Repository from "./Repository";
import {DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import FilterButton from '../../common/section/FilterButton'
import {StringUtil} from '../../../utils/string-util'
import HeaderMallDetail from './HeaderMallDetail'
import Section from '../../common/Section'
import SortList from '../../common/section/SortList'
import EmptyResultWithFilter from '../../common/section/EmptyResultWithFilter'
import HorizontalListWithSectionHeaderNotBottomLine
    from "../../common/section/HorizontalListWithSectionHeaderNotBottomLine";

class ShoppingMallDetail extends Repository {

    render() {
        return (
            <Container>
                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={true}
                    filter={'TTTM'}
                    rightItem={() => this._renderFilterButton()}
                />
                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG }}>
                    {this._renderContent()}
                </View>
            </Container>
        )
    }

    _renderFilterButton = () => {
        let count = 0;
        if (!!this.state.data.get('filters')) {
            this.state.data.get('filters').map((item, i) => {
                count += item.get('selectedCount', 0);
            })
        }
        return (
            <FilterButton onPress={this._onFilterClicked}
                          navigation={this.props.navigation}
                          badgeNumber={count}/>
        )
    }

    _renderContent = () =>
        (
            <VirtualizedList
                style={{flex: 1}}
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshData}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                data={this.state.data.get('sections')}
                getItem={this._getItem}
                getItemCount={this._getItemCount}
                onEndReachedThreshold={0.5}
                onEndReached={this._onLoadMore}
                keyExtractor={this._getKeyExtractor}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderEmpty}
                ListFooterComponent={this._renderFooter}
                removeClippedSubviews={true}
            />
        );

    _getItem = (data, index) => data.get(index);

    _getItemCount = (data) => !!data ? data.size : 0;

    _getKeyExtractor = (item, index) => {
        let key = `mall_detail_section_${index}_`;
        if (item) {
            if (Map.isMap(item)) {
                key += item.get('id', '');
            }
            else {
                key += index
            }
        }
        return key;
    }

    _renderFooter = () => {
        return (
            <View>
                {
                    this.state.hasMore &&
                    <ActivityIndicator animating={true}
                                       size={'small'}
                                       color={COLOR_PRIMARY}
                                       style={{marginTop: DIMENSION_PADDING_MEDIUM}}/>
                }
                <View style={{height: DIMENSION_PADDING_LARGE}}/>
            </View>
        )
    }

    _onLoadMore = () => {
        console.log('_onLoadMore');
        if (this.state.hasMore && !this.state.isLoadingMore && this.state.isRefreshing !== true) {
            this.setState({
                ...this.state,
                isLoadingMore: true
            }, () => {
                this._fetchDeals(false);
            })
        }
    }

    _renderItem = ({ item, index }) => {
        if (Map.isMap(item)) {
            if (index === 0) return <HeaderMallDetail mall={item}/>;
            else return this._renderDeal(item);
        }
        if (typeof item !== 'string') return;

        switch (item) {
            case 'deal_count':
                return <Section title={`${this.state.data.get('total_deal', 0)} KHUYẾN MÃI`}/>;
            case 'sort':
                return <SortList selectedSortType={this.state.data.get('sortType', 'newest')}
                                 loading={this.state.isResorting}
                                 onSortSelected={this._onSortSelected}
                                 sorts={this.baseSorts}/>;

            case 'exclusiveDeals':
                return this._renderExclusiveDeals();
            default:
                return null;
        }
    }

    _renderExclusiveDeals = () => {
        if (!this.state.data.get('exclusiveDeals') || this.state.data.get('exclusiveDeals').size < 1) return null;
        return (
            <View>
                <HorizontalListWithSectionHeaderNotBottomLine
                    navigation={this.props.navigation}
                    deals={this.state.data.get('exclusiveDeals')}
                    title={'ĐỘC QUYỀN - CHỈ CÓ TẠI JAMJA'}
                    showMore={this.state.data.get('exclusiveCount', 0) > 5}
                    path={'shopping_mall_detail'}
                    screenType={'doc-quyen'}
                    onViewMoreExclusive={this._onShoppingMallViewMoreExclusiveDealClicked}/>

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: DIMENSION_TEXT_CONTENT,
                    marginTop: DIMENSION_PADDING_LARGE,
                    marginLeft: DIMENSION_PADDING_LARGE,
                    color: COLOR_TEXT_INACTIVE
                }}>
                    TẤT CẢ KHUYẾN MÃI
                </Text>
            </View>
        )
    }

    _renderDeal = (data) => {
        return (
            <View style={{marginTop: DIMENSION_PADDING_MEDIUM}}>
                <BigDealItem navigation={this.props.navigation}
                             path={'shopping_mall_detail'}
                             item={data.toJS()}/>
            </View>
        )
    }

    _renderEmpty = () => {
        if (this.state.isRefreshing || this.state.isFiltering) return null;

        let count = 0;
        if (!!this.state.data.get('filters')) {
            this.state.data.get('filters').map((item, i) => {
                count += item.get('selectedCount', 0);
            })
        }
        return (
            <EmptyResultWithFilter onOpenFilter={this._onFilterClicked}
                                   filterCount={count > 0 ? count : ''}/>
        )
    }

    componentWillReceiveProps(nextProps) {
        if ((!!nextProps.selectedProvinceId && nextProps.selectedProvinceId !== this.props.selectedProvinceId) ||
            (!!nextProps.isLoginned && nextProps.isLoginned !== this.props.isLoginned)) {
            this._refreshData();
        }
        else if (!StringUtil.isEmpty(nextProps.dealAction.get('action'))) {
            this._onShoppingMallDataChangeDealInfo(nextProps.dealAction);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        //Location
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
        selectedProvinceId: state.locationReducer.getIn(['province', 'id']),

        isLoginned: state.loginReducer.isLoginned,

        //deal action dispatcher
        dealAction: state.dealActionReducer,
    }
};

export default connect(mapStateToProps)(ShoppingMallDetail);
