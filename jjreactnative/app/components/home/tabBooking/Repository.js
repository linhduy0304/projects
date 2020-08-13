import React from 'react'
import {fromJS, Map} from 'immutable'
import {Alert} from 'react-native'
import {collectionApi} from '../../../api/collection-api'
import {dealApi} from '../../../api/deal-api'
import {CommonUtil} from "../../../utils/common-utils";
import {saveCollection} from '../../collection/data/action'
import {AnalyticsUtil} from "../../common/analytics/analytics";
import {StringUtil} from "../../../utils/string-util";
import JJLocationManager from "../../../utils/locationmanager/JJLocationManager";
import {locationChanged} from "../../../utils/locationmanager/action";
import BaseScreen from "../../../common/base/BaseScreen";

const ITEM_LIMIT = 12;

export default class Repository extends BaseScreen {

    tabBookingSorts = [
        { "sort_type": "newest", "sort_name": "Mới nhất" },
        { "sort_type": "distance", "sort_name": "Gần tôi" },
        { "sort_type": "most_view", "sort_name": "Xem nhiều" },
        { "sort_type": "discount_highest", "sort_name": "Giảm sâu nhất" },
        { "sort_type": "expires", "sort_name": "Sắp hết hạn" }
    ];

    baseSections = ['event', 'trends', 'sub_list', 'collections'];

    constructor(props, context) {
        super(props, context);
        this.state = {
            isFilterMode: false,
            isRefreshing: false, //refreshing data status
            isResorting: false, //sorting data status
            isError: false, //error flat
            hasMore: false, //has more deal flat
            isLoadingMore: false, //loading more status
            isFiltering: false, //filtering status
            isOverlayLoading: false, //
            data: fromJS({
                sortType: 'newest',
                trends: undefined,
                collections: undefined,
                sections: this.baseSections
            }),
            findingLocation: false
        };
    }

    componentDidMount() {
        super.componentDidMount();
        if (!StringUtil.isBlank(this.props.selectedProvinceId)) {
            this._refreshData();
        }
    }

    _onPullToRefreshAction = () => {
        if (this.state.isFilterMode) {
            this._fetchDeal(true);
            return;
        }
        this._refreshData();
    }

    _refreshData = () => {
        let data = this.state.data;
        let sections = fromJS([]);
        if (data.getIn(['sections', 0]) !== 'event') {
            sections = sections.push(...fromJS(this.baseSections));
        }
        sections = sections.push(...data.get('sections'));

        data = data.updateIn(['sections'], () => sections);

        this.setState({
            ...this.state,
            isRefreshing: true,
            isError: false,
            data
        }, this._fetchTrendCollections);
    }

    _fetchTrendCollections = () => {
        collectionApi.getTrendingCollection('dat-cho')
            .then(result => {
                const collections = result.objects;
                if (!!collections && collections.length > 0) {

                    let data = this.state.data.updateIn(['trends'], () => fromJS(collections[0].deals));
                    data = data.updateIn(['collections'], () => fromJS(collections[0].collections));

                    this.setState({
                        ...this.state,
                        isOverlayLoading: false,
                        data
                    }, () => {
                        this._fetchDeal(true);
                    })
                }
                else {
                    this._fetchDeal(true);
                }
            }).catch(error => {
                console.log('getTrendingCollection', error);
                this._fetchDeal(true);
            })
    }

