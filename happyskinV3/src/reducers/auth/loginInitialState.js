/**
 * # authInitialState.js
 * 
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';
/**
 * ## Import
 */
const {Record} = require('immutable');
const {
  LOGIN
} = require('../../libs/actionTypes');

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
var InitialState = Record({
  state: LOGIN,
  disabled: false,
  isError: false,
  isErrorEmail: false,
  error: '',
  isValid: false,
  isFetching: false,
  isModalOpen: false,
  disable: false,
  swipeToClose: true,
  sliderValue: 0.3,
  invalidToken: 0,//0: ko loi, 1: fb loi, 2: google loi
  fields: new (Record({
    username: '',
    usernameHasError: false,
    password: '',
    passwordHasError: false,
    email: '',
    emailHasError: false
  }))
});

export default InitialState;

