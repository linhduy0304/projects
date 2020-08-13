

import React from 'react';
import {
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Detail from '../screens/Detail';
import Home from '../screens/tab/Home';
import QrCode from '../screens/QrCode';
import Scan from '../screens/Scan';
import Rate from '../screens/Rate';
import PayStack from './PayStack';
import PayOut from '../screens/payout/PayOut';
import PayAddress from '../screens/payout/PayAddress';

const HomeStack = createStackNavigator(
  {
    home: Home,
    detail: Detail,
    qrCode: QrCode,
    scan: Scan,
    pay: PayOut,
    payAddress: PayAddress,
    rate: Rate,
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
)
HomeStack.navigationOptions = ({ navigation }) => {
  console.log(navigation)
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default HomeStack;
