

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  NetInfo
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Css from '../config/Css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
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
    
  };

  componentDidMount = () => {
    SplashScreen.hide();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleIsConnected
    );
  }

  handleIsConnected = (isConnected) => {
    this.setState({ isConnected });
    if(isConnected) {
      this.props.checkServer()
    }
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
