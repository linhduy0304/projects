import {fetcher} from './fetcher'

const storeApi = {
    getStoreDetail(storeId) {
        let url = `v3/store/${storeId}/`;
        return fetcher.get(url);
    },
};

exports.storeApi = storeApi;