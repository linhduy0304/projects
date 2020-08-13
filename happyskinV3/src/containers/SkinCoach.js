import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  Alert
} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

import Carousel from 'react-native-snap-carousel';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

var Modal = require('react-native-modalbox');

class SkinCoach extends React.Component {
  constructor(props) {
    super()
    this.state = {
      openModal: false,
      content: 'Có bạn nào ở đay muốn gặp Hannah ở ngoài để Na hướng daxn cho cách dướng da hay không? Hannah tin rằng, bất cứ phụ nữ nào cũng có một làn da đẹp nếu chúng ta biết dưỡng da đúng cách.',
      experience: [
        {
          thumbnail: 'https://staticpro.happyskin.vn/images/content/2016/10/nhung-san-pham-cham-soc-da-ban-can-co-truoc-tuoi-30-8-630x420.jpg',
          title: 'ĐH Y Hà Nội',
          description: 'Khoa da liễu',
          date_time: '2007'
        },
        {
          thumbnail: 'https://staticpro.happyskin.vn/images/content/2016/10/nhung-san-pham-cham-soc-da-ban-can-co-truoc-tuoi-30-8-630x420.jpg',
          title: 'ĐH Y Hà Nội',
          description: 'Khoa da liễu',
          date_time: '2007'
        },
        {
          thumbnail: 'https://staticpro.happyskin.vn/images/content/2016/10/nhung-san-pham-cham-soc-da-ban-can-co-truoc-tuoi-30-8-630x420.jpg',
          title: 'ĐH Y Hà Nội',
          description: 'Khoa da liễu',
          date_time: '2007'
        },
      ],
      routine: [
        {
          thumbnail: 'https://staticpro.happyskin.vn/images/content/2016/10/nhung-san-pham-cham-soc-da-ban-can-co-truoc-tuoi-30-8-630x420.jpg',
          title: 'Liệu trình chăm sóc da với tên dài phải xuống dòng'
        },
        {
          thumbnail: 'https://staticpro.happyskin.vn/images/content/2016/10/nhung-san-pham-cham-soc-da-ban-can-co-truoc-tuoi-30-8-630x420.jpg',
          title: 'Liệu trình chăm sóc da với tên dài phải xuống dòng'
        },
        {
          thumbnail: 'https://staticpro.happyskin.vn/images/content/2016/10/nhung-san-pham-cham-soc-da-ban-can-co-truoc-tuoi-30-8-630x420.jpg',
          title: 'Liệu trình chăm sóc da với tên dài phải xuống dòng'
        }
      ]
    }
  }

