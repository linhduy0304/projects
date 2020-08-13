import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

//create pass
export function createPass(body){
  return HTTP.postWithAuth(URL.user + '/resetPassword', body);
}


//chawng pass
export function changePass(body){
  return HTTP.postWithAuth(URL.user + '/resetPassword', body);
}

//fupdate profile
export function updateProfile(data) {
  return HTTP.postWithAuth(URL.user + '/update', data);
}

//update avatar
export function updateAvatar(path) {
  return HTTP.updateAvatar(URL.user + '/updateAvatar', path);
}

//follow user
export function follow(id) {
  var body = {
    user_id: id,
  };
  return HTTP.postWithAuth(URL.user + '/pick', body);
}
//feedBack
export function feedBack(content){
  var body = {
    content: content,
  };
  return HTTP.postWithAuth(URL.feedBack, body);
}
//invite
export function invite(email, intro){
  var body = {
    email: email,
    content: intro
  };
  return HTTP.postWithAuth(URL.invite, body);
}
//follower
export function follower(keyword, id, page){
  if(keyword == null) {
    return HTTP.get(URL.user+ '/'+id+'/follower?page='+page);
  }else {
    return HTTP.get(URL.user+ '/'+id+'/follower?page='+page+'&keyword='+keyword); 
  }
}
//following
export function following(keyword, id, page){
  if(keyword == null) {
    return HTTP.get(URL.user+ '/'+id+'/following?page='+page);
  }else{
    return HTTP.get(URL.user+ '/'+id+'/following?page='+page+ '&keyword='+keyword);
  }
}
//other profile
export function otherProfile(id){
  return HTTP.get(URL.user+ '/profile?user_id='+id);
}

//my pick
export function myPick(id, page){
  if(id == null) {
    return HTTP.get(URL.user+ '/posts?type=friendPost&page='+page);
  }else 
    return HTTP.get(URL.user+ '/posts?user_id=' +id+ '&type=friendPost&page='+page);
}

//my post profile
export function myPost(id, page){myPost
  if(id == null) {
    return HTTP.get(URL.user+ '/posts?type=myPost&page='+page);
  }else 
    return HTTP.get(URL.user+ '/posts?user_id=' +id+ '&type=myPost&page='+page);
}


