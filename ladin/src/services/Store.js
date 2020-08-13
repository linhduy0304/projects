

/**
 * # AppAuthToken.js
 * 
 * A thin wrapper over the react-native-simple-store
 *
 */
'use strict';
/**
 * ## Imports
 * 
 * Redux  & the config file
 */ 
import store from 'react-native-simple-store';



export default class Store {
  /**
   * ## AppAuthToken
   *
   * set the key from the config
   */

  /**
   * ### storeSessionToken
   * Store the session key 
   */
  storeSession(key, value) {
    return store.save(key, value);

  }
  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object from Parse.com
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSession(key) {
    return store.get(key);
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken(key) {
    return store.delete(key);
  }

  updateSession(key, value) {
    return store.update(key, value);
  }
}

