

import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
const window = Dimensions.get('window');

const Category = ({
  source,
  backgroundColor,
  title,
  sub,
  type,
  onPress
}) => (
  <TouchableOpacity onPress = {onPress} style={[css.container, {backgroundColor}]}>
    {
      type === 1 ?
        <View style={css.ctImg}>
          <Image source={source} />   
        </View>
      : 
        type === 2 ?
          <View style={css.ctImg}>
            <View style={css.ctImg1}>
              <Image source={source} />
            </View>
          </View>
          :
          <View style={css.ctImg}>
            <View style={css.ctAvatar}>
              <Image style={css.img} source={{uri: source+'.png'}} />   
            </View>
          </View>
    }
    <View>
      <Text style={css.title}>{title}</Text>
      <Text style={css.sub}>{sub}</Text>
    </View>
  </TouchableOpacity>
)

const css = StyleSheet.create({
  ctAvatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img:{
    height: 46,
    width: 46,
    borderRadius: 23
  },
  container: {
    width: window.width - 20,
    borderRadius: 7,
    // height: 200,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  title: {
    color: '#FFF',
    fontSize: 18,
  },
  sub: {
    color: '#FFF',
    fontSize: 14,
  },
  ctImg: {
    alignItems: 'center',
    width: 60,
    marginRight: 15
  },
  ctImg1: {
    backgroundColor: '#1dc1a7',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
  
})

export default Category;