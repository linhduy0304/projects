
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

const Loading = ({title='Đang tải dữ liệu'}) => (
  <View style={css.ctLoading}>
    <Image style={{width: 30, height: 30}} source={require('../images/loading.gif')} />
    <Text style={css.txtLoading}>{title}</Text>
  </View>
)

const css = StyleSheet.create({
  ctLoading: {
    alignItems: 'center',
    margin: 20
  },
  txtLoading: {
    fontSize: 12,
    color: '#c6247d'
	},
})

export default Loading;
  