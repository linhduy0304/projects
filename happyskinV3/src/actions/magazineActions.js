'use strict';
const {
    MAGAZINE_REQUEST,
    MAGAZINE_SUCCESS,
    MAGAZINE_FAIL,
    VIDEO_DETAIL_REQUEST,
    VIDEO_DETAIL_SUCCESS,
    VIDEO_DETAIL_FAIL,
    EVENT_REQUEST,
    EVENT_SUCCESS,
    EVENT_FAIL,
    EVENT_DETAIL_REQUEST,
    EVENT_DETAIL_SUCCESS,
    EVENT_DETAIL_FAIL
  } = require('../libs/actionTypes');
import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;
const Magazine = require('../services/Magazine');
import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';
//eventDetail
export function eventDetailRequest() {
  return {
    type: EVENT_DETAIL_REQUEST
  };
}

export function eventDetailSuccess(data, action) {
  return {
    type: EVENT_DETAIL_SUCCESS,
    data: data,
    action: action,
  };
}
export function eventDetailFail() {
  return {
    type: EVENT_DETAIL_FAIL,
  };
}

export function eventDetail(id) {
  return dispatch => {
    return Magazine.eventDetail(id).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(eventDetailSuccess(res.data))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(eventDetailFail());
          return;
      }
    }).catch((err) => {
      return dispatch(eventDetailFail())
    })
  }
}

//load event
export function eventRequest() {
  return {
    type: EVENT_REQUEST
  };
}

export function eventSuccess(data, action) {
  return {
    type: EVENT_SUCCESS,
    data: data,
    action: action,
  };
}
export function eventFail() {
  return {
    type: EVENT_FAIL,
  };
}

export function event(action, page=1) {
  return dispatch => {
    return Magazine.event(page).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(eventSuccess(res.data, action))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(eventFail());
          return;
      }
    }).catch((err) => {
      return dispatch(eventFail())
    })
  }
}

//video Detail
export function videoDetailRequest() {
  return {
    type: VIDEO_DETAIL_REQUEST,
  };
}
export function videoDetailSuccess(data) {
  return {
    type: VIDEO_DETAIL_SUCCESS,
    data: data,
  };
}
export function videoDetailFail() {
  return {
    type: VIDEO_DETAIL_FAIL,
  };
}

export function videoDetail(id) {
  return dispatch => {
    return Magazine.videoDetail(id).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(videoDetailSuccess(res.data))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(videoDetailFail());
          return;
      }
    }).catch((err) => {
      return dispatch(videoDetailFail())
    })
  }
}

//load
export function magazineRequest() {
  return {
    type: MAGAZINE_REQUEST
  };
}

export function magazineSuccess(data, action, type) {
  return {
    type: MAGAZINE_SUCCESS,
    data: data,
    action: action,
    typePost: type,
  };
}
export function magazineFail() {
  return {
    type: MAGAZINE_FAIL,
  };
}

export function magazine(type, id, action, page=1) {
  return dispatch => {
    return Magazine.magazine(type, id, page).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(magazineSuccess(res.data, action, type))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(magazineFail());
          return;
      }
    }).catch((err) => {
      return dispatch(magazineFail())
    })
  }
}


