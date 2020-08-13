import {
    FETCH_BRAND_INFO_SUCCESS,
    FETCH_BRAND_INFO_FAIL,
    //Follow a brand
    FOLLOW_A_BRAND_SUCCESS,
    FOLLOW_A_BRAND_FAIL,
} from './action';

const initState = {
    brandid: '',
    isLoading: true,
    isSuccess: false,
    isFail: false,
    brand: {},
    //Follow a brand
    isFollowSuccess: false,
    isFollowFail: false,
    isFollowing: false,
}

const brandInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_BRAND_INFO_SUCCESS:
            return {
                ...state,
                brandid: action.brand ? action.brand.id:'',
                brand: action.brand,
                isFollowing: action.brand.following,
                isLoading: false,
                isSuccess: true,
                isFail: false,
            }
        case FETCH_BRAND_INFO_FAIL:
            return {
                ...state,
                brandid: action.brandid,
                brand: {},
                isLoading: false,
                isSuccess: false,
                isFail: true,
            }
        //Follow a brand
        case FOLLOW_A_BRAND_SUCCESS:
            return {
                ...state,
                brandid: action.brand.id,
                brand: { ...state.brand, follower: action.brand.follower, following: action.brand.following, following_count: action.brand.following_count },
                isFollowSuccess: true,
                isFollowFail: false,
                isFollowing: action.isFollowing,
            }
        case FOLLOW_A_BRAND_FAIL:
            return {
                ...state,
                brandid: action.brandid,
                isFollowSuccess: false,
                isFollowFail: true,
            }
        default:
            return state;
    }
}

export default brandInfoReducer;