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

const actions = [
  homeActions,
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

class Post extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      page: 1,
    }
  }

  componentWillMount() {
    // this.props.actions.searchRequest();
  }

  componentDidMount() {
    
    this.props.actions.search('post', this.props.keyword, 'L');
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
    this.props.actions.search('post', this.props.keyword, 'RF');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.home.loadMore) {
        return;
    }
    this.props.actions.search('post', this.props.keyword, 'LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  _renderFooter() {
    if(this.props.home.loadMore) {
      return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 30, width: 30}} source={require('../../images/load_more.gif')} />
          <Text style={{color: 'rgb(0, 139, 125)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>)
    }else return null;
  }

  profile(id) {
    if(this.props.profile.currentUser.id == id) {
      return null
    }else{
      Actions.otherProfile({id: id})
    }
  }

  render() {
    return (
      <View style={[css.container, {backgroundColor: 'rgb(237, 239, 241)'}]}>
        {
          this.props.home.isFetching ?
          <View style={css.ctLoading}>
            <Image style={{width: 30, height: 30}} source={require('../../images/sending.gif')} />
            <Text style={css.txtLoading}>Đang tìm kiếm</Text>
          </View>
          :
          this.props.home.searchPost ?
            this.props.home.searchPost.length == 0 ?
              <View style={{alignItems: 'center', paddingTop: 20}}>
                <Text>Không có bài viết nào</Text>
              </View>
            : 
            <FlatList
              ref="listRef"
              onEndReached={() => this.loadMore()}
              contentContainerStyle={{paddingTop: 10}}
              ListFooterComponent={() => this._renderFooter()}
              data={this.props.home.searchPost}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this._onRefresh()}
                />
              }
              removeClippedSubviews 
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.2}
              renderItem={(data) => (
                <View style={styles.ctItem}>
                  <TouchableOpacity onPress={() => Actions.postDetail({slug: data.item.slug})}>
                    <Image style={{height: 80*400/600, width: 80}} source={{uri: data.item.image_thumb+'_600x400.png'}} />
                  </TouchableOpacity>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text numberOfLines={2} onPress={() => Actions.postDetail({slug: data.item.slug})} style={styles.txtTitle}>{data.item.title}</Text>
                    <Text style={styles.txtBy}>Đăng bởi: <Text onPress={() => this.profile(data.item.user.id)} style={{color: 'rgb(0, 139, 125)'}}>{data.item.user.full_name}</Text></Text>
                  </View>
                </View>
              )} 
            />
          : null
        }
      </View>
    )
  }
}

const styles= StyleSheet.create({
  txtBy: {
    color: 'rgb(176, 184, 198)',
  },
  ctItem: {
    marginBottom: 7,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  txtTitle: {
    flex: 1,
    color: 'rgb(53, 69, 164)',
    fontSize: 16,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Post);