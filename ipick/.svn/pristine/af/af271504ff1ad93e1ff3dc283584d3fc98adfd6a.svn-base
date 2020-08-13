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
  TouchableOpacity
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import { TextField } from 'react-native-material-textfield';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import {validateEmail} from '../../components/Functions'
import NoInternet from '../../components/NoInternet'
//import RNFirebase from 'react-native-firebase';
import RNFirebase from 'react-native-firebase';

let css = require('../../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as profileActions from '../../actions/profileActions';
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


class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      info: '',
      link: 'ipick.vn/invite/tuanna/776556',
      error: null,
    }
  }

  componentWillMount() {
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("Invite_Screen");
  }

  send() {
    this.setState({error: null})
    dismissKeyboard();
    if(this.state.email == '') {
      this.setState({
        error: 'Bạn phải nhập email'
      })
      return;
    }
    if(!validateEmail(this.state.email)) {
      this.setState({
        error: 'Email không đúng định dạng.'
      });
      return
    };
    this.props.actions.invite(this.state.email, this.state.info)
  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back.png')} />
            </NavButton>
            <View style={{marginLeft: 9,justifyContent: 'center'}}>
              <Text style={css.txtTitle}>Mời bạn bè</Text>
            </View>
          </NavGroup>
        </NavBar>

        <NoInternet />

        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <View style={styles.body}>
            <Text style={styles.txtTip}>Hãy mời bạn bè cùng tham gia IPICK. Bạn còn 02 lời giới thiệu.</Text>
            <Text style={styles.txtTip1}>Điền email & lời giới thiệu tới bạn bè.</Text>
            <TextField
              label='Email'
              onChangeText={(email) => this.setState({email: email})}
              tintColor="rgb(47, 87, 153)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 196, 202)"
              autoCapitalize="none"
              selectionColor="rgb(41, 162, 104)"
              value={this.state.email}
            />
            <TextField
              label='Lời giới thiệu (không bắt buộc)'
              onChangeText={(info) => this.setState({info: info})}
              tintColor="rgb(47, 87, 153)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 196, 202)"
              autoCapitalize="none"
              selectionColor="rgb(41, 162, 104)"
              value={this.state.info}
            />
            {
              this.state.error ?
              <View>
                <Text style={css.txtError}>{this.state.error}</Text>
              </View>
              : null
            }
            {
              this.props.profile.loading ?
               <View style={css.ctLoading}>
                <Image style={{width: 30, height: 30}} source={require('../../images/sending.gif')} />
                 <Text style={css.txtLoading}>Đang gửi lời mời</Text>
              </View>
              :
              <Button 
                containerStyle={styles.btnRegister}
                style={styles.txtRegister}
                onPress={() => this.send()}
                >
                Gửi thư mời
              </Button>
            }
            {/* <Text style={styles.txtOr}>Hoặc, copy link dưới đây gửi trực tiếp tới bạn bè.</Text>
            <TextField
              label='Link giới thiệu'
              tintColor="rgb(194, 196, 202)"
              editable={false}
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 196, 202)"
              autoCapitalize="none"
              selectionColor="rgb(41, 162, 104)"
              value={this.state.link}
            />
            <Button 
              containerStyle={styles.btnCopy}
              style={{fontSize: 14, color: '#fff'}}
              onPress={() => null}
              >
              <Image style={{height: 18, width: 18, marginRight: 5}} source={require('../../images/icons/ic_copy.png')} />
              Copy
            </Button> */}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  btnCopy: {
    marginTop: 16,
    width: 85,
    height: 32,
    backgroundColor: "rgb(48, 88, 154)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  txtOr: {
    color: 'rgb(176, 184, 198)',
    fontSize: 13,
    marginTop: 40
  },
  txtRegister: {
    color: '#fff',
    fontSize: 16,
  },
  btnRegister: {
    marginTop: 24,
    height: 48,
    backgroundColor:"rgb(48, 88, 154)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  txtTip1: {
    color: 'rgb(176, 184, 198)',
    marginTop: 26,
    fontSize: 13
  },
  txtTip: {
    color: 'rgb(51, 51, 51)',
    fontSize: 15,
    marginTop: 12
  },
  body: {
    padding: 15,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Invite);


