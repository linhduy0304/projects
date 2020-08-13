import {List} from 'immutable'
import {FbAppEventsLogger} from './facebook-analytics';
import {FirebaseAnalytics} from './firebase-analytics'
import {GAAnalytics} from './ga-analytics'
import {fetcherConfig} from '../../api/fetcher'
import {StringUtil} from '../../utils/string-util'
import {ObjectUtil} from '../../utils/object-utils'
import {InsiderAnalytics} from './insider-analytics';
import type {ItemListInteractionModel, SituationModel} from "../../model/data";

export const AnalyticsHelper = {

    getTrackingSources() {
        let acs = 'direct';
        let drs = 'direct';
        try {
            acs = fetcherConfig.getTrackingConfig().acs;
            drs = fetcherConfig.getTrackingConfig().drs;
        } catch (e) {
            console.log(e);
        }

        return {
            acs: acs,
            drs: drs
        };
    },

    setUser(user) {
        if (!!user && !!user.id) {
            FbAppEventsLogger.setUser(user);
            FirebaseAnalytics.setUser(user);
            GAAnalytics.setUser(user);
            InsiderAnalytics.setUser(user);
        }
    },

    removeUser() {
        try {
            InsiderAnalytics.removeUser();
        }
        catch (e) {
            console.log(e);
        }
    },

    setProvince(province) {
        try {
            if (!!province) {
                FirebaseAnalytics.setProvince(province);
            }
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event to log when a screen has openned
     * @param name - require
     * @param params
     */
    logCurrentScreen(name, params) {
        try {
            let loggingParams = {
                ...params,
                ...AnalyticsHelper.getTrackingSources()
            };
            FbAppEventsLogger.logCurrentScreen(name, loggingParams);
            FirebaseAnalytics.logCurrentScreen(name, loggingParams);
            GAAnalytics.logCurrentScreen(name, loggingParams);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     *
     * @param event as String
     * @param params as Object
     */
    loginEvent(event, params) {
        try {
            let loggingParams = {
                ...params,
                ...AnalyticsHelper.getTrackingSources()
            };

            FbAppEventsLogger.loginEvent(event, loggingParams);
            FirebaseAnalytics.loginEvent(event, loggingParams);
            GAAnalytics.loginEvent(event, loggingParams);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     *
     * @param event as String
     * @param params as Object
     * @param categoryEvent
     * ex:
     * action_location: 'deal_detail',
     * action_name: 'get_code',
     */
    logNormalEvent(event, params, categoryEvent) {

        console.debug('logNormalEvent: ', event, params, categoryEvent);
        try {
            let loginParams = {
                ...params,
                ...AnalyticsHelper.getTrackingSources()
            };

            const eventName = StringUtil.textFormat(event);

            FbAppEventsLogger.logNormalEvent(eventName, loginParams);
            FirebaseAnalytics.logNormalEvent(eventName, loginParams);
            GAAnalytics.logNormalEvent(eventName, loginParams, categoryEvent);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event to log an open deal detail event has triggered from anywhere,
     * the event only has log onetime in parent deal detail, not contains view content of detail.
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     */
    logViewParentDealDetail(brandSlug, dealSlug, dealType) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logViewParentDealDetail(brandSlug, dealSlug, dealType, trackingSources);
            FirebaseAnalytics.logViewParentDealDetail(brandSlug, dealSlug, dealType, trackingSources);
            GAAnalytics.logViewParentDealDetail(brandSlug, dealSlug, dealType, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user view a deal detail content
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     */
    logViewContentDeal(brandSlug, dealSlug, dealType, source_deal_detail) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logViewContentDeal(brandSlug, dealSlug, dealType, trackingSources);
            FirebaseAnalytics.logViewContentDeal(brandSlug, dealSlug, dealType, source_deal_detail, trackingSources);
            GAAnalytics.logViewContentDeal(brandSlug, dealSlug, dealType, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user select store, slot, date or time
     * @param action
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     * @param value
     */
    logBookingSelection(action, brandSlug, dealSlug, dealType, value) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logBookingSelection(action, brandSlug, dealSlug, dealType, value, trackingSources);
            FirebaseAnalytics.logBookingSelection(action, brandSlug, dealSlug, dealType, value, trackingSources);
            GAAnalytics.logBookingSelection(action, brandSlug, dealSlug, dealType, value, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into "Xác nhận đặt chỗ" button success
     */
    logBookingGoToConfirm(brandSlug, dealSlug, dealType, booking) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logBookingGoToConfirm(brandSlug, dealSlug, dealType, booking, trackingSources);
            FirebaseAnalytics.logBookingGoToConfirm(brandSlug, dealSlug, dealType, booking, trackingSources);
            GAAnalytics.logBookingGoToConfirm(brandSlug, dealSlug, dealType, booking, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into back button in confirm booking screen
     */
    logConfirmBookingGoBack(brandSlug, dealSlug, dealType, booking) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logConfirmBookingGoBack(brandSlug, dealSlug, dealType, booking, trackingSources);
            FirebaseAnalytics.logConfirmBookingGoBack(brandSlug, dealSlug, dealType, booking, trackingSources);
            GAAnalytics.logConfirmBookingGoBack(brandSlug, dealSlug, dealType, booking, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into "Gửi yêu cầu đặt chỗ" button
     */
    logVerifyBooking(brandSlug, dealSlug, dealType, booking) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logVerifyBooking(brandSlug, dealSlug, dealType, booking, trackingSources);
            FirebaseAnalytics.logVerifyBooking(brandSlug, dealSlug, dealType, booking, trackingSources);
            GAAnalytics.logVerifyBooking(brandSlug, dealSlug, dealType, booking, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when "Gửi yêu cầu đặt chỗ" success
     */
    logVerifyBookingSuccess(brandSlug, dealSlug, dealType, coupon) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logVerifyBookingSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
            FirebaseAnalytics.logVerifyBookingSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
            GAAnalytics.logVerifyBookingSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when "Gửi yêu cầu đặt chỗ" failure
     */
    logVerifyBookingFailure(brandSlug, dealSlug, dealType, booking, message) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logVerifyBookingFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources);
            FirebaseAnalytics.logVerifyBookingFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources);
            GAAnalytics.logVerifyBookingFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when booking complete
     */
    logBookingComplete(brandSlug, dealSlug, dealType, booking, success) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources);
            FirebaseAnalytics.logBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources);
            GAAnalytics.logBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when cancel coupon success
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     * @param coupon
     */
    logCancelCouponSuccess(brandSlug, dealSlug, dealType, coupon) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logCancelCouponSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
            FirebaseAnalytics.logCancelCouponSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
            GAAnalytics.logCancelCouponSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into "Lấy mã" button
     */
    logOpenGetExclusiveCode(brandSlug, dealSlug, dealType) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logOpenGetExclusiveCode(brandSlug, dealSlug, dealType, trackingSources);
            FirebaseAnalytics.logOpenGetExclusiveCode(brandSlug, dealSlug, dealType, trackingSources);
            GAAnalytics.logOpenGetExclusiveCode(brandSlug, dealSlug, dealType, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into back button in confirm get code screen
     */
    logGetExclusiveCodeGoBack(brandSlug, dealSlug, dealType) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logGetExclusiveCodeGoBack(brandSlug, dealSlug, dealType, trackingSources);
            FirebaseAnalytics.logGetExclusiveCodeGoBack(brandSlug, dealSlug, dealType, trackingSources);
            GAAnalytics.logGetExclusiveCodeGoBack(brandSlug, dealSlug, dealType, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user select store
     * @param action
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     * @param value
     */
    logExclusiveStoreSelection(action, brandSlug, dealSlug, dealType, value) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logExclusiveStoreSelection(action, brandSlug, dealSlug, dealType, value, trackingSources);
            FirebaseAnalytics.logExclusiveStoreSelection(action, brandSlug, dealSlug, dealType, value, trackingSources);
            GAAnalytics.logExclusiveStoreSelection(action, brandSlug, dealSlug, dealType, value, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into "Nhận mã ưu đãi" button
     */
    logExclusiveStartGetCode(brandSlug, dealSlug, dealType, store_id) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logExclusiveStartGetCode(brandSlug, dealSlug, dealType, store_id, trackingSources);
            FirebaseAnalytics.logExclusiveStartGetCode(brandSlug, dealSlug, dealType, store_id, trackingSources);
            GAAnalytics.logExclusiveStartGetCode(brandSlug, dealSlug, dealType, store_id, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when "Nhận mã ưu đãi" failure
     */
    logExclusiveGetCodeFailure(brandSlug, dealSlug, dealType, store_id, message) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logExclusiveGetCodeFailure(brandSlug, dealSlug, dealType, store_id, message, trackingSources);
            FirebaseAnalytics.logExclusiveGetCodeFailure(brandSlug, dealSlug, dealType, store_id, message, trackingSources);
            GAAnalytics.logExclusiveGetCodeFailure(brandSlug, dealSlug, dealType, store_id, message, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when exclusive get code complete
     */
    logExclusiveGetCodeSuccess(brandSlug, dealSlug, dealType, coupon) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logExclusiveGetCodeSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
            FirebaseAnalytics.logExclusiveGetCodeSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
            GAAnalytics.logExclusiveGetCodeSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    logViewDealListEmpression(parent, dealSlugs) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            if (List.isList(dealSlugs)) dealSlugs = dealSlugs.toJS();
            FbAppEventsLogger.logViewDealListEmpression(parent, dealSlugs, trackingSources);
            FirebaseAnalytics.logViewDealListEmpression(parent, dealSlugs, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    logSearchDeal(keyword, filters) {
        // if (filters === undefined || filters === null) filters = {};
        // if (List.isList(filters)) filters = filters.toJS();
        // FbAppEventsLogger.logSearchDeal(keyword, filters);
        // FirebaseAnalytics.logSearchDeal(keyword, filters);
        // GAAnalytics.logSearchDeal(keyword, filters);
    },

    logSearchDealListEmpression(keyword, dealSlugs) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            if (List.isList(dealSlugs)) dealSlugs = dealSlugs.toJS();
            FbAppEventsLogger.logSearchDealListEmpression(keyword, dealSlugs, trackingSources);
            FirebaseAnalytics.logSearchDealListEmpression(keyword, dealSlugs, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    logOpenNotification(params) {
        this.logNormalEvent(
            'open_notification',
            params,
            'deep_link'
        )
    },

    logOpenDeeplinkScheme(params) {
        this.logNormalEvent(
            'deep_link_scheme',
            params,
            'deep_link'
        )
    },

    logOpenDeeplinkUrl(params) {
        this.logNormalEvent(
            'deep_link_url',
            params,
            'deep_link'
        )
    },

    logDealCellOpenToDealDetail(path, dealSlug, brandSlug, deal_type, view_type) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            if (StringUtil.isEmpty(path)) path = 'not set';
            const format = StringUtil.textFormat(path);
            FirebaseAnalytics.logDealCellOpenToDealDetail(format, dealSlug, brandSlug, deal_type, view_type, trackingSources);
            FbAppEventsLogger.logDealCellOpenToDealDetail(format, dealSlug, brandSlug, deal_type, view_type, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    logDealCellOpenToBrandDetail(path, dealSlug, brandSlug, deal_type, view_type) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            if (StringUtil.isEmpty(path)) path = 'not set';
            const format = StringUtil.textFormat(path);

            FirebaseAnalytics.logDealCellOpenToBrandDetail(format, dealSlug, brandSlug, deal_type, view_type, trackingSources);
            FbAppEventsLogger.logDealCellOpenToBrandDetail(format, dealSlug, brandSlug, deal_type, view_type, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    logViewMoreButtonInDiscoveryTab(screen_type) {
        try {
            const trackingSources = {
                ...AnalyticsHelper.getTrackingSources(),
                screen_type: screen_type
            };

            if (StringUtil.isEmpty(screen_type)) return;
            const screenTypeFormat = StringUtil.textFormat(screen_type);
            FirebaseAnalytics.logViewMoreButtonInDiscoveryTab(screenTypeFormat, trackingSources);
            FbAppEventsLogger.logViewMoreButtonInDiscoveryTab(screenTypeFormat, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    logCrash(error, code, message) {
        try {
            if (StringUtil.isEmpty(error)) return;
            if (StringUtil.isEmpty(code)) code = 0;
            if (StringUtil.isEmpty(message)) message = 'not_set';
            FirebaseAnalytics.logCrash(error, code, message);
        }
        catch (e) {
            console.log(e);
        }
    },


    /**
     * This event has log when user click into "Đặt chỗ" in movie room
     */
    logMovieBookingAddToCart(brandSlug, dealSlug, dealType, booking) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logMovieBookingAddToCart(brandSlug, dealSlug, dealType, booking, trackingSources);
            FirebaseAnalytics.logMovieBookingAddToCart(brandSlug, dealSlug, dealType, booking, trackingSources);
            GAAnalytics.logMovieBookingAddToCart(brandSlug, dealSlug, dealType, booking, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user cancel order
     */
    logMovieRemoveFromCart(brandSlug, dealSlug, dealType, booking) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logMovieRemoveFromCart(brandSlug, dealSlug, dealType, booking, trackingSources);
            FirebaseAnalytics.logMovieRemoveFromCart(brandSlug, dealSlug, dealType, booking, trackingSources);
            GAAnalytics.logMovieRemoveFromCart(brandSlug, dealSlug, dealType, booking, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into "Thanh toán" button
     */
    logMovieNotifyOrder(brandSlug, dealSlug, dealType, booking) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logMovieNotifyOrder(brandSlug, dealSlug, dealType, booking, trackingSources);
            FirebaseAnalytics.logMovieNotifyOrder(brandSlug, dealSlug, dealType, booking, trackingSources);
            GAAnalytics.logMovieNotifyOrder(brandSlug, dealSlug, dealType, booking, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when "Thanh toán" success
     */
    logMovieNotifyOrderSuccess(brandSlug, dealSlug, dealType, coupon) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logMovieNotifyOrderSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
            FirebaseAnalytics.logMovieNotifyOrderSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
            GAAnalytics.logMovieNotifyOrderSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when "Thanh toán" failure
     */
    logMovieNotifyOrderFailure(brandSlug, dealSlug, dealType, booking, message) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logMovieNotifyOrderFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources);
            FirebaseAnalytics.logMovieNotifyOrderFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources);
            GAAnalytics.logMovieNotifyOrderFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when booking complete
     */
    logMovieBookingComplete(brandSlug, dealSlug, dealType, booking, success) {
        try {
            const trackingSources = AnalyticsHelper.getTrackingSources();

            FbAppEventsLogger.logMovieBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources);
            FirebaseAnalytics.logMovieBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources);
            GAAnalytics.logMovieBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources);
        } catch (e) {
            console.log(e);
        }
    },

    logNotification(event, notification) {
        try {
            if (!notification) return;

            const params = {
                id: notification.notificationId,
                title: notification.title,
                sub_title: notification.subtitle,
                body: notification.body,
            }

            const oneSignalNofData = ObjectUtil.getValue(notification, undefined, ['data', 'custom', 'a', 'nof_data']);


            console.log('logNotification:', notification,
                '\noneSignalNofData: ', oneSignalNofData,
                '\n', params
                );



        } catch (e) {
            console.log(e);
        }
    },


    /**
     * New tracking
     */

    loginStarted() {
        try {
            const date = new Date();
            InsiderAnalytics.loginStarted(date);
        }
        catch (e) {
            console.log(e);
        }
    },

    loginCompleted() {
        try {
            const date = new Date();
            InsiderAnalytics.loginCompleted(date);
        }
        catch (e) {
            console.log(e);
        }
    },

    loginCancelled() {
        try {
            const date = new Date();
            InsiderAnalytics.loginCancelled(date);
        }
        catch (e) {
            console.log(e);
        }
    },

    viewCollectionDetail(name, slug) {
        try {
            InsiderAnalytics.viewCollectionDetail(name, slug);
        }
        catch (e) {
            console.log(e);
        }
    },

    viewDealDetail(name, slug, brand, dealType, cat1, cat2, discount, section, isSameBrand) {
        try {
            InsiderAnalytics.viewDealDetail(name, slug, brand, dealType, cat1, cat2, discount, section, isSameBrand);
        }
        catch (e) {
            console.log(e);
        }
    },

    addToCart(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime) {
        try {
            InsiderAnalytics.addToCart(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime);
        }
        catch (e) {
            console.log(e);
        }
    },

    beginCheckOut(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, promocode) {
        try {
            InsiderAnalytics.beginCheckOut(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, promocode);
        }
        catch (e) {
            console.log(e);
        }
    },

    purchase(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, couponId, promocode) {
        try {
            InsiderAnalytics.purchase(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, couponId, promocode);
        }
        catch (e) {
            console.log(e);
        }
    },

    cancelCoupon(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, couponId, promocode) {
        try {
            InsiderAnalytics.cancelCoupon(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, couponId, promocode);
        }
        catch (e) {
            console.log(e);
        }
    },

    couponRedeemed(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, couponId, promocode) {
        try {
            InsiderAnalytics.couponRedeemed(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, couponId, promocode);
        }
        catch (e) {
            console.log(e);
        }
    },

    trackDeliveryServiceInteraction(params) {
        try {
            FirebaseAnalytics.trackServiceInteraction('delivery', params);
        }
        catch (e) {
            console.log(e);
        }
    },

    trackPhucLongServiceInteraction(params) {
        try {
            FirebaseAnalytics.trackServiceInteraction('phuc_long', params);
        }
        catch (e) {
            console.log(e);
        }
    },

    trackItemListInteraction(situation: SituationModel, interaction_type, interaction_value, item_id, item_brand, item_category, item_name) {
        try {
            const params: ItemListInteractionModel = {...situation};
            if (!!ObjectUtil.isExists(item_id)) {
                params.item_id = item_id;
            }
            if (!!ObjectUtil.isExists(item_brand)) {
                params.item_brand = item_brand;
            }
            if (!!ObjectUtil.isExists(item_category)) {
                params.item_category = item_category;
            }
            if (!!ObjectUtil.isExists(item_name)) {
                params.item_name = item_name;
            }
            if (!!ObjectUtil.isExists(interaction_type)) {
                params.interaction_type = interaction_type;
            }
            if (!!ObjectUtil.isExists(interaction_value)) {
                params.interaction_value = interaction_value;
            }

            FirebaseAnalytics.trackItemListInteraction(params);
        }
        catch (e) {
            console.log(e);
        }
    },

    trackItemImpression(situation: SituationModel, action, item_id, item_brand, item_category, item_name) {
        try {
            const params: ItemListInteractionModel = {...situation};
            if (!!ObjectUtil.isExists(item_id)) {
                params.item_id = item_id;
            }
            if (!!ObjectUtil.isExists(item_brand)) {
                params.item_brand = item_brand;
            }
            if (!!ObjectUtil.isExists(item_category)) {
                params.item_category = item_category;
            }
            if (!!ObjectUtil.isExists(item_name)) {
                params.item_name = item_name;
            }
            if (!!ObjectUtil.isExists(action)) {
                params.action = action;
            }

            FirebaseAnalytics.trackItemImpression(params);
        }
        catch (e) {
            console.log(e);
        }
    },
    trackItemResult(situation: SituationModel, result_action, item_id, item_brand, item_category, item_name) {
        try {
            const params: ItemListInteractionModel = {...situation};
            if (!!ObjectUtil.isExists(item_id)) {
                params.item_id = item_id;
            }
            if (!!ObjectUtil.isExists(item_brand)) {
                params.item_brand = item_brand;
            }
            if (!!ObjectUtil.isExists(item_category)) {
                params.item_category = item_category;
            }
            if (!!ObjectUtil.isExists(item_name)) {
                params.item_name = item_name;
            }
            if (!!ObjectUtil.isExists(result_action)) {
                params.result_action = result_action;
            }

            FirebaseAnalytics.trackItemResult(params);
        }
        catch (e) {
            console.log(e);
        }
    }
}

