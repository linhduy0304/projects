

import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

export function relationship(id, body) {
  return HTTP.postWithAuth(`${URL.url}individualRequest/${id}/response`, body);
}
//post status
export function postImage(image, id) {
  return HTTP.postImage(`${URL.url}storeImages/${id}`, image);
}
//post status
export function postStatus(body) {
  return HTTP.postWithAuth(`${URL.url}feeds`, body);
}

//load home
export function home(page) {
  return HTTP.get(`${URL.url}feeds?page=${page}`);
}


