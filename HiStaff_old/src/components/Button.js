
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
  height = 45,
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
      height,
      paddingLeft: 10,
      paddingRight: 10,
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
  