import {
    GoogleAnalyticsTracker
} from '../../../../../modules/react-native-google-analytics-bridge';
import {NativeModules} from 'react-native';

import {StringUtil} from '../../../../utils/string-util'
import {ObjectUtil} from "../../../../utils/object-utils";

const GA_ID = !!NativeModules.AppInfo.GA_ID ? NativeModules.AppInfo.GA_ID : 'UA-64551878-15';

const tracker = new GoogleAnalyticsTracker(GA_ID);

const GAAnalytics = {

    setUser(user) {
        tracker.setUser(user.id)
    },

    /**
     * This event to log when a screen has openned
     * @param name - require
     * @param params
     */
    logCurrentScreen(name, params) {
        const optionsValues = {
            label: ''
        };
        if (!!params) {
            if (!!params.item_id) {
                optionsValues.label = params.item_id;
            }
            else if (!!params.slug) {
                optionsValues.label = params.slug;
            }
            else if (!!params.name) {
                optionsValues.label = params.name;
            }
        }

        tracker.trackEvent(
            'screen_view_event',
            name,
            optionsValues
        )
    },

    /**
     *
     * @param event as String
     * @param params as Object
     */
    loginEvent(event, params) {
        const optionsValues = {
            label: ''
        };
        if (!!params && !!params.item_id) {
            optionsValues.label = params.item_id;
        }
        tracker.trackEvent(
            'login',
            event,
            optionsValues
        )
    },

    /**
     *
     * @param event as String
     * @param params as Object
     * ex:
     * action_location: 'deal_detail',
     * action_name: 'get_code',
     * @param categoryEvent
     */
    logNormalEvent(event, params, categoryEvent) {
        if (StringUtil.isEmpty(categoryEvent)) categoryEvent = 'custom';
        tracker.trackEvent(categoryEvent, event, params);
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
                item_id: dealSlug,
                item_brand: brandSlug,
                deal_type: dealType,
                ...trackingSources
            }
        )
    },

    /**
     * This event has log when user view a deal detail content
     * @param brandSlug
     * @param dealSlug
     * @param dealType
     * @param trackingSources
     */
    logViewContentDeal(brandSlug, dealSlug, dealType, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                ...trackingSources
            },
            'detail',
            dealSlug
        );
        tracker.trackEvent(
            'Ecommerce',
            'view_item',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logBookingSelection(action, brandSlug, dealSlug, dealType, value, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                item_action: action,
                action_value: value,
                ...trackingSources
            },
            action,
            `${value}`
        )
        tracker.trackEvent(
            'Ecommerce',
            'select_booking_info',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logBookingGoToConfirm(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            tracker.trackProductAction(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    booking_store: booking.store_id,
                    quantity: booking.slot,
                    booking_time: booking.time,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                },
                'add_to_cart',
                ''
            );
            tracker.trackEvent(
                'Ecommerce',
                'add_to_cart',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logConfirmBookingGoBack(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            tracker.trackProductAction(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    booking_store: booking.store_id,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    booking_time: booking.time,
                    ...trackingSources
                },
                'remove_from_cart',
                ''
            );
            tracker.trackEvent(
                'Ecommerce',
                'remove_from_cart',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logVerifyBooking(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            tracker.trackProductAction(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    booking_store: booking.store_id,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    booking_time: booking.time,
                    ...trackingSources
                },
                'begin_checkout',
                ''
            );
            tracker.trackEvent(
                'Ecommerce',
                'begin_checkout',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logVerifyBookingSuccess(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            tracker.trackProductAction(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    coupon: booking.coupon_id,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    checkout_step: 2,
                    checkout_option: 'contact',
                    ...trackingSources
                },
                'checkout_progress',
                ''
            );
            tracker.trackEvent(
                'Ecommerce',
                'checkout_progress',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logVerifyBookingFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                message: message,
                ...trackingSources
            },
            'begin_checkout_failure',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'begin_checkout_failure',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logBookingComplete(brandSlug, dealSlug, dealType, booking, success, trackingSources) {
        try {
            const revenue = ObjectUtil.getValue(booking, 0, ['avg_billing_value']) * ObjectUtil.getValue(booking, 0, ['slot']);

            tracker.trackPurchaseEvent(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    coupon: booking.coupon_id,
                    transaction_id: booking.coupon_id,
                    success: success,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                },
                {
                    id: booking.coupon_id,
                    revenue: revenue,
                    couponCode: booking.coupon_id
                },
            );
            // tracker.trackProductAction(
            //     {
            //         id: dealSlug,
            //         name: dealSlug,
            //         brand: brandSlug,
            //         category: dealType,
            //         coupon: booking.coupon_id,
            //         transaction_id: booking.coupon_id,
            //         success: success,
            //         quantity: booking.slot,
            //         price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
            //         ...trackingSources
            //     },
            //     'ecommerce_purchase',
            //     ''
            // );
            tracker.trackEvent(
                'Ecommerce',
                'ecommerce_purchase',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logCancelCouponSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                coupon: coupon,
                transaction_id: coupon,
                ...trackingSources
            },
            'purchase_refund',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'purchase_refund',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logOpenGetExclusiveCode(brandSlug, dealSlug, dealType, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                ...trackingSources
            },
            'add_to_cart',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'add_to_cart',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logGetExclusiveCodeGoBack(brandSlug, dealSlug, dealType, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                ...trackingSources
            },
            'remove_from_cart',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'remove_from_cart',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logExclusiveStoreSelection(action, brandSlug, dealSlug, dealType, value, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                item_action: action,
                action_value: value,
                ...trackingSources
            },
            'select_exclusive_code_info',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'select_exclusive_code_info',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logExclusiveStartGetCode(brandSlug, dealSlug, dealType, store_id, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                store: store_id,
                ...trackingSources
            },
            'begin_checkout',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'begin_checkout',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logExclusiveGetCodeFailure(brandSlug, dealSlug, dealType, store_id, message, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                store: store_id,
                ...trackingSources,
                message
            },
            'begin_checkout_failure',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'begin_checkout_failure',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logExclusiveGetCodeSuccess(brandSlug, dealSlug, dealType, coupon, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                coupon: coupon,
                checkout_step: 2,
                checkout_option: 'return_code',
                ...trackingSources
            },
            'checkout_progress',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'checkout_progress',
            {
                label: dealSlug,
                ...trackingSources
            }
        )

        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                coupon: coupon,
                transaction_id: coupon,
                success: 1,
                ...trackingSources
            },
            'ecommerce_purchase',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'ecommerce_purchase',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
    },

    logSearchDeal(keyword, filters) {
        tracker.trackEvent(
            'Search',
            'Search Deal',
            {
                label: keyword,
            }
        )
    },

    logMovieBookingAddToCart(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            tracker.trackProductAction(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    booking_store: booking.store_id,
                    quantity: booking.slot,
                    booking_time: booking.time,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                },
                'add_to_cart',
                ''
            );
            tracker.trackEvent(
                'Ecommerce',
                'add_to_cart',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieRemoveFromCart(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            tracker.trackProductAction(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    booking_store: booking.store_id,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    booking_time: booking.time,
                    ...trackingSources
                },
                'remove_from_cart',
                ''
            );
            tracker.trackEvent(
                'Ecommerce',
                'remove_from_cart',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieNotifyOrder(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            tracker.trackProductAction(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    booking_store: booking.store_id,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    booking_time: booking.time,
                    ...trackingSources
                },
                'begin_checkout',
                ''
            );
            tracker.trackEvent(
                'Ecommerce',
                'begin_checkout',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieNotifyOrderSuccess(brandSlug, dealSlug, dealType, booking, trackingSources) {
        try {
            tracker.trackProductAction(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    coupon: booking.coupon_id,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    checkout_step: 2,
                    checkout_option: 'contact',
                    ...trackingSources
                },
                'checkout_progress',
                ''
            );
            tracker.trackEvent(
                'Ecommerce',
                'checkout_progress',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

    logMovieNotifyOrderFailure(brandSlug, dealSlug, dealType, booking, message, trackingSources) {
        tracker.trackProductAction(
            {
                id: dealSlug,
                name: dealSlug,
                brand: brandSlug,
                category: dealType,
                booking_store: booking.store_id,
                quantity: booking.slot,
                booking_time: booking.time,
                message: message,
                ...trackingSources
            },
            'begin_checkout_failure',
            ''
        );
        tracker.trackEvent(
            'Ecommerce',
            'begin_checkout_failure',
            {
                label: dealSlug,
                ...trackingSources
            }
        )
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

            tracker.trackPurchaseEvent(
                {
                    id: dealSlug,
                    name: dealSlug,
                    brand: brandSlug,
                    category: dealType,
                    coupon: booking.coupon_id,
                    transaction_id: booking.coupon_id,
                    success: success,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                },
                {
                    id: booking.coupon_id,
                    revenue: price,
                    couponCode: booking.coupon_id
                },
            );
            tracker.trackEvent(
                'Ecommerce',
                'ecommerce_purchase',
                {
                    label: dealSlug,
                    quantity: booking.slot,
                    price: ObjectUtil.getValue(booking, 0, ['avg_billing_value']),
                    ...trackingSources
                }
            )
        } catch (e) {
            console.log(e);
        }
    },

}

exports.GAAnalytics = GAAnalytics;