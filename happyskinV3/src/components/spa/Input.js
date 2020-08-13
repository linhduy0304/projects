

import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
const window = Dimensions.get('window');

const Input = ({
  onPress,
  source,
  title,
}) => (
  <TouchableOpacity onPress={onPress} style={css.container}>
    <View style={css.ctImg}>
      <Image source={source} />
    </View>
    <Text style={css.title}>{title}</Text>
    <Image source={require('../../images/icons/ic_arrow_next_blue.png')} />
  </TouchableOpacity>
)

const css = StyleSheet.create({
  ctImg: {
    width: 32,
    alignItems: 'center',
  },
  container: {
    width: window.width-30,
    borderBottomWidth: 1,
    borderBottomColor: '#d7d7d7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    paddingLeft: 10,
    paddingRight: 15,
    paddingBottom: 13
  },
  title: {
    color: '#2f2f2f',
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  
})

export default Input;