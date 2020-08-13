

import React from 'react';
import {
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import PayOut from '../screens/payout/PayOut';
import PayAddress from '../screens/payout/PayAddress';

const PayStack = createStackNavigator(
  {
    payOut: PayOut,
    payAddress: PayAddress,
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
)
// HomeStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };

export default PayStack;
