

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image }  from 'react-native';
import CtIcon from './CtIcon';
import { Actions } from 'react-native-router-flux';

const Rate = ({
    data,
    onPress
}) => (
    <View style={css.ct}>
      <View style={css.ctItem}>
        <CtIcon source={require('../../icons/ic_star_white.png')}/>
        <Text style={css.label}>Đánh giá sản phẩm</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={css.ctItem}>
        <Image style={css.icon} source={require('../../icons/ic_arrow_right.png')} />
      </TouchableOpacity>
    </View>
      
    
);

const css = StyleSheet.create({
  ctItem: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  icon: {
    width: 16,
    height: 16
  },
  more: {
    color: '#de1838'
  },
  ctMore: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333'
  },
  ct: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
})
export default Rate;
