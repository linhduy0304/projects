'use strict';
const {
    SD_ADD_REQUEST,
    SD_ADD_SUCCESS,
    SD_ADD_FAIL,
    SD_DELETE_REQUEST,
    SD_DELETE_SUCCESS,
    SD_DELETE_FAIL,
    SD_COACH_REQUEST,
    SD_COACH_SUCCESS,
    SD_COACH_FAIL,
    SD_SEND_REQUEST,
    SD_SEND_SUCCESS,
    SD_SEND_FAIL,
    UPDATE_SKINDIARY,
    ADD_SKINDIARY
  } = require('../libs/actionTypes');

import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;

const SkinDiary = require('../services/SkinDiary');
import Toast from 'react-native-simple-toast';

import {Actions} from 'react-native-router-flux';

//send coach
export function sendRequest() {
  return {
    type: SD_SEND_REQUEST
  };
}

export function sendSuccess() {
  return {
    type: SD_SEND_SUCCESS,
  };
}
export function sendFail() {
  return {
    type: SD_SEND_FAIL,
  };
}

export function send(id, body) {
  return dispatch => {
    dispatch(coachRequest())
    return SkinDiary.send(id, body).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(sendSuccess())
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(sendFail());
          return;
      }
    }).catch((err) => {
      return dispatch(sendFail())
    })
  }
}

//laod coach
export function coachRequest() {
  return {
    type: SD_COACH_REQUEST
  };
}

export function coachSuccess(data) {
  return {
    type: SD_COACH_SUCCESS,
    data: data
  };
}
export function coachFail() {
  return {
    type: SD_COACH_FAIL,
  };
}

export function coach() {
  return dispatch => {
    dispatch(coachRequest())
    return SkinDiary.coach().then((res) => {
      switch(res.status) {
        case 200:
          dispatch(coachSuccess(res.data))  
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(coachFail());
          return;
      }
    }).catch((err) => {
      return dispatch(coachFail())
    })
  }
}

//delete
export function deleteRequest() {
  return {
    type: SD_DELETE_REQUEST
  };
}

export function deleteSuccess() {
  return {
    type: SD_DELETE_SUCCESS,
  };
}
export function deleteFail() {
  return {
    type: SD_DELETE_FAIL,
  };
}

export function updateSkinDiary(id) {
  return {
    type: UPDATE_SKINDIARY,
    id: id
  };
}

export function skinDiaryDelete(id) {
  return dispatch => {
    dispatch(deleteRequest())
    return SkinDiary.skinDiaryDelete(id).then((res) => {
      switch(res.status) {
        case 200:
          Actions.pop();
          dispatch(updateSkinDiary(id));
          dispatch(deleteSuccess(id));
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          Toast.show(res.errors);
          dispatch(deleteFail());
          return;
      }
    }).catch((err) => {
      return dispatch(deleteFail())
    })
  }
}

//add skindiary
export function sdAddRequest() {
  return {
    type: SD_ADD_REQUEST
  };
}

export function sdAddSuccess() {
  return {
    type: SD_ADD_SUCCESS,
  };
}
export function sdAddFail() {
  return {
    type: SD_ADD_FAIL,
  };
}

export function addSkinDiary(data) {
  return {
    type: ADD_SKINDIARY,
    data: data
  };
}

export function skinDiaryAdd(image, description) {
  return dispatch => {
    dispatch(sdAddRequest())
    return SkinDiary.skinDiaryAdd(image, description).then((res) => {
      switch(res.status) {
        case 200:
          Actions.pop();
          dispatch(addSkinDiary(res.data))
          dispatch(sdAddSuccess())
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          Toast.show(res.errors);
          dispatch(sdAddFail());
          return;
      }
    }).catch((err) => {
      return dispatch(sdAddFail())
    })
  }
}


