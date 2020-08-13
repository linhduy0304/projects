import firebase from 'react-native-firebase/dist/index';
import {fetcherConfig} from "../../api/fetcher";
import {ObjectUtil} from '../../utils/object-utils'
import {DEAL_TYPE_MOVIE} from "../../const";

import type {ItemListInteractionModel, ServiceInteractionModel} from '../../model/data';

function isRequiredKeyParams(k) {
    try {
        if (!k) return false;
        if (k.indexOf('utm_') >= 0) return true;
        if (k.indexOf('id') >= 0) return true;
        if (k.indexOf('did') >= 0) return true;
        if (k.indexOf('slug') >= 0) return true;
        if (k.indexOf('cslug') >= 0) return true;
        if (k.indexOf('name') >= 0) return true;
        if (k.indexOf('title') >= 0) return true;
        if (k.indexOf('screen_name') >= 0) return true;
        if (k.indexOf('previous_screen') >= 0) return true;
        if (k.indexOf('screen_type') >= 0) return true;
        if (k.indexOf('section') >= 0) return true;
        if (k.indexOf('position') >= 0) return true;
        if (k.indexOf('internal') >= 0) return true;
        if (k.indexOf('item_id') >= 0) return true;
        if (k.indexOf('item_brand') >= 0) return true;
        if (k.indexOf('item_name') >= 0) return true;
        if (k.indexOf('deal_type') >= 0) return true;
        if (k.indexOf('action') >= 0) return true;
        if (k.indexOf('service_name') >= 0) return true;
        if (k.indexOf('interaction_type') >= 0) return true;
        if (k.indexOf('interaction_value') >= 0) return true;
    }
    catch (e) {
        console.log(e);
    }
    return false;
}

function getParams(data) {
    if (data === undefined || data === null) return data;
    let params = {};
    try {
        //check for 25 parameters
        if (Object.keys(data).length > 25) {
            //get require params
            for (let k in data) {
                if (isRequiredKeyParams(k)) {
                    params[k] = data[k];
                }
            }

            if (Object.keys(params).length < 24) {
                for (let k in data) {
                    if (!isRequiredKeyParams(k)) {
                        params[k] = data[k];
                    }
                    if (Object.keys(params).length >= 25) break;
                }
            }
        }
        else {
            params = {...data};
        }

        const keys = Object.keys(params);
        for (let k of keys) {
            let key = k;
            let value = params[k];
            if (key.length > 40) {
                delete params[k];
                key = key.substring(0, 40);
            }
            if (typeof value !== 'string' && typeof value !== 'number') value = 'not_set';
            else if (typeof value === 'string' && value.length > 100) value = value.substring(0, 100);
            params[key] = value;
        }
    }
    catch (e) {
        console.log(e);
    }
    return params;
}

function getProperties(properties) {
    let params = {};
    try {
        if (!properties) return params;

        const keys = Object.keys(properties);

        for (let k of keys) {
            if (Object.keys(params).length >= 25) {
                return params;
            }

            let key = k;
            let value = properties[k];

            if (key.length > 24) key = key.substring(0, 24);
            if (typeof value === 'string' && value.length > 36) value = value.substring(0, 36);

            params[key] = value;
        }
    }
    catch (e) {
        console.log(e);
    }
    return params;
}

