export const FETCH_STORE_INFO = "FETCH_STORE_INFO";
export const FETCH_STORE_INFO_SUCCESS = "FETCH_STORE_INFO_SUCCESS";
export const FETCH_STORE_INFO_FAIL = "FETCH_STORE_INFO_FAIL";

export const fetchStoreInfo = (store_id) => {
    return {
        type: FETCH_STORE_INFO,
        store_id,
    }
}

export const fetchStoreInfoSuccess = (store) => {
    return {
        type: FETCH_STORE_INFO_SUCCESS,
        store,
    }
}

export const fetchStoreInfoError = (error, store_id) => {
    return {
        type: FETCH_STORE_INFO_FAIL,
        error,
        store_id,
    }
}