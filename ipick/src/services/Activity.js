import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

export function myFeed(page){
  return HTTP.get(URL.user+ '/myFeed?page='+page);
}


export function friendFeed(page){
  return HTTP.get(URL.user+ '/friendFeed?page='+page);
}


