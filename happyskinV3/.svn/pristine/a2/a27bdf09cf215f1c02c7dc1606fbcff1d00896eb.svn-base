'use strict';
const {Record} = require('immutable');
const {
  REGISTER
  } = require('../../libs/actionTypes');
var InitialState = Record({
  state: REGISTER,
  disabled: false,
  isError: false,
  isErrorEmail: false,
  error: null,
  isValid: false,
  isFetching: false,
  disable: false,
  swipeToClose: true,
  sliderValue: 0.3,
  fields: new (Record({
    username: '',
    usernameHasError: false,
    password: '',
    passwordHasError: false,
    email: '',
    emailHasError: false,
    confirmPassword: '',
    confirmPasswordHasError: false
  }))
});

export default InitialState;

