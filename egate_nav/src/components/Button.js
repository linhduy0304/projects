

import React from 'react';
import { 
  Text, 
  View ,
  TouchableOpacity,
} from 'react-native';
import {screen} from '../config/System'

const Button = ({
  label,
  onPress,
  borderRadius = 20,
  width = screen.width-40,
  height = 45,
  disabled=false,
  color = '#19353d',
  fontWeight = 'bold',
  marginTop = 20,
  fontSize=20,
  backgroundColor='#fff'
}) => (
  <TouchableOpacity
    style={{
      borderRadius,
      marginTop,
      height,
      width,
      
      backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    }} 
    disabled={disabled}
    onPress={onPress} >
    <Text style={{
      fontSize,
      color,
      fontWeight
    }}>{label}</Text>
  </TouchableOpacity>
    
);

export default Button;
