
'use strict';
const {Record} = require('immutable');
const {
  PAGE_GROUP
  } = require('../../libs/actionTypes');

var InitialState = Record({
  state: PAGE_GROUP,
  isError: false,
  error: null,
  isFetching: false,
  post_ids: [],
  groups: [],
  loadMore: true,
  isRefreshing: false
});

export default InitialState;

