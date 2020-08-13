
'use strict';
const {Record} = require('immutable');
const {
  PROFILE
} = require('../../libs/actionTypes');

var InitialState = Record({
  state: PROFILE,
  isFetching: false,
  currentUser: '',
  otherProfile: {
    avatar: ''
  },
  closeModalChangePass: false,
  closeModalFeedBack: false,
});

export default InitialState;

