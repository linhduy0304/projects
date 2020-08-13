



import React from 'react';
import { Text, View,Platform, Image, TextInput, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Color } from '../../config/Constant';
import {Actions} from 'react-native-router-flux';
import StBar from '../StBar';

const Nav = ({
  onChangeText=text,
  value,
  search
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
      <TouchableOpacity onPress={() => Actions.pop()} style={{padding: 15}}>
        <Image style={{height: 20, width: 20 }} source={require('../../icons/ic_back.png')} />
      </TouchableOpacity>
      
      <View style={css.ctSearch}>
        <TextInput 
          value={value}
          placeholder='Tìm kiếm'
          autoFocus={true}
          autoCapitalize='none'
          selectionColor={'#fff'}
          onChangeText={text => onChangeText(text)}
          onSubmitEditing={search}
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
        <TouchableOpacity onPress={search}>
          <Image style={{height: 15, width: 15 }} source={require('../../icons/ic_search.png')} />
        </TouchableOpacity>
      </View>
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
    marginRight: 15,
    paddingRight: 15
  },
})

export default Nav;
