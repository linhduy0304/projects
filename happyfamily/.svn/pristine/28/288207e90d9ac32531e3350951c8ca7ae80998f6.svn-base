
'use strict'
import { Alert } from 'react-native';
import {Actions} from 'react-native-router-flux'
import SimpleToast from 'react-native-simple-toast';
const {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,
  POST_STATUS_REQUEST,
  POST_STATUS_SUCCESS,
  POST_STATUS_FAIL,
  POST_IMAGE_SUCCESS,
  CONFIRM_RELATION_REQUEST,
  CONFIRM_RELATION_SUCCESS,
  CONFIRM_RELATION_FAIL,
} = require('../config/actionTypes');
const Home = require('../services/Home');

//relationship
export function relationshipRequest(action) {
  return {
    type: CONFIRM_RELATION_REQUEST,
    action
  }
}

export function relationshipSuccess(id) {
  return {
    type: CONFIRM_RELATION_SUCCESS,
    id,
  }
}

export function relationshipFail() {
  return {
    type: CONFIRM_RELATION_FAIL,
  }
}

export function relationship(id, body) {
  return dispatch => {
    dispatch(relationshipRequest());
    return Home.relationship(id, body).then(res => {
      switch(res.status) {
        case 200:
          SimpleToast.show(res.message)
          dispatch(relationshipSuccess(id));
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(relationshipFail())
          return;
        default:
          SimpleToast.show(res.errors)
          dispatch(relationshipFail());
          return;
      }
    })
  }
}

//
export function postStatusRequest() {
  return {
    type: POST_STATUS_REQUEST,
  }
}

export function postStatusSuccess(data) {
  return {
    type: POST_STATUS_SUCCESS,
    data
  }
}
export function postImageSuccess() {
  return {
    type: POST_IMAGE_SUCCESS,
  }
}
export function postStatusFail() {
  return {
    type: POST_STATUS_FAIL,
  }
}
 //text
export function postStatus(body) {
  return dispatch => {
    dispatch(postStatusRequest());
    return Home.postStatus(body).then(res => {
      switch(res.status) {
        case 200:
          SimpleToast.show('Đăng bài thành công')
          dispatch(postStatusSuccess(res.message));
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(postStatusFail())
          return;
        default:
          dispatch(postStatusFail());
          return;
      }
    })
  }
}

//images
export function postStatusImage(body, images) {
  return dispatch => {
    dispatch(postStatusRequest());
    return Home.postStatus(body).then(res => {
      switch(res.status) {
        case 200:
          Home.postImage(images, res.data.id).then(resImage => {
            if(resImage.status !== 200) {
              Alert.alert(
                'Thông báo!',
                'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
                [{text: 'Ok', style: 'cancel'}],
              );
              dispatch(postStatusFail())
              return;
            }
          })
          // for(var i = 0; i < images.length; i++) {
          //   Home.postImage(images[i], res.data.id).then(resImage => {
          //     console.log(resImage)
          //     if(resImage.status !== 200) {
          //       Alert.alert(
          //         'Thông báo!',
          //         'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
          //         [{text: 'Ok', style: 'cancel'}],
          //       );
          //       dispatch(postStatusFail())
          //       return;
          //     }
          //   })
          // }
          SimpleToast.show('Đăng bài thành công')
          dispatch(postImageSuccess());
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(postStatusFail())
          return;
        default:
          dispatch(postStatusFail());
          return;
      }
    })
  }
}

//home
export function homeRequest(action) {
  return {
    type: HOME_REQUEST,
    action
  }
}

export function homeSuccess(data, requests, action) {
  return {
    type: HOME_SUCCESS,
    data,
    action,
    requests,
  }
}

export function homeFail() {
  return {
    type: HOME_FAIL,
  }
}

export function loadHome(action = 'L', page = 1) {
  return dispatch => {
    dispatch(homeRequest(action));
    return Home.home(page).then(res => {
      switch(res.status) {
        case 200:
          dispatch(homeSuccess(res.data, res.requests, action));
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(homeFail())
          return;
        default:
          dispatch(homeFail());
          return;
      }
    })
  }
}
