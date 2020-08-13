/**
 * Created by Mrbacdoan on 04/08/2016.
 */
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Linking
} from "react-native";

import {Actions} from "react-native-router-flux";
var DeviceInfo = require('react-native-device-info');
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-57146563-2');

class ModalApplicationInfo extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    tracker.trackScreenView('View Application Information: ');
  }

  webClick() {
    Linking.openURL('http://happyskin.vn');
  }

 fbClick() {
    Linking.openURL('https://www.facebook.com/happyskinvn');
  }

  ggClick() {
    Linking.openURL('https://www.youtube.com/c/happyskinvn');
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.imgLogo}>
          <Image style={{width: 80, height: 80}} source={require('../../images/icons/ic_logo1.png')}/>
        </View>
        {/* <Text style={styles.textApp}>Happy skin</Text> */}
        {/* <Text style={styles.textDemo} >Những điều bạn cần để luôn đẹp</Text> */}
        <View style={styles.applicationInfo}>
          <View style={styles.textTitle}>
            <Text style={styles.rowTextTitle}>Website:</Text>
            <Text style={styles.rowTextTitle}>Facebook:</Text>
            <Text style={styles.rowTextTitle}>Youtube:</Text>
            <Text style={styles.rowTextTitle}>Phiên bản:</Text>
          </View>
          <View style={styles.textContent}>
            <TouchableOpacity onPress={this.webClick}>
              <Text style={styles.rowTextContent} >http://happyskin.vn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.fbClick}>
              <Text style={styles.rowTextContent} >/happyskinvn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.ggClick}>
              <Text style={styles.rowTextContent} >/c/happyskinvn</Text>
            </TouchableOpacity>
              <Text style={styles.rowTextContent} >{DeviceInfo.getVersion()}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20
  },
  colorWhite: {
    color: '#FFFFFF'
  },
  text: {
    fontSize: 18,
    color: "#000000"
  },
  imgLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  imgSlide: {
    width: 57,
    height: 57,
  },
  textApp: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  textDemo: {
    textAlign: 'center',
  },
  applicationInfo: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  textTitle: {
    alignItems: 'flex-start',
    marginRight: 10
  },
  textContent: {
    // flex: 0.7,
  },
  textBold: {
    fontWeight: 'bold'
  },
  rowTextTitle: {
    paddingBottom: 7,
    fontSize: 15,
    fontWeight: 'bold'
  },
  rowTextContent: {
    paddingBottom: 7,
    color: '#4c8efb',
    fontSize: 15
  }
});

module.exports = ModalApplicationInfo;
