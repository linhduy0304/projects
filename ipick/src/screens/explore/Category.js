/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component , PureComponent} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  InteractionManager,
  RefreshControl
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import PostItem from '../../components/PostItem';
import ModalSearch from '../../components/ModalSearch'
import NoInternet from '../../components/NoInternet'
import RNFirebase from 'react-native-firebase';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Modal = require('react-native-modalbox');
let css = require('../../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as exploreActions from '../../actions/exploreActions';

const actions = [
  exploreActions,
];
function mapStateToProps(state) {
  return {
    explore: state.explore,
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


class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      category: 'BÀI VIẾT TIÊU BIỂU',
      openModal: false,
      openSearch: false,
      isRefreshing: false,
      page: 1,
      is_like: this.props.category.is_like,
      user_follow: null,
    }
  }

  componentWillMount() {
    this.props.actions.categoryRequest('L');
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("Category_Screen");
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 1000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.category(this.props.category.slug);
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.explore.category != this.props.explore.category) {
      this.setState({
        user_follow: nextProps.explore.category.user_follow
      })
    }
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    switch(this.state.category) {
      case 'BÀI VIẾT TIÊU BIỂU':
        this.props.actions.category(this.props.category.slug, 'focal', 1, 'RF');
        this.setState({
          isRefreshing: false,
        })
        return;
      case 'BÀI VIẾT MỚI NHẤT':
        this.props.actions.category(this.props.category.slug, '', 1, 'RF');
        this.setState({
          isRefreshing: false,
        })
        return;
      default:
        this.props.actions.category(this.props.category.slug, 'like', 1, 'RF');
        this.setState({
          isRefreshing: false,
        })
        return;
    }
  }

  loadMore() {
    if (!this.props.explore.loadMore) {
        return;
    }
    switch(this.state.category) {
      case 'BÀI VIẾT TIÊU BIỂU':
        this.props.actions.category(this.props.category.slug, 'focal', this.state.page + 1, 'LM');
        this.setState({
          page: this.state.page + 1,
        });
        return;
      case 'BÀI VIẾT MỚI NHẤT':
        this.props.actions.category(this.props.category.slug, '', this.state.page + 1, 'LM');
        this.setState({
          page: this.state.page + 1,
        });
        return;
      default:
        this.props.actions.category(this.props.category.slug, 'like', this.state.page + 1, 'LM');
        this.setState({
          page: this.state.page + 1,
        });
        return;
    }
  }

  like(category) {
    this.setState({
      is_like: this.state.is_like == 1 ? 0: 1,
      user_follow: category.is_like == 1 ? this.state.user_follow - 1 : this.state.user_follow +1
    })
    this.props.actions.pickCategory(category);
  }

  _renderHeader() {
    return (
      <View>
        <View style={{padding: 15}}>
          <Text style={{color: 'rgb(176, 184, 198)'}}>Chủ đề</Text>
          <Text style={styles.txtRead}>{this.props.category.title}</Text>
          <View style={{flexDirection: 'row', marginTop: 12, alignItems: 'center'}}>
            {
              this.state.is_like ?
              <TouchableOpacity onPress={() => this.like(this.props.category)} style={[css.ctFollow, {borderColor: 'rgb(237, 239, 241)', backgroundColor: '#fff'}]}>
                <Image style={css.ic_follow} source={require('../../images/icons/ic_picked_plus.png')} />
                <Text style={{fontSize: 12, color: 'rgb(0, 139, 125)', fontWeight: 'bold'}}>Picked</Text>
              </TouchableOpacity>
            : 
              <TouchableOpacity onPress={() => this.like(this.props.category)} style={[css.ctFollow, {borderColor: 'rgb(237, 239, 241)', backgroundColor: '#fff'}]}>
                <Image style={css.ic_follow} source={require('../../images/icons/ic_pick_plus.png')} />
                <Text style={{fontSize: 12, color: 'rgb(0, 139, 125)', fontWeight: 'bold'}}>Pick</Text>
              </TouchableOpacity>
            }
           
            <Text style={{color: 'rgb(176, 184, 198)'}}>· {this.state.user_follow ? this.state.user_follow : null} người đã pick</Text>
          </View>
          
        </View>
        <TouchableOpacity onPress={() => this.setState({openModal: true})} style={{backgroundColor: 'rgb(237, 239, 241)',alignItems: 'center', padding: 15, flexDirection: 'row'}}>
          <Image source={require('../../images/icons/ic_hot_post.png')} />
          <Text style={{marginLeft: 5, color: 'rgb(27, 48, 70)'}}>{this.state.category}</Text>
          <Image style={{marginLeft: 5}} source={require('../../images/icons/ic_down_black.png')} />
        </TouchableOpacity>
        {
          this.props.explore.isFetching ?
            <View style={{alignItems: 'center', paddingTop: 20, backgroundColor: '#fff'}}>
              <Image style={{width: 50, height: 50}} source={require('../../images/loading.gif')} />
            </View>
            : null
        }
      </View>
    )
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.explore != this.props.explore) {
  //     this.setState({
  //       posts: nextProps.explore.posts
  //     })
  //   }
  // }

  _renderFooter() {
    if(this.props.explore.loadMore) {
      return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 30, width: 30}} source={require('../../images/load_more.gif')} />
          <Text style={{color: 'rgb(0, 139, 125)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>
      )
    }
    if(this.props.explore.posts) {
      if (this.props.explore.posts.length == 0 && !this.props.explore.isFetching ) {
        return (
          <View style = {css.noti}>
            <Text>Hiện tại chưa có bài viết nào.</Text>
          </View>
        )
      }else return null;
    }else return null;
    
  }

  setCategory(type) {
    switch(type) {
      case 1:
        this.setState({
          openModal: false,
          category: 'BÀI VIẾT TIÊU BIỂU'
        })
        this.props.actions.category(this.props.category.slug)
        return;
      case 2:
        this.setState({
          openModal: false,
          category: 'BÀI VIẾT MỚI NHẤT'
        })
        this.props.actions.category(this.props.category.slug, '')
        return;
      default:
        this.setState({
          openModal: false,
          category: 'BÀI VIẾT ĐÃ LƯU'
        })
        this.props.actions.category(this.props.category.slug, 'like')
        return;
    }
  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBarCate, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back.png')} />
            </NavButton>
          </NavGroup>
          {/* <NavGroup>
            <NavButton onPress={() => this.setState({openSearch: true})} style={css.navBack}  >
              <Image source={require('../../images/icons/ic_search_black.png')} />
            </NavButton>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image source={require('../../images/icons/ic_menu.png')} />
            </NavButton>
          </NavGroup> */}
        </NavBar>
        <NoInternet />
        <FlatList
          contentContainerStyle={{backgroundColor: 'rgb(246, 248, 249)'}}
          ListHeaderComponent={() => this._renderHeader()}
          ListFooterComponent={() => this._renderFooter()}
          data={this.props.explore.posts}
          refreshControl={
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this._onRefresh()}
            />
          }
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.2}
          removeClippedSubviews 
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => <PostItem data={data.item}/>}
        />

      <Modal 
        style={styles.ctModal}
        isOpen={this.state.openModal}
        swipeToClose={true}
        position="center"
        entry="bottom"
        animationDuration={200}
        backdropColor="#000"
        onClosed={()=> this.setState({openModal: false}) }>
        <View style={{backgroundColor: '#fff', width: deviceWidth - 30}}>
          <TouchableOpacity onPress={() => this.setCategory(1)} style={{flexDirection: 'row', padding: 11, alignItems: 'center'}}>
            <View style={{width: 30, alignItems: 'center'}}>
              <Image source={require('../../images/icons/ic_hot_post.png')} />
            </View>
            <Text style={{fontSize: 16, color: 'rgb(51, 51, 51)', marginLeft: 7}}>Bài viết tiêu điểm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setCategory(2)} style={{flexDirection: 'row', padding: 11, alignItems: 'center'}}>
            <View style={{width: 30, alignItems: 'center'}}>
              <Image source={require('../../images/icons/ic_new_post.png')} />
            </View>
            <Text style={{fontSize: 16, color: 'rgb(51, 51, 51)', marginLeft: 7}}>Bài viết mới nhất</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setCategory(3)} style={{flexDirection: 'row', padding: 11, alignItems: 'center'}}>
            <View style={{width: 30, alignItems: 'center'}}>
              <Image source={require('../../images/icons/ic_saved_post.png')} />
            </View>
            <Text style={{fontSize: 16, color: 'rgb(51, 51, 51)', marginLeft: 7}}>Bài đã lưu</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal 
        style={css.ctModalSearch}
        isOpen={this.state.openSearch}
        swipeToClose={true}
        position="top"
        entry="bottom"
        animationDuration={200}
        backdropColor="#000"
        onClosed={()=> this.setState({openSearch: false}) }>
          <ModalSearch closeModal={() => this.setState({openSearch: false})} />
      </Modal>
        
      </View>
    )
  }
}

const styles= StyleSheet.create({
  ctModal: {
    backgroundColor: 'rgba(0, 138, 139, 0.6)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtRead: {
    fontSize: 36,
    color: 'rgb(0, 139, 125)'
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(Category);


