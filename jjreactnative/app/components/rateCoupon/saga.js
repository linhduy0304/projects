import { call, put, take } from "redux-saga/effects";

import {
    RATE_COUPON
} from './action';
import {couponApi} from '../../api/coupon-api'

function* rateCoupon(rateId, rateValue, rateComment) {
    try {
        const data = {
            action: 'rate',
            rate_value: '' + rateValue,
            rate_comment: rateComment
        };

        const response = yield couponApi.rateCoupon(rateId, data);
        console.log('rateCoupon', data, response)
    } catch (error) {
        console.log(error)
    }
}

export function* watchRateCoupon() {
    while (true) {
        const { rateId, rateValue, rateComment } = yield take(RATE_COUPON);
        yield call(rateCoupon, rateId, rateValue, rateComment);
    }
}