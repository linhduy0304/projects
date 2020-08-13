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
  Alert,
  FlatList,
  Animated,
  KeyboardAvoidingView
} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import { TextField } from 'react-native-material-textfield';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import ModalCoach from '../components/ModalCoach'
import Toast from 'react-native-simple-toast';

var DeviceInfo = require('react-native-device-info');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Modal = require('react-native-modalbox');
var RNFS = require('react-native-fs');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as skinDiaryActions from '../actions/skinDiaryActions';
const actions = [
  skinDiaryActions
];
function mapStateToProps(state) {
  return {
    skinDiary: state.skinDiary,
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

class SkinDiaryDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      note: this.props.data.description ? this.props.data.description : '',
      modalCoach: false,
      showPp: false,
      pg: ''
    }
  }

  componentWillMount() {
    // type DownloadFileOptions = {
    //   fromUrl: string;          // URL to download file from
    //   toFile: RNFS.PicturesDirectoryPath;           // Local filesystem path to save the file to
    // };
  }

  save() {
    var _this= this;
    this.setState({
      showPp: true
    }) 
    var DownloadFileOptions = {
      fromUrl: this.props.data.image_thumb+'.png',
      toFile: RNFS.ExternalStorageDirectoryPath + '/Download/' + this.props.data.id+'.png',
      progressDivider: 10,
      progress: this._progress.bind(this)
    };

    RNFS.downloadFile(DownloadFileOptions).promise.then(res => {
      if(res.statusCode == 200) {
        this.setState({
          pg: 'Lưu thành công'})
      }
      setTimeout(function(){
				_this.setState({showPp: false})
			}, 1000);
    });
  }

  _progress(res) {
    var pg = res.bytesWritten/res.contentLength*100;
    pg = pg.toString().slice(0,3)
    this.setState({pg: pg+'%'});
  }

  delete() {
    Alert.alert(
      'Thông báo',
      'Bạn chắc chắn muốn xóa ảnh này?',
      [
        {text: 'Huỷ bỏ',style: 'cancel'},
        {text: 'Xóa', onPress: () => this.props.actions.skinDiaryDelete(this.props.data.id)}
      ]
    )
  }

  render(){
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
      <View style={styles.container}>
        <View style={main.container}>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0} style={{ flex: 1 }} >
            <ScrollView 
              style={{ flex: 1,}}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
              )}
              bounces={false}>
              <View style={{flex: 1,marginTop: 45 }}>
                <View style={{height: 500, width: deviceWidth}}>
                  <Image source={{uri: this.props.data.image_thumb+'.png'}} style={styles.img} />
                  <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, left: 0}}>
                    <View style={{backgroundColor: 'rgba(215, 53, 84, 0.7)',borderTopRightRadius: 4, paddingTop: 4, paddingBottom: 4, paddingLeft: 15, paddingRight: 8}}>
                      <Text style={{fontSize: 12, color: '#fff'}}>{this.props.profile.currentUser.full_name}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                  </View>
                </View>
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                <TextField
                  label='Ghi chú'
                  autoCorrect={false}
                  onChangeText={(note) => this.setState({note: note})}
                  tintColor="#5A5E6F"
                  multiline={true}
                  textColor="#0E0E11"
                  baseColor="rgb(194, 197, 208)"
                  autoCapitalize="none"
                  value={this.state.note}
                />
                </View>
                <View style={styles.ctOption}>
                  <Text style={{color: 'rgb(135, 80, 161)'}}>TÙY CHỌN</Text>
                </View>
                {/* <TouchableOpacity onPress={() =>this.setState({modalCoach: true})} style={styles.ctAction}>
                  <Image source={require('../images/icons/ic_send.png')} style={styles.icSend}/>
                  <Text style={styles.txtSend}>Gửi tới Coach</Text>
                </TouchableOpacity> */}
                
                {
                    this.state.showPp ?
                    <View style={styles.ctAction}>
                      <Text style={{color: '#446EB6',marginLeft: 30}}>{this.state.pg}</Text>
                    </View>
                    : 
                    <TouchableOpacity onPress={() => this.save()} style={styles.ctAction}>
                      <Image source={require('../images/icons/ic_save.png')} style={{width: 22, height: 14}}/>
                      <Text style={styles.txtSend}>Lưu về máy</Text>
                    </TouchableOpacity>
                }
                {
                  this.props.skinDiary.isFetching ?
                  <View style={styles.ctAction}>
                    <Image style={{width: 30, height: 30,marginLeft: 30}} source={require('../images/rolling.gif')} />
                    <Text style={{color: 'rgb(197, 172, 211)'}}>Đang xóa</Text>
                  </View>
                :   
                  <TouchableOpacity onPress={()=> this.delete()} style={styles.ctAction}>
                    <Image source={require('../images/icons/ic_trash.png')} style={{width: 16, height: 19}}/>
                    <Text style={styles.txtSend}>Xóa ảnh này</Text>
                  </TouchableOpacity>
                }
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff' }} >
              <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
                <View>
                  <Text style={main.txtBack}>Skin Diary</Text>
                </View>
              </NavButton>
            </NavBar>
          </Animated.View>
        </View>
        <Modal 
          style={styles.modalCoach}
          isOpen={this.state.modalCoach}
          swipeToClose={true}
          position="top"
          entry="bottom"
          animationDuration={200}
          backdropColor="#000"
          onClosed={()=> this.setState({modalCoach: false}) }>
          <ModalCoach closeModal={() => this.setState({modalCoach: false})} id={this.props.data.id}/>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalCoach: {
    height: deviceHeight/2,
    width: deviceWidth -30,
    backgroundColor: '#fff',
    marginTop: deviceHeight/4
  },
  txtSend: {
    color: 'rgb(41, 42, 57)',
    fontSize: 16,
    marginLeft: 20,
  },
  icSend: {
    width: 22,
    height: 22
  },
  ctAction: {
    marginLeft: 15,
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'rgb(236, 238, 240)',
    borderBottomWidth: 1,
  },
  ctOption: {
    backgroundColor: 'rgb(249, 249, 249)',
    borderColor: 'rgb(236, 238, 240)',
    borderWidth: 1,
    padding: 15,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 
  img: {
    height: 500, 
    width: deviceWidth,
  },
});
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(SkinDiaryDetail);
