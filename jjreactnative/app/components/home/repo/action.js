export const FETCH_EVENT = "FETCH_EVENT";
export const FETCH_EVENT_SUCCESS = "FETCH_EVENT_SUCCESS";

export const FETCH_HOMEPAGES = "FETCH_HOMEPAGES";
export const FETCH_HOMEPAGES_SUCCESS = "FETCH_HOMEPAGES_SUCCESS";
export const FETCH_HOMEPAGES_ERROR = "FETCH_HOMEPAGES_ERROR";

export const HOME_PAGE_SUBLIST = "HOME_PAGE_SUBLIST";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const FETCH_USER_INFO = "FETCH_USER_INFO";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const FETCH_BANNER = "FETCH_BANNER";
export const UPDATE_BANNER = "UPDATE_BANNER";
export const UPDATE_EVENT_CONFIG = "UPDATE_EVENT_CONFIG";
export const UPDATE_BRAND_DAY = "UPDATE_BRAND_DAY";

export const fetchEvent = () => {
    return {
        type: FETCH_EVENT
    }
}

export const fetchEventSuccess = (events) => {
    return {
        type: FETCH_EVENT_SUCCESS,
        events: events
    }
}

export const fetchHomePages = () => {
    return {
        type: FETCH_HOMEPAGES
    }
}

export const fetchHomePagesSuccess = (categories, eCouponSubList, bookingSubList, homePageData) => {
    return {
        type: FETCH_HOMEPAGES_SUCCESS,
        categories,
        eCouponSubList,
        bookingSubList,
        homePageData
    }
}

export const fetchHomePagesError = () => {
    return {
        type: FETCH_HOMEPAGES_ERROR
    }
}

export const fetchUserInfoAction = () => {
    return {
        type: FETCH_USER_INFO
    }
}

export const updateUserInfoAction = (userInfo) => {
    return {
        type: UPDATE_USER_INFO,
        userInfo
    }
}

export const fetchBanner = () => {
    return {
        type: FETCH_BANNER
    }
}

export const updateBanner = (banners) => {
    return {
        type: UPDATE_BANNER,
        banners
    }
}

export const updateEventConfig = (eventConfig) => {
    return {
        type: UPDATE_EVENT_CONFIG,
        eventConfig
    }
}

export const updateBrandDay = (brandDayData, brandDayTheme, brandDayColor) => {
    return {
        type: UPDATE_BRAND_DAY,
        brandDayData,
        brandDayTheme,
        brandDayColor
    }
}