import {
    FETCH_EXCLUSIVE_DEALS,
    FETCH_EXCLUSIVE_DEALS_SUCCESS,
    FETCH_EXCLUSIVE_DEALS_FAIL,
} from './action';

const initState = {
    deals: [],
}

const exclusiveDealsReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_EXCLUSIVE_DEALS_SUCCESS:
            return {
                ...state,
                deals: action.deals,
            }
        case FETCH_EXCLUSIVE_DEALS_FAIL:
            return {
                ...state,
                deals: [],
            }
        default:
            return state;
    }
}

export default exclusiveDealsReducer;