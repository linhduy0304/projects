export const FETCH_KEY_WORD_SEARCH_DEAL_HISTORY = "FETCH_KEY_WORD_SEARCH_DEAL_HISTORY";
export const FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_SUCCESS = "FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_SUCCESS";
export const FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_FAIL = "FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_FAIL";

export const ADD_KEY_WORD_SEARCH_DEAL = "ADD_KEY_WORD_SEARCH_DEAL";
export const ADD_KEY_WORD_SEARCH_DEAL_SUCCESS = "ADD_KEY_WORD_SEARCH_DEAL_SUCCESS";

export const REMOVE_KEY_WORD_SEARCH_DEAL = "REMOVE_KEY_WORD_SEARCH_DEAL";
export const REMOVE_KEY_WORD_SEARCH_DEAL_SUCCESS = "REMOVE_KEY_WORD_SEARCH_DEAL_SUCCESS";


//fetchKeywordSearchDealHistory
export const fetchKeywordSearchDealHistory = () => {
    console.log('fetchKeywordSearchDealHistory:action');
    return {
        type: FETCH_KEY_WORD_SEARCH_DEAL_HISTORY
    }
}

export const fetchKeywordSearchDealHistorySuccess = (histories) => {
    return {
        type: FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_SUCCESS,
        histories
    }
}

export const fetchKeywordSearchDealHistoryError = (error) => {
    return {
        type: FETCH_KEY_WORD_SEARCH_DEAL_HISTORY_FAIL,
        error
    }
}


//addKeywordSearchDeal
export const addKeywordSearchDeal = (keyword) => {
    return {
        type: ADD_KEY_WORD_SEARCH_DEAL,
        keyword
    }
}

export const addKeywordSearchDealSuccess = (histories) => {
    return {
        type: ADD_KEY_WORD_SEARCH_DEAL_SUCCESS,
        histories
    }
}

//removeKeywordSearchDeal
export const removeKeywordSearchDeal = (keyword, deleteAll) => {
    return {
        type: REMOVE_KEY_WORD_SEARCH_DEAL,
        keyword,
        deleteAll
    }
}

export const removeKeywordSearchDealSuccess = (histories) => {
    return {
        type: REMOVE_KEY_WORD_SEARCH_DEAL_SUCCESS,
        histories
    }
}
