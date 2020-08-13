import React from 'react'
import PropTypes from 'prop-types'
import Repository from "./Repository";
import {COLOR_GRAY_BG, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import {Container, Header, Text} from 'native-base';
import {
    View,
    Platform,
    ActivityIndicator,
    VirtualizedList
} from 'react-native';
import FilterButton from "../../common/section/FilterButton";
import {Map} from "immutable";
import {StringUtil} from "../../../utils/string-util";
import JJHeader from '../../common/JJHeader'
import FixedGrid from '../../common/section/FixedGrid'
import Section from '../../common/Section';
import BigDealItem from '../../common/BigDealItem';
import SortList from '../../common/section/SortList';
import CollectionHorizontalList from '../../common/section/CollectionHorizontalList'
import HorizontalListWithSectionHeaderNotBottomLine from '../../common/section/HorizontalListWithSectionHeaderNotBottomLine'
import {connect} from "react-redux";
import {
    DIMENSION_PADDING_EXTRA,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import EmptyResultWithFilter from '../../common/section/EmptyResultWithFilter'
import CategorySubList from '../../common/section/CategorySubList'
import LocationLoadingView from "../../common/view/LocationLoadingView";

const ios = Platform.OS === 'ios';
class SubCategory extends Repository {

    render() {
        const hideSelectedCity = 'ma-giam-gia' === this.props.navigation.state.params.screenType;
        return (
            <Container>
                <Header androidStatusBarColor="#2c3e50" style={{display:'none'}}/>

                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={true}
                    filter={this.props.navigation.state.params.title}
                    rightItem={() => this._renderFilterButton()}
                    hideSelectedCity={hideSelectedCity}
                />
                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG }}>
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
                    {this._renderContent()}
                </View>

                {
                    !!this.state.findingLocation &&
                    <LocationLoadingView onCancelPressed={this._onCancelGetLocationClicked}/>
                }
            </Container>
        )
    }

    _renderFilterButton = () => {
        let count = 0;
        if (!!this.state.data.get('filters')) {
            this.state.data.get('filters').map((item, i) => {
                count += item.get('selectedCount', 0);
            })
        }

        const filterVisibility = !(!this.state.data || !this.state.data.get('sections') || this.state.data.get('sections').size < 1);
        if (!filterVisibility && count <=0) return null;

        return (
            <FilterButton onPress={this._onFilterClicked}
                          navigation={this.props.navigation}
                          badgeNumber={count}/>
        )
    }

    _renderContent = () => {

        console.log("Category:render", this.state.data.get('sections').toJS());
        return (
            <VirtualizedList
                ref={'categoryList'}
                refreshing={this.state.isRefreshing}
                onRefresh={this._onPullToRefreshCatAction}
                initialNumToRender={3}
                maxToRenderPerBatch={5}
                data={this.state.data}
                getItem={this._getCategorySectionDataItem}
                getItemCount={this._getCategorySectionItemCount}
                onEndReachedThreshold={0.5}
                onEndReached={this._onCategoryLoadMore}
                keyExtractor={this._getCategoryItemKeyExtractor}
                renderItem={this._renderCategorySectionItem}
                ListEmptyComponent={this._renderCategoryListResultEmpty}
                ListFooterComponent={this._renderCategoryFooter}
                removeClippedSubviews={true}
            />
        )
    }

    _getCategorySectionDataItem = (data, index) => data.getIn(['sections', index]);

    _getCategorySectionItemCount = (data) => !!data ? data.get('sections').size : 0;

    _renderCategoryFooter = () => {
        return (
            <View>
                {
                    this.state.hasMore &&
                    <ActivityIndicator animating={true}
                                       size={'small'}
                                       color={COLOR_PRIMARY}
                                       style={{marginTop: DIMENSION_PADDING_MEDIUM}}/>
                }
                <View style={{height: DIMENSION_PADDING_EXTRA}}/>
            </View>
        )
    }

    _onCancelGetLocationClicked = () => {
        this.setState({
            ...this.state,
            findingLocation: false
        })
    }

    _onCategoryLoadMore = () => {
        console.log('_onLoadMore');
        if (this.state.hasMore && !this.state.isLoadingMore && this.state.isRefreshing !== true) {
            this.setState({
                ...this.state,
                isLoadingMore: true
            }, () => {
                this._fetchDeals(false);
            })
        }
    }

    _getCategoryItemKeyExtractor = (item, index) => {
        let key = `sub_cat_section_${index}_`;
        if (item) {
            if (Map.isMap(item)) {
                key += item.get('id', '');
            }
            else if (typeof item === 'string') {
                key += item
            }
            else {
                key += index
            }
        }
        return key;
    }

    _renderCategorySectionItem = ({ item, index }) => {
        if (Map.isMap(item)) {
            return (
                <View style={{marginTop: DIMENSION_PADDING_MEDIUM}}>
                    <BigDealItem navigation={this.props.navigation} item={item.toJS()} path={'category'}/>
                </View>
            )
        }
        if (typeof item !== 'string') return null;

        switch (item) {
            case 'sub_list':
                return <CategorySubList navigation={this.props.navigation}
                                        screenType={this.props.navigation.state.params.screenType}
                                        sublist={this.props.navigation.state.params.subList}/>
            case 'trends':
                return <FixedGrid navigation={this.props.navigation}
                                  deals={this.state.data.get('trends')}
                                  path={'category'}/>;
            case 'collections':
                return <CollectionHorizontalList navigation={this.props.navigation}
                                                 title={'BỘ SƯU TẬP MỚI NHẤT'}
                                                 collections={this.state.data.get('collections')}
                                                 onCollectionClicked={this._onCollectionPressed}
                                                 onSaveCollectionClicked={this._onSaveCollectionClicked}/>;
            case 'deal_count':
                const totalDealCount = this.state.data.get('total_deal', 0);
                if (totalDealCount <= 0) return null;
                return <Section title={`${totalDealCount} KHUYẾN MÃI`}/>;
            case 'sort':
                return <SortList selectedSortType={this.state.data.get('sortType', 'newest')}
                                 loading={this.state.isResorting}
                                 onSortSelected={this._onSortSelected}
                                 sorts={this.baseSorts}/>;

            case 'exclusiveDeals':
                return this._renderCategoryExclusiveDeals();

            case 'empty':
                return this._renderCategoryEmptyView();
        }
    }

    _renderCategoryExclusiveDeals = () => {
        if (!this.state.data.get('exclusiveDeals') || this.state.data.get('exclusiveDeals').size < 1) return null;

        return (
            <View>
                <HorizontalListWithSectionHeaderNotBottomLine
                    navigation={this.props.navigation}
                    deals={this.state.data.get('exclusiveDeals')}
                    title={'ĐỘC QUYỀN - CHỈ CÓ TẠI JAMJA'}
                    showMore={this.state.data.get('exclusiveCount', 0) > 5}
                    path={'category'}
                    screenType={'doc-quyen'}
                    onViewMoreExclusive={this._onViewMoreExclusiveDealClicked}/>

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: DIMENSION_TEXT_CONTENT,
                    marginTop: DIMENSION_PADDING_LARGE,
                    marginLeft: DIMENSION_PADDING_LARGE,
                    color: COLOR_TEXT_INACTIVE
                }}>
                    TẤT CẢ KHUYẾN MÃI
                </Text>
            </View>
        )
    }

    _renderCategoryEmptyView = () =>
        <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1, padding: DIMENSION_PADDING_MEDIUM, marginTop: DIMENSION_PADDING_SMALL}}>
            Không tìm thấy khuyến mãi phù hợp
        </Text>;

    _renderCategoryListResultEmpty = () => {
        if (this.state.isRefreshing || this.state.isFiltering) return null;

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

    _onCategoryScrollToTopWithoutAnimate = () => {
        try {
            if (!this.mounted) return;
            if (!!this.refs && !!this.refs.categoryList) this.refs.categoryList.scrollToOffset({animated: false, offset: 0});
        } catch (e) {
            console.log(e);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (StringUtil.isBlank(this.props.selectedProvinceId) && !!nextProps.selectedProvinceId) {
            this._onCategoryScrollToTopWithoutAnimate();
            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['filters'], () => undefined),
                isFilterMode: false
            }, this._refreshData);
            return;
        }

        if (nextProps.selectedProvinceId !== this.props.selectedProvinceId) {
            this._onCategoryScrollToTopWithoutAnimate();
            this.setState({
                ...this.state,
                data: this.state.data.updateIn(['filters'], () => undefined),
                isFilterMode: false
            }, this._refreshData);
            return;
        }

        if (nextProps.isLoginned !== this.props.isLoginned) {
            this._onCategoryScrollToTopWithoutAnimate();
            this._onCategoryLoginStatusChanged();
            return;
        }

        if (!StringUtil.isEmpty(nextProps.collectionAction.get('action')) && this._hasCollectionData()) {
            this._onSubCategoryCollectionActionDispatcher(nextProps.collectionAction);
        }
        else if (!StringUtil.isEmpty(nextProps.dealAction.get('action'))) {
            this._onSubCatDataChangeDealInfo(nextProps.dealAction);
        }
    }
}

SubCategory.propTypes = {
    title: PropTypes.any,
    screenType: PropTypes.any,
    detailTag: PropTypes.any,
    subList: PropTypes.any,
    onlyExclusive: PropTypes.any
}

const mapStateToProps = (state) => {
    return {
        //Location
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
        selectedProvinceId: state.locationReducer.getIn(['province', 'id']),
        //Login
        isLoginned: state.loginReducer.isLoginned,

        //collection action dispatcher
        collectionAction: state.collectionActionReducer,

        //deal action dispatcher
        dealAction: state.dealActionReducer,
    }
};

export default connect(mapStateToProps)(SubCategory)