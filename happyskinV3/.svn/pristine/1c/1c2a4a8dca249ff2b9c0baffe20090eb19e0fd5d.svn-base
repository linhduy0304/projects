import React from 'react';
let HTTP = require('./HTTP');
let URL = require('./URL');

export function search(keyword, type, page, typeGourp) {
  switch (type) {
    case 'product':
      return HTTP.get(URL.searchProducts+'?keyword='+keyword+'&page='+page);
    case 'post':
      // console.log(URL.searchNews+'?keyword='+keyword+'&type='+type+'&page='+page)
      return HTTP.get(URL.searchNews+'?keyword='+keyword+'&type='+typeGourp+'&page='+page);
    case 'coach':
      return HTTP.get(URL.searchUsers+'?keyword='+keyword+'&page='+page);
    case 'routine':
      return HTTP.get(URL.searchRoutine+'?keyword='+keyword+'&page='+page);
    default:
      return HTTP.get(URL.searchProducts+'?keyword='+keyword+'&page='+page);
  }
}





