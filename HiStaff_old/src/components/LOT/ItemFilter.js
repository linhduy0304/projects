
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';

const window = Dimensions.get('window');

const ItemFilter = ({
  filter,
  data,
  onPress = value,
}) => (
 <TouchableWithoutFeedback onPress={() => onPress(data.value)}>
    <View style={css.container}>
      <View style={css.ctCheck}>
        {
          filter.indexOf(data.value) === -1 ?
           null
          :
          <Image style={css.icon} source={require('../../icons/ic_check_green.png')} />
        }
        
      </View>
      <Text style={[css.title, {color:data.color}]}>{data.title}</Text>
    </View>
  </TouchableWithoutFeedback>
)

const css = StyleSheet.create({
  title: {
    marginLeft: 10
  },
  icon: {
    height: 17,
    width: 17
  },
  ctCheck: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
})

export default ItemFilter;
  