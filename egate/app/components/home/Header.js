

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import {screen} from '../../config/System';
import { Actions } from 'react-native-router-flux';

const Header = ({
    data,
}) => (
    <View style={css.ct}>
      <Image style={css.avatar} source={{uri: data.avatar}} />
      <View style={css.ctCenter}>
        <Text style={css.name}>{data.name}</Text>
        <Text style={[css.name, {fontWeight:'bold', fontSize: 16, marginTop: 5}]}>$ {data.total}</Text>
      </View>
      <TouchableOpacity onPress={() => Actions.login()} style={css.ctLogout}>
        <Image style={css.logout} source={require('../../icons/ic_logout.png')}/>
      </TouchableOpacity>
    </View>
);

const css = StyleSheet.create({
  ctCenter: {
    flex: 1,
    marginLeft: 10,
  },
  ctLogout: {
    padding: 5
  },
  name: {
    color: '#fff'
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  logout: {
    width: 20,
    height: 20
  },
  ct: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
})

export default Header;
