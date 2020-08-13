

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  StatusBar,
  Keyboard,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Color } from '../../config/Constant';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import {validateEmail} from '../../components/Functions';
import SimpleToast from 'react-native-simple-toast';

const Css = require('../../config/css');

class RegisterEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: 'ĐĂNG KÝ TÀI KHOẢN',
      email: '',
      check: null,
    };
  }

  next() {
    const {email, check} = this.state;
    Keyboard.dismiss()
    if(email === '') {
      SimpleToast.show('Email không được để trống');
      return;
    }
    if(!validateEmail(email)) {
      SimpleToast.show('Email không đúng định dạng')
      return;
    }
    if(check == null) {
      SimpleToast.show('Bạn chưa đồng ý với điều khoản và quy định')
      return;
    }
    var body = {
      email: email,
      type: 0,
    }
    this.props.registerEmail(body)
  }

  render() {
    const {email, intro, check} = this.state;
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
            <Input 
              label='Email của bạn'
              value={email}
              onChange={text => this.setState({email: text})}
            />
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity onPress={() => this.setState({check: this.state.check ? null : true})} style={{width: 20, height: 20, borderWidth: 1, borderColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                {
                  check ? 
                    <Image style={{width: 15, height: 15}} source={require('../../icons/ic_check.png')}/>
                  : null
                }
              </TouchableOpacity>
              <Text style={{color: '#fff', marginLeft: 10}}>Đồng ý với <Text onPress={() => Linking.openURL('https://admin.aladin.pea.vn/dieu-khoan/dieu-khoan-dang-ky-nha-ban-le')} style={{textDecorationLine: 'underline'}}>Điều khoản & Quy định</Text> của Ladin</Text>
            </View>
            <Button 
              label='TIẾP TỤC'
              borderRadius={20}
              marginTop={20}
              onPress={() => this.next()}
              color={Color}
              fontWeight={'bold'}
            />
          </View>
        </ScrollView>

      </View>
    );
  }
}

import {connect} from 'react-redux';
import {registerEmail} from '../../actions/auth';
import Loading from '../../components/register/Loading';
import Close from '../../components/register/Close';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    registerEmail: (body) => dispatch(registerEmail(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEmail);
