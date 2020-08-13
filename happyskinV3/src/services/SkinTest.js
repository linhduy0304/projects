import React from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  StatusBar, Navigator, Image,NavigatorIOS,
  Switch,
  TouchableHighlight,
} from "react-native";

let Constant = require('./Constant');
let HTTP = require('./HTTP');
let URL = require('./URL');


export function skintestData() {
  return HTTP.get(URL.skinQuestion);
}

export function saveResult(answers, birthday, full_name, gender, job, city) {
  var body = {
    answers: answers,
    birthday: birthday,
    full_name: full_name,
    gender: gender,
    job: job,
    city: city
  };
  return HTTP.postWithAuth(URL.skinSave, body);
}

export function skinresultGroup(skinType) {
  return HTTP.get(URL.skinresultGroup+'?type='+skinType);
}

export function skintestResult() {
  return HTTP.get(URL.skinResult);
}

export function listSkintestProduct(skintype, categoryId='', brandId='') {
  return HTTP.get(URL.skinProduct+'?type='+skintype+'&category_id='+categoryId+'&brand_id='+brandId);
}

export function listSkintestProductLoadMore(skintype, categoryId='', brandId='', page){
  return HTTP.get(URL.skinProduct+'?type='+skintype+'&category_id='+categoryId+'&brand_id='+brandId+'&page='+page);
}

export function categories(){
  return HTTP.get(URL.skinCategory);
}