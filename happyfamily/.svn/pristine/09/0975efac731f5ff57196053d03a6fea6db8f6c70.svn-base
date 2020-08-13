

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {Actions} from 'react-native-router-flux';
const ItemIndividual = ({
  onPress,
  data,
  deleteIndividual,
}) => (
  <Swipeout
    right={[
      {
        text: 'Sửa',
        onPress: function(){ Actions.addIndividual({id: data.individual.id}) },
        type: 'primary',
      },
      {
        text: 'Xóa',
        onPress: function(){ deleteIndividual(data.individual.id) },
        type: 'delete',
      }
    ]}
    style={{backgroundColor: '#FFFFFF', borderRadius: 0}}
    autoClose={true}
    >
    <TouchableOpacity style={styles.ctItem} onPress={() => Actions.addIndividual({id: data.individual.id})}>
      <Image source={data.avatar ? {uri: data.avatar+ '.png'} : require('../../images/avatar_default.png')} style={styles.avatar} />
      <View style={styles.ctInfo}>
        <Text style={styles.fullName}>{data.individual.full_name}</Text>
        <Text style={styles.relation}>{data.relationship_type.description} của bạn.</Text>
      </View>
    </TouchableOpacity>
  </Swipeout>
)

const styles = StyleSheet.create({
  relation: {
    fontSize: 13,
    color: '#90949c',
    fontWeight: '300'
  },
  fullName: {
    fontSize: 17,
    color: '#000',
    fontWeight: '500'
  },
  ctInfo: {
    flex: 1,
  },
  ctItem: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: '#FFFFFF'
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
  }
})

export default ItemIndividual;
  
