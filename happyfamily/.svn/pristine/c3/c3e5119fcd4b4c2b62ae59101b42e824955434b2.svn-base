
'use strict';

const InitialState = require('./state').default;

const {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,
  POST_STATUS_REQUEST,
  POST_STATUS_SUCCESS,
  POST_STATUS_FAIL,
  POST_IMAGE_SUCCESS,
  CONFIRM_RELATION_REQUEST,
  CONFIRM_RELATION_SUCCESS,
  CONFIRM_RELATION_FAIL,
  } = require('../../config/actionTypes');

const initialState = new InitialState;

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case CONFIRM_RELATION_REQUEST:
      return state.setIn(['loadConfirm'], true);
    //confirm relation
    case CONFIRM_RELATION_SUCCESS:
      var requests = state.getIn(['requests']);
      var newRequests = requests.filter(a => a.id !== action.id);
      return state.setIn(['requests'], newRequests).setIn(['loadConfirm'], null);
    case CONFIRM_RELATION_FAIL:
      return state.setIn(['loadConfirm'], null);

    case POST_IMAGE_SUCCESS: 
      return state.setIn(['posting'], null).setIn(['closeModalStatus'], true);

    case POST_STATUS_REQUEST:
      return state.setIn(['posting'], true).setIn(['closeModalStatus'], null);
    case POST_STATUS_SUCCESS:
      var home = state.getIn(['home']);
      home.unshift(action.data)
      return state.setIn(['home'], home).setIn(['posting'], null).setIn(['closeModalStatus'], true);
    case POST_STATUS_FAIL:
      return state.setIn(['posting'], null);

    case HOME_REQUEST:
      return state.setIn(['loading'], action.action ==  'L' ? true : null);
    case HOME_SUCCESS:
      if(action.action === 'LM') {
        return state.setIn(['loading'], null)
                    .setIn(['home'], state.getIn(['home']).concat(action.data))
                    .setIn(['loadMore'], action.data.length >= 15 ? true : null);
      }else {
        return state.setIn(['loading'], null)
                    .setIn(['home'], action.data)
                    .setIn(['requests'], action.requests)
                    .setIn(['loadMore'], action.data.length >= 15 ? true : null);
      }
    case HOME_FAIL:
      return state.setIn(['loading'], null);
  }
 
  return state;
}
