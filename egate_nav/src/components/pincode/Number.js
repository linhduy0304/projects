

import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { screen } from '../../config/System';

const Number = ({
    label,
    onPress
}) => (
    <TouchableOpacity onPress={() => onPress(label)} style={css.ct}>
      <Text style={css.label}>{label}</Text>
    </TouchableOpacity>
);

const css = StyleSheet.create({
  label: {
    color: '#fff'
  },
  ct: {
    backgroundColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
    height: screen.width/6,
    width: screen.width/6,
    margin: 8,
    marginTop: 5,
    marginBottom: 5
  },
})

export default Number;
