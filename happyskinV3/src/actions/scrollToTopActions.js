'use strict';

const {
  SCROLL_TO_TOP_START,
  SCROLL_TO_TOP_FINISH
} = require('../libs/actionTypes');

import Constant from '../services/Constant';

import {Actions} from 'react-native-router-flux';

export function scrollToTopStart(tab) {
  return {
    type: SCROLL_TO_TOP_START,
    tab: tab
  };
}

export function scrollToTopFinish(tab) {
  return {
    type: SCROLL_TO_TOP_FINISH,
    tab: tab
  };
}

export function scrollToTop(tab){
  return dispatch => {
      dispatch(scrollToTopStart(tab));
      setTimeout(function(){
        dispatch(scrollToTopFinish(tab));
      }, 1000);
  };
}

