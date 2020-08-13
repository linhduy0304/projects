import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

//search
export function search(typeLoad, keyword, page){
  if(typeLoad == 'post') {
    return HTTP.get(URL.post+ '/search?keyword='+keyword+ '&page=' +page);
  }else {
    return HTTP.get(URL.user+ '/search?keyword='+keyword+ '&page=' +page);
  }
}

//top picks
export function topPicks(page){
  return HTTP.get('https://mapi.ipick.vn/api/v1/home?page='+page);
}

//pick to peak
export function popular(page){
  return HTTP.get('https://mapi.ipick.vn/api/v1/pick-to-peaks?page='+page);
}


export function home(page){
  return HTTP.get(URL.home+ '?page='+page);
}


