import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Navigator,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableHighlight
} from "react-native";

import Button from  "react-native-button";
import {Actions} from "react-native-router-flux";
import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen'
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-57146563-2');

const window = Dimensions.get('window');
// var Orientation = require('react-native-orientation');
var DeviceInfo = require('react-native-device-info');


let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as loginActions from '../actions/loginActions';
const actions = [
  loginActions
];

function mapStateToProps(state) {
  return {
      login: state.login,
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

class Wellcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedItem: 'About',
      openMenuOffset: window.width*0.8,
      menuPosition: 'left',
      auth: ''
    };
  }

  componentWillMount() {
    // if (DeviceInfo.isTablet()) {
    //   Orientation.unlockAllOrientations();
    // } else {
    //   Orientation.lockToPortrait();
    // }
    this.props.actions.setFirstApp();
  }

  componentDidMount(){
    SplashScreen.hide();
    tracker.trackScreenView('Wellcome screen: ');
  }

  nextSlide(index) {
   this.refs.swiperSlide.scrollBy(index);
  }

  render() {
  
    return (
      <View style={styles.container}>
       <StatusBar
         backgroundColor="black"
         barStyle="default"
         hidden={true}
       />
        <Swiper
          paginationStyle={{
                    bottom: (deviceHeight*1/7)
                  }}
          pagingEnabled={true}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          loop={false}
          ref="swiperSlide"
        >
          <View style={styles.slide}>
            <ImageBackground style={styles.imgSlide} source={require('../images/slide_1.jpg')} >
              <View style={styles.logo}>
                <Image style={styles.imgLogo} source={require('../images/logo_hs_white.png')} />
              </View>
              <View style={styles.description}>
                <View style={styles.slideTitle}><Text style={styles.title}>Hiểu rõ nhu cầu da của bạn</Text></View>
                <View style={styles.slideDescription}><Text style={styles.text}>Xác định chính xác nhóm da và đưa ra liệu trình phù hợp để bạn chăm sóc da tốt hơn</Text></View>
              </View>
              <View style={styles.button}>
                <View style={{flex: 0.5}}>

                </View>
                <Button
                  containerStyle={{ flex: 0.5, backgroundColor: '#d73554', marginBottom: 15, justifyContent: "center", alignItems: "center", marginLeft: 20, marginRight: 20, borderRadius: 5, marginTop: 15}}
                  style={styles.textAction} onPress={ () => this.nextSlide(1) }>
                    Tiếp tục
                </Button>
              </View>
            </ImageBackground>
          </View>
          {/* <View style={styles.slide}>
            <ImageBackground style={styles.imgSlide} source={require('../images/slide_2.jpg')} >
              <View style={styles.logo}>
                <Image style={styles.imgLogo} source={require('../images/logo_hs_white.png')} />
              </View>
              <View style={styles.description}>
                <View style={styles.slideTitle}><Text style={styles.title}>Hội nhóm</Text></View>
                <View style={styles.slideDescription}><Text style={styles.text}>Nơi thoả sức chia sẻ niềm đam mê làm đẹp và săn những item với giá hấp dẫn từ người dùng.</Text></View>
              </View>
              <View style={styles.button}>
                <View style={{flex: 0.5}}>

                </View>
                <Button
                  containerStyle={{ flex: 0.5, backgroundColor: '#d73554', marginBottom: 15, justifyContent: "center", alignItems: "center", marginLeft: 20, marginRight: 20, borderRadius: 5, marginTop: 15}}
                  style={styles.textAction} onPress={ () => this.nextSlide(1) }>
                    Tiếp tục
                </Button>
              </View>
            </ImageBackground>
          </View> */}
          <View style={styles.slide}>
            <ImageBackground style={styles.imgSlide} source={require('../images/slide_3.jpg')} >
              <View style={styles.logo}>
                <Image style={styles.imgLogo} source={require('../images/logo_hs_white.png')} />
              </View>
              <View style={styles.description}>
                <View style={styles.slideTitle}><Text style={styles.title}>Xu hướng mới nhất</Text></View>
                <View style={styles.slideDescription}><Text style={styles.text}>Cập nhật những xu hướng, sự kiện làm đẹp mới nhất, những hoạt động hấp dẫn bạn không thể bỏ lỡ.</Text></View>
              </View>
              <View style={styles.button}>
                <View style={{flex: 0.5}}>

                </View>
                <Button
                  containerStyle={{ flex: 0.5, backgroundColor: '#d73554', marginBottom: 15, justifyContent: "center", alignItems: "center", marginLeft: 20, marginRight: 20, borderRadius: 5, marginTop: 15}}
                  style={styles.textAction} onPress={ () => this.nextSlide(1) }>
                    Tiếp tục
                </Button>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.slide}>
            <ImageBackground style={styles.imgSlide} source={require('../images/slide_4.jpg')} >
              <View style={styles.logo}>
                <Image style={styles.imgLogo} source={require('../images/logo_hs_white.png')} />
              </View>
              <View style={styles.description}>
                <View style={styles.slideTitle}><Text style={styles.title}>Review & Mua sắm mỹ phẩm</Text></View>
                <View style={styles.slideDescription}><Text style={styles.text}>Giúp bạn có cái nhìn khách quan về mỹ phẩm từ các beauty blogger, editor và người dùng.</Text></View>
                <View style={styles.slideDescription}><Text style={styles.text}>Mua sắm ngay các sản phẩm chính hãng trên Skin Store với ưu đãi hấp dẫn.</Text></View>
              </View>
              <View style={styles.button}>
                <View style={{flex: 0.5}}>

                </View>
                <Button
                  containerStyle={{ flex: 0.5, backgroundColor: '#d73554', marginBottom: 15, justifyContent: "center", alignItems: "center", marginLeft: 20, marginRight: 20, borderRadius: 5, marginTop: 15}}
                  style={styles.textAction} onPress={ () => this.nextSlide(1) }>
                    Tiếp tục
                </Button>
                
              </View>
            </ImageBackground>
          </View>
          <View style={styles.slide}>
            <ImageBackground style={styles.imgSlide} source={require('../images/slide_5.jpg')} >
              <View style={styles.logo}>
                <Image style={styles.imgLogo} source={require('../images/logo_hs_white.png')} />
              </View>
              <View style={styles.description}>
                <View style={styles.slideTitle}><Text style={styles.title}>Hỏi đáp với chuyên gia</Text></View>
                <View style={styles.slideDescription}><Text style={styles.text}>Gửi thắc mắc về da của bạn đến chuyên gia của Happy Skin để được tư vấn.</Text></View>
              </View>
              <View style={styles.button}>
                <View style={{flex: 0.5}}>

                </View>
                <Button
                  containerStyle={{ flex: 0.5, backgroundColor: '#d73554', marginBottom: 15, justifyContent: "center", alignItems: "center", marginLeft: 20, marginRight: 20, borderRadius: 5, marginTop: 15}}
                  style={styles.textAction} onPress={()=> Actions.login({type: 'reset'})}>
                    Bắt đầu
                </Button>
                
              </View>
            </ImageBackground>
          </View>
        </Swiper>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imgSlide: {
    flex: 1,
    width: deviceWidth,
    resizeMode: 'cover',
  },
  logo: {
    flex: 0.5,
    alignItems: 'center',
  },
  imgLogo: {
    width: 150,
    resizeMode: 'contain'
  },
  description: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  slideTitle: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontWeight: '400',
  },
  slideDescription: {
    paddingLeft: 32,
    paddingRight: 32
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'transparent',
    lineHeight: 20,
  },
  button: {
    flex: 0.2
  },
  textAction: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'normal',
    fontWeight: 'bold',
  },
  dotStyle: {
    backgroundColor: '#644c4c',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 10
  },
  activeDotStyle: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 10
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Wellcome);

