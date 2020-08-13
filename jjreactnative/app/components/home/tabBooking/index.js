import { connect } from 'react-redux';
import { Text } from 'native-base';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    VirtualizedList, Platform
} from 'react-native';
import React from 'react';

import {COLOR_GRAY_BG, COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from '../../../resources/colors'
import BigDealItem from '../../common/BigDealItem';
import Section from '../../common/Section';
import SortList from '../../common/section/SortList';
import {Map} from "immutable";
import Event from '../../common/section/Event';
import FixedGrid from "../../common/section/FixedGrid";
import Repository from "./Repository";
import {StringUtil} from '../../../utils/string-util'
import CollectionHorizontalList from '../../../components/common/section/CollectionHorizontalList'
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
} from "../../../resources/dimens";
import BookingSubList from './BookingSubList'
import EmptyResultWithFilter from "../../common/section/EmptyResultWithFilter";
import LocationLoadingView from '../../common/view/LocationLoadingView'
import TabBookingToolbar from './TabBookingToolbar'
import {ZINDEX} from "../../../NumberConstant";
import {AppConfig} from '../../../common/config';

const ios = Platform.OS === 'ios';
class TabBooking extends Repository {

    static navigationOptions = () => {
        return {
            tabBarOnPress({navigation, defaultHandler}) {
                !!navigation.state.params.onTabPressed && navigation.state.params.onTabPressed();
                defaultHandler();
            }
        };
    }

    TAG = 'TabBooking';

    constructor(props) {
        super(props);
        props.navigation.setParams({
            onTabPressed: this._onTabPressed
        });
    }

