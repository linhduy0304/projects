import RNInsider from 'react-native-insider';
import {ObjectUtil} from '../../utils/object-utils';

export const InsiderAnalytics = {

    setUser(user) {
        try {
            RNInsider.setUserIdentifier(user.id);
        }
        catch (e) {
            console.log(e);
        }
    },

    removeUser() {
        try {
            RNInsider.unsetUserIdentifier();
            RNInsider.unsetCustomAttribute();
        }
        catch (e) {
            console.log(e);
        }
    },

    loginStarted(date) {
        try {
            RNInsider.tagEventWithParameters('login_started', {date: date});
        }
        catch (e) {
            console.log(e);
        }
    },

    loginCompleted(date) {
        try {
            RNInsider.tagEventWithParameters('login_completed', {date: date});
        }
        catch (e) {
            console.log(e);
        }
    },

    loginCancelled(date) {
        try {
            RNInsider.tagEventWithParameters('login_cancelled', {date: date});
        }
        catch (e) {
            console.log(e);
        }
    },

    viewCollectionDetail(name, slug) {
        try {
            RNInsider.tagEventWithParameters(
                'collection_detail',
                {
                    collection_detail_name: name,
                    collection_slug: slug
                });
        }
        catch (e) {
            console.log(e);
        }
    },

    viewDealDetail(name, slug, brand, cat1, cat2, dealType, discountPrice, section, sameBrand) {
        try {
            RNInsider.tagEventWithParameters(
                'item_viewed',
                {
                    deal_name: name,
                    deal_slug: slug,
                    deal_brand: brand,
                    category_1: cat1,
                    category_2: cat2,
                    deal_type: dealType,
                    discount_pct: discountPrice,
                    section,
                    sameBrand: sameBrand
                });
        }
        catch (e) {
            console.log(e);
        }
    },

    addToCart(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime) {
        try {
            RNInsider.tagEventWithParameters(
                'item_viewed',
                {
                    deal_name: name,
                    deal_slug: slug,
                    deal_brand: brand,
                    category_1: cat1,
                    category_2: cat2,
                    deal_type: dealType,
                    discount_pct: discountPrice,
                    deal_value: value,
                    quantity,
                    deal_remain_expiration: checkInTime
                });
        }
        catch (e) {
            console.log(e);
        }
    },

    beginCheckOut(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, promocode) {
        try {
            RNInsider.tagEventWithParameters(
                'checkout_start',
                {
                    deal_name: name,
                    deal_slug: slug,
                    deal_brand: brand,
                    category_1: cat1,
                    category_2: cat2,
                    deal_type: dealType,
                    discount_pct: discountPrice,
                    deal_value: value,
                    quantity,
                    deal_remain_expiration: checkInTime,
                    promocode: promocode
                });
        }
        catch (e) {
            console.log(e);
        }
    },

    purchase(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, couponId, promocode) {
        try {
            RNInsider.tagEventWithParameters('checkout_start', ObjectUtil.removeUndefined({
                deal_name: name,
                deal_slug: slug,
                deal_brand: brand,
                category_1: cat1,
                category_2: cat2,
                deal_type: dealType,
                discount_pct: discountPrice,
                deal_value: value,
                quantity: quantity,
                deal_remain_expiration: checkInTime,
                transaction_id: couponId,
                promocode: promocode
            }));
        }
        catch (e) {
            console.log(e);
        }
    },

    cancelCoupon(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, couponId, promocode) {
        try {
            RNInsider.tagEventWithParameters('booking_cancelled', ObjectUtil.removeUndefined({
                deal_name: name,
                deal_slug: slug,
                deal_brand: brand,
                category_1: cat1,
                category_2: cat2,
                deal_type: dealType,
                discount_pct: discountPrice,
                deal_value: value,
                quantity: quantity,
                deal_remain_expiration: checkInTime,
                transaction_id: couponId,
                promocode: promocode
            }));
        }
        catch (e) {
            console.log(e);
        }
    },

    couponRedeemed(name, slug, brand, cat1, cat2, dealType, discountPrice, value, quantity, checkInTime, couponId, promocode) {
        try {
            RNInsider.tagEventWithParameters('deal_redeemed', ObjectUtil.removeUndefined({
                deal_name: name,
                deal_slug: slug,
                deal_brand: brand,
                category_1: cat1,
                category_2: cat2,
                deal_type: dealType,
                discount_pct: discountPrice,
                deal_value: value,
                quantity: quantity,
                deal_remain_expiration: checkInTime,
                transaction_id: couponId,
                promocode: promocode
            }));
        }
        catch (e) {
            console.log(e);
        }
    }
};