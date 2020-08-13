'use strict';

const {Record} = require('immutable');
const {
  COMMUNITY
  } = require('../../libs/actionTypes');

var InitialState = Record({
  state: COMMUNITY,
  isError: false,
  error: null,
  isFetching: false,
  tabIsFetching: false,
  disable: false,
  isValid: false,
  isSuccess: false,
  groups: [],
  question: new (Record({
    content: '',
    images: [],
    images_str: ''
  })),
  tips: new(Record({
    content: '',
    images: [],
    images_str: ''
  })),
  review: new(Record({
    content: '',
    images: [],
    images_str: '',
    product_id: '',
    product_name: '',
    raty_score: 0
  })),
  lookOfTheDay: new(Record({
    image: '',
    products: [],
    content: ''
  })),
  dataSearch: [],
  tabs: [],
  currentPage: 0,
  changeData: false,
  currentTab: '',
  postTabIds: []
});

export default InitialState;
