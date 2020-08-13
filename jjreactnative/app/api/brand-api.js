import {fetcher} from './fetcher'
import {StringUtil} from '../utils/string-util'

const brandApi = {
    getBrandDetail(brandId) {
        let url = `v4/branddetail/${brandId}/`;
        return fetcher.get(url);
    },
    follow(brandId) {
        let url = 'v3/brandfollow/';
        return fetcher.post(url, {brand: brandId});
    },
    getStoreByBrand(brandId) {
        let url = `v1/store/?brand=${brandId}`;
        return fetcher.get(url).then(response => response.objects);
    },

    getBrandFollowing(hasFollow, offset, limit, q) {
        const type = hasFollow ? 'follow' : 'other';
        let url = `v3/brand?type=${type}&offset=${offset}&limit=${limit}${StringUtil.isBlank(q) ? '' : `&q=${q}`}`;
        return fetcher.get(url).then(response => response.objects);
    },

    getBrandDetailBySlug(slug) {
        let url = `v3/brand/${slug}/`;
        return fetcher.get(url);
    },
};

exports.brandApi = brandApi;