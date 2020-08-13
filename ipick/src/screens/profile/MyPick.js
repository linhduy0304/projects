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
    tab: state.tab
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

class MyPick extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      page: 1,
    }
  }

  componentWillMount() {
    this.props.actions.myPickRequest();
  }

  componentDidMount() {
    this.props.actions.myPick(this.props.id);
    // timeout = setTimeout( () => {
    // }, 1000);
    // InteractionManager.runAfterInteractions(()=> {
    //   this.props.actions.home();
    // })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tab.profile && nextProps.profile.myPick && nextProps.profile.myPick.length !== 0) {
      setTimeout( () => {
        this.refs.list.scrollToOffset({x: 0, y: 0, animated: true})
      }, 10);
    }
  }


  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.myPick(this.props.id, 'RF');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.profile.lmMyPick) {
        return;
    }
    this.props.actions.myPick(this.props.id, 'LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  _renderFooter() {
    if(this.props.profile.lmMyPick) {
      return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 30, width: 30}} source={require('../../images/load_more.gif')} />
          <Text style={{color: 'rgb(0, 139, 125)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>)
    }else return null;
  }

  render() {
    return (
      <View style={css.container}>
        {
          this.props.profile.loading ?
            <View style={css.mainSpinTop}>
              <Image style={{width: 50, height: 50}} source={require('../../images/loading.gif')} />
            </View>
          :
          this.props.profile.myPick ?
            this.props.profile.myPick.length == 0 ?
             <View style={{alignItems: 'center', paddingTop: 20}}>
               <Text>Bạn chưa pick bài viết nào</Text>
              </View>
            : 
            <FlatList
              ref="list"
              contentContainerStyle={{paddingBottom: 15}}
              onEndReached={() => this.loadMore()}
              ListFooterComponent={() => this._renderFooter()}
              contentContainerStyle={{backgroundColor: 'rgb(237, 239, 241)'}}
              data={this.props.profile.myPick}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this._onRefresh()}
                />
              }
              removeClippedSubviews 
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.2}
              renderItem={(data) => <PostItem data={data.item}/>} 
            />
          : null
        }
      </View>
    )
  }
}

const styles= StyleSheet.create({
  ctFollow: {
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: 'rgb(176, 184, 198)',
    borderWidth: 1,
    height: 24,
    paddingLeft: 5,
    paddingRight: 12,
    alignItems: 'center'
  },
  txtPick: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(0, 139, 125)'
  },
  ic_follow: {
    marginRight: 6
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPick);