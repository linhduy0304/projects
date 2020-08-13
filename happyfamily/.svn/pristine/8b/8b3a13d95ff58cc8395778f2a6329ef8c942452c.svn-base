
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
const window = Dimensions.get('window')

const heightImage = 200;

import {renderTime} from '../Functions'
import BotAction from './BotAction';

const RenderImage = ({data}) => {
  switch(data.length) {
    case 1:
      return <Image style={css.img} source={{uri: data[0] + '.png'}} />
    case 2:
      return (
        <View style={css.ct2}>
          <Image style={css.img2} source={{uri: data[0] + '.png'}} />
          <Image style={css.img2} source={{uri: data[1] + '.png'}} />
        </View>
      );
    case 3:
      return (
        <View style={css.ct2}>
          <Image style={css.img3} source={{uri: data[0] + '.png'}} />
          <View style={{justifyContent: 'space-between'}}>
            <Image style={css.img2} source={{uri: data[1] + '.png'}} />
            <Image style={css.img2} source={{uri: data[2] + '.png'}} />
          </View>
        </View>
      );
    case 4:
      return (
        <View style={{ justifyContent: 'space-between', height: 2*heightImage}}>
          <View style={[css.ct2, {height: heightImage-1}]}>
            <Image style={css.img2} source={{uri: data[0] + '.png'}} />
            <Image style={css.img2} source={{uri: data[1] + '.png'}} />
          </View>
          <View style={[css.ct2, {height: heightImage-1}]}>
            <Image style={css.img2} source={{uri: data[2] + '.png'}} />
            <Image style={css.img2} source={{uri: data[3] + '.png'}} />
          </View>
        </View>
      );
    default: 
      return (
        <View style={{ justifyContent: 'space-between', height: 2*heightImage}}>
          <View style={[css.ct2, {height: heightImage-1}]}>
            <Image style={css.img2} source={{uri: data[0] + '.png'}} />
            <Image style={css.img2} source={{uri: data[1] + '.png'}} />
          </View>
          <View style={[css.ct2, {height: heightImage-1}]}>
            <Image style={css.img2} source={{uri: data[2] + '.png'}} />
            <View style={css.img2}>
              <View style={css.ctBlur}>
                <Text style={{fontSize: 30, color: '#fff'}}>+{data.length-3}</Text>
              </View>
              <Image style={css.img2} source={{uri: data[3] + '.png'}} />
            </View>
          </View>
        </View>
      );
  }
}
const ItemImage = ({
  data,
  detail = data,
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
    <Text style={css.content}>{data.content}</Text>
    <TouchableOpacity onPress={() => detail(data)} >
      <RenderImage data= {data.images}/>
    </TouchableOpacity>
    
    <BotAction
      type = 'feed'
      count_like = {data.count_like}
      count_comment = {data.count_comment}
      is_like = {data.is_like}
      id = {data.id}
      onPress = {() => detail(data)}
    />
  </View>
)

const css = StyleSheet.create({
  ctBlur: {
    position: 'absolute',
    zIndex: 1,
    // top: 0,left: 0,
    backgroundColor: 'rgba(0,0,0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    width: (window.width-1)/2,
    height: heightImage-1,
  },
  img3: {
    width: (window.width-1)/2,
    height: 2*heightImage,
  },
  img2: {
    width: (window.width-1)/2,
    height: heightImage-1,
  },
  ct2: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  img: {
    height: heightImage
  },
  content: {
    color: '#0d0e15',
    // fontSize: 30,
    margin: 15,
    marginTop: 5
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
    marginTop: 15,
    backgroundColor: '#fff'
  },
})

export default ItemImage;
  