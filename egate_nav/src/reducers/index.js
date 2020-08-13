

import auth from './auth';
import profile from './profile';
import nav from './nav';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  profile,
  nav,
});

export default rootReducer;