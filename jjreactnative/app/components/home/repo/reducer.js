import {fromJS} from 'immutable'
import {
    HOME_PAGE_SUBLIST,
    FETCH_EVENT_SUCCESS,
    UPDATE_CATEGORIES,
    UPDATE_USER_INFO,
    UPDATE_BANNER,
    UPDATE_EVENT_CONFIG,
    UPDATE_BRAND_DAY,
    FETCH_HOMEPAGES,
    FETCH_HOMEPAGES_SUCCESS, FETCH_HOMEPAGES_ERROR
} from './action';

const initState = fromJS({
    eCouponSubList: undefined,
    bookingSubList: undefined,
    events: undefined,
    categories: undefined,
    userInfo: undefined,
    banners: undefined,
    eventConfig: undefined,
    brandDayTheme: undefined,
    brandDayColor: undefined,
    brandDayData: undefined,
    homePageData: undefined,
    isHomePagesLoading: true,
    isHomePagesError: false
});

const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case HOME_PAGE_SUBLIST:
            return state.updateIn(['eCouponSubList'], () => action.eCouponSubList)
                .updateIn(['bookingSubList'], () => action.bookingSubList);

        case FETCH_EVENT_SUCCESS:
            return state.updateIn(['events'], () => fromJS(action.events));

        case FETCH_HOMEPAGES:
            return state.updateIn(['isHomePagesLoading'], () => true);

        case FETCH_HOMEPAGES_SUCCESS:
            return state.updateIn(['eCouponSubList'], () => action.eCouponSubList)
                .updateIn(['bookingSubList'], () => action.bookingSubList)
                .updateIn(['categories'], () => action.categories)
                .updateIn(['homePageData'], () => action.homePageData)
                .updateIn(['isHomePagesLoading'], () => false)
                .updateIn(['isHomePagesError'], () => false);

        case FETCH_HOMEPAGES_ERROR:
            return state.updateIn(['isHomePagesLoading'], () => false)
                .updateIn(['isHomePagesError'], () => true);

        case UPDATE_CATEGORIES:
            return state.updateIn(['categories'], () => action.categories);

        case UPDATE_USER_INFO:
            return state.updateIn(['userInfo'], () => !!action.userInfo && fromJS(action.userInfo) || undefined);

        case UPDATE_BANNER:
            return state.updateIn(['banners'], () => action.banners);

        case UPDATE_EVENT_CONFIG:
            return state.updateIn(['eventConfig'], () => action.eventConfig);

        case UPDATE_BRAND_DAY:
            return state.updateIn(['brandDayTheme'], () => action.brandDayTheme)
                .updateIn(['brandDayData'], () => action.brandDayData)
                .updateIn(['brandDayColor'], () => action.brandDayColor);
        default:
            return state;
    }
}

export default homeReducer;