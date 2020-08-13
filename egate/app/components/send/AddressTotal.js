

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const AddressTotal = ({
    params,
}) => (
    <View style={css.ct}>
      <View style={css.ctItem}>
        <Text>Phí mạng lưới</Text>
        <Text>9.000 ETH</Text>
      </View>
      <View style={[css.ctItem, {marginTop: 3}]}>
        <Text>Tổng số tiền</Text>
        <Text style={{color: '#333', fontWeight: 'bold'}}>0000000 ETH</Text>
      </View>
    </View>
);
const css = StyleSheet.create({
  ctItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  ct: {
    backgroundColor: '#fff',
    padding: 15
  },
})

export default AddressTotal;
