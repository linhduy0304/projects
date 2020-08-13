'use strict';

const {Record} = require('immutable');
const {
  MAGAZINE
} = require('../../libs/actionTypes');

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
var InitialState = Record({
  state: MAGAZINE,
  isFetching: false,
  loadMore: false,
  data: [],
  // videoDetail: '',
  videoDetail: new (Record({
    id_youtube: '',
  })),
  videos: [],
  event: '',
  eventDetail:'',
});

export default InitialState;

