'use strict';
const {
    NOTIFICATION_REQUEST,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_FAIL,
    POSTLIKED_REQUEST,
    POSTLIKED_SUCCESS,
    POSTLIKED_FAIL,
    SPOINT_REQUEST,
    SPOINT_SUCCESS,
    SPOINT_FAIL
  } = require('../libs/actionTypes');

import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;

const More = require('../services/More');
import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';


//notification
export function spointRequest() {
  return {
    type: SPOINT_REQUEST,
  };
}

export function spointSuccess(data, action) {
  return {
    type: SPOINT_SUCCESS,
    data: data,
    action: action
  };
}
export function spointFail() {
  return {
    type: SPOINT_FAIL,
  };
}

export function spoint(id, action, page=1) {
  return dispatch => {
    return More.spoint(id, page).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(spointSuccess(res.data, action))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(spointFail())
          return;
      }
    }).catch((error) => {
      return dispatch(spointFail())
    })
  }
}

//post liked
export function postLikedRequest() {
  return {
    type: POSTLIKED_REQUEST,
  };
}

export function postLikedSuccess(data, action) {
  return {
    type: POSTLIKED_SUCCESS,
    data: data,
    action: action
  };
}
export function postLikedFail() {
  return {
    type: POSTLIKED_FAIL,
  };
}

export function postLiked(redirect, action, page=1) {
  return dispatch => {
    return More.postLiked(redirect, page).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(postLikedSuccess(res.data, action))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(postLikedFail());
          return;
      }
    }).catch((error) => {
      return dispatch(postLikedFail())
    })
  }
}

//notification
export function notificationRequest() {
  return {
    type: NOTIFICATION_REQUEST,
  };
}

export function notificationSuccess(data, action) {
  return {
    type: NOTIFICATION_SUCCESS,
    data: data,
    action: action
  };
}
export function notificationFail() {
  return {
    type: NOTIFICATION_FAIL,
  };
}

export function notification(action, page=1) {
  return dispatch => {
    return More.notification(page).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(notificationSuccess(res.data, action))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(notificationFail());
          return;
      }
    }).catch((error) => {
      return dispatch(notificationFail())
    })
  }
}


