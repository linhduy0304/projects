

import React from 'react'
import TimeAgo from 'react-native-timeago'; 

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function renderTime(time) {
  var new1 = time.split(" ");
  new2 = new1[0].split("-");
  new3 = new2[2]+'-'+new2[1]+'-'+new2[0]+' '+new1[1]
  return (<TimeAgo time={new3}/>)
}

export function getDateNow(today) {
  var getDate = today.getDate() < 10 ? "0"+today.getDate() : today.getDate();
  var getMonth =today.getMonth() < 10 ? "0"+(1+today.getMonth()) : (1+today.getMonth());
  return getDate+'-'+getMonth+'-'+today.getFullYear();
}