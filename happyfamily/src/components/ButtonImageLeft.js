
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

const ButtonImageLeft = ({
  onPress,
  title, 
  backgroundColor, 
  fontWeight, 
  color, 
  fontSize,
  source,
  borderRadius = 4
  }) => (
  <TouchableOpacity onPress={onPress}
    style={{
      backgroundColor,
      marginTop: 40,
      height: 45,
      borderRadius: borderRadius,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Image source={source} />
    <Text style={{color, fontSize, fontWeight, marginLeft: 20}}>{title}</Text>
  </TouchableOpacity>
)

export default ButtonImageLeft;
  