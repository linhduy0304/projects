
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const HeaderMenu = ({
  data,
  logout
}) => (
  <View style={css.container}>
    <Image style={css.avatar} source={data.avatar ? {uri: data.avatar+'.png'} : require('../../icons/avatar_default.jpg')} />  
    <View style={css.ctInfo}>
      <Text style={css.name}>{data.full_name}</Text> 
      <Text style={css.email}>{data.email}</Text>
      <Text onPress={logout} style={css.logout}>Đăng xuất</Text>
    </View>
  </View>
)

const css = StyleSheet.create({
  // ctLogout: {
  //   alignItems: 'flex-end',
  // },
  email: {
    fontSize: 13,
    color: '#fff'
  },
  logout: {
    color: '#4f8ef2',
    fontSize: 13,
    marginTop: 5
  },
  ctInfo: {
    marginLeft: 10,
    flex: 1
  },
  name: {
    color: '#fff',
    fontSize: 18,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#1ab394',
    // backgroundColor: '#fff'
  },
})

export default HeaderMenu;
  