import {fromJS} from 'immutable'
import {} from "./action";

const initState = fromJS({});

const configReducer = (state = initState, action) => {

    // switch (action.type) {
    //     case UPDATE_POPOVER_BOOKING_CHANGE_DATE_BUTTON_CONFIG:
    //         return state.updateIn(['popover_booking_change_date_button_has_showed'], () => action.hasShow);
    //     default:
    //         return state;
    // }

    return initState;
};

export default configReducer;