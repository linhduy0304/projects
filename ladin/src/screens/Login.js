

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  StatusBar,
  Image,
  ScrollView, 
  Keyboard,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Color, screen } from '../config/Constant';
import Input from '../components/Input';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
import RNFirebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';

const Css = require('../config/css');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: 'MUA SIÊU RẺ - BÁN THÔNG MINH',
      email: '',
      pass: '',
      token: '',
    };
  }

  componentWillMount = () => {
    RNFirebase.messaging().getToken()
    .then(token => {
      this.setState({token})
    });
  };

  componentDidMount = () => {
    SplashScreen.hide();
  };
  

  register() {
    Keyboard.dismiss();
    Actions.registerEmail();
  }

  login() {
    const {email, pass} = this.state;
    Keyboard.dismiss();
    if(email === '' || pass === '') {
      Toast.show('Các trường không được để trống.');
      return;
    }
    var data = {
      email: this.state.email,
      password: this.state.pass,
      device_token: this.state.token,
      operating_system: Platform.OS === 'ios' ? 'ios' : 'android'
    }
    this.props.login(data)
  }

  back =() => {
    if(this.props.back == 'logout') {
      Actions.tab();
      return
    }
    Actions.pop()
  }

  render() {
    const {email, intro, pass} = this.state;
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
          keyboardShouldPersistTaps='always'
        >
          <View style={[Css.ctRegister, {paddingBottom: 20}]}>
            <View style={{width: screen.width, alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => this.back()}
                style={{padding: 15}}>
                <Image style={{width: 20, height: 20}} source={require('../icons/ic_close.png')} />
              </TouchableOpacity>
            </View>
            <Logo/>
            <Text style={Css.intro}>{intro}</Text>
            <Input
              label='Email'
              value={email}
              onChange={text => this.setState({email: text})}
            />
            <Input
              label='Mật khẩu'
              value={pass}
              marginTop={10}
              secureTextEntry={true}
              onChange={text => this.setState({pass: text})}
            />
            <Button
              label='ĐĂNG NHẬP'
              borderRadius={20}
              marginTop={10}
              onPress={() => this.login()}
              color={'#026eb9'}
              fontWeight={'bold'}
            />
            <Text onPress={() => Actions.forgotPass()} style={{textDecorationLine: 'underline',color: '#fff', marginTop: 15}}>Bạn quên mật khẩu ?</Text>
            <Text style={{color: '#eabbc0', marginTop: 15,}}>Bạn chưa có tài khoản ?</Text>
            
            <Button
              label='ĐĂNG KÝ NGAY'
              borderRadius={20}
              marginTop={10}
              width = {screen.width/2}
              onPress={() => this.register()}
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
import {login} from '../actions/auth';
import {setTab} from '../actions/tab';
import Loading from '../components/register/Loading';
import Close from '../components/register/Close';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
    setTab: (data) => dispatch(setTab(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
