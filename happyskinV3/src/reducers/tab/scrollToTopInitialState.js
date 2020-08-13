
'use strict';

const {Record} = require('immutable');
const {
  SCROLL
  } = require('../../libs/actionTypes');

var InitialState = Record({
  state: SCROLL,
  home: false,
  explore: false,
  routine: false,
  message: false,
});

export default InitialState;
