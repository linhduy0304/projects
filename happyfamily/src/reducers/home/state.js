

const {Record} = require('immutable');
const {
  HOME
} = require('../../config/actionTypes');

var InitialState = Record({
  state: HOME,
  loading: null,
  posting: null,
  loadMore: null,
  home: null,
  requests: null,
  loadConfirm: null,
  closeModalStatus: null,
});

export default InitialState;

