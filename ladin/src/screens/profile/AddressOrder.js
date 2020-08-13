

import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Nav from '../../components/cart/Nav';
import { Actions } from 'react-native-router-flux';

const Css = require('../../config/css');

class AddressOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  // componentWillMount = () => {
  //   this.props.loadAddress()
  // };

  // componentWillReceiveProps = (nextProps) => {
  //   if(nextProps.cart.address) {
  //     this.setState({data: nextProps.cart.address})
  //   }
  // };

  renderItem(data) {
    return (
      <TouchableOpacity onPress={() => Actions.cartAdd()} style={{marginTop: 4,padding: 10, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, color: '#7d7d7d'}}>{data.address}</Text>
          <Image style={{height: 20, width: 20}} source={require('../../icons/ic_trash.png')} />
        </View>
        <Text style={{color: '#5d5d5d', marginTop: 3}}>Họ và tên: <Text style={{color: '#333'}}>{data.name}</Text></Text>
        <Text style={{color: '#5d5d5d', marginTop: 3}}>Số điện thoại: <Text style={{color: '#333'}}>{data.phone}</Text></Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={Css.container}>
        <Nav
          label='ĐỊA CHỈ GIAO HÀNG'
        />
        <TouchableOpacity onPress={() => Actions.cartAddress()} style={{flexDirection: 'row',marginTop: 4, backgroundColor:'#fff' ,height: 40, alignItems: 'center'}}>
          <Image style={{width: 20, height: 20, margin: 10}} source={require('../../icons/ic_add.png')} />
          <Text style={{color: '#333'}}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
        <FlatList 
          removeClippedSubviews
          data={this.props.profile.user.receive_address}
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => this.renderItem(data.item)}
        />
      </View>

    );
  }
}

import {connect} from 'react-redux';
// import {editProfile} from '../../actions/profile';

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // editProfile: (body) => dispatch(editProfile(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressOrder);
