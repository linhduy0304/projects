
'use strict';

const InitialState = require('./state').default;

const {
  CHATS_REQUEST,
  CHATS_SUCCESS,
  CHATS_FAIL, 
  CHAT_DETAIL_REQUEST,
  CHAT_DETAIL_SUCCESS,
  CHAT_DETAIL_FAIL,
  FRIEND_LIST_REQUEST,
  FRIEND_LIST_SUCCESS,
  FRIEND_LIST_FAIL,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAIL,
  SEND_SUCCESS,
  SEND_FAIL,
  } = require('../../config/actionTypes');

const initialState = new InitialState;

export default function reducer(state = initialState, action) {

  switch (action.type) {

    //send
    case SEND_SUCCESS:
    case SEND_FAIL:
      return state

    //creategorup
    case CREATE_GROUP_REQUEST:
      return state.setIn(['loading'], true);
    case CREATE_GROUP_SUCCESS:
      var chats = state.getIn(['chats']);
      chats: chats.unshift(action.data)
      return state.setIn(['loading'], null).setIn(['chats'], chats);
    case CREATE_GROUP_FAIL:
      return state.setIn(['loading'], null)

    //friend list
    case FRIEND_LIST_REQUEST:
      return state.setIn(['loading'], true);
    case FRIEND_LIST_SUCCESS:
      return state.setIn(['loading'], null).setIn(['friendList'], action.data);
    case FRIEND_LIST_FAIL:
      return state.setIn(['loading'], null)

    //caht detail
    case CHAT_DETAIL_REQUEST:
      return state.setIn(['loading'], true);
    case CHAT_DETAIL_SUCCESS:
      return state.setIn(['loading'], null).setIn(['chatDetail'], action.data);
    case CHAT_DETAIL_FAIL:
      return state.setIn(['loading'], null)

    //chat list
    case CHATS_REQUEST:
      return state.setIn(['loading'], action.action ===  'L' ? true : null);
    case CHATS_SUCCESS:
      return state.setIn(['loading'], null).setIn(['chats'], action.data);
    case CHATS_FAIL:
      return state.setIn(['loading'], null)
  }
 
  return state;
}
