import React from 'react';
let HTTP = require('./HTTP');
let URL = require('./URL');
//eventDetail
export function eventDetail(id) {
  return HTTP.get(URL.eventDetail+id);
}

//loadEvent
export function event(page) {
  return HTTP.get(URL.event+'?page='+page);
}

export function videoDetail(id){
  return HTTP.get(URL.videos+'/'+id);
}

export function magazine(type, id, page){
  switch(type) {
    case 'post':
      return HTTP.get(URL.posts+'?category_id='+id+'&page='+page);
    case 'hotdebate':
      return HTTP.get(URL.hotDebate+'?page='+page);
    case 'review':
      return HTTP.get(URL.productFilter+'?sort=1&page='+page);
    case 'video':
      return HTTP.get(URL.videos+'?page='+page);
  
  }
}

