import React from 'react';
import { 
  AppRegistry,
  StyleSheet,
  View,
  Text,
  InteractionManager,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Animated
} from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";

let theme = require('../styles/Theme');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let main = require('../styles/Main');
let window = Dimensions.get('window');
var Spinner = require('react-native-spinkit');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as moreActions from '../actions/moreActions';
const actions = [
  moreActions
];
function mapStateToProps(state) {
  return {
    more: state.more
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

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      isRefreshing: false,
      page: 1,
    };
  }

  componentWillMount() {
    this.props.actions.notificationRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.notification();
    })
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.notification();
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.more.loadMore) {
        return;
    }
    this.props.actions.notification('LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  _renderFooter() {
    if(this.props.more.loadMore) {
      return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 10, width: 10}} source={require('../images/load_more.gif')} />
          <Text style={{color: 'rgb(197, 172, 211)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>
      )
    }
    if (this.props.more.notifications.length == 0 ) {
      return (
        <View style = {main.footer}>
          <Text>Bạn chưa có thông báo nào.</Text>
        </View>
      )
    }else return null;
  }

  _renderHeader() {
    return (
      <View>
        <Text style={main.txtTitle}>Thông báo</Text>
      </View>
    )
  }

  onScroll(event) {
    if(event.nativeEvent.contentOffset.y > 0) {
      this.state.scrollY.setValue(e.nativeEvent.contentOffset.y);
    }
  }

  detailNoti(id, type) {
    switch(type){
      case 'product':
        Actions.exploreReview({id : id})
        return;
      case 'posts':
        Actions.exploreDetail({id: id, typePost: 'post'})
        return;
      case 'video':
        // Actions.videoDetail({id: id})
        return;
      case 'category':
        Actions.magazine({id: id, typePost: 'post'})
        return;
      case 'skintest':
        Actions.skinTest()
        return;
      default:
        return null;
    }
  }

  render() {
    const headerHeight = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [150, 75],
      extrapolate: 'clamp',
    });
    const navTranslate = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [0, -75],
      extrapolate: 'clamp',
    });
    const navOpacity = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={main.container}>
          <View style={{flex: 1}}>
            <FlatList 
              contentContainerStyle={{paddingTop: 44}}
              data={this.props.more.notifications}
              ListHeaderComponent={() => this._renderHeader()}
              ListFooterComponent={() => this._renderFooter()}
              onEndReached={() => this.loadMore()}
              onEndReachedThreshold={0.2}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this._onRefresh()}
                />
              }
                onScroll={(e) => this.state.scrollY.setValue(e.nativeEvent.contentOffset.y > 0 ? e.nativeEvent.contentOffset.y : 0)}
                scrollsToTop={false}
                renderItem={(data) => (
                  <View>
                    { (data.item.type == 'notificationApp') ?
                      <TouchableOpacity onPress= {() => this.detailNoti(data.item.objects.id, data.item.objects.type)} style={styles.container}>
                        <TouchableOpacity style={styles.viewAvatar} >
                        <Image source={require('../images/avatar_happyskin.png')} style = {styles.avatar}/>
                        </TouchableOpacity>
                        <View style={styles.content} >
                          <Text style={styles.fullContent} numberOfLines={3}>
                            <Text style={styles.user}>{data.item.objects.content ? data.item.objects.content : ''}</Text>
                          </Text>
                        </View>
                        <View style={styles.action}>
                          {
                            data.index < this.props.notification ? <View style={styles.noRead}></View> : null
                          }
                        </View>
                      </TouchableOpacity>
                    :
                      <TouchableOpacity onPress= {() => this.detailNoti(data.item.objects.id, data.item.objects.type)} style={styles.container}>
                        <TouchableOpacity style={styles.viewAvatar} >
                          <Image source={data.item.user_from.avatar != '' ? { uri: data.item.user_from.avatar+'_100x100.png' } : require('../images/avatar.png') } style={styles.avatar} onError={(e) => {this.setState({ isErrorAvatar: true}) } }/>
                        </TouchableOpacity>
                        <View style={styles.content} >
                          <Text style={styles.fullContent} numberOfLines={3}>
                            <Text style={styles.user}>{data.item.user_from.full_name ? data.item.user_from.full_name : data.item.user_from.username} </Text>
                            <Text style={styles.textContent}>{data.item.objects.content+' '}</Text> <Text style={styles.user}>{data.item.objects.group_name ? data.item.objects.group_name : data.item.objects.object_name}</Text>
                          </Text>
                        </View>
                        <View style={styles.action}>
                          {
                            data.index < this.props.notification ? <View style={styles.noRead}></View> : null
                          }
                        </View>
                      </TouchableOpacity>
                    }
                    
                  </View>
              )}
            />
            
          </View>
          {
          this.props.more.isFetching ?
            <View style={main.mainSpin1}>
              <Image style={main.imgLoading} source={require('../images/rolling.gif')} />
            </View>
            : null
          }
          <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
              <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
                <View>
                  <Text style={main.txtBack}>Quay lại</Text>
                </View>
              </NavButton>
            </NavBar>
          </Animated.View>
          {
          this.props.more.isFetching ?
            <View style={main.mainSpin1}>
              <Image style={main.imgLoading} source={require('../images/rolling.gif')} />
            </View>
            : null
          }
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#c0c0c0',
    flexDirection: 'row',
    alignItems: 'center'
  },
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
  },
  backgroundBlack: {
    backgroundColor: '#f7f7f7',
  },
  viewAvatar: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  content: {
    flex: 1,
    paddingRight: 10
  },
  action: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullContent: {
    color: '#cccccc'
  },
  user: {
    color: '#4a4a4a',
    fontWeight: '400'
  },
  object: {
    color: 'red'
  },
  noRead: {
     backgroundColor: 'red',
     width: 5,
    height: 5,
    borderRadius: 5
  },
  textContent: {
    color: '#9ca4ab'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
