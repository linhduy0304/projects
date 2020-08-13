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
  BackHandler,
  AppRegistry
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import { Actions } from "react-native-router-flux";
import { TextField } from 'react-native-material-textfield';
import Button from "react-native-button";
import Home from './home/Home'
import Activity from './activity/Activity'
import Profile from './profile/Profile'
import PostAdd from './post/PostAdd'
import Explore from './explore/Explore';
import RNFirebase from 'react-native-firebase';

// import bgMessaging from '../components/bgMessaging';
let css = require('../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as tabActions from '../actions/tabActions';
import * as authActions from '../actions/authActions';
const actions = [
  tabActions,
  authActions,

];
function mapStateToProps(state) {
  return {
    tab: state.tab,
    profile: state.profile,
    home: state.home
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

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page ? this.props.page : 'home',
    }
  }

  componentWillMount() {
    if(this.props.profile.currentUser == null) {
      this.props.actions.dataUser()
    }
    RNFirebase.messaging().subscribeToTopic(Platform.OS === 'android' ? 'ipickAndroid' : 'ipickIOS');
    RNFirebase.messaging().getToken()
    .then(token => {
      if (token) {
        // user has a device token
        this.props.actions.pushNoti(token, Platform.OS === 'android' ? 'ipickAndroid' : 'ipickIOS')
      } else {
        // user doesn't have a device token yet
      } 
    });
  }

  // componentDidMount() {
    // console.log(BackHandler)
    // BackHandler.addEventListener('hardwareBackPress', function() {
    //   return false
    // });
    // FCM.getInitialNotification().then(notif => {
    //   if(notif.slug) {
    //     Actions.postDetail({slug: notif.slug})
        
    //   }
    // })
    
  // }

  changeTab(page) {
    if(!this.props.home.isFetching) {
      if(this.state.page == page){
        this.props.actions.scrollToTop(page);
      }
    }
    this.setState({page: page});
  }

  render() {
    return (
        <TabNavigator tabBarStyle={styles.tabNavigator}>
        <TabNavigator.Item
          selected={this.state.page === 'home'}
          renderIcon={() => <Image source={require('../images/icons/ic_home.png')} />}
          renderSelectedIcon={() => <Image source={require('../images/icons/ic_home_active.png')} />}
          onPress={() => this.changeTab('home')}>
          <Home ref='home'/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.page === 'category'}
          renderIcon={() => <Image source={require('../images/icons/ic_cate.png')} />}
          renderSelectedIcon={() => <Image source={require('../images/icons/ic_cate_active.png')} />}
          onPress={() => this.changeTab('category')}>
          <Explore/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.page === 'post'}
          renderIcon={() => <Image source={require('../images/icons/ic_plus.png')} />}
          renderSelectedIcon={() => <Image source={require('../images/icons/ic_plus_active.png')} />}
          onPress={() => Actions.postAdd()}>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.page === 'activity'}
          renderIcon={() => <Image  source={require('../images/icons/ic_heart.png')} />}
          renderSelectedIcon={() => <Image source={require('../images/icons/ic_heart_active.png')} />}
          onPress={() => this.changeTab('activity')}>
          <Activity/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.page === 'profile'}
          renderIcon={() => <Image  source={require('../images/icons/ic_profile.png')} />}
          renderSelectedIcon={() => <Image  source={require('../images/icons/ic_profile_active.png')} />}
          onPress={() => this.changeTab('profile')}>
          <Profile/>
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
}

const styles= StyleSheet.create({

  tabTitle: {
    backgroundColor: 'red'
  },
  tabNavigator: {
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    flex: 1,
    height: 49,
    borderTopColor: 'rgb(236, 238, 240)',
    borderTopWidth: 1,
  },
});
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
export default connect(mapStateToProps, mapDispatchToProps)(Tab);


