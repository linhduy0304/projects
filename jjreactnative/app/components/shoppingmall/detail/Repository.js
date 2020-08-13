import React from 'react'
import {Alert} from "react-native";
import {fromJS, Map} from "immutable";
import {BasePureComponent} from "../../common/BasePureComponent";
import {AnalyticsUtil} from '../../common/analytics/analytics'
import {CommonUtil} from '../../../utils/common-utils'
import {dealApi} from '../../../api/deal-api'
import JJLocationManager from "../../../utils/locationmanager/JJLocationManager";
import {locationChanged} from "../../../utils/locationmanager/action";

const ITEM_LIMIT = 12;
export default class Repository extends BasePureComponent {

    baseSorts = [
        { "sort_type": "newest", "sort_name": "Mới nhất" },
        { "sort_type": "distance", "sort_name": "Gần tôi" },
        { "sort_type": "most_view", "sort_name": "Xem nhiều" },
        { "sort_type": "discount_highest", "sort_name": "Giảm sâu nhất" },
        { "sort_type": "expires", "sort_name": "Sắp hết hạn" }
    ]

    constructor(props, context) {
        super(props, context);
        this.state = {
            isRefreshing: true,
            isResorting: false,
            isError: false,
            hasMore: false,
            isLoadingMore: false,
            isFiltering: false,
            findingLocation: false,
            data: fromJS({
                sortType: 'newest',
                exclusiveDeals: undefined,
                sections: []
            })
        };
    }

    componentDidMount() {
        super.componentDidMount();
        const {mall} = this.props.navigation.state.params;
        this.setState({
            ...this.state,
            data: this.state.data.updateIn(['sections'], (sections) => sections.push(fromJS(mall)))
        }, this._refreshData);

        if (!!mall) {
            AnalyticsUtil.logCurrentScreen(
                'mall_detail',
                {
                    name: mall.name,
                    id: mall.id,
                    slug: mall.slug
                }
            );
        }
    }

    _refreshData = () => {
        this.setState({
            ...this.state,
            isRefreshing: true,
            isError: false
        }, () => {
            this._fetchExclusiveDeals();
        })
    }

    _fetchExclusiveDeals = () => {
        const detailTags = CommonUtil.getDetailTagForFilter(this.state.data.get('filters'));
        const {mall} = this.props.navigation.state.params;

        dealApi.searchDealV4(this.state.data.get('sortType', 'newest'), 'exclusive', detailTags, 0, 5, undefined, mall.slug)
            .then(response => {
                console.log('_fetchExclusiveDeals:response', response);
                return fromJS(response);
            })
            .then(result => {
                let data = this.state.data.updateIn(['exclusiveDeals'], () => result.get('objects'));
                data = data.updateIn(['exclusiveCount'], () => result.getIn(['meta', 'total_count']));

                this.setState({
                    ...this.state,
                    data
                }, () => {
                    this._fetchDeals(true);
                })
            })
            .catch(error => {
                console.log('_fetchExclusiveDeals:error', error);
                this._fetchDeals(true);
            })
    }

