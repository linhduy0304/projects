

import React from 'react';
import { Text, View, Easing, Animated } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import App from '../screens/App';
import Login from '../screens/auth/Login';
import TabNavigator from './TabNavigator';

const Root = createStackNavigator(
  {
    app: {
      screen: App
    },
    login: {
      screen: Login
    },
    tab: {
      screen: TabNavigator
    }
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
    transitionConfig: () => {
      return {
        transitionSpec: {
          duration: 500,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {      
          const { layout, position, scene } = sceneProps
    
          const thisSceneIndex = scene.index
          const width = layout.initWidth
          const height = layout.initHeight
          
          const opacity = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex],
            outputRange: [0, 1],
          })

          const translateY = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [height, 0, 0]
          })

          // const translateX = position.interpolate({
          //   inputRange: [thisSceneIndex - 1, thisSceneIndex],
          //   outputRange: [width, 0],
          // })

          const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [width, 0, 0]
          })
          const slideFromRight = { transform: [{ translateX }] }
    
          // return { transform: [ { fromRight } ] , opacity}
          return slideFromRight
        },
      }
    }
  }
)

export default Root;
