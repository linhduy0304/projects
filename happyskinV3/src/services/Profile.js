import React from 'react';
import {
  View, Text, 
} from "react-native";
let HTTP = require('./HTTP');
let URL = require('./URL');

//otherProfile
export function otherProfile(id){
  return HTTP.get(URL.profile+'?user_id='+id);
}

//edit profile
export function editProfile(dataUser){
  let body = {
    full_name: dataUser.full_name,
    description: dataUser.description,
    telephone: dataUser.telephone,
    address: dataUser.address,
    birthday: dataUser.date,
    sex: dataUser.sex,
    avatar: dataUser.avatar,
  };
  return HTTP.postWithAuth(URL.editProfile, body);
}

export function config(){
  return HTTP.get(URL.config);
}

export function dataUser(){
  return HTTP.get(URL.profile);
}

export function changePassword(data){
  let body = {
    password_old: data.oldPassword,
    password: data.newsPassword,
    password_confirmation: data.confirmNewsPassword
  };
  return HTTP.postWithAuth(URL.changePassword, body);
}

export function feedBack(data){
  let body = {
    content: data.content
  };
  return HTTP.postWithAuth(URL.feedBack, body);
}

export function updateStatus(notipush_key) {
  var body  = {
    notipush_key: notipush_key,
    status : 0,
  };
  return HTTP.postWithAuth(URL.updateStatus, body);
}

