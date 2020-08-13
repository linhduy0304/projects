
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const window = Dimensions.get('window');

const ItemHome = ({
  data,
  onPress = item,
}) => (
  <TouchableOpacity onPress={() => onPress(data)} style={[css.container, {backgroundColor: data.backgroundColor}]}>
    <Image style={{height: 50, width: 50}} source={data.source} />
    <Text style={css.title}>{data.title}</Text>
  </TouchableOpacity>
)

const css = StyleSheet.create({
  title: {
    margin: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'BalooPaaji-Regular',
  },
  container: {
    width: (window.width-60)/2,
    height: (window.width-60)/2,
    paddingTop: 20,
    backgroundColor: '#FF5C00',
    marginLeft: 20,
    marginTop: 15,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 10,
    
  },
})

export default ItemHome;
  