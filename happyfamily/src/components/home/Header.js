
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const Header = ({
  uri,
  onPress,
  onChange = status 
}) => (
  <TouchableOpacity onPress={onPress} style={css.container}>
    <View style={css.ctInput}>
      <Image style={css.avatar} source={uri ? {uri: uri+'.png'} : require('../../images/avatar_default.png')} />
      {/* <TextInput 
        value={''}
        style={css.input}
        editable = {false}
        onChangeText = {(status) => onChange(status)}
        placeholderTextColor = '#768196'
        placeholder='Bạn đang nghĩ gì?'
        underlineColorAndroid='transparent'
      /> */}
      <Text style={css.input}>Bạn đang nghĩ gì?</Text>
    </View>
    <View style={css.btn}>
      <View style={css.ctItem}>
        <View style={css.ctImg}>
          <Image source={require('../../images/icons/ic_camera_white.png')} />
        </View>
        <Text style={css.txt}>Photo</Text>
      </View>
      {/* <View style={css.ctItem}>
        <View style={css.ctImg}>
          <Image source={require('../../images/icons/ic_felling.png')} />
        </View>
        <Text style={css.txt}>Feeling</Text>
      </View>
      <View style={css.ctItem}>
        <View style={css.ctImg}>
          <Image source={require('../../images/icons/ic_location.png')} />
        </View>
        <Text style={css.txt}>Location</Text>
      </View> */}
    </View>
  </TouchableOpacity>
)

const css = StyleSheet.create({
  txt: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#0d0e15'
  },
  btn: {
    marginTop: 15,
    flexDirection: 'row',
  },
  ctImg: {
    backgroundColor: '#fe2042',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 15,
    padding: 0,
    fontSize: 16,
  },
  ctInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
})

export default Header;
  