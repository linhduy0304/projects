import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  AlertIOS,
  SegmentedControlIOS,
  Dimensions,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from "react-native";

let deviceWidth = Dimensions.get('window').width;
var Spinner = require('react-native-spinkit');
import {Actions} from "react-native-router-flux";
import { TextField } from 'react-native-material-textfield';
import {validateEmail} from '../components/Functions';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-57146563-2');

//connect
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as registerActions from '../actions/registerActions';
const actions = [
  registerActions
];

function mapStateToProps(state) {
  return {
    register: state.register,
    login: state.login
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

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      active: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.register != this.props.register) {
      this.setState({
        error: nextProps.register.error
      }) 
    }
  }

  onChange(field,value) {
    if(field == 'username'){
      this.setState({
        username: value
      })
    }
    if(field == 'email'){
      this.setState({
        email: value
      })
    }
    if(field == 'password'){
      this.setState({
        password: value
      })
    }
    if(field == 'confirmPassword'){
      this.setState({
        confirmPassword: value
      })
    }
    setTimeout(() => {
      if(this.state.username != '' && this.state.email != '' && this.state.password != '' && this.state.confirmPassword != '') {
        this.setState({active: true})
      }else {
        this.setState({active: false})
      }
    },100)
  }

  validateRegister(){
    var error = false;
    if(this.state.username == ''){
      this.setState({
        error: true
      });
      error = true;
    }
    if(this.state.email == ''){
      this.setState({
        emailIsError: true
      });
      error = true;
    }
    if(this.state.password == ''){
      this.setState({
        passwordIsError: true
      });
      error = true;
    }
    if(this.state.confirmPassword == ''){
      this.setState({
        confirmPasswordIsError: true
      });
      error = true;
    }
    if(error){
      this.setState({error: 'Các trường không được bỏ trống'})
      return false;
    }
    if(this.state.username.length < 6){
      this.setState({
        error: 'Tên đăng nhập không được nhỏ hơn 6 kí tự'
      });
      return false;
    }
    if(!validateEmail(this.state.email)){
      this.setState({
        error: 'Email không đúng định dạng'
      });
      return false;
    }
    if(this.state.password.length < 6){
      this.setState({
        error: 'Mật khẩu không được nhỏ hơn 6 kí tự'
      });
      return false;
    }
    if(this.state.password !=  this.state.confirmPassword){
      this.setState({
        error: 'Xác nhận lại mật khẩu không đúng'
      });
      Toast.show('Xác nhận lại mật khẩu không đúng');
      return false;
    }
    return true;
  }

  submitRegister(){
    this.setState({
      error: ''
    })
    if(!this.validateRegister()){
      return;
    }
    // submit data
    let dataUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
    };
    this.props.actions.submitRegister(dataUser);
  }

  componentDidMount(){
    // Google analytics
    tracker.trackScreenView('Register screen: ');
  }
  
  render(){
    return (
          <View style={styles.content}>
            <View style={main.container}>
              <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff' }} >
                  <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                    <Image style={{height: 10, width: 16}} source={require('../images/icons/ic_back_blue.png')}/>
                    <Text style={{fontSize: 14, color: '#446EB6', marginLeft: 5}}>Quay lại</Text>
                  </NavButton>
              </NavBar>
              <NavBar style={{navBar: main.navBarExplore, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff' }} >
                <NavTitle style={main.navExplore}>
                  Đăng ký tài khoản
                </NavTitle>
              </NavBar>
              <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0} style={{ flex: 1 }} >
                <ScrollView
                    style={styles.scrollView}
                    bounces={false}
                    keyboardShouldPersistTaps={'always'}
                    keyboardDismissMode={'on-drag'}
                >
                  <View style={styles.boxIntro}>
                      <Text style={styles.txtIntro}>Vui lòng điền đầy đủ thông tin dưới đây để tạo tài khoản Happy Skin của bạn.</Text>
                  </View>
                  <TextField
                      label='Tên đăng nhập'
                      autoCorrect={false}
                      onChangeText={(username) => this.onChange('username', username)}
                      onSubmitEditing={() => this.refs.email.focus()}
                      tintColor="#5A5E6F"
                      textColor="#0E0E11"
                      baseColor="#E9457A"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={this.state.username}
                  />
                  <TextField
                      ref='email'
                      label='Email'
                      autoCorrect={false}
                      onChangeText={(email) => this.onChange('email', email)}
                      onSubmitEditing={() => this.refs.password.focus()}
                      tintColor="#5A5E6F"
                      textColor="#0E0E11"
                      baseColor="#E9457A"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={this.state.email}
                  />
                  <TextField
                      ref='password'
                      label='Mật khẩu'
                      autoCorrect={false}
                      onChangeText={(password) => this.onChange('password', password)}
                      onSubmitEditing={() => this.refs.confirmPassword.focus()}
                      tintColor="#5A5E6F"
                      textColor="#0E0E11"
                      baseColor="#E9457A"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      value={this.state.password}
                  />
                  <TextField
                      ref='confirmPassword'
                      label='Nhắc lại mật khẩu'
                      autoCorrect={false}
                      onChangeText={(confirmPassword) => this.onChange('confirmPassword', confirmPassword)}
                      onSubmitEditing={ () => this.submitRegister() }
                      tintColor="#5A5E6F"
                      textColor="#0E0E11"
                      baseColor="#E9457A"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      value={this.state.confirmPassword}
                  />
                  {
                      this.state.error ?
                      <Text style={styles.txtError}>{this.state.error}</Text>
                      : null
                    }
                  <TouchableHighlight
                      onPress={() => this.state.active ? this.submitRegister() : null} style={[styles.btnSumit, this.state.active ? {backgroundColor: 'rgb(215,53,84)'} : null]} underlayColor='#d73554'>
                      <Text style={styles.colorButton}>Đăng ký tài khoản mới</Text>
                  </TouchableHighlight>
                  <View style={styles.hr}></View>
                  <View style={styles.boxSocial}>
                      <Text style={styles.txtSocial}>Hoặc bạn có thể</Text>
                      <TouchableOpacity
                          onPress={ null } style={[styles.btnSocial, {backgroundColor: '#2672CB'}]} underlayColor='#d73554'>
                          <Image style={styles.fbIcon} source={require('../images/icons/ic_fblogin.png')}/>
                          <Text style={[styles.colorButton, {marginLeft: 5}]}>Đăng nhập với Facebook</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={ null } style={[styles.btnSocial, {backgroundColor: '#FF566B'}]} underlayColor='#d73554'>
                          <Image style={styles.ggIcon} source={require('../images/icons/ic_gglogin.png')}/>
                          <Text style={[styles.colorButton, {marginLeft: 5}]}>Đăng nhập với Google</Text>
                      </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
            {
              this.props.register.isFetching ? 
                <View style={main.mainSpin}>
                  <Spinner isFullScreen={true} isVisible={true} size={50} type={'Circle'} color={'#FFFFFF'}/>
                </View> : null
              }
          </View>
    );
  }
}

