// import React from 'react';
// import {
//   View, Text, 
// } from "react-native";
let HTTP = require('./HTTP');
let URL = require('./URL');
//spaHistory
export function spaHistory() {
  return HTTP.get('https://mapipro3.happyskin.vn/v2/user/bookings');
}
//booking
export function booking(body){
  return HTTP.postWithAuth('https://mapipro3.happyskin.vn/v2/bookings', body);
}
// hotDeal
export function hotDeal(){
  return HTTP.get('http://mapi.skinstore.vn/api/group_products?key=san-pham-moi-nhat');
}

export function home(){
  return HTTP.get(URL.home);
}

export function skinPost(skinType){
  return HTTP.get(URL.skintest+'/post/'+skinType);
}

export function skinDiary() {
  return HTTP.get(URL.register+'/skindiary');
}

export function producting() {
  return HTTP.get(URL.register+'/products_using')
}


