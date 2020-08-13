import React from 'react';
let HTTP = require('./HTTP');
let URL = require('./URL');


//load more review
export function loadMoreReview(id, page){
  return HTTP.get(URL.product+'/'+id+'/userRaty?page='+page);
}
//review
export function review(content, product_id, raty_score, name){
  var body = {
    content: content,
    product_id: product_id,
    raty_score: raty_score,
    product_name: name
  };
  return HTTP.postWithAuth(URL.review, body);
}

//hotDebate Detail
export function loadHotDebate(id) {
  return HTTP.get(URL.hotDebate+'/'+id);
}

//follow HotDebate
export function followHotdebate(id) {
  return HTTP.postWithAuth(URL.hotDebate+'/'+id+'/follow');
}

//load detail
export function loadDetail(id, type) {
  switch(type) {
    case 'product':
      return HTTP.get(URL.product+'/'+id);
    default:
      return HTTP.getDetail(URL.post+'/'+id);
  }
}

//explore Relate
export function exploreRelate(id, productId, type) {
  switch(type) {
    case 'product': 
      return HTTP.get(URL.productCategory+'/'+id+'?per_page=6?productId='+productId);
    default :
      return HTTP.get(URL.relatePost+'&category_id='+id+'&post_id='+productId);
  }
}

//load explore
export function explore(page) {
  return HTTP.get(URL.explore+'?page='+page);
}




