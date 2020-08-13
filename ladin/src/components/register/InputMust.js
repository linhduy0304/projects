

import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { screen } from '../../config/Constant';

const InputMust = ({
    label,
    value,
    onChange=text,
    secureTextEntry = false,
    keyboardType='default',
    marginTop = 0,
}) => (
    <View style={[css.ct, {marginTop}]}>
      <Text style={css.must}>*</Text>
      <View style={[css.ct1]}>
        <TextInput
          placeholder={label}
          autoCapitalize='none'
          placeholderTextColor='#cea7ad'
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          selectionColor={'#fff'}
          style={css.ctInput}
          onChangeText={text => onChange(text)}
        />
      </View>
    </View>
);

const css = StyleSheet.create({
  ct: {
    width: screen.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  must: {
    position: 'absolute',
    left: screen.width/12,
    color: '#fff',
    fontSize: 16
  },
  ctInput: {
    padding: 0,
    flex: 1,
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  ct1: {
    width: screen.width*2/3,
    backgroundColor: '#a2142b',
    borderRadius: 20,
    height: 40,
  },
})
export default InputMust;
