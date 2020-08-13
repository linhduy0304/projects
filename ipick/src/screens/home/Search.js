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
  TextInput,
  TouchableOpacity
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../components/ScrollableTabBar';
import Post from './Post'
import User from './User'
import ModalSearch from '../../components/ModalSearch'
import NoInternet from '../../components/NoInternet'
//import RNFirebase from 'react-native-firebase';
import RNFirebase from 'react-native-firebase';

var Modal = require('react-native-modalbox');
let css = require('../../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as homeActions from '../../actions/homeActions';

const actions = [
  homeActions,
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


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: this.props.keyword ? this.props.keyword : '',
      tab: 'post'
    }
  }

  componentWillMount() {
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("Search_Screen");
  }

  changeTab(e) {
    if(e.i == 1 ) {
      this.setState({tab: 'user'})
    }else {
      this.setState({tab: 'post'})
    }
  }

  submit() {
    if(this.state.tab == 'post') {
      this.props.actions.search('post', this.state.keyword)
    }else {
      this.props.actions.search('user', this.state.keyword)
    }
  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back.png')} />
            </NavButton>
          <TextInput
            ref='input'
            style={styles.input}
            placeholder="Gõ nội dung tìm kiếm"
            placeholderTextColor="#000"
            value={this.state.keyword}
            underlineColorAndroid="transparent"
            onChangeText={(keyword) => this.setState({keyword: keyword})}
            onSubmitEditing={() => this.submit()}
            autoCapitalize="none"
            autoFocus={true}
          />
          <TouchableOpacity style={{padding: 15}} onPress={()=> this.refs.input.focus()}>
            <Image source={require('../../images/icons/ic_search_blue.png')} />
          </TouchableOpacity>
          </NavGroup>
         
        </NavBar>

        <NoInternet />

        <ScrollableTabView
          initialPage={0}
          tabBarBackgroundColor='white'
          tabBarInactiveTextColor='rgba(0, 0, 0, 0.7)'
          tabBarActiveTextColor='rgb(0, 139, 125)'
          prerenderingSiblingsNumber={0}
          onChangeTab={(e) => this.changeTab(e) }
          tabBarTextStyle={{fontSize: 14}}
          scrollWithoutAnimation={true}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <Post keyword={this.state.keyword} tabLabel='BÀI VIẾT'/>
          <User keyword={this.state.keyword} tabLabel='NGƯỜI DÙNG'/>
        </ScrollableTabView>
       
      </View>
    )
  }
}

const styles= StyleSheet.create({
  input: {
    flex: 1,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);


