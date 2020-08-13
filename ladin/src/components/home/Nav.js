

import React from 'react';
import { Text,Platform,StatusBar, View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Color } from '../../config/Constant';
import {Actions} from 'react-native-router-flux';
import StBar from '../StBar';

const Nav = ({
    params,
}) => (
  <View>
    <StatusBar
      backgroundColor={Color}
      barStyle='light-content'
    />
    {
      Platform.OS === 'ios' ?
        <StBar/>
      : null
    }
    <View style={css.ct}>
      {/* <TouchableOpacity style={{padding: 15}}>
        <Image style={{height: 20, width: 20 }} source={require('../../icons/ic_menu.png')} />
      </TouchableOpacity> */}
      
      <Image style={{height: 30, width: 30*1231/322, marginLeft: 15,}} source={require('../../icons/logo.png')} />
      <TouchableOpacity onPress={() => Actions.search()} style={css.ctSearch}>
        <TextInput 
          placeholder='Tìm kiếm'
          selectionColor={'#fff'}
          editable={false}
          autoCapitalize='none'
          placeholderTextColor='#d4abaf'
          style={{
            flex: 1,
            padding: 0,
            fontSize: 13,
            fontStyle: 'italic',
            paddingLeft: 15,
            color: '#fff'
          }}
        />
        <Image style={{height: 15, width: 15 }} source={require('../../icons/ic_search.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Actions.about({title: 'Trợ giúp', slug: 'tro-giup'})} style={{padding: 15}}>
        <Image style={{height: 22, width: 22 }} source={require('../../icons/ic_info.png')} />
      </TouchableOpacity>
    </View>
  </View>

);

const css = StyleSheet.create({
  ct: {
    backgroundColor: '#c41a36', 
    height: 50, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctSearch: {
    flex: 1,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9d152b',
    borderRadius: 20,
    marginLeft: 20,
    paddingRight: 15
  },
})

export default Nav;
