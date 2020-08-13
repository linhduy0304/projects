

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window')

const MyMessage = ({
  data,
}) => (
  <View style={[styles.container, ]}>
    <View style={styles.ctMessage}>
      <Text style={styles.txtContent}>{data.text}</Text>
    </View>
    {/* <Image style={styles.avatar} source={data.user.avatar ? {uri: data.user.avatar + '.png'} : require('../../images/avatar_default.png')} /> */}
  </View>
)

const styles = StyleSheet.create({
  avatar: {
    width: 30, 
    height: 30,
    position: 'absolute',
    right: 8,
    borderRadius: 15
  },
  txtContent: {
    color: '#fff',
    fontSize: 15
  },
  container: {
    justifyContent: 'flex-end',
    marginTop: 20,
    paddingLeft: window.width/4,
    flexDirection: 'row',
    paddingRight: 10,
  },
  ctMessage: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: '#c6247d',
  },
})

export default MyMessage;
  
