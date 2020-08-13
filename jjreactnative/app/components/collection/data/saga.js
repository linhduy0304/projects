import { call, put, take, all } from "redux-saga/effects";
import {
    SAVE_COLLECTION,
    updateSaveCollectionStatus
} from './action';
import {collectionApi} from "../../../api/collection-api";

function* saveCollection(slug, is_save, save_count) {
    try {
        if (is_save) {
            yield put(updateSaveCollectionStatus(slug, false, save_count <= 0 ? 0 : save_count - 1));
        }
        else {
            yield put(updateSaveCollectionStatus(slug, true, save_count + 1));
        }

        let result = yield all(collectionApi.saveCollection(slug));
        if (!result || !!result.error || !!result.error_message) {
            yield put(updateSaveCollectionStatus(slug, is_save, save_count));
        }
    } catch (error) {
        console.log('save_collection:error', error);

        yield put(updateSaveCollectionStatus(slug, is_save, save_count));
    }
}

export function* watchSaveCollection() {
    while (true) {
        const { slug, is_save, save_count } = yield take(SAVE_COLLECTION);
        yield call(saveCollection,slug, is_save, save_count);
    }
}