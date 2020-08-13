



import React from 'react';
import { 
  Text, 
  View ,
  TouchableOpacity,
} from 'react-native';
import {screen, TxtGrey} from '../config/Constant'

const Button = ({
  label,
  onPress,
  borderRadius = 4,
  borderWidth = 0,
  borderColor='#f1f1f1',
  width = screen.width/3,
  backgroundColor = '#f2f2f2',
  height = 40,
  color = TxtGrey,
  fontWeight = '400',
  marginTop = 10,
  fontSize = 13,
}) => (
    <TouchableOpacity
      style={{
        borderRadius,
        height,
        marginTop,
        borderWidth,
        width,
        borderColor,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }} 
      onPress={onPress} >
      <Text style={{
        color,
        textAlign: 'center',
        fontWeight,
        fontSize
      }}>{label}</Text>
    </TouchableOpacity>
    
);

export default Button;
