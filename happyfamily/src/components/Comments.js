
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import {renderTime} from '../components/Functions'

const Comments = ({data}) => (
  <View style={{flexDirection: 'row', marginTop: 15, borderBottomColor: '#F1F8FF', borderBottomWidth: 1}}>
    <Image style={{height: 34, width: 34, borderRadius: 17}} source={data.user_data.avatar ? {uri: data.user_data.avatar + '_100x100.png'}: require('../images/avatar_default.png')} />
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', marginLeft: 18, alignItems: 'center'}}>
        <Text style={{fontSize: 15, color: 'rgb(53, 69, 164)', fontWeight: 'bold'}}>{data.user_data.full_name}</Text>
        <Text style={{color: 'rgb(153, 163, 171)', marginLeft: 5}}>{data.user_data.username}</Text>
      </View>
      <View style={{backgroundColor: '#fff', marginTop: 5, borderRadius: 10, marginLeft: 5, padding: 13}}>
        <Text>{data.content}</Text>
      </View>
      <Text style={{fontSize: 12,margin: 5, color: 'rgb(153, 163, 171)'}}>{renderTime(data.created_at)}</Text>
    </View>
  </View>
)

const css = StyleSheet.create({
 
})

export default Comments;
  