

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

const OtherMessage = ({
  data,
}) => (
  <View style={[styles.container,]}>
    <Image style={styles.avatar} source={data.user.avatar ? {uri: data.user.avatar + '.png'} : require('../../images/avatar_default.png')} />
    <View style={styles.ctMessage}>
      <Text style={styles.txtContent}>{data.text}</Text>
    </View>
    
  </View>
)

const styles = StyleSheet.create({
  avatar: {
    width: 30, 
    height: 30,
    position: 'absolute',
    left: 8,
    borderRadius: 15,
  },
  txtContent: {
    fontSize: 15,
    color: '#000'
  },
  container: {
    marginTop: 20,
    paddingRight: window.width/4,
    flexDirection: 'row',
    paddingLeft: 45
  },
  ctMessage: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: '#fff',
  },
})

export default OtherMessage;
  
