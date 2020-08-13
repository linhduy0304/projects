import React from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  StatusBar, Navigator, Image,NavigatorIOS,
  Switch,
  TouchableHighlight,
  Platform
} from "react-native";

import {
  Alert
} from "react-native";

var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
let Constant = require('./Constant');

import {Actions} from "react-native-router-flux";
const StoreService = require('./StoreService').default;
import Toast from 'react-native-simple-toast';

export function get(url) {
  return new StoreService().getSession(Constant.HS_HEADER_REQUEST)
  .then((header) => {
      return fetch(url,
        {
          method: "GET",
          headers: header
        }
      )
      .then(function(response) {
        return response.json()
      })
      .then(function(res) {
        return res
      })
      .catch(function(error) {
        return {
          status: 500
        }
      });
  });
}

export function getDetail(url) {
  return new StoreService().getSession(Constant.HS_HEADER_REQUEST)
  .then((header) => {
      return fetch(url,
        {
          method: "GET",
          headers: header
        }
      )
      .then(function(response) {
        return response.json()
      })
      .then(function(res) {
        if(res.status == -1){
          Toast.show('Trang không tồn tại');
          Actions.tab();
        }else{
          return res
        }
      })
      .catch(function(error) {
        return {
          status: 500
        }
      });
  });
}

export function getHasHeader(url, header) {
    return fetch(url,
      {
        method: "GET",
        headers: header
      }
    )
    .then(function(response) {
      return response.json()
    })
    .then(function(res) {
      return res
    })
    .catch(function(error) {
      return {
        status: 500
      }
    });
}

export function post(url, values) {
  if (typeof values === 'undefined' || values == undefined) {
    values = {};
  }
  values['platform'] = (Platform.OS == 'ios') ? 'ios' : 'android';
  return fetch(url,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    }
  )
  .then(function(response) {
    return response.json()
  })
  .then(function(res) {
    return res
  })
  .catch(function(error) {
    return {
      status: 500
    }
  });
}

export function postWithAuth(url, values) {
  if (typeof values === 'undefined' || values == undefined) {
    values = {};
  }
  values['platform'] = (Platform.OS == 'ios') ? 'ios' : 'android';
  return new StoreService().getSession(Constant.HS_HEADER_REQUEST)
  .then((header) => {
      return fetch(url,
        {
          method: "POST",
          headers: header,
          body: JSON.stringify(values)
        }
      )
      .then(function(response) {
        return response.json()
      })
      .then(function(res) {
        return res
      })
      .catch(function(error) {
        return {
          status: 500
        }
      });
  });
}

export function setAlertNull(){
  return new StoreService().storeSession(Constant.HS_SHOW_ALERT_NOT_CONNECT, null);
}
