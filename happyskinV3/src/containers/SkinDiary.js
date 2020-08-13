import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
  FlatList,
  Animated
} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import ImagePicker from 'react-native-image-crop-picker';
var DeviceInfo = require('react-native-device-info');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as homeActions from '../actions/homeActions';
const actions = [
  homeActions
];
function mapStateToProps(state) {
  return {
    home: state.home,
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

class SkinDiary extends React.Component {
  constructor(props) {
    super()
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  dateNow() {
    var date = new Date();
    var now = date.getDate()+'/'+date.getMonth();
    return now;
  }

  takeImage() {
    ImagePicker.openCamera({
      width: 800,
      height: 800,
      cropping: true,
      includeBase64: true
    }).then(image => {
      var source;
      source = {uri: 'data:image/jpg;base64,' + image.data, isStatic: true}
      Actions.skinDiaryDone({image: source})
    }).catch(e => {});
  }

  

  render(){
    const headerHeight = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [150, 75],
      extrapolate: 'clamp',
    });
    const navTranslate = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [0, -75],
      extrapolate: 'clamp',
    });
    const navOpacity = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <View style={main.container}>
          <ScrollView 
            style={{ flex: 1,}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
            bounces={false}>
            <View style={styles.content}>
              <Text style={styles.txtSkinDiary}>Skin Diary</Text>
              <Text style={styles.txtFeel}>Da bạn hôm nay thế nào?</Text>
              <View style={styles.ctImg}>
                {
                  this.props.home.home.skindiary ?
                  this.props.home.home.skindiary.map((item, index) => {
                    return (
                      <TouchableOpacity key={index} onPress={() => Actions.skinDiaryDetail({data: item})}>
                        <Image style={styles.img} source={{uri: item.image_thumb + '.png'}} />
                      </TouchableOpacity>
                    )
                  }) : null
                }
              </View>
              
            </View>
          </ScrollView>
          <Animated.View style={[main.buttonScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
            <Button 
              containerStyle={{marginBottom: 10, marginTop: 10, backgroundColor:"rgb(254, 117, 53)", height: 48, width: deviceWidth- 30, marginLeft: 15,borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}
              style={styles.txtSend}
              onPress={() => this.takeImage()}
              >
              <Image style={{height: 18, width: 20}} source={require('../images/icons/ic_camera_white1.png')}/>
              Cập nhật ảnh mới
            </Button>
          </Animated.View>

          <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
            <NavBar style={{navBar: styles.nav, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff' }} >
              <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
                <View>
                  <Text style={main.txtBack}>Hồ sơ làm đẹp</Text>
                </View>
              </NavButton>
            </NavBar>
          </Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nav: {
    backgroundColor: '#fff',
    padding: 0,
    height: 44,
    width: windowSize.width,
    borderBottomColor: "transparent"
  },
  txtFeel: {
    color: 'rgb(51, 51, 51)',
    marginLeft: 15,
    marginTop: 8,
  },
  content: {
    flex: 1,
    marginTop: 45
  },
  txtSkinDiary: {
    marginLeft: 15,
    color: 'rgb(215, 53, 84)',
    fontSize: 32,
  },
  txtSend: {
    marginLeft: 13,
    color: '#fff',
    fontSize: 16
  },
  ctImg: {
    flexWrap: 'wrap', 
    flexDirection: 'row', 
    marginTop: 16
  },
  img: {
    height: 150, 
    width: (deviceWidth-24)/3,
    borderRadius: 4,
    marginBottom: 10,
    marginLeft: 6
  },
});
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(SkinDiary);
