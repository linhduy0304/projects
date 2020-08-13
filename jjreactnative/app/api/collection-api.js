import {fetcher} from './fetcher'
import {StringUtil} from '../utils/string-util'

const collectionApi = {
    getCollectionListByDealSlug(slug, offset, limit) {
        let url = `v3/collection/?dslug=${slug}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url);
    },

    getCollectionSavedList(offset, limit) {
        let url = `v4/savecollection/?saved=1&offset=${offset}&limit=${limit}`;
        return fetcher.get(url).then(({objects}) => objects);
    },

    getCollectionDetail(cslug) {
        let url = `v3/collection/${cslug}/`;
        return fetcher.get(url);
    },

    saveCollection(cslug) {
        let url = `v3/savecollection/`;
        return fetcher.post(url, {cslug: cslug});
    },

    getTrendingCollection(screen_type) {
        let url = `v4/trendingcollection?screen_type=${screen_type}`;
        return fetcher.get(url);
    },

    getCollections(dslug, sort, tags, offset, limit, removePin) {
        let url = `v3/collection/?offset=${offset}&limit=${limit}`;
        if (!StringUtil.isEmpty(dslug)) {
            url += `&dslug=${dslug}`;
        }
        if (!StringUtil.isEmpty(sort)) {
            url += `&sort=${sort}`;
        }
        if (!StringUtil.isEmpty(tags)) {
            url += `&tags=${encodeURIComponent(tags)}`;
        }
        if (!StringUtil.isEmpty(removePin)) {
            url += `&include_pin=exclude`;
        }
        return fetcher.get(url);
    }
};

exports.collectionApi = collectionApi;