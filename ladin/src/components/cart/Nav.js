

import React from 'react';
import { Text,Platform,StatusBar, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Color, screen } from '../../config/Constant';
import StBar from '../StBar';

const Nav = ({
    label,
    children
}) => (
  <View>
    <StatusBar
      backgroundColor={Color}
      barStyle='light-content'
    />
    {
      Platform.OS === 'ios' ?
        <StBar/>
      : null
    }
    <View style={css.ct}>
      <Text numberOfLines={1} style={css.label}>{label}</Text>
      <TouchableOpacity onPress={() => Actions.pop()} style={css.ctBack}>
        <Image style={css.icClose} source={require('../../icons/ic_back.png')} />
      </TouchableOpacity>
      {children}
    </View>
  </View>
);

const css = StyleSheet.create({
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    maxWidth: screen.width*2/3,
  },
  ctBack: {
    padding: 15,
    position: 'absolute',
    left: 0
  },
  icClose: {
    height: 18,
    width: 18
  },
  ct: {
    flexDirection: 'row',
    backgroundColor: '#c41a36', 
    height: 50, 
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Nav;
