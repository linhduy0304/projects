import React from 'react';
let HTTP = require('./HTTP');
let URL = require('./URL');

//send coach
export function send(id, body){
  return HTTP.postWithAuth(URL.skinDiary+'/'+id+'/send_coach', body);
}
//load coach
export function coach() {
  return HTTP.get(URL.coachs)
}
// skinDiaryDelete
export function skinDiaryDelete(id){
  return HTTP.postWithAuth(URL.skinDiary+'/'+id+'/destroy');
}

//skindiary add
export function skinDiaryAdd(image, description){
  let body = {
    image: image,
    description: description,
  }
  return HTTP.postWithAuth(URL.skinDiary+'/store', body);
}





