'use strict';
const {
    HOME_REQUEST,
    HOME_SUCCESS,
    HOME_FAIL,
    POPULAR_REQUEST,
    POPULAR_SUCCESS,
    POPULAR_FAIL,
    HOME_SEARCH_REQUEST,
    HOME_SEARCH_SUCCESS,
    HOME_SEARCH_FAIL,
    TOPPICKS_REQUEST,
    TOPPICKS_SUCCESS,
    TOPPICKS_FAIL
  } = require('../libs/actionTypes');

import {Alert} from 'react-native'
import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;

const Home = require('../services/Home');

import {Actions} from 'react-native-router-flux';

//toppick
export function topPicksRequest() {
  return {
    type: TOPPICKS_REQUEST
  };
}

export function topPicksSuccess(data, starPickers, starPicks,topPickers, action) {
  return {
    type: TOPPICKS_SUCCESS,
    data: data,
    starPickers: starPickers,
    starPicks: starPicks,
    topPickers: topPickers,
    action: action
  };
}
export function topPicksFail() {
  return {
    type: TOPPICKS_FAIL,
  };
}

export function topPicks(action = 'L', page = 1) {
  return dispatch => {
    Home.topPicks(page).then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            {text: 'Ok', style: 'cancel'},
          );
          dispatch(topPicksFail());
          return;
        case 200:
            dispatch(topPicksSuccess(res.posts, res.starPickers, res.postHightPicks, res.topPickers, action))
          return;
        default: 
          dispatch(topPicksFail());
          return;
      }
    }).catch((err) => {
      return dispatch(topPicksFail())
    })
  }
}


//search
export function searchRequest(action) {
  return {
    type: HOME_SEARCH_REQUEST,
    action: action,
  };
}

export function searchSuccess(data, action, typeLoad) {
  return {
    type: HOME_SEARCH_SUCCESS,
    data: data,
    action: action,
    typeLoad: typeLoad
  };
}
export function searchFail() {
  return {
    type: HOME_SEARCH_FAIL,
  };
}

export function search(typeLoad, keyword, action, page= 1) {
  return dispatch => {
    dispatch(searchRequest(action))
    Home.search(typeLoad, keyword, page).then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            {text: 'Ok', style: 'cancel'},
          );
          dispatch(searchFail());
          return;
        case 200:
            dispatch(searchSuccess(res.data, action, typeLoad))
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

//pick to peak
export function popularRequest() {
  return {
    type: POPULAR_REQUEST
  };
}

export function popularSuccess(data, action) {
  return {
    type: POPULAR_SUCCESS,
    data: data,
    action: action
  };
}
export function popularFail() {
  return {
    type: POPULAR_FAIL,
  };
}

export function popular(action, page = 1) {
  return dispatch => {
    Home.popular(page).then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            {text: 'Ok', style: 'cancel'},
          );
          dispatch(popularFail());
          return;
        case 200:
            dispatch(popularSuccess(res.posts, action))
          return;
        default: 
          dispatch(popularFail());
          return;
      }
    }).catch((err) => {
      return dispatch(popularFail())
    })
  }
}

//home
export function homeRequest() {
  return {
    type: HOME_REQUEST
  };
}

export function homeSuccess(posts, userSuggests, dailys, breaking, action) {
  return {
    type: HOME_SUCCESS,
    posts: posts,
    userSuggests: userSuggests,
    dailys: dailys,
    breaking: breaking,
    action: action
  };
}
export function homeFail() {
  return {
    type: HOME_FAIL,
  };
}

export function home(action, page = 1) {
  return dispatch => {
    Home.home(page).then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            {text: 'Ok', style: 'cancel'},
          );
          dispatch(homeFail());
          return;
        case 200:
            dispatch(homeSuccess(res.data.posts, res.data.userSuggests, res.data.dailys,res.data.breakings, action))
          return;
        default: 
          dispatch(homeFail());
          return;
      }
    }).catch((err) => {
      return dispatch(homeFail())
    })
  }
}


