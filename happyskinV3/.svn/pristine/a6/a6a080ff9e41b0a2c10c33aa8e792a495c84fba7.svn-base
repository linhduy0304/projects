

import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
const window = Dimensions.get('window');

const InputDoctor = ({
  onPress,
  source,
  isCheck
}) => (
  <TouchableWithoutFeedback onPress={onPress} >
    <View style={css.container}>
      <View style={css.ctImg}>
        <Image source={source} />
      </View>
      <Text style={css.title}>Bác sĩ</Text>
      <View style={css.ctCheck}>
        {
          isCheck === 1  ?
            <Image style={{width: 20, height: 15}} source={require('../../images/icons/ic_check_red.png')}/>
          : null
        }
      </View>
    </View>
  </TouchableWithoutFeedback>
)

const css = StyleSheet.create({
  ctImg: {
    width: 32,
    alignItems: 'center',
  },
  container: {
    width: window.width-30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    paddingLeft: 10,
    paddingRight: 15,
    paddingBottom: 13
  },
  title: {
    color: '#2f2f2f',
    marginLeft: 10,
    fontSize: 15,
  },
  ctCheck: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
})

export default InputDoctor;