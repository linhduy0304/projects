import React from 'react'
import {Alert} from "react-native";
import {fromJS, Map} from "immutable";

import {BasePureComponent} from "../../common/BasePureComponent";
import {collectionApi} from "../../../api/collection-api";
import {dealApi} from "../../../api/deal-api";
import {CommonUtil} from "../../../utils/common-utils";
import {StringUtil} from "../../../utils/string-util";
import {AnalyticsUtil} from "../../common/analytics/analytics";
import {saveCollection} from '../../collection/data/action'
import {ObjectUtil} from '../../../utils/object-utils'
import JJLocationManager from "../../../utils/locationmanager/JJLocationManager";
import {locationChanged} from "../../../utils/locationmanager/action";

const ITEM_LIMIT = 12;

export default class Repository extends BasePureComponent {

    baseSorts = [
        { "sort_type": "newest", "sort_name": "Mới nhất" },
        { "sort_type": "most_view", "sort_name": "Xem nhiều" },
        { "sort_type": "discount_highest", "sort_name": "Giảm sâu nhất" },
        { "sort_type": "expires", "sort_name": "Sắp hết hạn" }
    ];

    baseSections;

    isSubCatMode = false;

    constructor(props, context) {
        super(props, context);

        console.log('Category:constructor', props);

        const {screenType, detailTag, onlyExclusive, mallSlug, lastFilters} = ObjectUtil.getValue(props, {}, ['navigation', 'state', 'params']);


        this.isSubCatMode = !StringUtil.isEmpty(detailTag);
        if (!!this.isSubCatMode || !!onlyExclusive || !!mallSlug) {
            this.baseSections = ['deal_count'];
        }
        else {
            this.baseSections = ['trends', 'sub_list', 'collections', 'deal_count'];
        }

        if (screenType !== 'ma-giam-gia') {
            this.baseSorts.splice(1, 0, { "sort_type": "distance", "sort_name": "Gần tôi" });
        }

        const data = {
            sortType: 'newest',
            trends: undefined,
            collections: [],
            exclusiveDeals: undefined,
            sections: fromJS(this.baseSections),
        };

        if (!!lastFilters) {
            data.filters = lastFilters;
        }

        this.state = {
            isFilterMode: false,
            isRefreshing: true,
            isResorting: false,
            isError: false,
            hasMore: false,
            isLoadingMore: false,
            isFiltering: false,
            data: fromJS(data)
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this._refreshData();

        const {screenType, title, detailTag} = this.props.navigation.state.params;

        AnalyticsUtil.logCurrentScreen(
            'category',
            {
                screen_type: screenType,
                name: title,
                ...detailTag
            }
        );
    }

    _onPullToRefreshCatAction = () => {
        if (this.state.isFilterMode) {
            this._fetchExclusiveDeals();
            return;
        }
        this._refreshData();
    }

    _refreshData = () => {
        const {onlyExclusive, mallSlug} = ObjectUtil.getValue(this.props, {}, ['navigation', 'state', 'params']);

        if (!!this.isSubCatMode || !!onlyExclusive || !!mallSlug) {
            this._refreshSubCatMode();
        }
        else {
            this._refreshFullCatMode();
        }
    }

    _refreshSubCatMode = () => {
        let data = this.state.data;
        let sections = fromJS([]);

        if (data.getIn(['sections', 0]) !== 'deal_count') {
            sections = sections.push('deal_count');
        }

        data = data.updateIn(['sections'], () => sections);

        this.setState({
            ...this.state,
            isRefreshing: true,
            isError: false,
            data
        }, this._fetchExclusiveDeals);
    }

    _refreshFullCatMode = () => {
        let data = this.state.data;
        let sections = fromJS([]);
        if (data.getIn(['sections', 0]) !== 'trends') {
            sections = sections.push(...fromJS(this.baseSections));
        }
        sections = sections.push(...data.get('sections'));

        data = data.updateIn(['sections'], () => sections);

        this.setState({
            ...this.state,
            isRefreshing: true,
            isError: false,
            data
        }, this._fetchTrends);
    }

    _fetchTrends = () => {
        if (
            StringUtil.isBlank(this.props.navigation.state.params.screenType) ||
            !StringUtil.isEmpty(this.props.navigation.state.params.detailTag)) {

            this._fetchExclusiveDeals();
            return;
        }
        collectionApi.getTrendingCollection(this.props.navigation.state.params.screenType)
            .then(result => {
                console.log('getTrendingCollection:response', result);
                const collections = result.objects;
                if (!!collections && collections.length > 0) {
                    this.setState({
                        ...this.state,
                        data: this.state.data.updateIn(['trends'], () => fromJS(collections[0].deals))
                            .updateIn(['collections'], () => fromJS(collections[0].collections))
                    }, this._fetchExclusiveDeals)
                }
                else {
                    this._fetchExclusiveDeals();
                }

            }).catch(error => {
                console.log('getTrendingCollection', error);
                this._fetchExclusiveDeals();
            })
    }

    _fetchExclusiveDeals = () => {
        const {screenType, onlyExclusive} = this.props.navigation.state.params;
        if (StringUtil.isBlank(screenType) || screenType === 'dat-cho' || screenType === 'doc-quyen' || !!onlyExclusive) {
            this._fetchDeals(true);
            return;
        }

        const detailTags = CommonUtil.getDetailTagForFilter(this.state.data.get('filters'), this.props.navigation.state.params.detailTag);

        dealApi.searchDealV4(this.state.data.get('sortType', 'newest'), 'exclusive', detailTags, 0, 5, screenType)
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

    _fetchDeals = (refresh) => {
        let offset = 0;
        if (refresh !== true) {
            offset = this.state.data.get('deal_count', 0);
        }

        const {screenType, detailTag, onlyExclusive, mallSlug} = ObjectUtil.getValue(this.props, {}, ['navigation', 'state', 'params']);

        const detailTags = CommonUtil.getDetailTagForFilter(this.state.data.get('filters'), detailTag);
        console.log('_fetchDeal', offset, detailTags, detailTag);

        dealApi.searchDealV4(
            this.state.data.get('sortType', 'newest'),
            !!onlyExclusive ? 'exclusive' : undefined,
            detailTags,
            offset,
            ITEM_LIMIT,
            screenType,
            mallSlug)
            .then(response => {
                console.log('TabBooking:searchDealV4:response', response);
                return fromJS(response);
            })
            .then(result => {
                this._insertDeal(result.get('objects'), result.getIn(['meta', 'advanced_filters']), result.getIn(['meta', 'total_count']));
                this._logImpression(result.get('objects'));
            })
            .catch(error => {
                console.log('TabBooking:searchDealV4:error', error);
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

    _setEmptyDeal = () => {
        let sections = fromJS([]);
        if (!this.state.isFiltering) {
            sections = fromJS(this.baseSections);
            sections = sections.push('empty');
        }
        let data = this.state.data.updateIn(['sections'], () => sections);
        data = data.updateIn(['deal_count'], () => 0);
        data = data.updateIn(['total_deal'], () => 0);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            hasMore: false,
            data
        })
    }

    _refreshSectionData = (deals, filters, count) => {
        let sections = this.state.data.get('sections');
        sections = sections.clear();

        if (deals.size < 1) {
            this._setEmptyDeal();
            return;
        }

        if (!!this.state.data.get('trends') &&
            this.state.data.get('trends').size > 0) {
            sections = sections.push('trends');
        }

        const {subList, lastFilters} = this.props.navigation.state.params;

        if (!!subList &&
            subList.size > 0) {
            sections = sections.push('sub_list');
        }

        if (!!this.state.data.get('collections') &&
            this.state.data.get('collections').size > 0) {
            sections = sections.push('collections');
        }

        sections = sections.push('deal_count');
        sections = sections.push('sort');

        if (!!this.state.data.get('exclusiveDeals') &&
            this.state.data.get('exclusiveDeals').size > 0) {
            sections = sections.push('exclusiveDeals');
        }

        sections = sections.push(...deals);

        let data = this.state.data;
        if (data.get('filters') === undefined) {
            let filtersList = undefined;
            if (!!lastFilters) {
                filtersList = lastFilters;
            }
            else {
                filtersList = filters.sort((item1, item2) => item1.get('priority', 0) - item2.get('priority', 0));
            }
            data = data.updateIn(['filters'], () => filtersList);
        }
        data = data.updateIn(['sections'], () => sections).updateIn(['total_deal'], () => count).updateIn(['deal_count'], () => deals.size);


        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            hasMore: false,
            data
        }, () => this._updateHasMore(deals.size))
    }

    _prepareFilterSectionData = (deals, count) => {
        let sections = this.state.data.get('sections');
        sections = sections.clear();

        if (deals.size < 1) {
            this._setEmptyDeal(true);
            return;
        }

        sections = sections.push('deal_count');
        sections = sections.push('sort');

        if (!!this.state.data.get('exclusiveDeals') &&
            this.state.data.get('exclusiveDeals').size > 0) {
            sections = sections.push('exclusiveDeals');
        }

        sections = sections.push(...deals);

        let data = this.state.data;
        data = data.updateIn(['sections'], () => sections).updateIn(['total_deal'], () => count).updateIn(['deal_count'], () => deals.size);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            hasMore: false,
            isOverlayLoading: false,
            data
        }, () => this._updateHasMore(deals.size))
    }

    _prepareReSortingSectionData = (deals) => {
        let sections = this.state.data.get('sections');

        sections = sections.filter((section, index) => typeof section === 'string');
        sections = sections.push(...deals);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            hasMore: false,
            data: this.state.data.updateIn(['sections'], () => sections).updateIn(['deal_count'], () => deals.size)
        }, () => this._updateHasMore(deals.size));
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
            hasMore: false,
            data
        }, () => this._updateHasMore(deals.size))
    }

    _updateHasMore = (size) => {
        if (size < ITEM_LIMIT) return;
        setTimeout(() => {
            if (!this.mounted) return;
            this.setState({
                ...this.state,
                hasMore: true,
            })
        }, 250);
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
        if (this.state.isFilterMode) {
            this._prepareFilterSectionData(deals, count);
            return;
        }
        if (this.state.isRefreshing) {
            this._refreshSectionData(deals, filters, count);
        }
    }

    _onViewMoreExclusiveDealClicked = () => {
        if (!this.state.data) {
            this.props.navigation.push('SubCategory', {
                screenType: 'doc-quyen',
                title: 'ĐỘC QUYỀN - CHỈ CÓ TẠI JAMJA'
            });
            return;
        }

        const {title, detailTag, screenType} = this.props.navigation.state.params;

        let params = {
            screenType,
            title: `${title} - Độc quyền`,
            detailTag,
            lastFilters: this.state.data.get('filters'),
            onlyExclusive: true
        };

        this.props.navigation.push('SubCategory', params);
    }

    _onCollectionPressed = (collection) => {
        if (!collection) return;

        const baseLogParams = {
            collection: collection.get('slug')
        };

        AnalyticsUtil.logNormalEvent(
            'category_open_collection_detail',
            baseLogParams,
            'category'
        );

        this.props.navigation.navigate('CollectionDetail', {
            "collection": collection.toJS(),
            "cslug": collection.get('slug')
        })
    }

    _onSaveCollectionClicked = (collection) => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate(
                'Login',
                {
                    from: {
                        action_location: 'sub_cat',
                        action_name: 'click_save_col',
                    },
                    action: {
                        name: 'click_save_col',
                        category: 'login'
                    }
                });
            return
        }
        this.props.dispatch(saveCollection(collection.get('slug'), collection.get('is_save', false), collection.get('save_count', 0)));
    }

    _hasCollectionData = () => this.state.data.get('collections') !== undefined && this.state.data.get('collections').size > 0;

    _onSubCategoryCollectionActionDispatcher = (dispatcher) => {
        if (dispatcher.get('action') === 'save' && !!dispatcher.get('slug')) {
            this._onSubCategoryCollectionCollectionSavedChanged(dispatcher.get('slug'), dispatcher.get('is_save'), dispatcher.get('save_count'));
        }
    }

    _onSubCategoryCollectionCollectionSavedChanged = (slug, is_save, save_count) => {
        let foundIndex = this.state.data.get('collections').findIndex((collection, index) => {
            return collection.get('slug') === slug && collection.get('is_save') !== is_save;
        });
        if (foundIndex >= 0) {
            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['collections', foundIndex],
                        collection => collection.updateIn(['save_count'], () => save_count).updateIn(['is_save'], () => is_save))
            })
        }
    }

    _onFilterClicked = () => {
        console.log('_onFilterClicked', this.state.data.toJS())
        if (this.state.data === undefined || this.state.data.get('filters') === undefined) return;
        this.props.navigation.navigate('SearchFilter',
            {
                filters: this.state.data.getIn(['filters']),
                onSubmit: this._onSubmitFilter
            })
    }

    _onSubmitFilter = (filters) => {

        if (!filters || filters.size < 1) return;

        const isFiltering = filters.findIndex((item, i) => item.get('selectedCount', 0) > 0) >= 0;

        let data = this.state.data.updateIn(['filters'], () => filters);

        console.log('Category:isFiltering', isFiltering, this.state);

        this._onCategoryScrollToTopWithoutAnimate();

        //remove filter mode
        if (!!this.state.isFilterMode && !isFiltering) {

            console.log('Category:remove filter mode');

            this.setState({
                ...this.state,
                isFilterMode: false,
                isRefreshing: true,
                data
            }, this._refreshData);
            return;
        }

        //start filter mode
        if (!this.state.isFilterMode && !!isFiltering) {

            console.log('Category:start filter mode');

            const dealCountIndex = data.get('sections').findIndex((section, i) => section === 'deal_count');
            if (dealCountIndex < 0) return;

            let sections = data.get('sections').filter((section, i) => i >= dealCountIndex);
            data = data.updateIn(['sections'], () => sections);

            this.setState({
                ...this.state,
                isFilterMode: true,
                isFiltering: true,
                isRefreshing: true,
                data
            }, this._fetchExclusiveDeals);
            return;
        }

        this.setState({
            ...this.state,
            isFilterMode: true,
            isFiltering: true,
            isRefreshing: true,
            data
        }, this._fetchExclusiveDeals);
    }

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

    _onCategoryLoginStatusChanged = () => {
        if (this.state.isFilterMode) {
            this.setState({
                ...this.state,
                isOverlayLoading: true
            }, () => this._fetchExclusiveDeals());
            return;
        }
        this.setState({
            ...this.state,
            isOverlayLoading: true
        }, this._refreshData);
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
        AnalyticsUtil.logViewDealListEmpression('category', dealSlugs);
    }

    _subCatUpdateSaveDealStatus = (id, is_save, save_count) => {

        let trends = undefined;
        let sections = undefined;
        let exclusiveDeals = undefined;
        if (!!this.state.data.get('trends')) {
            const foundIndex = this.state.data.get('trends').findIndex((deal, index) => deal.get('id', '') === id);
            if (foundIndex >= 0) {
                trends = this.state.data.get('trends').update(foundIndex, deal => {
                    return deal.updateIn(['is_saved'], () => is_save).updateIn(['save_count'], () => save_count);
                });
            }
        }
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
        if (!!trends) {
            data = data.updateIn(['trends'], () => trends);
        }
        if (!!sections) {
            data = data.updateIn(['sections'], () => sections);
        }
        if (!!exclusiveDeals) {
            data = data.updateIn(['exclusiveDeals'], () => exclusiveDeals);
        }

        if (!!trends || !!sections || !!exclusiveDeals) {
            this.setState({
                ...this.state,
                data
            })
        }
    }

    _subCatUpdateFollowBrandStatus = (brand_id, following) => {
        let trends = undefined;
        let sections = undefined;
        let exclusiveDeals = undefined;
        if (!!this.state.data.get('trends')) {
            let hasChanged = false;
            const deals = this.state.data.get('trends').map((deal, i) => {
                if (deal.getIn(['brand', 'id'], '') !== brand_id) return deal;
                hasChanged = true;
                return deal.updateIn(['is_following'], () => following);
            });
            if (hasChanged) trends = deals;
        }
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
        if (!!trends) {
            data = data.updateIn(['trends'], () => trends);
        }
        if (!!sections) {
            data = data.updateIn(['sections'], () => sections)
        }
        if (!!exclusiveDeals) {
            data = data.updateIn(['exclusiveDeals'], () => exclusiveDeals);
        }

        if (!!trends || !!sections || !!exclusiveDeals) {
            this.setState({
                ...this.state,
                data
            })
        }
    }

    _onSubCatDataChangeDealInfo = (dispatcher) => {
        switch (dispatcher.get('action')) {

            case 'save':
                this._subCatUpdateSaveDealStatus(
                    dispatcher.get('id'),
                    dispatcher.get('is_save'),
                    dispatcher.get('save_count'),
                );
                return;

            case 'follow_brand':
                this._subCatUpdateFollowBrandStatus(
                    dispatcher.get('brand_id'),
                    dispatcher.get('following'),
                );
                return;
        }
    }
}