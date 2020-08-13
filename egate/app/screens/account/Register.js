

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  Keyboard,
  StatusBar
} from 'react-native';
import Css from '../../config/Css';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import { screen } from '../../config/System';
import ButtonGradient from '../../components/ButtonGradient';
import Triangle from '../../components/Triangle';
import TriangleBot from '../../components/TriangleBot';
import { Actions } from 'react-native-router-flux';
import { TextField } from 'react-native-material-textfield';
import {validateEmail} from '../../components/Functions';
import Toast from 'react-native-simple-toast';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'duy1@yopmail.com',
      pass: 'linhduy0304',
      confirmPass: 'linhduy0304',
      errEmail: null,
      errPass: null,
      errConfirmPass: null,
      intro: 'Create Account Egate'
    };
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

  onChangeConfirmPass = (text) => {
    if(text.length < 8) {
      this.setState({errConfirmPass: true});
    }else {
      this.setState({errConfirmPass: null});
    }
    this.setState({confirmPass: text});
  }

  register = () => {
    const {email, pass, confirmPass} = this.state;
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
    if(confirmPass === '' || confirmPass.length < 8) {
      this.setState({
        errConfirmPass: true
      })
      this.refs.confirmPass.focus()
      return
    };
    if(confirmPass !== pass) {
      Toast.show('Password does not match!')
      return
    }
    var body = new FormData()
    body.append('email', email)
    body.append('password', pass)
    body.append('re_password', confirmPass)
    Keyboard.dismiss();
    this.props.register(body);
    // Actions.registerSuccess({load: 'register'})
  }

  render() {
    const {email, errEmail, pass, errPass, confirmPass, errConfirmPass, intro} = this.state;
    return (
      <View style={[Css.container, {alignItems: 'center'}]}>
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
        <ScrollView  keyboardShouldPersistTaps={'always'}>
          <View style={styles.body}>
            <Logo/>
            <Text style={styles.intro}>{intro}</Text>
            <View style={{marginTop: 15}}>
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
            <View >
              {
                errPass ? 
                <Image style={Css.iconAbsolute} source={require('../../icons/ic_false.png')}/>
                : 
                pass !== '' ?
                <Image style={Css.iconAbsolute} source={require('../../icons/ic_true.png')}/>
                :null
              }
              <TextField
                label={'Password'}
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
            <View>
              {
                errConfirmPass ? 
                <Image style={Css.iconAbsolute} source={require('../../icons/ic_false.png')}/>
                : 
                confirmPass !== '' ?
                <Image style={Css.iconAbsolute} source={require('../../icons/ic_true.png')}/>
                :null
              }
              <TextField
                label={'Confirm Password'}
                textColor= {'#fff'}
                ref='confirmPass'
                tintColor={errConfirmPass ? 'red' : '#fff'}
                baseColor= {'#d2d8da'}
                value={confirmPass}
                secureTextEntry={true}
                errorColor={'red'}
                activeLineWidth={0.5}
                onChangeText={ (text) => this.onChangeConfirmPass(text) }
                style={{
                  padding: 0,
                  paddingRight: 100,
                  flex: 1,
                }}
              />
            </View>

            <ButtonGradient
              onPress={() => this.register()}
              label='REGISTER'
            />
            <Text onPress={() => Actions.login({type: 'reset'})}  style={styles.register}>Already a member? Sign In</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  register: {
    color: '#dfe1e2',
    textAlign: 'center',
    padding: 10,
    marginTop: 10,
  },
  intro: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16
  },
  body: {
    width: screen.width,
    paddingTop: Platform.OS === 'ios' ? screen.height/6 : 60,
    padding: 20
  },
})

import {connect} from 'react-redux';
import {register} from '../../actions/auth';
import LoadingScreen from '../../components/LoadingScreen';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    register: (body) => dispatch(register(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
