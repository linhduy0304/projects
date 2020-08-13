

import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { renderCate, renderVND } from '../Functions';
import { url } from '../../config/Constant';
import SizeImage from '../product/SizeImage';

const ItemOrderDetail = ({
    data,
}) => (
  <View style={css.ct}>
    <View style={css.img}>
      <SizeImage
        uri={url+ data.thumbnail}
        size={70}
      />
    </View>
    <View style={{marginLeft: 10, flex: 1}}>
      <Text style={css.name}>{data.name}</Text>
      <Text style={css.price}>Giá: <Text style={{color: '#0674c1',fontSize: 16, fontWeight: 'bold'}}>{renderVND(data.price)} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text></Text>
      <Text style={css.price}>Số lượng: <Text style={{fontWeight: 'bold', fontSize: 15}}>{data.quantity}</Text></Text>
      <Text style={css.price}>Đề xuất khách hàng: <Text style={{fontWeight: 'bold', fontSize: 15}}>{data.note}</Text></Text>
    </View>
  </View>
);

const css = StyleSheet.create({
  price: {
    color: '#333',
    marginTop: 5
  },
  name: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  img: {
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ct: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
})

export default ItemOrderDetail;
