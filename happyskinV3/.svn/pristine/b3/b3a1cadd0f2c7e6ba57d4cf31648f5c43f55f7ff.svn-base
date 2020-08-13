
'use strict';
const {
	EMPTY_DATA_USER,
	CHANGE_PASSWORD_REQUEST,
	CHANGE_PASSWORD_SUCCESS,
	CHANGE_PASSWORD_FAILURE,
	FEEDBACK_REQUEST,
	FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
  PROFILE_USER_SUCCESS,
  PROFILE_USER_REQUEST,
  PROFILE_USER_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  OTHER_PROFILE_REQUEST,
  OTHER_PROFILE_SUCCESS,
  OTHER_PROFILE_FAIL,
} = require('../libs/actionTypes');

import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;
const Profile = require('../services/Profile');
var buffer = require('buffer');
import {Actions} from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';

//otherProfile
export function otherProfileRequest() {
  return {
    type: OTHER_PROFILE_REQUEST
  };
}

export function otherProfileSuccess(data) {
  return {
    type: OTHER_PROFILE_SUCCESS,
    data: data
  };
}
export function otherProfileFail() {
  return {
    type: OTHER_PROFILE_FAIL,
  };
}

export function otherProfile(id){
  return dispatch => {
    Profile.otherProfile(id).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(otherProfileSuccess(res.data));
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(otherProfileFail());
          return;
      }
      })
      .catch((error) => {
        dispatch(otherProfileFail(error));
      });
  }
}

//edit Profile
export function editProfileRequest() {
  return {
    type: EDIT_PROFILE_REQUEST
  };
}

export function editProfileSuccess(data) {
  return {
    type: EDIT_PROFILE_SUCCESS,
    data: data
  };
}
export function editProfileFail() {
  return {
    type: EDIT_PROFILE_FAIL,
  };
}

export function editProfile(dataUser){
  return dispatch => {
    dispatch(editProfileRequest());
    Profile.editProfile(dataUser)
      .then((res) => {
        switch(res.status) {
          case 200:
            Toast.show('Cập nhật thành công');
            Actions.tab({page: 'profile', type:'reset'})
            dispatch(editProfileSuccess(res.data));
            return;
          case 500: 
            Actions.login({type: 'reset'});
            return;
          default:
            Toast.show('Cập nhật không thành công');
            dispatch(editProfileFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(editProfileFail(error));
      });
  }
}

//load data User
export function dataUserRequest() {
  return {
    type: PROFILE_USER_REQUEST
  }
}
export function dataUserSuccess(data) {
  return {
    type: PROFILE_USER_SUCCESS,
    data: data
  }
}
export function dataUserFail() {
  return {
    type: PROFILE_USER_FAIL
  }
}
export function dataUser() {
  return dispatch => {
    dispatch(dataUserRequest());
    Profile.dataUser()
    .then((res) => {
      switch(res.status) {
        case 200:
          dispatch(dataUserSuccess(res.data))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(dataUserFail(res.error))
          return;
      }
    })
    .catch((error) => {
      dispatch(dataUserFail(error))
    })
  }
}



export function emptyDataUser(){
  return {
    type: EMPTY_DATA_USER
  }
}

export function changePasswordRequest(){
  return {
    type: CHANGE_PASSWORD_REQUEST
  };
}

export function changePasswordSuccess(data){
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    data: data
  };
}

export function changePasswordFailure(error){
  return {
    type: CHANGE_PASSWORD_FAILURE,
    error: error
  };
}


export function feedBackRequest(){
  return {
    type: FEEDBACK_REQUEST
  };
}

export function feedBackSuccess(data){
  return {
    type: FEEDBACK_SUCCESS,
    data: data
  };
}

export function feedBackFailure(error){
  return {
    type: FEEDBACK_FAILURE,
    error: error
  };
}

export function logout(notipush_key) {
  return dispatch => {
    Profile.updateStatus(notipush_key)
    new StoreService().deleteSessionToken(Constant.HS_HEADER_REQUEST);
    new StoreService().deleteSessionToken(Constant.HS_IS_LOGIN);
    new StoreService().deleteSessionToken(Constant.HS_SKIN_QUESTION);
    new StoreService().deleteSessionToken(Constant.HS_SKIN_IS_FINISHED);
    new StoreService().deleteSessionToken(Constant.HS_SKIN_CONTINUE_PAGE);
    emptyDataUser();
    Actions.login({'type' : 'reset'});
  };
}

export function changePassword(data, username){
    return dispatch => {
        dispatch(changePasswordRequest());
        Profile.changePassword(data)
        .then((res) => {
          switch(res.status) {
            case 200:
              var b = new buffer.Buffer(username + ':' + data.newsPassword);
              var auth = 'Basic ' + b.toString('base64');
              var headers = {
                'Authorization': auth,
                'Fbtoken': '',
                'Gotoken': '',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              };
              new StoreService().storeSession(Constant.HS_HEADER_REQUEST, headers);
              Toast.show(res.messages);
              dispatch(changePasswordSuccess(res.data));
              return;
            case 500: 
              Actions.login({type: 'reset'});
              return;
            default:
              Toast.show(res.errors);
              dispatch(changePasswordFailure(res.errors));
              return;
          }
        })
        .catch((error) => {
          	dispatch(changePasswordFailure(error));
        });
  }
}

export function feedBack(data){
  return dispatch => {
    dispatch(feedBackRequest());
    Profile.feedBack(data)
      .then((res) => {
        switch(res.status) {
          case 200:
            Toast.show(res.messages);
            dispatch(feedBackSuccess(res.messages));
            return;
          case 500: 
            Actions.login({type: 'reset'});
            return;
          default:
            Toast.show(res.errors);
            dispatch(feedBackFailure(res.errors));
            return;
        }
      })
      .catch((error) => {
        dispatch(feedBackFailure(error));
      });
  }
}



