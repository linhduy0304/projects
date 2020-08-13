'use strict';
const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  } = require('../libs/actionTypes');

import Constant from '../services/Constant';
const Search = require('../services/Search');

import {Actions} from 'react-native-router-flux';

export function searchRequest(action) {
  return {
    type: SEARCH_REQUEST,
    action: action
  };
}

export function searchSuccess(data, type, action, keyword) {
  return {
    type: SEARCH_SUCCESS,
    data: data,
    typeSearch: type,
    action: action, 
    keyword: keyword
  };
}

export function searchFail(error) {
  return {
    type: SEARCH_FAIL,
    error: error
  };
}

export function search(keyword, type, action, page, typeGourp = ''){
  return dispatch => {
      dispatch(searchRequest(action));
      return Search.search(keyword, type, page, typeGourp)
        .then(function (res) {
          switch(res.status) {
            case 200:
              dispatch(searchSuccess(res.data, type, action, keyword));
              return;
            case 500: 
              Actions.login({type: 'reset'});
              return;
            default:
              dispatch(searchFail(res.errors));
              return;
          }
        })
        .catch((error) => {
          dispatch(searchFail(error));
        });
  };
}



