/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict';
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('./dataInitialState').default;
let ConstantSystem = require('../../services/ConstantSystem');

/**
 * ## Auth actions
 */
const {
  DATA_SAVE,
  UPDATE_LIKE_DATA,
  UPDATE_COMMENT_DATA,
  UPDATE_COMMENT_DELETE,
  DATA_SIGNLE_SAVE
} = require('../../libs/actionTypes');

const initialState = new InitialState;

export default function dataReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {
    case DATA_SAVE:
      var dataUpdate = [];
      var data = action.data;
      var dataOld = state.getIn(['posts']);
      data.forEach(function(element, index){
        if(typeof dataOld[element.id] == 'undefined'){
          dataOld[element.id] = element;
        }
      });
      return state.setIn(['posts'], dataOld);
    case DATA_SIGNLE_SAVE:
      var dataUpdate = [];
      var element = action.data;
      var dataOld = state.getIn(['posts']);
      if(typeof dataOld[element.id] == 'undefined'){
        dataOld[element.id] = element;
      }
      return state.setIn(['posts'], dataOld);

    case UPDATE_LIKE_DATA:
      var dataOld = state.getIn(['posts']);
      if(action.isLike == 1){
        // trường hợp like
        if(typeof dataOld[action.id] != 'undefined'){
          dataOld[action.id].count_like = dataOld[action.id].count_like + 1;
          dataOld[action.id].is_like_by_current_id = 1;
        }
      }else{
        // unlike
        if(typeof dataOld[action.id] != 'undefined'){
          dataOld[action.id].count_like = dataOld[action.id].count_like - 1;
          dataOld[action.id].is_like_by_current_id = 0;
        }
      }
      return state.setIn(['posts'], dataOld).setIn(['update'], Date.now());

    case UPDATE_COMMENT_DATA:
      var dataOld = state.getIn(['posts']);
      if(typeof dataOld[action.id] != 'undefined'){
        dataOld[action.id].count_comment = dataOld[action.id].count_comment + 1;
      }
      return state.setIn(['posts'], dataOld).setIn(['update'], Date.now());

    case UPDATE_COMMENT_DELETE:
      var dataOld = state.getIn(['posts']);
      if(typeof dataOld[action.id] != 'undefined'){
        dataOld[action.id].count_comment = dataOld[action.id].count_comment - action.totalDelete;
      }
      return state.setIn(['posts'], dataOld).setIn(['update'], Date.now());
  }
  /**
   * ## Default
   */
  return state;
}
