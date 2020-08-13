import React from 'react';
let HTTP = require('./HTTP');
let URL = require('./URL');

//chat book
export function chatBook(id, time) {
  body = {
    coach_id: id,
    time: time
  };
  return HTTP.postWithAuth(URL.room+'/schedule', body);
}
//chat qa
export function chatQA(product_id, product_name, typeQA, full_name, avatar, city, skintest) {
  let body = {
    product_id: product_id,
    product_name: product_name,
    type: typeQA,
    full_name: full_name,
    avatar: avatar,
    city: city,
    skintype: skintest,
  }
  return HTTP.postWithAuth(URL.message+'/storeQA', body);
}

//load chat recent
export function chatRecent(direct, page) {
  if(direct == '15M') {
    return HTTP.get(URL.register+ '/coaches?page=' +page);
  } else return HTTP.get(URL.chat+'?page=' +page);
}