import React from 'react';
import { 
  AppRegistry,
  StyleSheet,
  View,
  Text,
  InteractionManager,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Animated,
  ScrollView
} from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Switch from 'react-native-switch-pro'

let theme = require('../styles/Theme');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let main = require('../styles/Main');
let window = Dimensions.get('window');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as moreActions from '../actions/moreActions';
const actions = [
  moreActions
];
function mapStateToProps(state) {
  return {
    more: state.more
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

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }


  render() {
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
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={main.container}>
          <ScrollView
            style={{flex: 1,}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
            bounces={false}>
            <View style={{flex: 1,marginTop: 45, paddingBottom: 30}}>
              <Text style={styles.txtSetting}>Cài đặt</Text>
              <View style={styles.ctNoti}>
                <Text style={{color: 'rgb(135, 80, 161)'}}>THÔNG BÁO</Text>
              </View>
              <View style={styles.ctItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtTitle}>Nhận thông báo</Text>
                  <Text style={styles.txtSub}>Thông báo từ HappySkin</Text>
                </View>
                <Switch 
                  height={30}
                  width={55}
                  defaultValue={true}
                  backgroundActive={'rgb(68, 110, 182)'}
                  onSyncPress={value => console.log(value)}/>
              </View>
              {/* <View style={styles.ctItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtTitle}>Nhắc nhở cập nhật tiến trình</Text>
                  <Text style={styles.txtSub}>Khi bạn  đang tham gia một liệu trình</Text>
                </View>
                <Switch 
                  height={30}
                  width={55}
                  defaultValue={true}
                  backgroundActive={'rgb(68, 110, 182)'}
                  onSyncPress={value => console.log(value)}/>
              </View>
              <View style={styles.ctItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtTitle}>Hẹn giờ nhắc nhở</Text>
                  <Text style={styles.txtSub}>Chỉnh tùy theo thói quen của bạn</Text>
                </View>
                <Text style={{color: 'rgb(68, 110, 182)', fontSize: 18, fontWeight: 'bold'}}>23:15</Text>
              </View> */}
              <View style={[styles.ctNoti, {marginTop: 14}]}>
                <Text style={{color: 'rgb(135, 80, 161)'}}>SOCIAL NETWORK</Text>
              </View>
              <View style={styles.ctItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtTitle}>Facebook</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.txtSub1, {marginRight: 8}]}>Lê Linh Duy</Text>
                    <Text style={{color: 'rgb(68, 110, 182)'}}>Hủy kết nối</Text>
                  </View>
                </View>
                <Image style={{height: 22, width: 22}} source={require('../images/icons/ic_checked1.png')} />
              </View>
              <View style={styles.ctItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtTitle}>Youtube</Text>
                  <Text style={styles.txtSub1}>Chưa kết nối</Text>
                </View>
                <TouchableOpacity>
                  <Text style={{color: 'rgb(68, 110, 182)', fontSize: 16, fontWeight: 'bold'}}>Nối tài khoản</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.ctItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtTitle}>Instagram</Text>
                  <Text style={styles.txtSub1}>Chưa kết nối</Text>
                </View>
                <TouchableOpacity>
                  <Text style={{color: 'rgb(68, 110, 182)', fontSize: 16, fontWeight: 'bold'}}>Nối tài khoản</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
              <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
                <View>
                  <Text style={main.txtBack}>Quay lại</Text>
                </View>
              </NavButton>
            </NavBar>
          </Animated.View>
        </View>
        
        
      </View>
    );
  }
}
var styles = StyleSheet.create({
  txtTitle: {
    color: 'rgb(41, 42, 57)',
    fontSize: 16
  },
  txtSub1: {
    color: 'rgb(133, 142, 152)',
    marginTop: 2
  },
  txtSub: {
    color: 'rgb(138, 138, 143)',
    fontSize: 13,
    marginTop: 2
  },
  ctItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: 'rgb(228, 232, 242)',
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  ctNoti: {
    backgroundColor: 'rgb(247, 243, 249)',
    paddingLeft: 15,
    height: 40,
    justifyContent: 'center',
    marginTop: 24
  },
  txtSetting: {
    color: 'rgb(215, 53, 84)',
    fontSize: 32,
    marginLeft: 15
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
