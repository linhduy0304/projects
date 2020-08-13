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
import BoxReview from '../components/magazine/BoxReview'
import BoxFeed from '../components/BoxFeed'
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

class PostLiked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      page: 1,
    };
  }

  componentWillMount() {
    this.props.actions.postLikedRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.postLiked(this.props.redirect);
    })
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.postLiked(this.props.redirect);
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.more.loadMore) {
        return;
    }
    this.props.actions.postLiked(this.props.redirect, 'LM', this.state.page + 1);
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
    if (this.props.more.postLiked.length == 0 ) {
      return (
        <View style = {main.footer}>
          <Text>{this.props.redirect == 'post' ? 'Bạn chưa có bài viết yêu thích nào.' : 'Bạn chưa có sản phẩm yêu thích nào.'}</Text>
        </View>
      )
    }else return null;
  }
  _renderHeader() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={main.txtTitle}>Bài viết yêu thích</Text>
        <Text style={main.count}>{this.props.count}</Text>
      </View>
    )
  }

  renderBox() {
    switch(this.props.redirect) {
      case 'post':
        return (
          <FlatList 
            data={this.props.more.postLiked}
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
            renderItem={(data) => <BoxFeed key={data.index} data = {data.item}/>}
          />
        );
      case 'product':
        return (
          <FlatList 
            data={this.props.more.postLiked}
            ListFooterComponent={() => this._renderFooter()}
            onEndReached={() => this.loadMore()}
            onEndReachedThreshold={0.2}
            refreshControl={
              <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => this._onRefresh()}
              />
            }
            renderItem={(data) => <BoxReview data={data.item}/> }
          />
        );
    }
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={main.container}>
          <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
              <View>
                <Text style={main.txtBack}>Quay lại</Text>
              </View>
            </NavButton>
          </NavBar>
          <View style={{flex: 1}}>
            {
              this.props.more.isFetching ?
                <View style={main.mainSpin1}>
                  <Image style={main.imgLoading} source={require('../images/rolling.gif')} />
                </View>
              :
                this.renderBox()
            }
            
          </View>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
 content: {
  flex: 1,
  backgroundColor: '#FFFFFF'
 }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostLiked);
