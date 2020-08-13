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
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import {validateEmail} from '../components/Functions'
import NoInternet from '../components/NoInternet'
//import RNFirebase from 'react-native-firebase';
import RNFirebase from 'react-native-firebase';

let css = require('../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as authActions from '../actions/authActions';
const actions = [
  authActions
];
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}


class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      error: null,
    }
  }

  componentWillMount() {
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("ForgotPass_Screen");
  }

  send() {
    this.setState({error: null})
    dismissKeyboard();
    if(this.state.email == '') {
      this.setState({
        error: 'Bạn phải nhập email.'
      })
      return;
    }
    if(!validateEmail(this.state.email)) {
      this.setState({
        error: 'Email không đúng định dạng.'
      });
      return
    };
    this.props.actions.forgotPass(this.state.email)
  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back.png')} />
            </NavButton>
            <View style={{marginLeft: 9,justifyContent: 'center'}}>
              <Text style={css.txtTitle}>Quên mật khẩu</Text>
            </View>
          </NavGroup>
        </NavBar>

        <NoInternet />
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <View style={styles.body}>
            <Text style={styles.txtTip}>Hãy gửi email của bạn để lấy lại mật khẩu.</Text>
            <View style={styles.ctContent}>
              <TextInput
                style={styles.ctInputContent}
                placeholder="Email của bạn"
                underlineColorAndroid="transparent"
                autoGrow={true}
                placeholderTextColor="rgb(194, 197, 208)"
                onChangeText={(email) => this.setState({email: email})}
                value={this.state.email}
                autoCapitalize="none"
                multiline={true}
              />
            </View>
            {
              this.state.error ?
              <View style={{marginTop: 20}}>
                <Text style={css.txtError}>{this.state.error}</Text>
              </View>
              : null
            }
            {
              this.props.auth.isFetching ?
              <View style={css.ctLoading}>
                <Image style={{width: 30, height: 30}} source={require('../images/sending.gif')} />
                 <Text style={css.txtLoading}>Đang gửi</Text>
              </View>
              :
              <Button 
                containerStyle={styles.btnRegister}
                style={styles.txtRegister}
                onPress={() => this.send()}
                >
                Gửi 
              </Button>
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  ctInputContent: {
    padding: 0,
    flex: 1,
    marginLeft: 15,
    fontSize: 16, 
    color: 'rgb(31, 42, 53)', 
  },
  ctContent: {
    height: 60,
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 5,
    padding: 5
  },

  txtRegister: {
    color: '#fff',
    fontSize: 16,
  },
  btnRegister: {
    marginTop: 40,
    height: 48,
    backgroundColor:"rgb(48, 88, 154)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  txtTip: {
    color: 'rgb(51, 51, 51)',
    fontSize: 15,
    marginTop: 12
  },
  body: {
    padding: 15,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);


