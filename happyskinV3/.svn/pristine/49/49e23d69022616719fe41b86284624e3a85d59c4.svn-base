
'use strict';
const InitialState = require('./routineInitialState').default;

const {
  ROUTINE_REQUEST,
  ROUTINE_SUCCESS,
  ROUTINE_FAIL,
  RT_DETAIL_REQUEST,
  RT_DETAIL_SUCCESS,
  RT_DETAIL_FAIL,
  RT_JOIN_REQUEST,
  RT_JOIN_SUCCESS,
  RT_JOIN_FAIL,
  RT_PRODUCT_REQUEST,
  RT_PRODUCT_SUCCESS,
  RT_PRODUCT_FAIL,
  RT_UPDATE_REQUEST,
  RT_UPDATE_SUCCESS,
  RT_UPDATE_FAIL,
  RT_REVIEW_REQUEST,
  RT_REVIEW_SUCCESS,
  RT_REVIEW_FAIL,
  RT_SAVE_REQUEST,
  RT_SAVE_SUCCESS,
  RT_SAVE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function routineReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {
    //

    case PRODUCT_UPDATE_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['productUpdate'],[]);
  
    case PRODUCT_UPDATE_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['productUpdate'], action.data);
    
    case PRODUCT_UPDATE_FAIL: 
      return state.setIn(['isFetching'], false)

    //routine reivew
    case RT_REVIEW_REQUEST:
      return state.setIn(['fetchingLoad'], true).setIn(['closeModalReview'], false);
    
    case RT_REVIEW_SUCCESS:
      var routineDetail = state.getIn(['routineDetail']);
      routineDetail.user_raties.unshift(action.data);
      return state.setIn(['fetchingLoad'], false).setIn(['closeModalReview'], true).removeIn(['routineDetail']).setIn(['routineDetail'], routineDetail)
    
    case RT_REVIEW_FAIL:
      return state.setIn(['fetchingLoad'], false).setIn(['closeModalReview'], false);

    //routine update
    case RT_UPDATE_REQUEST:
      return state.setIn(['fetchingLoad'], true);
    
    case RT_UPDATE_SUCCESS:
      var diary = state.getIn(['routineDiary']);
      var count = 0;
      diary.map((item, index) => {
        if(item.time == action.time) {
          item.data = action.data;
          count = count +1;
        }
      })
      return state.setIn(['fetchingLoad'], false);
    
    case RT_UPDATE_FAIL:
      return state.setIn(['fetchingLoad'], false)

    //rouutine product
    case RT_PRODUCT_REQUEST:
      return state.setIn(['isFetching'], true);
  
    case RT_PRODUCT_SUCCESS:
      if(action.direct == 'diary') {
        return state.setIn(['isFetching'], false).setIn(['routineDiary'], action.data);
      }else return state.setIn(['isFetching'], false).setIn(['routineProduct'], action.data);
    
    case RT_PRODUCT_FAIL: 
      return state.setIn(['isFetching'], false)

    //routine Join 
    case RT_SAVE_REQUEST:
    case RT_JOIN_REQUEST:
      return state.setIn(['fetchingLoad'], true);
    
    case RT_SAVE_SUCCESS:
      var routineSave = state.getIn(['routineJoined']);
      var rtSuggest = state.getIn(['routineSuggest']);
      rtSuggest.map((routine, index) => {
        if(routine.id == action.id) {
          rtSuggest.splice(index, 1, action.routine);
        }
      })
      if(action.routine.is_save == 0) {
        routineSave.map((routine, index) => {
          if(routine.id == action.id) {
            routineSave.splice(index, 1);
            return state.setIn(['routineJoined'], routineSave).setIn(['fetchingLoad'], false).setIn(['routineSuggest'], rtSuggest)
          }
        })
      }else {
        routineSave.unshift(action.routine);
        return state.setIn(['routineJoined'], routineSave).setIn(['fetchingLoad'], false).setIn(['routineSuggest'], rtSuggest);
      }

    case RT_JOIN_SUCCESS:
      var routineSave = state.getIn(['routineJoined']);
      var rtSuggest = state.getIn(['routineSuggest']);
      rtSuggest.map((routine, index) => {
        if(routine.id == action.id) {
          rtSuggest.splice(index, 1, action.routine);
        }
      })
      routineSave.map((routine, index) => {
        if(routine.id == action.id) {
          routineSave.splice(index, 1, action.routine);
        }
      })
      return state.setIn(['fetchingLoad'], false).setIn(['routineJoined'], routineSave).setIn(['routineSuggest'], rtSuggest);
    
    case RT_SAVE_FAIL:
    case RT_JOIN_FAIL: 
      return state.setIn(['fetchingLoad'], false)
    
    //routine
    case ROUTINE_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case ROUTINE_SUCCESS:
      switch(action.redirect) {
        case 'joining':
          return state.setIn(['isFetching'], false).setIn(['routineJoining'],action.action == 'LM' ? state.getIn(['routineJoining']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false);
        case 'joined':
          return state.setIn(['isFetching'], false).setIn(['routineJoined'],action.action == 'LM' ? state.getIn(['routineJoined']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false);
        case 'suggest':
          return state.setIn(['isFetching'], false).setIn(['routineSuggest'],action.action == 'LM' ? state.getIn(['routineSuggest']).concat(action.data) : action.data).setIn(['loadMore'], action.data.length >= 15 ? true : false);
      }
    
    case ROUTINE_FAIL: 
      return state.setIn(['isFetching'], false);
    
    case RT_DETAIL_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case RT_DETAIL_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['routineDetail'],action.data);
    
    case RT_DETAIL_FAIL: 
      return state.setIn(['isFetching'], false)
  }
  return state;
}
