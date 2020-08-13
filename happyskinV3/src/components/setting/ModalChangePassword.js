/**
 * Created by Mrbacdoan on 04/08/2016.
 */
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
  AlertIOS,
  Platform,
  Keyboard
} from "react-native";

import {Actions} from "react-native-router-flux";
var AsyncStorge = require('react-native').AsyncStorge;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as profileActions from '../../actions/profileActions';
import Toast from 'react-native-simple-toast';

import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-57146563-2');

const actions = [
  profileActions
];

function mapStateToProps(state) {
  return {
    profile: state.profile
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


class ModalChangePassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors: '',
      passwordOldIsError: false,
      passwordIsError: false,
      confirmPasswordIsError: false,
      oldPassword: '',
      newsPassword: '',
      confirmNewsPassword: ''
    };
  }

   componentDidMount(){
    tracker.trackScreenView('Change Password: ');
  }

  onChange(field,value) {
    if(field == 'oldPassword'){
      this.setState({
        passwordOldIsError: false,
        oldPassword: value,
      })
    }
    if(field == 'newsPassword'){
      this.setState({
        passwordIsError: false,
        confirmPasswordIsError: false,
        newsPassword: value
      })
    }
    if(field == 'confirmNewsPassword'){
      this.setState({
        confirmNewsPassword: value
      })
    }
  }

  validateChangePassword(){
    var error = false;
    if(this.state.oldPassword == ''){
      this.setState({
        passwordIsError: true
      });
      error = true;
    }
    if(this.state.newsPassword == ''){
      this.setState({
        passwordIsError: true
      });
      error = true;
    }
    if(this.state.confirmNewsPassword == ''){
      this.setState({
        confirmPasswordIsError: true
      });
      error = true;
    }
    if(error){
      Toast.show('Các trường không được bỏ trống');
      return false;
    }
    if(this.state.newsPassword.length < 6){
      Toast.show('Password không được nhỏ hơn 6 kí tự');
      this.setState({
        passwordIsError: true
      });
      return false;
    }
    if(this.state.newsPassword !=  this.state.confirmNewsPassword){
      this.setState({
        confirmPasswordIsError: true
      });
      Toast.show('Xác nhận lại mật khẩu không đúng');
      return false;
    }
    return true;
  }

  btnChangePassword() {
    Keyboard.dismiss();
    if(!this.validateChangePassword()){
      return;
    }
    let data = {
      oldPassword : this.state.oldPassword,
      newsPassword: this.state.newsPassword,
      confirmNewsPassword: this.state.confirmNewsPassword
    };

    this.props.actions.changePassword(data, this.props.profile.currentUser.username);
  }


  render(){
    return (
      <View style={styles.container}>
        <View style={styles.textHeader}>
          <Text style={styles.text}>
            Thay đổi mật khẩu
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            password={true}
            style={styles.input}
            placeholder="Nhập mật khẩu cũ"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            placeholderTextColor="#c3c3c3"
            onChangeText={(oldPassword) => this.onChange('oldPassword', oldPassword)}
            value={this.state.oldPassword}
            />
        </View>
        <View style={styles.inputView}>
          <TextInput
            password={true}
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            placeholderTextColor="#c3c3c3"
            onChangeText={(newsPassword) => this.onChange('newsPassword', newsPassword)}
            value={this.state.newsPassword}
            />
        </View>
        <View style={styles.inputViewLastChild}>
          <TextInput
            password={true}
            style={styles.input}
            placeholder="Xác nhận mật khẩu mới"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            placeholderTextColor="#c3c3c3"
            onChangeText={(confirmNewsPassword) => this.onChange('confirmNewsPassword', confirmNewsPassword)}
            value={this.state.confirmNewsPassword}
            />
        </View>
        <TouchableHighlight onPress={()=>this.btnChangePassword()} style={styles.btnSumit} underlayColor='#d73554'>
          <Text style={styles.colorWhite}>Thay đổi mật khẩu</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  input: {
    width: 230,
    height: Platform.OS=='ios' ? 30 : 40,
    fontSize: Platform.OS =='ios' ? 15 : 14,
    borderRadius: 7,
    paddingBottom:5,
    paddingLeft: 5,
    paddingTop: 5
  },
  colorWhite: {
    color: '#FFFFFF'
  },
  btnSumit: {
    backgroundColor: "#b92626",
    alignItems: 'center',
    width: 230,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
  },
  inputView: {
    borderWidth: 1,
    borderColor: "#e7eaf3",
    marginBottom:20,
    padding: -1
  },
  inputViewLastChild: {
    borderWidth: 1,
    borderColor: "#e7eaf3",
    padding: -1
  },
  text: {
    fontSize: 18,
    color: "#000000",
    marginBottom: 20,
    marginTop: 20,
  },
  errors: {
    color: 'red',
    fontSize: 14,
    marginTop: 10
  }
});
let theme = require('../../services/Theme');
export default connect(mapStateToProps, mapDispatchToProps)(ModalChangePassword);
