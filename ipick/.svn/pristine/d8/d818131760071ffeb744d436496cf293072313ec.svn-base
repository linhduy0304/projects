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
  Linking,
  TouchableOpacity
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
//import RNFirebase from 'react-native-firebase';
import RNFirebase from 'react-native-firebase';

let css = require('../../Css');
var DeviceInfo = require('react-native-device-info');

class AppInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("AppInfo_Screen");
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back.png')} />
            </NavButton>
            <View style={{marginLeft: 9,justifyContent: 'center'}}>
              <Text style={css.txtTitle}>Thông tin ứng dụng</Text>
            </View>
          </NavGroup>
        </NavBar>

        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <View >
            <TouchableOpacity onPress={() => Linking.openURL('https://www.ipick.vn/')} style={styles.ctItem}>
              <Text style={[styles.txtTitle]}>IPICK trên Website</Text>
              <Image source={require('../../images/icons/ic_web.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/IPICK.vn/')} style={styles.ctItem}>
              <Text style={[styles.txtTitle]}>IPICK trên Facebook</Text>
              <Image source={require('../../images/icons/ic_fb.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/channel/UCt1ULmO-8PP7gwViHtJDlFw')} style={styles.ctItem}>
              <Text style={[styles.txtTitle]}>IPICK trên Youtube</Text>
              <Image source={require('../../images/icons/ic_youtube.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ipick.vn/')} style={styles.ctItem}>
              <Text style={[styles.txtTitle]}>IPICK trên Instagram</Text>
              <Image source={require('../../images/icons/ic_instagram.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/IPICK17')} style={styles.ctItem}>
              <Text style={[styles.txtTitle]}>IPICK trên Twitter</Text>
              <Image source={require('../../images/icons/ic_twitter.png')} />
            </TouchableOpacity>
            <View style={styles.ctItem}>
              <Text style={[styles.txtTitle]}>Phiên bản hiện tại</Text>
              <Text style={[styles.txtContent]}>{DeviceInfo.getVersion()}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  txtContent: {
    color: '#4c8efb', 
    fontSize: 15
  },
  ctItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtTitle: {
    color: 'rgb(27, 48, 70)',
    fontSize: 15
  },
  container: {
    flex: 1,
  },
});
export default (AppInfo);


