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
import { TextField } from 'react-native-material-textfield';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import NoInternet from '../../components/NoInternet'
//import RNFirebase from 'react-native-firebase';
import RNFirebase from 'react-native-firebase';

let css = require('../../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as profileActions from '../../actions/profileActions';
const actions = [
  profileActions
];
function mapStateToProps(state) {
  return {
    profile: state.profile,
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


class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPass:'',
      newPass: '',
      confirmPass: '',
      error: null,
    }
  }

  componentWillMount() {
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("ChangePass_Screen");
  }

  save() {
    this.setState({error: null})
    dismissKeyboard();
    if(this.state.oldPass == '' || this.state.newPass == '' || this.state.confirmPass == '') {
      this.setState({
        error: 'Các trường không được để trống.'
      })
      return;
    }
    if(this.state.oldPass.length < 6  || this.state.newPass.length < 6 || this.state.confirmPass.length < 6) {
      this.setState({
        error: 'Mật khẩu phải có ít nhất 6 ký tự.'
      })
      return;
    }
    if(this.state.newPass != this.state.confirmPass) {
      this.setState({
        error: 'Mật khẩu xác nhận không khớp'
      })
      return;
    }
    var body = {
      password_old: this.state.oldPass,
      password: this.state.newPass,
      password_confirmation: this.state.confirmPass,
    }
    this.props.actions.changePass(body)
  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back.png')} />
            </NavButton>
            <View style={{marginLeft: 9,justifyContent: 'center'}}>
              <Text style={css.txtTitle}>Thay đổi mật khẩu</Text>
            </View>
          </NavGroup>
        </NavBar>

        <NoInternet />

        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <View style={styles.body}>
            <TextField
              label='Mật khẩu cũ'
              autoCorrect={false}
              onChangeText={(oldPass) => this.setState({oldPass: oldPass})}
              onSubmitEditing={() => this.refs.new.focus()}
              tintColor="rgb(194, 196, 202)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 197, 208)"
              autoCapitalize="none"
              secureTextEntry={true}
              selectionColor="rgb(41, 162, 104)"
              value={this.state.oldPass}
            />
            <TextField
              label='Mật khẩu mới'
              ref="new"
              autoCorrect={false}
              onChangeText={(newPass) => this.setState({newPass: newPass})}
              onSubmitEditing={() => this.refs.confirm.focus()}
              tintColor="rgb(194, 196, 202)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 197, 208)"
              autoCapitalize="none"
              secureTextEntry={true}
              selectionColor="rgb(41, 162, 104)"
              value={this.state.newPass}
            />
            <TextField
              label='Nhập lại mật khẩu mới'
              ref="confirm"
              autoCorrect={false}
              onChangeText={(confirmPass) => this.setState({confirmPass: confirmPass})}
              onSubmitEditing={() => this.save()}
              tintColor="rgb(194, 196, 202)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 197, 208)"
              autoCapitalize="none"
              secureTextEntry={true}
              selectionColor="rgb(41, 162, 104)"
              value={this.state.confirmPass}
            />
            
            {
              this.state.error ?
              <View style={{marginTop: 20}}>
                <Text style={css.txtError}>{this.state.error}</Text>
              </View>
              : null
            }
            {
              this.props.profile.loading ?
              <View style={css.ctLoading}>
                <Image style={{width: 30, height: 30}} source={require('../../images/sending.gif')} />
                 <Text style={css.txtLoading}>Đang thay đổi</Text>
              </View>
              :
              <View style={{alignItems: 'center'}}>
                <Button 
                  containerStyle={styles.btnRegister}
                  style={styles.txtRegister}
                  onPress={() => this.save()}
                  >
                  Thay đổi mật khẩu 
                </Button>
              </View>
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
    fontSize: 16, 
    color: 'rgb(31, 42, 53)', 
  },
  ctContent: {
    // height: 50,
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
    marginTop: 15,
    height: 48,
    width: 200,
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
export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);


