import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import {Actions} from "react-native-router-flux";
var windowSize = Dimensions.get('window');
import GoogleAnalytics from 'react-native-google-analytics-bridge';
GoogleAnalytics.setTrackerId('UA-57146563-2');
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
class SkinIntroduct extends React.Component {
  constructor() {
    super();
    this.state = {
      back: true
    }
  }

  back(){
    if(this.state.back){
      Actions.pop();
      this.setState({
        back: false
      })
      let _this = this;
      setTimeout(function(){
        _this.setState({
          back: true
        });
      }, 2000);
    }
  }
  componentDidMount(){
    GoogleAnalytics.trackScreenView('Skin Introduction: ');
  }
  
  render(){
    return (
      <View style={main.content}>
        <View style={[main.container,]}>
          <View style={{ flex: 1}}>
            <Image style={styles.background} source={require('../images/skin_info.jpg')}/>
            <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#000'}}></View>
            <NavBar style={{navBar: main.navBarBlack, statusBar: main.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#000'}} >
              <NavButton style={{marginLeft: 0, padding: 15}} onPress={() => Actions.pop()}>
                <Image style={{height: 17, width: 16}} source={require('../images/icons/ic_back_white.png')}/>
              </NavButton>
              <NavTitle style={main.navTitle}>
                <Text style={{color: '#fff'}}>
                {"Kiểm tra da"}
                </Text>
              </NavTitle>
              <NavButton>
              </NavButton>
            </NavBar>
            <View style={styles.content}>
              <View style={styles.viewContent}>
                <Text style={styles.textContent}>
                    Dài nhưng đáng! Chỉ cần làm 1 lần, bạn sẽ không bao giờ còn phải hỏi Vấn đề thực sự của da tôi? Cách xử lý triệt để? Tôi nên mua mỹ phẩm gì? Ở đâu? v.v.
                </Text>
                <Text style={styles.textContent}>
                      Bài test da lấy cảm hứng từ cuốn sách nổi tiếng của bác sĩ Leslie Baumann và nhiều tài liệu uy tín.
                </Text>
              </View>
              <View style={styles.viewButton}>
                <TouchableOpacity style={styles.btnBegin} onPress={Actions.skinTest}>
                    <Text style={styles.textButton}>
                      Bắt đầu
                    </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
  },
  navIcon: {
    width: 20,
    height: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewContent: {
    flex: 0.8,
    backgroundColor: 'rgba(249, 250, 250, 0.7)',
    margin: 25,
    padding: 25
  },
  textContent: {
    fontSize: 20,
    marginBottom: 20,
    color: '#343434'
  },
  viewButton: {
    flex: 0.2
  },
  btnBegin: {
    backgroundColor: '#D73554',
    padding: 10,
    width: 150,
    borderRadius: 4,
  },
  textButton: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  navBack: {
    height: 10, 
    width: 16,
  },
});
let main = require('../styles/Main');
module.exports = SkinIntroduct;