

import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import CtIcon from '../product/CtIcon';

const VerifyAddress = ({
    data,
}) => (
    <View style={css.ct}>
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        <CtIcon source={require('../../icons/ic_location.png')}/>
        <Text style={css.label}>Địa chỉ giao hàng</Text>
      </View>
      {/* <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
        <Image style={{width: 26, height: 26}} source={require('../../icons/ic_add.png')} />
        <Text style={{color: '#333', marginLeft: 10}}>Thêm địa chỉ mới</Text>
      </View> */}
      <Text style={[css.add, {marginTop: 15}]}>{data.address_detail}</Text>
      <Text style={[css.add,{fontSize: 13, color: '#333'}]}>Họ và tên: <Text style={css.name}>{data.name}</Text></Text>
      <Text style={[css.add,{fontSize: 13, color: '#333'}]}>Số điện thoại: <Text style={css.name}>{data.phone}</Text></Text>
    </View>
    
);

const css = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  add: {
    color: '#9a9a9a',
    marginTop:2
  },
  ct: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333'
  },
})

export default VerifyAddress;
