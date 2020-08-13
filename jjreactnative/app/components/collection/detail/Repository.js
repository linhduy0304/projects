import React from 'react'
import {fromJS, Map} from "immutable";

import {BasePureComponent} from "../../common/BasePureComponent";
import {dealApi} from '../../../api/deal-api'
import {collectionApi} from '../../../api/collection-api'
import {AnalyticsUtil} from "../../common/analytics/analytics";
import {StringUtil} from '../../../utils/string-util'
import JJLocationManager from "../../../utils/locationmanager/JJLocationManager";
import {locationChanged} from "../../../utils/locationmanager/action";
import {Alert} from "react-native";

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
            data: fromJS({
                sortType: 'newest',
                sections: undefined
            }),
            scrollEnabled: true,
            findingLocation: false
        };
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout(this._refreshData, 250);
    }

    _updateCollectionDetail = (collection, callback) => {
        let sections = this.state.data.get('sections');
        if (!sections) sections = fromJS([collection]);
        else {
            if (sections.getIn([0, 'slug']) === collection.get('slug')) {
                sections = sections.update(0, () => collection);
            }
        }
        this.setState({
            ...this.state,
            data: this.state.data.updateIn(['sections'], () => sections)
        }, callback)
    }

    _refreshData = () => {
        this.setState({
            ...this.state,
            isRefreshing: true,
            isError: false,
        }, () => {
            if (!!this.state.data.getIn(['sections', 0, 'slug'])) {
                this._fetchDeals(true);
                return;
            }
            const {cslug, collection} = this.props.navigation.state.params;
            if (StringUtil.isEmpty(cslug) && StringUtil.isEmpty(collection)) {
                alert('Không tìm thấy dữ liệu. Vui lòng thử lại sau!');
                return;
            }
            this._initCollectionDetailIfNeed(cslug, collection);
        })
    }

    _initCollectionDetailIfNeed = (slug, collection) => {
        if (!StringUtil.isEmpty(collection)) {
            this._updateCollectionDetail(
                fromJS(collection),
                () => {
                    this._logScreen();
                    this._fetchDeals(true);
                });
            return;
        }
        this._fetchCollectionDetail(slug);
    }

    _fetchCollectionDetail = (slug, refresh) => {
        collectionApi.getCollectionDetail(slug)
            .then(response => {
                console.log('getCollectionDetail:response', response);
                if (StringUtil.isEmpty(response) || StringUtil.isEmpty(response.id)) return;
                return response;
            })
            .then(collection => {
                this._updateCollectionDetail(
                    fromJS(collection),
                    () => {
                        if (!refresh) this._logScreen();
                        this._fetchDeals(true);
                    }
                )
            })
            .catch(error => {
                console.log('getCollectionDetail:error', error);
            })
    }

    _prepareReSortingSectionData = (deals) => {
        let sections = this.state.data.get('sections');

        sections = sections.filter((section, index) => index < 3);
        sections = sections.push(...deals);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            hasMore: false,
            data: this.state.data.updateIn(['sections'], () => sections).updateIn(['deal_count'], () => deals.size)
        }, () => this._updateHasMore(deals.size))
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
            hasMore: false,
            data
        }, () => this._updateHasMore(deals.size))
    }

    _refreshDealSectionData = (deals, count) => {
        let sections = this.state.data.get('sections');
        sections = sections.filter((section, index) => index < 3);

        let data = this.state.data;
        data = data.updateIn(['total_deal'], () => count).updateIn(['deal_count'], () => deals.size);

        if (deals.size < 1) {
            data = data.updateIn(['sections'], () => sections);
            this.setState({
                ...this.state,
                isRefreshing: false,
                isResorting: false,
                isLoadingMore: false,
                hasMore: deals.size >= ITEM_LIMIT,
                data
            })
            return;
        }

        if (sections.size < 3) {
            sections = sections.push('deal_count');
            sections = sections.push('sort');
        }

        sections = sections.push(...deals);

        data = data.updateIn(['sections'], () => sections);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
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
        }, 500);
    }

    _insertDeal = (deals, count) => {
        if (this.state.isResorting) {
            this._prepareReSortingSectionData(deals);
            return;
        }
        if (this.state.isLoadingMore) {
            this._addMoreDealSectionData(deals);
            return;
        }
        if (this.state.isRefreshing) {
            this._refreshDealSectionData(deals, count);
        }
    }

    _fetchDeals = (refresh) => {
        let offset = 0;
        if (refresh !== true) {
            offset = this.state.data.get('deal_count', 0);
        }

        dealApi.getDealByCollection(
            this.state.data.getIn(['sections', 0, 'slug'], ''),
            this.state.data.get('sortType', 'newest'),
            offset,
            ITEM_LIMIT
            )
            .then(response => {
                console.log('getDealByCollection:response', response);
                return fromJS(response);
            })
            .then(result => {
                this._insertDeal(result.get('objects'), result.getIn(['meta', 'total_count'], 0));

                this._logImpression(result.get('objects'));
            })
            .catch(error => {
                console.log('TabBooking:searchDealV4:error', error);
                this.setState({
                    ...this.state,
                    isRefreshing: false,
                    isResorting: false,
                    isLoadingMore: false,
                    hasMore: false,
                    isError: refresh
                })
            })
    }

    _refreshByChangeLoginState = () => {
        if (!!this.state.data.getIn(['sections', 0, 'slug'])) {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    isRefreshing: true
                }, () => {
                    this._fetchCollectionDetail(this.state.data.getIn(['sections', 0, 'slug']), true);
                });
            }, 250);
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
                                        }, () => {
                                            this._refreshData(true);
                                        });
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
            this._fetchDeals(true);
        })
    }

    _collectionDetailUpdateSaveDealStatus = (id, is_save, save_count) => {

        let sections = this.state.data.get('sections');

        if (!!sections && sections.size > 3) {
            const foundIndex = sections.findIndex((section, index) => Map.isMap(section) && section.get('id') === id);
            if (foundIndex >= 0) {
                sections = sections.update(foundIndex, section => {
                    return section.updateIn(['is_saved'], () => is_save).updateIn(['save_count'], () => save_count);
                });

                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn(['sections'], () => sections)
                })
            }
        }
    }

    _collectionDetailUpdateFollowBrandStatus = (brand_id, following) => {
        let sections = this.state.data.get('sections');

        if (!!sections && sections.size > 3) {
            let hasChanged = false;
            sections = sections.map((section, index) => {
                if (!Map.isMap(section)) return section;

                if (section.getIn(['brand', 'id'], '') !== brand_id) return section;
                hasChanged = true;
                return section.updateIn(['is_following'], () => following);
            });
            if (hasChanged) {
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn(['sections'], () => sections)
                })
            }
        }
    }

    _onCollectionDetailDataChangeDealInfo = (dispatcher) => {
        switch (dispatcher.get('action')) {

            case 'save':
                this._collectionDetailUpdateSaveDealStatus(
                    dispatcher.get('id'),
                    dispatcher.get('is_save'),
                    dispatcher.get('save_count'),
                );
                return;

            case 'follow_brand':
                this._collectionDetailUpdateFollowBrandStatus(
                    dispatcher.get('brand_id'),
                    dispatcher.get('following'),
                );
                return;
        }
    }

    _onCollectionDetailCollectionActionDispatcher = (dispatcher) => {
        if (dispatcher.get('action') === 'save' && !!dispatcher.get('slug')) {
            this._onCollectionDetailCollectionCollectionSavedChanged(dispatcher.get('slug'), dispatcher.get('is_save'), dispatcher.get('save_count'));
        }
    }

    _onCollectionDetailCollectionCollectionSavedChanged = (slug, is_save, save_count) => {
        let collection = this.state.data.getIn(['sections', 0]);

        if (!!collection &&
            collection.get('slug') === slug &&
            collection.get('is_save') !== is_save) {
            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['sections', 0, 'is_save'], () => is_save).updateIn(['sections', 0, 'save_count'], () => save_count)
            })
        }
    }

    _logScreen = () => {
        AnalyticsUtil.logCurrentScreen(
            'collection_detail',
            {
                slug: this.state.data.getIn(['sections', 0, 'slug'], ''),
                name: this.state.data.getIn(['sections', 0, 'title'], '')
            }
        );

        AnalyticsUtil.viewCollectionDetail(
            this.state.data.getIn(['sections', 0, 'title'], ''),
            this.state.data.getIn(['sections', 0, 'slug'], '')
        )
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
        AnalyticsUtil.logViewDealListEmpression('collection_detail', dealSlugs);
    }
}