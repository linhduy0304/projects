

import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

//sendcomment
export function sendComment(body){
  return HTTP.postWithAuth(URL.comments, body);
}

//laod comment
export function loadComment(id, page, type){
  return HTTP.get(URL.comments+ '?target_id='+id+ '&page='+page+'&type='+type);
}

//like
export function like(type, id){
  var body = {
    id: id,
  }
  return HTTP.postWithAuth(`${URL.url}${type}/like`, body);
}

//postDetail
export function postDetail(slug) {
  return HTTP.get(`${URL.url}post/${slug}`);
}

//postCategory
export function postCategory(slug) {
  return HTTP.get(`${URL.url}category/${slug}`);
}

//category
export function categoryLv2(id) {
  return HTTP.get(`${URL.url}categories?category_id=${id}`);
}

//category
export function category() {
  return HTTP.get(`${URL.url}categories`);
}

