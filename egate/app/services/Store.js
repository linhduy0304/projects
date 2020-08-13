


'use strict';
import store from 'react-native-simple-store';

export default class Store {
  storeSession(key, value) {
    return store.save(key, value);

  }
  /**
   * @param {Object} sessionToken the currentUser object from Parse.com
  
  // getSession(key) {
  //   return store.get(key);
  // }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  getSession(key) {
    return store.get(key);
  }
  
  deleteSessionToken(key) {
    return store.delete(key);
  }

  updateSession(key, value) {
    return store.update(key, value);
  }
}

