
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput
} from 'react-native';

const ButtonInput = ({
  onChange = message,
  send,
  value,
}) => (
  <View style={styles.container}>
    <Image source={require('../../images/icons/ic_add.png')} />
    <View style={styles.ctInput}>
      <TextInput
        value={value}
        onChangeText={(message) => onChange(message)}
        underlineColorAndroid='transparent'
        placeholder='Message'
        onSubmitEditing={send}
        placeholderTextColor='#b8b9bd'
        style={styles.input}
      />
    </View>
    <TouchableOpacity style={{padding: 10}} onPress={send}>
      <Text style={styles.txtSend}>Gửi</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  txtSend: {
    color: '#c6247d',
    fontSize: 16,
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
    marginLeft: 15,
    marginRight: 5,
    alignItems: 'center',
    paddingRight: 10,
    height: 40,
  },
  container: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
})

export default ButtonInput;
  