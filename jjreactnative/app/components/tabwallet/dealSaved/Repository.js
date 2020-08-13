import React from 'react'
import {fromJS, Map} from 'immutable'
import {BasePureComponent} from "../../common/BasePureComponent";
import {collectionApi} from '../../../api/collection-api'
import {dealApi} from '../../../api/deal-api'
import {StringUtil} from '../../../utils/string-util'
import {saveCollection} from "../../collection/data/action";

const ITEM_LIMIT = 15;

export default class Repository extends BasePureComponent {

    constructor() {
        super();
        this.state = {
            hasMore: true,
            isRefreshing: true,
            isLoading: true,
            dealCount: 0,
            data: fromJS({
                collections: undefined,
                deals: []
            })
        }
    }

    componentDidMount() {
        super.componentDidMount();
        if (this.props.isLoginned) this._refresh()
    }

    _refresh = () => {
        this._fetchCollectionSaved();
        this._fetchDealSaved(true);
    }

    _fetchCollectionSaved = () => {
        collectionApi.getCollectionSavedList(0, 20)
            .then(collections => {
                console.log('getCollectionSavedList:collections', collections);
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn(['collections'], () => fromJS(collections))
                })
            })
            .catch(error => {
                console.log('getCollectionSavedList:error', error);
            })
    }

    _fetchDealSaved = (refresh) => {
        let offset = 0;
        if (!refresh && !!this.state.data.get('deals')) {
            offset = this.state.data.get('deals').size;
        }
        this.setState({
            ...this.state,
            isLoading: true
        }, () => {
            dealApi.getDealSaved(offset, ITEM_LIMIT)
                .then(result => {
                    console.log('getDealSaved:result', result);
                    result.objects = result.objects.map((obj, i) => {
                        return obj.deal;
                    });
                    return fromJS(result);
                })
                .then(response => {
                    let data = this.state.data;
                    if (refresh) {
                        data = data.updateIn(['deals'], () => response.get('objects'));
                    } else {
                        data = data.updateIn(['deals'], () => data.get('deals').push(...response.get('objects')));
                    }
                    this.setState({
                        ...this.state,
                        hasMore: !!response && !!response.get('objects') ? response.get('objects').size >= ITEM_LIMIT : false,
                        dealCount: !!response ? response.getIn(['meta', 'total_count'], 0) : 0,
                        isRefreshing: false,
                        isLoading: false,
                        data
                    })
                })
                .catch(error => {
                    console.log('getDealSaved:error', error);
                    this.setState({
                        ...this.state,
                        hasMore: false,
                        isRefreshing: false,
                        isLoading: false
                    })
                })
        });
    }

    _onUnSaveClicked = (collection) => {
        if (!this.state.data ||
            this.state.data.get('collections') === undefined ||
            this.state.data.get('collections') === null ||
            this.state.data.get('collections').size < 1 ||
            !collection ||
            StringUtil.isEmpty(collection.slug)) return;

        try {
            let foundIndex = this.state.data.get('collections').findIndex((cl, index) => {
                if (!cl || !Map.isMap(cl)) return false;
                return cl.getIn(['collection', 'id']) === collection.id;
            });

            if (foundIndex >= 0) {
                let collections = this.state.data.get('collections').delete(foundIndex);
                this.setState({
                    ...this.state,
                    data: this.state.data.updateIn(['collections'], () => collections)
                })
            }

            this.props.dispatch(saveCollection(collection.slug, collection.is_save, collection.save_count))
        } catch (error) {
            console.log(error)
        }
    }

    _dealSavingUpdateSaveDealStatus = (id, is_save, save_count) => {
        if (StringUtil.isBlank(id) || this.state.data.get('deals') === undefined || this.state.data.get('deals').size < 1 || !!is_save) return;

        let foundIndex = this.state.data.get('deals').findIndex((deal, index) => !!deal && Map.isMap(deal) && deal.get('id') === id);
        if (foundIndex < 0) return;

        //remove deal has unsaved
        const deals = this.state.data.get('deals').delete(foundIndex);
        this.setState({
            ...this.state,
            data: this.state.data.updateIn(['deals'], () => deals),
            dealCount: this.state.dealCount - 1 < 0 ? 0 : this.state.dealCount - 1
        })
    }

    _dealSavingUpdateFollowBrandStatus = (brand_id, following) => {
        if (!this.state.data || this.state.data.get('deals') === undefined) return;
        let hasChanged = false;
        const deals = this.state.data.get('deals').map((deal, index) => {
            if (!deal || !Map.isMap(deal)) return deal;
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
    }

    _onDealSavingDataChangeDealInfo = (dispatcher) => {
        switch (dispatcher.get('action')) {

            case 'save':
                this._dealSavingUpdateSaveDealStatus(
                    dispatcher.get('id'),
                    dispatcher.get('is_save'),
                    dispatcher.get('save_count'),
                );
                return;

            case 'follow_brand':
                this._dealSavingUpdateFollowBrandStatus(
                    dispatcher.get('brand_id'),
                    dispatcher.get('following'),
                );
                return;
        }
    }
}