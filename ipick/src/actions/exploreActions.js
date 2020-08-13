'use strict';
const {
  EXPLORE_REQUEST,
  EXPLORE_SUCCESS,
  EXPLORE_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAIL,
  PICK_CATEGORY_REQUEST,
  PICK_CATEGORY_SUCCESS,
  PICK_CATEGORY_FAIL,
  } = require('../libs/actionTypes');
import {
    Alert,
  } from 'react-native';

import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;

const Explore = require('../services/Explore');

import {Actions} from 'react-native-router-flux';

//pick unpick
//explore
export function pickRequest() {
  return {
    type: PICK_CATEGORY_REQUEST
  };
}

export function pickSuccess(data) {
  return {
    type: PICK_CATEGORY_SUCCESS,
    data: data,
  };
}
export function pickFail() {
  return {
    type: PICK_CATEGORY_FAIL,
  };
}

export function pickCategory(category) {
  return dispatch => {
    // dispatch(exploreRequest())
    Explore.pickCategory(category).then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            {text: 'Ok', style: 'cancel'},
          );
          dispatch(pickFail());
          return;
        case 200:
            dispatch(pickSuccess(category))
          return;
        default: 
          dispatch(pickFail());
          return;
      }
    }).catch((err) => {
      return dispatch(pickFail())
    })
  }
}


//category
export function categoryRequest(action) {
  return {
    type: CATEGORY_REQUEST,
    action: action
  };
}

export function categorySuccess(category, posts, action) {
  return {
    type: CATEGORY_SUCCESS,
    category: category,
    posts: posts,
    action: action
  };
}
export function categoryFail() {
  return {
    type: CATEGORY_FAIL,
  };
}

export function category(slug, typeCate = 'focal', page= 1, action='L' ) {
  return dispatch => {
    dispatch(categoryRequest(action))
    Explore.category(slug, typeCate, page).then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            {text: 'Ok', style: 'cancel'},
          );
          dispatch(categoryFail());
          return;
        case 200:
            dispatch(categorySuccess(res.category, res.posts, action))
          return;
        default: 
          dispatch(categoryFail());
          return;
      }
    }).catch((err) => {
      return dispatch(categoryFail())
    })
  }
}

//explore
export function exploreRequest() {
  return {
    type: EXPLORE_REQUEST
  };
}

export function exploreSuccess(data) {
  return {
    type: EXPLORE_SUCCESS,
    data: data,
  };
}
export function exploreFail() {
  return {
    type: EXPLORE_FAIL,
  };
}

export function explore() {
  return dispatch => {
    dispatch(exploreRequest())
    Explore.explore().then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            {text: 'Ok', style: 'cancel'},
          );
          dispatch(exploreFail());
          return;
        case 200:
            dispatch(exploreSuccess(res.data))
          return;
        default: 
          dispatch(exploreFail());
          return;
      }
    }).catch((err) => {
      return dispatch(exploreFail())
    })
  }
}


