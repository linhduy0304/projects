import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'native-base';
import {
    View,
    ActivityIndicator,
    VirtualizedList
} from 'react-native';
import {connect} from "react-redux";
import {Map} from "immutable";

import Repository from "./Repository";
import {COLOR_GRAY_BG, COLOR_PRIMARY} from "../../resources/colors";
import {StringUtil} from "../../utils/string-util";
import JJHeader from '../common/JJHeader'
import Section from '../common/Section';
import SubListCollection from './SubListCollection'
import CollectionTrending from './CollectionTrending'
import SortCollection from './SortCollection'
import CollectionItem from './CollectionItem'
import EmptyResult from './EmptyResult'
import {DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import {ObjectUtil} from '../../utils/object-utils';

class Collections extends Repository {

    render() {
        return (
            <Container>
                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={true}
                    filter={`Bộ sưu tập ${ObjectUtil.getValue(this, '', ['props', 'navigation', 'state', 'params', 'name'])}`}
                />
                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG }}>
                    {this._renderContent()}
                </View>
            </Container>
        )
    }

    _renderContent = () =>
        <VirtualizedList
            style={{flex: 1}}
            refreshing={this.state.isRefreshing}
            onRefresh={this._refreshData}
            initialNumToRender={2}
            maxToRenderPerBatch={5}
            data={this.state.data.get('sections')}
            getItem={(data, index) => data.get(index)}
            getItemCount={(data) => data.size}
            onEndReachedThreshold={0.5}
            onEndReached={this._onLoadMore}
            keyExtractor={this._getKeyExtractor}
            renderItem={this._renderItem}
            ListEmptyComponent={this._renderEmpty}
            ListFooterComponent={this._renderFooter}
            removeClippedSubviews={true}
        />;

    _getKeyExtractor = (item, index) => {
        let key = `collection_section_${index}_`;
        if (item) {
            if (Map.isMap(item)) {
                key += item.get('id', '');
            }
            else {
                key += index
            }
        }
        return key;
    }

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
        if (this.state.hasMore && !this.state.isLoadingMore && this.state.isRefreshing !== true) {
            this.setState({
                ...this.state,
                isLoadingMore: true
            }, () => {
                this._fetchCollection(false);
            })
        }
    }

    _renderEmpty = () => {
        if (this.state.isRefreshing) return null;
        return (
            <EmptyResult />
        )
    }

    _renderItem = ({ item, index }) => {
        if (typeof item === 'string') {
            switch (item) {
                case 'trends':
                    return this._renderTrending();
                case 'collection_count':
                    return this._renderHeaderName();
                case 'sort':
                    return this._renderHeaderSort();
                default:
                    return null;
            }
        }
        if (Map.isMap(item)) {
            switch (item.get('type')) {
                case 'sub_list':
                    return this._renderSubList(item.get('data'));
                default:
                    return this._renderCollectionItem(item);
            }
        }
    }

    _renderSubList = (data) => (
        <View>
            <Section title={'BẠN TÌM BỘ SƯU TẬP GÌ?'}/>
            <SubListCollection navigation={this.props.navigation}
                               sublist={data}/>
        </View>
    );

    _renderTrending = () => <CollectionTrending navigation={this.props.navigation} collections={this.state.trends}/>;

    _renderHeaderName = () => <Section title={`${this.state.data.get('total_collection', 0)} BỘ SƯU TẬP`}/>;

    _renderHeaderSort = () => <SortCollection selectedSortType={this.state.data.get('sortType', 'modified')}
                                              loading={this.state.isResorting}
                                              onSortSelected={this._onSortSelected}/>;

    _renderCollectionItem = (data) => <CollectionItem collection={data.toJS()} navigation={this.props.navigation}/>

    componentWillReceiveProps(nextProps) {
        if (!StringUtil.isEmpty(nextProps.collectionAction.get('action'))) {
            this._onCollectionListCollectionActionDispatcher(nextProps.collectionAction);
        }
        else if (nextProps.isLoginned !== this.props.isLoginned) {
            this._refreshData();
        }
    }
}

Collections.propTypes = {
    name: PropTypes.any,
    tags: PropTypes.any
}

const mapStateToProps = (state) => {
    return {
        //Login
        isLoginned: state.loginReducer.isLoginned,

        //collection action dispatcher
        collectionAction: state.collectionActionReducer,
    }
};

export default connect(mapStateToProps)(Collections)