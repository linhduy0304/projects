import { call, put, take } from "redux-saga/effects";
import {
    FETCH_KEY_WORD_SEARCH_DEAL_HISTORY,
    fetchKeywordSearchDealHistorySuccess,
    fetchKeywordSearchDealHistoryError,
    ADD_KEY_WORD_SEARCH_DEAL,
    addKeywordSearchDealSuccess,
    REMOVE_KEY_WORD_SEARCH_DEAL,
    removeKeywordSearchDealSuccess,
} from './action';
import {fetchHistory, addKeyword, removeKeyword} from '../../../model/repository/SearchDealKeywordRepository'
import {StringUtil} from '../../../utils/string-util'

/**
 * fetchKeywordSearchDealHistory
 */
function* fetchKeywordSearchDealHistory() {
    try {
        const histories = yield fetchHistory();

        yield put(fetchKeywordSearchDealHistorySuccess(histories));
    } catch (error) {
        console.log('fetchKeywordSearchDealHistory:error', error)
        yield put(fetchKeywordSearchDealHistoryError(error));
    }
}

export function* watchKeywordSearchDeal() {
    while (true) {
        const { a } = yield take(FETCH_KEY_WORD_SEARCH_DEAL_HISTORY);
        yield call(fetchKeywordSearchDealHistory, a);
    }
}


/**
 * addKeywordSearchDeal
 * @param keyword
 */
function* addKeywordSearchDeal(keyword) {
    try {

        if (!keyword) return;
        const k = keyword.trim();

        if (StringUtil.isEmpty(k)) return;

        const histories = yield addKeyword(k);

        yield put(addKeywordSearchDealSuccess(histories));
    } catch (error) {
        console.log(error)
    }
}

export function* watchAddKeywordSearchDeal() {
    while (true) {
        const { keyword } = yield take(ADD_KEY_WORD_SEARCH_DEAL);
        yield call(addKeywordSearchDeal, keyword);
    }
}


/**
 * removeKeywordSearchDeal
 * @param keyword
 * @param deleteAll
 */
function* removeKeywordSearchDeal(keyword, deleteAll) {
    try {
        const histories = yield removeKeyword(keyword, deleteAll)

        yield put(removeKeywordSearchDealSuccess(histories));
    } catch (error) {
        console.log(error)
    }
}

export function* watchRemoveKeywordSearchDeal() {
    while (true) {
        const { keyword, deleteAll } = yield take(REMOVE_KEY_WORD_SEARCH_DEAL);
        yield call(removeKeywordSearchDeal, keyword, deleteAll);
    }
}