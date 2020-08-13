

import {
  CREATE_ORDER,
  CART_ADDRESS_REQUEST,
  CART_ADDRESS_SUCCESS,
  CART_ADDRESS_FAIL,

  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,

  EDIT_ADDRESS_SUCCESS,

  DELETE_ADDRESS_SUCCESS,
  CART_VERIFY_SUCCESS,
  GET_SHIP_SUCCESS
} from '../config/types';

const initialState = {
  loading: null,
  orders: null,
  address: null,
  totalPrice: null,
  totalWeight: null,
  ship: null
}

export default function search (state = initialState, action) {
  switch(action.type) {
    //get ship/kg
    case GET_SHIP_SUCCESS:
      return {
        ...state,
        ship: action.data
      }

    case CART_VERIFY_SUCCESS: 
      return {
        ...state,
        loading: null,
        orders: null
      }
    //delelte
    case DELETE_ADDRESS_SUCCESS:
      var address = state.address;
      var del = address.filter(a => a.id !== action.id);
      return {
        ...state,
        address: del
      }

    //edit
    case EDIT_ADDRESS_SUCCESS:
      var address = state.address;
      for(var i = 0; i < address.length; i++) {
        if(address[i].id == action.id) {
          address[i] = action.data;
          return {
            ...state,
            loading: null,
            address: address,
          }
        }
      }
      return {
        ...state,
        loading: null,
      }
      // for(let i of address) {
      //   if(i.id == action.id) {
      //     i = action.data;
      //     console.log(i)
      //     return {
      //       ...state,
      //       loading: null,
      //       address: address,
      //     }
      //   }
      // }

      //add address
    case ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
    }
    case ADD_ADDRESS_SUCCESS:
      var address = state.address;
      address.unshift(action.data);
      return {
        ...state,
        loading: null,
        address
    }
    case ADD_ADDRESS_FAIL:
      return {
        ...state,
        loading: null,
    }

      //load address
    case CART_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
    }
    case CART_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: null,
        address: action.data
    }
    case CART_ADDRESS_FAIL:
      return {
        ...state,
        loading: null,
    }

    case CREATE_ORDER:
      return {
        ...state,
        totalPrice: action.totalPrice,
        totalWeight: action.totalWeight,
        orders: action.data
    }
    default: 
      return state
  }
}