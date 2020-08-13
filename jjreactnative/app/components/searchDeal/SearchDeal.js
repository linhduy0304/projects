import React from 'react'
import { Container } from 'native-base';
import {Alert, View, VirtualizedList} from 'react-native';
import {connect} from "react-redux";
import {fromJS} from 'immutable'
import {COLOR_GRAY_BG} from "../../resources/colors";

import SearchDealKeywordInput from './keywordInput/SearchDealKeywordInput'

import JJHeader from '../common/JJHeader';
import ErrorView from "../common/ErrorView";
import BigDealItem from "../common/BigDealItem";
import Section from "../common/Section";
import LoadMoreView from "../common/LoadMoreView";
import {dealApi} from '../../api/deal-api'
import {BasePureComponent} from "../common/BasePureComponent";
import {StringUtil} from '../../utils/string-util'
import {AnalyticsUtil} from "../common/analytics/analytics";
import SortList from "../common/section/SortList";
import FilterButton from "../common/section/FilterButton";
import {CommonUtil} from "../../utils/common-utils";
import {DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import EmptyResultWithFilter from "../common/section/EmptyResultWithFilter";
import JJLocationManager from "../../utils/locationmanager/JJLocationManager";
import {locationChanged} from "../../utils/locationmanager/action";
import LocationLoadingView from "../common/view/LocationLoadingView";

const ITEM_LIMIT = 12;

class SearchDeal extends BasePureComponent {

    baseSorts = [
        { "sort_type": "newest", "sort_name": "Mới nhất" },
        { "sort_type": "distance", "sort_name": "Gần tôi" },
        { "sort_type": "most_view", "sort_name": "Xem nhiều" },
        { "sort_type": "discount_highest", "sort_name": "Giảm sâu nhất" },
        { "sort_type": "expires", "sort_name": "Sắp hết hạn" }
    ]

    constructor(props) {
        super(props);
        this.state = {
            firstOpen: true,
            isOpeningKeywordInput: true,
            keyword: undefined,
            data: fromJS({
                sort_type: 'newest'
            }),
            isRefreshing: false, //refreshing data status
            isResorting: false, //sorting data status
            isError: false, //error flat
            hasMore: false, //has more deal flat
            isLoadingMore: false, //loading more status
            findingLocation: false
        }
    }

    componentDidMount() {
        super.componentDidMount();
        AnalyticsUtil.logCurrentScreen('search_deal');
    }

    render() {
        if ((!this.state.keyword && this.state.firstOpen) || this.state.isOpeningKeywordInput) {
            return <SearchDealKeywordInput navigation={this.props.navigation}
                                           keyword={this.state.keyword}
                                           onClose={this._onCloseTypeKeywordPage}
                                           onKeywordSelected={this._onKeywordEntered}/>;
        }

        return (
            <Container>
                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={true}
                    filter={"\"" + this.state.keyword + "\""}
                    searchKeywordStyle={{fontWeight: 'bold'}}
                    onSearchPressed={this._onSearchPressed}
                    rightItem={this._renderFilterButton}
                    hideBanner={true}
                />
                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG }}>
                    {this._renderMainContent()}
                </View>
                {
                    !!this.state.findingLocation &&
                    <LocationLoadingView onCancelPressed={this._onCancelGetLocationClicked}/>
                }
            </Container>
        )
    }

    _renderMainContent = () => {
        if (this.state.isError && !this.state.isLoading) {
            return <ErrorView onTryAgain={this._refreshDeals} />
        }

        return this._renderListView();
    }

    _renderListView = () => {
        return (
            <VirtualizedList
                style={{flex: 1}}
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshDeals}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                data={this.state.data.get('deals')}
                getItem={this._getItem}
                getItemCount={this._getItemCount}
                onEndReachedThreshold={0.5}
                onEndReached={this._onLoadMore}
                keyExtractor={this._itemKeyGenerator}
                renderItem={this._renderItem}
                ListHeaderComponent={this._renderHeader()}
                ListEmptyComponent={this._renderNoData}
                ListFooterComponent={this._renderFooter}
                ItemSeparatorComponent={this._renderItemSeparator}
                removeClippedSubviews={true}
            />
        )
    }

    _renderItemSeparator = () => <View style={{width: '100%', height: DIMENSION_PADDING_MEDIUM}}/>;

    _renderNoData = () => {
        if (this.state.isRefreshing || this.state.isFiltering) return null;

        let count = 0;
        if (!!this.state.data.get('filters')) {
            this.state.data.get('filters').map((item, i) => {
                count += item.get('selectedCount', 0);
            })
        }
        return (
            <EmptyResultWithFilter onOpenFilter={this._onFilterClicked}
                                   filterCount={count > 0 ? count : ''}
                                   keyword={this.state.keyword}/>
        )
    }

    _getItemCount = (data) => !!data ? data.size : 0;

    _getItem = (data, index) => data.get(index);

    _itemKeyGenerator = (item, index) => `search_d_item_${index}_${item.get('id')}`;

    _renderSeparator = () => <View style={{ height: 16, backgroundColor: COLOR_GRAY_BG }} />;

    _renderItem = ({ item }) => <BigDealItem item={item.toJS()} navigation={this.props.navigation} path={'search'}/>;

    _renderHeader = () => {
        if (!this.state.data || !this.state.data.get('deals') || this.state.data.get('deals').size < 1) return null;
        return (
            <View style={{marginTop: -16}}>
                <Section title={`${this.state.data.get('total_count', 0)} KHUYẾN MÃI`}/>
                <SortList selectedSortType={this.state.data.get('sortType', 'newest')}
                          loading={this.state.isResorting}
                          onSortSelected={this._onSortSelected}
                          sorts={this.baseSorts}/>
            </View>
        )
    }

    _renderFooter = () => {
        if (!this.state.hasMore) {
            return this._renderSeparator()
        } else {
            return <LoadMoreView />
        }
    };

    _onCancelGetLocationClicked = () => {
        this.setState({
            ...this.state,
            findingLocation: false
        })
    }

    _onSearchPressed = () => {
        this.setState(
            {
                ...this.state,
                isOpeningKeywordInput: true
            })
    }

    _onCloseTypeKeywordPage = () => {
        if (this.state.firstOpen) this.props.navigation.goBack()
        else this.setState(
            {
                ...this.state,
                isOpeningKeywordInput: false
            })
    }

    _renderFilterButton = () => {
        let count = 0;
        if (!!this.state.data.get('filters')) {
            this.state.data.get('filters').map((item, i) => {
                count += item.get('selectedCount', 0);
            })
        }
        if (count < 1 && (!this.state.data || !this.state.data.get('deals') || this.state.data.get('deals').size < 1)) return null;
        return (
            <FilterButton onPress={this._onFilterClicked}
                          navigation={this.props.navigation}
                          badgeNumber={count}/>
        )
    }

    _onFilterClicked = () => {
        console.log('_onFilterClicked', this.state.data.toJS());
        if (this.state.data === undefined || this.state.data.get('filters') === undefined) return;
        this.props.navigation.navigate('SearchFilter',
            {
                filters: this.state.data.getIn(['filters']),
                onSubmit: this._onSubmitFilter
            })
    }

    _onSubmitFilter = (filters) => {
        const data = this.state.data.updateIn(['filters'], () => filters);
        this.setState({
            ...this.state,
            isRefreshing: true,
            isFiltering: true,
            data
        }, () => {
            this._fetchDeal(true);
        })
    }

    _fetchDeal = (refresh) => {
        let offset = 0;
        if (refresh !== true) {
            offset = !!this.state.data.get('deals') ? this.state.data.get('deals').size : 0;
        }

        let detailTags = CommonUtil.getDetailTagForFilter(this.state.data.get('filters'));
        console.log('_fetchDeal', offset, detailTags);

        dealApi.searchDeal(this.state.data.get('sortType', 'newest'), this.state.keyword, detailTags, offset, ITEM_LIMIT)
            .then(response => {
                console.log('TabBooking:searchDealV4:response', response);
                this._logImpression(response.objects);
                return fromJS(response);
            })
            .then(result => {
                this._insertDeal(result.get('objects'), result.getIn(['meta', 'advanced_filters']), result.getIn(['meta', 'total_count']))
            })
            .catch(error => {
                console.log('TabBooking:searchDealV4:error', error);
                this.setState({
                    ...this.state,
                    isRefreshing: false,
                    isResorting: false,
                    isLoadingMore: false,
                    isError: true,
                    isFiltering: false,
                })
            })
    }

    _prepareReSortingSectionData = (deals) => {
        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            isChangingProvince: false,
            hasMore: deals.size >= ITEM_LIMIT,
            data: this.state.data.updateIn(['deals'], () => deals)
        })
    }

    _addMoreDealSectionData = (deals) => {
        let dls = this.state.data.get('deals');
        if (!dls) dls = deals;
        else dls = dls.push(...deals);

        let data = this.state.data.updateIn(['deals'], () => dls);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            hasMore: deals.size >= ITEM_LIMIT,
            data
        })
    }

    _refreshSectionData = (deals, filters, count) => {
        let data = this.state.data.updateIn(['deals'], () => deals);
        data = data.updateIn(['total_count'], () => count);

        if (data.get('filters') === undefined) {
            const filtersList = filters.sort((item1, item2) => item1.get('priority', 0) - item2.get('priority', 0));
            data = data.updateIn(['filters'], () => filtersList);
        }

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            hasMore: deals.size >= ITEM_LIMIT,
            data
        })
    }

    _insertDeal = (deals, filters, deal_count) => {
        if (this.state.isResorting) {
            this._prepareReSortingSectionData(deals);
            return;
        }
        if (this.state.isLoadingMore) {
            this._addMoreDealSectionData(deals);
            return;
        }
        if (this.state.isRefreshing || this.state.isFiltering) {
            this._refreshSectionData(deals, filters, deal_count);
        }
    }

    _onKeywordEntered = (keyword) => {
        let data = this.state.data;
        data = data.updateIn(['filters'], () => undefined);
        data = data.updateIn(['total_count'], () => 0);
        data = data.updateIn(['deals'], () => undefined);

        this.setState({
            ...this.state,
            firstOpen: false,
            isRefreshing: true,
            isOpeningKeywordInput: false,
            keyword: keyword,
            data
        }, () => {
            this._fetchDeal(true);
        });
    }

    _refreshDeals = () => {
        this._fetchDeal(true);
    }

    _onLoadMore = () => {
        console.log('_onLoadMore');
        if (this.state.hasMore && !this.state.isLoadingMore && this.state.isRefreshing !== true) {
            this.setState({
                ...this.state,
                isLoadingMore: true
            }, () => {
                this._fetchDeal(false);
            })
        }
    };

    _onSortSelected = (item) => {
        if (item.sort_type === this.state.data.get('sortType')) return;

        if (item.sort_type === 'distance' && (!this.props.latitude || !this.props.longitude)) {
            Alert.alert(
                'Bật dịch vụ định vị',
                'Để hiển thị các Ưu đãi gần bạn nhất, cho phép JAMJA truy cập dịch vụ định vị?',
                [
                    {
                        text: "Bật",
                        onPress: () => {
                            this.setState({
                                ...this.state,
                                findingLocation: true
                            }, () => {
                                const locationManager = new JJLocationManager();
                                locationManager.fetchLocation(
                                    (latitude, longitude) => {
                                        console.log('fetchLocation:', latitude, longitude);
                                        this.props.dispatch(locationChanged(latitude, longitude));
                                        this.setState({
                                            ...this.state,
                                            findingLocation: false,
                                            data: this.state.data.updateIn(['sortType'], () => item.sort_type),
                                            isResorting: true
                                        }, this._refreshDeals);
                                    },
                                    error => {
                                        console.log('fetchLocation:error', error);
                                        this.setState({
                                            ...this.state,
                                            findingLocation: false
                                        }, () => Alert.alert('Lỗi', error));
                                    }
                                )
                            });
                        }
                    },
                    {
                        text: "Đóng",
                        onPress: () => {}
                    }
                ],
                { cancelable: true }
            );
            return;
        }
        this.setState({
            ...this.state,
            data: this.state.data.updateIn(['sortType'], () => item.sort_type),
            isResorting: true
        }, () => {
            this._fetchDeal(true);
        });
    };

    _logImpression = (deals) => {
        if (deals === undefined || deals === null) return;
        const dealSlugs = deals.filter((deal, i) => i < 5).map(
            (deal, index) => {
                return {
                    index: index,
                    item_id: deal.slug,
                    item_name: deal.slug,
                    item_brand: !!deal.brand ? deal.brand.id : undefined,
                    deal_type: deal.deal_type
                }
            }
        );
        AnalyticsUtil.logSearchDealListEmpression(this.state.keyword, dealSlugs);
    }

    _searchDealUpdateLikeDealStatus = (slug, up_vote_count, is_vote_up, down_vote_count, is_vote_down) => {
        try {
            if (!this.state.data || !this.state.data.get('deals')) return;

            const foundIndex = this.state.data.get('deals').findIndex((deal, index) => deal.get('slug', '') === slug);
            if (foundIndex < 0) return;
            let deals = this.state.data.get('deals').update(foundIndex, deal => {
                return deal.updateIn(['up_vote_count'], () => up_vote_count)
                    .updateIn(['is_vote_up'], () => is_vote_up)
                    .updateIn(['down_vote_count'], () => down_vote_count)
                    .updateIn(['is_vote_down'], () => is_vote_down);
            });

            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['deals'], () => deals)
            })
        } catch (e) {
            console.log(e);
            AnalyticsUtil.logCrash(e, 0, '_searchDealUpdateLikeDealStatus');
        }
    }

    _searchDealUpdateSaveDealStatus = (id, is_save, save_count) => {
        try {
            if (!this.state.data || !this.state.data.get('deals')) return;

            const foundIndex = this.state.data.get('deals').findIndex((deal, index) => deal.get('id', '') === id);
            if (foundIndex < 0) return;
            let deals = this.state.data.get('deals').update(foundIndex, deal => {
                return deal.updateIn(['is_saved'], () => is_save).updateIn(['save_count'], () => save_count);
            });

            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['deals'], () => deals)
            })
        } catch (e) {
            console.log(e);
            AnalyticsUtil.logCrash(e, 0, '_searchDealUpdateSaveDealStatus');
        }
    }

    _searchDealUpdateCheckInDealStatus = (slug, check_in_id, checked_in, check_in_count) => {
        try {
            if (!this.state.data || !this.state.data.get('deals')) return;

            const foundIndex = this.state.data.get('deals').findIndex((deal, index) => deal.get('slug', '') === slug);
            if (foundIndex < 0) return;
            let deals = this.state.data.get('deals').update(foundIndex, deal => {
                return deal.updateIn(['check_in_id'], () => check_in_id)
                    .updateIn(['checked_in'], () => checked_in)
                    .updateIn(['check_in_count'], () => check_in_count);
            });

            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['deals'], () => deals)
            })
        } catch (e) {
            console.log(e);
            AnalyticsUtil.logCrash(e, 0, '_searchDealUpdateCheckInDealStatus');
        }
    }

    _searchDealUpdateFollowBrandStatus = (brand_id, following) => {
        try {
            if (!this.state.data || !this.state.data.get('deals')) return;

            let hasChanged = false;
            const deals = this.state.data.get('deals').map((deal, index) => {
                if (deal.getIn(['brand', 'id'], '') !== brand_id) return deal;
                hasChanged = true;
                return deal.updateIn(['is_following'], () => following);
            });
            if (hasChanged) {
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn(['deals'], () => deals)
                })
            }
        } catch (e) {
            console.log(e);
            AnalyticsUtil.logCrash(e, 0, '_searchDealUpdateFollowBrandStatus');
        }
    }

    _onSearchDealDataChangeDealInfo = (dispatcher) => {
        switch (dispatcher.get('action')) {
            case 'like':
                this._searchDealUpdateLikeDealStatus(
                    dispatcher.get('slug'),
                    dispatcher.get('up_vote_count'),
                    dispatcher.get('is_vote_up'),
                    dispatcher.get('down_vote_count'),
                    dispatcher.get('is_vote_down'),
                );
                return;

            case 'save':
                this._searchDealUpdateSaveDealStatus(
                    dispatcher.get('id'),
                    dispatcher.get('is_save'),
                    dispatcher.get('save_count'),
                );
                return;

            case 'check_in':
                this._searchDealUpdateCheckInDealStatus(
                    dispatcher.get('slug'),
                    dispatcher.get('check_in_id'),
                    dispatcher.get('checked_in'),
                    dispatcher.get('check_in_count'),
                );
                return;
            case 'follow_brand':
                this._searchDealUpdateFollowBrandStatus(
                    dispatcher.get('brand_id'),
                    dispatcher.get('following'),
                );
                return;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!StringUtil.isEmpty(nextProps.dealAction.get('action'))) {
            this._onSearchDealDataChangeDealInfo(nextProps.dealAction);
        }
        else if (nextProps.isLoginned !== this.props.isLoginned) {
            this._refreshDeals();
        }
    }
}

const mapStateToProps = (state) => {
    return {
        //user
        isLoginned: state.loginReducer.isLoginned,
        //Location
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),

        //deal action dispatcher
        dealAction: state.dealActionReducer
    }
};

export default connect(mapStateToProps)(SearchDeal);