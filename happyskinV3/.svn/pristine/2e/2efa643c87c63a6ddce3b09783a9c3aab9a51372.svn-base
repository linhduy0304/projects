
'use strict';
const InitialState = require('./homeInitialState').default;

const {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,
  UPDATE_SKINDIARY,
  ADD_SKINDIARY,
  HOT_DEAL_REQUEST,
  HOT_DEAL_SUCCESS,
  HOT_DEAL_FAIL,
  SAVE_ROUTINE_HOME,
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAIL,
  SPA_HISTORY_SUCCESS
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function homeReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

    case SPA_HISTORY_SUCCESS:
      return state.setIn(['spaHistory'], action.data)
                  .setIn(['isFetching'], false)
    //
    case BOOKING_REQUEST:
      return state.setIn(['loadBooking'], true);
    
    case BOOKING_SUCCESS:
      return state.setIn(['loadBooking'], null);
    
    case BOOKING_FAIL: 
      return state.setIn(['loadBooking'], null)

    case SAVE_ROUTINE_HOME:
      var home = state.getIn(['home']);
      home.routine_joining.map((routine, index) => {
        if(routine.routine.id == action.id) {
          routine.routine = action.routine
        }
      })
      return state.setIn(['home'], home);

    //hotdeal
    case HOT_DEAL_SUCCESS:
      return state.setIn(['hotDeal'], action.data);
    
    case UPDATE_SKINDIARY:
      var home = state.getIn(['home']);
      var b = home.skindiary.filter(aa =>aa.id != action.id)
      home.skindiary = b;
      return state.removeIn(['home']).setIn(['home'], home);
    
    case ADD_SKINDIARY: 
      var home = state.getIn(['home']);
      home.skindiary.unshift(action.data);
      return state.removeIn(['home']).setIn(['home'], home);

    case HOME_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case HOME_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['home'], action.data);
    
    case HOME_FAIL: 
      return state.setIn(['isFetching'], false)
  }
  return state;
}
