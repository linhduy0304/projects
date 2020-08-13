import React from 'react';
// import {
//   View, Text, 
// } from "react-native";
let HTTP = require('./HTTP');
let URL = require('./URL');
 
//spoint
export function spoint(id, page){
  return HTTP.get(URL.register+'/'+id+'/historyPoint?page='+page);
}

export function notification(page){
  return HTTP.get(URL.register+'/notifications2?page='+page);
}

export function postLiked(redirect, page){
  switch(redirect) {
    case 'post':
      return HTTP.get(URL.postLiked+'?page='+page);
    case 'product':
      return HTTP.get(URL.productLiked+'?page='+page);
  }
}



