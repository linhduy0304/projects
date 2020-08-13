

import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  AppState
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home';
import Notify from './Notify';
import Setting from './Setting';
import History from './History';
import SplashScreen from 'react-native-splash-screen'
import Store from '../../services/Store';
const Const = require('../../services/Const');

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'home'
    };
  }

  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
    SplashScreen.hide();
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  chekActiveApp = (nextAppState) => {
    console.log('ddd'+nextAppState)
    if(nextAppState == 'active') {
      new Store().getSession(Const.TIME_ACTIVE).then(time => {
        var a = (Date.now() - time)/1000/60;
        if(a >= 1) {
          Actions.detail2()
        }else {
          let time = new Date()
          new Store().storeSession(Const.TIME_ACTIVE, time.getTime());
        }
      })
    }else {
      let time = new Date()
      new Store().storeSession(Const.TIME_ACTIVE, time.getTime());
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if(this.props.auth.checkServer) {
      if(this.props.profile.checkPincode == false) {
        this.chekActiveApp(nextAppState)
      }
    }
  }

  render() {
    return (
      <TabNavigator 
        hidesTabTouch={true}
        tabBarStyle={{backgroundColor: '#3a5b68'}}
      >
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'home'}
          renderIcon={() => <Image style={styles.icon} source={require('../../icons/ic_home.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('../../icons/ic_home_active.png')} />}
          onPress={() => this.setState({ tab: 'home' })}>
          <Home/>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          badgeText="1"
          selected={this.state.tab === 'history'}
          renderIcon={() => <Image style={styles.icon} source={require('../../icons/ic_history.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('../../icons/ic_history_active.png')} />}
          onPress={() => this.setState({ tab: 'history' })}>
          <History/>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          itle="Home"
          selected={this.state.tab === 'noti'}
          renderIcon={() => <Image style={styles.icon} source={require('../../icons/ic_noti.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('../../icons/ic_noti_active.png')} />}
          onPress={() => this.setState({ tab: 'noti' })}>
          <Notify/>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'setting'}
          renderIcon={() => <Image style={styles.icon} source={require('../../icons/ic_setting.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('../../icons/ic_setting_active.png')} />}
          onPress={() => this.setState({ tab: 'setting' })}>
          <Setting/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  ctItem: {
    alignItems: 'center',
     justifyContent: 'center',
  },
  icon: {
    height: 20,
    resizeMode: 'contain'
  },
})

import {connect} from 'react-redux';
import {checkServer} from '../../actions/auth';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkServer: () => dispatch(checkServer()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tab);
