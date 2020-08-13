

import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,
  HOME_DETAIL_REQUEST,
  HOME_DETAIL_SUCCESS,
  HOME_DETAIL_FAIL,
} from '../config/types';
const Home = require('../services/Home');

//getHome
export const homeDetailRequest = (action, load) => {
  return {
    type: HOME_DETAIL_REQUEST,
    action,
    load
  }
}
export const homeDetailSuccess = (data, action, load) => {
  return {
    type: HOME_DETAIL_SUCCESS,
    data,
    action,
    load
  }
}

export const homeDetailFail = () => {
  return {
    type: HOME_DETAIL_FAIL,
  }
}

export const homeDetail = (action, load = 'L', page = 1) => {
  return dispatch => {
    dispatch(homeDetailRequest(action, load))
    return Home.getHomeMore(action, page)
      .then(res => {
        if(action === 'madeBy') {
          dispatch(homeDetailSuccess(res, action, load));
          return
        }
        switch(res.meta.code) {
          case 1:
            dispatch(homeDetailSuccess(res.data, action, load));
            return;
          default:
            dispatch(homeDetailFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(homeDetailFail())
      });
  };
}

//getHome
export const getHomeRequest = (action) => {
  return {
    type: HOME_REQUEST,
    action,
  }
}
export const getHomeSuccess = (data, action) => {
  return {
    type: HOME_SUCCESS,
    data,
    action,
  }
}

export const getHomeFail = (action) => {
  return {
    type: HOME_FAIL,
    action,
  }
}

export const getHome = (action) => {
  return dispatch => {
    dispatch(getHomeRequest(action))
    return Home.getHome(action)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(getHomeSuccess(res.data, action));
            return;
          default:
            dispatch(getHomeFail(action));
            return;
        }
      })
      .catch((error) => {
        dispatch(getHomeFail(action))
      });
  };
}


