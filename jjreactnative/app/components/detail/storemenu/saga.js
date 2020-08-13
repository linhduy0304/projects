import { call, put, take } from "redux-saga/effects";
import {
    FETCH_STORE_INFO,
    fetchStoreInfoSuccess,
    fetchStoreInfoError,
} from './action';
import {storeApi} from '../../../api/store-api'


function* fetchStoreInfo(store_id) {
    try {
        const result = yield storeApi.getStoreDetail(store_id);
        yield put(fetchStoreInfoSuccess(result));
    } catch (error) {
        console.log(error)
        yield put(fetchStoreInfoError(error, store_id));
    }
}

export function* watchFetchStoreInfo() {
    while (true) {
        const { store_id } = yield take(FETCH_STORE_INFO);
        yield call(fetchStoreInfo, store_id);
    }
}