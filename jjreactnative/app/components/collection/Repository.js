import React from 'react'
import {BasePureComponent} from "../common/BasePureComponent";
import {collectionApi} from '../../api/collection-api'
import {fromJS, Map} from "immutable";
import {AnalyticsUtil} from "../common/analytics/analytics";
import {StringUtil} from '../../utils/string-util'

const ITEM_LIMIT = 12;
export default class Repository extends BasePureComponent {

    constructor() {
        super();
        this.state = {
            trends: undefined,
            isRefreshing: false,
            isResorting: false,
            isError: false,
            hasMore: false,
            isLoadingMore: false,
            data: fromJS({
                sortType: 'modified',
                sections: []
            })
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this._refreshData();

        let name = '';
        let tags = '';
        if (!! this.props.navigation.state &&  this.props.navigation.state.params) {
            name = this.props.navigation.state.params.name;
            tags = this.props.navigation.state.params.tags;
        }
        AnalyticsUtil.logCurrentScreen(
            'collection',
            {
                name: name,
                tags: tags
            }
        );
    }

    _refreshData = () => {
        this.setState({
            ...this.state,
            isRefreshing: true,
            isError: false
        }, () => {
            this._fetchTrendingCollection();
        })
    }

    _fetchTrendingCollection = () => {
        collectionApi.getCollections(
            undefined,
            'modified',
            !!this.props.navigation.state.params ? this.props.navigation.state.params.tags : undefined,
            0,
            3,
            true)
            .then(response => {
                console.log('getCollections:Trend:response', response);
                this.setState({
                    ...this.state,
                    trends: fromJS(response.objects)
                }, () => {
                    this._fetchCollection(true);
                })
            })
            .catch(error => {
                console.log('getCollections:Trend:error', error);
                this._fetchCollection(true);
            })
    }

    _fetchCollection = (refresh) => {
        let offset = 0;
        if (refresh !== true) {
            offset = this.state.data.get('collection_count', 0);
        }

        collectionApi.getCollections(
                undefined,
                this.state.data.get('sortType', 'modified'),
                !!this.props.navigation.state.params ? this.props.navigation.state.params.tags : undefined,
                offset,
                ITEM_LIMIT
            )
            .then(response => {
                console.log('getCollections:list:response', response);
                return fromJS(response);
            })
            .then(result => {

                this._insertCollections(result.get('objects'), result.getIn(['meta', 'total_count'], 0), result.getIn(['meta', 'sub_categories']));
            })
            .catch(error => {
                console.log('getCollections:list:error', error);
                this.setState({
                    ...this.state,
                    isRefreshing: false,
                    isResorting: false,
                    isLoadingMore: false,
                    isFiltering: false,
                    hasMore: false,
                    isError: refresh
                })
            })
    }

    _setEmptyDeal = () => {
        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            hasMore: false,
            data: this.state.data.updateIn(['sections'], () => this.state.data.get('sections').clear()).updateIn(['collection_count'], () => 0)
        })
    }

    _refreshCollectionSectionData = (collections, count, sub_categories) => {
        let sections = this.state.data.get('sections');
        sections = sections.clear();

        if (collections.size < 1) {
            this._setEmptyDeal();
            return;
        }

        if (!!this.state.trends &&
            this.state.trends.size > 0) {
            sections = sections.push('trends');
        }

        const tags = !!this.props.navigation.state.params ? this.props.navigation.state.params.tags : undefined;

        if (!!sub_categories && StringUtil.isEmpty(tags)) {
            sections = sections.push(fromJS({
                type: 'sub_list',
                data: sub_categories
            }));
        }

        sections = sections.push('collection_count');
        sections = sections.push('sort');

        sections = sections.push(...collections);

        let data = this.state.data;
        data = data.updateIn(['sections'], () => sections).updateIn(['total_collection'], () => count).updateIn(['collection_count'], () => collections.size);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isError: false,
            hasMore: false,
            data
        }, () => this._updateHasMore(collections.size))
    }

    _prepareReSortingSectionData = (collections) => {
        let sections = this.state.data.get('sections');

        sections = sections.filter((section, index) =>
            typeof section === 'string' ||
            (Map.isMap(section) && (section.get('type') === 'trends' || section.get('type') === 'sub_list')));
        sections = sections.push(...collections);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            isError: false,
            hasMore: false,
            data: this.state.data.updateIn(['sections'], () => sections).updateIn(['collection_count'], () => collections.size)
        }, () => this._updateHasMore(collections.size))
    }

    _addMoreCollectionSectionData = (collections) => {
        let sections = this.state.data.get('sections');
        sections = sections.push(...collections);

        let data = this.state.data.updateIn(['sections'], () => sections);
        data = data.updateIn(['collection_count'], () => data.get('collection_count', 0) + collections.size);

        this.setState({
            ...this.state,
            isRefreshing: false,
            isResorting: false,
            isLoadingMore: false,
            hasMore: false,
            data
        },() => this._updateHasMore(collections.size))
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

    _insertCollections = (collections, count, sub_categories) => {
        if (this.state.isResorting) {
            this._prepareReSortingSectionData(collections);
            return;
        }
        if (this.state.isLoadingMore) {
            this._addMoreCollectionSectionData(collections);
            return;
        }
        if (this.state.isRefreshing) {
            this._refreshCollectionSectionData(collections, count, sub_categories)
        }
    }

    _onSortSelected = (item) => {
        if (item.sort_type === this.state.data.get('sortType')) return;
        this.setState({
            ...this.state,
            data: this.state.data.updateIn(['sortType'], () => item.sort_type),
            isResorting: true
        }, () => {
            this._fetchCollection(true);
        })
    }

    _onCollectionListCollectionActionDispatcher = (dispatcher) => {
        if (dispatcher.get('action') === 'save' && !!dispatcher.get('slug')) {
            this._onCollectionListCollectionSavedChanged(dispatcher.get('slug'), dispatcher.get('is_save'), dispatcher.get('save_count'));
        }
    }

    _onCollectionListCollectionSavedChanged = (slug, is_save, save_count) => {
        let trends = undefined;
        if (!!this.state.trends && this.state.trends.size > 0) {
            let foundIndex = this.state.trends.findIndex((collection, index) => {
                return collection.get('slug') === slug && collection.get('is_save') !== is_save;
            });
            if (foundIndex >= 0) {
                trends = this.state.trends.update(foundIndex, collection => {
                    return collection.updateIn(['save_count'], () => save_count).updateIn(['is_save'], () => is_save);
                })
            }
        }

        let sections = undefined;
        if (!!this.state.data.get('sections') && this.state.data.get('sections').size > 0) {

            let foundIndex = this.state.data.get('sections').findIndex((section, index) => {
                return Map.isMap(section) && section.get('slug') === slug;
            });

            if (foundIndex >= 0) {
                sections = this.state.data.get('sections');
                sections = sections.update(foundIndex, section => {
                    return section.updateIn(['save_count'], () => save_count).updateIn(['is_save'], () => is_save);
                })
            }
        }

        const state = {
            ...this.state
        };

        if (!!trends) state.trends = trends;
        if (!!sections) state.data = this.state.data.updateIn(['sections'], () => sections);

        this.setState(state);
    }
}