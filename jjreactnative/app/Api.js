import {
    BASE_HEADER, API_URL, API_USER_URL, CLIENT_ID, API_FOLLOW_BRAND,
    API_LIST_NOTIFY
} from './const'
import ApiUtils from './utils/ApiUtils'
import {NativeModules, Platform} from "react-native";

const ios = Platform.OS === 'ios';
const GGMAPKEY = ios && !!NativeModules.AppInfo.GG_MAP_KEY ? NativeModules.AppInfo.GG_MAP_KEY : 'AIzaSyBbWBHXAN4jmYhoZBuKFonHXMMOJJEDyog';

export function searchDeal(params) {
    const url = `${API_URL}/searchdeal?${params}`
    return ApiUtils.fetchData(url, {
        method: 'GET',
        headers: BASE_HEADER
    }).then(responseJson => {
        return responseJson.objects
    });
}

export function loginUser(access_token) {
    const url = `${API_USER_URL}/login/`
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
    return ApiUtils.fetchData(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody,
    }).then(responseJson => {
        console.log(responseJson);
        return responseJson
    });
}


export function followBrand(body, user) {
    const header = BASE_HEADER;
    if (user !== undefined && user !== null) {
        header.Authorization = user.token_type + ' ' + user.access_token;
    }
    return ApiUtils.fetchData(API_FOLLOW_BRAND, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    }).then(responseJson => {
        if (responseJson.objects !== undefined && responseJson.objects !== null) return responseJson.objects
        return responseJson
    });
}

export function getCouponDetail(couponId, user) {
    const url = `${API_URL}/coupon/${couponId}/`;
    const header = BASE_HEADER;
    if (user !== undefined && user !== null) {
        header.Authorization = user.token_type + ' ' + user.access_token;
    }
    return ApiUtils.fetchData(url, {
        method: 'GET',
        headers: header
    }).then(responseJson => {
        return responseJson
    })
}


//TODO: Need to change to JamJa server key here
//https://console.developers.google.com/apis/credentials?project=jamja-production
export function fetchAddressFromLatLong(lat, lon) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GGMAPKEY}`;
    console.log('fetchAddressFromLatLong: ', url);
    return ApiUtils.fetchData(url, {
        method: 'GET',
    }).then(responseJson => {
        return responseJson.results
    });
}


export function loginMerchant(email, password) {
    const url = `${API_URL}/merchantlogin/`
    return ApiUtils.fetchData(url, {
        method: 'POST',
        headers: {
            ...BASE_HEADER,
        },
        body: JSON.stringify({
            'email': email,
            'password': password,
            'client_id': CLIENT_ID
        }),
    }).then(responseJson => {
        return responseJson
    });
}

export function fetchManagerBrands(user) {
    const url = `${API_URL}/brandmanager/`
    return ApiUtils.fetchData(url, {
        method: 'GET',
        headers: {
            ...BASE_HEADER,
            'Authorization': `${user.token_type} ${user.access_token}`
        }
    }).then(responseJson => {
        return responseJson.objects
    });
}

export function fetchBrandStores(user, params) {
    const url = `${API_URL}/storemanager/?${params}`
    return ApiUtils.fetchData(url, {
        method: 'GET',
        headers: {
            ...BASE_HEADER,
            'Authorization': user.token_type + ' ' + user.access_token
        },
    }).then(responseJson => {
        return responseJson.objects
    });
}

export function fetchMerchantCoupon(user, params) {
    const url = `${API_URL}/merchantcoupon/?${params}`
    return ApiUtils.fetchData(url, {
        method: 'GET',
        headers: {
            ...BASE_HEADER,
            'Authorization': user.token_type + ' ' + user.access_token
        },
    }).then(responseJson => {
        return responseJson.objects
    });
}

export function acceptOrRejectBookingRequest(user, request_id, params) {
    const url = `${API_URL}/merchantcoupon/${request_id}/`
    return ApiUtils.fetchData(url, {
        method: 'PUT',
        headers: {
            ...BASE_HEADER,
            'Authorization': `${user.token_type} ${user.access_token}`
        },
        body: params,
    }).then(responseJson => {
        return responseJson
    });
}

export function checkCouponCodeForRedeem(user, coupon_code) {
    const url = `${API_URL}/redeemcoupon/${coupon_code}/`
    return ApiUtils.fetchData(url, {
        method: 'GET',
        headers: {
            ...BASE_HEADER,
            'Authorization': `${user.token_type} ${user.access_token}`
        }
    }).then(responseJson => {
        return responseJson
    });
}


export function getListNotify(params, user) {
    let url = `${API_LIST_NOTIFY}`;
    if (params !== null) {
        url += `?${params}`;
    }
    const header = BASE_HEADER;
    if (user !== undefined && user !== null) {
        header.Authorization = user.token_type + ' ' + user.access_token;
    }
    return ApiUtils.fetchData(url, {
        method: 'GET',
        headers: header
    }).then(responseJson => {
        return responseJson
    })
}


export function rateCoupon(user, id, body) {
    const url = `${API_URL}/redeemrate/${id}/`;
    const headers = {
        ...BASE_HEADER
    }
    if (user !== undefined && user !== null && user.access_token !== undefined) {
        headers.Authorization = `${user.token_type} ${user.access_token}`
    }
    return ApiUtils.fetchData(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    }).then(responseJson => {
        return responseJson
    });
}

export function updateUserProfile(user, params) {
    const url = `${API_URL}/updateuserprofile/`
    return ApiUtils.fetchData(url, {
        method: 'POST',
        headers: {
            ...BASE_HEADER,
            'Authorization': `${user.token_type} ${user.access_token}`
        },
        body: params,
    }).then(responseJson => {
        return responseJson
    });
}


/**
 * Deprecated
 * @type {{searchDeal: searchDeal, loginUser: loginUser, fetchAddressFromLatLong: fetchAddressFromLatLong, loginMerchant: loginMerchant, fetchManagerBrands: fetchManagerBrands, fetchBrandStores: fetchBrandStores, fetchMerchantCoupon: fetchMerchantCoupon, acceptOrRejectBookingRequest: acceptOrRejectBookingRequest, checkCouponCodeForRedeem: checkCouponCodeForRedeem, updateUserProfile: updateUserProfile}}
 */
export const Api = {
    searchDeal,
    loginUser,
    fetchAddressFromLatLong,
    loginMerchant,
    fetchManagerBrands,
    fetchBrandStores,
    fetchMerchantCoupon,
    acceptOrRejectBookingRequest,
    checkCouponCodeForRedeem,
    updateUserProfile,
};

