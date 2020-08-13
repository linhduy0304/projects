import React from 'react';
import {Actions} from "react-native-router-flux";
import TimeAgo from "react-native-timeago";
var moment = require('moment');
require('moment/locale/vi');
moment.locale('vi-VN');

export function getVariable(name, url){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
  }

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function convertDateTime(time) {
    var dt = time.split(" ");
    date = dt[0].split("-");
    hours = dt[1].split(":");
    var d2 = new Date(date[0], parseInt(date[1])-1, date[2], hours[0], hours[1], hours[2]);
    var d3 = new Date();
    var minutes = (Date.now() - d2.getTime())/1000/60; 
    if(minutes < 1440 ) {
        return <TimeAgo time={time}/>
    } else {
      if(date[0] == d3.getFullYear()) {
        return date[2]+'-'+date[1]+' lúc '+hours[0]+':'+hours[1];
      }else {
        return date[2]+'-'+date[1]+'-'+date[0]+' lúc '+hours[0]+':'+hours[1];
      }
    }
}

export function getTime(time) {
  var now = new Date();
  time = time.replace(/-/g, "/");
  var newTime = new Date(time);
  var offset = newTime.getTime() - now.getTime();
  var totalDays = Math.floor(offset / 1000 / 60 / 60 / 24); 
  if(totalDays > 0) {
    return totalDays+ ' ngày';
  }else {
    var totalHours = Math.floor(offset / 1000 / 60 / 60);
    if(totalHours > 0) {
      return totalHours+ ' giờ';
    }else {
      var totalMinutes = Math.floor(offset / 1000 / 60);
      if(totalMinutes > 0) {
        return totalMinutes+ ' phút';
      }else {
        var totalSeconds = Math.floor(offset / 1000); 
        if(totalSeconds > 0) {
          return totalSeconds+ ' giây';
        }
        return 'Hết thời gian';
      }
    }
  }
}

export function randomColor() {
    var arrColor = [
      '#ffe5d9',
      '#b12248',
      '#e45513',
      '#752b90',
      '#b37384',
      '#d0021b',
      '#f5a623',
      '#9013fe',
      '#417505',
      '#8b572a',
      '#ffd2de',
      '#33a88c',
      '#cef6ed',
      '#f3d2ff',
      '#69973b',
    ];
    $rand = arrColor[Math.floor(Math.random()*arrColor.length)];
    return $rand;
}
