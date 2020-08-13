import { connect } from 'react-redux';
import {
    View,
    VirtualizedList,
    Animated,
    Dimensions,
    Platform
} from 'react-native';
import React  from 'react';
import {Map} from "immutable";

import {COLOR_GRAY_BG} from '../../../resources/colors'
import ErrorView from '../../common/ErrorView';
import Event from '../../common/section/Event';
import GridCategory from './sections/GridCategory'
import Repository from "./Repository";
import {StringUtil} from "../../../utils/string-util";
import FixedGrid from "../../common/section/FixedGrid";
import FixedHorizontalList from "../../common/section/FixedHorizontalList";
import GridView from "../../common/section/GridView";
import HorizontalList from "../../common/section/HorizontalList";
import TabDiscoveryToolbar from './TabDiscoveryToolbar'
import BrandDayHeader from './BrandDayHeader'
import {ObjectUtil} from '../../../utils/object-utils'
import FloatButton from './FloatButton'
import {ZINDEX} from "../../../NumberConstant";
import {AppConfig} from "../../../common/config";

const {width} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const toolbarSize = ios ? 44 : 56;

const footerView = <View style={{height: 30}}/>;
const VirtualizedListAnimated = Animated.createAnimatedComponent(VirtualizedList);

class TabDiscovery extends Repository {

    static navigationOptions = () => {
        return {
            tabBarOnPress({navigation, defaultHandler}) {
                !!navigation.state.params.onTabPressed && navigation.state.params.onTabPressed();
                defaultHandler();
            }
        };
    }

    TAG = 'TabDiscovery';

    scrollY = new Animated.Value(0);
    scrollYPosition = 0;

    constructor(props) {
        super(props);

        let statusBarStyle = 'dark-content';

        if (!!props.brandDayTheme && props.brandDayTheme.indexOf('light') >= 0) {
            statusBarStyle = 'light-content';
        }

        props.navigation.setParams({
            statusBarStyle,
            onTabPressed: this._onTabPressed
        });
    }


    render() {

        console.debug(`${this.TAG}:render`, this.props, this.state, !!this.state.sections ? this.state.sections.toJS() : undefined);

        return (
            <View style={{flex: 1}}>
                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG}}>
                    {this._renderContent()}
                    {this._renderOverlayLoadingIfNeed()}

                    {
                        !!this.props.banner50 &&
                        <FloatButton ref={'floatButtonRef'}
                                     banner={this.props.banner50}
                                     navigation={this.props.navigation}/>
                    }
                </View>

