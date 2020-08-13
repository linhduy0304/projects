import React from 'react'
import {fromJS} from 'immutable'
import {fetchHomePages} from '../repo/action'
import BaseScreen from "../../../common/base/BaseScreen";

export default class Repository extends BaseScreen {

    initialization = true;

    baseSections = fromJS(
        [
            {
                type: 'fixed_grid',
                data: undefined
            },
            {
                type: 'category_grid',
                data: undefined
            }
        ]
    );

    constructor() {
        super();
        this.state = {
            isOverlayLoading: false,
            sections: this.baseSections,
            toolbarOpacity: 0
        };
    }

    _refreshData = () => {
        this.props.dispatch(fetchHomePages());
    }

    _prepareSectionData = (data) => {


        console.debug('_prepareSectionData', !!data ? data.toJS() : undefined, this.state);
        if (!data || data.size < 1) {
            this.setState({
                ...this.state,
                isRefreshing: false,
                isError: false,
                isOverlayLoading: false,
                sections: fromJS([])
            });
            return;
        }
        let sections = fromJS([]);

        const hasBrandDay = !!this.props.brandDayData && this.props.brandDayData.get('deals', {size: 0}).size > 0;

        if (hasBrandDay) {
            sections = sections.push(
                fromJS({
                    type: 'brand_day_header'
                })
            );
            sections = sections.push(
                fromJS({
                    type: 'brand_day_deal'
                })
            );
        }
        else {
            sections = sections.push(
                fromJS({
                    type: 'event'
                })
            );
        }

        if (!hasBrandDay) {
            const trend = data.find(d => d.get('type_deal') === 'trends' && d.get('deals', {size: 0}).size > 0);
            if (!!trend) {
                sections = sections.push(
                    fromJS({
                        type: trend.get('view_type_app'),
                        data: trend
                    })
                );
            }
        }

        sections = sections.push(
            fromJS({
                type: 'category_grid'
            })
        );


        data.map((item, index) => {

            if (item.get('deals').size < 1) return null;

            if (item.get('type_deal') !== 'trends') {
                let dataItem = item;
                try {
                    if (dataItem.get('type_deal') === 'pin') {
                        dataItem = dataItem.updateIn(['deals'], () => dataItem.get('deals').sortBy(Math.random));
                    }
                } catch (e) {
                    console.log(e);
                }
                sections = sections.push(
                    fromJS({
                        type: dataItem.get('view_type_app'),
                        data: dataItem
                    })
                );
            }
        });

        this.setState({
            ...this.state,
            isRefreshing: false,
            isError: false,
            isOverlayLoading: false,
            sections
        })
    }

    _discoveryTabUpdateSaveDealStatus = (id, is_save, save_count) => {

        let sections = this.state.sections;
        if (!sections) return;
        let hasChanged = false;

        sections = sections.map((section, index) => {

            if (!section.getIn(['data', 'deals']) || section.getIn(['data', 'deals']).size < 1) return section;

            const foundIndex = section.getIn(['data', 'deals']).findIndex((deal, index) => deal.get('id', '') === id);
            if (foundIndex < 0) return section;

            hasChanged = true;

            const deals = section.getIn(['data', 'deals'])
                .update(foundIndex,
                    deal =>
                        deal.updateIn(['is_saved'], () => is_save)
                            .updateIn(['save_count'], () => save_count));

            return section.updateIn(['data', 'deals'], () => deals);
        });

        hasChanged &&
        this.setState({
            ...this.state,
            sections
        })
    }

    _discoveryTabUpdateFollowBrandStatus = (brand_id, following) => {
        let sections = this.state.sections;
        if (!sections) return;
        let hasChanged = false;

        sections = sections.map((section, index) => {

            if (!section.getIn(['data', 'deals']) || section.getIn(['data', 'deals']).size < 1) return section;

            const deals = section.getIn(['data', 'deals']).map((deal, index) => {
                if (deal.getIn(['brand', 'id'], '') !== brand_id) return deal;
                hasChanged = true;
                return deal.updateIn(['is_following'], () => following);
            });

            return section.updateIn(['data', 'deals'], () => deals);
        });

        hasChanged &&
        this.setState({
            ...this.state,
            sections
        })
    }

    _onDiscoveryTabDealActionDispatcher = (dispatcher) => {
        switch (dispatcher.get('action')) {

            case 'save':
                this._discoveryTabUpdateSaveDealStatus(
                    dispatcher.get('id'),
                    dispatcher.get('is_save'),
                    dispatcher.get('save_count'),
                );
                return;

            case 'follow_brand':
                this._discoveryTabUpdateFollowBrandStatus(
                    dispatcher.get('brand_id'),
                    dispatcher.get('following'),
                );
                return;
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        this.initialization = false;
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: *) {
        this.needReRender = true;
        return super.shouldComponentUpdate(nextProps, nextState, nextContext);
    }
}