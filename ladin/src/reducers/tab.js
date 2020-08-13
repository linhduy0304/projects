

import {
    SET_TAB,
  } from '../config/types';
  
  const initialState = {
    tab: 'home',
  }
  
  export default function tab (state = initialState, action) {
    switch(action.type) {
      case SET_TAB: 
        return {
          ...state,
          tab: action.data
        }
      default: 
        return state
    }
  }