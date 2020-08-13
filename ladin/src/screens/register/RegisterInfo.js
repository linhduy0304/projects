

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform
} from 'react-native';
import { Color, screen, ClTxtGrey } from '../../config/Constant';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import InputMust from '../../components/register/InputMust';
import Modal from 'react-native-modalbox';
import RNFirebase from 'react-native-firebase';

const Css = require('../../config/css');

class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openBranch: false,
      intro: 'NHẬP THÔNG TIN CÁ NHÂN',
      email: this.props.email,
      pass: '',
      pass_confirm: '',
      fullname: '',
      mobile: '',
      address: '',
      bank: '',
      branch: '',
      num_bank: '',
      token:'',
      account: '',
    };
  }

  componentWillMount = () => {
    RNFirebase.messaging().getToken()
    .then(token => {
      this.setState({token})
    });
  };

  next() {
    const {email, pass, branch, pass_confirm, fullname, mobile, address,bank, num_bank, account} = this.state;
    Keyboard.dismiss()
    if(pass === '' || pass_confirm === '' || fullname === '' || mobile === '' || address === '' ) {
      SimpleToast.show('Các ô * là bắt buộc');
      return;
    }
    if(pass.length < 6 || pass_confirm.length < 6) {
      SimpleToast.show('Mật khẩu không được nhỏ hơn 6 ký tự');
      return;
    }
    if(pass !== pass_confirm) {
      SimpleToast.show('Mật khẩu không trùng nhau');
      return;
    }
    var body = {
      email,
      password: pass,
      name: fullname,
      phone: mobile,
      address,
      bank,
      owner_account: account,
      bank_branch: branch,
      bank_number: num_bank,
      device_token: this.state.token,
      operating_system: Platform.OS === 'ios' ? 'ios' : 'android'
    }
    // console.log(body)
    this.props.registerInfo(body)
  }

  render() {
    const {email, intro, pass,branch, pass_confirm, fullname, account, mobile, address,bank, num_bank} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#c41a36',}}>
        <StatusBar
          backgroundColor={Color}
        />
         {
          this.props.auth.loading ? 
            <Loading />
          : null
          }
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <View style={Css.ctRegister}>
            <Close/>
            <Logo />
            <Text style={Css.intro}>{intro}</Text>
            <Input 
              label=''
              editable={false}
              backgroundColor='#bc1833'
              value={email}
              onChange={text => this.setState({email: text})}
            />
            <InputMust 
              label='Nhập mật khẩu'
              value={pass}
              secureTextEntry={true}
              marginTop={6}
              onChange={text => this.setState({pass: text})}
            />
            <InputMust 
              label='Xác thực mật khẩu'
              value={pass_confirm}
              marginTop={6}
              secureTextEntry={true}
              onChange={text => this.setState({pass_confirm: text})}
            />
            <InputMust 
              label='Họ và tên'
              marginTop={6}
              value={fullname}
              onChange={text => this.setState({fullname: text})}
            />
            <InputMust 
              label='Số điện thoại'
              marginTop={6}
              keyboardType='numeric'
              value={mobile}
              onChange={text => this.setState({mobile: text})}
            />
            <InputMust 
              label='Địa chỉ'
              marginTop={6}
              value={address}
              onChange={text => this.setState({address: text})}
            />
            <Input 
              label='Chủ tài khoản (Họ tên đầy đủ)'
              marginTop={6}
              value={account}
              onChange={text => this.setState({account: text})}
            />
            <TouchableOpacity onPress={() => this.setState({open: true})} style={[styles.ctBank, ]}>
              {
                bank ?
                  <Text numberOfLines={1} style={[styles.bank, {color: '#fff', textAlign: 'center'}]}>{bank}</Text>
                :
                  <Text style={styles.bank}>-- Chọn ngân hàng --</Text>
              }
              
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({openBranch: true})} style={[styles.ctBank, ]}>
              {
                branch ?
                  <Text numberOfLines={1} style={[styles.bank, {color: '#fff', textAlign: 'center'}]}>{branch}</Text>
                :
                  <Text style={styles.bank}>Chi nhánh</Text>
              }
              
            </TouchableOpacity>
            {/* <Input 
              label='-- Tên ngân hàng --'
              marginTop={6}
              value={bank}
              onChange={text => this.setState({bank: text})}
            /> */}
          
            <Input 
              label='Số tài khoản'
              marginTop={6}
              value={num_bank}
              onChange={text => this.setState({num_bank: text})}
            />
            <Button 
              label='HOÀN TẤT'
              borderRadius={20}
              marginTop={15}
              onPress={() => this.next()}
              color={Color}
              fontWeight={'bold'}
            />
            <Text onPress={() => Actions.login({type: 'reset', back: 'logout'})} style={[Css.sub, {textDecorationLine: 'underline', marginTop: 15, marginBottom: 10}]}>Huỷ bỏ</Text>
            <Text style={{color: '#fff', marginBottom: 30}}>*   <Text style={{color: '#e8bbc0',fontSize: 13, fontStyle: 'italic'}}>Bạn phải nhập đầy đủ thông tin vào các ô này</Text></Text>
          </View>
          
        </ScrollView>
        <ModalBank
          data={this.props.auth.banks ? this.props.auth.banks : []}
          open={this.state.open}
          onPress={(data) => this.setState({bank: data.name, open: false})}
          onClose={() => this.setState({open: false})}
        />
        <ModalBranch
          data={this.props.auth.cities ? this.props.auth.cities : []}
          open={this.state.openBranch}
          onPress={(data) => this.setState({branch: data.province_name, openBranch: false})}
          onClose={() => this.setState({openBranch: false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctBank: {
    width: screen.width*2/3,
    borderRadius: 20,
    height: 40,
    backgroundColor:'#a2142b',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bank: {
    fontStyle: 'italic',
    color: '#cea7ad',
    fontSize: 13,
  },
})

import {connect} from 'react-redux';
import {registerInfo} from '../../actions/auth';
import SimpleToast from 'react-native-simple-toast';
import Loading from '../../components/register/Loading';
import ModalBank from '../../components/register/ModalBank';
import Close from '../../components/register/Close';
import ModalBranch from '../../components/register/ModalBranch';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerInfo: (body) => dispatch(registerInfo(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterInfo);
