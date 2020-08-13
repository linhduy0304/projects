import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Animated
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../../components/ScrollableTabBar';
import MyFeed from './MyFeed';
import FriendFeed from './FriendFeed';
import NoInternet from '../../components/NoInternet'
import RNFirebase from 'react-native-firebase';

let css = require('../../Css');

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  componentWillMount() {
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("Acivity_Screen");
  }

  renderItem(item, index) {
    if(item.type == 'comment') {
      return (
        <View style={{flexDirection: 'row'}} key={index}>
          <Image style={{height: 50, width: 50, borderRadius: 4}} source={{uri: item.avatar+'.png'}} />
          <View style={{marginLeft: 15, flex: 1}}>
            <Text style={{color: 'rgba(0, 0, 0, 0.7)'}}><Text style={{fontWeight: 'bold'}}>{item.full_name}</Text> vừa bình luận vào bài <Text style={{fontWeight: 'bold'}}>{item.post}</Text></Text>
            <Text style={{fontStyle: 'italic'}} numberOfLines={2} >{item.content}</Text>
          </View>
        </View>
      )
    }else {
      return(
        <View style={{flexDirection: 'row'}} key={index}>
          <Image style={{height: 50, width: 50, borderRadius: 4}} source={{uri: item.avatar+'.png'}} />
          <View style={{marginLeft: 15, flex: 1}}>
            <Text style={{color: 'rgba(0, 0, 0, 0.7)'}}><Text style={{fontWeight: 'bold'}}>{item.full_name}</Text> vừa pick bài <Text style={{fontWeight: 'bold'}}>{item.post}</Text></Text>
          </View>
        </View>
      )
    }
  }

  onScroll(e) {
    // console.log(e.nativeEvent.contentOffset.y)
    const currentOffset = e.nativeEvent.contentOffset.y
    if(currentOffset > this.state.yEnd ) {
      Animated.spring(
        this.state.scrollY,
        {
          toValue: -44,
          duration: 500,
        }
      ).start();
    }
    if(currentOffset < this.state.yEnd){
      Animated.spring(
        this.state.scrollY,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
    }
    // this._listViewOffset = currentOffset
  }


  render() {
    const marginTop = this.state.scrollY
    return (
      <Animated.View style={[css.container, {marginTop: marginTop}]}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <View style={{marginLeft: 15}}>
              <Text style={css.txtTitle}>Hoạt động</Text>
            </View>
          </NavGroup>
        </NavBar>

        <NoInternet />

        <View style={{flex: 1}}>
          <ScrollableTabView  renderTabBar={() => <ScrollableTabBar />}
            initialPage={0}
            tabBarBackgroundColor='white'
            tabBarInactiveTextColor='rgba(0, 0, 0, 0.7)'
            // tabBarActiveTextColor='rgb(51, 51, 51)'
            tabBarActiveTextColor='rgb(0, 139, 125)'
            prerenderingSiblingsNumber={0}
            tabBarTextStyle={{fontSize: 14}}
            scrollWithoutAnimation={true}
            >
            <MyFeed 
              onScroll={(e) => this.onScroll(e)}
              // scrollBegin={() => this.setState({scrollEnd: null})}
              scrollEnd={(e) => this.setState({yEnd: e.nativeEvent.contentOffset.y})}
              tabLabel="CỦA BẠN" />
            <FriendFeed 
              onScroll={(e) => this.onScroll(e)}
              // scrollBegin={() => this.setState({scrollEnd: null})}
              scrollEnd={(e) => this.setState({yEnd: e.nativeEvent.contentOffset.y})}
              tabLabel="NGƯỜI BẠN PICK" />
          </ScrollableTabView>
        </View>
      </Animated.View>
    )
  }
}

const styles= StyleSheet.create({

  txtPick: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(0, 139, 125)'
  },
  ic_follow: {
    marginRight: 6
  },
});
export default (Activity);