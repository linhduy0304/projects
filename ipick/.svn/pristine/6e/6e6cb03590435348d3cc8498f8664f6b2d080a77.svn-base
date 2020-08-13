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
  TextInput,
  BackHandler
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import { TextField } from 'react-native-material-textfield';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import NoInternet from '../../components/NoInternet'
// import SplashScreen from 'react-native-splash-screen'
const StoreService = require('../../services/StoreService').default;
import Constant from '../../services/Constant';
let css = require('../../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as authActions from '../../actions/authActions';
import * as profileActions from '../../actions/profileActions';
const actions = [
  authActions,
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


class CreatePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.profile.currentUser ? this.props.profile.currentUser.username : '',
      newPass: '',
      confirmPass: '',
      error: null,
    }
  }

  componentWillMount() {
    if(this.props.profile.currentUser == null) {
      this.props.actions.dataUser()
    }
  }
  componentDidMount() {
    // console.log(BackHandler)
    // BackHandler.addEventListener('hardwareBackPress', function() {
    //   BackHandler.exitApp()
    // });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.profile.currentUser != this.props.profile.currentUser && nextProps.profile.currentUser) {
      this.setState({
        username: nextProps.profile.currentUser.username
      })
    }
  }

  cancel() {
    new StoreService().storeSession(Constant.IP_IS_PASS, true);
    Actions.tab({type: 'reset'})
  }

  save() {
    this.setState({error: null})
    dismissKeyboard();
    if(this.state.username == '' ||this.state.newPass == '' || this.state.confirmPass == '') {
      this.setState({
        error: 'Các trường không được để trống.'
      })
      return;
    }
    if(this.state.newPass.length < 6 || this.state.confirmPass.length < 6) {
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
      username: this.state.username,
      password: this.state.newPass,
      password_confirmation: this.state.confirmPass,
    }
    this.props.actions.createPass(body)
  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            
            <View style={{marginLeft: 15,justifyContent: 'center'}}>
              <Text style={css.txtTitle}>Cập nhật tài khoản</Text>
            </View>
          </NavGroup>
        </NavBar>

        <NoInternet />

        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <View style={styles.body}>
            <Text style={styles.txtTip}>Bạn đã đăng nhập bằng Facebook nên chưa có mật khẩu. Hãy tạo mật khẩu mới cho tài khoản.</Text>
            <TextField
              label='Tên đăng nhập'
              autoCorrect={false}
              onChangeText={(username) => this.setState({username: username})}
              onSubmitEditing={() => this.refs.new.focus()}
              tintColor="rgb(194, 196, 202)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 197, 208)"
              autoCapitalize="none"
              selectionColor="rgb(41, 162, 104)"
              value={this.state.username}
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
                 <Text style={css.txtLoading}>Đang cập nhật</Text>
              </View>
              :
              <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button 
                  containerStyle={styles.btnRegister}
                  style={styles.txtRegister}
                  onPress={() => this.save()}
                  >
                  Cập nhật tài khoản 
                </Button>
                <Button 
                  containerStyle={styles.btnCancel}
                  style={{fontWeight: '400', fontStyle: 'italic',textDecorationLine: 'underline', color: "rgb(48, 88, 154)",fontSize: 16}}
                  onPress={() => this.cancel()}
                  >
                  Bỏ qua
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
  txtTip: {
    color: 'rgb(102, 111, 128)',
    fontSize: 13,
    marginTop: 15
  },
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
    // width: paddin,
    paddingLeft: 10, 
    paddingRight: 10,
    backgroundColor:"rgb(48, 88, 154)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  btnCancel: {
    marginTop: 15,
    height: 48,
    paddingLeft: 10, 
    paddingRight: 10,
    backgroundColor:"#fff", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  body: {
    padding: 15,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CreatePass);


