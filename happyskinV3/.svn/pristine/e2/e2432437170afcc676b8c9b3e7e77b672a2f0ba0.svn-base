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
  Animated,
  InteractionManager
} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let ConstantSystem = require('../services/ConstantSystem');

//connect
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as profileActions from '../actions/profileActions';
const actions = [
  profileActions
];
function mapStateToProps(state) {
  return {
    profile: state.profile,
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

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      info: 'Lời giới thiệu về bản thân do user tự điền, không quá 500 ký tự. Phía dưới là icon các tài khoản social khác mà user có thể tự điền vào ở phần cài đặt, hoặc nếu không có thì không hiện.',
    }
  }

  // componentWillMount() {
  //   this.props.actions.dataUserRequest()
  // }
  // componentDidMount(){
  //   timeout = setTimeout( () => {
  //     this.setState({
  //       timeoutCloseSpin: true
  //     })
  //   },ConstantSystem.TIMEOUT);

  //   InteractionManager.runAfterInteractions(() => {
  //     this.props.actions.dataUser();
  //   });
  // }

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
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={main.container}>
          <ScrollView>
            <View style={styles.ctAvatar}>
              <Image style={{height: 124, width: 124, borderRadius: 62}} source={{uri: this.props.profile.currentUser.avatar+'_100x100.png'}} />
            </View>
            <View style={styles.ctName}>
              <Text style={styles.txtName}>{this.props.profile.currentUser.full_name}</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={styles.ctSkin}>
                  <Text style={styles.txtSkin}>{this.props.profile.currentUser.skintest}</Text>
                </View>
              </View>
              <Text style={styles.txtLevel}>{this.props.profile.currentUser.level.level_name}</Text>
            </View>
            <View style={styles.ctContent}>
              <Text style={styles.txtInfo}>{this.props.profile.currentUser.description}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={{height: 24, width: 24}} source={require('../images/icons/ic_fb2.png')} />
                  <Text style={{color: 'rgb(68, 110, 182)', marginLeft: 5, fontWeight: 'bold'}}>Hanna Tuong</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={{height: 24, width: 24}} source={require('../images/icons/ic_youtube_red.png')} />
                  <Text style={{color: 'rgb(215, 53, 84)', marginLeft: 5, fontWeight: 'bold'}}>Hanna Tuong</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                <Image style={{height: 24, width: 24}} source={require('../images/icons/ic_instagram_orange.png')} />
                <Text style={{color: 'rgb(255, 117, 54)', marginLeft: 5, fontWeight: 'bold'}}>Hanna Tuong</Text>
              </View>
            </View>
          </ScrollView>
          {
          this.props.profile.isFetching ?
            <View style={main.mainSpin1}>
              <Image style={main.imgLoading} source={require('../images/rolling.gif')} />
            </View>
            : null
          }
          <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
              <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
                <View>
                  <Text style={main.txtBack}>Quay lại</Text>
                </View>
              </NavButton>
              <NavButton onPress={() => Actions.editProfile()} style={main.navButton}>
                <Text style={{color: '#446EB6',fontSize: 17, padding: 8}}>Sửa thông tin</Text>
              </NavButton>
            </NavBar>
          </Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txtInfo: {
    fontSize: 15,
    color: 'rgb(51, 51, 51)'
  },
  ctContent: {
    paddingTop: 20,
    padding: 15
  },
  txtLevel: {
    color: 'rgb(215, 53, 84)',
    marginTop: 5
  },
  txtName: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  txtSkin: {
    fontSize: 16,
    color: '#fff',
  },
  ctSkin:{
    backgroundColor: 'rgba(233, 69, 122, 0.8)',
    borderRadius: 100,
    padding: 3,
    paddingLeft: 14, 
    paddingRight: 14
  },
  ctName: {
    paddingLeft: 15,
    paddingBottom: 21,
    borderBottomColor: 'rgb(236, 238, 240)',
    borderBottomWidth: 1,
  },
  ctAvatar: {
    alignItems: 'center',
    marginTop: 45,
    paddingTop: 28,
  },
});
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
