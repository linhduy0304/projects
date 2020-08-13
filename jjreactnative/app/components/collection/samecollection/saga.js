import { call, put, take } from "redux-saga/effects";
import {
    FETCH_COLLECTION,
    fetchCollectionSuccess,
    fetchCollectionError,
} from './action';
import {collectionApi} from '../../../api/collection-api'


function* fetchCollections(user, dslug) {
    try {
        const response = yield collectionApi.getCollectionListByDealSlug(dslug, 0, 20);
        const collections = response.objects;
        yield put(fetchCollectionSuccess(dslug, collections));
    } catch (error) {
        console.log(error)
        yield put(fetchCollectionError(error, dslug));
    }
}

export function* watchFetchCollection() {
    while (true) {
        const { user, dslug } = yield take(FETCH_COLLECTION);
        yield call(fetchCollections, user, dslug);
    }
}