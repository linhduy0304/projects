

import React, { Component } from 'react';
import { 
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform
} from 'react-native'
import {Actions} from 'react-native-router-flux';
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import HotDeal from '../components/home/HotDeal'
import Category from '../components/home/Category';
import ModalSearch from '../components/ModalSearch'
import SplashScreen from 'react-native-splash-screen'

let main = require('../styles/Main');
var Modal = require('react-native-modalbox');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as homeActions from '../actions/homeActions';
import * as loginActions from '../actions/loginActions';
const actions = [
  homeActions,
  loginActions
];
function mapStateToProps(state) {
  return {
    profile: state.profile,
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

class HomeNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      // category: [
      //   {
      //     source: require('../images/icons/ic_skintest.png'),
      //     backgroundColor: '#f79435',
      //     title: 'Kiểm tra loại da',
      //     sub: 'Kiểm tra nhóm da của bạn',
      //     type: 1
      //   },
      //   {
      //     source: require('../images/icons/ic_posts.png'),
      //     backgroundColor: '#8c44a7',
      //     title: 'Đọc tin làm đẹp chuyên sâu',
      //     sub: 'Bài viết về làm đẹp',
      //     type: 1
      //   },
      //   {
      //     source: require('../images/icons/ic_cart.png'),
      //     backgroundColor: '#c32533',
      //     title: 'Mua mỹ phẩm chính hãng',
      //     sub: 'Ưu đãi khi mua sản phẩm',
      //     type: 1
      //   },
      //   {
      //     source: require('../images/icons/ic_book.png'),
      //     backgroundColor: '#e1344c',
      //     title: 'Đặt lịch Happy Skin Spa',
      //     sub: 'Đặt lịch spa tốt và gần bạn',
      //     type: 1
      //   },
      //   {
      //     source: require('../images/icons/ic_QA.png'),
      //     backgroundColor: '#21d9ba',
      //     title: 'Hỏi đáp với chuyên gia',
      //     sub: 'Hỏi đáp với chuyên gia',
      //     type: 2
      //   },
      //   {
      //     source: require('../images/icons/ic_skintest.png'),
      //     backgroundColor: '#1d58a2',
      //     title: 'Tài khoản của bạn',
      //     sub: 'Hồ sơ cá nhân',
      //     type: 3
      //   },
      // ],
    }
  }

  componentWillMount() {
    if(this.props.profile.currentUser === '') {
      this.props.actions.dataUser()
    }
    this.props.actions.home();
      // this.props.actions.hotDeal();
  }

  componentDidMount(){
    SplashScreen.hide();
  }

  skinStore() {
    Linking.openURL('https://www.skinstore.vn/');
  }

  chat() {
    if(this.props.profile.currentUser.dashboard.count_coach == 0 && this.props.profile.currentUser.dashboard.count_routine == 0) {
      Actions.chatEmpty()
    }else {
      Actions.chatList()
    }
  }


  render() {
    return (
      <View style={[main.container, ]}>
        <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#000'}}></View>
        <NavBar style={{navBar: main.navBarBlack, statusBar: main.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#000'}} >
          <NavButton/>
          <NavTitle style={main.navTitle}>
            <Image source={require('../images/logo_normal.png')} style={main.logo} />
          </NavTitle>
          <NavButton/>
          {/* <TouchableOpacity onPress={() => null} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../images/icons/ic_side_menu.png')} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => this.setState({openModal: true})} style={{position: 'absolute', right: 0, padding: 15}}>
            <Image style={{height: 18, width: 18}} source={require('../images/icons/ic_search_white.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>  Actions.notification()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image style={{height: 18, width: 18}} source={require('../images/icons/ic_notification_white.png')} />
          </TouchableOpacity>
        </NavBar>

        <View style={styles.ctContent}>
          <ScrollView >
            <HotDeal/>
            <View style={styles.ctCategory}>
              <Category 
                source={require('../images/icons/ic_skintest.png')}
                backgroundColor= {'#f79435'}
                title = {'Skin Test'}
                sub = {'Kiểm tra loại da'}
                type = {1}
                onPress= {() => Actions.skinIntroduct()}
              />
               <Category 
                source={require('../images/icons/ic_posts.png')}
                backgroundColor= {'#8c44a7'}
                title = {'Magazine'}
                sub = {'Đọc tin làm đẹp chuyên sâu'}
                onPress = {() =>  Actions.explore()} 
                type = {1}
              />
               <Category 
                source={require('../images/icons/ic_cart.png')}
                backgroundColor= {'#c32533'}
                title = {'Skin Store'}
                sub = {'Mua mỹ phẩm chính hãng'}
                onPress = {() => this.skinStore()}
                type = {1}
              />
               <Category 
                source={require('../images/icons/ic_book.png')}
                backgroundColor= {'#e1344c'}
                title = {'Spa Booking'}
                sub = {'Đặt lịch Happy Skin Spa'}
                onPress = {() => Actions.spaBooking()}
                type = {1}
              />
               <Category 
                source={require('../images/icons/ic_QA.png')}
                backgroundColor= {'#21d9ba'}
                title = {'Ask Expert'}
                sub = {'Hỏi đáp với chuyên gia'}
                onPress = {() => this.chat()}
                type = {2}
              />
              <Category 
                source={this.props.profile.currentUser.avatar}
                backgroundColor= {'#195395'}
                title = {'Profile'}
                sub = {'Tài khoản của bạn'}
                onPress = {() => Actions.more()}
                type = {3}
              />
            </View>
          </ScrollView>
        </View>
        <Modal 
        style={[main.modal, {marginTop: 0}]}
          isOpen={this.state.openModal}
          swipeToClose={true}
          position="top"
          entry="bottom"
          animationDuration={200}
          backdropColor="#000"
          onClosed={()=> this.setState({openModal: false}) }>
          <ModalSearch closeModal={() => this.setState({openModal: false})}/>
        </Modal>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  ctContent: {
    flex: 1,
  },
  ctCategory: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})

 
export default connect(mapStateToProps, mapDispatchToProps)(HomeNew);