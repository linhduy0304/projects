import {connect} from 'react-redux';
import {Container, Tab, Tabs, ScrollableTab, Spinner} from 'native-base';
import {View, TouchableOpacity, Dimensions, Alert, Platform, Share} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image'

import {COLOR_PRIMARY} from '../../resources/colors';
import ButtonShare from './buttonshare/ButtonShare';
import JJHeader from '../common/JJHeader';
import {fromJS} from 'immutable'
import SingleDealV2 from './singledeal/SingleDealV2'

import {dealApi} from '../../api/deal-api'
import {StringUtil} from '../../utils/string-util'
import TabItem from './TabItem'

import {AnalyticsUtil} from '../common/analytics/analytics'
import {BaseComponent} from "../common/BaseComponent";
import {shareDeal} from "./action";
import {ObjectUtil} from '../../utils/object-utils'
import {DIMENSION_BUTTON_MEDIUM} from "../../resources/dimens";
import {calculateDistance} from "../../utils/LocationUtils";
import {buildImageSource, IMAGE_INTERNET} from '../../utils/image-util';

const { width } = Dimensions.get('window');

const ios = Platform.OS === 'ios';

class DealDetail extends BaseComponent {

    static navigationOptions = {
        header: null,
    };

    currentTabDeal = 0;
    hasLoadRelated = false;

    constructor(props) {
        super(props);
        this.state = {
            action: fromJS({
                name: undefined,
                data: undefined
            })
        }
    }

    render() {
        console.log('---- rerender deal detail parent')
        const deal = !!this.state.deals && this.state.deals.size > 0 ? this.state.deals.get(0) : undefined;
        let brandImage = StringUtil.addSizeToImageUrl(!!deal ? deal.getIn(['brand', 'image'], '') : '', width - 90);
        return (
            <Container>
                {/* Header */}
                <JJHeader
                    navigation={this.props.navigation}
                    customTitleView={() => this._renderHeader(brandImage)}
                    rightItem={this._renderShareDealButton}
                />
                {/* Content */}
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
                    {this._renderMainContent()}
                </View>
            </Container>
        )
    }

