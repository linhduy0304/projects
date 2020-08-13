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
  AlertIOS
} from "react-native";

import {Actions} from "react-native-router-flux";
var AsyncStorge = require('react-native').AsyncStorge;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as loginActions from '../../actions/loginActions';

import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-57146563-2');

const actions = [
  loginActions
];

function mapStateToProps(state) {
  return {
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



class ModalForgetPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors: '',
      email: ''
    };
  }

  onChange(field,value) {
    this.setState({
      email: value
    })
  }

   componentDidMount(){
    tracker.trackScreenView('Forget Password: ');
  }

  render(){
    return (
      <View style={styles.container}>
         <Text style={styles.text}>
          Khôi phục mật khẩu
         </Text>
         <View style={styles.inputView}>
           <TextInput
                style={styles.input}
                autoFocus={true}
                placeholder="Nhập địa chỉ email"
                underlineColorAndroid="transparent"
                placeholderTextColor="#c3c3c3"
                autoCapitalize="none"
                onChangeText={(email) => this.onChange('email', email)}
                value={this.state.email}
                onSubmitEditing={ () => this.props.whenClicked }
            />
          </View>
          <TouchableHighlight onPress={this.props.whenClicked} style={styles.btnSumit}>
            <Text style={styles.colorWhite}>Khôi phục mật khẩu</Text>
          </TouchableHighlight>

          <Text style={styles.errors}>
            {this.props.login.isErrorEmail ? this.props.login.error : ''}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  input: {
    width: 230,
    height: 40,
    fontSize: 15,
    borderRadius: 7,
    paddingLeft: 10,
    paddingRight: 10
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
    marginBottom: 20,
    marginTop: 20
  },
  inputView: {
    borderWidth: 1,
    borderColor: "#e7eaf3",
    marginTop:20,
    padding: -1
  },
  text: {
    fontSize: 18,
    color: "#000000"
  },
  errors: {
    color: 'red',
    fontSize: 15,
    marginTop: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalForgetPassword);