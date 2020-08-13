'use strict';

const {Record} = require('immutable');
const {
  POST
} = require('../../libs/actionTypes');

var InitialState = Record({
  state: POST,
  isFetching: null,
  loadPost: null,
  loadComment: null,
  loadLink: null,
  loadMoreComment: null,
  sendComment: null,
  postDetail: null,
  relate: null,
  comments: null,
  link: null,
  errorLink: null,
  title: null,
  content: null
});
export default InitialState;
