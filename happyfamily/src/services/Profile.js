import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

//update avatar
export function updateAvatar(path) {
  return HTTP.updateAvatar(URL.user + '/updateAvatar', path);
}

//chawng pass
export function changePass(body){
  return HTTP.postWithAuth(URL.user + '/resetPassword', body);
}

//fupdate profile
export function updateProfile(body) {
  return HTTP.postWithAuth(URL.user + '/update', body);
}

//feedBack
export function feedBack(body){
  return HTTP.postWithAuth(`${URL.url}feedback`, body);
}

export function searchUser(value, sex) {
  return HTTP.get(`${URL.userSearch}?keyword=${value}&sex=${sex}&per_page=6`);
}


