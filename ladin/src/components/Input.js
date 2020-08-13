

import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { screen } from '../config/Constant';

const Input = ({
    label,
    value,
    onChange=text,
    secureTextEntry = false,
    marginTop = 0,
    paddingLeft,
    backgroundColor='#a2142b',
    editable=true,
    color='#fff',
    keyboardType='default',
    textAlign='center',
    selectionColor='#fff',
    placeholderTextColor = '#cea7ad',
    width = screen.width*2/3,
}) => (
    <View style={[css.ct, {marginTop,backgroundColor, width }]}>
      <TextInput
        placeholder={label}
        autoCapitalize='none'
        editable={editable}
        placeholderTextColor={placeholderTextColor}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        selectionColor={selectionColor}
        style={[css.ctInput, {color,paddingLeft, textAlign}]}
        onChangeText={text => onChange(text)}
      />
    </View>
);

const css = StyleSheet.create({
  ctInput: {
    padding: 0,
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  ct: {
    
    borderRadius: 20,
    height: 40,
  },
})
export default Input;
