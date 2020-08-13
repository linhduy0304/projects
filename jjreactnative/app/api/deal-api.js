import {fetcher} from './fetcher'
import {StringUtil} from '../utils/string-util'

const dealApi = {
    getDealDetail(slug) {
        let url = `v4/deal/${slug}/`;
        return fetcher.get(url);
    },

    getDealByBrand(brandId, offset, limit) {
        let url = `v3/searchdeal/?brand_id=${brandId}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url).then(({objects}) => objects);
    },

    getExclusiveDeals(offset, limit) {
        let url = `v4/searchdeal/?segment=exclusive&offset=${offset}&limit=${limit}`;
        return fetcher.get(url).then(({objects}) => objects);
    },

    getRelatedDeal(dealId, offset, limit) {
        let url = `v3/relateddeal/?deal=${dealId}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url);
    },

    getBookingSchedule(dSlug, storeId, offset, limit, type) {
        let url = `v4/bookingschedule?deal_slug=${dSlug}&store_id=${storeId}&offset=${offset}&limit=${limit}`;
        if (type === 'flash_sale') {
            url += '&type=flash_sale';
        }
        return fetcher.get(url);
    },

    getStoresLimitByDeal(did) {
        let url = `v3/exclusivebookingschedule?did=${did}`;
        return fetcher.get(url).then(response => response.objects);
    },

    getDealSaved(offset, limit) {
        let url = `v4/savedeal/?saved=1&offset=${offset}&limit=${limit}`;
        return fetcher.get(url);
    },

    searchDeal(sort_type, keyword, detail_tag, offset, limit) {
        let url = `v4/searchdeal/?offset=${offset}&limit=${limit}`;
        if (!StringUtil.isEmpty(sort_type)) {
            url += `&sort_type=${sort_type}`;
        }
        if (!StringUtil.isEmpty(keyword)) {
            url += `&keyword=${encodeURIComponent(keyword.trim())}`;
        }
        if (!StringUtil.isEmpty(detail_tag)) {
            url += `&detail_tags=${encodeURIComponent(detail_tag)}`;
        }
        return fetcher.get(url);
    },

    voteDeal(dealSlug, action) {
        let url = `v3/deal/${dealSlug}/`;
        return fetcher.put(url, {action: action});
    },

    saveDeal(dealId) {
        let url = `v3/savedeal/`;
        return fetcher.post(url, {did: dealId}).then(response => response.deal);
    },

    checkinDeal(dealSlug) {
        let url = `v3/checkindeal/`;
        return fetcher.post(url, {slug: dealSlug});
    },

    deleteCheckinDeal(checkinId) {
        let url = `v3/checkindeal/${checkinId}/`;
        return fetcher.delete(url, 'origin');
    },

    getDealList(queryStringParams) {
        let url = `v4/deallist/?${queryStringParams}`;
        return fetcher.get(url).then(response => response.objects);
    },

    getJAMJARateByDeal(did, offset, limit) {
        let url = `v3/ratelist/?did=${did}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url);
    },

    getJAMJARateByBrand(bid, offset, limit) {
        let url = `v3/ratelist/?bid=${bid}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url);
    },

    getFoodyReviewByDeal(did, offset, limit) {
        let url = `v3/foodyreview/?did=${did}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url);
    },

    getFoodyReviewByBrand(bid, offset, limit) {
        let url = `v3/foodyreview/?bid=${bid}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url);
    },

    searchDealV4(sort_type, segment, detail_tags, offset, limit, screen_type, mall_slug) {
        let url = `v4/searchdeal?offset=${offset}&limit=${limit}`;
        if (!StringUtil.isBlank(sort_type)) {
            url += `&sort_type=${sort_type}`;
        }
        if (!StringUtil.isBlank(segment)) {
            url += `&segment=${segment}`;
        }
        if (!StringUtil.isBlank(detail_tags)) {
            url += `&detail_tags=${encodeURIComponent(detail_tags)}`;
        }
        if (!StringUtil.isBlank(screen_type)) {
            url += `&screen_type=${screen_type}`;
        }
        if (!!mall_slug) {
            url += `&shopping_mall_slug=${mall_slug}`;
        }

        return fetcher.get(url);
    },

    getDealByCollection(cslug, sort_type, offset, limit, user_lat, user_lon) {
        let url = `v4/collectiondeals/?offset=${offset}&limit=${limit}`;
        if (!StringUtil.isBlank(cslug)) {
            url += `&cslug=${cslug}`;
        }
        if (!StringUtil.isBlank(sort_type)) {
            url += `&sort_type=${sort_type}`;
        }
        if (!StringUtil.isBlank(user_lat)) {
            url += `&user_lat=${user_lat}`;
        }
        if (!StringUtil.isBlank(user_lon)) {
            url += `&user_lon=${user_lon}`;
        }
        return fetcher.get(url);
    },
    getDealRelateBrand(brandId, offset, limit) {
        let url = `v1/branddeal/?brand_id=${brandId}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url).then(({objects}) => objects);
    },

};

exports.dealApi = dealApi;