

import {
  LOGIN_REQUEST,
  LOGIN_SUCC,
  LOGIN_FAIL,
  SET_LOGIN,
  UPDATE_REQUEST,
  CITIES_SUCCESS,
  BANKS_SUCCESS,
  COUNTRIES_SUCCESS
} from '../config/types';

const initialState = {
  auth: null,
  currentUser: null,
  loading: null,
  isLogin: null,
  updateRequest: null,
  cities: null,
  banks: null,
  countries: null,
}

export default function auth (state = initialState, action) {
  switch(action.type) {
    case COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.data
      }
    case BANKS_SUCCESS:
      return {
        ...state,
        banks: action.data
      }
    case CITIES_SUCCESS:
      return {
        ...state,
        cities: action.data
      }
    case UPDATE_REQUEST:
      return {
        ...state,
        updateRequest: action.data
      }
    case SET_LOGIN:
      return {
        ...state,
        isLogin: action.data
      }
    case LOGIN_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case LOGIN_FAIL:
    case LOGIN_SUCC: 
      return {
        ...state,
        loading: null
      }
    default: 
      return state
  }
}