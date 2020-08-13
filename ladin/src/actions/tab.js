

import {
    SET_TAB,
  } from '../config/types';
  
  //getHome
  export const setTab = (data) => {
    return {
      type: SET_TAB,
      data
    }
  }
