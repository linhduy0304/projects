/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import Carousel from 'react-native-snap-carousel';
import Constant from '../services/Constant';

const StoreService = require('../services/StoreService').default;

let deviceWidth = Dimensions.get('window').width;
let css = require('../Css');

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      slide: [
        {
          title: 'Nội dung chọn lọc',
          content: 'IPICK giúp bạn dễ dàng tiếp cận những thông tin, hình ảnh, video... đáng hấp thụ và đáng tin cậy nhất từ nhiều nguồn.',
          image_thumb: require('../images/intro1.png'),
        },
        {
          title: 'Chính bạn "PICK" nên độ nóng của mỗi nội dung',
          content: 'Bằng cách bấm "PICK" cho mỗi bài, bạn mang nội dung có ý nghĩa "về nhà" và giúp nội dung ấy trở nên nổi bật.',
          image_thumb: require('../images/intro2.png'),
        },
        {
          title: 'Kết nối, tạo giá trị cùng nhiều thành viên khác ',
          content: 'Bạn chủ động đóng góp nội dung, đồng thời có rất nhiều PICKERS - những người đem đến nội dung tốt, đáng để bạn kết nối, tương tác ngay lập tức.',
          image_thumb: require('../images/intro3.png'),
        },
      ]
    }
  }

  _renderItem ({item, index}) {
    return (
      <View style={{alignItems: 'center',marginTop: 15, width:deviceWidth - 100}}>
        <Image style={{width: deviceWidth - 100, height: (deviceWidth-100)*450/650, borderRadius: 10}} source={item.image_thumb} />
        <Text style={{marginTop: 20, fontSize: 20, textAlign: 'center', color: 'rgb(31, 42, 53)', maxWidth: deviceWidth-150}}>{item.title}</Text>
        <Text style={{fontSize: 16, color: 'rgb(78, 83, 93)', marginTop: 10, textAlign: 'center'}}>{item.content}</Text>
      </View>
    )
  }

  changeIndex = (currentIndex) => {
    this.setState({
      currentIndex: currentIndex
    })
  }

  start() {
    new StoreService().storeSession(Constant.IP_IS_FIRST, true);
    Actions.login({type: 'reset'});
  }

  render() {
    return (
      <View style={[styles.container]}>
        <ScrollView style={{flex: 1}}>
          <View style={{alignItems: 'center', paddingBottom: 20}}>
            <Image source={require('../images/logo_home.png')} style={styles.logo}/>
            <Carousel
              ref={'carousel'}
              data={this.state.slide}
              onSnapToItem={this.changeIndex}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={deviceWidth}
              itemWidth={deviceWidth-100}
              inactiveSlideScale={0.7}
              inactiveSlideOpacity={0.5}
            />
            {
              this.state.currentIndex == 2 ?
                <Button 
                  containerStyle={styles.btnRegister}
                  style={styles.txtRegister}
                  onPress={() => this.start()}
                  >
                  Bắt đầu
                </Button>
              :
                <TouchableOpacity onPress={() => { this.refs.carousel.snapToNext()}} style={styles.ctGo}>
                  <Text style={styles.txtGo}>Tiếp tục</Text>
                  <Image source={require('../images/icons/ic_arrow_next.png')} />
                </TouchableOpacity>
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#fff',
  },
  txtRegister: {
    color: '#fff',
    fontSize: 16,
  },
  btnRegister: {
    marginTop: 20,
    height: 48,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor:"rgb(0, 139, 125)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  ctGo: {
    flexDirection: 'row', 
    padding: 5, 
    alignItems: 'center',
    marginTop: 20
  },
  txtGo: {
    fontSize: 16,
    color: 'rgb(0, 139, 125)',
    fontWeight: 'bold',
    marginRight: 12
  },
  logo: {
    marginTop: 15
  },
 
});
export default (Welcome);


