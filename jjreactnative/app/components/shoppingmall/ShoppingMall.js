import { connect } from 'react-redux';
import { Container } from 'native-base';
import { View, FlatList, ActivityIndicator } from 'react-native';
import React  from 'react';

import ErrorView from '../common/ErrorView';
import JJHeader from '../common/JJHeader';
import ShoppingMallItem from './ShoppingMallItem';
import {BasePureComponent} from "../common/BasePureComponent";
import {DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import {COLOR_GRAY_BG, COLOR_PRIMARY} from "../../resources/colors";
import {commonApi} from '../../api/common-api'
import SortList from '../common/section/SortList'

const ITEM_LIMIT = 12;
class ShoppingMall extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    baseSorts = [
        { "sort_type": "name", "sort_name": "A-Z" },
        { "sort_type": "-deal_count", "sort_name": "Nhiều khuyến mãi" }
    ]

    constructor(props, context) {
        super(props, context);
        this.state = {
            isRefreshing: true,
            isLoading: true,
            isResorting: false,
            isError: false,
            hasMore: false,
            sortType: 'name',
            malls: []
        }

        if (!!props.latitude && !!props.longitude) {
            this.baseSorts.splice(1, 0, { "sort_type": "near", "sort_name": "Gần tôi" });
        }
    }


    render() {
        return (
            <Container>
                {/* Toolbar */}
                <JJHeader
                    showSearchBar={true}
                    navigation={this.props.navigation}
                    filter={"Trung tâm thương mại"}
                />
                {/* Content View */}
                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG }}>
                    {this._renderMainContent()}
                </View>

            </Container >
        )
    }

    _renderMainContent = () => {
        if (this.state.isError) return <ErrorView onTryAgain={this._refreshData}/>;
        return (
            <View style={{flex: 1}}>
                <SortList selectedSortType={this.state.sortType}
                          loading={false}
                          onSortSelected={this._onSortSelected}
                          sorts={this.baseSorts}
                          backgroundColor={'white'}/>
                <FlatList
                    ItemSeparatorComponent={this._renderItemSeparator}
                    style={{ flex: 1, backgroundColor: COLOR_GRAY_BG, paddingTop: DIMENSION_PADDING_MEDIUM}}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    data={this.state.malls}
                    onRefresh={this._refreshData}
                    onEndReached={this._onLoadMore}
                    onEndReachedThreshold={0.1}
                    refreshing={this.state.isRefreshing}
                    keyExtractor={this._getKeyExtractor}
                    renderItem={this._renderItem}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this._renderFooter}
                />
            </View>
        )
    }

    _getKeyExtractor = (item, index) => `mall_item_${index}_${item.id}`;

    _renderItem = ({ item }) => <ShoppingMallItem mall={item} navigation={this.props.navigation} />;

    _renderHeader = () => <View style={{ height: DIMENSION_PADDING_MEDIUM, backgroundColor: COLOR_GRAY_BG }} />;

    _renderItemSeparator = () => <View style={{ height: DIMENSION_PADDING_MEDIUM, backgroundColor: COLOR_GRAY_BG }} />;

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

    _onSortSelected = (item) => {
        if (item.sort_type === this.state.sortType) return;
        this.setState({
            ...this.state,
            sortType: item.sort_type,
            isResorting: true,
            isRefreshing: true,
            isError: false,
            hasMore: false,
        }, () => {
            this._fetchData(true);
        })
    }

    _onLoadMore = () => {
        if (this.state.hasMore && !this.state.isLoading && !this.state.isRefreshing) {
            this._fetchData(false);
        }
    }

    _refreshData = () => {
        this.setState({
            ...this.state,
            isRefreshing: true,
            isError: false,
            hasMore: false,
        }, () => {
            this._fetchData(true);
        })
    }

    _fetchData = (refresh) => {
        let offset = 0;
        if (refresh !== true) {
            offset = !!this.state.malls ? this.state.malls.length : 0;
        }

        this.setState({
            ...this.state,
            isLoading: true
        }, () => {
            commonApi.getShoppingMall(offset, ITEM_LIMIT, this.state.sortType)
                .then(response => {
                    console.log('getShoppingMall:response', response);
                    if (!response || !response.objects) {
                        this.setState({
                            ...this.state,
                            isLoading: false,
                            isRefreshing: false,
                            isError: false,
                            hasMore: false,
                            isResorting: false
                        })
                        return;
                    }
                    if (!!refresh) {
                        this.state.malls = response.objects;
                    }
                    else {
                        this.state.malls.push(...response.objects);
                    }
                    this.setState({
                        ...this.state,
                        isLoading: false,
                        isRefreshing: false,
                        isError: false,
                        hasMore: !!response.objects ? response.objects.length >= ITEM_LIMIT : false,
                        isResorting: false
                    })
                })
                .catch(error => {
                    console.log('getShoppingMall:error', error);
                    if (!!refresh) {
                        this.state.malls = [];
                    }
                    this.setState({
                        ...this.state,
                        isLoading: false,
                        isRefreshing: false,
                        isError: refresh,
                        isResorting: false
                    })
                })
        })
    }

    componentDidMount() {
        super.componentDidMount();
        this._refreshData();
    }
}

const mapStateToProps = (state) => {
    return {
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
    }
};

export default connect(mapStateToProps)(ShoppingMall);

