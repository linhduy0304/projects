import {fetcher} from './fetcher'

const categoryApi = {
    getList() {
        let url = `v4/category/`;
        return fetcher.get(url);
    },

    
};

exports.categoryApi = categoryApi;