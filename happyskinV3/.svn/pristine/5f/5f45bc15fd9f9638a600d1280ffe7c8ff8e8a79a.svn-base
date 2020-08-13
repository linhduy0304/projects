import React from 'react';
import { 
  AppRegistry,
  StyleSheet,
  View,
  Text,
  InteractionManager,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Animated,
  Linking
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
    more: state.more,
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

class SPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      isRefreshing: false,
      page: 1,
    };
  }

  componentWillMount() {
    this.props.actions.spointRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.spoint(this.props.profile.currentUser.id);
    })
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.spoint(this.props.profile.currentUser.id);
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.more.loadMore) {
        return;
    }
    this.props.actions.spoint(this.props.profile.currentUser.id, 'LM', this.state.page + 1);
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

  // _renderHeader() {
  //   return (
  //     <View>
  //       <Text style={main.txtTitle}>Thông báo</Text>
  //     </View>
  //   )
  // }

  _renderHeader() {
    return (
      <View>
        <View style={styles.ctHeader}>
          <Text style={{fontSize: 32, color: 'rgb(215, 53, 84)'}}>S·Point</Text>
          <Text style={{color: 'rgb(31, 32, 39)', marginTop: 19}}>Số S·Point bạn đang có</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{color: 'rgb(254, 117, 53)', fontSize: 32, marginTop: 5, fontWeight: 'bold'}}>{this.props.spoint}</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.skinstore.vn/rewards')} style={styles.ctGift}>
              <Image style={{height: 20, width: 20}} source={require('../images/icons/ic_buy.png')}/>
              <Text style={styles.txtGift}>Đổi quà</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.txtDes, {marginTop: 16}]}>Bạn có thể dùng S-Point để đổi các quà tặng hấp dẫn tại <Text onPress={() => Linking.openURL('https://www.skinstore.vn/')} style={{color: '#4285f4'}}>skinstore.vn</Text></Text>
        </View>
        <View style={styles.ctPayment}>
          {/* <View style={styles.ctIcon}>
            <Image style={{width: 22, height: 16}} source={require('../images/icons/ic_payment_white.png')} />
          </View>
          <Text style={{flex: 1,marginLeft: 15, color: 'rgb(51, 51, 51)', fontSize: 17}}>Phương thức thanh toán</Text>
          <Image style={{width: 6, height: 10}} source={require('../images/icons/ic_next_blue.png')} /> */}
        </View>
        <View style={styles.ctHeaderHistory}>
          <Text style={{color: 'rgb(135, 80, 161)'}}>LỊCH SỬ TÍCH ĐIỂM</Text>
        </View>
      </View>
    )
  }

  renderBox(action) {
    switch(action) {
      case 'add':
        return (
          <View style={styles.ctBox}>
            <Text style={styles.txtBonus}>Điểm thưởng</Text>
          </View>
        );
      default:
        return (
          <View style={[styles.ctBox, {backgroundColor: 'rgb(243, 174, 193)'}]}>
             <Text style={styles.txtBonus}>Đổi quà</Text>
          </View>
        )

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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={main.container}>
            {
              this.props.more.isFetching
              ?
              <View style={main.mainSpin1}>
                <Image style={main.imgLoading} source={require('../images/rolling.gif')} />
              </View>
              :
              <FlatList
                ListHeaderComponent={() => this._renderHeader()}
                data={this.props.more.spoint}
                onEndReached={() => this.loadMore()}
                onEndReachedThreshold={0.2}
                refreshControl={
                  <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={() => this._onRefresh()}
                  />
                }
                renderItem={(data) => this.props.more.isFetching ? <Text></Text> : (
                  <View style={styles.ctItemHis}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      {
                        data.item.action == 'add' ?
                          <Text style={styles.txtAdd}>+{data.item.point} S·Point</Text>
                        :
                          <Text style={styles.txtSub}>-{data.item.point} S·Point</Text>
                      }
                      {this.renderBox(data.item.action)}
                    </View>
                    <Text style={{marginTop: 16, color: 'rgb(51, 51, 51)'}}>{data.item.title}</Text>
                    <Text style={{fontSize: 13,marginTop: 2, color: 'rgb(133, 142, 152)'}}>{data.item.created_at}</Text>
                  </View>
                )}
              />
            }
            <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
              <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff' }} >
                <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                  <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
                  <Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Quay lại</Text>
                </NavButton>
              </NavBar>
            </Animated.View>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  txtGift: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5
  },
  ctGift: {
    flexDirection: 'row',
    backgroundColor: 'rgba(233, 69, 122, 0.8)',
    // padding: 3,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    marginRight: 15
  },
  txtBonus: {
    color: '#fff'
  },
  ctBox: {
    backgroundColor: 'rgb(255, 183, 101)',
    borderRadius: 16,
    padding: 8,
    paddingBottom: 4,
    paddingTop: 4,
    marginRight: 15
  },
  ctItemHis: {
    paddingTop: 15,
    paddingBottom: 11,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 238, 240)'
  },
  txtAdd: {
    color: 'rgb(215, 53, 84)',
    fontSize: 16,
    fontWeight: '500'
  },
  txtSub: {
    color: 'rgb(135, 155, 206)',
    fontSize: 16
  },
  ctHistory: {
    borderTopColor: 'rgb(243, 174, 193)',
    borderTopWidth: 4,
  },
  ctHeaderHistory: {
    marginLeft: 15,
    height: 40,
    justifyContent: 'center', 
    borderBottomColor: 'rgb(236, 238, 240)', 
    borderBottomWidth: 1
  },
  
  ctPayment: {
    borderBottomColor: 'rgb(243, 174, 193)',
    borderBottomWidth: 4,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgb(236, 238, 240)',
    marginTop: 34,
    // height: 56,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  ctIcon: {
    backgroundColor: 'rgb(197, 172, 211)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ctHeader: {
    paddingLeft: 15,
    marginTop: 45
  },
  txtDes: {
    color: 'rgb(133, 142, 152)'
  },
  
});

export default connect(mapStateToProps, mapDispatchToProps)(SPoint);
