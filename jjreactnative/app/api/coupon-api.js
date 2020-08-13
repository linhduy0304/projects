import {fetcher} from './fetcher'

const couponApi = {
    confirmBooking(data) {
        let url = 'v4/coupon/';
        return fetcher.post(url, data, 'origin', true);
    },

    getCouponDetail(couponId) {
        let url = `v3/coupon/${couponId}/`;
        return fetcher.get(url);
    },

    checkCouponStatus(couponId) {
        let url = `v3/merchantcoupon/${couponId}/`;
        return fetcher.get(url);
    },

    cancelCoupon(couponId) {
        let url = `v3/coupon/${couponId}/`;
        return fetcher.delete(url, 'origin', true);
    },

    redeemCoupon(data) {
        let url = 'v3/redeemcoupon/';
        return fetcher.post(url, data);
    },

    getExclusiveCoupon(data) {
        let url = 'v3/coupon/';
        return fetcher.post(url, data, 'origin');
    },

    getCouponList(hasGot, offset, limit) {
        let coupon_state = hasGot ? 'available' : 'not_available';
        let url = `v4/coupondetail/?coupon_state=${coupon_state}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url).then(({objects}) => objects);
    },

    getUnRateCoupon() {
        console.debug('----->>>> withoutPayload:getUnRateCoupon: ');
        let url = `v3/redeemrate/`;
        return fetcher.get(url, 'origin');
    },

    rateCoupon(id, data) {
        let url = `v3/redeemrate/${id}/`;
        return fetcher.put(url, data);
    }
};

exports.couponApi = couponApi;