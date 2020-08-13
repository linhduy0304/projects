

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StBar from './StBar'
import { color } from '../config/System';
const Nav = ({
    title,
    children
}) => (
    <View >
      <StatusBar
        backgroundColor={'#23434d'}
        barStyle='light-content'
      />
      
      <LinearGradient
        start={{x: 0.0, y: 0.0}} 
        end={{x: 1.0, y: 1.0}}
        style={{
        }}
        colors={['#19353e','#315662','#436e7c',]} >
        {
          Platform.OS === 'ios' ?
            <StBar />
          : null
        }
        <View style={css.ct}>
          {
            children
          }
          <Text style={css.title}>{title}</Text>
        </View>
      </LinearGradient>
    </View>
);

const css = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 16
  },
 
  ct: {
    height: 50, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})

export default Nav;
