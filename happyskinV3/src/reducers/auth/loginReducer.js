/**
 * # authReducer.js
 * 
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('./loginInitialState').default;

/**
 * ## Auth actions
 */
const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ON_LOGIN_FORM_FIELD_CHANGE,
  CHECK_LOGIN_REQUEST,
  CHECK_LOGIN_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  LOGIN_SOCIAL_FAILURE,
} = require('../../libs/actionTypes');

//const fieldValidation = require('../../libs/fieldValidation');
//const formValidation = require('../test/testFormValidation');

const initialState = new InitialState;
/**
 * ## authReducer function
 * @param {Object} state - initialState 
 * @param {Object} action - type and payload
 */
export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    case LOGIN_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
      let nextState =  state.setIn(['disable'], true)
        .setIn(['isFetching'], true)
        .setIn(['isError'],false)
        .setIn(['error'], '')
        .setIn(['invalidToken'],0);
      return nextState;

    case LOGIN_SUCCESS:
    case CHECK_LOGIN_SUCCESS:
      let succeState =
        state.setIn(['isFetching'], false)
        .setIn(['isError'],false)
        .setIn(['disable'], false);
      return succeState;

    case FORGOT_PASSWORD_SUCCESS:
      let forgotPasswordState =
        state.setIn(['isFetching'], false)
          .setIn(['isError'],false)
          .setIn(['isErrorEmail'],false)
          .setIn(['fields', 'email'], '')
          .setIn(['disable'], false);
      return forgotPasswordState;

    case LOGIN_FAILURE:
      let failState =  state.setIn(['isFetching'], false)
        .setIn(['isError'],true)
        .setIn(['error'],action.error)
        .setIn(['disable'], false);
      return failState;

    case LOGIN_SOCIAL_FAILURE:
      let socialFailState =  state.setIn(['isFetching'], false)
        .setIn(['isError'],true)
        .setIn(['error'],action.errors)
        .setIn(['disable'], false)
        .setIn(['invalidToken'], action.code);
      return socialFailState;

    case FORGOT_PASSWORD_FAILURE:
      let forgotPasswordFalse =  state.setIn(['isFetching'], false)
        .setIn(['isErrorEmail'],true)
        .setIn(['error'],action.error)
        .setIn(['disable'], false);
      return forgotPasswordFalse;

    case ON_LOGIN_FORM_FIELD_CHANGE: {
        const {field, value} = action.payload;
        let nextState =
          state.setIn(['fields', field], value)
          .setIn(['isError'],false)
          .setIn(['isErrorEmail'],false);

        //fix state
        //check validate
        var finalState = nextState.setIn(['isValid'],false);
        return finalState;
      }
    case CHECK_LOGIN_REQUEST: 
      let checkLoginState =  state.setIn(['disable'], true).setIn(['isFetching'], true);
      return checkLoginState;
  }
  /**
   * ## Default
   */
  return state;
}
