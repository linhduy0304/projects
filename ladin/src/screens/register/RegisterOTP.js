

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  StatusBar,
  Keyboard,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { Color, screen, ClTxtGrey } from '../../config/Constant';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

const Css = require('../../config/css');

class RegisterOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      intro: 'ĐĂNG KÝ THÀNH CÔNG',
      sub: 'Chúng tôi đã gửi cho bạn 1 email chứa mã xác thực, vui lòng kiểm tra email và nhập mã xác thực',
      otp: '',
    };
  }

  next() {
    const {otp} = this.state;
    Keyboard.dismiss()
    if(otp === '') {
      SimpleToast.show('Mã OTP không được để trống');
      return;
    }
    var body = {
      verification_code: otp,
      email: this.props.email
    }
    this.props.registerOTP(body)
  }

  otpAgain = () => {
    var body = {
      email: this.props.email,
      type: 0,
    }
    this.props.otpAgain(body)
  }

  render() {
    const {otp, intro, sub, open} = this.state;
    return (
      <View style={Css.ctRed}>
        <StatusBar
          backgroundColor={Color}
        />
        
        {
          this.props.auth.loading ? 
            <Loading />
          : null
        }
        <ScrollView
          keyboardShouldPersistTaps='always'>
          <View style={[Css.ctRegister, {paddingBottom: 20}]}>
            <Close/>
            <Logo />
            <Text style={Css.intro}>{intro}</Text>
            <Text style={Css.sub}>{sub}</Text>
            <Text></Text>
            <Input 
              label='Nhập mã xác thực'
              value={otp}
              onChange={text => this.setState({otp: text})}
            />
            <Button 
              label='XÁC THỰC'
              borderRadius={20}
              marginTop={20}
              onPress={() => this.next()}
              color={Color}
              fontWeight={'bold'}
            />
            <Text onPress = {() => this.otpAgain()} style={[Css.sub, {textDecorationLine: 'underline', marginTop: 15}]}>Yêu cầu lại mã xác thực ?</Text>
          </View>
          </ScrollView>
          <Modal
            isOpen={open}
            entry={'top'}
            onClosed={() => this.setState({open: false})}
            style={{backgroundColor: 'ababab', width: screen.width/2, justifyContent: 'center' }}>
            <View style={{backgroundColor: '#fff', alignItems: 'center', padding: 20}}>
              <TouchableOpacity onPress={()=> this.setState({open: false})} style={{padding: 10,position: 'absolute', right: 0}}>
                <Image style={{height: 18, width: 18}} source={require('../../icons/ic_close_black.png')}/>
              </TouchableOpacity>
              <Image style={{height: 34, width: 34}} source={require('../../icons/ic_confirm.png')}/>
              <Text style={{color: ClTxtGrey, marginTop: 12}}>Thành công!</Text>
            </View>
          </Modal>
        </View>
    );
  }
}

import {connect} from 'react-redux';
import {otpAgain, registerOTP} from '../../actions/auth';
import SimpleToast from 'react-native-simple-toast';
import Loading from '../../components/register/Loading';
import Close from '../../components/register/Close';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerOTP: (body) => dispatch(registerOTP(body)),
    otpAgain: (body) => dispatch(otpAgain(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOTP);
