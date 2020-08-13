
'use strict';

const {Record} = require('immutable');
const {
  SKINTEST
} = require('../../libs/actionTypes');

var InitialState = Record({
  state: SKINTEST,
  isError: false,
  error: null,
  isFetching: false,
  isRefreshing: false,
  loadMore: true,
  questions: [],
  currentSlide: 1,
  isFinished: -1,
  results: null,
  continuePage: -1,
  groupSuggess: [],
  products: [],
  showCategory: false,
  showBrand: false,
  categories: [],
  brands: [],
  filterCategory: '',
  filterBrand: '',
  nameCategory: '',
  nameBrand: '',
  page: 1,
  countDone: 0,

});

export default InitialState;