    render() {
        let filterCount = 0;
        if (!!this.state.data.get('filters')) {
            this.state.data.get('filters').map((item, i) => {
                filterCount += item.get('selectedCount', 0);
            })
        }
        let showFilter = !((!this.state.data || !this.state.data.get('sections') || this.state.data.get('sections').size < 1) && filterCount < 1);

        console.debug(`${this.TAG}:render:`, this.props, this.state);
        return (
            <View style={{flex: 1}}>

                <TabBookingToolbar
                    onSideMenuButtonPress={this.props.onToggleBurger}
                    navigation={this.props.navigation}
                    filterCount={filterCount}
                    showFilter={showFilter}
                    onFilterClicked={this._onFilterClicked}/>

                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG, zIndex: ZINDEX.TAB_BOOKING_CONTENT_BODY }}>
                    {
                        !!ios &&
                        !!this.state.isFiltering &&
                        <View style={{
                            padding: DIMENSION_PADDING_MEDIUM,
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            alignItems: 'center'
                        }}>
                            <ActivityIndicator animating={true}
                                               size={'small'}
                                               color={COLOR_PRIMARY}/>
                        </View>
                    }
                    {this.renderMainContent()}
                    {this._renderTabBookingOverlayLoading()}
                </View>
                {
                    !!this.state.findingLocation &&
                    <LocationLoadingView onCancelPressed={this._onCancelGetLocationClicked}/>
                }
            </View>
        )
    }

    renderMainContent() {
        return this._renderContent()
    }

    _renderTabBookingOverlayLoading = () => {
        if (!this.state.isOverlayLoading) return null;
        return (
            <View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: ZINDEX.TAB_BOOKING_OVERLAY_LOADING
            }}>
                <View
                    style={{
                        padding: DIMENSION_PADDING_MEDIUM,
                        backgroundColor: 'white',
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        alignSelf: 'center'
                    }}>
                    <ActivityIndicator size={'small'}
                                       animating={true}
                                       color={COLOR_PRIMARY}/>
                </View>
            </View>
        )
    }

    _renderContent = () => {

        return (
            <VirtualizedList
                ref={'tabBookingList'}
                refreshing={this.state.isRefreshing}
                onRefresh={this._onPullToRefreshAction}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                data={this.state.data.get('sections')}
                getItem={this._getItem}
                getItemCount={this._getItemCount}
                onEndReachedThreshold={0.5}
                onEndReached={this._onLoadMore}
                keyExtractor={this._getKeyExtractor}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderEmptyFilterResult}
                ListFooterComponent={this._renderFooter}
                removeClippedSubviews={!AppConfig.ios}
                extraData={this.state.data}
            />
        )
    }

    _getItemCount = (data) => !!data ? data.size : 0;

    _getItem = (data, index) => data.get(index);

    _onLoadMore = () => {
        if (this.state.hasMore && !this.state.isLoadingMore && this.state.isRefreshing !== true) {
            this.setState({
                ...this.state,
                isLoadingMore: true
            }, () => {
                this._fetchDeal(false);
            })
        }
    }

    _getKeyExtractor = (item, index) => {
        let key = `tab_discovery_section_${index}_`;
        if (!item) return key;

        if (typeof item === 'string') {
            return key + item;
        }
        if (Map.isMap(item)) {
            return key + item.get('id', '');
        }
        return key;
    }

    _renderItem = ({item, index}) => {
        if (Map.isMap(item)) {
            return this._renderDeal(item);
        }
        if (typeof item !== 'string') return null;

        switch (item) {
            case 'event':
                return this._renderEventSection();
            case 'trends':
                return this._renderFixedGrid(this.state.data.get('trends'));
            case 'sub_list':
                return this._renderBookingSubList(this.props.bookingSubList);
            case 'collections':
                return this._renderNewCollection(this.state.data.get('collections'));
            case 'sort':
                return this._renderHeaderSort();
            case 'deal_count':
                return this._renderHeaderName();
            case 'empty':
                return this._renderEmptyView();
        }
    }

    _renderEventSection = () => {
        return (
            <Event navigation={this.props.navigation}/>
        )
    }

    _renderFixedGrid = (data) => {
        return (
            <FixedGrid navigation={this.props.navigation}
                       path={'tab_booking'}
                       deals={data}/>
        )
    }

    _renderBookingSubList = (data) => {
        return (
            <BookingSubList navigation={this.props.navigation}
                            sublist={data}/>
        )
    }

    _renderNewCollection = (data) => {
        return (
            <CollectionHorizontalList navigation={this.props.navigation}
                                      title={'BỘ SƯU TẬP MỚI NHẤT'}
                                      collections={data}
                                      onCollectionClicked={this._onTabBookingCollectionPressed}
                                      onSaveCollectionClicked={this._onTabBookingSaveCollectionClicked}/>
        )
    }

    _renderHeaderName = () => {
        return (
            <Section title={`${this.state.data.get('total_deal', '')} KHUYẾN MÃI`} inactive={this.state.data.get('total_deal', 0) === 0}/>
        )
    }

    _renderHeaderSort = () => {
        return (
            <SortList selectedSortType={this.state.data.get('sortType', 'newest')}
                      loading={this.state.isResorting}
                      onSortSelected={this._onSortSelected}
                      sorts={this.tabBookingSorts}/>
        )
    }

    _renderDeal = (data) => {
        if (!data) return null
        return (
            <View style={{marginTop: DIMENSION_PADDING_MEDIUM}}>
                <BigDealItem navigation={this.props.navigation}
                             path={'tab_booking'}
                             item={data.toJS()}/>
            </View>
        )
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
                <View style={{height: 30}}/>
            </View>
        )
    }

    _renderEmptyView = () =>
        <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1, padding: DIMENSION_PADDING_MEDIUM}}>
            Không tìm thấy khuyến mãi phù hợp
        </Text>;

    _renderEmptyFilterResult = () => {
        let count = 0;
        if (!!this.state.data.get('filters')) {
            this.state.data.get('filters').map((item, i) => {
                count += item.get('selectedCount', 0);
            })
        }
        return (
            <EmptyResultWithFilter onOpenFilter={this._onFilterClicked}
                                   filterCount={count > 0 ? count : ''}/>
        )

    }

    _onCancelGetLocationClicked = () => {
        this.setState({
            ...this.state,
            findingLocation: false
        })
    }

    _onScrollToTop = () => {
        if (!this.mounted) return;
        setTimeout(() => {
            try {
                if (!this.mounted) return;
                if (!!this.refs && !!this.refs.tabBookingList) this.refs.tabBookingList.scrollToOffset({animated: true, offset: 0});
            } catch (e) {
                console.log(e);
            }
        }, 150);
    }

    _onTabBookingScrollToTopWithoutAnimate = () => {
        try {
            if (!this.mounted) return;
            if (!!this.refs && !!this.refs.tabBookingList) this.refs.tabBookingList.scrollToOffset({animated: false, offset: 0});
        } catch (e) {
            console.log(e);
        }
    }

    _onTabPressed = () => {
        if (!!this.props.navigation.isFocused()) {
            this._onScrollToTop();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (StringUtil.isBlank(this.props.selectedProvinceId) && !!nextProps.selectedProvinceId) {
            this._onTabBookingScrollToTopWithoutAnimate();
            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['filters'], () => undefined),
                isFilterMode: false
            }, this._refreshData);
            return;
        }

        if (nextProps.selectedProvinceId !== this.props.selectedProvinceId) {
            this._onTabBookingScrollToTopWithoutAnimate();
            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['filters'], () => undefined),
                isRefreshing: true,
                isFilterMode: false
            }, this._refreshData);
            return;
        }

        if (nextProps.isLoginned !== this.props.isLoginned) {
            this._onTabBookingScrollToTopWithoutAnimate();
            this._onTabBookingLoginStatusChanged();
            return;
        }

        if (!StringUtil.isEmpty(nextProps.collectionAction.get('action'))) {
            this._onTabBookingCollectionActionDispatcher(nextProps.collectionAction);
        }

        else if (!StringUtil.isEmpty(nextProps.dealAction.get('action'))) {
            this._onBookingTabDataChangeDealInfo(nextProps.dealAction);
        }
    }
}

const styles = StyleSheet.create({
    header: {
        paddingLeft: 44,
        paddingRight: 0,
        paddingBottom: 0,
        alignItems: 'center'
    },
    overlayView: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: ZINDEX.TAB_BOOKING_OVERLAY_DRAWER_OPENED
    }
});

const mapStateToProps = (state) => {
    return {
        //Location
        selectedProvinceId: state.locationReducer.getIn(['province', 'id'], ''),
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
        //Login
        isLoginned: state.loginReducer.isLoginned,

        //collection action dispatcher
        collectionAction: state.collectionActionReducer,

        //deal action dispatcher
        dealAction: state.dealActionReducer,

        bookingSubList: state.homeReducer.get('bookingSubList')
    }
};

export default connect(mapStateToProps)(TabBooking);

