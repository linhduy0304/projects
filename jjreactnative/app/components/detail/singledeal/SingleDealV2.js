import React from 'react';
import { View, Animated, Easing, VirtualizedList, TouchableOpacity, RefreshControl } from 'react-native';
import Repository, { VIEW_TYPE } from './Repository';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';
import { FlatList } from 'react-native-gesture-handler';

import { COLOR_GRAY_BG } from '../../../resources/colors';
import DealLoadingPlaceHolder from './DealLoadingPlaceHolder';
import ErrorView from '../../common/ErrorView';

import DealImageSection from './section/DealImageSection';
import SocialActionSection from './section/SocialActionSection';
import CTASection from './section/CTASection';
import BrandInfoSection from './section/BrandInfoSection';
import ApplyConditionSection from './section/ApplyConditionSection';
import ShareActionSection from './section/ShareActionSection';
import MenuSection from './section/MenuSection';
import ProductSection from './section/ProductSection';
import ApplyLocationSection from './section/ApplyLocationSection';
import ArticleSection from './section/ArticleSection';
import JAMJARatingSection from './section/JAMJARatingSection';
import CommentSection from './section/CommentSection';
import SameCollectionSection from './section/SameCollectionSection';
import ExclusiveDealsSection from './section/ExclusiveDealsSection';
import RelatedDealHeader from './section/RelatedDealHeader';
import { DATA } from './Repository';
import BigDealItem from '../../common/BigDealItem';
import BottomCTA from './section/cta/BottomCTA';
import { AppConfig } from '../../../common/config';

import Text from '../../../common/view/text/JJText';
import JJIcon from '../../../common/view/icon/JJIcon';
import { DIMENSION_RADIUS_LARGE, DIMENSION_PADDING_MEDIUM } from '../../../resources/dimens';
import { COLOR_GRAY_BG_2, COLOR_TEXT_BLACK_1 } from '../../../resources/colors';
import ModalBox from 'react-native-modalbox';
import TicketItem from '../../../screens/TicketSection/TicketItem';
import ViewWithKeyboard from '../../../common/view/ViewWithKeyboard';

class SingleDealV2 extends Repository {
    bottomCTATranslationAnimate = new Animated.Value(0);

    render() {
        if (this.state.isRefreshing === undefined) return null;
        if (!!this.state.needPlaceholder) {
            return this._renderContent(<DealLoadingPlaceHolder />);
        }

        if (
            (this.state.data === undefined || this.state.data.size < 1) &&
            (!!this.state.isFail || (!this.state.isLoading && !this.state.isRefreshing))
        ) {
            return this._renderContent(<ErrorView onTryAgain={this._startInit} />);
        }

        if (this.state.data.size > 0) {
            return this._renderContent(this._renderDetail());
        }

        return this._renderContent(null);
    }

    _renderTicketItem = ({ item }) => {
        return <TicketItem item={item} goToMovieTicket={this._goToMovieTicket} />;
    };

    _renderTicketList = () => {
        const ticketList = this.state.data.getIn(['bookedTicket', 'objects']);
        const isRefreshing = this.state.data.getIn(['bookedTicket', 'isRefreshing']);
        return (
            <FlatList
                data={ticketList.toJS()}
                keyExtractor={item => item.coupon_id}
                renderItem={this._renderTicketItem}
                onRefresh={this._fetchBookedTicket}
                refreshControl={<RefreshControl refreshing={!!isRefreshing ? isRefreshing : false} onRefresh={this._fetchBookedTicket} />}
                onEndReachedThreshold={50}
                onEndReached={this._fetchMoreBookedTicket}
                showsVerticalScrollIndicator={false}
            />
        );
    };

