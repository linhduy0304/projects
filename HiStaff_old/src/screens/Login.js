/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  StatusBar
} from 'react-native';

import { Hoshi } from 'react-native-textinput-effects';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';
var DeviceInfo = require('react-native-device-info');
var buffer = require('buffer');

const marginTop = Platform.OS === 'ios' ? 0 : DeviceInfo.getSystemVersion().slice(0, 1) != 4 ? StatusBar.currentHeight : 0;
const css = require('../Css');

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user_name: 'linhduy',
      password: 'linhduy'
    }
  }

  login(username, password) {
    var b = new buffer.Buffer(username + ':' + password);
    var auth = 'Basic ' + b.toString('base64');
    Keyboard.dismiss()
    this.props.login(auth)
  }
 
  render() {
    return (
      <View style={styles.container}>
        <ScrollView  keyboardShouldPersistTaps={'always'}>
          <View style={{flex: 1, paddingTop: marginTop + 50, paddingBottom: 20}}>
            <View style={{alignItems: 'center'}}>
              <Image style={{height: 64, width: 200, marginBottom: 10}} source={require('../icons/logo.jpg')} />
            </View>
            <Hoshi
              style={{margin: 15}}
              value={this.state.user_name}
              inputStyle={{fontWeight: '400',}}
              label={'Tên đăng nhập'}
              // underlineColorAndroid={'transparent'}
              borderColor={'#1ab394'}
              maskColor={'#fff'}
            />
            <Hoshi
              style={{margin: 15, }}
              value={this.state.password}
              inputStyle={{fontWeight: '400'}}
              label={'Mật khẩu'}
              secureTextEntry={true}
              // underlineColorAndroid={'transparent'}
              borderColor={'#1ab394'}
              maskColor={'#fff'}
            />
            <View style={{padding: 15}}>
              <Button 
                title = 'Đăng nhập'
                color = 'white'
                onPress = {() => this.login(this.state.user_name, this.state.password)}
                fontSize = {16}
                fontWeight = '500'
                backgroundColor = 'rgb(38, 114, 203)'
              />
            </View>
          </View>
          
        </ScrollView>
        {
          this.props.auth.loading ? 
            <View style={css.mainSpin}>
              <Image source={require('../icons/loading_white.gif')} />
            </View> : null
          }
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {login} from '../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
