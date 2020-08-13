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
import UserSuggest from './UserSuggest';

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

class HomeChild extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      is_like: null,
      isRefreshing: false,
      page: 1,
      is_save: null,
      count_like: null,
    }
  }

  componentWillMount() {
    this.props.actions.homeRequest();
  }

  componentDidMount() {
    this.props.actions.home();
    // timeout = setTimeout( () => {
    // }, 1000);
    // InteractionManager.runAfterInteractions(()=> {
    //   this.props.actions.home();
    // })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.home != this.props.home && nextProps.home.breaking) {
      this.setState({
        is_like: nextProps.home.breaking.is_like,
        is_save: nextProps.home.breaking.is_saved,
        count_like: nextProps.home.breaking.count_like_posts
      })
    }
    if(nextProps.home.posts && nextProps.home.posts.length == 0 && nextProps.tab.home) {
      // setTimeout( () => {
        this.refs.listscroll.scrollTo({x: 0, y: 0, animated: true})
      // }, 10);
    }
    if(nextProps.home.posts && nextProps.home.posts.length !== 0 && nextProps.tab.home) {
        // setTimeout( () => {
          this.refs.list.scrollToOffset({x: 0, y: 0, animated: true})
        // }, 10);
    }
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.home('RF');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.home.loadMoreMyPage) {
        return;
    }
    this.props.actions.home('LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
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

  like(is_like, id) {
    this.setState({
      is_like: this.state.is_like == 1 ? 0 : 1,
      count_like: is_like == 1 ? this.state.count_like - 1 : this.state.count_like + 1
    });
    this.props.actions.like(is_like, id)
  }

  save(is_save, id) {
    this.setState({
      is_save: this.state.is_save == 1 ? 0: 1
    });
    this.props.actions.save(is_save, id)
  }

  follow(id) {
    this.setState({
      is_follow: this.state.is_follow == 1 ? 0 : 1,
    });
    this.props.actions.follow(id)
  }

  renderContent(data, index) {
    switch(index) {
      case 4:
        return (
          <View>
            <PostItem data={data} />
            {
              this.props.home.breaking ?
                <View style={styles.ctSuggest}>
                  <Image source={require('../../images/icons/ic_breaking_pick.png')} />
                  <Carousel
                    data={this.props.home.breaking}
                    onSnapToItem={this.changeIndex}
                    renderItem={this._renderItemDaily.bind(this)}
                    sliderWidth={deviceWidth}
                    itemWidth={deviceWidth-120}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    activeSlideAlignment={'start'}
                  />
                </View>
              : null
            }
           
          </View>
        );
      case 9:
        return (
          <View>
            <PostItem data={data} />
            {
              this.props.home.userSuggests ?
                <View style={styles.ctSuggest}>
                  <Text style={styles.txtSuggest}>GỢI Ý CHO BẠN</Text>
                  <Carousel
                    data={this.props.home.userSuggests}
                    onSnapToItem={this.changeIndex}
                    renderItem={this._renderItem.bind(this)}
                    sliderWidth={deviceWidth}
                    itemWidth={deviceWidth-120}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    activeSlideAlignment={'start'}
                  />
                </View>
              : null
            }
            
          </View>
        );
      default: 
        return (<PostItem data={data} />)
    } 
  }


  _renderItemDaily ({item, index}) {
    return (
      <View style={{marginTop: 15,borderRadius: 2, marginRight: 15, width:deviceWidth - 135, backgroundColor: '#fff'}}>
        <TouchableOpacity onPress={() => Actions.postDetail({slug: item.slug})}>
          <Image style={{height: (deviceWidth - 120)*400/600, width:deviceWidth - 120, borderTopLeftRadius: 2, borderTopRightRadius: 2}} source={{uri: item.image_thumb+'_600x400.png'}} />
        </TouchableOpacity>
        <Text onPress={() => Actions.postDetail({slug: item.slug})} numberOfLines={2} style={{flex: 1, fontSize: 18, color: 'rgb(53, 69, 164)', marginLeft: 10, marginRight: 10, marginTop: 7}}>{item.title}</Text>
        <View style={styles.ctCount}>
          <Image source={item.is_like == 1 ? require('../../images/icons/ic_picked_count.png') : require('../../images/icons/ic_pick_count.png')} />
          <Text style={styles.txtCountDaily}>{item.count_like_posts}</Text>
          {/* <Image source={require('../../images/icons/ic_view_count.png')} /> */}
          {/* <Text style={styles.txtCountDaily}>{item.count_view_on_day}</Text> */}
          <Image source={require('../../images/icons/ic_comment_count.png')} />
          <Text style={styles.txtCountDaily}>{item.count_comment_post}</Text>
        </View>
      </View>
    )
  }

  _renderItem ({item, index}) {
    return <UserSuggest data={item}/>
  }


  _renderFooter() {
    if(this.props.home.loadMoreMyPage) {
      return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 30, width: 30}} source={require('../../images/load_more.gif')} />
          <Text style={{color: 'rgb(0, 139, 125)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>)
    }else return null;
  }

  renderWithoutPost() {
    return (
      <ScrollView
        ref="listscroll"
        onScroll= {this.props.onScroll}
        // onScrollBeginDrag={() => this.props.scrollBegin()}
        onScrollEndDrag={(e) => this.props.scrollEnd(e)}
        >
        <View style={styles.ctItem}>
          <View style={styles.ctHeader}>
            <TouchableOpacity onPress={() => this.profile(this.props.home.breaking.user.id)}>
              <Image style={styles.ctAvatar} source={this.props.home.breaking.user.avatar ? {uri: this.props.home.breaking.user.avatar+'_100x100.png'} : require('../../images/avatar_default.png')} />
            </TouchableOpacity>
            <View style={styles.ctName}>
              <Text onPress={() => this.profile(this.props.home.breaking.user.id)} style={styles.txtName}>{this.props.home.breaking.user.full_name}</Text>
              <Text style={styles.txtTime}>Tiêu đề cá nhân · </Text>
            </View>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',}}>
              <Image source={require('../../images/icons/ic_breaking_pick.png')} />
              <Image source={require('../../images/icons/ic_arrow_orange.png')} />
            </TouchableOpacity>
          </View>
          <Text onPress={() => Actions.postDetail({slug: this.props.home.breaking.slug})} style={styles.txtTitle}>{this.props.home.breaking.title}</Text>
          <TouchableOpacity  onPress={() => Actions.postDetail({slug: this.props.home.breaking.slug})}>
            <Image style={styles.img} source={{uri: this.props.home.breaking.image_thumb+ '_600x400.png'}} />
          </TouchableOpacity>
          <View style={styles.ctCount1}>
            <Image source={require('../../images/icons/ic_pick_count.png')} />
            <Text style={styles.txtCountDaily}>{this.props.home.breaking.count_like_posts}</Text>
            <Image source={require('../../images/icons/ic_view_count.png')} />
            <Text style={styles.txtCountDaily}>{this.props.home.breaking.count_view}</Text>
            <Image source={require('../../images/icons/ic_comment_count.png')} />
            <Text style={styles.txtCountDaily}>{this.props.home.breaking.count_comment_post}</Text>
          </View>
          <View style={styles.ctAction}>
            {
              this.state.is_like == 1 ?
                <TouchableOpacity onPress={() => this.like(this.state.is_like, this.props.home.breaking.id)} style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={require('../../images/icons/ic_picked.png')} />
                </TouchableOpacity>
              :
                <TouchableOpacity onPress={() => this.like(this.state.is_like, this.props.home.breaking.id)} style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={require('../../images/icons/ic_pickup.png')} />
                  <Text style={{fontSize: 15, color: 'rgb(135, 155, 206)', marginLeft: 7}}>Pick</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => Actions.postDetail({slug: this.props.home.breaking.slug, comment: true})} style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../images/icons/ic_comment_blue.png')} />
              <Text style={{fontSize: 15, color: 'rgb(135, 155, 206)', marginLeft: 7}}>Bình luận</Text>
            </TouchableOpacity>

            {
              this.state.is_save == 1 ?
                <TouchableOpacity onPress={() => this.save(this.state.is_save, this.props.home.breaking.id)} style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  {/* <Image source={require('../../images/icons/ic_saved_post.png')} /> */}
                  <Text style={{fontSize: 15, color: 'rgb(0, 139, 125)', marginLeft: 7}}>Đã lưu</Text>
                </TouchableOpacity>
              :
                <TouchableOpacity onPress={() => this.save(this.state.is_save, this.props.home.breaking.id)} style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={require('../../images/icons/ic_saved_post.png')} />
                  <Text style={{fontSize: 15, color: 'rgb(135, 155, 206)', marginLeft: 7}}>Lưu lại</Text>
                </TouchableOpacity>
            }
          </View>
        </View>
        <View style={styles.ctSuggest}>
          <Text style={styles.txtSuggest}>GỢI Ý CHO BẠN</Text>
          <Carousel
            data={this.props.home.userSuggests}
            onSnapToItem={this.changeIndex}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth-120}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            activeSlideAlignment={'start'}
          />
        </View>
        <View style={styles.ctSuggest}>
          <Text style={styles.txtSuggest}>DAILY PICK</Text>
          <Carousel
            data={this.props.home.dailys}
            onSnapToItem={this.changeIndex}
            renderItem={this._renderItemDaily.bind(this)}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth-120}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            activeSlideAlignment={'start'}
          />
        </View>
      </ScrollView>
    );
  }


  render() {
    return (
      <View style={css.container}>
        {
          this.props.home.isFetching ?
            <View style={css.mainSpinTop}>
              <Image style={{width: 50, height: 50}} source={require('../../images/loading.gif')} />
            </View>
          :
          this.props.home.posts ?
            this.props.home.posts.length == 0 ?
              <View style={{alignItems: 'center', paddingTop: 20}}>
                <Text>Bạn chưa thích chủ đề nào</Text>
              </View>
            : 
            <FlatList
              ref="list"
              onScroll= {this.props.onScroll}
              // onScrollBeginDrag={() => this.props.scrollBegin()}
              onScrollEndDrag={(e) => this.props.scrollEnd(e)}
              contentContainerStyle={{backgroundColor: 'rgb(237, 239, 241)'}}
              // ListHeaderComponent={() => this._renderHeader()}
              onEndReached={() => this.loadMore()}
              ListFooterComponent={() => this._renderFooter()}
              data={this.props.home.posts}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this._onRefresh()}
                />
              }
              removeClippedSubviews 
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.2}
              renderItem={(data) => this.renderContent(data.item, data.index)} 
            />
          : null
        }
      </View>
    )
  }
}

