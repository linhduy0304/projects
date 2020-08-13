

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Platform
} from 'react-native';
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import css from '../../Css'

import * as auth from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import {Actions} from 'react-native-router-flux';

let Constant = require('../../services/Constant');
const Store = require('../../services/Store').default;
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

const actions = [
  auth
];

function mapStateToProps(state) {
  return {
    auth: state.auth,
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

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isModalApp: false,
      data: {
        avatar: 'https://static.ipick.vn/images/avatars/conheonho_9x_Rxpj7AObCG_300x300.png',
        full_name: 'Le Linh Duy',
        city: 'Hà Nội',
        birthday: '25-03-1993',
        relationship: 'Chồng'
      },
    }
  }

  logoutAction() {
    Alert.alert(
      'Thông báo',
      'Bạn muốn thoát ứng dụng?',
      [
        {text: 'Thoát', onPress: () => this.logout(), style: 'cancel'},
        {text: 'Huỷ bỏ', onPress: () => null}
      ]
    )
  }

  logout() {
    var _this = this;
    // _this.props.actions.logout();
    new Store().getSession(Constant.HF_HEADER_REQUEST)
    .then((header) => {
     if (header.Fbtoken != '') {
        FBLoginManager.logout(function(error, data){
          _this.props.actions.logout();
        });
      } else {
        _this.props.actions.logout();
      }
    })
    .catch((err) => {
    });
  }

  password() {
    if(this.props.profile.currentUser.is_password === 1) {
      // Actions.createNewPass()
    }else {
      Actions.changePass()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D'}}></View>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#C6247D'}} >
          <NavButton/>
          <NavTitle style={css.navTitle}>
            <Text style={css.txtTitle}>Setting</Text>
          </NavTitle>
          <NavButton/>
        </NavBar>

        <ScrollView>
          <View style={styles.ctAvatar}>
            <Image style={styles.avatar} source={this.props.profile.currentUser.avatar ? {uri: this.props.profile.currentUser.avatar+'.png'} : require('../../images/avatar_default.png')} />
            <View style={{marginLeft: 10,flex: 1,flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <Text style={styles.fullName}>{this.props.profile.currentUser.full_name}</Text>
                <Text style={{fontSize: 13}}>Xem trang cá nhân</Text>
              </View>
              <TouchableOpacity onPress={() => Actions.editProfile()} style={{padding: 15, }}>
              <Image style={{width: 20, height: 20}} source={require('../../images/icons/ic_edit_black.png')}/>
              </TouchableOpacity> 
            </View>
            
          </View>
          <View style={styles.ctTitle}>
            <Text style={styles.txtTitle}>GIA ĐÌNH</Text>
          </View>
          
          <TouchableOpacity onPress={() => Actions.individual()} style={styles.ctItem}>
            <Text style={styles.txtItem}>Danh sách thành viên</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.ctItem}>
            <Text style={styles.txtItem}>Mời bạn bè</Text>
          </TouchableOpacity> */}
          <View style={styles.ctTitle}>
            <Text style={styles.txtTitle}>CÁ NHÂN</Text>
          </View>
          <TouchableOpacity onPress={() => this.password()} style={styles.ctItem}>
            <Text style={styles.txtItem}>Đổi mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.logoutAction()} style={styles.ctItem}>
            <Text style={styles.txtItem}>Đăng xuất</Text>
          </TouchableOpacity>


          <View style={styles.ctTitle}>
            <Text style={styles.txtTitle}>HỖ TRỢ</Text>
          </View>
          <View style={[styles.ctItem, {justifyContent: 'space-between', flexDirection: 'row'}]}>
            <Text style={styles.txtItem}>Phiên bản ứng dụng</Text>
            <Text style={{color: '#C6247D'}}>1.0</Text>
          </View>
          <TouchableOpacity onPress={() => Actions.feedBack()} style={styles.ctItem}>
            <Text style={styles.txtItem}>Góp ý & Báo lỗi </Text>
          </TouchableOpacity>
        </ScrollView>
        
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fullName: {
    color: '#000',
    fontSize: 16
  },
  ctAvatar: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  ctItem: {
    padding: 15,
    paddingTop: 19,
    paddingBottom: 19
  },
  txtItem: {
    color: 'rgb(31, 42, 53)',
    fontSize: 15,
  },
  ctTitle: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 15,
    backgroundColor: 'rgb(237, 239, 241)'
  },
  txtTitle: {
    color: 'rgb(138, 144, 150)',
    fontSize: 13,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)