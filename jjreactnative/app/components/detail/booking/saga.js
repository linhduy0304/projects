import { call, put, take } from "redux-saga/effects";
import {
    COUPON_DATA_CHANGE,
} from './action';
// import { setCouponAlarm, removeCouponAlarm } from '../../common/notification/action'
// import {STATUS_MERCHANT_ACCEPTED} from "../../../const";


function* handleCouponDataChanged(did, coupon) {
    try {
        console.log('handleCouponDataChanged', did, coupon)
        // if (STATUS_MERCHANT_ACCEPTED === coupon.get('status')) {
        //     yield put(setCouponAlarm(coupon))
        // } else {
        //     yield put(removeCouponAlarm(coupon))
        // }
    } catch (error) {
        console.log(error)
    }
}

export function* watchCouponDataChanged() {
    while (true) {
        const { did, coupon } = yield take(COUPON_DATA_CHANGE);
        yield call(handleCouponDataChanged, did, coupon)
    }
}