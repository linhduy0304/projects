export const FETCH_CURRENT_PROVINCE = "FETCH_CURRENT_PROVINCE";
export const PROVINCE_CHANGED = "PROVINCE_CHANGED";
export const LOCATION_CHANGED = "LOCATION_CHANGED";

export const FETCH_LOCATION_SUPPORT = 'FETCH_LOCATION_SUPPORT';
export const FETCH_LOCATION_SUPPORT_SUCCESS = 'FETCH_LOCATION_SUPPORT_SUCCESS';

export const fetchCurrentProvince = () => {
    return {
        type: FETCH_CURRENT_PROVINCE
    }
}

export const provinceChanged = (province) => {
    return {
        type: PROVINCE_CHANGED,
        province,
    }
}

export const locationChanged = (latitude, longitude) => {
    return {
        type: LOCATION_CHANGED,
        latitude,
        longitude
    }
}

export const fetchLocationSupportSuccess = (provinces) => {
    return {
        type: FETCH_LOCATION_SUPPORT_SUCCESS,
        provinces
    }
}

export const fetchLocationSupport = () => {
    return {
        type: FETCH_LOCATION_SUPPORT
    }
}