

import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'
const window = Dimensions.get('window');

const InputNumber = ({
  onChangeText = mobile,
  onPress,
  source,
  value
}) => (
    <View style={css.container}>
      <View style={css.ctImg}>
        <Image source={source} />
      </View>
      <Text style={css.title}>Số điện thoại</Text>
      <TextInput
        value={value}
        placeholder='09***'
        placeholderTextColor='#d7d7d7'
        style={css.ctInput}
        keyboardType='numeric'
        selectionColor='#d73554'
        onChangeText={(mobile) => onChangeText(mobile)}
        underlineColorAndroid={'transparent'}
      />
     
    </View>
)

const css = StyleSheet.create({
  ctInput: {
    flex: 1,
    padding: 0,
    marginLeft: 10
  },
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
    marginLeft: 10,
    fontSize: 15,
  },
  
})

export default InputNumber;