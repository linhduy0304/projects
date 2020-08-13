

import React from 'react';
import { Text, View } from 'react-native';
const a = ['', '', '','']
const Input = ({
  length,
}) => (
  <View style={{flexDirection: 'row', marginTop: 20, }}>
    {
      a.map((item, index) => {
        if(index+1 <= length) {
          return (
            <View key={index} style={{height: 20,alignItems: 'center', justifyContent: 'center', width: 20, margin: 10, borderRadius: 10, backgroundColor: '#303c41',}}>
              <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: '#23434d',}}/>
            </View>
          )
        }else return <View key={index} style={{height: 20, width: 20, margin: 10, borderRadius: 10, backgroundColor: '#303c41',}}/>
      })
    }
  </View>
);

export default Input;
