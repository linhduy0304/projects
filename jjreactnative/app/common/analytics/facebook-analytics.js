
import {AppEventsLogger} from 'react-native-fbsdk';
import {fetcherConfig} from "../../api/fetcher";
import {ObjectUtil} from "../../utils/object-utils";

export const FbAppEventsLogger = {

    setUser(user) {
        AppEventsLogger.setUserID(user.id);
    },

    logCurrentScreen(name, params) {
        AppEventsLogger.logEvent(
            'screen_view_event',
            {
                name: name,
                ...params
            }
        )
    },

    /**
     *
     * @param event as String
     * @param params as Object
     */
    loginEvent(event, params) {
        if (params === undefined) params = {};
        AppEventsLogger.logEvent(
            'login',
            {
                ...params,
                event: event
            }
        )
    },

    /**
     *
     * @param event as String
     * @param params as Object
     */
    logNormalEvent(event, params) {
        if (params === undefined) params = {};
        AppEventsLogger.logEvent(event, params);
    },

    /**
     * This event to log an open deal detail event has triggered from anywhere,
     * the event only has log onetime in parent deal detail, not contains view content of detail.
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     * @param trackingSources
     */
    logViewParentDealDetail(brandSlug, dealSlug, dealType, trackingSources) {
        this.logCurrentScreen(
            'deal_detail_screen',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                brand: brandSlug,
                deal_type: dealType,
                fb_description: dealType,
                ...trackingSources
            });
    },

    /**
     * This event has log when user view a deal detail content
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     * @param trackingSources
     */
    logViewContentDeal(brandSlug, dealSlug, dealType, trackingSources) {
        AppEventsLogger.logEvent(
            'fb_mobile_content_view',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                brand: brandSlug,
                deal_type: dealType,
                fb_currency: 'VND',
                fb_description: dealType,
                ...trackingSources
            }
        );
    },

    /**
     * This event has log when user select store, slot, date or time
     * @param actionName
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     * @param actionValue
     * @param trackingSources
     */
    logBookingSelection(actionName, brandSlug, dealSlug, dealType, actionValue, trackingSources) {
        AppEventsLogger.logEvent(
            'select_booking_info',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                item_action: actionName,
                action_value: actionValue,
                ...trackingSources
            }
        )
    },

    /**
     * This event has log when user click into "Xác nhận đặt chỗ" button success
     */
    logBookingGoToConfirm(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            let price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            if (!price) price = 0;
            AppEventsLogger.logEvent(
                'fb_mobile_add_to_cart',
                price,
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    brand: brandSlug,
                    deal_type: dealType,
                    fb_currency: 'VND',
                    fb_description: dealType,
                    fb_num_items: booking.slot,
                    value: price,
                    booking_store: booking.store_id,
                    booking_time: booking.time,
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into back button
     */
    logConfirmBookingGoBack(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            let price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            if (!price) price = 0;

            AppEventsLogger.logEvent(
                'fb_mobile_remove_from_cart',
                price,
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    fb_description: dealType,
                    fb_num_items: booking.slot,
                    value: price,
                    booking_store: booking.store_id,
                    quantity: booking.slot,
                    booking_time: booking.time,
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into "Gửi yêu cầu đặt chỗ" button
     */
    logVerifyBooking(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            let price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            if (!price) price = 0;
            AppEventsLogger.logEvent(
                'fb_mobile_begin_checkout',
                price,
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    fb_description: dealType,
                    booking_store: booking.store_id,
                    fb_num_items: booking.slot,
                    quantity: booking.slot,
                    value: price,
                    booking_time: booking.time,
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when "Gửi yêu cầu đặt chỗ" success
     */
    logVerifyBookingSuccess(brandSlug, dealSlug, dealType, booking, trackingSources) {

        try {
            let price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            if (!price) price = 0;
            AppEventsLogger.logEvent(
                'fb_mobile_initiated_checkout',
                price,
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    value: price,
                    fb_num_items: booking.slot,
                    fb_description: dealType,
                    coupon: booking.coupon_id,
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when "Gửi yêu cầu đặt chỗ" failure
     */
    logVerifyBookingFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources) {
        AppEventsLogger.logEvent(
            'fb_mobile_begin_checkout_failure',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                ...trackingSources,
                message
            }
        )
    },

    /**
     * This event has log when booking complete
     */
    logBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources) {
        try {
            let price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            if (!price) price = 0;
            AppEventsLogger.logPurchase(
                price,
                'VND',
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    fb_description: dealType,
                    fb_num_items: booking.slot,
                    value: price,
                    coupon: booking.coupon_id,
                    ...trackingSources
                })
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
     * @param trackingSources
     */
    logCancelCouponSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources) {

        AppEventsLogger.logEvent(
            'fb_mobile_purchase_refund',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                coupon: coupon,
                ...trackingSources
            }
        )
    },

    /**
     * This event has log when user click into "Lấy mã" button
     */
    logOpenGetExclusiveCode(brandSlug, dealSlug, dealType, trackingSources) {

        AppEventsLogger.logEvent(
            'fb_mobile_add_to_cart',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                ...trackingSources
            }
        )
    },

    /**
     * This event has log when user click into back button in confirm get code screen
     */
    logGetExclusiveCodeGoBack(brandSlug, dealSlug, dealType, trackingSources) {

        AppEventsLogger.logEvent(
            'fb_mobile_remove_from_cart',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                ...trackingSources
            }
        )
    },

    /**
     * This event has log when user select store
     * @param actionName
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     * @param actionValue
     * @param trackingSources
     */
    logExclusiveStoreSelection(actionName, brandSlug, dealSlug, dealType, actionValue, trackingSources) {

        AppEventsLogger.logEvent(
            'select_exclusive_code_info',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                item_action: actionName,
                action_value: actionValue,
                ...trackingSources
            }
        )
    },

    /**
     * This event has log when user click into "Nhận mã ưu đãi" button
     */
    logExclusiveStartGetCode(brandSlug, dealSlug, dealType, store_id, trackingSources) {

        AppEventsLogger.logEvent(
            'fb_mobile_begin_checkout',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                store: store_id,
                ...trackingSources
            }
        )
    },

    /**
     * This event has log when "Nhận mã ưu đãi" failure
     */
    logExclusiveGetCodeFailure(brandSlug, dealSlug, dealType, store_id, message, trackingSources) {

        AppEventsLogger.logEvent(
            'fb_mobile_begin_checkout_failure',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                store: store_id,
                ...trackingSources,
                message
            }
        )
    },

    /**
     * This event has log when exclusive get code complete
     */
    logExclusiveGetCodeSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources) {
        AppEventsLogger.logEvent(
            'fb_mobile_initiated_checkout',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                coupon: coupon,
                ...trackingSources
            }
        );
        AppEventsLogger.logPurchase(
            1,
            'VND',
            {
                fb_content_id: dealSlug,
                fb_content_type: 'product',
                deal_type: dealType,
                brand: brandSlug,
                fb_currency: 'VND',
                fb_description: dealType,
                coupon: coupon,
                ...trackingSources
            })
    },

    logViewDealListEmpression(parent, dealSlugs, trackingSources) {
        AppEventsLogger.logEvent(
            'view_item_list',
            {
                parent: parent,
                item_list: parent,
                items: dealSlugs,
                ...trackingSources
            }
        )
    },

    logSearchDeal(keyword, filters) {
        let acs = '';
        let drs = '';
        try {
            acs = fetcherConfig.getTrackingConfig().acs;
            drs = fetcherConfig.getTrackingConfig().drs;
        } catch (e) {
            console.log(e);
        }
        AppEventsLogger.logEvent(
            'search',
            {
                parent: 'search',
                search_term: keyword,
                acs: acs,
                drs: drs,
                // filters: filters
            }
        )
    },

    logSearchDealListEmpression(keyword, dealSlugs, trackingSources) {
        AppEventsLogger.logEvent(
            'view_search_results',
            {
                parent: 'search',
                item_list: 'search',
                search_term: keyword,
                items: dealSlugs,
                ...trackingSources
            }
        )
    },

    logDealCellOpenToDealDetail(path, dealSlug, brandSlug, deal_type, view_type, trackingSources) {
        const params = {
            path: path,
            fb_content_id: dealSlug,
            brand: brandSlug,
            deal_type: deal_type,
            fb_description: deal_type,
            view_type: view_type,
            ...trackingSources
        };
        AppEventsLogger.logEvent(
            'deal_cell_click_detail',
            params
        )
    },

    logDealCellOpenToBrandDetail(path, dealSlug, brandSlug, deal_type, view_type, trackingSources) {
        const params = {
            path: path,
            fb_content_id: dealSlug,
            brand: brandSlug,
            deal_type: deal_type,
            fb_description: deal_type,
            view_type: view_type,
            ...trackingSources
        };

        AppEventsLogger.logEvent(
            'deal_cell_click_brand',
            params
        )
    },

    logViewMoreButtonInDiscoveryTab(screen_type, params) {
        AppEventsLogger.logEvent(`view_more_${screen_type}`, params);
    },

    /**
     * This event has log when user click into "Đặt chỗ" in movie room
     */
    logMovieBookingAddToCart(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            let price = 0;
            if (!!ObjectUtil.getValue(booking, undefined, ['price'])) {
                price = ObjectUtil.getValue(booking, undefined, ['price']);
            }
            else {
                price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            }
            if (!price) price = 0;
            AppEventsLogger.logEvent(
                'fb_mobile_add_to_cart',
                price,
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    fb_description: dealType,
                    fb_num_items: booking.slot,
                    value: price,
                    booking_store: booking.store_id,
                    booking_time: booking.time,
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieRemoveFromCart(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            let price = 0;
            if (!!ObjectUtil.getValue(booking, undefined, ['price'])) {
                price = ObjectUtil.getValue(booking, undefined, ['price']);
            }
            else {
                price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            }
            if (!price) price = 0;

            AppEventsLogger.logEvent(
                'fb_mobile_remove_from_cart',
                price,
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    fb_description: dealType,
                    fb_num_items: booking.slot,
                    value: price,
                    booking_store: booking.store_id,
                    quantity: booking.slot,
                    booking_time: booking.time,
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieNotifyOrder(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            let price = 0;
            if (!!ObjectUtil.getValue(booking, undefined, ['price'])) {
                price = ObjectUtil.getValue(booking, undefined, ['price']);
            }
            else {
                price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            }
            if (!price) price = 0;
            AppEventsLogger.logEvent(
                'fb_mobile_begin_checkout',
                price,
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    fb_description: dealType,
                    booking_store: booking.store_id,
                    fb_num_items: booking.slot,
                    quantity: booking.slot,
                    value: price,
                    booking_time: booking.time,
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieNotifyOrderSuccess(brandSlug, dealSlug, dealType, booking, trackingSources) {

        try {
            let price = 0;
            if (!!ObjectUtil.getValue(booking, undefined, ['price'])) {
                price = ObjectUtil.getValue(booking, undefined, ['price']);
            }
            else {
                price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            }
            if (!price) price = 0;

            AppEventsLogger.logEvent(
                'fb_mobile_initiated_checkout',
                price,
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    value: price,
                    fb_num_items: booking.slot,
                    fb_description: dealType,
                    coupon: booking.coupon_id,
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieNotifyOrderFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources) {
        try {
            AppEventsLogger.logEvent(
                'fb_mobile_begin_checkout_failure',
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    fb_description: dealType,
                    booking_store: booking.store_id,
                    quantity: booking.slot,
                    booking_time: booking.time,
                    ...trackingSources,
                    message
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources) {
        try {
            let price = 0;
            if (!!ObjectUtil.getValue(booking, undefined, ['price'])) {
                price = ObjectUtil.getValue(booking, undefined, ['price']);
            }
            else {
                price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            }
            if (!price) price = 0;

            AppEventsLogger.logPurchase(
                price,
                'VND',
                {
                    fb_content_id: dealSlug,
                    fb_content_type: 'product',
                    deal_type: dealType,
                    brand: brandSlug,
                    fb_currency: 'VND',
                    fb_description: dealType,
                    fb_num_items: booking.slot,
                    value: price,
                    coupon: booking.coupon_id,
                    ...trackingSources
                })
        } catch (e) {
            console.log(e);
        }
    },
}

