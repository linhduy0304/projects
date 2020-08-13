import { call, put, take } from "redux-saga/effects";
import {
    FETCH_EXCLUSIVE_DEALS,
    fetchExclusiveDealsSuccess,
    fetchExclusiveDealsError
} from './action';
import {dealApi} from '../../../api/deal-api'

function* fetchExclusiveDeals(params) {
    try {
        const deals = yield dealApi.getDealList(params);
        if (deals === undefined) {
            yield put(fetchExclusiveDealsError(""));
        } else {
            yield put(fetchExclusiveDealsSuccess(deals));
        }
    } catch (error) {
        console.log(error)
        yield put(fetchExclusiveDealsError(error));
    }
}

export function* watchFetchExclusiveDeals() {
    while (true) {
        const { params } = yield take(FETCH_EXCLUSIVE_DEALS)
        yield call(fetchExclusiveDeals, params);
    }
}