    _renderContent = content => {
        const translateY = this.bottomCTATranslationAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [72, 0]
        });
   
        return (
            <ViewWithKeyboard
                style={{ flex: 1, backgroundColor: COLOR_GRAY_BG}}>

                {content}
                <BottomCTA
                    translateY={translateY}
                    deal={this.state.data.get(DATA.DEAL)}
                    listener={this.listener}
                    timebaseBooking={this.state.data.get(DATA.TIMEBASE_BOOKING)}
                    navigation={this.props.navigation}
                    onBookMoreTicket={!!this.state.data.get('bookedTicket') ? this.navigateToBooking : null}
                    bookedItem={!!this.state.data.get('bookedTicket') ? true : null}
                />
                {!!this.state.data.getIn(['bookedTicket', 'objects']) && (
                    <ModalBox
                        style={{
                            height: '95%',
                            borderTopLeftRadius: DIMENSION_RADIUS_LARGE,
                            borderTopRightRadius: DIMENSION_RADIUS_LARGE,
                            position: 'relative'
                        }}
                        // coverScreen={true}
                        swipeThreshold={10}
                        swipeArea={100}
                        backButtonClose={true}
                        position={'bottom'}
                        ref={'ticketModal'}
                        // backdropPressToClose={true}
                        useNativeDriver={true}
                    >
                        <View
                            style={{
                                marginHorizontal: DIMENSION_PADDING_MEDIUM,
                                flexDirection: 'row',
                                paddingVertical: DIMENSION_PADDING_MEDIUM,
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: COLOR_GRAY_BG_2,
                                marginBottom: DIMENSION_PADDING_MEDIUM
                            }}
                        >
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.refs.ticketModal.close()}>
                                <JJIcon name="x_o" size={16} color={COLOR_TEXT_BLACK_1} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, color: COLOR_TEXT_BLACK_1, fontWeight: 'bold' }}>
                                MÃ PHIM CHƯA ĐỔI ({this.state.data.getIn(['bookedTicket', 'meta', 'total_count'], 0)})
                            </Text>
                            <View style={{ flex: 1 }} />
                        </View>
                        <View style={{ flex: 1 }}>{this._renderTicketList()}</View>
                    </ModalBox>
                )}
            </ViewWithKeyboard>
        );
    };

    _renderDetail = () => {
        if (!this.state.data.has('deal')) return;

        return (
            <VirtualizedList
                ref={ref => {
                    this.scrollView = ref;
                }}
                style={{ flex: 1 }}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                data={this.state.data.get('sections')}
                getItem={this._getItem}
                getItemCount={this._getItemCount}
                onEndReachedThreshold={0.5}
                keyExtractor={this._getKeyExtractor}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderEmpty}
                ListFooterComponent={this._renderFooter()}
                removeClippedSubviews={!AppConfig.ios}
                onViewableItemsChanged={this._onScrollHandle}
                keyboardShouldPersistTaps={'always'}
            />
        );
    };

    _getItem = (data, index) => {
        return data.get(index);
    };

    _getItemCount = data => (!!data ? data.size : 0);

    _renderFooter = () => {
        return (
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ height: 100 }} />
            </View>
        );
    };

    _getKeyExtractor = (item, index) => {
        let key = `dd_section_${index}_`;
        if (!!item && Map.isMap(item)) {
            key += item.get('type', '');
        }
        key += index;
        return key;
    };

    _renderItem = ({ item }) => {
        switch (item.get('type')) {
            case VIEW_TYPE.IMAGE_DEAL:
                return <DealImageSection navigation={this.props.navigation} deal={this.state.data.get(DATA.DEAL)} />;

            case VIEW_TYPE.SOCIAL:
                return (
                    <SocialActionSection
                        navigation={this.props.navigation}
                        dealSlug={this.state.data.getIn([DATA.DEAL, 'slug'], '')}
                        storeCount={this.state.data.getIn([DATA.DEAL, 'stores'], []).size}
                        onlineStore={this.state.data.getIn([DATA.DEAL, 'online_store'], '')}
                        productCount={this.state.data.getIn([DATA.DEAL, 'product_count'], 0)}
                        endValidTime={this.state.data.getIn([DATA.DEAL, 'end_valid_time'], '')}
                        dealType={this.state.data.getIn([DATA.DEAL, 'deal_type'])}
                        title={this.state.data.getIn([DATA.DEAL, 'film_name'])}
                        genre={this.state.data.getIn([DATA.DEAL, 'genre'])}
                        run_time={this.state.data.getIn([DATA.DEAL, 'run_time'])}
                        imdb={this.state.data.getIn([DATA.DEAL, 'imdb'])}
                        rating={this.state.data.getIn([DATA.DEAL, 'rating'])}
                        alert_deal_detail={this.state.data.getIn([DATA.DEAL, 'alert_deal_detail'])}
                        alert_icon={this.state.data.getIn([DATA.DEAL, 'alert_icon'])}
                        use_delivery={this.state.data.getIn([DATA.DEAL, 'use_delivery'], false)}
                        alert_deal_detail_tooltip={this.state.data.getIn([DATA.DEAL, 'alert_deal_detail_tooltip'])}
                        upVoteCount={this.state.data.getIn([DATA.DEAL, 'up_vote_count'], 0)}
                        downVoteCount={this.state.data.getIn([DATA.DEAL, 'down_vote_count'], 0)}
                        isVoteUp={this.state.data.getIn([DATA.DEAL, 'is_vote_up'], false)}
                        isVoteDown={this.state.data.getIn([DATA.DEAL, 'is_vote_down'], false)}
                        saveCount={this.state.data.getIn([DATA.DEAL, 'save_count'], 0)}
                        isSaved={this.state.data.getIn([DATA.DEAL, 'is_saved'], false)}
                        checkedIn={this.state.data.getIn([DATA.DEAL, 'checked_in'], false)}
                        checkInCount={this.state.data.getIn([DATA.DEAL, 'check_in_count'], 0)}
                        commentCount={this.state.data.getIn([DATA.DEAL, 'comment_count'], 0)}
                        onOpenProductListClicked={this._onOpenProductListClicked}
                        onOpenApplyStore={this._onOpenApplyStore}
                        onLikeClicked={this._onLikeDealClicked}
                        onDisLikeClicked={this._onDislikeDealClicked}
                        onSaveClicked={this._onSaveDealClicked}
                        onCheckinClicked={this._onCheckInDealClicked}
                        onCommentClicked={this._onOpenCommentListClicked}
                    />
                );

            case VIEW_TYPE.CTA:
                return (
                    <CTASection
                        navigation={this.props.navigation}
                        deal={this.state.data.get(DATA.DEAL)}
                        timebaseBooking={this.state.data.get(DATA.TIMEBASE_BOOKING)}
                        flashSale={this.state.data.get(DATA.FLASH_SALE)}
                        isLoginned={this.props.isLoginned}
                        listener={this.listener}
                        selectedProvinceName={this.props.selectedProvinceName}
                        bookedTicket={
                            !!this.state.data.getIn(['bookedTicket', 'objects']) ? this.state.data.getIn(['bookedTicket', 'objects']) : null
                        }
                        onPressTicket={!!this.state.data.get('bookedTicket') ? this._openTicketModal : null}
                        totalTicket={this.state.data.getIn(['bookedTicket', 'meta', 'total_count'])}
                    />
                );

            case VIEW_TYPE.BRAND_INFO:
                return (
                    <BrandInfoSection
                        deal={this.state.data.get(DATA.DEAL)}
                        onFollowBrandClicked={this._onFollowBrandClicked}
                        onOpenFoodyReviewClicked={this._onOpenFoodyReviewClicked}
                        onOpenBrandDetailClicked={this._onOpenBrandDetail}
                    />
                );

            case VIEW_TYPE.APPLY_CONDITION:
                return (
                    <ApplyConditionSection
                        navigation={this.props.navigation}
                        deal={this.state.data.get(DATA.DEAL)}
                        flashSaleCondition={this.state.data.getIn([DATA.FLASH_SALE, 'conditions'])}
                    />
                );

            case VIEW_TYPE.SHARE:
                return (
                    <ShareActionSection
                        navigation={this.props.navigation}
                        deal={this.state.data.get(DATA.DEAL)}
                        onSharePressed={this._onShareDealPressed}
                    />
                );

            case VIEW_TYPE.MENU:
                return (
                    <MenuSection
                        navigation={this.props.navigation}
                        deal={this.state.data.get(DATA.DEAL)}
                        images={this.state.data.getIn([DATA.NEAREST_STORE, 'menu_images'])}
                    />
                );

            case VIEW_TYPE.PRODUCT:
                return (
                    <ProductSection
                        navigation={this.props.navigation}
                        deal={this.state.data.get(DATA.DEAL)}
                        dealSlug={this.props.slug}
                        product={this.state.data.get(DATA.PRODUCT)}
                    />
                );

            case VIEW_TYPE.LOCATION:
                return (
                    <ApplyLocationSection
                        navigation={this.props.navigation}
                        deal={this.state.data.get(DATA.DEAL)}
                        nearestStore={this.state.data.get(DATA.NEAREST_STORE)}
                    />
                );

            case VIEW_TYPE.ARTICLE:
                return (
                    <ArticleSection
                        navigation={this.props.navigation}
                        article={this.state.data.getIn([DATA.DEAL, 'article'])}
                        bestpriceguarantee={this.state.data.getIn([DATA.DEAL, 'bestpriceguarantee'])}
                        getredeemcodeinstruction={this.state.data.getIn([DATA.DEAL, 'getredeemcodeinstruction'])}
                        dealType={this.state.data.getIn([DATA.DEAL, 'deal_type'])}
                    />
                );

            case VIEW_TYPE.RATING:
                return <JAMJARatingSection navigation={this.props.navigation} deal={this.state.data.get(DATA.DEAL)} />;

            case VIEW_TYPE.COMMENT:
                return (
                    <CommentSection
                        navigation={this.props.navigation}
                        deal={this.state.data.get(DATA.DEAL)}
                        comment={this.state.data.get(DATA.COMMENT)}
                        listener={this.listener}
                    />
                );

            case VIEW_TYPE.COLLECTION:
                return (
                    <SameCollectionSection
                        navigation={this.props.navigation}
                        deal={this.state.data.get(DATA.DEAL)}
                        collection={this.state.data.get(DATA.COLLECTION)}
                    />
                );

            case VIEW_TYPE.EXCLUSIVE:
                return (
                    <ExclusiveDealsSection
                        navigation={this.props.navigation}
                        dealId={this.state.data.getIn([DATA.DEAL, 'id'])}
                        exclusiveDeals={this.props.exclusiveDeals}
                    />
                );

            case VIEW_TYPE.RELATED_HEADER:
                return <RelatedDealHeader />;

            case VIEW_TYPE.DEAL:
                return (
                    <View style={{ marginBottom: DIMENSION_PADDING_MEDIUM }}>
                        <BigDealItem navigation={this.props.navigation} item={item.get('data').toJS()} path={'deal_detail'} />
                    </View>
                );
        }
    };

    _openTicketModal = () => {
        // !!this.props.openModal && this.props.openModal();
        !!this.refs.ticketModal && this.refs.ticketModal.open();
    };

    _goToMovieTicket = id => {
        console.debug('_goToMovieTicket:', id);
        !!this.refs.ticketModal && this.refs.ticketModal.close();
        this.props.navigation.push('MovieReservationInfo', {
            couponId: id
        });
    };

    navigateToBooking = () => {
        // const { navigation, bookedTicket, deal } = this.props;
        const bookedTicket = this.state.data.getIn(['bookedTicket', 'objects', 0]);
        if (!!bookedTicket) {
            const date = new Date(bookedTicket.get('check_in_time') * 1000);

            const booking = {
                slot: 1,

                date: date,
                store: {
                    id: bookedTicket.get('cinema_id'),
                    address: bookedTicket.get('cinema')
                },
                time: {
                    highlight: bookedTicket.get('booking_highlight'),
                    id: bookedTicket.get('booking_schedule'),
                    min_slot: bookedTicket.get('min_slot'),
                    max_slot_per_voucher: bookedTicket.get('max_slot_per_voucher'),
                    slotAvailable: bookedTicket.get('slot_available'),
                    time: date
                }
            };
            this.props.navigation.navigate('MovieRoom', {
                deal: this.state.data.get(DATA.DEAL),
                booking: fromJS(booking)
            });
        }
    };

    _startShowBottomCTAButton = () => {
        this.state.showBottomCTA = true;
        if (this.bottomCTATranslationTiming) this.bottomCTATranslationTiming.stop();
        this.bottomCTATranslationTiming = Animated.timing(this.bottomCTATranslationAnimate, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    };

    _startHideBottomCTAButton = () => {
        this.state.showBottomCTA = false;
        if (this.bottomCTATranslationTiming) this.bottomCTATranslationTiming.stop();
        this.bottomCTATranslationTiming = Animated.timing(this.bottomCTATranslationAnimate, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    };
}

SingleDealV2.propTypes = {
    slug: PropTypes.any,
    isMainView: PropTypes.any,
    navigation: PropTypes.any,
    exclusiveDeals: PropTypes.any,
    actionName: PropTypes.any,
    actionData: PropTypes.any,
    onUpdateData: PropTypes.any,
    deal: PropTypes.any
};

function mapStateToProps(state) {
    return {
        isLoginned: state.loginReducer.isLoginned,
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),

        couponDataChange: state.couponDataChangeReducer,

        //collection action dispatcher
        collectionAction: state.collectionActionReducer,

        //deal action dispatcher
        dealAction: state.dealActionReducer
    };
}

export default connect(mapStateToProps)(SingleDealV2);
