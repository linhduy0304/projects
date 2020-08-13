
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

const LoadMore = ({title='Đang tải'}) => (
  <View style={css.ctLoading}>
    <Text style={css.txtLoading}>{title}</Text>
    <Image style={{height: 30, width: 30}} source={require('../images/load_more.gif')} />
  </View>
)

const css = StyleSheet.create({
  ctLoading: {
    // width: deviceWidth, 
    marginTop:20,
    marginBottom: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row'
  },
  txtLoading: {
    fontSize: 12,
    color: '#c6247d',
    marginRight: 5
	},
})

export default LoadMore;
  