

import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {renderCate, renderVND} from '../Functions'
import { url } from '../../config/Constant';
import { quantity, delProduct } from "../../database/allSchema";
import { Actions } from 'react-native-router-flux';
import SizeImage from '../product/SizeImage';

const ItemCart = ({
    data,
    pick=(item, data),
    arrId,
    delProduct=(data, item)
}) => (
  <View style={{backgroundColor: '#fff', marginBottom: 10}}>
    <View style={css.ctHeader}>
      <Text style={{color: '#333', fontSize: 16}}>{data.name}</Text>
      <Text style={{color: '#0674c1', fontSize: 13}}>{renderCate(data.types)}</Text>
      <Text style={{color: '#888', marginTop: 5, fontSize: 13}}>{data.address}</Text>
    </View>
    {
      data.product.map((item, index) => {
        return (
          <View key={index} style={css.ct}>
            <TouchableOpacity onPress={() => pick(item, data)} style={css.ctCheck} >
            {
              arrId.indexOf(item.product_id)  !== -1 ?
                <Image style={{width: 13, height: 13}} source={require('../../icons/ic_check_black.png')} /> 
                : null
            }
              
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.productDetail({id: item.product_id})} style={css.ctImage}>
              {/* <Image style={css.img} source={{uri: url+ item.image}} /> */}
              <SizeImage
                size={70}
                uri={url+ item.image}
              />
            </TouchableOpacity>
            <View style={{flex: 1,}}>
              <Text onPress={() => Actions.productDetail({id: item.product_id})} numberOfLines={2} style={{color: '#333', fontWeight: 'bold'}}>{item.name}</Text>
              <Text style={css.price}>{renderVND(item.price)} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text>
              <View style={css.ctBot}>
                <View style={css.ctLeft}>
                  <TouchableOpacity onPress={() => quantity('sub', item)} style={[css.ctIncre, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <View style={css.ctCount}>
                    <Text style={{color: '#9a9a9a'}}>{item.quantity}</Text>
                  </View>
                  <TouchableOpacity onPress={() => quantity('add', item)} style={[css.ctIncre, {borderTopRightRadius: 5, borderBottomRightRadius: 5}]}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => delProduct(data.provider_id, item)} style={{padding: 15, marginLeft: 20}}>
                  <Image style={css.icDel} source={require('../../icons/ic_trash.png')}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      })
    }
    
  </View>
  
);

const css = StyleSheet.create({
  ctHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e6eff1',
    padding: 10
  },
  price: {
    color: '#0674c1',
    fontWeight: 'bold',
    marginTop: 7
  },
  img: {
    height: 60,
    width: 60
  },
  ctIncre: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icDel: {
    height: 14,
    width: 14
  },
  ctCount: {
    borderRightWidth: 1,
    borderColor: '#b6b6b6',
    borderLeftWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctLeft: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    height: 30,
    flex: 1,
    flexDirection: 'row',
  },
  ctBot: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 3,
    alignItems: 'center',
  },
  ctImage: {
    width: 70,
    height: 70,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctCheck: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ct: {
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
  },
})

export default ItemCart;
