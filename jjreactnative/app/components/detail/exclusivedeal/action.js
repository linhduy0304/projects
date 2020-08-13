export const FETCH_EXCLUSIVE_DEALS = "FETCH_EXCLUSIVE_DEALS";
export const FETCH_EXCLUSIVE_DEALS_SUCCESS = "FETCH_EXCLUSIVE_DEALS_SUCCESS";
export const FETCH_EXCLUSIVE_DEALS_FAIL = "FETCH_EXCLUSIVE_DEALS_FAIL";


export const fetchExclusiveDeals = (params) => {
    return {
        type: FETCH_EXCLUSIVE_DEALS,
        params,
    }
}

export const fetchExclusiveDealsSuccess = (deals) => {
    return {
        type: FETCH_EXCLUSIVE_DEALS_SUCCESS,
        deals,
    }
}

export const fetchExclusiveDealsError = (error) => {
    return {
        type: FETCH_EXCLUSIVE_DEALS_FAIL,
        error,
    }
}