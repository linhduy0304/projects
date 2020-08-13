'use strict';
const {
    ACTIVITY_MY_REQUEST,
    ACTIVITY_MY_SUCCESS,
    ACTIVITY_MY_FAIL,
    ACTIVITY_FRIEND_REQUEST,
    ACTIVITY_FRIEND_SUCCESS,
    ACTIVITY_FRIEND_FAIL,
  } = require('../libs/actionTypes');
import {
    Alert,
  } from 'react-native';
import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;

const Activity = require('../services/Activity');

import {Actions} from 'react-native-router-flux';


//friend feed
export function friendFeedRequest() {
  return {
    type: ACTIVITY_FRIEND_REQUEST
  };
}

export function friendFeedSuccess(data, action) {
  return {
    type: ACTIVITY_FRIEND_SUCCESS,
    data: data,
    action: action
  };
}
export function friendFeedFail() {
  return {
    type: ACTIVITY_FRIEND_FAIL,
  };
}

export function friendFeed(action, page = 1) {
  return dispatch => {
    Activity.friendFeed(page).then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            {text: 'Ok', style: 'cancel'},
          );
          dispatch(friendFeedFail());
          return;
        case 200:
            dispatch(friendFeedSuccess(res.data, action))
          return;
        default: 
          dispatch(friendFeedFail());
          return;
      }
    }).catch((err) => {
      return dispatch(friendFeedFail())
    })
  }
}

//my feed
export function myFeedRequest() {
  return {
    type: ACTIVITY_MY_REQUEST
  };
}

export function myFeedSuccess(data, action) {
  return {
    type: ACTIVITY_MY_SUCCESS,
    data: data,
    action: action
  };
}
export function myFeedFail() {
  return {
    type: ACTIVITY_MY_FAIL,
  };
}

export function myFeed(action, page = 1) {
  return dispatch => {
    Activity.myFeed(page).then((res) => {
      switch(res.status) {
        case 500:
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            {text: 'Ok', style: 'cancel'},
          );
          dispatch(myFeedFail());
          return;
        case 200:
            dispatch(myFeedSuccess(res.data, action))
          return;
        default: 
          dispatch(myFeedFail());
          return;
      }
    }).catch((err) => {
      return dispatch(myFeedFail())
    })
  }
}


