

import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import Input from '../Input';
import { screen, url } from '../../config/Constant';
import { renderVND } from '../Functions';
import SizeImage from '../product/SizeImage';

class ItemProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: ''
    };
  }

  onChange(text) {
    this.props.setNote(text, this.props.data.product_id)
    this.setState({note: text})
  }

  render() {
    const {data} = this.props
    return (
      <View style={css.ct}>
        <View style={css.img}>
          <SizeImage
            size={70}
            uri = {url+ data.image}
          />  
        </View>
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={css.name}>{data.name}</Text>
          <Text style={css.price}>Giá: <Text style={{color: '#0674c1',fontSize: 16, fontWeight: 'bold'}}>{renderVND(data.price)} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text></Text>
          <Text style={css.price}>Số lượng: <Text style={{fontWeight: 'bold', fontSize: 15}}>{data.quantity}</Text></Text>
          {/* <Text style={css.price}>Kho hàng: <Text style={{fontWeight: 'bold', fontSize: 15}}>{data.store}</Text></Text> */}
          
          <View style={[css.ctInput]}>
            <TextInput
              placeholder={'Nhập chủng loại sản phẩm cần mua (nếu có)'}
              placeholderTextColor={'#8c9192'}
              value={this.state.note}
              selectionColor={'#333'}
              style={css.ctInput1}
              multiline={true}
              onChangeText={text => this.onChange(text)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const css = StyleSheet.create({
  ctInput1: {
    flex: 1,
    color:'#333',
    fontSize: 13,
    paddingLeft: 20,
    paddingTop: 5,
    minHeight: 60,
    paddingBottom: 5,
    paddingRight: 20,
    fontStyle: 'italic',
  },
  ctInput: {
    marginTop: 10,
    width: screen.width-120,
    borderRadius: 20,
    backgroundColor:'#e6eff1'
  },
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
})

export default ItemProduct;
