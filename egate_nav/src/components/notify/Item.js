



import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const renderStyle = (index, length) => {
  switch(index) {
    case length-1:
     return {
       borderBottomWidth: 0,
     }
    default: 
     return{
      borderBottomWidth: 1,
      borderColor:'#28444d'
     }
  }
}

const renderBorder = (index, length) => {
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
  <View>
    <LinearGradient
      start={{x: 0.0, y: 0.0}} 
      end={{x: 1.0, y: 1.0}}
      style={renderBorder(index, length)}
      colors={['#4d7684', '#4d7684','#4d7684','#4d7684', '#4d7684']} 
        >
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', }}>
        <View style={css.ctIcon}>
          <Image style={{width: 25, height: 19,}} source={require('../../icons/ic_egate_1.png')}/>
        </View>
        <View style={[css.ctItem, renderStyle(index, length)]}>
          <View style={css.ctLeft}>
            <Text style={css.title}>{data.title}</Text>
            <Text style={css.code}>{data.code}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{height: 11, width: 6}} source={require('../../icons/ic_right.png')}/>
          </View>
        </View>
      </View>
    </LinearGradient>
  </View>
  
);

const css = StyleSheet.create({
  ctIcon: {
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15, marginLeft: 15
  },
  code: {
    color: '#9baeb5',
    marginTop: 4
  },
  title: {
    color: '#fff',
    fontSize: 16
  },
  ctLeft: {
    flex: 1,
  },
  ctItem: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 0
  },
})
export default Item;
