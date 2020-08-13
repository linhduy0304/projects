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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../components/ScrollableTabBar';
// import RNFirebase from 'react-native-firebase';
import Post from './Post'
import User from './User'

import {loadSearch} from '../../actions/search'
import { connect } from 'react-redux'

let css = require('../../Css');

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: this.props.keyword ? this.props.keyword : '',
      tab: 'post'
    }
  }

  // componentWillMount() {
  //   var firebase = RNFirebase.initializeApp({ debug: false });
  //   firebase.analytics().logEvent("Search_Screen");
  // }

  changeTab(e) {
    if(e.i == 1 ) {
      this.setState({tab: 'user'})
    }else {
      this.setState({tab: 'post'})
    }
  }

  submit() {
    if(this.state.tab == 'post') {
      this.props.loadSearch('posts', this.state.keyword, 'L');
    }else {
      this.props.loadSearch('user', this.state.keyword, 'L');
    }
  }

  render() {
    return (
      <View style={css.container}>
        <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D'}}></View>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#C6247D'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image  source={require('../../images/icons/ic_back.png')} />
            </NavButton>
          <TextInput
            ref='input'
            style={styles.input}
            placeholder="Gõ nội dung tìm kiếm"
            placeholderTextColor="#fff"
            value={this.state.keyword}
            underlineColorAndroid="transparent"
            onChangeText={(keyword) => this.setState({keyword: keyword})}
            onSubmitEditing={() => this.submit()}
            autoCapitalize="none"
            autoFocus={true}
          />
          <TouchableOpacity style={{padding: 15}} onPress={()=> this.refs.input.focus()}>
            <Image source={require('../../images/icons/ic_search.png')} />
          </TouchableOpacity>
          </NavGroup>
        </NavBar>


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
    color: '#fff'
  },
});

const mapStateToProps = (state) => {
  return {
    search: state.search,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSearch: (type, keyword,action, page) => dispatch(loadSearch(type, keyword,action, page)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);