  _renderItem ({item, index}) {
    return (
      <TouchableOpacity style={{marginRight: 20, width: 260, marginTop: 18}}>
        <Image style={{height: 146, width: 260, borderRadius: 4}} source={{uri: item.thumbnail}} />
        <Text style={{marginTop: 15,fontSize: 18, color: '#446eb6'}}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  render(){
    return (
      <View style={styles.container}>
          <NavBar style={{navBar: main.navBarCoach, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#ffecd7' }} >
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image  style={{height: 10, width: 16}} source={require('../images/icons/ic_back_black.png')} />
            </NavButton>
            <NavTitle style={main.navTitle}>
            </NavTitle>
            <NavButton style={main.navEmpty}  >
            </NavButton>
          </NavBar>

          <ScrollView>
            <View style={{flex: 1, paddingBottom: 15, backgroundColor: '#fff'}}>
              <View style={{flexDirection: 'row',backgroundColor: '#e1ebe6', paddingLeft: 16,borderBottomWidth: 1, borderBottomColor: '#ecf7f3', paddingBottom: 40}}>
                <View style={{flex: 1}}>
                  <View style={{position: 'absolute', top: 110}}>
                    <Button name="facebook"
                      containerStyle={{backgroundColor:"#ff7536", borderRadius: 20, paddingTop:8, paddingBottom:8, paddingRight: 15, paddingLeft: 15}}
                      style={styles.txtFollow}
                      onPress={ () => null}>
                      Follow Hannah
                    </Button>
                  </View>
                  <Text style={styles.txtUser}>Hannah Olala</Text>
                  <Text style={styles.txtInfo}>Expert in Skin Care</Text>
                </View>
                <View style={styles.containerAvatar}>
                  <Image style={styles.avatar} source={require('../images/avatar_happyskin.png')} />
                </View>
              </View>
              
              <View style={{flexDirection: 'row',backgroundColor: '#fff', paddingLeft: 16, paddingTop:14, paddingBottom: 14, borderBottomColor: '#ecf7f3', borderBottomWidth: 1}}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtCountFollow}>1672</Text>
                  <Text style={styles.txtLike}>Follower</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.txtCountFollow}>627</Text>
                  <Text style={styles.txtLike}>Subscriber</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.txtCountFollow}>2223</Text>
                  <Text style={styles.txtLike}>Like</Text>
                </View>
              </View>
              
              <View style={styles.containerTitleIntro}>
                <Text style={styles.txtTitleIntro}>Giới thiệu</Text>
              </View>
              <View style={styles.containerIntro}>
                <Text style={styles.txtIntro}>{this.state.content}</Text>
              </View>

              <View style={styles.containerExperience}>
                <Text style={styles.txtTitleExper}>Experience & Certificate</Text>
                {
                  this.state.experience.map((exper, index) => {
                    return (
                      <View style={styles.containerItemExper}>
                        <Image style={{height:64, width: 64, borderRadius: 8}} source= {{uri: exper.thumbnail}} />
                        <View style={styles.itemInfo}>
                          <Text style={{color: '#464646', fontSize: 15,}}>{exper.title}</Text>
                          <Text style={{color: '#6d6f73', fontSize: 14,}}>{exper.description}</Text>
                          <Text style={{color: '#6d6f73', fontSize: 14}}>{exper.date_time}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>

              <TouchableOpacity style={{borderBottomWidth: 1, borderBottomColor: '#e4f0ec',paddingLeft: 16, paddingTop: 9, paddingBottom: 9, flexDirection: 'row'}}>
                <Image style={{height:24, width: 24}} source={require('../images/icons/ic_fb2.png')} />
                <Text style={{fontSize: 14, color: '#474747', marginLeft: 16}}>Hannah on Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{borderBottomWidth: 1, borderBottomColor: '#e4f0ec',paddingLeft: 16, paddingTop: 9, paddingBottom: 9, flexDirection: 'row'}}>
                <Image style={{height:24, width: 24}} source={require('../images/icons/ic_instagram.png')} />
                <Text style={{fontSize: 14, color: '#474747', marginLeft: 16}}>@hannah.skinstore</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{borderBottomWidth: 1, borderBottomColor: '#e4f0ec',paddingLeft: 16, paddingTop: 9, paddingBottom: 9, flexDirection: 'row'}}>
                <Image style={{height:24, width: 24}} source={require('../images/icons/ic_youtube.png')} />
                <Text style={{fontSize: 14, color: '#474747', marginLeft: 16}}>Hannah Chanel</Text>
              </TouchableOpacity>
              
              <View style={{paddingTop: 14, paddingLeft: 16}}>
                <Text style={{fontSize: 17, color: '#333333', marginBottom: 14}}>Một số liệu trình của Hannah</Text>
                <Carousel
                  data={this.state.routine}
                  renderItem={this._renderItem}
                  sliderWidth={deviceWidth-16}
                  itemWidth={259}
                  inactiveSlideScale={1}
                  activeSlideAlignment={'start'}
                />
              </View>

              <Text style={{marginTop: 20,marginBottom: 20}}>---------------Nhận xét từ mọi người---------------------------</Text>
              <Button 
                containerStyle={{backgroundColor:"#333333", borderRadius: 4, paddingTop:10, paddingBottom:10, marginRight: 15, marginLeft: 15}}
                style={styles.txtComment}
                onPress={ () => null}>
                Viết nhận xét về Hannal
              </Button>
            </View>
          </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e1ebe6'
  },
  txtUser: {
    color: '#000',
    fontSize: 30,
    fontWeight: '500',
  },
  txtInfo: {
    color: '#444544',
    fontSize: 16,
  },

  containerAvatar: {
    borderWidth: 5,
    borderRadius: 5,
    marginRight: 16,
    borderColor: '#fff',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    borderRadius: 5,
    height:120,
    width: 90
  },
  txtFollow: {
    color: '#fff'
  },
  txtCountFollow: {
    color: '#858e98',
    fontSize: 20,
  },
  txtLike: {
    color: '#c8c7cc',
    fontSize: 12,
  },
  containerTitleIntro: {
    paddingLeft: 16,
    borderBottomColor: '#ecf7f3',
    borderBottomWidth: 1,
    paddingTop: 14,
    paddingBottom: 14,
  },
  txtTitleIntro: {
    color: '#444444',
    fontSize: 17
  },
  containerIntro: {
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 20,
    paddingRight: 16,
  },
  txtIntro: {
    color: '#333333',
    fontSize: 16,
  },
  containerExperience: {
    paddingLeft: 16,
    paddingTop: 23,
    paddingBottom: 24,
    backgroundColor: '#f6f6f6'
  },
  txtTitleExper: {
    color: '#333333',
    fontSize: 20,
  },
  containerItemExper: {
    marginTop: 21,
    flexDirection: 'row'
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
    paddingRight: 16
  },
  txtComment: {
    color: '#fff',
    fontSize: 16,
  },
});
let main = require('../styles/Main');
module.exports = SkinCoach;
// export default connect(mapStateToProps, mapDispatchToProps)(Wellcome);