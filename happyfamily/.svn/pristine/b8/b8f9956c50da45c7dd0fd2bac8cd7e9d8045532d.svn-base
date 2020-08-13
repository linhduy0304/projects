
'use strict';

const InitialState = require('./state').default;

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHECK_LOGIN_REQUEST,
  CHECK_LOGIN_SUCCESS,
  FORGOT_PASS_REQUEST,
  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_FAIL,
  } = require('../../config/actionTypes');

const initialState = new InitialState;

export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    case FORGOT_PASS_REQUEST: 
      return state.setIn(['loading'], true);

    case FORGOT_PASS_SUCCESS: 
      return state.setIn(['loading'], false);

    case FORGOT_PASS_FAIL: 
      return state.setIn(['loading'], false);

      //
    case LOGIN_REQUEST: 
      return state.setIn(['loading'], true);

    case LOGIN_SUCCESS: 
      return state.setIn(['loading'], false);

    case LOGIN_FAIL: 
      return state.setIn(['loading'], false).setIn(['error'], action.error);

    case REGISTER_REQUEST: 
      return state.setIn(['loading'], true);

    case REGISTER_SUCCESS: 
      return state.setIn(['loading'], false);

    case REGISTER_FAIL: 
      return state.setIn(['loading'], false);
  }
 
  return state;
}
