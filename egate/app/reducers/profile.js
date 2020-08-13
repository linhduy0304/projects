

import {
  CHECK_SECURITY_SUCCESS
} from '../config/types';

const initialState = {
  checkPincode: null
}

export default function profile (state = initialState, action) {
  switch(action.type) {
    case CHECK_SECURITY_SUCCESS:
      return {
        ...state,
        checkPincode: action.data
      }
    
    default: 
      return state
  }
}