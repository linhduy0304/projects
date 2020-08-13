

import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

const Header = ({
    data,
}) => (
    <View>
      <View style={css.ctPrice}>
        <Text style={css.name}>Egate</Text>
        <Text style={css.price}>$0.000.999</Text>
      </View>
      <View style={[css.ctPrice, {marginTop: 8}]}>
        <View style={css.ctPercent}>
          <Text style={css.percent}>{data.incre ? '+': '-'} {data.percent}%</Text>
        </View>
        <Text style={css.date}>{data.date}</Text>
      </View>
    </View>
);

const css = StyleSheet.create({
  date: {
    color: '#fff'
  },
  percent: {
    color: '#fff',
  },
  ctPercent: {
    backgroundColor: '#1ec070',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15
  },
  name: {
    fontSize: 16,
    color: '#fff'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  ctPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default Header;
