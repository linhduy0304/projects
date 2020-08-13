import React from 'react';
import { fromJS, Map } from 'immutable';
import { BasePureComponent } from '../../common/base/BasePureComponent';
import { collectionApi } from '../../api/collection-api';
import { dealApi } from '../../api/deal-api';
import { StringUtil } from '../../utils/string-util';
import { saveCollection } from '../../components/collection/data/action';
import { from } from 'rxjs';
import { AppConfig } from '../../common/config';

const ITEM_LIMIT = 15;

export default class Repository extends BasePureComponent {
    constructor() {
        super();
        this.state = {
            hasMore: true,
            isRefreshing: true,
            isLoadingMore: false,
            dealCount: 0,
            data: fromJS({
                collections: undefined,
                deals: []
            }),
            offset: 0
        };
    }

    componentDidMount() {
        super.componentDidMount();
        if (this.props.isLoginned) this._refresh();
    }

    componentWillUnmount = () => {
        this._fetchDealComplete();
        this._fetchCollectionComplete();
        !!this.handleTimeout && clearTimeout(this.handleTimeout);
        super.componentWillUnmount();
    };

    _refresh = () => {
        this.setState(
            {
                ...this.state,
                offset: 0
            },
            this._fetchCollectionSaved
        );
    };

    _fetchCollectionSaved = () => {
        this._fetchCollectionTask = from(collectionApi.getCollectionSavedList(0, 20));
        this._fetchCollectionTask.subscribe(this._fetchCollectionSuccess, this._fetchCollectionError, this._fetchCollectionComplete);
    };

    _fetchCollectionSuccess = collections => {
        this.setState(
            {
                data: this.state.data.updateIn(['collections'], () => fromJS(collections))
            },
            () => {
                this._fetchDealSaved();
            }
        );
    };

    _fetchCollectionError = () => {};

    _fetchCollectionComplete = () => {
        try {
            if (!this.mounted) return;
            !!this._fetchCollectionTask && this._fetchCollectionTask.unsubscribe();
        } catch (e) {
            this._fetchCollectionTask = undefined;
        }
    };

    _fetchDealSaved = () => {
        this._fetchDealComplete();
        this._fetchDealTask = from(dealApi.getDealSaved(this.state.offset, ITEM_LIMIT));
        this._fetchDealTask.subscribe(this._fetchDealSuccess, this._fetchDealError, this._fetchDealComplete);
    };

    _fetchDealSuccess = result => {
        console.debug('_fetchDealSuccess:', result);
        const response = fromJS(result);
        const objects = response.get('objects');
        let data = this.state.data;
        if (this.state.offset === 0) {
            data = data.updateIn(['deals'], () => objects);
        } else {
            const newDeals = data.get('deals').concat(objects);
            data = data.updateIn(['deals'], () => newDeals);
        }
        this.setState({
            offset: this.state.offset + objects.size,
            hasMore: objects ? objects.size >= ITEM_LIMIT : false,
            dealCount: !!response ? response.getIn(['meta', 'total_count'], 0) : 0,
            isRefreshing: false,
            isLoadingMore: false,
            data
        });
    };

    _fetchDealError = error => {
        this.setState({
            hasMore: false,
            isRefreshing: false,
            isLoadingMore: false
        });
    };

    _fetchDealComplete = () => {
        try {
            if (!this.mounted) return;
            !!this._fetchDealTask && this._fetchDealTask.unsubscribe();
        } catch (e) {}
        this._fetchDealTask = undefined;
    };

    _onUnSaveClicked = collection => {
        if (
            !this.state.data ||
            this.state.data.get('collections') === undefined ||
            this.state.data.get('collections') === null ||
            this.state.data.get('collections').size < 1 ||
            !collection ||
            StringUtil.isEmpty(collection.slug)
        )
            return;

        try {
            this.props.dispatch(saveCollection(collection.slug, collection.is_save, collection.save_count));
        } catch (error) {
            console.log(error);
        }
    };

    _dealSavingUpdateSaveDealStatus = (id, is_save, save_count) => {
        if (StringUtil.isBlank(id) || this.state.data.get('deals') === undefined || this.state.data.get('deals').size < 1 || !!is_save) return;
        const deals = this.state.data.get('deals');
        const newDeals = deals.filter(d => !!d && Map.isMap(d) && d.get('id') !== id);
        this.setState({
            data: this.state.data.updateIn(['deals'], () => newDeals),
            dealCount: this.state.dealCount - 1 < 0 ? 0 : this.state.dealCount - 1
        });
    };

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
                data: this.state.data.updateIn(['deals'], () => deals)
            });
        }
    };

    _onDealSavingDataChangeDealInfo = dispatcher => {
        switch (dispatcher.get('action')) {
            case 'save':
                if(dispatcher.get('is_save')) {
                    this.setState(
                        {
                            ...this.state,
                            offset: 0
                        },
                        this._fetchDealSaved
                    );
                } else {
                    this._dealSavingUpdateSaveDealStatus(dispatcher.get('id'), dispatcher.get('is_save'), dispatcher.get('save_count'))
                }
                return;

            case 'follow_brand':
                this._dealSavingUpdateFollowBrandStatus(dispatcher.get('brand_id'), dispatcher.get('following'));
                return;
        }
    };

    _onCollectionSavingDataChangeCollectionInfo = dispatcher => {

        if(dispatcher.get('action') === 'save') {
            if(dispatcher.get('is_save')) {
                this.handleTimeout = setTimeout(() => {
                    try {
                        this._fetchCollectionSaved()
                    } catch (e) {
                        console.log(e);
                    }
                }, 1000)
            } else {
                const newCollections = this.state.data.get('collections').filter(d => !!d && Map.isMap(d) && d.getIn(['collection', 'slug']) !== dispatcher.get('slug'));
                
                if(!AppConfig.ios) {
                    let foundIndex = this.state.data.get('collections').findIndex((cl, index) => {
                        if (!cl || !Map.isMap(cl)) return false;
                        return cl.getIn(['collection', 'slug']) === dispatcher.get('slug');
                    })
                    let timeout = 0;
                    
                    if(foundIndex > 1) {
                        try {
                            if (!!this.refCollection && !!this.refCollection.refs && !!this.refCollection.refs.flist) this.refCollection.refs.flist.scrollToIndex({animated: true, index: foundIndex-1, viewPosition:1});
                        } catch (e) {
                            console.log(e);
                        }
                        timeout = 500;
                    } else {
                        try {
                            if (!!this.refCollection && !!this.refCollection.refs && !!this.refCollection.refs.flist) this.refCollection.refs.flist.scrollToIndex({animated: true, index: 0});
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    this.handleTimeout = setTimeout(() => {
                        try {
                            this.setState({
                                data: this.state.data.updateIn(['collections'], () => newCollections)
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    }, timeout)
                } else {
                    this.setState({
                        data: this.state.data.updateIn(['collections'], () => newCollections)
                    });
                }
            }
        }
    };
}
