

import React from 'react';
import { Text, View, StyleSheet,Image, TouchableOpacity } from 'react-native';

const ItemMenu = ({
    data,
    onPress=data,
    arrMenu
}) => (
    <TouchableOpacity onPress={() => onPress(data)} style={css.ct}>
      <View style={css.ctCheck}>
        {
          arrMenu.indexOf(data.id) !== -1 ?
          <Image style={{width: 10, height: 10}} source={require('../../icons/ic_check_black.png')} /> 
          : null
        }
      </View> 
      <Text style={css.txt}>{data.name}</Text>
    </TouchableOpacity>
);

const css = StyleSheet.create({
  txt: {
    color: '#002333',
    marginLeft: 20
  },
  ct: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  ctCheck: {
    borderWidth: 2,
    borderColor: '#a0a0a0',
    height: 14,
    width: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ItemMenu;
