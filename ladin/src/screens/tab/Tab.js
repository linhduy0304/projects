

import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home';
import Profile from './Profile';
import Cart from './Cart';
import Notify from './Notify';
import Store from '../../services/Store';
import SplashScreen from 'react-native-splash-screen';
import realm , { showAll, insert } from "../../database/allSchema";
import RNFirebase from 'react-native-firebase';

const Const = require('../../services/Const');

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: this.props.tab.tab,
      isLogin: null,
      countCart: 0,
    };
    realm.addListener('change', () => {
      this.loadAll()
    })
  }

  componentWillMount = () => {
    RNFirebase.messaging().subscribeToTopic('aladin_public');
    new Store().getSession(Const.IS_LOGIN).then(isLogin => {
      this.setState({isLogin})
      this.loadAll()
      this.props.setLogin(isLogin)
      if(isLogin) {
        this.props.getCountNoti()
        const {updateRequest, isLogin} = this.props.auth
        if(updateRequest) {
          switch(updateRequest.type) {
            case 'addCart':
              Actions.productDetail({id: updateRequest.provider.product[0].product_id});
              this.props.updateRequest(null)
              return;
            case 'contact':
              Actions.contact();
              this.props.updateRequest(null);
              return;
            case 'sendQA':
              Actions.productDetail({id: updateRequest.id});
              this.props.updateRequest(null);
              return;
            case 'buyNow':
              insert(updateRequest.data).then(
                this.props.setTab('cart')
              ).catch(error => console.log(error))
              // this.props.createOder(updateRequest.data, updateRequest.price, updateRequest.weight)
              this.props.updateRequest(null);
              return;
            default:
              return;
          }
        }
      }
    })
  };

  componentDidMount = () => {
    SplashScreen.hide();
    
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.tab.tab && nextProps.tab.tab != this.props.tab.tab) {
      this.setState({tab: nextProps.tab.tab})
    }
  };
  

  componentWillUnmount() {
    this.props.updateRequest(null);
  }
  
  loadAll() {
    var countCart = 0;
    showAll().then(data => {
      for(let i = 0; i < data.length; i++) {
        length = data[i].product.length;
        countCart = countCart + length;
        this.setState({countCart})
      }
      this.setState({countCart})
    }).catch(error => {
      console.log(error)
    })
  }

  direct(tab) {
    if(this.state.isLogin) {
      this.props.setTab(tab)
      // this.setState({tab})
    }else {
      Actions.login()
    }
  }

  renderCountNoti() {
    if(this.props.auth.isLogin) {
      if(this.props.notify.countNoti < 1) {
        return null
      }else {
        return (
          <View style={{width: 20, marginTop: 2, height: 20,backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{color: '#e3004b', fontSize: 12}}>{this.props.notify.countNoti > 9 ? '9+' : this.props.notify.countNoti}</Text>
          </View>
        )
      }
    }else return null
  }

  renderCountCart() {
    if(this.props.auth.isLogin) {
      if(this.state.countCart == 0) {
        return null
      }else {
        return (
          <View style={{width: 20, marginTop: 2,height: 20,backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{color: '#e3004b', fontSize: 12}}>{this.state.countCart > 9 ? '9+' : this.state.countCart}</Text>
          </View>
        )
      }
    }else return null
  }
  
  render() {
    return (
      <TabNavigator 
        tabBarStyle={{backgroundColor: '#e3004b'}}
      >
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'home'}
          title="Trang chủ"
          titleStyle={styles.title}
          selectedTitleStyle={styles.titleActive}
          renderIcon={() => <Image style={styles.icon} source={require('../../icons/ic_home.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('../../icons/ic_home_active.png')} />}
          onPress={() => this.props.setTab('home')}>
          <Home/>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'cart'}
          title="Giỏ hàng"
          titleStyle={styles.title}
          renderBadge={() => this.renderCountCart()}
          selectedTitleStyle={styles.titleActive}
          renderIcon={() => <Image style={styles.icon} source={require('../../icons/ic_cart.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('../../icons/ic_cart_active.png')} />}
          onPress={() => this.direct('cart')}>
          <Cart/>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'noti'}
          title="Thông báo"
          titleStyle={styles.title}
          selectedTitleStyle={styles.titleActive}
          renderBadge={() => this.renderCountNoti()}
          renderIcon={() => <Image style={styles.icon} source={require('../../icons/ic_noti.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('../../icons/ic_noti_active.png')} />}
          onPress={() => this.direct('noti')}>
          <Notify/>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'profile'}
          title="Cá nhân"
          titleStyle={styles.title}
          selectedTitleStyle={styles.titleActive}
          renderIcon={() => <Image style={styles.icon} source={require('../../icons/ic_profile.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('../../icons/ic_profile_active.png')} />}
          onPress={() => this.direct('profile')}>
          <Profile/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  ctItem: {
    alignItems: 'center',
     justifyContent: 'center'
  },
  title: {
    color: '#f4b8c4'
  },
  titleActive: {
    color: '#fff'
  },
  icon: {
    height: 20,
    width: 20
  },
})

import {connect} from 'react-redux';
import {setArrNoti, getCountNoti} from '../../actions/notify';
import {createOder} from '../../actions/cart';
import {setTab} from '../../actions/tab';
import {setLogin, updateRequest, } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    notify: state.notify,
    auth: state.auth,
    tab: state.tab
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createOder: (body, totalPrice, totalWeight) => dispatch(createOder(body, totalPrice, totalWeight)),
    setArrNoti: (arr) => dispatch(setArrNoti(arr)),
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
    updateRequest: (data) => dispatch(updateRequest(data)),
    setTab: (data) => dispatch(setTab(data)),
    getCountNoti: () => dispatch(getCountNoti()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tab);
