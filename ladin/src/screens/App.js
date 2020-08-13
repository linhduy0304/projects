

import React, { Component } from 'react';
import { View, NetInfo, Text,StatusBar } from 'react-native';
import { Color } from '../config/Constant';
import SplashScreen from 'react-native-splash-screen'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null
    };
  }

  componentWillMount = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.handleIsConnected(isConnected);
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleIsConnected
    );
  }

  componentDidMount = () => {
    SplashScreen.hide();
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleIsConnected
    );
  }

  handleIsConnected = (isConnected) => {
    this.setState({ isConnected });
    if(isConnected) {
      this.props.checkLogin();
      this.props.getCityJson();
      this.props.getBankJson();
      this.props.getCountriesJson();
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#c41a36'}}>
         <StatusBar
          backgroundColor={Color}
          barStyle='light-content'
        />
         {!this.state.isConnected ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{color: '#fff'}}>Đang đợi kết nối mạng</Text>
          </View>
          :
         null
        }
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {checkLogin, getCityJson, getBankJson, getCountriesJson} from '../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin()),
    getCityJson: () => dispatch(getCityJson()),
    getBankJson: () => dispatch(getBankJson()),
    getCountriesJson: () => dispatch(getCountriesJson())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
