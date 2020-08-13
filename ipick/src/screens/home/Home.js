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
  StatusBar,
  TextInput,
  Alert,
  Animated,
  Linking
} from 'react-native';
var DeviceInfo = require('react-native-device-info');
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../components/ScrollableTabBar';
import HomeChild from './HomeChild'
import Popular from './Popular'
import ModalSearch from '../../components/ModalSearch'
import NoInternet from '../../components/NoInternet'
import RNFirebase from 'react-native-firebase';
import TopPicks from './TopPicks';
// import type { Notification, NotificationOpen } from 'react-native-firebase';
var Modal = require('react-native-modalbox');
let css = require('../../Css');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      openSearch: false,
      token: '',
      // scrollEnd: null,
      yEnd: null,
    }
  }

  componentWillMount() {
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("Home_Screen");
  }

  componentDidMount() {
    //when app closed
    RNFirebase.notifications().getInitialNotification().then(closed => {
      if(closed) {
        switch(closed.notification.data.type) {
          case 'post':
            Actions.postDetail({slug: closed.notification.data.slug})
            return;
          case 'user':
            Actions.otherProfile({id: closed.notification.data.slug})
            return;
          case 'update':
            Linking.openURL(closed.notification.data.slug)
            return;
          default:
            return;
        }
      }
    })

    //when opening app
    RNFirebase.notifications().onNotification((notification) => {
      if(notification) {
        switch(notification.data.type) {
          case 'post':
            Alert.alert(
              'Thông báo từ IPICK',
              notification.data.title,
              [
                { text: 'Xem ngay', onPress: () => Actions.postDetail({slug: notification.data.slug}), style: 'cancel' },
                { text: 'Đóng', onPress: () => { } }
              ]
            );
            return;
          case 'user':
            Alert.alert(
              'Thông báo từ IPICK',
              notification.data.title,
              [
                { text: 'Xem ngay', onPress: () => Actions.otherProfile({id: notification.data.slug}), style: 'cancel' },
                { text: 'Đóng', onPress: () => { } }
              ]
            );
            return;
          case 'update':
            Linking.openURL(notification.data.slug)
            return;
          default:
            return;
        }
        
      }
    });

    //when close but not kill app
    RNFirebase.notifications().onNotificationOpened((notification) => {
      if(notification) {
        switch(notification.notification.data.type) {
          case 'post':
            Actions.postDetail({slug: notification.notification.data.slug})
            return;
          case 'user':
            Actions.otherProfile({id: notification.notification.data.slug})
            return;
          case 'update':
            Linking.openURL(notification.notification.data.slug)
            return;
          default:
            return;
        }
      }
    });
    //   this.notificationOpenedListener = RNFirebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
    //     const notification: Notification = notificationOpen.notification;
    //     if(notification) {
    //       Actions.postDetail({slug: notification._data.body})
    //     }
    // });
  }

//   componentWillUnmount() {
//     // this.notificationOpenedListener();
// }

onScroll(e) {
  // console.log(e.nativeEvent.contentOffset.y)
  const currentOffset = e.nativeEvent.contentOffset.y
  if(currentOffset > this.state.yEnd ) {
    Animated.spring(
      this.state.scrollY,
      {
        toValue: -44,
        duration: 500,
      }
    ).start();
  }
  if(currentOffset < this.state.yEnd){
    Animated.spring(
      this.state.scrollY,
      {
        toValue: 0,
        duration: 500,
      }
    ).start();
  }
  // this._listViewOffset = currentOffset
}
 


  render() {
    const marginTop = this.state.scrollY
    return (
      <Animated.View style={[css.container, {marginTop: marginTop}]}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup style={[css.navBack,{marginLeft: 0}]}>
            <Image source={require('../../images/logo_home.png')} />
          </NavGroup>
          <NavButton onPress={() => this.setState({openSearch: true})} style={css.navSearch}>
            <Image style={{height: 16, width: 16}} source={require('../../images/icons/ic_search.png')} />
          </NavButton>
        </NavBar>

        <NoInternet />

        <ScrollableTabView
          initialPage={0}
          tabBarBackgroundColor='white'
          tabBarInactiveTextColor='rgba(0, 0, 0, 0.7)'
          // tabBarActiveTextColor='rgb(51, 51, 51)'
          tabBarActiveTextColor='rgb(0, 139, 125)'
          prerenderingSiblingsNumber={0}
          tabBarTextStyle={{fontSize: 14}}
          scrollWithoutAnimation={true}
          tabUnderlineStyle={{backgroundColor: 'red'}}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <TopPicks
            onScroll={(e) => this.onScroll(e)}
            // scrollBegin={() => this.setState({scrollEnd: null})}
            scrollEnd={(e) => this.setState({yEnd: e.nativeEvent.contentOffset.y, scrollEnd: true})}
            tabLabel='TOP PICKS'
          />
          <HomeChild
             onScroll={(e) => this.onScroll(e)}
            //  scrollBegin={() => this.setState({scrollEnd: null})}
             scrollEnd={(e) => this.setState({yEnd: e.nativeEvent.contentOffset.y, scrollEnd: true})}
             tabLabel='MY PAGE'
          />
          <Popular
             onScroll={(e) => this.onScroll(e)}
            //  scrollBegin={() => this.setState({scrollEnd: null})}
             scrollEnd={(e) => this.setState({yEnd: e.nativeEvent.contentOffset.y, scrollEnd: true})}
             tabLabel='PICK TO PEAK'
          />
        </ScrollableTabView>
        <Modal 
          style={css.ctModalSearch}
          isOpen={this.state.openSearch}
          // swipeToClose={true}
          position="top"
          entry="top"
          animationDuration={0}
          backdropColor="#000"
          onClosed={()=> this.setState({openSearch: false}) }
          >
            <ModalSearch closeModal={() => this.setState({openSearch: false})} />
        </Modal>
      </Animated.View>
    )
  }
}

const styles= StyleSheet.create({
 
});
export default (Home);