    _renderHeader = (brandImage) => {
        return (
            <View style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: DIMENSION_BUTTON_MEDIUM
            }}>
                <TouchableOpacity
                    onPress={this._goToBrandDetail}
                    style={{
                        width: 100,
                        height: 30,
                    }}>
                    <FastImage
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        source={buildImageSource(IMAGE_INTERNET, brandImage)}
                        resizeMode={FastImage.resizeMode.contain}/>
                </TouchableOpacity>
            </View>
        )
    }

    _renderShareDealButton = () => <ButtonShare onSharePressed={this._onShareDealClicked} onSearchPressed={this._onButtonSearchClicked}/>;

    _renderMainContent = () => {
        if (!this.state.deals || this.state.deals.size < 1) {
            return (
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Spinner color={COLOR_PRIMARY} />
                </View>
            )
        }
        return (
            <Tabs ref={'DealDetailScrollableTab'}
                  renderTabBar={this._renderTabBar}
                  locked={!ios}
                  initialPage={0}
                  onChangeTab={this._onTabChangeListener}
                  tabBarPosition={'top'}
                  tabBarUnderlineStyle={{backgroundColor: COLOR_PRIMARY, height: 2}}
                  tabStyle={{backgroundColor: 'white'}}>
                 {
                     this.state.deals.map((deal, index) => {
                         const key = 'tab_deal_' + index + '_' + deal.get('slug', '');
                         return (
                             <Tab key={key}
                                  heading={this._parserTabLabel(deal)}>
                                 <SingleDealV2
                                     slug={deal.get('slug', '')}
                                     deal={deal}
                                     tabIndex={index}
                                     isMainView={index === 0}
                                     navigation={this.props.navigation}
                                     exclusiveDeals={this.state.exclusiveDeals}
                                     onActionTrigged={this._onActionTriggered}
                                     onUpdateData={this._onUpdateData}
                                     actionName={this.state.action.get('name', '')}
                                     actionData={this.state.action.get('data', '')}
                                    />
                             </Tab>
                         )
                     })
                 }
            </Tabs>
        )
    }

    _renderTabBar = () => <ScrollableTab renderTab={this._renderTab} backgroundColor={'white'}/>;

    _renderTab = (name, page, isTabActive, onPressHandler, onLayoutHandler) => {
        return (
            <TabItem key={`${name}_${page}`}
                     name={name}
                     active={isTabActive}
                     page={page}
                     onLayoutHandler={onLayoutHandler}
                     onPressHandler={onPressHandler}/>
        )
    }

    _onButtonSearchClicked = () => {
        AnalyticsUtil.logNormalEvent(
            'deal_detail_search_clicked',
            {},
            'deal_detail'
        );
        this.props.navigation.push('SearchDeal');
    }

    _onTabChangeListener = (tab) => {
        console.log('----------DealDetail; ', this.currentTabDeal, tab.i);
        if (this.currentTabDeal === tab.i) return;
        this.currentTabDeal = tab.i;

        const deal = this.state.deals.get(tab.i);

        if (!!deal) {
            console.log('========Dealdetaul tab change', deal.get('view_visibility'));

            const dealSlug = deal.get('slug', '');
            const dealType = deal.get('deal_type', '');
            const brandSlug = deal.getIn(['brand', 'brand_slug'], '');

            this.setState({
                currentUrlToShare: deal.get('deal_url', ''),
                currentSlug: dealSlug
            });
            const baseLogParams = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_category: dealType,
                deal_type: dealType
            };

            this._logDetailTabTrigger(baseLogParams);

            if (!!deal.get('view_visibility', false)) {
                this._logViewContent(deal.getIn(['brand', 'brand_slug'], ''), deal.get('slug', ''), deal.get('deal_type', ''));
                this._logViewDealDetail(deal, tab.i === 0);
            }
        }
    }

    _onShareDealClicked = () => {
        console.log('----------DealDetail; _onShareDealClicked', this.state);
        if (StringUtil.isEmpty(this.state.currentUrlToShare)) return;
        Share.share({
            message: this.state.currentUrlToShare,
            url: this.state.currentSlug
        });

        this.props.dispatch(
            shareDeal(
                this.state.currentSlug,
                -1
            )
        )
    }

    _parserTabLabel = (deal) => {
        let highlight = deal.get('highlight') ? deal.get('highlight') : deal.get('highlight_title');
        if (StringUtil.isEmpty(highlight)) highlight = deal.get('title', '');
        return highlight + ":" + deal.get('deal_type');
    }

    _onUpdateData = (action, data) => {
        if (!this.state.deals || this.state.deals.size < 1) return;

        try {

            console.debug('+++_onUpdateData: ', action, data);
            if (action === 'deal_url') {

                if (ObjectUtil.getValue(this.refs, -1, ['DealDetailScrollableTab', 'state', 'currentPage']) === 0) {
                    this.state.currentUrlToShare = data;
                }
                this.setState({
                    ...this.state,
                    deals: this.state.deals.updateIn([0, 'deal_url'], () => data)
                });
            }
            else if (action === 'view_visibility' && !!data.deal_slug) {
                const findDealIndex = this.state.deals.findIndex((deal) => deal.get('slug') === data.deal_slug && !deal.get('view_visibility', false));

                console.debug('+++_onUpdateData:findDealIndex ', findDealIndex);
                if (findDealIndex >= 0) {
                    const deal = this.state.deals.get(findDealIndex);
                    if (!deal) return;

                    console.debug('+++_onUpdateData:deal ', deal.toJS());

                    const deals = this.state.deals.updateIn([findDealIndex], deal => deal.updateIn(['view_visibility'], () => true));

                    console.debug('+++_onUpdateData:deals ', deals.toJS());

                    this.setState({
                        ...this.state,
                        deals
                    });

                    this._logViewContent(deal.getIn(['brand', 'brand_slug'], ''), deal.get('slug', ''), deal.get('deal_type', ''));
                    this._logViewDealDetail(deal, findDealIndex === 0);
                }
            }
            else if (action === 'main_load_finish') this._mainViewHasLoadFinished();
        } catch (e) {
            console.log(e);
        }
    }

    _mainViewHasLoadFinished = () => {
        if (!this.hasLoadRelated) this._fetchDealByBrand();
    }

    _goToBrandDetail = () => {
        if (!!this.state.deals && !!this.state.deals.getIn([0, 'brand'])) {
            this.props.navigation.navigate('BrandDetail', {brand: this.state.deals.getIn([0, 'brand']).toJS()})
        }
    }

    _initDealIfNeed = () => {

        if (!!ObjectUtil.hasValue(this.props.navigation, ['state', 'params','deal'])) {
            const deal = fromJS(this.props.navigation.state.params.deal);

            const dealSlug = deal.get('slug', '');
            const dealType = deal.get('deal_type', '');
            const brandSlug = deal.getIn(['brand', 'brand_slug'], '');

            this._logParentViewContent(brandSlug, dealSlug, dealType);

            this._logDetailTabTrigger(
                {
                    item_id: dealSlug,
                    item_brand: brandSlug,
                    item_category: dealType,
                    deal_type: dealType
                }
            );

            this.setState({
                deals: fromJS([deal]),
                currentUrlToShare: this.props.navigation.state.params.deal.deal_url,
                currentSlug: this.props.navigation.state.params.deal.slug,
                exclusiveDeals: undefined
            }, () => {
                this._fetchExclusiveDeal();
            });
            return;
        }
        if (!StringUtil.isBlank(this.props.navigation.state.params.slug)) {
            dealApi.getDealDetail(this.props.navigation.state.params.slug)
                .then(response => {
                    console.log('DealDetail:getDealDetail__:response', response);

                    // response.deal_type = DEAL_TYPE_MOVIE;
                    // response.film_name = '100 Sắc thái';
                    // response.genre = 'Hành động, Viễn tưởng';
                    // response.imdb = 7.1;
                    // response.run_time = 150;
                    // response.trailer_url = 'Rzm_kltwHbg';
                    // response.rating = 'C16';
                    // response.partner_name = 'bhd_cinema';

                    response.is_detail_obj = true;

                    if (!!response.stores) {
                        if (!!this.props.latitude) {
                            response.stores.map((store) => {
                                store['distance'] = calculateDistance(store.latitude, store.longitude, this.props.latitude, this.props.longitude);
                            });
                            response.stores.sort(function (a, b) {
                                return a.distance - b.distance;
                            });
                        }
                        else {
                            response.stores.sort(function (a, b) {
                                if (!a.address || !b.address) return 1;
                                return (a.address + '').localeCompare(b.address);
                            });
                        }
                    }

                    if (response.stores === undefined) response.stores = [];

                    const deal = fromJS(response);

                    const dealSlug = deal.get('slug', '');
                    const dealType = deal.get('deal_type', '');
                    const brandSlug = deal.getIn(['brand', 'brand_slug'], '');

                    this._logParentViewContent(brandSlug, dealSlug, dealType);
                    this._logDetailTabTrigger(
                        {
                            item_id: dealSlug,
                            item_brand: brandSlug,
                            item_category: dealType,
                            deal_type: dealType
                        }
                    );

                    this.setState({
                        deals: fromJS([deal]),
                        currentUrlToShare: response.deal_url,
                        currentSlug: response.slug,
                        exclusiveDeals: undefined
                    }, () => {
                        this._fetchExclusiveDeal();
                    });
                })
                .catch(error => {
                    console.log('DealDetail:getDealDetail:error', error);
                    Alert.alert(
                        'Lỗi',
                        'Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!',
                        [
                            { text: "ĐÓNG", style: 'cancel' }
                        ],
                        {cancelable: true}
                    )
                })
        }
    }

    _fetchDealByBrand = () => {
        this.hasLoadRelated = true;
        let brandId = undefined;
        if (!!ObjectUtil.hasValue(this.props.navigation, ['state','params','deal','brand'])) {

            brandId = this.props.navigation.state.params.deal.brand.id;
        }
        else if (ObjectUtil.hasValueObject(this.state.deals) && !!this.state.deals.get(0)) {
            brandId = this.state.deals.get(0).getIn(['brand', 'id']);
        }

        if (StringUtil.isEmpty(brandId)) return;

        dealApi.getDealRelateBrand(brandId, 0, 12)
            .then(response => {
                console.log('DealDEtail:dealbybrand', response);

                if (response && response.length > 0) {
                    const result = response.filter((d, i) => d.id !== this.state.deals.get(0).get('id'));

                    let deals = this.state.deals.push(...fromJS(result));
                    this.setState({
                        ...this.state,
                        deals
                    })
                }
            })
            .catch(error => {
                console.log('DealDetail:getDealByBrand:error:', error)
            })
    }

    _fetchExclusiveDeal = () => {
        dealApi.getExclusiveDeals(0, 6)
            .then(deals => {
                console.log('DealDetail:getExclusiveDeals:success:', deals);
                if (deals && deals.length > 0) {
                    this.setState({
                        ...this.state,
                        exclusiveDeals: fromJS(deals)
                    })
                }
            })
            .catch(error => {
                console.log('DealDetail:getExclusiveDeals:error:', error)
            })
    }

    _onActionTriggered = (action) => {
        console.log('action trigger', action);
        this.setState({
            ...this.state,
            action: this.state.action.updateIn(['name'], () => undefined).updateIn(['data'], () => undefined)
        })
    }

    _actionOpenDealDetailTrigger = (data, from) => {
        if (!this.state || !this.state.deals) {
            this.props.navigation.push('DealDetail', {
                "source_deal_detail": !!from ? from : 'direct',
                "slug": data.slug
            });
            return;
        }
        const foundIndex = this.state.deals.findIndex((d, i) => d.get('slug') === data.slug);
        if (foundIndex >= 0) {
            if (!!this.refs['DealDetailScrollableTab']) this.refs['DealDetailScrollableTab'].goToPage(foundIndex)
        }
        else {
            this.props.navigation.push('DealDetail', {
                "source_deal_detail": !!from ? from : 'direct',
                "slug": data.slug
            });
        }
    }

    _actionOpenCommentTrigger = (data, action) => {
        if (!this.state || !this.state.deals) {
            this.props.navigation.push('AllComments', {
                did: data.did,
                nofData: data
            });
            return;
        }
        const foundIndex = this.state.deals.findIndex((d, i) => d.get('id') === data.did);

        if (foundIndex >= 0) {
            if (!!this.refs['DealDetailScrollableTab']) this.refs['DealDetailScrollableTab'].goToPage(foundIndex)
            this.setState({
                ...this.state,
                action: this.state.action.updateIn(['name'], () => action).updateIn(['data'], () => data)
            })
        }
        else {
            this.props.navigation.push('AllComments', {
                did: data.did,
                nofData: data
            });
        }
    }

    _onAction = (action, data, from) => {
        console.log('---->>> DealDetail Action: ', action);

        if (StringUtil.isEmpty(action) || StringUtil.isEmpty(data) || !this.mounted) return;

        if (action === 'open_comment') this._actionOpenCommentTrigger(data, action);
        else if (action === 'open_deal_detail') this._actionOpenDealDetailTrigger(data, from);
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout(this._initDealIfNeed, 100);
        this.props.navigation.state.params.onAction = this._onAction;
        // this._initDealIfNeed();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.deals !== undefined && this.state.deals === undefined ) return true;
        if (!!nextState.deals && !nextState.deals.equals(this.state.deals)) return true;
        if (!!nextState.exclusiveDeals && !nextState.exclusiveDeals.equals(this.state.exclusiveDeals)) return true;
        if (!!nextState.action && !!this.state.action && nextState.action.get('name') !== this.state.action.get('name')) return true;
        return false;
    }

    _logParentViewContent = (brandSlug, dealSlug, dealType) => {
        AnalyticsUtil.logViewParentDealDetail(brandSlug, dealSlug, dealType);
    }

    _logViewContent = (brandSlug, dealSlug, dealType) => {
        AnalyticsUtil.logViewContentDeal(brandSlug, dealSlug, dealType, ObjectUtil.getValue(this.props, 'not_set', ['navigation', 'state', 'params', 'source_deal_detail']));
    }

    _logDetailTabTrigger = (params) => {
        if (!params) return;

        AnalyticsUtil.logNormalEvent(
            'deal_detail_switch_tab_trigger',
            params,
            'deal_detail'
        );
    }

    _logViewDealDetail = (deal, isSameBrand) => {
        try {
            AnalyticsUtil.viewDealDetail(
                deal.get('title', ''),
                deal.get('slug', ''),
                deal.getIn(['brand', 'brand_slug'], ''),
                deal.get('deal_type', ''),
                deal.get('cat1', ''),
                deal.get('cat2', ''),
                deal.get('avg_billing_value', 0),
                ObjectUtil.getValue(this.props, 'not_set', ['navigation', 'state', 'params', 'source_deal_detail']),
                isSameBrand,
            );
        }
        catch (e) {
            console.log(e);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!StringUtil.isEmpty(nextProps.dealAction.get('action') === 'save') && !!this.state.exclusiveDeals) {

            const indexOfDeal = this.state.exclusiveDeals.findIndex((d, i) => d.get('id') === nextProps.dealAction.get('id'));
            if (indexOfDeal >= 0) {
                this.setState({
                    ...this.state,
                    exclusiveDeals: this.state.exclusiveDeals
                        .update(indexOfDeal, deal => deal.updateIn(['is_saved'], () => nextProps.dealAction.get('is_save')))
                        .update(indexOfDeal, deal => deal.updateIn(['save_count'], () => nextProps.dealAction.get('save_count')))
                })
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        //deal action dispatcher
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
        dealAction: state.dealActionReducer
    }
}

export default connect(mapStateToProps)(DealDetail);

