
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

const ButtonTypeCalendar = ({
  check,
  onPress,
  title, 
  fontWeight, 
  color, 
  fontSize,
  }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        marginTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
      <View style={{
        height: 30,
        width: 30,
        borderRadius: 25,
        borderWidth: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#C6247D'
      }}>
        {
          check ?
            <View style={{backgroundColor: '#C6247D', width: 20, height: 20, borderRadius: 10}}/>
            : null
        }
      </View>
      <Text style={{color, fontSize, fontWeight, marginLeft: 15}}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
)

export default ButtonTypeCalendar;
  