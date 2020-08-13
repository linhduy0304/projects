

import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const renderBorder = (index, length) => {
  switch(index) {
    case 0:
      return {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      }
    case length-1:
     return {
       borderBottomLeftRadius: 5,
       borderBottomRightRadius: 5,
     }
  }
}

const Item = (data, index, length) => {
  return (
    <View key={index} style={{marginBottom: 1}}>
      <LinearGradient
        start={{x: 0.0, y: 0.0}} 
        end={{x: 1.0, y: 1.0}}
        style={renderBorder(index, length)}
        colors={['#4e7886', '#4c7683','#49727f','#456d7a']} 
      >
        <View style={css.ctItem} >
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={css.label}>{data.label}</Text>
            <Text style={css.price}>{data.price}</Text>
          </View>
          <View style={{flexDirection: 'row',marginTop: 3, justifyContent:'space-between'}}>
            <Text style={css.to}>To: {data.to}</Text>
            {
              data.status === 1 ?
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[css.status, {color: '#12ff8a'}]}>Completed</Text>
                <Image style={{width: 16, height: 16*21/22}} source={require('../../icons/ic_success.png')}/>
              </View>
            :  
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[css.status, {color: '#ffba00'}]}>Pending</Text>
                <Image style={{width: 16, height: 16*22/21}} source={require('../../icons/ic_warning.png')}/>
              </View>
            }
          
          </View>
        </View>
      </LinearGradient>
    </View>
    
  )
}
const ItemHistory = ({
    data,
}) => (
    <View>
      <Text style={css.date}>{data.date}</Text>
      {
        data.history.map((item, index) => {
          return Item(item, index, data.history.length)
        })
      }
    </View>
);
const css = StyleSheet.create({
  status: {
    fontSize: 12,
    marginRight: 5
  },
  to: {
    color: '#9aacb4',
    fontSize: 13,
  },
  date: {
    color: '#fefefe',
    marginTop: 25,
    marginBottom: 10
  },
  label: {
    color: '#f6f8f8'
  },
  price: {
    color: '#f6f8f8',
    fontWeight: 'bold',
  },
  ctItem: {
    padding: 15
  },
})

export default ItemHistory;
