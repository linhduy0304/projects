'use strict';
const {
    LIKE_REQUEST,
    LIKE_SUCCESS,
    LIKE_FAIL,
    COMMENTS_REQUEST,
    COMMENTS_SUCCESS,
    COMMENTS_FAIL,
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAIL,

  } = require('../libs/actionTypes');

import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;

const Common = require('../services/Common');
import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';



//edit Comment
export function editCommentSuccess(data) {
  return {
    type: EDIT_COMMENT_SUCCESS,
    data: data
  };
}

export function editCommentFail(error) {
  return {
    type: EDIT_COMMENT_FAIL,
    error: error
  };
}

export function editComment(id, content, img = '') {
  return dispatch => {
    return Common.editComment(id, content, img)
      .then(function (res) {
        switch(res.status) {
          case 200:
            Toast.show('Chỉnh sửa thành công');
            dispatch(editCommentSuccess(res.data));
            return;
          case 500: 
            Actions.login({type: 'reset'});
            return;
          default:
            Toast.show('Chỉnh sửa không thành công.Vui lòng thử lại.');
            dispatch(editCommentFail(res.errors));
            return;
        }
      })
      .catch((error) => {
          dispatch(editCommentFail());
      });
  };
}

//delete commnet
export function deleteCommentSuccess() {
  return {
    type:  DELETE_COMMENT_SUCCESS,
  };
}
export function deleteCommentFail(error) {
  return {
    type: DELETE_COMMENT_FAIL,
    error: error
  };
}

export function deleteComment(id, target_id){
  return dispatch => {
    Common.deleteComment(id)
      .then((res) => {
        switch(res.status) {
          case 200:
            Toast.show(res.message);
            dispatch(deleteCommentSuccess());
            return;
          case 500: 
            Actions.login({type: 'reset'});
            return;
          default:
            Toast.show(res.errors);
            dispatch(deleteCommentFail(res.errors));
            return;
        }
      })
      .catch((error) => {
        dispatch(deleteCommentFail(error));
      });
  };
}
//action comment
export function commentRequest() {
  return {
    type: COMMENT_REQUEST
  };
}

export function commentSuccess(data) {
  return {
    type:  COMMENT_SUCCESS,
    data: data
  };
}
export function commentFail(error) {
  return {
    type: COMMENT_FAIL,
    error: error
  };
}
export function comment(id, type, content, image, parentId) {
  return dispatch => {
    dispatch(commentRequest());
    Common.comment(id, type, content, image, parentId)
      .then((res) => {
        switch(res.status) {
          case 200:
            dispatch(commentSuccess(res.data));
            return;
          case 500: 
            Actions.login({type: 'reset'});
            return;
          default:
            Toast.show(res.errors)
            dispatch(commentFail(res.errors));
            return;
        }
      })
      .catch((error) => {
        dispatch(commentFail());
      });
  };
}

//load comments
export function commentsRequest(action) {
  return {
    type: COMMENTS_REQUEST,
    action: action
  };
}

export function commentsSuccess(data, page) {
  return {
    type:  COMMENTS_SUCCESS,
    data: data,
    page: page
  };
}
export function commentsFail() {
  return {
    type: COMMENTS_FAIL,
  };
}

export function loadComments(type, target_id, page, parent_id, action) {
  return dispatch => {
    dispatch(commentsRequest(action));
    return Common.loadComments(type, target_id, page, parent_id).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(commentsSuccess(res.data, page))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(commentsFail());
          return;
      }
    }).catch((err) => {
      return dispatch(commentsFail())
    })
  }
}

//action like
export function likeRequest() {
  return {
    type: LIKE_REQUEST
  };
}

export function likeSuccess() {
  return {
    type: LIKE_SUCCESS,
  };
}
export function likeFail() {
  return {
    type: LIKE_FAIL,
  };
}

export function like(id, type, isLike) {
  return dispatch => {
    return Common.like(id, type).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(likeSuccess())
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(likeFail());
          return;
      }
    }).catch((err) => {
      return dispatch(likeFail())
    })
  }
}