export const FirebaseAnalytics = {

    setUser(user) {
        firebase.analytics().setUserId(user.id);
    },

    setProvince(province) {
        try {
            firebase.analytics().setUserProperty('province', province);
        } catch (e) {
            console.log(e);
        }
    },

    logCurrentScreen(name, params) {
        firebase.analytics().setCurrentScreen(name);
        firebase.analytics().logEvent(
            'screen_view_event',
            {
                name: name,
                ...getParams(params)
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
        firebase.analytics().logEvent(
            'login',
            {
                ...getParams(params),
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
        firebase.analytics().logEvent(event, getParams(params));
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
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            ...trackingSources
        };
        this.logCurrentScreen('deal_detail_screen', params);
    },

    /**
     * This event has log when user view a deal detail content
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     * @param trackingSources
     */
    logViewContentDeal(brandSlug, dealSlug, dealType, source_deal_detail, trackingSources) {
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_category: dealType,
            source_deal_detail: source_deal_detail,
            ...trackingSources
        };

        firebase.analytics().logEvent('view_item', params)
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
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_action: actionName,
            action_value: actionValue,
            ...trackingSources
        };
        firebase.analytics().logEvent(
            'select_booking_info',
            params
        )
    },

    /**
     * This event has log when user click into "Xác nhận đặt chỗ" button success
     */
    logBookingGoToConfirm(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            const price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                price: booking.avg_billing_value,
                value: price,
                currency: 'VND',
                ...trackingSources
            };

            console.log('logBookingGoToConfirm', params);

            firebase.analytics().logEvent(
                'add_to_cart',
                params
            );

            if (dealType === DEAL_TYPE_MOVIE) {
                firebase.analytics().logEvent(
                    'add_to_cart_movie',
                    params
                );
            }
            else {
                firebase.analytics().logEvent(
                    'add_to_cart_lastmin',
                    params
                );
            }

        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when user click into back button
     */
    logConfirmBookingGoBack(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            const price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                price: booking.avg_billing_value,
                value: price,
                currency: 'VND',
                ...trackingSources
            };

            firebase.analytics().logEvent(
                'remove_from_cart',
                params
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
            const price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                checkout_step: 1,
                checkout_option: 'verify_booking',
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                price: booking.avg_billing_value,
                value: price,
                currency: 'VND',
                ...trackingSources
            };

            firebase.analytics().logEvent(
                'begin_checkout',
                params
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
            const price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                coupon: booking.coupon_id,
                checkout_step: 2,
                checkout_option: 'contact',
                quantity: booking.slot,
                booking_time: booking.time,
                price: booking.avg_billing_value,
                value: price,
                currency: 'VND',
                ...trackingSources
            };

            firebase.analytics().logEvent(
                'checkout_progress',
                params
            );

            firebase.analytics().logEvent(
                'checkout_progress_lastmin',
                params
            )
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * This event has log when "Gửi yêu cầu đặt chỗ" failure
     */
    logVerifyBookingFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources) {
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_category: dealType,
            booking_store: booking.store_id,
            quantity: booking.slot,
            booking_time: booking.time,
            message: message,
            ...trackingSources
        };

        firebase.analytics().logEvent(
            'begin_checkout_failure',
            params
        )
    },

    /**
     * This event has log when booking complete
     */
    logBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources) {
        try {
            let price = ObjectUtil.getValue(booking, undefined, ['price']);

            if (!price) {
                price = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);
            }
            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                coupon: booking.coupon_id,
                transaction_id: booking.coupon_id,
                success: success,
                price: booking.avg_billing_value,
                value: price,
                quantity: booking.slot,
                currency: 'VND',
                ...trackingSources
            };

            firebase.analytics().logEvent(
                'ecommerce_purchase',
                params
            )
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
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_category: dealType,
            coupon: coupon,
            transaction_id: coupon,
            ...trackingSources
        };

        firebase.analytics().logEvent(
            'purchase_refund',
            params
        )
    },

    /**
     * This event has log when user click into "Lấy mã" button
     */
    logOpenGetExclusiveCode(brandSlug, dealSlug, dealType, trackingSources) {
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_category: dealType,
            ...trackingSources
        };

        firebase.analytics().logEvent(
            'add_to_cart',
            params
        );

        firebase.analytics().logEvent(
            'add_to_cart_exclusive',
            params
        )
    },

    /**
     * This event has log when user click into back button in confirm get code screen
     */
    logGetExclusiveCodeGoBack(brandSlug, dealSlug, dealType, trackingSources) {
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_category: dealType,
            ...trackingSources
        };

        firebase.analytics().logEvent(
            'remove_from_cart',
            params
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
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_category: dealType,
            item_action: actionName,
            action_value: actionValue,
            ...trackingSources
        };

        firebase.analytics().logEvent(
            'select_exclusive_code_info',
            params
        )
    },

    /**
     * This event has log when user click into "Nhận mã ưu đãi" button
     */
    logExclusiveStartGetCode(brandSlug, dealSlug, dealType, store_id, trackingSources) {
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_category: dealType,
            store: store_id,
            ...trackingSources
        };

        firebase.analytics().logEvent(
            'begin_checkout',
            params
        )
    },

    /**
     * This event has log when "Nhận mã ưu đãi" failure
     */
    logExclusiveGetCodeFailure(brandSlug, dealSlug, dealType, store_id, message, trackingSources) {
        const params = {
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_category: dealType,
            store: store_id,
            message: message,
            ...trackingSources
        };

        firebase.analytics().logEvent(
            'begin_checkout_failure',
            params
        )
    },

    /**
     * This event has log when exclusive get code complete
     */
    logExclusiveGetCodeSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources) {

        const loggingBaseParams = {
            ...trackingSources,
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: dealType,
            item_category: dealType,
            coupon: coupon,
        }

        firebase.analytics().logEvent(
            'checkout_progress_exclusive',
            loggingBaseParams
        )

        firebase.analytics().logEvent(
            'checkout_progress',
            {
                ...loggingBaseParams,
                checkout_step: 2,
                checkout_option: 'return_code'
            }
        )
        firebase.analytics().logEvent(
            'ecommerce_purchase',
            {
                ...loggingBaseParams,
                transaction_id: coupon,
                success: 1
            }
        )
    },

    logViewDealListEmpression(parent, dealSlugs, trackingSources) {

        firebase.analytics().logEvent(
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
        firebase.analytics().logEvent(
            'search',
            {
                parent: 'search',
                search_term: keyword,
                // filters: filters
                acs: acs,
                drs: drs
            }
        )
    },

    logSearchDealListEmpression(keyword, dealSlugs, trackingSources) {
        firebase.analytics().logEvent(
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
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            deal_type: deal_type,
            item_category: deal_type,
            value: path,
            view_type: view_type,
            ...trackingSources
        };
        firebase.analytics().logEvent('deal_cell_click_detail', params);
    },

    logDealCellOpenToBrandDetail(path, dealSlug, brandSlug, deal_type, view_type, trackingSources) {
        const params = {
            path: path,
            item_id: dealSlug,
            item_brand: brandSlug,
            item_name: dealSlug,
            item_category: deal_type,
            deal_type: deal_type,
            value: path,
            view_type: view_type,
            ...trackingSources
        };
        firebase.analytics().logEvent('deal_cell_click_brand', params);
    },

    logViewMoreButtonInDiscoveryTab(screen_type, params) {
        firebase.analytics().logEvent(`view_more_${screen_type}`, params);
    },

    logCrash(error, code, message) {
        try {
            if (!!error) {
                firebase.crashlytics().recordError(code, `${message}: ${error.toString()}`);
            }
            else {
                firebase.crashlytics().recordError(code, message);
            }
        }
        catch (e) {
            console.log(e);
        }
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
            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                price: booking.avg_billing_value,
                value: price,
                currency: 'VND',
                ...trackingSources
            };

            console.log('logMovieBookingAddToCart', params);

            firebase.analytics().logEvent(
                'add_to_cart',
                params
            );

            firebase.analytics().logEvent(
                'add_to_cart_movie',
                params
            );

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
            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                price: booking.avg_billing_value,
                value: price,
                currency: 'VND',
                ...trackingSources
            };

            firebase.analytics().logEvent(
                'remove_from_cart',
                params
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
            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                checkout_step: 1,
                checkout_option: 'verify_booking',
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                price: booking.avg_billing_value,
                value: price,
                currency: 'VND',
                ...trackingSources
            };

            firebase.analytics().logEvent(
                'begin_checkout',
                params
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

            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                coupon: booking.coupon_id,
                checkout_step: 2,
                checkout_option: 'contact',
                quantity: booking.slot,
                booking_time: booking.time,
                price: booking.avg_billing_value,
                value: price,
                currency: 'VND',
                ...trackingSources
            };

            firebase.analytics().logEvent(
                'checkout_progress',
                params
            );

            firebase.analytics().logEvent(
                'checkout_progress_movie',
                params
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieNotifyOrderFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources) {
        try {
            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                message: message,
                ...trackingSources
            };

            firebase.analytics().logEvent(
                'begin_checkout_failure',
                params
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

            const params = {
                item_id: dealSlug,
                item_brand: brandSlug,
                item_name: dealSlug,
                deal_type: dealType,
                item_category: dealType,
                coupon: booking.coupon_id,
                transaction_id: booking.coupon_id,
                success: success,
                price: booking.avg_billing_value,
                value: price,
                quantity: booking.slot,
                currency: 'VND',
                ...trackingSources
            };

            firebase.analytics().logEvent(
                'ecommerce_purchase',
                params
            )
        } catch (e) {
            console.log(e);
        }
    },


    /**
     * New tracking
     */

    trackServiceInteraction(service_name, params: ServiceInteractionModel) {
        try {
            if (!params) return;
            params.service_name = service_name;

            firebase.analytics().logEvent('Engagement', ObjectUtil.removeUndefined(params));
        }
        catch (e) {
            console.log(e);
        }
    },

    trackItemListInteraction(parameters: ItemListInteractionModel) {
        try {
            console.debug('FirebaseAnalytics:trackItemListInteraction: ', parameters);
            firebase.analytics().logEvent('item_interactions', getParams(parameters));
        }
        catch (e) {
            console.log(e);
        }
    },

    trackItemImpression(parameters: ItemListInteractionModel) {
        try {
            console.debug('FirebaseAnalytics:trackItemImpression: ', parameters);
            firebase.analytics().logEvent('item_impressions', getParams(parameters));
        }
        catch (e) {
            console.log(e);
        }
    },

    trackItemResult(parameters: ItemListInteractionModel) {
        try {
            console.debug('FirebaseAnalytics:trackItemResult: ', parameters);
            firebase.analytics().logEvent('item_results', getParams(parameters));
        }
        catch (e) {
            console.log(e);
        }
    }
}