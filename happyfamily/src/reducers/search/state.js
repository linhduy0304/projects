

const {Record} = require('immutable');
const {
  SEARCH
} = require('../../config/actionTypes');

var InitialState = Record({
  state: SEARCH,
  loading: null,
  searchPost: null,
  searchUser: null,
  loadMore: null,
});

export default InitialState;

