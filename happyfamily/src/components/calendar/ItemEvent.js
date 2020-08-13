

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import Swipeout from 'react-native-swipeout';
const swipeoutBtns = (onDelete, onEdit, data) => (
  [
    {
      onPress: () => onEdit(data),
      component:  <View  style={{backgroundColor: '#30a353', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: 30, height: 30}} source={require('../../images/icons/ic_edit_white.png')} />
                  </View>
    },
    {
      onPress: () => onDelete(data),
      component:  <View style={{backgroundColor: '#e5160b', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: 30, height: 30}} source={require('../../images/icons/ic_delete.png')} />
                  </View>
    },
  ]
)

const IconIvent = ({type}) => {
  switch(type) {
    case 0:
      return <View style={[css.ctIcon, {backgroundColor: '#f79554'}]}><Image style={css.img} source={require('../../images/icons/ic_birthday_white.png')}/></View>
    default:
      return <View style={[css.ctIcon, {backgroundColor: '#a8a5a3'}]}><Image style={css.img} source={require('../../images/icons/ic_book_mark.png')}/></View>
  }
}
const ItemEvent = ({
  onPress,
  onDelete,
  onEdit,
  data
}) => (
  <Swipeout 
    right={swipeoutBtns(onDelete, onEdit, data)}
    buttonWidth={70}
    backgroundColor={data.color}
  >
      <View style={css.ctItem}>
        <IconIvent type = {data.type_event}/>
        <View>
          <Text style={css.name}>{data.type_event.title}</Text>
          <Text style={{fontSize: 12}}>Vào ngày: {data.time_start}</Text>
        </View>
    </View>
  </Swipeout>
)

const css = StyleSheet.create({
  ctIcon: {
    marginRight: 15,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 15,
    width: 15,
  },
  name: {
    color: '#000'
  },
  ctItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
})

export default ItemEvent;
  
