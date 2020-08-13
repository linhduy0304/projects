

import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

//send
export function send(body) {
  return HTTP.postWithAuth(`${URL.url}message`, body);
}

//createGroup
export function createGroup(body) {
  return HTTP.postWithAuth(`${URL.url}storeGroupChat`, body);
}


// friend list
export function friendList() {
  return HTTP.get(`${URL.url}userList`);
}

// chat detail
export function chatDetail(id) {
  return HTTP.get(`${URL.conversation}/${id}`);
}

//chat list
export function chats(page) {
  return HTTP.get(`${URL.chats}?page=${page}`);
}