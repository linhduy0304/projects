
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const Button = ({
  width,
  onPress, 
  title, 
  marginTop = 40,
  backgroundColor,
  fontWeight, 
  color, 
  disabled = false,
  fontSize
}) => (
  <TouchableOpacity disabled={disabled} onPress={onPress}
    style={{
      backgroundColor,
      marginTop,
      height: 45,
      width: width,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Text style={{color, fontSize, fontWeight}}>{title}</Text>
  </TouchableOpacity>
)

export default Button;
  