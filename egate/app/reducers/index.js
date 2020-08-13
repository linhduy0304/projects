

import auth from './auth';
import profile from './profile';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  profile,
});

export default rootReducer;