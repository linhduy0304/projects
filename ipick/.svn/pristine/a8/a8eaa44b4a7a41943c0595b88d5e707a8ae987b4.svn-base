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
import auth from './auth/authReducer';
import profile from './profile/profileReducer';
import home from './home/homeReducer';
import explore from './explore/exploreReducer';
import post from './post/postReducer';
import tab from './tab/tabReducer';
import activity from './activity/activityReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  profile,
  home,
  explore,
  post,
  activity,
  tab
});

export default rootReducer;