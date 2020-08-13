import { fetcher } from './fetcher';
import { bhdSeatPlan, bookingScheduleDetail, bhdCreateOrder } from './mockData';

const bookingApi = {
    getBhdOrderStatus(dealId) {
        let url = `v4/bhdorder/${dealId}/`;
        return fetcher.get(url);
    },

    getBookingScheduleDetail(bookingScheduleId) {
        let url = `v4/bhdbookingscheduledetail/${bookingScheduleId}/`;
        return fetcher.get(url, undefined, true);
    },

    getBhdSeatPlan(bookingScheduleId) {
        let url = `v4/bhdseatplan/${bookingScheduleId}/`;
        return fetcher.get(url, undefined, true);
    },

    createBhdOrder(tickets, bookingScheduleId, check_in_time) {
        let url = `v4/bhdorder/`;
        const data = {
            tickets: tickets,
            check_in_time: check_in_time,
            booking_schedule_id: bookingScheduleId
        };
        return fetcher.post(url, data, undefined, true);
    },

    bhdNotifyPayment(user_session_id, jamja_order_id, user_name, phone_number, email) {
        let url = `v4/bhdnotifypayment/`;
        const data = {
            user_session_id: user_session_id,
            jamja_order_id: jamja_order_id,
            user_name: user_name,
            full_name: user_name,
            phone_number: phone_number,
            email: email
        };
        return fetcher.post(url, data, undefined, true);
    },

    bhdVerifyPayment(user_session_id, jamja_order_id, return_query) {
        let url = `v4/bhdverifypayment/`;
        const data = {
            user_session_id: user_session_id,
            jamja_order_id: jamja_order_id
        };
        if (!!return_query) {
            data.return_query = return_query;
        }
        return fetcher.post(url, data, undefined, true);
    },

    bhdCheckGetCode(dealId, offset = 0) {
        console.log(dealId);
        let url = `v4/bhdcheckgetcode/?deal_id=${dealId}&limit=12&offset=${offset}`;
        return fetcher.get(url, undefined, false);
    },

    bhdCancelOrder(user_session_id, jamja_order_id) {
        let url = `v4/bhdcancelorder/`;
        const data = {
            user_session_id: user_session_id,
            jamja_order_id: jamja_order_id
        };
        return fetcher.post(url, data, undefined, true);
    },

    getShippingOrder(orderId) {
        return fetcher.get(`v4/shippingorder/${orderId}/`);
    },
    getDeliveryEstimateFee({ coupon_id, address, latitude, longitude, shipping_promocode_id }) {
        let url = `v4/shippingorder/estimatefee/${coupon_id}/?address=${address}&latitude=${latitude}&longitude=${longitude}`;
        return fetcher.get(url, undefined, true);
    },
    getDeliveryApplyPromocode({ code_name, coupon_id, address, latitude, longitude, partner }) {
        let url = `v4/shippingpromocode/${code_name}/?coupon_id=${coupon_id}&address=${address}&latitude=${latitude}&longitude=${longitude}&partner=${partner}`;
        return fetcher.get(url, undefined, true);
    },
    createShippingOrder(request) {
        let url = `v4/shippingorder/`;
        return fetcher.post(url, request, undefined, true);
    },
    deleteShippingOrder(id) {
        let url = `v4/shippingorder/${id}/`;
        return fetcher.delete(url, undefined, true);
    },
    rebroadcast(id) {
        let url = `v4/shippingorder/rebroadcast/${id}/`;
        let data = {};
        return fetcher.post(url, data, undefined, true);
    },

    getMenuOrder(couponId, bookingScheduleId, query, offset, limit) {
        if (!offset) offset = 0;
        if (!limit) limit = 15;

        let url = `v4/preordermenu/?offset=${offset}&limit=${limit}`;
        if (!!couponId) {
            url += `&coupon_id=${couponId}`;
        }
        if (!!bookingScheduleId) {
            url += `&booking_schedule_id=${bookingScheduleId}`;
        }
        if (!!query) {
            url += `&search_keyword=${encodeURIComponent(query)}`;
        }
        return fetcher.get(url);
    },

    calculatePreOrderPrice(couponId, bookingScheduleId, products) {
        const url = `v4/calculatepreorderprice/`;
        const request = {};
        if (!!couponId) {
            request.coupon_id = couponId;
        }
        if (!!bookingScheduleId) {
            request.booking_schedule_id = bookingScheduleId;
        }
        if (!!products) {
            request.products = products;
        }
        return fetcher.post(url, request);
    },

    checkChangeDraff(couponId, products) {
        const url = `v4/preordercheckproduct/`;
        const request = {};
        if (!!couponId) {
            request.coupon_id = couponId;
        }
        if (!!products) {
            request.products = products;
        }
        return fetcher.post(url, request);
    }
};

exports.bookingApi = bookingApi;
