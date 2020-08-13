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
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let css = require('../../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as profileActions from '../../actions/profileActions';

const actions = [
  profileActions,
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

class ItemFollow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      is_follow: this.props.data.is_follow_current_user
    }
  }

  profile(id) {
    if(this.props.profile.currentUser.id == id) {
      return null
    }else{
      Actions.otherProfile({id: id})
    }
  }

  follow(id) {
    this.setState({
      is_follow: this.state.is_follow == 1 ? 0 : 1,
    });
    this.props.actions.follow(id)
  }

  render() {
    return (
      <View style={styles.ctItem} >
        <TouchableOpacity onPress={() => this.profile(this.props.data.id)}>
          <Image style={{height: 50, width: 50, borderRadius: 4}} source={this.props.data.avatar ? {uri: this.props.data.avatar +'_100x100.png'} : require('../../images/avatar_default.png')} />
        </TouchableOpacity>
        <View style={styles.ctName}>
          <Text onPress={() => this.profile(this.props.data.id)} style={styles.txtName}>{this.props.data.full_name}</Text>
          <Text style={styles.txtJobs}>{this.props.data.job}</Text>
        </View>
        {
          this.state.is_follow == 1 ?
          <TouchableOpacity onPress={() => this.follow(this.props.data.id)} style={styles.ctFollow}>
            <Image style={styles.ic_follow} source={require('../../images/icons/ic_picked_plus.png')} />
            <Text style={styles.txtPick}>Picked</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => this.follow(this.props.data.id)} style={styles.ctFollow}>
            <Image style={styles.ic_follow} source={require('../../images/icons/ic_pick_plus.png')} />
            <Text style={styles.txtPick}>Pick</Text>
          </TouchableOpacity>
        }
        
      </View>
    )
  }
}

const styles= StyleSheet.create({
  ctName: {
    flex: 1,
    marginLeft: 7
  },
  txtPick: {
    fontSize: 12,
    color: 'rgb(31, 42, 53)'
  },
  ic_follow: {
    height: 16,
    width: 16,
    marginRight: 6
  },
  txtName: {
    color: 'rgb(0, 0, 0)',
    fontSize: 16
  },
  txtJobs: {
    color: 'rgb(176, 184, 198)',
    marginTop: 4
  },
  ctItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 11,
    paddingBottom: 11,
  },
  ctFollow: {
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    height: 24,
    paddingLeft: 5,
    paddingRight: 12,
    alignItems: 'center'
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(ItemFollow);