

import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

//searh post
export function search(typeLoad, keyword, page) {
  return HTTP.get(`${URL.url}${typeLoad}/search?keyword=${keyword}&page=${page}`);
}


