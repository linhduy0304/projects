
'use strict';

const InitialState = require('./state').default;
  
const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  } = require('../../config/actionTypes');

const initialState = new InitialState;

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case SEARCH_REQUEST:
      if(action.action === 'L') {
        return state.setIn(['loading'], true);
      }else {
        return state.setIn(['loading'], null);
      }
    case SEARCH_SUCCESS:
      if(action.typeLoad === 'posts') {
        if(action.action === 'LM') {
          return state.removeIn(['searchPost'])
                      .setIn(['searchPost'], state.getIn(['searchPost']).concat(action.data))
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null)
                      .setIn(['loading'], null);
        } else {
          return state.setIn(['loading'], null)
                      .setIn(['searchPost'], action.data)
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null);
        }
      }else {
        if(action.action === 'LM') {
          return state.removeIn(['searchUser'])
                      .setIn(['searchUser'], state.getIn(['searchUser']).concat(action.data))
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null)
                      .setIn(['loading'], null);
        } else {
          return state.setIn(['loading'], null)
                      .setIn(['searchUser'], action.data)
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null);
        }
      }
      
    case SEARCH_FAIL: 
      return state.setIn(['loading'], null)
  }
 
  return state;
}
