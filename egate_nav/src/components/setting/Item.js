

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
const width = 18;

onPress = (type, navigation) => {
  switch(type) {
    case 'profile':
      navigation.navigate('editProfile');
      return;
    case 'security':
      navigation.navigate('security');
      return;
    case 'api':
      navigation.navigate('api');
      return;
    case 'pass':
      navigation.navigate('changePass');
      return;
    case 'kyc':
      navigation.navigate('kyc');
      return;
    default: //about
      navigation.navigate('about');
      return;
  }
}
const Item = ({
    data,
    index,
    length,
    navigation
}) => (
  <TouchableOpacity onPress={() => onPress(data.type, navigation)} style={[css.ct]}>
    <Image style={data.type === 'security' ? css.iconPass : css.icon} source={data.icon}/>
    <View style={[css.info, {borderBottomWidth: index === (length -1) ? 0 : 1}]}>
      <Text style={css.title}>{data.title}</Text>
      <Image style={{height: 13, width: 7}} source={require('../../icons/ic_right_black.png')}/>
    </View>
   
  </TouchableOpacity>
);

const css = StyleSheet.create({
  info: {
    borderBottomColor: '#dadde2',
    flexDirection: 'row',
    flex: 1,
    height: 50,
    paddingRight: 15,
    alignItems: 'center',
  },
  title: {
    flex: 1
  },
  iconPass: {
    height: width*38/32, 
    width,
    marginLeft: 15,
    marginRight: 15,
  },
  icon: {
    height: width,
    width,
    marginLeft: 15,
    marginRight: 15,
  },
  ct: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 50,
    alignItems: 'center',
  },
})
export default Item;
