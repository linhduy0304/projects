import React from 'react';
let HTTP = require('./HTTP');
let URL = require('./URL');

//routine user save
export function routineSave(id) {
  return HTTP.postWithAuth(URL.routine+'/'+id+'/save')
}
//routine user reivew
export function routineReview(id, rating, content) {
  let body ={
    routine_id: id,
    raty_score: rating,
    content: content
  }
  return HTTP.postWithAuth(URL.userRatyRoutine, body)
}

//routine update
export function routineUpdate(id, array_id, time) {
  if(time) {
    let body={
      product_ids: array_id,
      time: time
    }
    return HTTP.postWithAuth(URL.userRoutine+'/'+id+'/productUsing', body)
  }else {
    let body={
      product_ids: array_id
    }
    return HTTP.postWithAuth(URL.userRoutine+'/'+id+'/productUsing', body)
  }
  
}

// productUpdate

export function productUpdate(id, time) {
  if(time == null) {
    return HTTP.get(URL.userRoutine+'/'+id+'/routine')
  }else return HTTP.get(URL.userRoutine+'/'+id+'/routine?time='+time)
}
//routine product
export function routineProduct(id, direct) {
  if(direct == 'diary') {
    return HTTP.get(URL.userRoutine+'/'+id+'/productUsing')
  }else return HTTP.get(URL.userRoutine+'/'+id+'/routine')
}

//routine user join
export function routineJoin(id) {
  return HTTP.postWithAuth(URL.routine+'/'+id+'/addUser')
}

//routine
export function routine(redirect, page){
  switch(redirect) {
    case 'joined':
      return HTTP.get(URL.register+'/routineSaved?page='+page);
    case 'joining':
      return HTTP.get(URL.register+'/routines');
    case 'suggest':
      return HTTP.get(URL.routines+'?page='+page);
  }
}

//routine Detail
export function routineDetail(id){
  return HTTP.get(URL.routine+'/'+id);
}






