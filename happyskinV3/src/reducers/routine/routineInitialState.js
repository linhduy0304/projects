
'use strict';
const {Record} = require('immutable');
const {
  ROUTINE
} = require('../../libs/actionTypes');

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
var InitialState = Record({
  state: ROUTINE,
  isFetching: false,
  routineJoining: [],
  routineSuggest: [],
  routineJoined: [],
  routineDetail: [],
  routineProduct: [],
  routineDiary: [],
  productUpdate: [],
  loadMore: false,
  fetchingLoad: false,
  closeModalReview: null,
});

export default InitialState;

