import React, { Component, PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  InteractionManager,
  RefreshControl
} from 'react-native';

import { Actions } from "react-native-router-flux";
import PostItem from '../../components/PostItem';
import Carousel from 'react-native-snap-carousel';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let css = require('../../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as homeActions from '../../actions/homeActions';
import * as postActions from '../../actions/postActions';
import * as profileActions from '../../actions/profileActions';

const actions = [
  homeActions,
  postActions,
  profileActions
];
function mapStateToProps(state) {
  return {
    home: state.home,
    profile: state.profile
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

class UserSuggest extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      is_follow: this.props.data.is_follow_current_user,
    }
  }

  profile(id) {
    Actions.otherProfile({id: id})
    // console.log(id)
    // // var store = new StoreService();
    // // return store.getSession(Constant.IP_DATA_USER).then(res => {
    // //   console.log(res)
    // // })
    // if(this.props.profile.currentUser.id == id) {
    //   console.log('ok')
    //   Actions.tab({page: 'profile'})
    // }else {
    //   console.log('dddddddddd')
    //   Actions.otherProfile({id: id})
    // }
  }

  follow(id) {
    this.setState({
      is_follow: this.state.is_follow == 1 ? 0 : 1,
    });
    this.props.actions.follow(id)
  }

  render() {
    return (
      <View style={{marginTop: 15,borderRadius: 2, padding: 15,  marginRight: 15, width:deviceWidth - 135, backgroundColor: '#fff', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.profile(this.props.data.id)}>
          <Image style={{height: 50, width: 50, borderRadius: 4}} source={this.props.data.avatar ? {uri: this.props.data.avatar+'_100x100.png'} : require('../../images/avatar_default.png')} />
        </TouchableOpacity>
        <View style={{marginLeft: 13,flex: 1}}>
          <Text numberOfLines={1} onPress={() => this.profile(this.props.data.id)} style={{fontWeight: 'bold', fontSize: 16, color: 'rgb(48, 88, 154)', flex: 1}}>{this.props.data.full_name}</Text>
          <View style={{flexDirection: 'row', marginTop: 9}}>
            <View>
              <Text style={styles.txtCount}>{this.props.data.count_post}</Text>
              <Text style={styles.txtPost}>Bài viết</Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={styles.txtCount}>{this.props.data.count_followers}</Text>
              <Text style={styles.txtPost}>Follower</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
          {
            this.state.is_follow == 1 ?
              <TouchableOpacity onPress={() => this.follow(this.props.data.id)} style={styles.ctFollow}>
                <Image source={require('../../images/icons/ic_picked_plus.png')} />
                <Text style={{fontSize: 12, color: 'rgb(0, 139, 125)', fontWeight: 'bold', marginLeft: 6}}>Picked</Text>
              </TouchableOpacity>
            :
              <TouchableOpacity onPress={() => this.follow(this.props.data.id)} style={styles.ctFollow}>
                <Image source={require('../../images/icons/ic_pick_plus.png')} />
                <Text style={{fontSize: 12, color: 'rgb(0, 139, 125)', fontWeight: 'bold', marginLeft: 6}}>Pick</Text>
              </TouchableOpacity>
          }
          </View>

        </View>
      </View>
    )
  }
}

const styles= StyleSheet.create({

  txtCount: {
    fontSize: 16, 
    color: '#000',
  },
  txtPost: {
    color: 'rgb(176, 184, 198)'
  },
  ctFollow: {
    borderWidth: 1,
    borderColor: 'rgb(176, 184, 198)',
    borderRadius: 12,
    flexDirection: 'row',
    height: 24,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 15
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(UserSuggest);