

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

class ForgotPassVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: 'XÁC MINH MẬT KHẨU',
      code: '',
      sub: 'Chúng tôi đã gửi cho bạn 1 email chứa mã xác minh, vui lòng check email, nhập mã xác minh và thay đổi lại mật khẩu'
    };
  }

  next() {
    const {code} = this.state;
    Keyboard.dismiss()
    if(code === '') {
      SimpleToast.show('Mã xác minh không được để trống');
      return;
    }
    var body = {
      verification_code: code,
      email: this.props.email
    }
    this.props.forgotPassVerify(body)
  }

  render() {
    const {code, intro, sub} = this.state;
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
            <Text style={Css.sub}>{sub}</Text>
            <Input 
              label='Mật mã xác minh'
              value={code}
              onChange={text => this.setState({code: text})}
            />
            <Button 
              label='XÁC MINH'
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
import {forgotPassVerify} from '../../actions/auth';
import SimpleToast from 'react-native-simple-toast';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassVerify: (body) => dispatch(forgotPassVerify(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassVerify);
