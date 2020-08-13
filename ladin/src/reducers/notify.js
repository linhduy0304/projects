

import {
  NOTIFY_REQUEST,
  NOTIFY_SUCCESS,
  NOTIFY_FAIL,
  NOTIFY_DETAIL_SUCCESS,
  SET_ARR_NOTI,
  COUNT_NOTIFY

} from '../config/types';

const initialState = {
  notify: null,
  loading: null,
  notiDetail: null,
  arrNoti: null,
  countNoti: 0,
  loadMore: null,
}

export default function search (state = initialState, action) {
  switch(action.type) {
    case COUNT_NOTIFY:
      return {
        ...state,
        countNoti: action.data
      }
    case SET_ARR_NOTI:
      return {
        ...state,
        arrNoti: action.data
      }
      
    case NOTIFY_DETAIL_SUCCESS:
      var notify = state.notify;
      for(let i of notify) {
        if(i.id == action.id) {
          if(i.is_read == false) {
            i.is_read = true;
            return {
              ...state,
              loading: null,
              notify: notify,
              countNoti: state.countNoti -1,
              notiDetail: action.data
            }
          }else {
            return {
              ...state,
              loading: null,
              notify: notify,
              notiDetail: action.data
            }
          }
          
        }
      }

    case NOTIFY_REQUEST:
      var loading = action.action == 'L' ? true : null
      return {
        ...state,
        loading,
      }
    case NOTIFY_SUCCESS:
      var loadMore = action.data.length == 20 ? true : null
      if(action.action == 'LM') {
        var notify = state.notify;
        notify = notify.concat(action.data)
        return {
          ...state,
          loading: null,
          loadMore,
          notify
        }
      }else {
        return {
          ...state,
          loading: null,
          loadMore,
          notify: action.data
        }
      }
      
    case NOTIFY_FAIL:
      return {
        ...state,
        loading: null,
      }
    default: 
      return state
  }
}