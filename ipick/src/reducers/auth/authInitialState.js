'use strict';

const {Record} = require('immutable');
const {
  AUTH
} = require('../../libs/actionTypes');

var InitialState = Record({
  state: AUTH,
  isFetching: null,
  error: null,
});

export default InitialState;

