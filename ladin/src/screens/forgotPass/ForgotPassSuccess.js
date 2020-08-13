

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Keyboard
} from 'react-native';
import { Color } from '../../config/Constant';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import Close from '../../components/register/Close';

const Css = require('../../config/css');

class ForgotPassSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: 'ĐỔI MẬT KHẨU',
      pass: '',
      pass_confirm: '',
    };
  }

  next() {
    const {pass, pass_confirm} = this.state;
    Keyboard.dismiss()
    if(pass === '' || pass_confirm === '') {
      SimpleToast.show('Các trường không được bỏ trống');
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
      newPassword: pass,
      email: this.props.email
    }
    this.props.forgotPassSuccess(body)
  }

  render() {
    const {pass, pass_confirm, intro, } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#c41a36'}}>
        <StatusBar
          backgroundColor={Color}
        />
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <View style={[Css.ctRegister, {paddingBottom: 20}]}>
            <Close />
            <Logo />
            <Text style={Css.intro}>{intro}</Text>
            <Input 
              label='Mật khẩu mới'
              value={pass}
              marginTop={15}
              secureTextEntry={true}
              onChange={text => this.setState({pass: text})}
            />
            <Input 
              label='Nhập lại mật khẩu mới'
              value={pass_confirm}
              marginTop={10}
              secureTextEntry={true}
              onChange={text => this.setState({pass_confirm: text})}
            />
            <Button 
              label='HOÀN TẤT'
              borderRadius={20}
              marginTop={10}
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
import {forgotPassSuccess} from '../../actions/auth';
import SimpleToast from 'react-native-simple-toast';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassSuccess: (body) => dispatch(forgotPassSuccess(body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassSuccess);
