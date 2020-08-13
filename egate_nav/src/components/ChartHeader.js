

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {screen} from '../config/System'

const ChartHeader = ({
    type,
    onPress=data
}) => (
  <View style={css.ctHeader}>
    <Text style={{color: '#fff', width: screen.width/2-50,}}>Egate</Text>
    <View style={{flexDirection: 'row', flex: 1}}>
      <TouchableOpacity onPress={() => onPress(1)} style={css.ctItemHeader}>
        <Text style={type === 1 ? css.txtActive : css.txt}>DAY</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(2)} style={css.ctItemHeader}>
        <Text style={type === 2 ? css.txtActive : css.txt}>WEEK</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress(3)} style={css.ctItemHeader}>
        <Text style={type === 3 ? css.txtActive : css.txt}>MONTH</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const css = StyleSheet.create({
  ctItemHeader: {
    flex: 1,
    paddingTop:5,
    paddingBottom: 5
  },
  ctHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  txt: {
    color: '#fff'
  },
  txtActive: {
    color: '#1ec070',
  },
})

export default ChartHeader;
