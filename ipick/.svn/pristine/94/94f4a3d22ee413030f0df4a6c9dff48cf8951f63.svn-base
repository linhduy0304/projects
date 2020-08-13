
'use strict';

const InitialState = require('./authInitialState').default;

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
  } = require('../../libs/actionTypes');

const initialState = new InitialState;

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    //forgot
    case FORGOT_PASS_REQUEST: 
      return state.setIn(['isFetching'], true);

    case FORGOT_PASS_SUCCESS: 
      return state.setIn(['isFetching'], false);

    case FORGOT_PASS_FAIL: 
      return state.setIn(['isFetching'], false);

      //
    case LOGIN_REQUEST: 
      return state.setIn(['isFetching'], true);

    case LOGIN_SUCCESS: 
      return state.setIn(['isFetching'], false);

    case LOGIN_FAIL: 
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);

    case REGISTER_REQUEST: 
      return state.setIn(['isFetching'], true);

    case REGISTER_SUCCESS: 
      return state.setIn(['isFetching'], false);

    case REGISTER_FAIL: 
      return state.setIn(['isFetching'], false);
  }
 
  return state;
}
