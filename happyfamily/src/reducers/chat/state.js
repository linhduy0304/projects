

const {Record} = require('immutable');
const {
  CHAT
} = require('../../config/actionTypes');

var InitialState = Record({
  state: CHAT,
  loading: null,
  error: null,
  chats: null,
  chatDetail: null,
  friendList: null,
});

export default InitialState;

