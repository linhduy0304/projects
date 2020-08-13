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
  NativeModules,
  InteractionManager,
  Keyboard,
  Clipboard,
  Animated,
  Linking,
  KeyboardAvoidingView
} from "react-native";

import Button from "react-native-button";
import BoxFeed from '../components/BoxFeed';
import {convertDateTime} from '../components/Functions';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import Web from 'react-native-webview2';
import Toast from 'react-native-simple-toast';
import BoxAction from '../components/explore/BoxAction';
import BoxAction1 from '../components/BoxAction';
import CommentList from '../components/CommentList';
import Share, {ShareSheet, Button as ButtonShare} from 'react-native-share';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
let ConstantSystem = require('../services/ConstantSystem');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let shareOptions = {
  title: "React Native",
  message: "Hola mundo",
  url: "http://facebook.github.io/react-native/",
  subject: "Share Link" //  for email
};


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as exploreActions from '../actions/exploreActions';
import * as commonActions from '../actions/commonActions';
const actions = [
  exploreActions,
  commonActions
];
function mapStateToProps(state) {
  return {
    explore: state.explore,
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

class NewsDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
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

  componentWillMount () {
    this.props.actions.loadDetailRequest()
  }

  
  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.loadDetail(this.props.id);
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.explore != this.props.explore) {
      var url = 'http://happyskin.vn';
      url = url+'/'+nextProps.explore.exDetail.slug;
      shareOptions.title = nextProps.explore.exDetail.title;
      shareOptions.message = nextProps.explore.exDetail.title;
      shareOptions.url = url;
      shareOptions.subject = nextProps.explore.exDetail.title;
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
    this.props.actions.comment(this.props.id, 'post', this.state.content, img, this.state.parentId)
  }
  saveComment() {
    this.props.actions.editComment(this.state.id_edit, this.state.content);
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
          // if(Platform.OS == 'android') {
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
          // } else {
          //   console.log(uri);
          //   var itemImage = {
          //   'data': uri
          //   }
          //   urlImages.push(itemImage);
          //   _this.setState({images: urlImages});
          // }
        }).catch((err1) => {
        });
      })
    }).catch(e => {});
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
    var uri = 'https://mapipro3.happyskin.vn/v2/webview?id='+this.props.id+'&type=post'; 
    return (
      <View style={main.content}>
        <View style={main.container}>
          <NavBar style={{navBar: styles.nav, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff' }} >
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
              <View>
                <Text style={main.txtBack}>Khám phá</Text>
              </View>
            </NavButton>
          </NavBar>

          {
            this.props.explore.isFetching ?
            <View style={main.mainSpin1}>
              <Image style={main.imgLoading} source={require('../images/rolling.gif')} />
            </View>
            : null
          }
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={10} style={{ flex: 1 }}>
            <ScrollView ref = 'scroll'
             keyboardShouldPersistTaps={'always'}>
              
              <View>
                <Text style={styles.txtTitle}>{this.props.explore.exDetail.title}</Text>
                <View style={{ margin: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  {
                    this.props.explore.exDetail.categories ?
                    <View style={styles.ctCategory}>
                      <Text style={styles.txtCategory}>{this.props.explore.exDetail.categories[0].name}</Text>
                    </View>
                    : null
                  }
                  
                  <BoxAction1 view={this.props.explore.exDetail.count_views} like={this.props.explore.exDetail.count_like} comment={this.props.explore.exDetail.count_comment} isLike={this.props.explore.exDetail.is_like_by_current_id}  />
                </View>
                <Image style={{width: deviceWidth, height:200}} source={{uri: this.props.explore.exDetail.image_thumb+'.png'}} />
                <View style={styles.ctContent}>
                  {
                    this.props.explore.exDetail ?
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
                  
                </View>
                <View style={{alignItems: 'center', margin: 14}}>
                  <View style={styles.ctLine}/>
                </View>
                <View style={{marginLeft: 15}}>
                  <Text style={styles.txtBy}>Đăng bởi <Text style={{fontWeight: 'bold'}}>HappySkin</Text></Text>
                  <Text style={[styles.txtBy, {marginTop: 2}]}></Text>
                </View>
                <View style={styles.actions}>
                  <BoxAction focus={() => this.refs.input.focus()} openShare={() => this.openShare()} isLike={this.props.explore.exDetail.is_like_by_current_id} id={this.props.explore.exDetail.id} typePost={this.props.explore.exDetail.type} count_like={this.props.explore.exDetail.count_like}/>
                </View>
                {
                  this.props.explore.exDetail.type ?
                  <CommentList editComment={(comment) => this.editComment(comment)} reply={(comment, action) => this.reply(comment, action)} count_like = {this.props.explore.exDetail.count_like} count_comment = {this.props.explore.exDetail.count_comment} typePost={this.props.explore.exDetail.type} target_id={this.props.explore.exDetail.id}/>
                  : null
                }
                
                <View style={styles.ctRelate}>
                  <Text style={{color: 'rgb(135, 80, 161)', marginLeft: 15}}>BÀI VIẾT TƯƠNG TỰ</Text>
                  {
                    this.props.explore.exRelate ?
                      this.props.explore.exRelate.map((item, index) => {
                        return (<BoxFeed key={index} data={item}/>)
                      })
                    : null
                  }
                </View>
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
              <TouchableOpacity onPress={() => this.pickImages()} style={styles.selectImage}>
                <Image source={require('../images/icons/ic_camera_pink.png')} style={styles.icCamera}/>
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
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'rgb(194, 197, 208)'}
                    style={styles.inputChat}
                    autoGrow={true}
                    ref='input'
                    selectionColor='#C2C5D0'
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
  ctRelate: {
    borderTopColor: 'rgb(243, 174, 193)',
    borderTopWidth: 4,
    padding: 12,
    paddingLeft: 0
  },
  txtBy: {
    color: 'rgb(135, 155, 206)'
  },
  ctLine: {
    backgroundColor: 'rgb(243, 174, 193)',
    height: 2,
    width: 88
  },
  ctCategory: {
    backgroundColor: 'rgb(243, 174, 193)',
    borderRadius: 16,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  txtCategory: {
    color: '#fff',
    fontWeight: 'bold'
  },
  boxAction: {
    backgroundColor: 'blue'
  },
  boxChat: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    // height: 50,
    alignItems: 'center',
  },
  selectImage: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icCamera: {
    width: 20,
    height: 18
  },
  mainTxtChat: {
    flex: 1,
  },
  inputChat: {
    fontSize: 16,
    paddingTop: 0,
  },
  ctContent: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  nav: {
    backgroundColor: '#fff',
    padding: 0,
    height: 44,
    width: windowSize.width,
    borderBottomColor: "transparent"
    
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
  txtTitle: {
    fontSize: 24,
    color: 'rgb(215, 53, 84)',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  txtContent: {
    marginTop: 14,
    marginLeft: 15,
    color: 'rgb(41, 42, 57)',
    fontSize: 16
  },
  ctLike: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctAction: {
    flexDirection: 'row',
    height: 50,
    width: deviceWidth,
    alignItems: 'center',
  },
  icLike: {
    height: 16,
    width: 16*36/30
  },
  icComment: {
    height: 16,
    width: 16
  },
  txtLike: {
    fontSize: 15,
    marginLeft: 5,
    color: 'rgb(135, 155, 206)'
  },
  
});
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
