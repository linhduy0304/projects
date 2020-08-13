import React, { Component, PureComponent } from 'react';
import { 
  View, 
  Text,
  Image,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  RefreshControl
} from 'react-native';

import RNFirebase from 'react-native-firebase';
import Nav from '../../components/home/Nav';
import Slide from '../../components/home/Slide';
import Categories from '../../components/home/Categories';
import ProductHot from '../../components/home/ProductHot';
import ProductNew from '../../components/home/ProductNew';
import Brand from '../../components/home/Brand';
import Provider from '../../components/home/Provider';
import MadeBy from '../../components/home/MadeBy';
import Banner from '../../components/home/Banner';

const Css = require('../../config/css');

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  async requestCameraPermission(image) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Cho phép truy cập thư viện ảnh',
          'message': 'Cho phép truy cập thư viện ảnh'
        }
      )
    } catch (err) {
      console.warn(err)
    }
  }

  componentWillMount = () => {
    this.props.homeDetail('categories')
    this.props.homeDetail('providers')
    if(Platform.OS == 'android') {
      this.requestCameraPermission()
    }
  };
  

  componentDidMount() {
    RNFirebase.notifications().getInitialNotification().then(closed => {
      if(closed) {
        Actions.tab({type: 'reset'})
        this.props.setTab('noti')
        return
      }
    })

    //when opening app
    RNFirebase.notifications().onNotification((notification) => {
      if(notification) {
        SimpleToast.show(notification.data.title)
        // alert(notification)
        // Alert.alert(
        //   'Thông báo từ Aladin',
        //   notification.data.title,
        //   [
        //     { text: 'OK', onPress: () => { } }
        //   ]
        // );
        return
      }
    });

    //when close but not kill app
    RNFirebase.notifications().onNotificationOpened((notification) => {
      if(notification) {
        Actions.tab({type: 'reset'})
        this.props.setTab('noti')
        return
      }
    });
  }

  direct() {
    if(this.props.auth.isLogin) {
      Actions.contact();
    }else {
      var request = {
        type: 'contact',
      }
      this.props.updateRequest(request)
      Actions.login()
    }
  }

  onRefresh = () => {
    this.setState({refreshing: true})
    this.props.getHome('categories');
    this.props.getHome('providers');
    this.props.getHome('madeBy');
    this.props.getHome('hot');
    this.props.getHome('listNew');
    this.props.getHome('listOld');
    this.props.getHome('listSale');
    this.setState({refreshing: false})
  }

  render() {
    return (
      <View style={Css.container}>
        <Nav />
        <ScrollView
          refreshControl={
            <RefreshControl
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.refreshing}
            />
        }
        >
          <Slide data={this.props.home.slides ? this.props.home.slides : [] }/>
          <Banner/>
          <Categories/>
          <TouchableOpacity onPress={() => this.direct()} style={{marginTop: 10}}>
            <Image style={{width: screen.width, height: screen.width*128/750}} source={require('../../icons/logo_contact.png')} />
          </TouchableOpacity>
          <Provider />
          <MadeBy />
          <ProductHot/>
          <ProductNew/>
          <ProductOld/>
          <Brand/>
          {/* {
            brand.map((item, index) => {
              return <Brand data={item} key={index}/>
            })
          } */}
        </ScrollView>
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {getHome, getProvider, homeDetail} from '../../actions/home';
import {updateRequest} from '../../actions/auth';
import {setTab} from '../../actions/tab';
import { Actions } from 'react-native-router-flux';
import { screen } from '../../config/Constant';
import SimpleToast from 'react-native-simple-toast';
import ProductOld from '../../components/home/ProductOld';

const mapStateToProps = (state) => {
  return {
    home: state.home,
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getHome: (action) => dispatch(getHome(action)),
    homeDetail: (action) => dispatch(homeDetail(action)),
    getProvider: (action) => dispatch(getProvider(action)),
    updateRequest: (data) => dispatch(updateRequest(data)),
    setTab: (data) => dispatch(setTab(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