                <TabDiscoveryToolbar
                    ref={'toolbarRef'}
                    navigation={this.props.navigation}
                    scrollY={this.scrollY}
                    styleColor={this.props.brandDayTheme}
                    headerColor={this.props.brandDayColor}
                />
            </View>
        )
    }

    _renderOverlayLoadingIfNeed = () => {
        if (!this.state.isOverlayLoading) return null;
        return (
            <View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                justifyContent: 'center',
                backgroundColor: 'transparent',
                zIndex: ZINDEX.TAB_DISCOVERY_OVERLAY_LOADING
            }}/>
        )
    }

    _renderContent = () => {

        return (
            <VirtualizedListAnimated
                ref={'tabDiscoveryList'}
                refreshing={this.props.isRefreshing}
                onRefresh={this._refreshData}
                progressViewOffset={100}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                data={this.state.sections}
                getItem={this._getItem}
                getItemCount={this._getItemCount}
                onEndReachedThreshold={0.5}
                keyExtractor={this._getKeyExtractor}
                renderItem={this._renderItem}
                ListHeaderComponent={this._renderTabDiscoveryHeader}
                ListEmptyComponent={this._renderEmpty}
                ListFooterComponent={footerView}
                removeClippedSubviews={!AppConfig.ios}
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: this.scrollY
                                },
                            }
                        }
                    ],
                    {
                        useNativeDriver: true,
                        listener: this._onTabDiscoveryScrollable
                    }
                )}
            />
        )
    }

    _renderTabDiscoveryHeader = () => {
        if (!!this.props.brandDayData) return null;
        return (
            <View
                style={{
                    height: toolbarSize + 28,
                    width,
                    backgroundColor: 'white'
                }}/>
        )
    }

    _onTabDiscoveryScrollable = e => {
        try {
            if (!!this.refs.floatButtonRef && !!this.refs.floatButtonRef.didInit) {
                const cal = e.nativeEvent.contentOffset.y - this.scrollYPosition;
                if (Math.abs(cal) > 3 || !ObjectUtil.getValue(this.refs, undefined, ['floatButtonRef'])) {
                    if (cal >= 0) this.refs.floatButtonRef._startHide();
                    else this.refs.floatButtonRef._startShow();
                }
            }

            this.scrollYPosition = e.nativeEvent.contentOffset.y;
        } catch (e) {
            console.log(e);
        }
    }

    _getItem = (data, index) => data.get(index);

    _getItemCount = (data) => !!data ? data.size : 0;

    _getKeyExtractor = (item, index) => {
        let key = `tab_discovery_section_${index}_`;
        if (item) {
            if (Map.isMap(item)) {
                key += item.get('type', '');
            }
            else {
                key += index
            }
        }
        return key;
    }

    _renderEmpty = () => !!this.initialization ? null : <ErrorView onTryAgain={this._refreshData} />;

    _renderItem = ({ item, index }) => {
        switch (item.get('type')) {
            case 'brand_day_header':
                if (!this.props.brandDayData) return null;
                return <BrandDayHeader image={this.props.brandDayData.get('banner', '')}
                                       backgroundColor={this.props.brandDayData.get('header_color', 'white')}
                                       brandDetailDeeplink={this.props.brandDayData.get('deeplink')}
                                       brandDetailUrl={this.props.brandDayData.get('target_url')}
                                       brandSlug={this.props.brandDayData.getIn(['deals', 0, 'brand', 'brand_slug'], '')}
                                       navigation={this.props.navigation}/>;

            case 'brand_day_deal':
                if (!this.props.brandDayData) return null;
                return <FixedGrid navigation={this.props.navigation}
                                  path={`tab_discovery_brand_day`}
                                  deals={this.props.brandDayData.get('deals')}
                                  isBrandDay={true}
                                  backgroundColor={this.props.brandDayData.get('background_color', '#fff')}
                                  detailButtonTextColor={this.props.brandDayData.get('button_text_color', '#fff')}
                                  detailButtonColor={this.props.brandDayData.get('button_color', '#fff')}
                                  detailButtonText={this.props.brandDayData.get('button_text', 'Chi tiết')}
                                  brandDetailDeeplink={this.props.brandDayData.get('deeplink')}
                                  brandDetailUrl={this.props.brandDayData.get('target_url')}/>;

            case 'event':
                return <Event navigation={this.props.navigation}/>;

            case 'fixed_grid':
                return <FixedGrid navigation={this.props.navigation}
                                  path={`tab_discovery_${item.getIn(['data', 'type_deal'])}`}
                                  deals={item.getIn(['data', 'deals'])}
                                  isBrandDay={false}
                                  backgroundColor={COLOR_GRAY_BG}/>;

            case 'category_grid':
                return this._renderGridCategory();
            case 'fixed_horizontal_list':
                return this._renderFixedHorizontalList(item);
            case 'grid_view':
                return this._renderGridView(item);
            case 'horizontal_list':
                return this._renderHorizontalList(item);
            default:
                return null;
        }
    }

    _renderGridCategory = () => <GridCategory navigation={this.props.navigation}/>;

    _renderFixedHorizontalList = (data) => <FixedHorizontalList navigation={this.props.navigation}
                                                                deals={data.getIn(['data', 'deals'])}
                                                                title={data.getIn(['data', 'name'])}
                                                                path={`tab_discovery_${data.getIn(['data', 'type_deal'])}`}/>;

    _renderGridView = (data) => <GridView navigation={this.props.navigation}
                                          title={data.getIn(['data', 'name'])}
                                          path={`tab_discovery_${data.getIn(['data', 'type_deal'])}`}
                                          deals={data.getIn(['data', 'deals'])}
                                          showMore={data.getIn(['data', 'load_more'])}
                                          screenType={data.getIn(['data', 'screen_type'])}
                                          subList={data.getIn(['data', 'sub_list'])}/>;

    _renderHorizontalList = (data) => <HorizontalList navigation={this.props.navigation}
                                                      deals={data.getIn(['data', 'deals'])}
                                                      title={data.getIn(['data', 'name'])}
                                                      showMore={data.getIn(['data', 'load_more'])}
                                                      screenType={data.getIn(['data', 'screen_type'])}
                                                      path={`tab_discovery_${data.getIn(['data', 'type_deal'])}`}
                                                      subList={data.getIn(['data', 'sub_list'])}/>;

    _onScrollToTop = () => {
        if (!this.mounted) return;
        try {
            if (!!ObjectUtil.getValue(this.refs, undefined, ['tabDiscoveryList', '_component', 'scrollToOffset'])) {
                this.refs.tabDiscoveryList._component.scrollToOffset({animated: true, offset: 0});
            }
        } catch (e) {
            console.log(e);
        }
    }

    _onTabDiscoveryScrollToTopWithoutDelay = () => {
        if (!this.mounted) return;
        try {
            if (!!ObjectUtil.getValue(this.refs, undefined, ['tabDiscoveryList', '_component', 'scrollToOffset'])) {
                this.refs.tabDiscoveryList._component.scrollToOffset({animated: false, offset: 0});
            }
        } catch (e) {
            console.log(e);
        }
    }

    _onTabPressed = () => {
        if (!!this.props.navigation.isFocused()) {
            this._onScrollToTop();
        }
    }

    componentDidMount() {
        super.componentDidMount();
        if (!!this.props.homePageData) {
            this._prepareSectionData(this.props.homePageData);
        }

        if (!!this.props.setOnScrollToTopMethod) this.props.setOnScrollToTopMethod(this._onScrollToTop);
    }

    componentWillReceiveProps(nextProps) {
        // console.debug(`${this.TAG}:componentWillReceiveProps: `, this.props, nextProps);

        if (StringUtil.isBlank(this.props.selectedProvinceId) && !!nextProps.selectedProvinceId) {
            this._refreshData();
            return;
        }
        if (nextProps.selectedProvinceId !== this.props.selectedProvinceId) {
            this._refreshData();
            this._onTabDiscoveryScrollToTopWithoutDelay();
            return;
        }
        if (nextProps.isLoginned !== this.props.isLoginned) {
            this.setState({
                ...this.state,
                isOverlayLoading: true
            }, this._refreshData);
            return;
        }

        if (!StringUtil.isEmpty(nextProps.dealAction.get('action'))) {
            this._onDiscoveryTabDealActionDispatcher(nextProps.dealAction);
        }

        if (ObjectUtil.getValue(this, undefined, ['props', 'brandDayTheme']) !== nextProps.brandDayTheme) {

            if (!!nextProps.brandDayTheme && nextProps.brandDayTheme.indexOf('light') >= 0) {
                this.props.navigation.setParams({
                    statusBarStyle: 'light-content'
                })
            }
            else {
                console.debug(`${this.TAG}:componentWillReceiveProps:setParams:dark`);
                this.props.navigation.setParams({
                    statusBarStyle: 'dark-content'
                })
            }
        }

        // console.debug(`${this.TAG}:componentWillReceiveProps2: `, nextProps, this.props, this.needReRender, this.canRender);

        if (nextProps.isRefreshing !== this.props.isRefreshing || nextProps.isError !== this.props.isError) {
            this._prepareSectionData(nextProps.homePageData);
        }
    }
}

function mapStateToProps(state) {
    return {
        //Location
        selectedProvinceId: state.locationReducer.getIn(['province', 'id'], ''),
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),
        //Login
        isLoginned: state.loginReducer.isLoginned,

        //deal action dispatcher
        dealAction: state.dealActionReducer,

        homePageData: state.homeReducer.get('homePageData'),
        isRefreshing: state.homeReducer.get('isHomePagesLoading'),
        isError: state.homeReducer.get('isHomePagesError'),
        brandDayTheme: state.homeReducer.get('brandDayTheme'),
        brandDayColor: state.homeReducer.get('brandDayColor'),
        brandDayData: state.homeReducer.get('brandDayData'),
        banner50: state.homeReducer.getIn(['banners', 'banner_50'])
    };
}

export default connect(mapStateToProps)(TabDiscovery);