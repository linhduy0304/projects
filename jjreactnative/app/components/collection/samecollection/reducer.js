import {
    FETCH_COLLECTION,
    FETCH_COLLECTION_SUCCESS,
    FETCH_COLLECTION_FAIL,
} from './action';

const initState = {
    dslug: '',
    isLoading: true,
    isSuccess: false,
    isFail: false,
    collections: [],
}

const sameCollectionReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_COLLECTION:
            return {
                ...state,
                dslug: action.dslug,
                isLoading: true,
                isSuccess: false,
                isFail: false,
            }
        case FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                dslug: action.dslug,
                collections: action.collections,
                isLoading: false,
                isSuccess: true,
                isFail: false,
            }
        case FETCH_COLLECTION_FAIL:
            return {
                ...state,
                dslug: action.dslug,
                isLoading: false,
                isSuccess: false,
                isFail: true,
            }
        default:
            return state;
    }
}

export default sameCollectionReducer;