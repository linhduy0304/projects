

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

const Header = ({
    data,
}) => (
    <View style={css.ct}>
      <Image style={css.avatar} source={{uri: data.avatar}}/>
      <View style={{marginLeft: 20, flex: 1}}>
        <Text style={css.name}>{data.name}</Text>
        <Text>ID: {data.id}</Text>
      </View>
    </View>
);

const css = StyleSheet.create({
  name: {
    fontSize: 16
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  ct: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
})

export default Header;
