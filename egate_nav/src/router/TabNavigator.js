

import React from 'react';
import {
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import Notify from '../screens/tab/Notify';
import History from '../screens/tab/History';
import SettingStack from './SettingStack';
import HomeStack from './HomeStack';

const TabNavigator = createBottomTabNavigator(
  {
    home: HomeStack,
    history: History,
    notify: Notify,
    setting: SettingStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        switch(routeName) {
          case 'home':
            return <Image style={styles.icon} source={focused ? require('../icons/ic_home_active.png') : require('../icons/ic_home.png')}/>
          case 'history':
            return <Image style={styles.icon} source={focused ? require('../icons/ic_history_active.png') : require('../icons/ic_history.png')}/>
          case 'notify':
            return <Image style={styles.icon} source={focused ? require('../icons/ic_noti_active.png') : require('../icons/ic_noti.png')}/>
          case 'setting':
            return <Image style={styles.icon} source={focused ? require('../icons/ic_setting_active.png') : require('../icons/ic_setting.png')}/>
          default: 
            return;
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#3a5b68',
      }
    },
 
  }
)

const styles = StyleSheet.create({
  tab: {
    backgroundColor: 'red',
  },
  icon: {
    height: 20,
    width: 20
  }
})

export default TabNavigator;
