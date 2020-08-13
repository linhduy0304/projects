

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

const HeaderItem = ({
    label,
    color='#e3004b',
    borderTopWidth= 0,
    onPress
}) => (
  <View style={[css.ctHeader, {borderTopWidth}]}>
    <Text style={[css.label, {color}]}>{label}</Text>
    <TouchableOpacity onPress={onPress} style={css.ctMore}>
      <Text style={css.more}>Xem thêm ></Text>
    </TouchableOpacity>
  </View>
);

const css = StyleSheet.create({
  label: {
    color: '#e3004b',
    fontWeight: 'bold',
  },
  more: {
    color: '#448ac9',
    fontSize: 12
  },
  ctMore: {
    position: 'absolute',
    right: 0,
    padding: 10
  },
  ctHeader: {
    height: 40,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderTopColor: '#e3004b',
    borderBottomColor: '#e6eff1'
  },
})
export default HeaderItem;
