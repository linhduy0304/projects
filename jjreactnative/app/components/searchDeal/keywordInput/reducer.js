import {
    FETCH_KEY_WORD_SEARCH_DEAL_HISTORY,
    FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_SUCCESS,
    FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_FAIL,
    ADD_KEY_WORD_SEARCH_DEAL,
    ADD_KEY_WORD_SEARCH_DEAL_SUCCESS,
    REMOVE_KEY_WORD_SEARCH_DEAL,
    REMOVE_KEY_WORD_SEARCH_DEAL_SUCCESS,
} from './action';

const initState = {
    histories: [],
}

const keywordSearchDealHistoryReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_KEY_WORD_SEARCH_DEAL_HISTORY:
        case ADD_KEY_WORD_SEARCH_DEAL:
        case REMOVE_KEY_WORD_SEARCH_DEAL:
            return {
                ...state
            }
        case ADD_KEY_WORD_SEARCH_DEAL_SUCCESS:
        case REMOVE_KEY_WORD_SEARCH_DEAL_SUCCESS:
        case FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_SUCCESS:
            return {
                ...state,
                histories: action.histories
            }
        case FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return {
                ...state
            };
    }
}

export default keywordSearchDealHistoryReducer;