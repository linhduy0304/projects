import React from 'react';
import {Actions} from "react-native-router-flux";

var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
let Constant = require('./Constant');
let HTTP = require('./HTTP');
let URL = require('./URL');

//push noti
export function pushNoti(token, deviceType) {
  var body = {
    deviceToken: token,
    deviceType: deviceType
  }
  return HTTP.postWithAuth(URL.noti, body);
}
//forgotPass
export function forgotPass(email) {
  var body = {
    email: email
   };
  return HTTP.post(URL.user+'/forgetPassword', body);
}

//login facebook
export function loginFacebook(token) {
  var header = {
     'Fbtoken': token
   };
  return HTTP.getHasHeader(URL.user+'/profile', header);
}

//check Login
export function checkLogin(header) {
  return HTTP.getHasHeader(URL.user+'/profile', header);
}

//login
export function submitLogin(username, password) {
   var b = new buffer.Buffer(username + ':' + password);
   const auth = 'Basic ' + b.toString('base64');
   var header = {
     'Authorization': auth
   };
   //AsyncStorage.setItem(Constant.HS_Authorization, auth);
  return HTTP.getHasHeader(URL.user+'/profile', header);

}

export function submitRegister(body) {
  return HTTP.post(URL.user, body);
}
