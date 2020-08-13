/**
 * # reducers
 * 
 * This class combines all the reducers into one
 * 
 */
'use strict';
/**
 * ## Imports
 * 
 * our 4 reducers
 */ 
import login from './auth/loginReducer';
import register from './auth/registerReducer';
import home from './home/homeReducer';
import more from './more/moreReducer';
import profile from './auth/profileReducer';
import magazine from './magazine/magazineReducer';
import routine from './routine/routineReducer';
import skintest from './skintest/skintestReducer';
import skinDiary from './skinDiary/skinDiaryReducer';
import explore from './explore/exploreReducer';
import scrollToTop from './tab/scrollToTopReducer';
import common from './common/commonReducer';
import search from './search/searchReducer';
import cosmetics from './cosmetics/cosmeticsReducer';
import chat from './chat/chatReducer';
import community from './community/communityReducer';
import pageGroup from './page/pageGroupReducer';
import data from './dataPost/dataReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  login,
  register,
  profile,
  skintest,
  home,
  more,
  magazine,
  routine,
  skinDiary,
  explore,
  scrollToTop,
  common,
  search,
  cosmetics,
  chat,
  community,
  data,
  pageGroup
});

export default rootReducer;