import { call, put, take } from "redux-saga/effects";
import {
    FETCH_BRAND_INFO,
    fetchBrandInfoSuccess,
    fetchBrandInfoError,
    //Follow a brand
    FOLLOW_A_BRAND,
    followBrandSuccess,
    followBrandError,
} from './action';
import {brandApi} from '../../../api/brand-api'


//Fetch schedule booking
function* fetchBrandInfo(user, brandid) {
    try {
        const brand = yield brandApi.getBrandDetail(brandid);
        yield put(fetchBrandInfoSuccess(brand));
    } catch (error) {
        console.log(error)
        yield put(fetchBrandInfoError(error, brandid));
    }
}

export function* watchFetchBrandInfo() {
    while (true) {
        const { user, brandid } = yield take(FETCH_BRAND_INFO);
        yield call(fetchBrandInfo, user, brandid);
    }
}

//Follow a brand
function* followBrand(user, brandid) {
    try {
        const result = yield brandApi.follow(brandid);
        console.log(result)
        if (!result.hasOwnProperty('error_message')) {
            yield put(followBrandSuccess(result.brand, result.status));
        } else {
            yield put(followBrandError(result.error_message, brandid));
        }
    } catch (error) {
        console.log(error)
        yield put(followBrandError(error, brandid));
    }
}

export function* watchFollowBrand() {
    while (true) {
        const { user, brandid } = yield take(FOLLOW_A_BRAND);
        yield call(followBrand, user, brandid);
    }
}