
import React, { Component, PureComponent } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Keyboard,
  ScrollView
} from 'react-native';
import Nav from '../../components/cart/Nav';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { screen } from '../../config/Constant';
import { Actions } from 'react-native-router-flux';
import Loading from '../../components/register/Loading';
import ModalCity from '../../components/cart/ModalCity'
import SimpleToast from 'react-native-simple-toast'
import ModalDistrict from '../../components/cart/ModalDistrict';

class CartEditAddress extends PureComponent {
  constructor(props) {
    super(props);
    let data = this.props.data;
    this.state = {
      name: data.name,
      mobile: data.phone,
      address: data.address,
      city: data.city,
      district: data.town,
      district_id: data.town_id,
      ward: data.area,
      open: false,
      openDistrict: false,
      districts:[]
    };
  }

  componentWillMount = () => {
    for(let i of this.props.auth.cities) {
      if(i.province_name === this.props.data.city) {
        this.setState({
          districts: i.districts
        })
      }
    }
  };
  

  edit() {
    Keyboard.dismiss();
    const {name, mobile, address, city, district, district_id, ward} = this.state;
    if(name === '' ||mobile === '' ||address === '' ||city === '' ||district === '' || ward === '') {
      SimpleToast.show('Các trường * không được để trống')
      return;
    }
    var body = {
      name: name,
      phone: mobile,
      address: address,
      city: city,
      town: district,
      town_id: district_id,
      area: ward
    }
    this.props.editAddress(body, this.props.data.id)
  }

  setCity = (data) => {
    if(this.state.city !== data.province_name) {
      this.setState({district: '', district_id: null})
    }
    this.setState({city: data.province_name,districts: data.districts, open: false})
  }

  render() {
    const {name, mobile, address, city, district, ward} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#e6eff1'}}>
        {
          this.props.cart.loading ? 
            <Loading />
          : null
        }
        <Nav label='SỬA ĐỊA CHỈ GIAO HÀNG'>
          <TouchableOpacity onPress={() => this.edit()} style={{padding: 15, position: 'absolute', right: 0}}>
            <Image style={{height: 18, width: 18}} source={require('../../icons/ic_check.png')} />
          </TouchableOpacity>
        </Nav>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <View style={{flex: 1, paddingTop: 20, alignItems: 'center'}}>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.must}>*</Text>
              <Input 
                label='Họ tên'
                value={name}
                selectionColor='#333'
                color='#333'
                placeholderTextColor='#9a9a9a'
                width={screen.width-60}
                backgroundColor='#fff'
                onChange={text => this.setState({name: text})}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.must}>*</Text>
              <Input 
                label='Số điện thoại'
                value={mobile}
                selectionColor='#333'
                color='#333'
                marginTop={10}
                placeholderTextColor='#9a9a9a'
                width={screen.width-60}
                backgroundColor='#fff'
                onChange={text => this.setState({mobile: text})}
            />
            </View>
            
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.must}>*</Text>
              <TouchableOpacity onPress={() => {
                  Keyboard.dismiss()
                  setTimeout(() => {
                    this.setState({open: true})
                  }, 100)
                  }
                } style={[styles.ctCity, ]}>
                {
                  city ?
                    <Text style={{color:'#333', fontStyle: 'italic'}}>{city}</Text>
                  :
                    <Text style={{color:'#9a9a9a', fontStyle: 'italic'}}>Chọn Tỉnh / Thành Phố</Text>
                }
                
              </TouchableOpacity>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.must}>*</Text>
              <TouchableOpacity onPress={() => {
                Keyboard.dismiss();
                setTimeout(() => {
                  this.state.districts.length == 0 ? null : this.setState({openDistrict: true})
                },100)
                }}
                style={[styles.ctCity, ]}>
                {
                  district ?
                    <Text style={{color:'#333', fontStyle: 'italic'}}>{district}</Text>
                  :
                    <Text style={{color:'#9a9a9a', fontStyle: 'italic'}}>Chọn Quận / Huyện</Text>
                }
                
              </TouchableOpacity>
            </View>

            {/* <View style={{justifyContent: 'center'}}>
              <Text style={styles.must}>*</Text>
              <Input 
                label='Chọn Quận / Huyện'
                value={district}
                selectionColor='#333'
                color='#333'
                marginTop={10}
                placeholderTextColor='#9a9a9a'
                width={screen.width-60}
                backgroundColor='#fff'
                onChange={text => this.setState({district: text})}
              />
            </View> */}
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.must}>*</Text>
              <Input 
                label='Chọn Phường / Xã'
                value={ward}
                selectionColor='#333'
                color='#333'
                marginTop={10}
                placeholderTextColor='#9a9a9a'
                width={screen.width-60}
                backgroundColor='#fff'
                onChange={text => this.setState({ward: text})}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.must}>*</Text>
              <View style={styles.ctAddress}>
                <TextInput
                  placeholder={'Nhập địa chỉ giao hàng chi tiết'}
                  placeholderTextColor='#9a9a9a'
                  value={address}
                  multiline={true}
                  autoCapitalize='none'
                  selectionColor={'#333'}
                  style={{
                    flex: 1,
                    padding: 0,
                    fontSize: 13,
                    textAlign: 'center',
                    fontStyle: 'italic',

                  }}
                  onChangeText={text => this.setState({address: text})}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        
        <ModalCity
          data={this.props.auth.cities ? this.props.auth.cities : []}
          open={this.state.open}
          onPress={(data) => this.setCity(data)}
          onClose={() => this.setState({open: false})}
        />
        <ModalDistrict
          data={this.state.districts}
          open={this.state.openDistrict}
          onPress={(data) => this.setState({district: data.name,district_id: data.id, openDistrict: false})}
          onClose={() => this.setState({openDistrict: false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctCity: {
    width: screen.width-60,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  ctAddress: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 100,
    width: screen.width-60,
    borderRadius: 4,
  },
  must: {
    position: 'absolute',
    color: '#c41a36',
    fontSize: 16, 
    left: -15
  }
})

import {connect} from 'react-redux';
import {editAddress} from '../../actions/cart';

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    editAddress: (body, id) => dispatch(editAddress(body, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartEditAddress);
