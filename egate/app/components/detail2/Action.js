

import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

const height = 20;
const Action = ({
    params,
}) => (
    <LinearGradient
      start={{x: 0.0, y: 0.0}} 
      end={{x: 1.0, y: 1.0}}
      style={{
        borderRadius: 5,
        marginTop: 30
      }}
      colors={['#5d8f9e', '#5d909f','#5d8f9f','#5d8f9f']} 
    >
      <View style={css.ct}>
        <TouchableOpacity onPress={() => Actions.qrCode()} style={css.ctItem}>
          <Image style={{height, width: height*45/36}} source={require('../../icons/ic_scan2.png')}/>
          <Text style={css.label}>QRCode</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.qrCode()} style={css.ctItem}>
          <Image style={{height, width: height*37/36}} source={require('../../icons/ic_qrcode2.png')}/>
          <Text style={css.label}>Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.payOut()} style={css.ctItem}>
          <Image style={{height, width: height*34/36}}  source={require('../../icons/ic_send2.png')}/>
          <Text style={css.label}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.rate()} style={css.ctItem}>
          <Image style={{height, width: height*39/26}} source={require('../../icons/ic_chart2.png')}/>
          <Text style={css.label}>Chart</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
);

const css = StyleSheet.create({
  ctItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    marginTop: 14,
    fontSize: 13
  },
  ct: {
    // backgroundColor: '#,
    height: 90,

    flexDirection: 'row',
  },
})
export default Action;
