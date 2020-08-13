import React from 'react'
import {BasePureComponent} from "../../common/BasePureComponent";
import {brandApi} from '../../../api/brand-api'
import {NOT_AVAILABLE_HEADER_TYPE} from "../../../const";

const ITEM_LIMIT = 20;

export default class Repository extends BasePureComponent {

    followingSize = 0;

    constructor() {
        super();
        this.state = {
            isRefreshing: true,
            isLoading: true,
            isError: false,
            hasMore: true,
            brands: [],
            clearInputVisible: false,
            query: ''
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._refresh();
    }

    _refresh = () => {
        this.setState({
            ...this.state,
            isRefreshing: true,
            isLoading: true,
            isError: false,
            hasMore: false
        });
        this._fetchBrandFollowing();
    }

    _fetchBrandFollowing = () => {
        if (!this.props.isLoginned) {
            this._fetchBrandUnfollowing(true);
            return;
        }
        brandApi.getBrandFollowing(true, 0, 100, this.state.query)
            .then(objects => {
                console.log('getBrandFollowing:success', objects);
                this.setState({
                    ...this.state,
                    brands: objects
                }, () => {
                    this.followingSize = objects.length;
                    this._fetchBrandUnfollowing(true);
                });
            })
            .catch(error => {
                console.log('getBrandFollowing:error', error);
                this.setState({
                    ...this.state,
                    brands: []
                }, () => {
                    this._fetchBrandUnfollowing(true);
                });
            })
    }

    _fetchBrandUnfollowing = (refresh) => {
        const offset = refresh || !this.state.brands ? 0 : this.state.brands.length - this.followingSize;
        brandApi.getBrandFollowing(false, offset, ITEM_LIMIT, this.state.query)
            .then(objects => {
                console.log('getBrandUnFollowing:success', objects);
                if (refresh) {
                    if(objects.length > 0){
                        if (!this.props.isLoginned) this.state.brands = [{row_type: NOT_AVAILABLE_HEADER_TYPE}];
                        else this.state.brands.push({row_type: NOT_AVAILABLE_HEADER_TYPE});        
                    }
                }
                this.state.brands.push(...objects);
                this.setState({
                    ...this.state,
                    isRefreshing: false,
                    isLoading: false,
                    isError: false,
                    hasMore: objects.length >= ITEM_LIMIT
                });
            })
            .catch(error => {
                console.log('getBrandUnFollowing:error', error);
                this.setState({
                    ...this.state,
                    isRefreshing: false,
                    isLoading: false,
                    isError: !!refresh,
                });
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dealAction.get('action') === 'follow_brand') {
            this.setState({
                ...this.state,
                isLoading: true,
                isError: false,
                hasMore: false
            });
            this._fetchBrandFollowing();
            return;
        }

        if (nextProps.isLoginned !== this.props.isLoginned) {
            this._refresh();
        }
    }
}