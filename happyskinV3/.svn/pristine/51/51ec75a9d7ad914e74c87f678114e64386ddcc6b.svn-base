
'use strict';
const InitialState = require('./moreInitialState').default;

const {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAIL,
  POSTLIKED_REQUEST,
  POSTLIKED_SUCCESS,
  POSTLIKED_FAIL,
  SPOINT_REQUEST,
  SPOINT_SUCCESS,
  SPOINT_FAIL
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function moreReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

    case SPOINT_REQUEST:
      return state.setIn(['isFetching'], true);
  
    case SPOINT_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['spoint'],action.action == 'LM' ? state.getIn(['spoint']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false);
    
    case SPOINT_FAIL: 
      return state.setIn(['isFetching'], false);

    case POSTLIKED_REQUEST:
      return state.setIn(['isFetching'], true);
  
    case POSTLIKED_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['postLiked'],action.action == 'LM' ? state.getIn(['postLiked']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false);
    
    case POSTLIKED_FAIL: 
      return state.setIn(['isFetching'], false);

    case NOTIFICATION_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case NOTIFICATION_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['notifications'],action.action == 'LM' ? state.getIn(['notifications']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false);
    
    case NOTIFICATION_FAIL: 
      return state.setIn(['isFetching'], false);

    
  }
  return state;
}
