

import React from 'react';
import {
  StyleSheet,
} from 'react-native';
// import { TxtBlack } from './Constant';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23434d',
    alignItems: 'center',
  },
  ctBack: {
    padding: 15,
    position: 'absolute',
    left: 0
  },
  icBack: {
    height: 20,
    width: 20*19/35
  },
  iconAbsolute: {
    position: 'absolute',
    right: 0,
    bottom: 15,
    zIndex: 100,
    bottom: 15,
    height: 15,
    width: 15
  },
})