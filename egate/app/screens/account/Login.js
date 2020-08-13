

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Image,
  Keyboard
} from 'react-native';
import Css from '../../config/Css';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import { screen } from '../../config/System';
import Button from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import Triangle from '../../components/Triangle';
import TriangleBot from '../../components/TriangleBot';
import {validateEmail} from '../../components/Functions';
import { TextField } from 'react-native-material-textfield';
import SplashScreen from 'react-native-splash-screen'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'linhduy.0304.utc@gmail.com',
      pass: '42280189',
      errEmail: null,
      errPass: null,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onChangeEmail = (text) => {
    if(!validateEmail(text)) {
      this.setState({errEmail: true});
    }else {
      this.setState({errEmail: null});
    }
    this.setState({email: text});
  }

  onChangePass = (text) => {
    if(text.length < 8) {
      this.setState({errPass: true});
    }else {
      this.setState({errPass: null});
    }
    this.setState({pass: text});
  }

  login = () => {
    const {email, pass} = this.state;
    if(email === '' || !validateEmail(email)) {
      this.setState({
        errEmail: true
      })
      this.refs.email.focus()
      return;
    };
    if(pass === '' || pass.length < 8) {
      this.setState({
        errPass: true
      })
      this.refs.pass.focus()
      return
    };
    var body = new FormData()
    body.append('email', email)
    body.append('password', pass)
    Keyboard.dismiss();
    this.props.login(body);
  }

  forgot() {
    Keyboard.dismiss();
    Actions.resetPass();
  }

  render() {
    const {email, pass, errEmail, errPass} = this.state;
    return (
      <View style={[Css.container, {alignItems: 'center',}]}>
        <StatusBar
          backgroundColor='#23434d'
        />
        {
          this.props.auth.loading ? 
            <LoadingScreen/>
          : null
        }
        <Triangle/>
        <TriangleBot/>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}  >
          <View style={styles.body}>
            <Logo/>
            <View>
              {
                errEmail ? 
                <Image style={Css.iconAbsolute} source={require('../../icons/ic_false.png')}/>
                : 
                email !== '' ?
                <Image style={Css.iconAbsolute} source={require('../../icons/ic_true.png')}/>
                :null
              }
              <TextField
                label={'Email'}
                textColor= {'#fff'}
                ref='email'
                tintColor={errEmail ? 'red' : '#fff'}
                baseColor= {'#d2d8da'}
                value={email}
                errorColor={'red'}
                activeLineWidth={0.5}
                onChangeText={ (text) => this.onChangeEmail(text) }
                style={{
                  padding: 0,
                  paddingRight: 100,
                  flex: 1,
                }}
              />
            </View>
            <View>
              <View style={{position:'absolute',alignItems: 'center', zIndex: 100,flexDirection: 'row', bottom: 15, right: 0}}>
                <Text onPress={() => this.forgot()} style={{color: '#fff'}}>Forgot?</Text>
                {
                errPass ? 
                  <Image style={{width: 15, height: 15, marginLeft: 5}} source={require('../../icons/ic_false.png')}/>
                  : 
                  pass !== '' ?
                  <Image style={{width: 15, height: 15, marginLeft: 5}} source={require('../../icons/ic_true.png')}/>
                  :null
                }
              </View>
              <TextField
                label={'Password'}
                ref='pass'
                textColor= {'#fff'}
                ref='pass'
                tintColor={errPass ? 'red' : '#fff'}
                baseColor= {'#d2d8da'}
                value={pass}
                secureTextEntry={true}
                errorColor={'red'}
                activeLineWidth={0.5}
                onChangeText={ (text) => this.onChangePass(text) }
                style={{
                  padding: 0,
                  paddingRight: 100,
                  flex: 1,
                }}
              />
            </View>
            <Button
              onPress={() => this.login()}
              label='LOGIN'
            />
            <Text onPress={() => Actions.register()}  style={styles.register}>New to site? Create Acount</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconAbsolute: {
    position: 'absolute',
    right: 0,
    bottom: 15,
    zIndex: 100,
    bottom: 15,
    height: 15,
    width: 15
  },
  register: {
    color: '#dfe1e2',
    textAlign: 'center',
    padding: 10,
    marginTop: 10,
  },
  body: {
    width: screen.width,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? screen.height/6 : 60,
  },
})

import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import LoadingScreen from '../../components/LoadingScreen';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (body) => dispatch(login(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