    _refreshSectionData = (deals, filters, count) => {
        let sections = this.state.data.get('sections');
        sections = sections.filter((section, index) => index < 1);

        sections = sections.push('deal_count');

        let data = this.state.data;
        data = data.updateIn(['total_deal'], () => count).updateIn(['deal_count'], () => deals.size);

        if (deals.size < 1) {
            data = data.updateIn(['sections'], () => sections);

            this.setState({
                ...this.state,
                isRefreshing: false,
                isResorting: false,
                isLoadingMore: false,
                isFiltering: false,
                hasMore: false,
                data
            });
            return;
        }

        sections = sections.push('sort');

        if (!!this.state.data.get('exclusiveDeals') &&
            this.state.data.get('exclusiveDeals').size > 0) {
            sections = sections.push('exclusiveDeals');
        }

        sections = sections.push(...deals);

        if (data.get('filters') === undefined) {
            const filtersList = filters.sort((item1, item2) => item1.get('priority', 0) - item2.get('priority', 0));
            data = data.updateIn(['filters'], () => filtersList);
        }

        data = data.updateIn(['sections'], () => sections);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            hasMore: deals.size >= ITEM_LIMIT,
            data
        });
    };

    _prepareFilterSectionData = (deals, count) => {

        let data = this.state.data;

        let sections = data.get('sections');
        sections = sections.filter((section, index) => index < 1);

        sections = sections.push('deal_count');

        data = data.updateIn(['total_deal'], () => count).updateIn(['deal_count'], () => deals.size);

        if (deals.size < 1) {
            data = data.updateIn(['sections'], () => sections);

            this.setState({
                ...this.state,
                isRefreshing: false,
                isResorting: false,
                isLoadingMore: false,
                isFiltering: false,
                hasMore: false,
                data
            });
            return;
        }

        sections = sections.push('sort');

        if (!!data.get('exclusiveDeals') &&
            data.get('exclusiveDeals').size > 0) {
            sections = sections.push('exclusiveDeals');
        }

        sections = sections.push(...deals);

        data = data.updateIn(['sections'], () => sections);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            hasMore: deals.size >= ITEM_LIMIT,
            data
        })
    };

    _prepareReSortingSectionData = (deals) => {
        let sections = this.state.data.get('sections');

        sections = sections.filter((section, index) => index < 3);

        if (!!this.state.data.get('exclusiveDeals') &&
            this.state.data.get('exclusiveDeals').size > 0) {
            sections = sections.push('exclusiveDeals');
        }

        sections = sections.push(...deals);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            hasMore: deals.size >= ITEM_LIMIT,
            data: this.state.data.updateIn(['sections'], () => sections).updateIn(['deal_count'], () => deals.size)
        })
    }

    _addMoreDealSectionData = (deals) => {
        let sections = this.state.data.get('sections');
        sections = sections.push(...deals);

        let data = this.state.data.updateIn(['sections'], () => sections);
        data = data.updateIn(['deal_count'], () => data.get('deal_count', 0) + deals.size);

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

    _insertDeal = (deals, filters, count) => {
        if (this.state.isResorting) {
            this._prepareReSortingSectionData(deals);
            return;
        }
        if (this.state.isLoadingMore) {
            this._addMoreDealSectionData(deals);
            return;
        }
        const isFiltering = !!this.state.data.get('filters') ? this.state.data.get('filters').findIndex((item, i) => item.get('selectedCount', 0) > 0) >= 0 : false;
        if (this.state.isRefreshing || this.state.isFiltering) {
            if (!!isFiltering) this._prepareFilterSectionData(deals, count);
            else this._refreshSectionData(deals, filters, count);
        }
    }

    _fetchDeals = (refresh) => {
        let offset = 0;
        if (refresh !== true) {
            offset = this.state.data.get('deal_count', 0);
        }

        const detailTags = CommonUtil.getDetailTagForFilter(this.state.data.get('filters'));
        const {mall} = this.props.navigation.state.params;

        dealApi.searchDealV4(
            this.state.data.get('sortType', 'newest'),
            undefined,
            detailTags,
            offset,
            ITEM_LIMIT,
            undefined,
            mall.slug)
            .then(response => {
                console.log('ShoppingMallDetail:searchDealV4:response', response);
                return fromJS(response);
            })
            .then(result => {
                this._insertDeal(result.get('objects'), result.getIn(['meta', 'advanced_filters']), result.getIn(['meta', 'total_count']));

                this._logImpression(result.get('objects'));
            })
            .catch(error => {
                console.log('ShoppingMallDetail:searchDealV4:error', error);
                this.setState({
                    ...this.state,
                    isRefreshing: false,
                    isResorting: false,
                    isLoadingMore: false,
                    isFiltering: false,
                    isError: refresh
                })
            })
    }

    _onShoppingMallViewMoreExclusiveDealClicked = () => {
        if (!this.state.data) {
            this.props.navigation.push('SubCategory', {
                screenType: 'doc-quyen',
                title: 'ĐỘC QUYỀN - CHỈ CÓ TẠI JAMJA'
            });
            return;
        }

        const {mall} = this.props.navigation.state.params;

        let params = {
            screenType: 'doc-quyen',
            title: mall.name,
            lastFilters: this.state.data.get('filters'),
            mallSlug: mall.slug
        };

        this.props.navigation.push('SubCategory', params);
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
            this._fetchExclusiveDeals();
        })
    }

    _onSortSelected = (item) => {
        if (item.sort_type === this.state.data.get('sortType')) return;

        if (!this.props.latitude || !this.props.longitude) {
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
                                        }, this._fetchExclusiveDeals);
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
        }, this._fetchExclusiveDeals);
    }

    _logImpression = (deals) => {
        if (deals === undefined || deals === null) return;
        const dealSlugs = deals.filter((deal, i) => i < 5).map(
            (deal, index) => {
                return {
                    index: index,
                    item_id: deal.get('slug', ''),
                    item_name: deal.get('slug', ''),
                    item_brand: deal.getIn(['brand','id']),
                    deal_type: deal.get('deal_type')
                }
            }
        );
        AnalyticsUtil.logViewDealListEmpression('mall_detail', dealSlugs);
    }

    _shoppingMallUpdateSaveDealStatus = (id, is_save, save_count) => {

        let sections = undefined;
        let exclusiveDeals = undefined;
        if (!!this.state.data.get('exclusiveDeals')) {
            const foundIndex = this.state.data.get('exclusiveDeals').findIndex((deal, index) => deal.get('id', '') === id);
            if (foundIndex >= 0) {
                exclusiveDeals = this.state.data.get('exclusiveDeals').update(foundIndex, deal => {
                    return deal.updateIn(['is_saved'], () => is_save).updateIn(['save_count'], () => save_count);
                });
            }
        }
        if (!!this.state.data.get('sections')) {
            const foundIndex = this.state.data.get('sections').findIndex((section, index) => Map.isMap(section) && section.get('id', '') === id);
            if (foundIndex >= 0) {
                sections = this.state.data.get('sections').update(foundIndex, deal => {
                    return deal.updateIn(['is_saved'], () => is_save).updateIn(['save_count'], () => save_count);
                });
            }
        }

        let data = this.state.data;
        if (!!sections) {
            data = data.updateIn(['sections'], () => sections);
        }
        if (!!exclusiveDeals) {
            data = data.updateIn(['exclusiveDeals'], () => exclusiveDeals);
        }

        if (!!sections || !!exclusiveDeals) {
            this.setState({
                ...this.state,
                data
            })
        }
    }

    _shoppingMallUpdateFollowBrandStatus = (brand_id, following) => {
        let sections = undefined;
        let exclusiveDeals = undefined;
        if (!!this.state.data.get('sections')) {
            let hasChanged = false;
            const maps = this.state.data.get('sections').map((section, i) => {
                if (typeof section === 'string') return section;
                if (section.getIn(['brand', 'id'], '') !== brand_id) return section;
                hasChanged = true;
                return section.updateIn(['is_following'], () => following);
            });
            if (hasChanged) sections = maps;
        }
        if (!!this.state.data.get('exclusiveDeals')) {
            let hasChanged = false;
            const deals = this.state.data.get('exclusiveDeals').map((deal, i) => {
                if (deal.getIn(['brand', 'id'], '') !== brand_id) return deal;
                hasChanged = true;
                return deal.updateIn(['is_following'], () => following);
            });
            if (hasChanged) exclusiveDeals = deals;
        }

        let data = this.state.data;
        if (!!sections) {
            data = data.updateIn(['sections'], () => sections)
        }
        if (!!exclusiveDeals) {
            data = data.updateIn(['exclusiveDeals'], () => exclusiveDeals);
        }

        if (!!sections || !!exclusiveDeals) {
            this.setState({
                ...this.state,
                data
            })
        }
    }

    _onShoppingMallDataChangeDealInfo = (dispatcher) => {
        switch (dispatcher.get('action')) {

            case 'save':
                this._shoppingMallUpdateSaveDealStatus(
                    dispatcher.get('id'),
                    dispatcher.get('is_save'),
                    dispatcher.get('save_count'),
                );
                return;

            case 'follow_brand':
                this._shoppingMallUpdateFollowBrandStatus(
                    dispatcher.get('brand_id'),
                    dispatcher.get('following'),
                );
                return;
        }
    }
}