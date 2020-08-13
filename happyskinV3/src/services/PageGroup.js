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

export function listGroupPosts(groupId, page) {
  return HTTP.get(URL.groupPost+groupId+'/feeds?page='+page);
}

export function listGroupLoadMore(groupId, page){
  return HTTP.get(URL.groupPost+groupId+'/feeds'+'?page='+page);
}

export function joinGroup(group_id) {
  var body = {
    group_id: group_id
  };
  return HTTP.postWithAuth(URL.joinGroup, body);
}

export function groupDetail(group_id) {
  return HTTP.get(URL.groups+'/'+group_id);
}