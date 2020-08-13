

'use strict'
import { Alert } from 'react-native';
import {Actions} from 'react-native-router-flux'
import SimpleToast from 'react-native-simple-toast';
const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} = require('../config/actionTypes');
const Search = require('../services/Search');

//feedback
export function searchRequest(action) {
  return {
    type: SEARCH_REQUEST,
    action
  };
}

export function searchSuccess(data, action, typeLoad) {
  return {
    type: SEARCH_SUCCESS,
    data,
    action,
    typeLoad
  };
}
export function searchFail() {
  return {
    type: SEARCH_FAIL,
  };
}

export function loadSearch(typeLoad, keyword, action, page= 1) {
  return dispatch => {
    dispatch(searchRequest(action));
    Search.search(typeLoad, keyword, page).then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(searchFail());
          return;
        case 200:
          dispatch(searchSuccess(res.data, action, typeLoad));
          return;
        default: 
          dispatch(searchFail());
          return;
      }
    }).catch((err) => {
      return dispatch(searchFail())
    })
  }
}