

import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../config/types';

const initialState = {
  search: null,
  loading: null
}

export default function search (state = initialState, action) {
  switch(action.type) {
    case SEARCH_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: null,
        search: action.data
      }
    default: 
      return state
  }
}