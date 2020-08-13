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
  Keyboard,
  Linking,
  InteractionManager,
  KeyboardAvoidingView
} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import Web from 'react-native-webview2';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import BoxAction from '../components/explore/BoxAction';
import BoxAction1 from '../components/BoxAction';
import ImagePicker from 'react-native-image-crop-picker';
import CommentList from '../components/CommentList';
import Toast from 'react-native-simple-toast';
import Share, {ShareSheet, Button as ButtonShare} from 'react-native-share';
import ModalSearch from '../components/ModalSearch'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
let ConstantSystem = require('../services/ConstantSystem');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Modal = require('react-native-modalbox');
let shareOptions = {
  title: "React Native",
  message: "Hola mundo",
  url: "http://facebook.github.io/react-native/",
  subject: "Share Link" //  for email
};

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as magazineActions from '../actions/magazineActions';
import * as commonActions from '../actions/commonActions';
const actions = [
  magazineActions,
  commonActions
];
function mapStateToProps(state) {
  return {
    magazine: state.magazine,
    common: state.common
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

class EventDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      images: [],
      content:'',
      parentId: '',
      current: '',
      userName: '',
      editComment: false,
      showTip: false,
      id_edit: '',
      checkImage: false,
      visible: false,
    }
  }

  componentWillMount() {
    // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    this.props.actions.eventDetailRequest();
  }

  // _keyboardDidShow (e) {
  //   // alert('Keyboard Shown');
  //   // this.refs.scroll.scrollTo({ y: this.state.current + e.endCoordinates.height})
  // }

  // _keyboardDidHide () {
  //   this.setState({parentId: ''})
  // }


  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.eventDetail(this.props.id);
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.magazine != this.props.magazine) {
      var url = 'http://happyskin.vn';
      url = url+'/event/'+nextProps.magazine.eventDetail.slug;
      shareOptions.title = nextProps.magazine.eventDetail.title;
      shareOptions.message = nextProps.magazine.eventDetail.title;
      shareOptions.url = url;
      shareOptions.subject = nextProps.magazine.eventDetail.title;
    }
    if(!nextProps.common.error && this.props.common != nextProps.common ) {
      this.setState({
        parentId: '',
        content: '',
        images: [],
        userName: '',
        showTip: false,
        editComment: false,
        submitFirst: false
      })
      dismissKeyboard()
    }
  }

  renderLoading() {
    return (
      <View style={{ alignItems: 'center'}}>
        <Image style={{width: 75, height: 75}} source={require('../images/spinner.gif')} />
      </View>
    )
  }

  reply(comment, action) {
    this.setState({
      editComment: false,
      parentId: action == 'child' ? comment.parent_id : comment.id,
      showTip: true,
      userName: comment.user_data.full_name
    });
    this.refs.input.focus()
  }

  sendComment() {
    var img = '';
    (this.state.images.length > 0) ?
    this.state.images.map(function(image, index){
      if(img == '') {
        img = image.data;
      } else {
        img = img+'###'+image.data;
      }
    })
    : '';
    this.props.actions.comment(this.props.id, 'event', this.state.content, img, this.state.parentId)
  }

  saveComment() {
    this.props.actions.editComment(this.state.id_edit, this.state.content);
  }

  closeModalTip() {
    this.setState({
      parentId: '',
      userName: '',
      id_edit: '',
      editComment: false,
      checkImage: false,
      showTip: false
    })
  }

  editComment(comment) {
    this.setState({
      showTip: true,
      checkImage: true,
      editComment: true,
      content: comment.content,
      images: comment.images ? comment.images : '',
      id_edit: comment.id
    })
  }

  pickImages() {
    var _this = this;
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
      multiple: true,
      includeBase64: true,
      maxFiles: 10
    }).then(images => {
      this.setState({checkImage: false})
      var urlImages = [];
      var itemImage=[];
      images.map(function(image, index){
        ImageResizer.createResizedImage(image.path, 600, 800, 'JPEG', 80)
        .then((uri) => {
          if(Platform.OS == 'android') {
            NativeModules.RNImageToBase64.getBase64String(uri.uri ,( err, base64) => {
              var itemImage = {
                'data': base64
              }
              if(images.length > 5){
                // urlImages.push(itemImage);
                // if(index + 1 == 5){
                //   Toast.show('Bạn chỉ được chọn tối đa 5 ảnh');
                //   _this.onChange('images', urlImages);
                // }
                urlImages.push(itemImage);
                if(images.length == index + 1){
                  _this.setState({images: urlImages});
                }
              }else {
                urlImages.push(itemImage);
                if(images.length == index + 1){
                  _this.setState({images: urlImages});
                }
              }
            }).catch(error => {console.log(error)});
          } else {
            var itemImage = {
            'data': uri
            }
            urlImages.push(itemImage);
             if(images.length == index + 1){
               _this.setState({images: urlImages});
             }
             _this.setState({images: urlImages});
          }
        }).catch((err1) => {
        });
      })
    }).catch(e => {});
  }

  openShare(){
    if(shareOptions.url == 'http://facebook.github.io/react-native/'){
      return;
    }
    var _this = this;
    setTimeout(function(){
      _this.onOpen();
    }, 200);
    
  }

  onCancel() {
    this.setState({visible:false});
  }
  onOpen() {
    this.setState({visible:true});
  }


  render(){
    var uri = 'https://mapipro3.happyskin.vn/event/'+this.props.id; 
    return (
      <View style={main.content}>
        <View style={main.container}>
          <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff' }} >
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image style={{height: 12, width:13}} source={require('../images/icons/ic_back_blue2.png')}/>
              <Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Sự kiện</Text>
            </NavButton>
            <NavButton onPress={() => this.setState({openModal: true})} style={main.navSave}  >
              <Image style={{height: 16, width: 16}} source={require('../images/icons/ic_search_black.png')} />
            </NavButton>
          </NavBar>
          {
            this.props.magazine.isFetching ?
            <View style={main.mainSpin1}>
              <Image style={main.imgLoading} source={require('../images/rolling.gif')} />
            </View>
            : null
          }
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={10} style={{ flex: 1 }}>
            <ScrollView>
              <View >
                <View style={styles.content}>
                  <Text style={styles.txtTitle}>{this.props.magazine.eventDetail.title}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, marginBottom:10}}>
                    <View style={styles.ctBoxCate}>
                      <Text style={{color: '#fff'}}>Event</Text>
                    </View>
                    <BoxAction1 view={this.props.magazine.eventDetail.count_views} like={this.props.magazine.eventDetail.count_like} comment={this.props.magazine.eventDetail.count_comment} isLike={this.props.magazine.eventDetail.is_like_by_current_id}  />
                  </View>
                </View>
                <Image style={{height: 200, width: deviceWidth}} source={{uri: this.props.magazine.eventDetail.thumbnail+ '.png'}} />
                <View style={[styles.content,{paddingBottom: 20}]}>
                  {
                    this.props.magazine.eventDetail ?
                    <Web
                    ref={(c) => {this.webview = c}}
                    source={{uri: uri}}
                    onNavigationStateChange={(event) => {
                      if (event.url !== uri) {
                        this.webview.stopLoading();
                        Linking.openURL(event.url);
                      }
                    }}
                    scrollEnabled={false}
                    renderLoading={this.renderLoading}
                    startInLoadingState
                    automaticallyAdjustContentInsets={true}
                    style={{ margin: 0, width: windowSize.width }}
                    scalesPageToFit={false}
                    dataDetectorTypes="none"
                    javaScriptEnabled={true}
                    /> : null
                  }
                  <Button
                    containerStyle={{ backgroundColor:"rgb(254, 117, 53)", borderRadius: 4, height: 48, marginTop: 20, alignItems: 'center', justifyContent: 'center'}}
                    style={{fontSize: 16, fontWeight: '400', color: '#fff'}}
                    >
                    Tham gia sự kiện
                  </Button>
                  <Text style={styles.txtRegister}><Text style={{fontSize: 13, fontWeight: 'bold'}}>18</Text> người đã đăng ký</Text>
                </View>
                <BoxAction focus={() => this.refs.input.focus()} openShare={() => this.openShare()} isLike={this.props.magazine.eventDetail.is_like_by_current_id} id={this.props.magazine.eventDetail.id} typePost={this.props.magazine.eventDetail.type} count_like={this.props.magazine.eventDetail.count_like}/>
                {
                  this.props.magazine.eventDetail.id ?
                  <CommentList editComment={(comment) => this.editComment(comment)} reply={(comment, action) => this.reply(comment, action)} count_like = {this.props.magazine.eventDetail.count_like} count_comment = {this.props.magazine.eventDetail.count_comment} typePost={'event'} target_id={this.props.magazine.eventDetail.id}/>
                  :
                  null
                }
                
              </View>
            </ScrollView>
            {
              this.state.showTip ?
                <TouchableOpacity onPress={() => this.closeModalTip()} style={{height: 30, flexDirection: 'row',borderWidth: 1, borderColor: '#ccc', alignItems: 'center', padding: 15, justifyContent: 'space-between'}}>
                  {
                    this.state.editComment ?
                      <Text style={{fontSize: 12}}>Bạn đang sửa bình luận </Text>
                      :
                      <Text style={{fontSize: 12}}>Bạn đang trả lời  <Text style={{fontSize: 13, fontWeight: 'bold', color: '#000'}}>{this.state.userName}</Text></Text>
                  }
                  <Image style={{height: 12, width: 12}} source={require('../images/icons/ic_close_pink.png')} />
                </TouchableOpacity>
                : null
            }
            <View style={main.boxChat}>
              <TouchableOpacity onPress={() => this.pickImages()} style={main.selectImage}>
                <Image source={require('../images/icons/ic_camera_pink.png')} style={main.icCamera}/>
              </TouchableOpacity>
            
              <View style={main.mainTxtChat}>
                {
                  this.state.images.length > 0 ?
                  <ScrollView horizontal={true} >
                    {
                    this.state.images.map((image, index) => {
                      return (
                        <Image source={{uri: 'data:image/jpeg;base64,' + image.data, isStatic: true}} style={{height: 40,marginTop: 5, marginRight: 3, width: 40}}/>
                      )
                    })
                  }
                  </ScrollView>
                  : null
                }
                <TextInput 
                    placeholder = "Bình luận về bài viết"
                    underlineColorAndroid='#f5f5f5'
                    style={styles.inputChat}
                    ref='input'
                    autoGrow={true}
                    selectionCtolor='#C2C5D0'
                    onChangeText={(content) => this.setState({content: content})}
                    value={this.state.content}
                    multiline={true}
                />
              </View>
              {
                this.state.editComment ?
                  <TouchableOpacity onPress = {() => this.saveComment()}>
                    <Text style={main.txtSend}>Lưu</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress = {() => this.sendComment()}>
                    <Text style={main.txtSend}>Gửi</Text>
                  </TouchableOpacity>
              }
            </View>
          </KeyboardAvoidingView>
          <Modal 
            style={main.modal}
            isOpen={this.state.openModal}
            swipeToClose={true}
            position="top"
            entry="bottom"
            animationDuration={200}
            backdropColor="#000"
            onClosed={()=> this.setState({openModal: false}) }>
            <ModalSearch closeModal={() => this.setState({openModal: false})}/>
          </Modal>
          <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
              <ButtonShare iconSrc={{ uri: ConstantSystem.FACEBOOK_ICON }}
                      onPress={()=>{
                  this.onCancel();
                  setTimeout(() => {
                    Share.shareSingle(Object.assign(shareOptions, {
                      "social": "facebook"
                    }));
                  },300);
                }}><Text><Text style={main.fontSizeMedium}>Chia sẻ lên</Text> <Text>Facebook</Text></Text></ButtonShare>
              <ButtonShare
                iconSrc={{ uri: ConstantSystem.CLIPBOARD_ICON }}
                onPress={()=>{
                  this.onCancel();
                  setTimeout(() => {
                    if(typeof shareOptions["url"] !== undefined) {
                      Clipboard.setString(shareOptions["url"]);
                      Toast.show('Nội dung đã được copy');
                    }
                  },300);
                }}><Text><Text style={main.fontSizeMedium}>Copy Link</Text> <Text>Url</Text></Text></ButtonShare>
            </ShareSheet>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txtRegister: {
    color: 'rgb(135, 155, 206)',
    marginTop: 10
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15
  },
  ctBoxCate: {
    borderRadius: 16,
    backgroundColor: 'rgb(243, 174, 193)',
    padding: 8,
    paddingBottom: 4,
    paddingTop: 4,
  },
  txtTitle: {
    color: 'rgb(215, 53, 84)',
    fontSize: 24,
    marginTop: 22,
  },
  actions: {
    marginTop: 15,
    borderBottomColor: '#ECEEF0',
    borderBottomWidth: 1,
    borderTopColor: '#ECEEF0',
    borderTopWidth: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  inputChat: {
    fontSize: 16,
    paddingTop: 0,
  },
});
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);