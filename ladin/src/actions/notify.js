

import {
  NOTIFY_REQUEST,
  NOTIFY_SUCCESS,
  NOTIFY_FAIL,
  NOTIFY_DETAIL_SUCCESS,
  SET_ARR_NOTI,
  COUNT_NOTIFY
} from '../config/types';

const Notify = require('../services/Notify');
//getCountNoti
export const getCountNotiSuccess = (data) => {
  return {
    type: COUNT_NOTIFY,
    data,
  }
}

export const getCountNoti = () => {
  return dispatch => {
    return Notify.getCountNoti()
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(getCountNotiSuccess(res.data));
            return;
          default:
            return;
        }
      })
      .catch((error) => {
      });
  };
}

export const setArrNoti = (data) => {
  return {
    type: SET_ARR_NOTI,
    data,
  }
}
//notiDetail
export const notiDetailSuccess = (data, id) => {
  return {
    type: NOTIFY_DETAIL_SUCCESS,
    data,
    id
  }
}
export const notiDetail = (id) => {
  return dispatch => {
    dispatch(notifyRequest())
    return Notify.notiDetail(id)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(notiDetailSuccess(res.data, id));
            return;
          default:
            dispatch(notifyFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(notifyFail())
      });
  };
}
//getHome
export const notifyRequest = (action) => {
  return {
    type: NOTIFY_REQUEST,
    action
  }
}
export const notifySuccess = (data, action) => {
  return {
    type: NOTIFY_SUCCESS,
    data,
    action
  }
}

export const notifyFail = () => {
  return {
    type: NOTIFY_FAIL,
  }
}

export const loadNoti = (action = 'L', page = 1) => {
  return dispatch => {
    dispatch(notifyRequest(action))
    return Notify.loadNoti(page)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(notifySuccess(res.data, action));
            return;
          default:
            dispatch(notifyFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(notifyFail())
      });
  };
}