

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

const InputNote = ({
  onChangeText = note,
  source,
  title,
}) => (
  <View style={css.container}>
    <Text style={css.title}>Ghi chú</Text>
    <TextInput 
      style={css.ctInput}
      underlineColorAndroid={'transparent'}
      onChangeText={(note) => onChangeText(note)}
      multiline={true}
    />
  </View>
)

const css = StyleSheet.create({
  ctInput: {
    flex: 1,
    padding: 0,
  },
  title: {
    color: '#2f2f2f',
    fontSize: 15,
  },
  container: {
    width: window.width-30,
    backgroundColor: '#ebebeb',
    height: 80,
    borderRadius: 5,
    marginTop: 15,
    padding: 15
  },
  
  
})

export default InputNote;