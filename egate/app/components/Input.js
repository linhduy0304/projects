

import React from 'react';
import { Text, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
// import {Color} from '../config/Constant'
const Input = ({
  label,
  value,
  editable=true,
  textColor = '#fff',
  tintColor = '#fff',
  baseColor = '#d2d8da',
  keyboardType = 'default',
  onChangeText = text,
  secureTextEntry = false,
  width,
  marginTop,
  children,
  paddingRight
}) => (
    <View style={{marginTop }}>
      {children}
      <TextField
        label={label}
        textColor= {textColor}
        tintColor= {tintColor}
        baseColor= {baseColor}
        value={value}
        errorColor={'red'}
        activeLineWidth={0.5}
        editable={editable}
        secureTextEntry = {secureTextEntry}
        keyboardType = {keyboardType}
        onChangeText={ (text) => onChangeText(text) }
        style={{
          padding: 0,
          width,
          paddingRight,
          flex: 1,
        }}
      />
    </View>
);

export default Input;