

import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  NetInfo,
  AppState,
  Linking,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen'
import Css from '../config/Css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
    };
  }

  handleIsConnected = (isConnected) => {
    this.setState({ isConnected });
    if(isConnected) {
      this.props.checkServer()
    }
  }

  handleOpenURL = (event) => {
    alert(event.url)
    if(event.url === 'linhduy://') {
      Actions.register()
    }
  }

  componentWillMount = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.handleIsConnected(isConnected);
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleIsConnected
    );
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        // alert(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    SplashScreen.hide();
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleIsConnected
    );
  }

  render() {
    return (
      <View style={Css.container}>
        {/* <NoInternet/> */}
        <StatusBar
          backgroundColor= '#23434d'
        />
        {!this.state.isConnected ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff'}}>Waiting For Network</Text>
          </View>
          :
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: 50, width: 50}} source={require('../icons/loading.gif')}/>
            <Text style={{color: '#fff'}}>Connecting to server</Text>
          </View>
        }
       
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {checkServer} from '../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkServer: () => dispatch(checkServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
