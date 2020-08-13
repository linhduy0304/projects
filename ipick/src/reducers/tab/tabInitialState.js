'use strict';

const {Record} = require('immutable');
const {
  TAB
} = require('../../libs/actionTypes');

var InitialState = Record({
  state: TAB,
  home: null,
  profile: null,
  activity: null,
  category: null,
});
export default InitialState;

