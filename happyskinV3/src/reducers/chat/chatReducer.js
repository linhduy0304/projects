
'use strict';
const InitialState = require('./chatInitialState').default;

const {
  CHAT_RECENT_REQUEST,
  CHAT_RECENT_SUCCESS,
  CHAT_RECENT_FAIL,
  CHAT_QA_REQUEST,
  CHAT_QA_SUCCESS,
  CHAT_QA_FAIL,
  CHAT_BOOK_REQUEST,
  CHAT_BOOK_SUCCESS,
  CHAT_BOOK_FAIL,
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function chatReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

    //chat QA
    case CHAT_QA_REQUEST:
      return state.setIn(['isFetching'], true);
    case CHAT_QA_SUCCESS: 
      return state.setIn(['isFetching'], false);
    case CHAT_QA_FAIL:
      return state.setIn(['isFetching'], false);

    //chat recent
    case CHAT_RECENT_REQUEST:
      return state.setIn(['isFetching'], true);

    case CHAT_RECENT_SUCCESS: 
      if(action.direct == '15M') {
        return state.setIn(['isFetching'], false).setIn(['chat15M'],action.action == 'LM' ? state.getIn(['chat15M']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false);
      }else return state.setIn(['isFetching'], false).setIn(['chatRecent'],action.action == 'LM' ? state.getIn(['chatRecent']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false);

    case CHAT_RECENT_FAIL:
      return state.setIn(['isFetching'], false);
  }
  return state;
}
