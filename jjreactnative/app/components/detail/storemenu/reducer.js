import {
    FETCH_STORE_INFO,
    FETCH_STORE_INFO_SUCCESS,
    FETCH_STORE_INFO_FAIL,
} from './action';

const initState = {
    store_id: '',
    isLoading: true,
    isSuccess: false,
    isFail: false,
    menu_images: [],
}

const storeInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_STORE_INFO:
            return {
                ...state,
                store_id: action.store_id,
                isLoading: true,
                isSuccess: false,
                isFail: false,
            }
        case FETCH_STORE_INFO_SUCCESS:
            return {
                ...state,
                store_id: action.store.id,
                menu_images: action.store.menu_images,
                isLoading: false,
                isSuccess: true,
                isFail: false,
            }
        case FETCH_STORE_INFO_FAIL:
            return {
                ...state,
                store_id: action.store_id,
                menu_images: [],
                isLoading: false,
                isSuccess: false,
                isFail: true,
            }
        default:
            return state;
    }
}

export default storeInfoReducer;