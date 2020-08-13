

import {
  FETCH_LOGIN,
  LOGIN_SUCC,
  LOGIN_FAIL
} from '../actions/actionTypes';

const initialState = {
  auth: null,
  currentUser: null,
  loading: null
}

export default function auth (state = initialState, action) {
  switch(action.type) {
    case FETCH_LOGIN: 
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCC:
      return {
        ...state,
        currentUser: action.data,
        loading: null,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loading: null,
      }
    default: 
      return state
  }
}