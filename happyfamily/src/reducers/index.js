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
import auth from './auth/reducer';
import chat from './chat/reducer';
import profile from './profile/reducer';
import post from './post/reducer';
import individual from './individual/reducer';
import home from './home/reducer';
import calendar from './calendar/reducer';
import search from './search/reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  chat,
  profile,
  post,
  individual,
  home,
  calendar,
  search
});

export default rootReducer;