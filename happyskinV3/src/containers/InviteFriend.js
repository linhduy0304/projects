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
  Platform,
  Clipboard
} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Share, {ShareSheet, Button as ButtonShare} from 'react-native-share';
import Toast from 'react-native-simple-toast';

let deviceWidth = Dimensions.get('window').width;
let main = require('../styles/Main');
let shareOptions = {
  title: "Happy Skin",
  message: "Cùng tham gia vào Happy Skin!",
  url: Platform.OS === 'android' ? "https://play.google.com/store/apps/details?id=com.happyskin" : 'https://itunes.apple.com/vn/app/happy-skin/id1037578348?mt=8',
  subject: "Share Link" //  for email
};

class InviteFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    };
  }
 
  render(){
    return (
      <View style={styles.container}>
        <NavBar style={{navBar: main.navBarWhite}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff' }} >
          <NavButton onPress={() => Actions.pop()} style={main.navButton}>
            <Image style={{height: 12, width:13}} source={require('../images/icons/ic_back_blue2.png')}/>
            <Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Quay lại</Text>
          </NavButton>
        </NavBar>
        <View style={styles.content}>
          <ScrollView>
            <Text style={{fontSize: 32, color: 'rgb(215, 53, 84)', marginLeft: 15}}>Mời bạn bè tham gia</Text>
            {/* <Text style={styles.txtDes}>Khi mời bạn bè tham gia liệu trình thành công, bạn và người bạn được mời sẽ được <Text style={{fontWeight: 'bold'}}>giảm giá 10%</Text> một liệu trình bất kì.</Text> */}
            {/* <View style={styles.ctCode}>
              <Text style={styles.txtCopy}>SAO CHÉP MÃ DƯỚI ĐÂY VÀ GỬI CHO BẠN BÈ</Text>
              <View style={{flexDirection: 'row',paddingBottom: 8, marginTop: 20, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgb(228, 232, 242)'}}>
                <View>
                  <Text style={{fontSize: 12, color: 'rgb(194, 197, 208)'}}>Mã giới thiệu</Text>
                  <Text style={{fontSize: 16,marginTop: 5, color: 'rgb(41, 42, 57)'}}>2MIK7</Text>
                </View>
                <Button 
                  containerStyle={{backgroundColor:"rgb(227, 0, 82)", borderRadius: 4, justifyContent: 'center', height: 32, paddingLeft: 10, paddingRight: 10 }}
                  style={{color: '#fff', fontSize: 14}}
                  onPress={() => null}
                  >
                  Sao chép
                </Button>
              </View>
            </View> */}

            <View style={styles.ctTitle}>
              <Text style={{color: 'rgb(135, 80, 161)'}}>CHIA SẺ TRỰC TIẾP</Text>
            </View>
            <TouchableOpacity onPress={()=>{
                setTimeout(() => {
                  if(typeof shareOptions["url"] !== undefined) {
                    Clipboard.setString(shareOptions["url"]);
                    Toast.show('Nội dung đã được copy');
                  }
                },300);
                }} style={styles.ctItem}>
              <Image style={styles.icFb} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAB5lBMVEUAAAA8PDw+Pj4/Pz8/Pz8/Pz8/Pz8+Pj47OzsAAAA5OTk+Pj4/Pz8/Pz8+Pj49PT0/Pz8/Pz85OTlAQEA/Pz87Ozs+Pj4+Pj4/Pz8/Pz8/Pz8zMzNBQUE/Pz8/Pz8/Pz9AQEA7Ozs9PT0/Pz9AQEA+Pj4/Pz8+Pj4AAABAQEA/Pz87OztBQUE/Pz8+Pj4zMzNDQ0M/Pz89PT03Nzc/Pz8/Pz8/Pz8/Pz88PDw8PDwAAABCQkI7Ozs9PT0/Pz9AQEA/Pz8uLi4rKytAQEA/Pz89PT0+Pj4/Pz8/Pz8/Pz9CQkJAQEA/Pz9CQkI/Pz8/Pz8/Pz8+Pj49PT0/Pz8yMjI/Pz88PDw/Pz9BQUE8PDw/Pz9AQEA/Pz8/Pz8/Pz89PT0/Pz9CQkI9PT1EREQ9PT08PDw4ODg+Pj6AgIA/Pz8/Pz82NjZVVVU7Ozs/Pz81NTVAQEA/Pz8+Pj49PT1BQUE/Pz8/Pz8/Pz8vLy8/Pz87OztAQEA3Nzc9PT0+Pj4/Pz89PT0/Pz8/Pz89PT1AQEA9PT04ODgzMzM/Pz8/Pz9AQEA/Pz9AQEA/Pz83Nzc9PT0/Pz9AQEA/Pz8+Pj4+Pj5AQEA/Pz89PT1FRUU5OTk/Pz8/Pz8+Pj47Ozs/Pz89PT08PDw+Pj6z1Mg0AAAAonRSTlMAEXTG8/7pslICKMn//J0u2LcSLNu9Y0523KoKL9b7hggauZsEOuJ/ARS7VifkiwUX0bEq1f1p6KGQAz4NpnpY8AsGtMIyb46NbSOMcRuh+fGTFc0z1yKFKy/dpKff1CqKMoYPp+lAgAKd6kIDhdorJJExNjflktMr3nkQDoXbvaCe2d2EijIUn3JsbjDDF1jjOOdWvIDhmhoJfWrAK7bYnMgx8fGWAAACNUlEQVRIx+2W6V8SURSGBxEVeydMbVER1DCwRNTCEhMNsywqExXcUrNVU9NK2wy1fd9sMyvrP+1cmYH5eK5f5f3APef85hnuvfPeM6MoaaW1dWXKMGdasrJzrJtgc7dhQ+p2kzRry4OuHfmSbEEhUTt37d5TRGNxiRRrLwUczjKKyiuI3uuSYCv3ARa3ZyOu2k/xAT5b7aXra3xaVlsH1LPZg4cAvzM10wbgMBs+QqtsDKTyJroXGz7a7AgandECtPLXfKzFY8hCbcBxFudpP3Gy49RpQ8UXtgBnOOzZc53CU+e7Ism7uYnt5ji0p1e3pDmqzTnmAEr7GGz/AGEDg0MXaBgeERXrKIWFBQz2IvlYHbtEh/EycOUqVQLXVCDPxvGz+MPYdRGWjE/coGFyyg9M32SwM8PkydlQIim7JX6DxHpvM9g7c+SjoLESmqd9vjvDYO9NEzs1aahYY7SK+3Zm31Ddmp8jDx4qysIj2qt4O6dviH4xqvk5soj40vJjqjzh7HOf6BtPtb1SnulG6X3O6bHdqb5BejHbKtDOl+UcQ78iNuwzFKKvwx1v3npYJ+kd0BYynqz3Eu2OZvnB+IyCRVE+TD5qSmWBRuDjJzb8GWhIJq4xv36kWKoH6mr1vlFDnvRW86e9Qtd/qUrs1VeKv1VKbJjrOz3Wih8UrTpF37ArMlotFmfg58raLxrjvyXfifl/ku/TdZsiK9NfNcH+y93Ed4A1JzvLkmnOMClppbV19R+iQFSQ2tNASwAAAABJRU5ErkJggg==' }} />
              <Text style={styles.txtFb}>Sao chép link</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "facebook"
                  }));
                },300);
                }} style={styles.ctItem}>
              <Image style={styles.icFb} source={require('../images/icons/ic_share_fb.png')} />
              <Text style={styles.txtFb}>Chia sẻ trên Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "email"
                  }));
                },300);
                }} style={styles.ctItem}>
              <Image style={styles.icFb} source={require('../images/icons/ic_email.png')} />
              <Text style={styles.txtFb}>Chia sẻ trên Email</Text>
            </TouchableOpacity>
            {/* <View style={styles.ctItem}>
              <Image style={styles.icFb} source={require('../images/icons/ic_share_message.png')} />
              <Text style={styles.txtFb}>Chia sẻ qua Messenger</Text>
            </View> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtFb: {
    fontSize: 16,
    color: 'rgb(41, 42, 57)'
  },
  icFb: {
    height: 40,
    width: 40,
    marginRight: 13
  },
  ctItem: {
    padding: 8,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ctTitle: {
    backgroundColor: 'rgb(249, 249, 249)',
    padding: 12,
    paddingLeft: 15,
    marginTop: 50,
  },
  txtCopy: {
    color: 'rgb(135, 80, 161)'
  },
  ctCode: {
    backgroundColor: 'rgba(197, 172, 211, 0.1)',
    padding: 15,
    paddingTop: 36,
    paddingBottom: 50,
    marginTop: 43
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1
  },
  txtDes: {
    fontSize: 16,
    color: 'rgb(41, 42, 57)',
    marginLeft: 15,
    marginRight: 15
  },
});

module.exports = InviteFriend;