const main = require('../styles/Main');
const styles = StyleSheet.create({
  txtError: {
    color: 'rgb(255, 183, 101)',
    fontSize: 16
  },
  content: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
      flex: 1
  },
  scrollView: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
  },
  boxIntro: {
      paddingBottom: 15,
      paddingTop: 15,
  },
  txtIntro: {
      fontSize: 14,
      color: '#292A39'
  },
  btnSumit: {
      backgroundColor: '#E0E0E1',
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
      borderRadius: 4,
      marginTop: 25
  },
  colorButton: {
      color: '#FFFFFF',
      fontSize: 16,
  },
  hr: {
      height: 1,
      width: deviceWidth,
      backgroundColor: '#ECEEF0',
      marginTop: 15,
      marginBottom : 15
  },
  boxSocial: {
      paddingBottom: 20
  },
  txtSocial: {
      color: '#858E98',
      fontSize: 14,
  },
  btnSocial: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 48,
      borderRadius: 4,
      marginTop: 15,
      justifyContent: 'center'
  },
  fbIcon: {
      width: 18,
      height: 18,
      marginRight: 5
  },
  ggIcon: {
      width: 17,
      height: 17,
      marginRight: 5
  },
  emailIcon: {
      width: 22,
      height: 22,
      marginRight: 5
  },
  colorEmail: {
      fontSize: 16,
      color: '#E30052'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);