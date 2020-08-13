

import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const renderStyle = (index, length) => {
  switch(index) {
    case 0:
      return {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }
    case length-1:
     return {
       borderBottomLeftRadius: 4,
       borderBottomRightRadius: 4,
     }
  }
}
const Item = ({
    data,
    index,
    length
}) => (
  <View style={{marginBottom: 1}}>
    <LinearGradient
      start={{x: 0.0, y: 0.0}} 
      end={{x: 1.0, y: 1.0}}
      style={renderStyle(index, length)}
      colors={['#4d7684', '#4d7684','#4d7684','#4d7684', '#4d7684']} 
        >
      <View style={css.ctItem}>
        <View style={css.ctLeft}>
          <Text style={css.title}>{data.title}</Text>
          <Text style={css.code}>{data.code}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={css.price}>{data.status === 1 ? '+' : '-'}{data.price}</Text>
          <Image style={{height: 11, width: 6}} source={require('../../icons/ic_right.png')}/>
        </View>
      </View>
    </LinearGradient>
  </View>
  
);

const css = StyleSheet.create({
  price: {
    marginRight: 8,
    fontWeight: 'bold',
    color:'#fff',
    fontSize: 18
  },
  title: {
    color: '#fff',
    fontSize: 16
  },
  code: {
    color: '#9baeb6',
    fontSize: 13,
    marginTop: 5
  },
  ctLeft: {
    flex: 1,
  },
  ctItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
})
export default Item;
