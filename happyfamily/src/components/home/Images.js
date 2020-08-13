
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
} from 'react-native';
const Images = ({
  data,
  onPress,
}) => (
  <View style={{flexDirection: 'row', marginTop: 10}}>
    {
        data.map((item, index) => {
        return (
          <Image key={index} style={{width: 50, height: 50, margin: 5}} source={{uri: item}} />
        )
      })
    }
    <TouchableWithoutFeedback onPress={onPress} >
      <View style={css.ctAdd}>
        <Text style={{fontSize:30}}>+</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
)

const css = StyleSheet.create({
  ctAdd: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dotted',
    margin: 5
  },
})

export default Images;
  