

import React from 'react';
import { 
  Text, 
  View ,
  TouchableOpacity,
} from 'react-native';
import { screen} from '../config/System'
import LinearGradient from 'react-native-linear-gradient';

const ButtonGradient = ({
  label,
  onPress,
  borderRadius = 5,
  width = screen.width-40,
  // backgroundColor = Color,
  height = 40,
  color = '#fff',
  fontWeight = 'bold',
  marginTop = 20,
}) => (
  <LinearGradient 
    start={{x: 0.0, y: 0.0}} 
    end={{x: 0.5, y: 1.0}}
    style={{
      borderRadius,
      height,
      width,
      marginTop,
    }}
    colors={['#4f7a88', '#3d616d']} >
    <TouchableOpacity
      style={{
        borderRadius,
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
      }} 
      onPress={onPress} >
      <Text style={{
        color,
        fontWeight
      }}>{label}</Text>
    </TouchableOpacity>
  </LinearGradient>
    
);

export default ButtonGradient;
