

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
import {validateEmail} from '../../components/Functions';
import SimpleToast from 'react-native-simple-toast';

const Css = require('../../config/css');

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: 'QUÊN MẬT KHẨU',
      email: '',
    };
  }

  next() {
    const {email} = this.state;
    Keyboard.dismiss()
    if(email === '') {
      SimpleToast.show('Email không được để trống');
      return;
    }
    if(!validateEmail(email)) {
      SimpleToast.show('Email không đúng định dạng')
      return;
    }
    var body = {
      email: email,
      type: 1,
    }
    this.props.forgotPassEmail(body)
  }

  render() {
    const {email, intro} = this.state;
    return (
      <View style={Css.ctRed}>
        <StatusBar
          backgroundColor={Color}
        />
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <View style={[Css.ctRegister, {paddingBottom: 20}]}>
            <Close/>
            <Logo />
            <Text style={Css.intro}>{intro}</Text>
            <Input 
              label='Nhập email xác minh'
              value={email}
              onChange={text => this.setState({email: text})}
            />
            <Button 
              label='TIẾP TỤC'
              borderRadius={20}
              marginTop={10}
              onPress={() => this.next()}
              color={'#026eb9'}
              fontWeight={'bold'}
            />
          </View>
           
        </ScrollView>
        
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {forgotPassEmail} from '../../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassEmail: (body) => dispatch(forgotPassEmail(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);
