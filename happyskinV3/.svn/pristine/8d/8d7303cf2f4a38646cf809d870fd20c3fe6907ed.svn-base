
'use strict';
const InitialState = require('./magazineInitialState').default;

const {
  MAGAZINE_REQUEST,
  MAGAZINE_SUCCESS,
  MAGAZINE_FAIL,
  VIDEO_DETAIL_REQUEST,
  VIDEO_DETAIL_SUCCESS,
  VIDEO_DETAIL_FAIL,
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAIL,
  EVENT_DETAIL_REQUEST,
  EVENT_DETAIL_SUCCESS,
  EVENT_DETAIL_FAIL,
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function magazineReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {
  
    //eventDetail
    case EVENT_DETAIL_REQUEST: 
      return state.setIn(['isFetching'], true).setIn(['eventDetail'], []);
    
    case EVENT_DETAIL_SUCCESS: 
      return state.setIn(['isFetching'], false).setIn(['eventDetail'], action.data);
    
    case EVENT_DETAIL_FAIL: 
      return state.setIn(['isFetching'], false);
    //load event
    case EVENT_REQUEST: 
      return state.setIn(['isFetching'], true).setIn(['event'], []).setIn(['loadMore'], false);
    
    case EVENT_SUCCESS: 
      return state.setIn(['isFetching'], false).setIn(['event'], action.action == 'LM' ? state.getIn(['event']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false);
    
    case EVENT_FAIL:
      return state.setIn(['isFetching'], false);

    case VIDEO_DETAIL_REQUEST: 
      return state.setIn(['isFetching'], true);
    
    case VIDEO_DETAIL_SUCCESS: 
      return state.setIn(['isFetching'], false).setIn(['videoDetail'], action.data);
    
    case VIDEO_DETAIL_FAIL: 
      return state.setIn(['isFetching'], false);

    case MAGAZINE_REQUEST: 
      return state.setIn(['isFetching'], true).setIn(['data'], []).setIn(['loadMore'], false);
    
    case MAGAZINE_SUCCESS: 
      
      return state.setIn(['isFetching'], false).setIn(['data'], action.action == 'LM' ? state.getIn(['data']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false).setIn(['videos'], action.typePost == 'video' ? action.data : []);
    
    case MAGAZINE_FAIL:
      return state.setIn(['isFetching'], false);
  }
  return state;
}
