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
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
  Dimensions
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import { TextField } from 'react-native-material-textfield';
import ItemFollow from './profile/ItemFollow'
import NoInternet from '../components/NoInternet'
//import RNFirebase from 'react-native-firebase';
import RNFirebase from 'react-native-firebase';

let css = require('../Css');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

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

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      isRefreshing: false,
      page: 1,
    }
  }

  componentWillMount() {
    this.props.actions.followingRequest();
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("Following_Screen");
  }

  componentDidMount() {
    this.props.actions.following(null, this.props.id);
    // timeout = setTimeout( () => {
    // }, 1000);
    // InteractionManager.runAfterInteractions(()=> {
    //   this.props.actions.home();
    // })
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.following(null, this.props.id, 'RF');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.profile.loadMore) {
        return;
    }
    this.props.actions.following(null, this.props.id, 'LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  renderFollow() {
    if(this.props.id == this.props.profile.currentUser.id) {
      return 'Bạn đang follow '+this.props.profile.currentUser.count_followings+' người.';
    }else {
      if(this.props.profile.otherProfile) {
        return this.props.profile.otherProfile.full_name+' đang follow '+this.props.profile.otherProfile.count_followings+' người.';
      }else return null
    }
  }

  onChange(keyword) {
    var _this= this;
    this.setState({keyword: keyword});

    // var timeout = setTimeout(() => {
    //   console.log('ddd')
      
      
    //   _this.props.actions.following(keyword, this.props.id);
    //   dismissKeyboard();
    // }, 1200)
    // console.log(timeout)
  }

  _renderFooter() {
    if(this.props.profile.loadMore) {
      return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 30, width: 30}} source={require('../images/load_more.gif')} />
          <Text style={{color: 'rgb(0, 139, 125)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>)
    }else return null;
  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back.png')} />
            </NavButton>
            <View style={{marginLeft: 9,justifyContent: 'center'}}>
              <Text style={css.txtTitle}>Following</Text>
            </View>
          </NavGroup>
        </NavBar>
        
        <NoInternet />

        <View style={{padding: 15}}>
          <Text style={styles.txtTip}>{this.renderFollow()}</Text>
          <View style={styles.ctSearch}>
            <Image style={styles.ic_search} source={require('../images/icons/ic_search_blue.png')} />
            <TextInput
              style={{padding: 0, flex: 1, color: 'rgb(31, 42, 53)', marginLeft: 20}}
              placeholder="Tìm kiếm following"
              underlineColorAndroid="transparent"
              placeholderTextColor="rgb(194, 197, 208)"
              onChangeText={(keyword) => this.onChange(keyword)}
              onSubmitEditing={() => this.props.actions.following(this.state.keyword, this.props.id)}
              value={this.state.keyword}
              autoCapitalize="none"
            />
          </View>
          {
            this.props.profile.loadingSearch ?
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'rgb(0, 139, 125)'}}>Đang tìm kiếm...</Text>
              </View>
            : null
          }
        </View>

        {
          this.props.profile.loading ?
            <View style={css.mainSpinTop}>
              <Image style={{width: 50, height: 50}} source={require('../images/loading.gif')} />
            </View>
          :
          this.props.profile.following ?
          this.props.profile.following.length == 0 ?
            <View style={{alignItems: 'center', paddingTop: 20}}>
              <Text>Không có kết quả tìm kiếm.</Text>
            </View>
            : 
            <FlatList
              ref="listRef"
              contentContainerStyle={{padding: 15}}
              onEndReached={() => this.loadMore()}
              // ListHeaderComponent={() => this._renderHeader()}
              ListFooterComponent={() => this._renderFooter()}
              data={this.props.profile.following}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this._onRefresh()}
                />
              }
              // removeClippedSubviews 
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.2}
              renderItem={(data) => <ItemFollow data={data.item} />} 
            />
          : null 
        }
      </View>
    )
  }
}

const styles= StyleSheet.create({


  ctSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: 'rgb(236, 238, 240)',
    borderBottomWidth: 1,
    marginBottom: 17
  },
  ic_search: {
    width: 16,
    height: 16
  },
  txtTip: {
    fontSize: 15,
    color: 'rgb(51, 51,51)'
  },
  body: {
    padding: 15,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Following);


