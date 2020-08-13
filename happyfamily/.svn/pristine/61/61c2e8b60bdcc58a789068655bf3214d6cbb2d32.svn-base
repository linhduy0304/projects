
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

const BoxComment = ({
  show,
  onChange = message,
  send,
  value,
}) => (
  <View style={css.container}>
    <View style={css.ctInput}>
      <TextInput
        value={value}
        onChangeText={(message) => onChange(message)}
        underlineColorAndroid='transparent'
        placeholder='Nhập bình luận'
        onSubmitEditing={send}
        placeholderTextColor='#b8b9bd'
        style={css.input}
      />
    </View>
    {
      show ? 
        <TouchableOpacity style={{padding: 10}} onPress={send}>
          <Text style={css.txtSend}>Gửi</Text>
        </TouchableOpacity>
        : null
    }
    
  </View>
)

const css = StyleSheet.create({
  txtSend: {
    color: '#c6247d',
    fontSize: 16,
  },
  container: {
    height: 50,
    backgroundColor:'#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: 0,
    color: '#c6247d',
    paddingLeft: 10
  },
  ctInput: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e5e9ea',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    paddingRight: 10,
    height: 40,
  },
})

export default BoxComment;
  