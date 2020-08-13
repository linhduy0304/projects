import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

//pickCategory
export function pickCategory(category){
  var body = {
    id: category.id
  }
  if(category.is_like == 1) {
    return HTTP.postWithAuth(URL.category + '/unPick', body);
  }else {
    return HTTP.postWithAuth(URL.category + '/pick', body);
  }
  
}

// /category
export function category(slug, typeCate, page){
  return HTTP.get(URL.category + '/' +slug+ '?type='+typeCate+ '&page='+page);
}

export function explore(){
  return HTTP.get(URL.categories);
}



