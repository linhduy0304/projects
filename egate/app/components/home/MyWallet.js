

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

const height= 16;
const MyWallet = ({
    data,
}) => (
  <LinearGradient 
    start={{x: 0.0, y: 0.0}} 
    end={{x: 1.0, y: 1.0}}
    style={{
      borderRadius: 5,
    }}
    colors={['#6391a0','#47707d',]} 
  >
    <View style={css.ct}>
      <View style={css.ctHeader}>
        <Image style={css.icon} source={require('../../icons/ic_egate.png')}/>
        <Text style={css.name}>Egate</Text>
        <View style={css.ctPercent}>
          <Text style={css.percent}>{data.incre ? '+': '-'} {data.percent}%</Text>
        </View>
      </View>
      <Text style={css.price}>{data.price} EGT</Text>
      <Text style={css.dollar}>$ {data.dollar}</Text>
      <View style={css.ctBot}>
        <TouchableOpacity onPress={() => Actions.detail()} style={[css.ctSend, {paddingLeft: 20}]}>
          <Image style={{height, width: height*39/30}} source={require('../../icons/ic_detail.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.qrCode()} style={[css.ctSend, {paddingLeft: 20}]}>
          <Image style={{height, width: height*35/28}} source={require('../../icons/ic_scan.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.qrCode()} style={[css.ctSend, {paddingLeft: 20}]}>
          <Image style={{height, width: height}} source={require('../../icons/ic_qrcode.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.payOut()} style={[css.ctSend, {paddingLeft: 20}]}>
          <Image style={{height, width: height}} source={require('../../icons/ic_send.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.rate()} style={[css.ctSend, {paddingLeft: 20}]}>
          <Image style={{height, width: height*37/24}} source={require('../../icons/ic_chart.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
);

const css = StyleSheet.create({
  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5
  },
  dollar: {
    color: '#aeb8c4',
    fontSize: 13,
    marginTop: 3
  },
  ctSend: {
    padding: 15,
  },
  ctBot: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  percent: {
    color: '#fff',
  },
  name: {
    color: '#fff',
    flex: 1,
    fontSize: 16,
    marginLeft: 10
  },
  ctIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#162f36',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 45,
    width: 45
  },
  ctPercent: {
    backgroundColor: '#1ec070',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15
  },
  ctHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ct: {
    padding: 10,
    borderRadius: 5,
    paddingBottom: 5
  },
})

export default MyWallet;
