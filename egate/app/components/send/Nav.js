

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
import Css from '../../config/Css';
import { Actions } from 'react-native-router-flux';
import StBar from '../StBar';
import { color } from '../../config/System';
const Nav = ({
    title,
    sub
}) => (
    <View >
      <StatusBar
        // backgroundColor={Color}
        barStyle='light-content'
      />
      {
        Platform.OS === 'ios' ?
          <StBar backgroundColor={color}/>
          : null
      }
      <LinearGradient
        start={{x: 0.0, y: 0.0}} 
        end={{x: 1.0, y: 1.0}}
        style={{
        }}
        colors={['#3d616d','#3d616d','#4f7a88',]} >
        <View style={{paddingBottom: 40}}>
          <View style={css.ct}>
            <TouchableOpacity onPress={() => Actions.pop()} style={Css.ctBack}>
              <Image style={Css.icBack} source={require('../../icons/ic_left.png')}/>
            </TouchableOpacity>
            <Text style={css.title}>{title}</Text>
          </View>
          {sub ? 
            <View style={{alignItems: 'center'}}>
              <Text style={css.title}>So du: <Text style={{color: '#12ff8a'}}>{sub}</Text></Text>
            </View>
          : null
          }
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