const styles= StyleSheet.create({
  ctAction: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16
  },
  img: {
    width: deviceWidth - 30,
    height: (deviceWidth - 30)*400/600,
    borderRadius: 2,
    resizeMode: 'cover',
    marginTop: 10
  },
  txtTitle: {
    color: 'rgb(53, 69, 164)',
    fontSize: 20,
    marginTop: 12
  },
  txtTime: {
    fontSize: 13,
    color: 'rgb(176, 184, 198)'
  },
  txtName: {
    color: '#000',
    fontWeight: '500'
  },
  ctName: {
    flex: 1,
    marginLeft: 10,
  },
  ctAvatar: {
    height: 32,
    width: 32,
    borderRadius: 4
  },
  ctItem: {
    paddingLeft: 15,
    // paddingTop: 20,
    paddingRight: 15,
    marginBottom: 8,
    backgroundColor: '#fff'
  },
  ctHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgb(237, 239, 241)',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  ctCount1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomColor: 'rgb(237, 239, 241)',
    borderBottomWidth: 1
  },


  ctSuggest: {
    paddingLeft: 15,
    paddingBottom: 30,
    paddingTop: 20,
    marginRight: 15,
    backgroundColor: 'rgb(237, 239, 241)'
  },
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
    width: 64,
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 15
  },
  txtSuggest: {
    color: 'rgb(27, 48, 70)',
  },
  ctCount: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    marginLeft: 10
  },
  txtCountDaily: {
    fontSize: 12,
    color: 'rgb(176, 184, 198)',
    marginRight: 24,
    marginLeft: 5
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeChild);