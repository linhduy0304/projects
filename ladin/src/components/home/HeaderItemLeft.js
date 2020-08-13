



import React from 'react';
import { Text, View,Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const HeaderItemLeft = ({
    data,
    onPress
}) => (
  <View style={css.ctHeader}>
    <View style={[css.ctLabel, {borderBottomWidth: data.type === 0 ? 0 : 2,}]}>
      {
        data.icon ? 
        <Image style={css.icon} source={data.icon} />
        : null
      }
      
      <Text style={[css.label, ]}>{data.name}</Text>
    </View>
    <TouchableOpacity onPress={onPress} style={css.ctMore}>
      <Text style={css.more}>Xem thêm ></Text>
    </TouchableOpacity>
  </View>
);

const css = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
    marginRight: 4
  },
  ctLabel: {
    
    borderBottomColor: '#e3004b',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginLeft: 5
  },
  label: {
    color: '#333333',
    fontWeight: 'bold',
  },
  more: {
    color: '#448ac9',
    fontSize: 12
  },
  ctMore: {
    padding: 10
  },
  ctHeader: {
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
export default HeaderItemLeft;
