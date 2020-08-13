

import {
  PROFILE_SUCCESS,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  ABOUT_REQUEST,
  ABOUT_SUCCESS,

  SAVE_CONTACT_REQUEST,
  SAVE_CONTACT_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,

  TAKE_MONEY_REQUEST,
  TAKE_MONEY_SUCCESS,
  TAKE_MONEY_FAIL,
  ORDER_CANCEL_SUCCESS,
  GET_MONEY_SUCCESS
} from '../config/types';

const initialState = {
  user: null,
  loading: null,
  loadingMoney: null,

  listOrder: null,
  about: null,
  orderDetail: null,
  loadMore: null,
  money: null
}
export default function profile (state = initialState, action) {
  switch(action.type) {
    case GET_MONEY_SUCCESS:
     return {
       ...state,
       money: action.data
     }
    //cancel order
    case ORDER_CANCEL_SUCCESS:
      var listOrder = state.listOrder;
      for(let i of listOrder) {
        if(i.id == action.id) {
          i.status = 5;
          return {
            ...state,
            loadingMoney: null,
            listOrder
          }
        }
      }
      return {
        ...state,
        loadingMoney: null,
      }
      
    case TAKE_MONEY_REQUEST:
      return {
        ...state,
        loadingMoney: true,
      }
    case TAKE_MONEY_SUCCESS:
      var money = state.money;
      money['available'] = 0;
      money['pending'] = action.pending_money;
      money['withDraw'] = action.data;
      return {
        ...state,
        money,
        loadingMoney: null,
      }
    case TAKE_MONEY_FAIL:
      return {
        ...state,
        loadingMoney: null,
      }

    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        orderDetail: null
      }
    case ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: null,
        orderDetail: action.data
      }
    //contact
    case SAVE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SAVE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: null,
      }

    //about
    case ABOUT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ABOUT_SUCCESS:
      return {
        ...state,
        loading: null,
        about: action.data
      }
    //update address
    case UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: null,
      }
    case UPDATE_ADDRESS_FAIL:
      return {
        ...state,
        loading: null
      }
    
    //edit profile
    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: null,
        user: action.data
      }
    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        loading: null
      }

    case ORDER_REQUEST:
      var loading = action.action == 'L' ? true : null
      return {
        ...state,
        loading
      }
    case ORDER_SUCCESS:
      var loadMore = action.data.length == 10 ? true : null
      if(action.action == 'LM') {
        var listOrder = state.listOrder;
        listOrder = listOrder.concat(action.data)
        return {
          ...state,
          loading: null,
          loadMore,
          listOrder
        }
      }
        return {
          ...state,
          loading: null,
          loadMore,
          listOrder: action.data
        }
      
    case ORDER_FAIL:
      return {
        ...state,
        loading: null
      }

    case PROFILE_SUCCESS:
      return {
        ...state,
        user: action.data
      }
    default: 
      return state
  }
}