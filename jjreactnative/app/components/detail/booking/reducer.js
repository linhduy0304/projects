import {
    COUPON_DATA_CHANGE,
} from './action';

import {fromJS} from 'immutable'
import {STATUS_REDEEMED, STATUS_USER_CANCEL, STATUS_MERCHANT_CANCEL, STATUS_MERCHANT_REJECT} from "../../../const";
import {CouponDb} from '../../../api/storage/CouponDb'

const initState = fromJS({
    did: '',
    coupon: {}
})

const couponDataChangeReducer = (state = initState, action) => {
    switch (action.type) {
        case COUPON_DATA_CHANGE:
            console.log('_______COUPON_DATA_CHANGE', action.did, action.coupon ? action.coupon.toJS() : '');

            try {
                const status = action.coupon.get('status');
                if (status === STATUS_REDEEMED ||
                    status === STATUS_USER_CANCEL ||
                    status === STATUS_MERCHANT_CANCEL ||
                    status === STATUS_MERCHANT_REJECT) {
                    CouponDb.remove(action.coupon.get('id'));
                }
            } catch (e) {
                console.log(e);
            }

            return state
                .updateIn(['did'], () => action.did)
                .updateIn(['coupon'], () => action.coupon);
        default:
            return initState;
    }
}

export default couponDataChangeReducer;