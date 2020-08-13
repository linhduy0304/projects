import {
    RATE_COUPON
} from './action';

const initState = {
}

const rateCouponReducer = (state = initState, action) => {
    switch (action.type) {
        case RATE_COUPON:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default rateCouponReducer;