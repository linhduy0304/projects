

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
import Css from '../../config/Css'

const Nav = ({
    title,
    goBack
}) => (
    <View >
      <StatusBar
        backgroundColor={'#23434d'}
        barStyle='light-content'
      />
      <View style={css.ct}>
        <TouchableOpacity onPress={() => goBack()} style={Css.ctBack}>
            <Image style={Css.icBack} source={require('../../icons/ic_left.png')}/>
          </TouchableOpacity>
        <Text style={css.title}>{title}</Text>
      </View>
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
