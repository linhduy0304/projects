import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
  StatusBar, Navigator, Image,NavigatorIOS,
  Switch,
  TouchableHighlight,
} from "react-native";

var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
let Constant = require('./Constant');
let HTTP = require('./HTTP');
let URL = require('./URL');

import {Actions} from "react-native-router-flux";

export function listPosts() {
  return HTTP.get(URL.homeFeeds);
}

export function communityGroup(){
  return HTTP.get(URL.communityGroup);
}

export function communityTabGroup(group_id, page = null){
  switch (group_id) {
    case '1':
      if(page != null)
      {
        return HTTP.get(URL.communityGroupNews+'?page='+page);
      }
      return HTTP.get(URL.communityGroupNews);
    case '2':
      if(page != null)
      {
        return HTTP.get(URL.communityGroupNews+'?page='+page);
      }
      return HTTP.get(URL.communityGroupNews+'?page=1');
    default:
      if(page != null)
      {
        return HTTP.get(URL.communityTabGroup+group_id+'/feeds?page='+page);
      }
      return HTTP.get(URL.communityTabGroup+group_id+'/feeds'+'?page=1');
  }
}

export function sendQuestion(group_id, content, image){
  var body = {
    group_id: group_id,
    content: content,
    images: image,
  };
  return HTTP.postWithAuth(URL.sendQuestion, body);
}

export function sendTip(group_id, content, image){
  var body = {
    group_id: group_id,
    content: content,
    images: image
  };
  return HTTP.postWithAuth(URL.sendTips, body);
}

export function sendReview(group_id, content, product_id, raty_score, image, name){
  var body = {
    group_id: group_id,
    content: content,
    product_id: product_id,
    raty_score: raty_score,
    images: image,
    product_name: name
  };
  return HTTP.postWithAuth(URL.sendReview, body);
}

export function sendReviewOnProduct(content, product_id, raty_score, image, name){
  var body = {
    content: content,
    product_id: product_id,
    raty_score: raty_score,
    images: image,
    product_name: name
  };
  return HTTP.postWithAuth(URL.sendReviewOnProduct, body);
}


export function sendLookOfTheDay(group_id, content, product_id, image, product_name){
  var body = {
    group_id: group_id,
    content: content,
    product_id: product_id,
    image: image,
    product_name: product_name
  };
  return HTTP.postWithAuth(URL.sendLookOfTheDay, body);
}

export function joinGroup(group_id) {
  var body = {
    group_id: group_id
  };
  return HTTP.postWithAuth(URL.joinGroup, body);
}

export function searchProduct(keyword) {
  return HTTP.get(URL.searchProducts+'?keyword='+keyword);
}

export function deleteFeed(id) {
  return HTTP.postWithAuth(URL.deleteFeed+'/'+id+'/destroy');
}