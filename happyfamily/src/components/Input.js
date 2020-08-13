
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

const Input = ({
  title,
  editable,
  value,
  marginLeft,
  onChange = value
}) => (
  <TextInput
    placeholder={title}
    placeholderTextColor='rgb(194, 196, 202)'
    editable = {editable}
    style={{
      padding: 0,
      color: '#141823',
      flex: 1,
      marginLeft, 
    }}
    underlineColorAndroid='transparent'
    onChangeText={(value) => onChange(value)}
    // onSubmitEditing={() => this.refs.password.focus()}
    value={value}
  />
)

export default Input;
  