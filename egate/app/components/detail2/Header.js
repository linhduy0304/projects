

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Header = ({data}) => (
    <View style={css.ct}>
      <Text style={css.price}>{data.price} ETH</Text>
      <Text style={css.usd}>{data.usd} USD</Text>
    </View>
);
const css = StyleSheet.create({
  usd: {
    color: '#fff',
    marginTop: 7
  },
  price: {
    color:'#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  ct: {
    alignItems: 'center',
  },
})
export default Header;
