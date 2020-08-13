export const FETCH_BRAND_INFO = "FETCH_BRAND_INFO";
export const FETCH_BRAND_INFO_SUCCESS = "FETCH_BRAND_INFO_SUCCESS";
export const FETCH_BRAND_INFO_FAIL = "FETCH_BRAND_INFO_FAIL";
//Follow a brand
export const FOLLOW_A_BRAND = "FOLLOW_A_BRAND";
export const FOLLOW_A_BRAND_SUCCESS = "FOLLOW_A_BRAND_SUCCESS";
export const FOLLOW_A_BRAND_FAIL = "FOLLOW_A_BRAND_FAIL";

export const fetchBrandInfo = (user, brandid) => {
    return {
        type: FETCH_BRAND_INFO,
        user,
        brandid,
    }
}

export const fetchBrandInfoSuccess = (brand) => {
    return {
        type: FETCH_BRAND_INFO_SUCCESS,
        brand,
    }
}

export const fetchBrandInfoError = (error, brandid) => {
    return {
        type: FETCH_BRAND_INFO_FAIL,
        error,
        brandid,
    }
}

//Follow a brand
export const followBrand = (user, brandid) => {
    return {
        type: FOLLOW_A_BRAND,
        user,
        brandid,
    }
}

export const followBrandSuccess = (brand, isFollowing) => {
    return {
        type: FOLLOW_A_BRAND_SUCCESS,
        brand,
        isFollowing,
    }
}

export const followBrandError = (error, brandid) => {
    return {
        type: FOLLOW_A_BRAND_FAIL,
        error,
        brandid,
    }
}