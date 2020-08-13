import {fetcher, fetcherConfig} from './fetcher'
import {StringUtil} from '../utils/string-util'
import {CLIENT_ID} from "../const";

const commonApi = {
    getProductList(slug, offset, limit) {
        let url = `v3/product/?dslug=${slug}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url);
    },

    getPromoCodeDetail(promoCode, dealId, storeId, bookingTime, slot, orderId) {
        let url = `v4/promocode/${promoCode}/?did=${dealId}&store_id=${storeId}&booking_time=${bookingTime}&slot=${slot}`;
        if (!!orderId) {
            url += `&jamja_order_id=${orderId}`;
        }
        return fetcher.get(url);
    },

    getErrorReportList() {
        const url = `v3/dealreport?offset=0&limit=100`;
        return fetcher.get(url).then(response => response.objects);
    },

    reportDeal(dealSlug, errorId, message) {
        const params = {
            error_id: errorId,
            message: message,
            slug: dealSlug,
        }
        const url = `v3/dealreport/`;
        return fetcher.post(url, params).then(response => response.objects);
    },

    getKeywordSuggestion(keyword, offset, limit) {
        let url = `v3/searchsuggest/?keyword=${encodeURIComponent(keyword)}&offset=${offset}&limit=${limit}`;

        return fetcher.get(url).then(response => response.objects);
    },

    getTrendingKeyword(limit) {
        let url = `v4/trendingkeyword/?number=${limit}`;
        return fetcher.get(url).then(response => response.objects);
    },

    getEvent() {
        let url = `v4/event/`;
        return fetcher.get(url).then(response => response.objects);
    },

    sendDeviceTokenToServer(info) {
        let url = `v1/apnstokendevice/`;
        return fetcher.post(url, info);
    },

    getShoppingMall(offset, limit, sort) {
        let url = `v4/shoppingmall/?offset=${offset}&limit=${limit}`;
        if (!StringUtil.isEmpty(sort)) {
            url += `&order_by=${sort}`;
        }
        return fetcher.get(url);
    },

    getHomePageDeals() {
        let url  =`v4/homepagedeals/`;
        return fetcher.get(url);
    },

    getSupportLocations() {
        return fetcher.get('v3/province/');
    },

    login(access_token) {
        const url = `user/login/`;
        let details = {
            'access_token': access_token,
            'backend': 'facebook',
            'client_id': CLIENT_ID
        };
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetcher.login(url, formBody);
    },

    initUUID(data) {
        let url = `v4/uuidinit/`;
        return fetcher.post(url, data);
    },

    logout() {
        let url = `v4/logout/`;
        return fetcher.get(url);
    },

    getBrandDays() {
        return fetcher.get(`v4/brandday/`).then(response => response.objects[0]);
    },

    getUserInfo(userId) {
        return fetcher.get(`v4/userinfo/${userId}/`);
    },

    /**
     *  43: search box banner
     *  50: float banner
     *  46: search input banner
     */
    getBanner() {
        return fetcher.get(`v4/banner/?banner_position=43,50,46,52&banner_location=${fetcherConfig.getProvince()}`).then(response => response.objects);
    },

    getEventConfig() {
        return fetcher.get(`v4/eventconfig/`).then(response => response.objects);
    },

    loginByPhone(id_token) {
        const url = `v4/phonenumberlogin/`;
        let request = {
            'id_token': id_token,
            'client_id': CLIENT_ID
        };
        return fetcher.post(url, request);
    },

    clearPromoCode(promoCode, orderId) {
        let url = `v4/promocode/${promoCode}/?jamja_order_id=${orderId}`;
        return fetcher.delete(url);
    }
};

exports.commonApi = commonApi;