
'use strict';
const InitialState = require('./skinDiaryInitialState').default;

const {
  SD_ADD_REQUEST,
  SD_ADD_SUCCESS,
  SD_ADD_FAIL,
  SD_DELETE_REQUEST,
  SD_DELETE_SUCCESS,
  SD_DELETE_FAIL,
  SD_COACH_REQUEST,
  SD_COACH_SUCCESS,
  SD_COACH_FAIL,
  SD_SEND_REQUEST,
  SD_SEND_SUCCESS,
  SD_SEND_FAIL,
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function skinDiaryReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

      //load coach
    case SD_SEND_REQUEST:
      return state.setIn(['fetchingModal'], true);
    
    case SD_SEND_SUCCESS:
      return state.setIn(['fetchingModal'], false).setIn(['coach'], action.data).setIn(['closeModal'], true);
    
    case SD_SEND_FAIL: 
      return state.setIn(['fetchingModal'], false);

        //load coach
    case SD_COACH_REQUEST:
      return state.setIn(['fetchingModal'], true);
    
    case SD_COACH_SUCCESS:
      return state.setIn(['fetchingModal'], false).setIn(['coach'], action.data).setIn(['closeModal'], null);
    
    case SD_COACH_FAIL: 
      return state.setIn(['fetchingModal'], false);

    //delete
    case SD_DELETE_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case SD_DELETE_SUCCESS:
      return state.setIn(['isFetching'], false);
    
    case SD_DELETE_FAIL: 
      return state.setIn(['isFetching'], false)

    //add
    case SD_ADD_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case SD_ADD_SUCCESS:
      return state.setIn(['isFetching'], false);
    
    case SD_ADD_FAIL: 
      return state.setIn(['isFetching'], false)
  }
  return state;
}
