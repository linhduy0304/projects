

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
import Triangle from '../../components/Triangle';
import TriangleBot from '../../components/TriangleBot';
import { Actions } from 'react-native-router-flux';
import { TextField } from 'react-native-material-textfield';
import {validateEmail} from '../../components/Functions';

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'linhduy.0304.utc@gmail.com',
      errEmail: null,
      intro: 'Reset password'
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

  next = () => {
    const {email} = this.state;
    if(email === '' || !validateEmail(email)) {
      this.setState({
        errEmail: true
      })
      this.refs.email.focus()
      return;
    };
    var body = new FormData();
    body.append('email', email)
    this.props.forgotPass(body)
    // Actions.registerSuccess({load: 'reset'}
  }

  render() {
    const {email, errEmail, intro} = this.state;
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
        <ScrollView keyboardShouldPersistTaps={'always'}>
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
            <Button
              onPress={() => this.next()}
              label='NEXT'
            />
            <Text onPress={() => Actions.register()} style={styles.register}>Create new account? Sign up</Text>
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
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? screen.height/6 : 60,
  },
})

import {connect} from 'react-redux';
import {forgotPass} from '../../actions/auth';
import LoadingScreen from '../../components/LoadingScreen';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    forgotPass: (body) => dispatch(forgotPass(body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);
