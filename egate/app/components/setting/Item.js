

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const width = 18;

onPress = (type) => {
  switch(type) {
    case 'profile':
      Actions.editProfile();
      return;
    case 'security':
      Actions.security();
      return;
    case 'api':
      Actions.api();
      return;
    case 'pass':
      Actions.changePass();
      return;
    case 'kyc':
      Actions.kyc();
      return;
    default: //about
      Actions.about();
      return;
  }
}
const Item = ({
    data,
    index,
    length
}) => (
  <TouchableOpacity onPress={() => onPress(data.type)} style={[css.ct]}>
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
