import {
    SET_CURRENT_DEAL_TO_SHARE,
} from './action';

const initState = {
    deal: undefined
}

const buttonShareReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_DEAL_TO_SHARE:
            return {
                ...state,
                deal: action.deal,
            }
        default:
            return state;
    }
}

export default buttonShareReducer;