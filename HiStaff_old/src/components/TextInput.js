
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

const TextInput = ({
  label,
  onChange = value,
  value,
  editable=false
}) => (
  <TextField
    label={label}
    onChangeText={(value) => onChange(value)}
    tintColor="rgb(47, 87, 153)"
    textColor="rgb(31, 42, 53)"
    baseColor="rgb(194, 196, 202)"
    autoCapitalize="none"
    selectionColor="rgb(41, 162, 104)"
    editable={editable}
    value={value}
  />
)

export default TextInput;
  