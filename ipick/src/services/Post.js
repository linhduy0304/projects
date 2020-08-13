import React from 'react';

let HTTP = require('./HTTP');
let URL = require('./URL');

// editArticle
export function editArticle(data, action, slug){
  if(action == 'noImage') {
    return HTTP.postWithAuth('https://mapi.ipick.vn/api/v1/'+slug+ '/update', data)
  }else {
    return HTTP.postArticle('https://mapi.ipick.vn/api/v1/'+slug+ '/update', data);
  }
}

//post link
export function postLink(data, action){
  switch(action) {
    case 'audio':
      return HTTP.postArticle(URL.post+ '/audio', data);
    case 'article':
      return HTTP.postArticle(URL.post+ '/post', data);
    default:
      return HTTP.postWithAuth(URL.post+ '/' +action, data);
  }
}

//get link
export function getLink(link){
  var body = {
    url: link
  }
  return HTTP.postWithAuth(URL.crawurl, body);
}
//post
export function postImage(title, content, category_ids, atribute_image, tags) {
  return HTTP.postImage(URL.post+'/image',title, content, category_ids, atribute_image, tags);
}

//save
export function save(is_save, id){
  var body = {
    id: id,
  }
  if(is_save == 1) {
    return HTTP.postWithAuth(URL.post+'/unSaved', body);
  }else {
    return HTTP.postWithAuth(URL.post+'/saved', body);
  }
}

//like
export function like(is_like, id){
  var body = {
    id: id,
  }
  if(is_like == 1) {
    return HTTP.postWithAuth(URL.post+'/unPick', body);
  }else {
    return HTTP.postWithAuth(URL.post+'/pick', body);
  }
}

//comment
export function comment(id, comment){
  var body = {
    target_id: id,
    content: comment,
  }
  return HTTP.postWithAuth(URL.comment, body);
}

//laod comment
export function loadComment(id, page){
  return HTTP.get(URL.comments+ '?target_id='+id+ '&page='+page);
}

//post detail
export function postDetail(slug){
  return HTTP.get(URL.post+ '/'+slug);
}



