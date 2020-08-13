'use strict';

const {Record} = require('immutable');
const {
  PROFILE
} = require('../../libs/actionTypes');

var InitialState = Record({
  state: PROFILE,
  loading: null,
  loadOther: null,
  loadingSearch: null,
  loadFollow: null,
  loadMore: null,
  lmMyPick: null,
  lmMyPost: null,
  lmOtherPick: null,
  lmOtherPost: null,
  currentUser: null,

  myPost: null,
  myPick: null,
  myCountPost: null,
  myCountPick: null,

  otherPost: null,
  otherPick: null,
  otherCountPick: null,
  otherCountPost: null,

  following: null,
  follower: null,
  otherProfile: null,

  
});

export default InitialState;

