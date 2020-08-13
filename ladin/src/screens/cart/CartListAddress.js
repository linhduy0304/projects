

import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Nav from '../../components/cart/Nav';
import { Actions } from 'react-native-router-flux';
import Loading from '../../components/Loading';

const Css = require('../../config/css');

class CartListAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount = () => {
    this.props.loadAddress()
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.cart.address) {
      this.setState({data: nextProps.cart.address})
    }
  };
  
  delAddress(id) {
    Alert.alert(
      'Thông báo',
      'Bạn muốn xoá địa chỉ này?',
      [
        {text: 'Xoá', onPress: () => this.props.delAddress(id), style: 'cancel'},
        {text: 'Huỷ bỏ', onPress: () => null}
      ]
    )
  }

  direct =(data) => { //goij api lay gia ship/1kg
    // var a = renderTypeShip(data.city)
    // var body = {
    //   code: a
    // }
    // this.props.getShip(body)
    Actions.cartVerify({data: data})
  }

  renderItem(data) {
    return (
      <TouchableOpacity disabled={this.props.action === 'cart' ? false : true} onPress={() => this.direct(data)} style={{marginTop: 4,padding: 10, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={{flex: 1, color: '#7d7d7d'}}>{data.address}</Text>
            <Text style={{color: '#5d5d5d', }}>Họ và tên: <Text style={{color: '#333'}}>{data.name}</Text></Text>
            <Text style={{color: '#5d5d5d', marginTop: 3}}>Số điện thoại: <Text style={{color: '#333'}}>{data.phone}</Text></Text>
          </View>
          <View style={{justifyContent: 'space-around',}}>
            <TouchableOpacity onPress={() => Actions.cartEditAddress({data: data})} style={{ padding: 3}}>
              <Image style={{height: 20, width: 20}} source={require('../../icons/ic_edit_black.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.delAddress(data.id)} style={{ padding: 3}}>
              <Image style={{height: 20, width: 20}} source={require('../../icons/ic_trash.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    if(this.props.cart.loading) {
      return <Loading size={100} source={require('../../icons/loading.gif')}/>
    }else return null
  }

  render() {
    return (
      <View style={Css.container}>
        <Nav
          label='ĐỊA CHỈ GIAO HÀNG'
        />
        <TouchableOpacity onPress={() => Actions.cartAddress({action: this.props.action})} style={{flexDirection: 'row',marginTop: 4, backgroundColor:'#fff' ,height: 40, alignItems: 'center'}}>
          <Image style={{width: 20, height: 20, margin: 10}} source={require('../../icons/ic_add.png')} />
          <Text style={{color: '#333'}}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
        <FlatList 
          data={this.state.data}
          removeClippedSubviews
          ListHeaderComponent={() => this.renderHeader()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => this.renderItem(data.item)}
        />
      </View>

    );
  }
}

import {connect} from 'react-redux';
import {loadAddress, delAddress, getShip} from '../../actions/cart';

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadAddress: () => dispatch(loadAddress()),
    getShip: (body) => dispatch(getShip(body)),
    delAddress: (id) => dispatch(delAddress(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartListAddress);
