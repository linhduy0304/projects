/**
 * # authInitialState.js
 * 
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';
/**
 * ## Import
 */
const {Record} = require('immutable');
const {
  EXPLORE
} = require('../../libs/actionTypes');

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
var InitialState = Record({
  state: EXPLORE,
  isFetching: false,
  explore: [],
  exRelate: [],
  exHotDebate: '',
  hotDebate: '',
  isFollow: 0,
  loadMore: false,
  exTrending: [],
  exDetail: '',
  openModal: false,
  loadMoreReview: false,
  fetchingLoadMore: false,
  fetchingModal: false,
});

export default InitialState;

