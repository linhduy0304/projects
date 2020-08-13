

import React from 'react';
import {
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Setting from '../screens/tab/Setting';
import EditProfile from '../screens/setting/EditProfile';
import Security from '../screens/setting/Security';
import Api from '../screens/setting/Api';
import ChangePass from '../screens/setting/ChangePass';
import Kyc from '../screens/setting/Kyc';
import About from '../screens/setting/About';

const SettingStack = createStackNavigator(
  {
    setting: Setting,
    editProfile: EditProfile,
    security: Security,
    api: Api,
    changePass: ChangePass,
    kyc: Kyc,
    about: About,
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
)
SettingStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default SettingStack;
