

import React from 'react';
import { Text, View, Image, TextInput, StyleSheet } from 'react-native';

const Search = ({
    params,
}) => (
    <View style={css.ct}>
      <Image style={css.icon} source={require('../../icons/ic_search_black.png')} />
      <TextInput 
        placeholder='Tìm kiếm'
        placeholderTextColor='#8b8b8b'
        autoCapitalize='none'
        selectionColor={'#333'}
        style={{
          flex: 1,
          padding: 0,
          fontSize: 13,
          color: '#333'
        }}
      />
    </View>
);

const css = StyleSheet.create({
  ct: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    height: 34,
    alignItems: 'center',
    borderRadius: 40,
  },
  icon: {
    height: 15,
    width: 15,
    margin: 10
  }
})
export default Search;
