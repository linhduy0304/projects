
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import TimeAgo from 'react-native-timeago';
import {renderTime} from '../Functions'
import BotAction from './BotAction';

const ItemPost = ({
  data,
  detail,
}) => (
  <View style={css.container}>
    <View style={css.ctHeader}>
      <Image style={css.avatar} source={data.user.avatar ? {uri: data.user.avatar+'.png'} : require('../../images/avatar_default.png')} />
      <View style={css.ctName}>
        <Text style={css.fullName}>{data.user.full_name}<Text style={css.des}> {data.des}</Text></Text>
        <Text style={css.time}>{renderTime(data.created_at)}</Text>
      </View>
      {/* <TouchableOpacity style={{padding: 7}}>
        <Image source ={require('../../images/icons/ic_more.png')} />
      </TouchableOpacity> */}
    </View>
    <TouchableOpacity onPress={() => detail(data)} style={css.ctContent}>
      <Text style={css.content}>{data.content}</Text>
    </TouchableOpacity>
    <BotAction
      type = 'feed'
      count_like = {data.count_like}
      count_comment = {data.count_comment}
      id = {data.id}
      is_like = {data.is_like}
      onPress = {() => detail(data)}
    />
  </View>
)

const css = StyleSheet.create({
  content: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  ctContent: {
    backgroundColor: '#c6247d',
    padding: 15,
    paddingTop: 30,
    paddingBottom: 30
  },
  time: {
    color: '#768196',
    fontSize: 12,
    marginTop: 5
  },
  ctName: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  des: {
    fontWeight: '400',
  },
  fullName: {
    color: '#0d0e15',
    fontSize: 16,
  },
  ctHeader: {
    flexDirection: 'row',
    padding: 15
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container: {
    // borderTopWidth: 15,
    marginTop: 15,
    backgroundColor: '#fff'
  },
})

export default ItemPost;
  