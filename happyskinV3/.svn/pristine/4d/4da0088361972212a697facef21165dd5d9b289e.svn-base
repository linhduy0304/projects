import React from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  StatusBar, Navigator, Image,NavigatorIOS,
  Switch,
  TouchableHighlight,
} from "react-native";

var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
let Constant = require('./Constant');
let HTTP = require('./HTTP');
let URL = require('./URL');

import {Actions} from "react-native-router-flux";

export function submitLogin(username, password) {
   var b = new buffer.Buffer(username + ':' + password);
   const auth = 'Basic ' + b.toString('base64');
   var header = {
     'Authorization': auth
   };
   //AsyncStorage.setItem(Constant.HS_Authorization, auth);
  return HTTP.getHasHeader(URL.profile, header);

}

export function submitRegister(username, email, password, confirmPassword) {
  let body = {
    username: username,
    email: email,
    password: password,
    password_confirmation :confirmPassword
  };
  return HTTP.post(URL.register, body);
}

export function submitForgotPassword(email) {
  var body = {
    email: email
  };
  return HTTP.post(URL.forgotPassword, body);
}

export function getAuth() {
  return AsyncStorage.getItem(Constant.HS_DATA_USER);
}
export function setAuth(dataUser) {
  return AsyncStorage.setItem(Constant.HS_DATA_USER,JSON.stringify(dataUser));
}

export function loginFacebook(token) {
  var header = {
     'Fbtoken': token
   };
  return HTTP.getHasHeader(URL.profile, header);
}

export function loginGoogle(token) {
  var header = {
     'Gotoken': token
   };
  return HTTP.getHasHeader(URL.profile, header);
}

export function checkLogin(header) {
  return HTTP.getHasHeader(URL.profile, header);
}
