
'use strict';
const InitialState = require('./searchInitialState').default;

const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function searchReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {
    case SEARCH_REQUEST:
      return state.setIn(['isFetching'], action.action == 'L' ? true : false);
    
    case SEARCH_SUCCESS:
     switch(action.typeSearch) {
      case 'product':
        return state.setIn(['isFetching'], false).setIn(['product'], action.action == 'LM' ? state.getIn(['product']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false).setIn(['kwProduct'], action.keyword);
      case 'post':
        return state.setIn(['isFetching'], false).setIn(['post'], action.action == 'LM' ? state.getIn(['post']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false).setIn(['kwPost'], action.keyword);
      case 'routine':
        return state.setIn(['isFetching'], false).setIn(['routine'], action.action == 'LM' ? state.getIn(['routine']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false).setIn(['kwRoutine'], action.keyword);
      case 'coach':
        return state.setIn(['isFetching'], false).setIn(['coach'], action.action == 'LM' ? state.getIn(['coach']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false).setIn(['kwCoach'], action.keyword);
     }
     
    
    case SEARCH_FAIL: 
      return state.setIn(['isFetching'], false)
  }
  return state;
}
