import React from 'react';
// import {
//   View, Text, 
// } from "react-native";
let HTTP = require('./HTTP');
let URL = require('./URL');



//edit comment
export function editComment(id, content, image) {
  
  if(image == ''){
    var body = {
      content: content,
    };
  }else{
    var body = {
      content: content,
      images: image,
    };
  }
  return HTTP.postWithAuth(URL.comment+'/'+id, body);
}

//delete comment
export function deleteComment(id) {
  return HTTP.postWithAuth(URL.comment+'/'+id+'/destroy');
}
//action comment
export function comment(target_id, type, content, image, parentId='') {
  
  if(image == ''){
    var body = {
      type: type,
      target_id: target_id,
      content: content,
    };
  }else{
    var body = {
      type: type,
      target_id: target_id,
      content: content,
      images: image,
    };
  }
  if (parentId != '') {
    body.parent_id = parentId;
  }
  return HTTP.postWithAuth(URL.comment, body);
}

//load comments
export function loadComments(type, target_id,page = 1, parent_id = null){
  if(parent_id == null){
    return HTTP.get(URL.comment+'?type='+type+'&target_id='+target_id+'&page='+page);
  }
  return HTTP.get(URL.comment+'?type='+type+'&target_id='+target_id+'&parent_id='+parent_id+'&page='+page);
}

//action like
export function like(id, type) {
  var body = {
    id: id
  };
  switch (type) {
    case 'post':
      return HTTP.postWithAuth(URL.likePost, body);
    case 'product':
      return HTTP.postWithAuth(URL.likeProduct, body);
    case 'video':
      return HTTP.postWithAuth(URL.likeVideo, body);
    case 'hotdebate':
      return HTTP.postWithAuth(URL.likeHotdebate, body);
    default :
      return HTTP.postWithAuth(URL.likeGroupFeed, body);
  }
}



