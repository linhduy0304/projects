
'use strict';
const {Record} = require('immutable');
const {
  SKINDIARY
} = require('../../libs/actionTypes');

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
var InitialState = Record({
  state: SKINDIARY,
  isFetching: false,
  fetchingModal: false,
  coach: null,
  closeModal: null
});

export default InitialState;

