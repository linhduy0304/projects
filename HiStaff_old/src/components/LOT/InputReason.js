
import React from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { TextField } from 'react-native-material-textfield';

const InputReason = ({
  title='Lý do',
  value,
  onChange = reason
}) => (
  <View style={css.container}>
    <TextField
      label={title}
      value={value}
      tintColor="#c2c4ca"
      textColor="rgb(31, 42, 53)"
      baseColor="rgb(194, 196, 202)"
      autoCapitalize="none"
      selectionColor="rgb(41, 162, 104)"
      onChangeText={reason => onChange(reason)}
    />
  </View>
)

const css = StyleSheet.create({
 
  container: {
    // flexDirection: 'row', 
    // alignItems: 'center'
  },
 
})

export default InputReason;
  