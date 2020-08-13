import {
    TOGGLE_MENU,
} from './action';

const initState = {
    isOpen: false,
}

const hamburgerReducer = (state = initState, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                isOpen: !this.state.isOpen,
            }
        default:
            return state;
    }
}

export default hamburgerReducer;