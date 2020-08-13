

import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';

const AboutHeader = ({
    params,
}) => (
  <View style={css.ct}>
    <Image style={{height: 40, resizeMode: 'contain'}} source={require('../../icons/logo_dark.png')}/>
    <Text style={css.intro}>Version: 1.1</Text>
    <Text style={css.intro1}>Sử dụng thông báo sau mỗi lần thay đổi biến động số dư trong ví của bạn</Text>
  </View>
);

const css = StyleSheet.create({
  intro1: {
    color: '#929292',
    textAlign: 'center',
    marginTop: 30
  },
  intro: {
    textAlign: 'center',
    color: '#323643'
  },
  ct: {
    alignItems: 'center',
    padding: 30
  },
})
export default AboutHeader;
