

import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../config/types';

const Const = require('../services/Const');
const Search = require('../services/Search');

//getHome
export const searchRequest = () => {
  return {
    type: SEARCH_REQUEST,
  }
}
export const searchSuccess = (data) => {
  return {
    type: SEARCH_SUCCESS,
    data,
  }
}

export const searchFail = () => {
  return {
    type: SEARCH_FAIL,
  }
}

export const actionSearch = (body) => {
  return dispatch => {
    dispatch(searchRequest())
    return Search.search(body)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(searchSuccess(res.data));
            return;
          default:
            dispatch(searchFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(searchFail())
      });
  };
}