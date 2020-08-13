'use strict';
const {
    CHAT_RECENT_REQUEST,
    CHAT_RECENT_SUCCESS,
    CHAT_RECENT_FAIL,
    CHAT_QA_REQUEST,
    CHAT_QA_SUCCESS,
    CHAT_QA_FAIL,
    CHAT_BOOK_REQUEST,
    CHAT_BOOK_SUCCESS,
    CHAT_BOOK_FAIL,
    UPDATE_COACH_PROFILE,
  } = require('../libs/actionTypes');

import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;

const Chat = require('../services/Chat');
import Toast from 'react-native-simple-toast';

import {Actions} from 'react-native-router-flux';

//chat Q &A
export function bookRequest() {
  return {
    type: CHAT_BOOK_REQUEST
  };
}

export function bookSuccess() {
  return {
    type: CHAT_BOOK_SUCCESS,
  };
}
export function bookFail() {
  return {
    type: CHAT_BOOK_FAIL,
  };
}

export function updateCoachProfile() {
  return {
    type: UPDATE_COACH_PROFILE
  }
}

export function chatBook(id, time) {
  return dispatch => {
    dispatch(bookRequest())
    return Chat.chatBook(id, time).then((res) => {
      switch(res.status) {
        case 200:
          Actions.chatBox2();
          dispatch(updateCoachProfile())
          dispatch(bookSuccess());
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(bookFail());
          return;
      }
    }).catch((err) => {
      return dispatch(bookFail())
    })
  }
}

//chat Q &A
export function chatQARequest() {
  return {
    type: CHAT_QA_REQUEST
  };
}

export function chatQASuccess() {
  return {
    type: CHAT_QA_SUCCESS,
  };
}
export function chatQAFail() {
  return {
    type: CHAT_QA_FAIL,
  };
}

export function chatQA(product_id, product_name, typeQA, full_name, avatar, city, skintest) {
  return dispatch => {
    dispatch(chatQARequest())
    return Chat.chatQA(product_id, product_name, typeQA, full_name, avatar, city, skintest).then((res) => {
      switch(res.status) {
        case 200:
          Actions.chatQAStep31({data: res.room})
          dispatch(chatQASuccess());
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(chatQAFail());
          return;
      }
    }).catch((err) => {
      return dispatch(chatQAFail())
    })
  }
}

//load chat recent
export function chatRecentRequest() {
  return {
    type: CHAT_RECENT_REQUEST
  };
}

export function chatRecentSuccess(data, action, direct) {
  return {
    type: CHAT_RECENT_SUCCESS,
    data: data,
    action: action,
    direct: direct
  };
}
export function chatRecentFail() {
  return {
    type: CHAT_RECENT_FAIL,
  };
}

export function chatRecent(direct, action, page= 1) {
  return dispatch => {
    return Chat.chatRecent(direct, page).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(chatRecentSuccess(res.data, action, direct))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(chatRecentFail());
          return;
      }
    }).catch((err) => {
      return dispatch(chatRecentFail())
    })
  }
}