    _fetchDeal = (refresh) => {
        let offset = 0;
        if (refresh !== true) {
            offset = this.state.data.get('deal_count', 0);
        }

        let detailTags = CommonUtil.getDetailTagForFilter(this.state.data.get('filters'));
        console.log('_fetchDeal', offset, detailTags);

        dealApi.searchDealV4(this.state.data.get('sortType', 'newest'), undefined, detailTags, offset, ITEM_LIMIT, 'dat-cho')
            .then(response => {
                console.log('TabBooking:searchDealV4:response', response);
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
                    isOverlayLoading: false,
                })
            })
    }

    _setEmptyDeal = () => {
        let sections = fromJS([]);
        if (!this.state.isFiltering) {
            sections = fromJS(this.baseSections);
            sections = sections.push('deal_count');
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
            isOverlayLoading: false,
            hasMore: false,
            data
        })
    };

    _refreshSectionData = (deals, filters, count) => {
        let sections = this.state.data.get('sections');
        sections = sections.clear();

        if (deals.size < 1) {
            this._setEmptyDeal();
            return;
        }

        sections = sections.push(...fromJS(this.baseSections));
        sections = sections.push('deal_count');
        sections = sections.push('sort');
        sections = sections.push(...deals);

        let data = this.state.data;
        if (data.get('filters') === undefined) {
            const filtersList = filters.sort((item1, item2) => item1.get('priority', 0) - item2.get('priority', 0));
            data = data.updateIn(['filters'], () => filtersList);
        }
        data = data.updateIn(['sections'], () => sections).updateIn(['total_deal'], () => count).updateIn(['deal_count'], () => deals.size);


        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            isOverlayLoading: false,
            hasMore: deals.size >= ITEM_LIMIT,
            data
        });
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
        sections = sections.push(...deals);

        let data = this.state.data;
        data = data.updateIn(['sections'], () => sections).updateIn(['total_deal'], () => count).updateIn(['deal_count'], () => deals.size);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isFiltering: false,
            isOverlayLoading: false,
            hasMore: deals.size >= ITEM_LIMIT,
            data
        })
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
            isOverlayLoading: false,
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
            isOverlayLoading: false,
            hasMore: deals.size >= ITEM_LIMIT,
            data
        })
    }

    _insertDeal = (deals, filters, count) => {
        console.log('TabBooking:_insertDeal', this.state, deals, filters, count);
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
                                        }, this._onPullToRefreshAction);
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
        })
    }

    _onSubmitFilter = (filters) => {

        if (!filters || filters.size < 1) return;

        const isFiltering = filters.findIndex((item, i) => item.get('selectedCount', 0) > 0) >= 0;

        let data = this.state.data.updateIn(['filters'], () => filters);

        console.log('TabBooking:isFiltering', isFiltering, this.state);

        this._onTabBookingScrollToTopWithoutAnimate();

        //remove filter mode
        if (!!this.state.isFilterMode && !isFiltering) {

            console.log('TabBooking:remove filter mode');

            this.setState({
                ...this.state,
                isFilterMode: false,
                data
            }, this._refreshData);
            return;
        }

        //start filter mode
        if (!this.state.isFilterMode && !!isFiltering) {

            console.log('TabBooking:start filter mode');

            const dealCountIndex = data.get('sections').findIndex((section, i) => section === 'deal_count');
            if (dealCountIndex < 0) return;

            let sections = data.get('sections').filter((section, i) => i >= dealCountIndex);
            data = data.updateIn(['sections'], () => sections);

            this.setState({
                ...this.state,
                isFilterMode: true,
                isFiltering: true,
                data
            }, () => this._fetchDeal(true));
            return;
        }

        this.setState({
            ...this.state,
            isFilterMode: true,
            isFiltering: true,
            data
        }, () => this._fetchDeal(true));
    }

    _onTabBookingLoginStatusChanged = () => {
        if (this.state.isFilterMode) {
            this.setState({
                ...this.state,
                isOverlayLoading: true
            }, () => this._fetchDeal(true));
            return;
        }
        this.setState({
            ...this.state,
            isOverlayLoading: true
        }, this._refreshData);
    }

    _onTabBookingSaveCollectionClicked = (collection) => {
        console.log('_onSaveCollectionClicked', collection);
        if (!this.props.isLoginned) {
            this.props.navigation.navigate(
                'Login',
                {
                    from: {
                        action_location: 'tab_booking',
                        action_name: 'click_save_col',
                    },
                    action: {
                        name: 'click_save_col',
                        category: 'login'
                    }
                });
            return
        }
        this.props.dispatch(saveCollection(collection.get('slug'), collection.get('is_save'), collection.get('save_count')));
    }

    _onTabBookingCollectionActionDispatcher = (dispatcher) => {
        if (dispatcher.get('action') === 'save' &&
            !!dispatcher.get('slug') &&
            !!this.state.data.get('collections') &&
            this.state.data.get('collections').size > 0) {

            this._onTabBookingCollectionSavedChanged(dispatcher.get('slug'), dispatcher.get('is_save'), dispatcher.get('save_count'));
        }
    }

    _onTabBookingCollectionSavedChanged = (slug, is_save, save_count) => {
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
        if (this.state.data === undefined || this.state.data.get('filters') === undefined) return;
        this.props.navigation.navigate('SearchFilter',
            {
                filters: this.state.data.getIn(['filters']),
                onSubmit: this._onSubmitFilter
            })
    }

    _onTabBookingCollectionPressed = (collection) => {

        if (!collection) return;

        const baseLogParams = {
            collection: collection.get('slug')
        };

        AnalyticsUtil.logNormalEvent(
            'tab_booking_open_collection_detail',
            baseLogParams,
            'tab_booking'
        );

        this.props.navigation.navigate('CollectionDetail', {
            "collection": collection.toJS(),
            "cslug": collection.get('slug')
        })
    }

    _bookingTabUpdateSaveDealStatus = (id, is_save, save_count) => {
        let trends = undefined;
        let sections = undefined;
        if (!!this.state.data.get('trends')) {
            const foundIndex = this.state.data.get('trends').findIndex((deal, index) => deal.get('id', '') === id);
            if (foundIndex >= 0) {
                trends = this.state.data.get('trends').update(foundIndex, deal => {
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

        if (!!trends || !!sections) {
            this.setState({
                ...this.state,
                data
            })
        }
    }

    _bookingTabUpdateFollowBrandStatus = (brand_id, following) => {
        let trends = undefined;
        let sections = undefined;
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

        let data = this.state.data;
        if (!!trends) {
            data = data.updateIn(['trends'], () => trends);
        }
        if (!!sections) {
            data = data.updateIn(['sections'], () => sections)
        }

        if (!!trends || !!sections) {
            this.setState({
                ...this.state,
                data
            })
        }
    }

    _onBookingTabDataChangeDealInfo = (dispatcher) => {
        switch (dispatcher.get('action')) {

            case 'save':
                this._bookingTabUpdateSaveDealStatus(
                    dispatcher.get('id'),
                    dispatcher.get('is_save'),
                    dispatcher.get('save_count'),
                );
                return;

            case 'follow_brand':
                this._bookingTabUpdateFollowBrandStatus(
                    dispatcher.get('brand_id'),
                    dispatcher.get('following'),
                );
                return;
        }
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: *) {
        this.needReRender = true;
        return super.shouldComponentUpdate(nextProps, nextState, nextContext);
    }
}