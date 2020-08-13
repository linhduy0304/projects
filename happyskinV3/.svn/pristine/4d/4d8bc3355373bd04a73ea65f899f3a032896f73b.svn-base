'use strict';
const {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  ON_REGISTER_FORM_FIELD_CHANGE
  } = require('../libs/actionTypes');

import Constant from '../services/Constant';
var buffer = require('buffer');
const StoreService = require('../services/StoreService').default;

const AuthService = require('../services/Auth');

import {Actions} from 'react-native-router-flux';

export function registerRequest() {
  return {
    type: REGISTER_REQUEST
  };
}

export function registerSuccess() {
  return {
    type: REGISTER_SUCCESS
  };
}
export function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    error: error
  };
}

export function onAuthFormFieldChange(field,value) {
  return {
    type: ON_REGISTER_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}

export function submitRegister(dataUser) {
  return dispatch => {
    dispatch(registerRequest());
    return AuthService.submitRegister(dataUser.username, dataUser.email, dataUser.password, dataUser.confirmPassword)
      .then(function (res) {
        switch(res.status) {
          case 200:
            var b = new buffer.Buffer(dataUser.username + ':' + dataUser.password);
            var auth = 'Basic ' + b.toString('base64');
            var headers = {
              'Authorization': auth,
              'Fbtoken': '',
              'Gotoken': '',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            };
            new StoreService().storeSession(Constant.HS_HEADER_REQUEST, headers);
            new StoreService().storeSession(Constant.HS_IS_LOGIN, true);
            dispatch(registerSuccess());
            Actions.homeNew({'type': 'reset'});
            return;
          case 500: 
            Actions.login({type: 'reset'});
            return;
          default:
            dispatch(registerFailure(res.errors));  
            return;
        }
      })
      .catch((error) => {
        dispatch(registerFailure(error));
      });
  };
}

