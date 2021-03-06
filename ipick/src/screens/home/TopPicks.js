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
import UserSuggest from './UserSuggest';
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
    home: state.home,
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

class TopPicks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      is_like: 1,
      isRefreshing: false,
      page: 1,
    }
  }

  componentWillMount() {
    this.props.actions.topPicksRequest();
  }

  componentDidMount() {
    // timeout = setTimeout( () => {
    // }, 1000);
    // InteractionManager.runAfterInteractions(()=> {
      this.props.actions.topPicks();
    // })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tab.home && nextProps.home.topPicks && nextProps.home.topPicks.length !== 0) {
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
    this.props.actions.topPicks('RF');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.home.loadMore) {
        return;
    }
    this.props.actions.topPicks('LM', this.state.page + 1);
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

  _renderItemDaily ({item, index}) {
    return (
      <View style={{marginTop: 15,borderRadius: 2, marginRight: 15, width:deviceWidth - 135, backgroundColor: '#fff'}}>
        <TouchableOpacity onPress={() => Actions.postDetail({slug: item.slug})}>
          <Image style={{height: (deviceWidth - 120)*400/600, width:deviceWidth - 120,marginRight: 8, borderTopLeftRadius: 2, borderTopRightRadius: 2}} source={{uri: item.image_thumb+'_600x400.png'}} />
        </TouchableOpacity>
        <Text onPress={() => Actions.postDetail({slug: item.slug})} numberOfLines={2} style={{fontSize: 18, color: 'rgb(53, 69, 164)', marginLeft: 10, marginRight: 10, marginTop: 7}}>{item.title}</Text>
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

  renderContent(data, index) {
    switch(index) {
      case 4:
        return (
          <View>
            <PostItem data={data} />
            {
              this.props.home.starPicks ?
                <View style={styles.ctSuggest}>
                  <Text style={styles.txtSuggest}>PICK NHIỀU</Text>
                    <Carousel
                      data={this.props.home.starPicks}
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
              this.props.home.starPickers ?
                <View style={styles.ctSuggest}>
                  <Text style={styles.txtSuggest}>STAR PICKERS</Text>
                  <Carousel
                    data={this.props.home.starPickers}
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
      case 14:
        return (
          <View>
            
            {
              this.props.home.starPickers ?
                <View style={styles.ctSuggest}>
                  <Text style={styles.txtSuggest}>TOP PICKERS</Text>
                  <Carousel
                    data={this.props.home.topPickers}
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
            <PostItem data={data} />
          </View>
        );

      default: 
        return (<PostItem data={data} />)
    } 
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
          this.props.home.topPicks ?
          <FlatList
            ref="list"
            contentContainerStyle={{backgroundColor: 'rgb(237, 239, 241)'}}
            // ListHeaderComponent={() => this._renderHeader()}
            onScroll= {this.props.onScroll}
            // onScrollBeginDrag={() => this.props.scrollBegin()}
            onScrollEndDrag={(e) => this.props.scrollEnd(e)}
            onEndReached={() => this.loadMore()}
            ListFooterComponent={() => this._renderFooter()}
            data={this.props.home.topPicks}
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
    height: 190,
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
    color: '#000'
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
export default connect(mapStateToProps, mapDispatchToProps)(TopPicks);