import React from 'react'
import PropTypes from 'prop-types'
import Repository from "./Repository";
import {COLOR_GRAY_BG, COLOR_PRIMARY} from "../../../resources/colors";
import { Container } from 'native-base';
import {
    View,
    ActivityIndicator,
    VirtualizedList
} from 'react-native';
import JJHeader from '../../common/JJHeader'
import Section from '../../common/Section';
import BigDealItem from '../../common/BigDealItem';
import {DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import {Map} from "immutable";
import {StringUtil} from '../../../utils/string-util'
import {connect} from "react-redux";
import SortList from '../../common/section/SortList'
import CollectionDetailHeader from './CollectionDetailHeader'
import LocationLoadingView from "../../common/view/LocationLoadingView";

const ITEM_LIMIT = 12;
class CollectionDetail extends Repository {

    render() {
        return (
            <Container>
                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={true}
                    filter={this.state.data.getIn(['sections', 0, 'title'], '')}
                />
                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG }}>
                    {this._renderContent()}
                </View>

                {
                    !!this.state.findingLocation &&
                    <LocationLoadingView onCancelPressed={this._onCancelGetLocationClicked}/>
                }
            </Container>
        )
    }

    _renderContent = () =>
        (
            <VirtualizedList
                style={{flex: 1}}
                ref={'scrollViewRef'}
                scrollEnabled={this.state.scrollEnabled}
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshData}
                initialNumToRender={2}
                maxToRenderPerBatch={5}
                data={this.state.data.get('sections')}
                getItem={this._getItem}
                getItemCount={this._getItemCount}
                onEndReachedThreshold={0.5}
                onEndReached={this._onLoadMore}
                keyExtractor={this._getKeyExtractor}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderEmpty}
                ListFooterComponent={this._renderFooter}
                removeClippedSubviews={true}
            />
        )

    _onCancelGetLocationClicked = () => {
        this.setState({
            ...this.state,
            findingLocation: false
        })
    }

    _getItem = (data, index) => data.get(index);

    _getItemCount = (data) => !!data ? data.size : 0;

    _renderFooter = () => {
        return (
            <View>
                {
                    this.state.hasMore &&
                    <ActivityIndicator animating={true}
                                       size={'small'}
                                       color={COLOR_PRIMARY}
                                       style={{marginTop: DIMENSION_PADDING_MEDIUM}}/>
                }
                <View style={{height: DIMENSION_PADDING_LARGE}}/>
            </View>
        )
    }

    _onLoadMore = () => {
        if (this.state.hasMore &&
            !this.state.isLoadingMore &&
            this.state.isRefreshing !== true &&
            !!this.state.data.get('sections') &&
            this.state.data.get('sections').size > ITEM_LIMIT) {

            this.setState({
                ...this.state,
                isLoadingMore: true
            }, () => this._fetchDeals(false));
        }
    }

    _getKeyExtractor = (item, index) => {
        let key = `collection_detail_section_${index}_`;
        if (item) {
            if (Map.isMap(item)) {
                key += item.get('id', '');
            }
            else if (!StringUtil.isBlank(item.title)) {
                key += item.title;
            }
            else if (!StringUtil.isBlank(item.name)) {
                key += item.name;
            }
        }
        key += index;
        return key;
    }

    _renderItem = ({ item, index }) => {
        if (Map.isMap(item)) {
            if (index === 0) return <CollectionDetailHeader collection={item.toJS()} navigation={this.props.navigation}/>;
            return this._renderDeal(item);
        }
        if (typeof item !== 'string') return null;

        switch (item) {
            case 'deal_count':
                return <Section title={`${this.state.data.get('total_deal', 0)} KHUYẾN MÃI`}/>;
            case 'sort':
                return <SortList selectedSortType={this.state.data.get('sortType', 'newest')}
                                 loading={this.state.isResorting}
                                 onSortSelected={this._onSortSelected}
                                 sorts={this.baseSorts}/>;
            default:
                return null;
        }
    }

    _renderDeal = (data) => {
        return (
            <View style={{marginTop: DIMENSION_PADDING_MEDIUM}}>
                <BigDealItem navigation={this.props.navigation}
                             path={'collection_detail'}
                             item={data.toJS()}/>
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (!StringUtil.isEmpty(nextProps.dealAction.get('action'))) {
            this._onCollectionDetailDataChangeDealInfo(nextProps.dealAction);
        }
        else if (!StringUtil.isEmpty(nextProps.collectionAction.get('action'))) {
            this._onCollectionDetailCollectionActionDispatcher(nextProps.collectionAction);
        }
        else if (nextProps.isLoginned !== this.props.isLoginned) {
            this._refreshByChangeLoginState();
        }
    }
}

CollectionDetail.propTypes = {
    cslug: PropTypes.any,
    collection: PropTypes.any
}

const mapStateToProps = (state) => {
    return {
        //Login
        isLoginned: state.loginReducer.isLoginned,
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),

        //collection action dispatcher
        collectionAction: state.collectionActionReducer,

        //deal action dispatcher
        dealAction: state.dealActionReducer,
    }
};

export default connect(mapStateToProps)(CollectionDetail)