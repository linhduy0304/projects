

import React from 'react';
import AppNavigator from './router';
import thunk from 'redux-thunk';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk)) 

const Navigator = () => (
  <Provider store = {store}>
    <AppNavigator/>
  </Provider>
)
export default Navigator;
