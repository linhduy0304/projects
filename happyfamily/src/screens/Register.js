

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';

import { TextField } from 'react-native-material-textfield';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import {validateEmail} from '../components/Functions'
import Spinner from "react-native-spinkit";
import Button from '../components/Button'
import ButtonImageLeft from '../components/ButtonImageLeft';
import DatePicker from 'react-native-datepicker';
import {Actions} from 'react-native-router-flux'
import CheckBox from 'react-native-checkbox';
// var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import PickerItem from '../libs/PickerItem'
var windowSize = Dimensions.get('window');
let css = require('../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as auth from '../actions/auth';
const actions = [
  auth
];

const options = [
  {
    value: "ong",
    label: "Người ông",
  },
  {
    value: "ba",
    label: "Người bà",
  },
  {
    value: "bo",
    label: "Người bố",
  },
  {
    value: "me",
    label: "Người mẹ",
  },
  {
    value: "con",
    label: "Người con",
  }
]

function mapStateToProps(state) {
  return {
    auth: state.auth
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      user_name: '',
      email: '',
      password: '',
      sex: 1,
      confirm_password: '',
      error: '',
      birthday: '',
      role: '',
      modalVisible: false,
    }
  }

  // componentWillMount() {
  //   var firebase = RNFirebase.initializeApp({ debug: false });
  //   firebase.analytics().logEvent("Register_Screen");
  // }

  loginWithFacebook() {
    var _this = this;
    loginSocial = true;
    if(Platform.OS == 'android') {
      FBLoginManager.loginWithPermissions(["email"], function(error, data){
        if(data){
          var token = data.credentials.token;
          _this.props.actions.loginFacebook(token);
        }
      });
    }else {
      FBLoginManager.getCredentials(function(error, data){
        if (error) {
          FBLoginManager.loginWithPermissions(["email"],function (error, data) {
            if (!error) {
              var token = data.credentials.token;
              _this.props.actions.loginFacebook(token);
            }
          })
        } else {
          var token = data.credentials.token;
              _this.props.actions.loginFacebook(token);
        }
      });
    }
  }

  submitRegister() {
    this.setState({error: ''});
    dismissKeyboard();
    if(this.state.full_name == '' || this.state.user_name == '' || this.state.confirm_password == '' || this.state.email == '' || this.state.password == '') {
      this.setState({
        error: 'Các trường không được để trống!'
      });
      return ;
    };
    if(!validateEmail(this.state.email)) {
      this.setState({
        error: 'Email không đúng định dạng.'
      });
      return
    };
    if(this.state.password.length < 6 || this.state.confirm_password.length < 6) {
      this.setState({
        error: 'Mật khẩu không được nhỏ hơn 6 ký tự.'
      })
      return;
    };
    if(this.state.password.length != this.state.confirm_password.length) {
      this.setState({
        error: 'Mật khẩu không khớp nhau.'
      })
      return;
    }
    var body = {
      full_name: this.state.full_name,
      username: this.state.user_name,
      email: this.state.email,
      sex: this.state.sex,
      birthday: this.state.birthday,
      password: this.state.password,
      password_confirmation: this.state.confirm_password,
    };
    // this.props.navigation.navigate('root_tab')
    this.props.actions.submitRegister(body);
  }

  dateNow() {
    var date = new Date();
    var now = date.getDate()+'-'+(1+date.getMonth())+'-'+date.getFullYear();
    return now;
  }

  getValueDataSelect(value) {
    for(var i = 0; i< options.length; i++) {
      if (options[i].value == value) {
        return options[i].label;
        break;
      }
    }
    
    return value;
  }

  render() {
    return (
      <View style={css.container}>
        <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D'}}></View>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#C6247D'}} >
          <NavButton/>
          <NavTitle style={css.navTitle}>
            <Text style={[css.txtTitle, {fontWeight: '400'}]}>Đăng ký tài khoản</Text>
          </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../images/icons/ic_back.png')} />
          </TouchableOpacity>

          {/* <NavButton onPress={() => Actions.pop()} style={css.navBack}>
            <Image source={require('../images/icons/ic_back_black.png')} />
            <Text style={css.txtBack}>Đăng ký tài khoản</Text>
          </NavButton> */}
          
        </NavBar>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0}  style={{ flex: 1 }}>
          <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}>
            <View style={styles.body}>
              <TextField
                label='Tên hiển thị'
                autoCorrect={false}
                onChangeText={(full_name) => this.setState({full_name: full_name})}
                onSubmitEditing={() => this.refs.username.focus()}
                tintColor="rgb(194, 196, 202)"
                textColor="rgb(31, 42, 53)"
                baseColor="rgb(194, 197, 208)"
                autoCapitalize="none"
                selectionColor="rgb(41, 162, 104)"
                value={this.state.full_name}
              />
              <TextField
                label='Tên đăng nhập'
                ref="username"
                autoCorrect={false}
                onChangeText={(user_name) => this.setState({user_name: user_name})}
                onSubmitEditing={() => this.refs.email.focus()}
                tintColor="rgb(194, 196, 202)"
                textColor="rgb(31, 42, 53)"
                baseColor="rgb(194, 197, 208)"
                autoCapitalize="none"
                selectionColor="rgb(41, 162, 104)"
                value={this.state.user_name}
              />
              <TextField
                label='Email'
                ref="email"
                autoCorrect={false}
                onChangeText={(email) => this.setState({email: email})}
                onSubmitEditing={() => this.refs.password.focus()}
                tintColor="rgb(194, 196, 202)"
                textColor="rgb(31, 42, 53)"
                baseColor="rgb(194, 197, 208)"
                autoCapitalize="none"
                selectionColor="rgb(41, 162, 104)"
                value={this.state.email}
              />
              <View style={styles.viewCheckbox}>
                <CheckBox
                  label='Nam'
                  checked={this.state.sex == 1}
                  checkedImage={require('../images/icons/ic_checkbox_ok.png')}
                  uncheckedImage={require('../images/icons/ic_checkbox.png')}
                  onChange={(checked) =>this.setState({sex: 1})}/>
                <CheckBox
                  label='Nữ'
                  checked={this.state.sex == 0}
                  checkedImage={require('../images/icons/ic_checkbox_ok.png')}
                  uncheckedImage={require('../images/icons/ic_checkbox.png')}
                  onChange={(checked) =>this.setState({sex: 0})}/>
              </View>
              <View style={styles.contentItemInfo}>
                {
                  this.state.birthday !== '' &&
                  <Text style={styles.txtBirthday}>Ngày sinh</Text>
                }
                <DatePicker
                  style={{width: window.width- 30}}
                  // date={(this.props.profile.currentUser.birthday)}
                  date={this.state.birthday}
                  showIcon={false}
                  mode="date"
                  placeholder="Ngày sinh"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minDate='01-01-1900'
                  maxDate={this.dateNow()}
                  onDateChange={(birthday) => this.setState({birthday: birthday})}
                  customStyles={
                    {dateInput: {
                      borderWidth: 0,
                      alignItems:'flex-start',
                      flex: 1,
                    },
                    placeholderText:{color:'#c2c5d0',fontSize: 15}
                  }}
                />
              </View>
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})} style={[styles.contentItemInfo, {paddingTop: 32, paddingBottom: 8}]}>
                {
                  this.state.role !== '' &&
                  <Text style={[styles.txtBirthday, {paddingBottom: 5}]}>Chức vụ trong gia đình</Text>
                }
                <Text style={styles.txtRole}>{this.state.role !== '' ? this.getValueDataSelect(this.state.role) : 'Bạn là gì trong gia đình'}</Text>
              </TouchableOpacity>
              <PickerItem
                  options={options}
                  selectedOption={this.state.role}
                  onCancel={() => this.setState({modalVisible: false})}
                  onSubmit={(value) => this.setState({role: value, modalVisible: false})}
                  boxDisplayStyles={styles.mainPicker}
                  modalVisible={this.state.modalVisible}
                />
              <TextField
                ref="password"
                label='Mật khẩu'
                onChangeText={(password) => this.setState({password: password})}
                onSubmitEditing={ () => this.refs.confirm_password.focus()}
                tintColor="rgb(194, 196, 202)"
                textColor="rgb(31, 42, 53)"
                baseColor="rgb(194, 196, 202)"
                autoCapitalize="none"
                selectionColor="rgb(41, 162, 104)"
                secureTextEntry={true}
                value={this.state.password}
              />
              <TextField
                ref="confirm_password"
                label='Xác nhận mật khẩu'
                onChangeText={(confirm_password) => this.setState({confirm_password: confirm_password})}
                onSubmitEditing={ () => this.submitRegister() }
                tintColor="rgb(194, 196, 202)"
                textColor="rgb(31, 42, 53)"
                baseColor="rgb(194, 196, 202)"
                autoCapitalize="none"
                selectionColor="rgb(41, 162, 104)"
                secureTextEntry={true}
                value={this.state.confirm_password}
              />
              {
                this.state.error == '' ? null :
                  <Text style={{marginTop: 10, color: 'red'}}>{this.state.error}</Text>
              }
              <Button
                title = 'Đăng ký tài khoản'
                color = 'white'
                onPress = {() => this.submitRegister()}
                fontSize = {16}
                fontWeight = '500'
                backgroundColor = '#c6247d'
              />
              <Text style={styles.txtOr}>Hoặc, bạn có thể đăng ký qua Facebook</Text>
              <ButtonImageLeft
                title = 'Đăng nhập qua Facebook'
                source = {require('../images/icons/ic_facebook.png')}
                color = 'white'
                onPress = {() => this.loginWithFacebook()}
                fontSize = {16}
                fontWeight = '500'
                backgroundColor = 'rgb(38, 114, 203)'
              />
              {/* <Button 
                containerStyle={styles.btnFb}
                style={styles.txtRegister}
                onPress={() => this.loginWithFacebook()}
                >
                <Image style={{marginRight: 24}} source={require('../images/icons/ic_facebook.png')} />
                Đăng nhập qua Facebook
              </Button> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {
          this.props.auth.loading ? 
            <View style={css.mainSpin}>
              <Spinner isFullScreen={true} isVisible={true} size={50} type={'Circle'} color={'#FFFFFF'}/>
            </View> : null
        }
      </View>
    )
  }
}

const styles= StyleSheet.create({
  txtOr: {
    fontSize: 16,
    color: 'rgb(31, 42, 53)',
    marginTop: 20
  },
  btnFb: {
    marginTop: 16,
    marginBottom: 20,
    height: 48,
    backgroundColor:"rgb(38, 114, 203)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  txtRegister: {
    color: '#fff',
    fontSize: 16,
  },
  btnRegister: {
    marginTop: 30,
    height: 48,
    backgroundColor:"rgb(48, 88, 154)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  body: {
    padding: 15,
    paddingTop: 5
  },
  viewCheckbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 10
  },
  contentItemInfo: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(194,196,202,1)'
  },
  txtBirthday: {
    fontSize: 12,
    color: 'rgba(194,197,208,1)'
  },
  txtRole: {
    fontSize: 16,
    color: 'rgba(194,197,208,1)',
  },
  mainPicker: {
		width: windowSize.width - 60,
    borderColor: '#d5d5d5',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 30
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);

