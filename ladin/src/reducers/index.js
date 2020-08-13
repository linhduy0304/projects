

import auth from './auth';
import home from './home';
import profile from './profile';
import search from './search';
import product from './product';
import notify from './notify';
import cart from './cart';
import tab from './tab';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  home,
  profile,
  search,
  product,
  notify,
  cart,
  tab
});

export default rootReducer;