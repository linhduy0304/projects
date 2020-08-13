
'use strict';

const InitialState = require('./state').default;
  
const {
  PROFILE_SUCCESS,
  FEED_BACK_REQUEST,
  FEED_BACK_SUCCESS,
  FEED_BACK_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL
  } = require('../../config/actionTypes');

const initialState = new InitialState;

export default function reducer(state = initialState, action) {

  switch (action.type) {

        //update Profile
      case UPDATE_PROFILE_REQUEST:
      case SEARCH_USER_REQUEST:
        return state.setIn(['loading'], true);

      case UPDATE_PROFILE_SUCCESS:
        return state.setIn(['loading'], null).removeIn(['currentUser']).setIn(['currentUser'], action.data);

      case UPDATE_PROFILE_FAIL:
      case SEARCH_USER_FAIL:
        return state.setIn(['loading'], null);

      case SEARCH_USER_SUCCESS:
        return state.setIn(['loading'], null).setIn(['dataSearch'], action.data);

      //feedback
      case FEED_BACK_REQUEST:
        return state.setIn(['loading'], true);

      case FEED_BACK_SUCCESS:
        return state.setIn(['loading'], null);

      case FEED_BACK_FAIL:
        return state.setIn(['loading'], null);
      //creategorup
      case PROFILE_SUCCESS: 
        return state.setIn(['currentUser'], action.data);


  }
 
  return state;
}
