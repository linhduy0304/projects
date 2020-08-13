
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  InteractionManager,
  Linking,
  Animated,
  Platform,
  TextInput,
  NativeModules,
  Keyboard,
  Alert
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from "react-native-router-flux";
import ImageZoom from 'react-native-transformable-image';
import Toast from 'react-native-simple-toast';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

import io from 'socket.io-client';
const socket = io('http://42.112.20.90:4001/', { transports: ['websocket'] });

import SplashScreen from 'react-native-splash-screen';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
GoogleAnalytics.setTrackerId('UA-57146563-2');

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let ConstantSystem = require('../../services/ConstantSystem');
var DeviceInfo = require('react-native-device-info');
var Modal = require('react-native-modalbox');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';

const CARD_PREVIEW_WIDTH = 20;
const CARD_MARGIN = 5;
const CARD_WIDTH = Dimensions.get('window').width - (CARD_MARGIN + CARD_PREVIEW_WIDTH) * 2;

import * as exploreActions from '../../actions/exploreActions';
import * as commonActions from '../../actions/commonActions';
const actions = [
  exploreActions,
  commonActions
];

function mapStateToProps(state) {
  return {
    explore: state.explore,
    profile: state.profile,
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

let timeout;

class HotDebateDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeoutCloseSpin: false,
      back: true,
      //isErrorAvatar: false,
      animatedValue: new Animated.Value(0),
      dataGuest: this.props.explore.hotDebate.users,
      totalConnections: 0,
      commentPros:[],
      commentMembers: [],
      content: '',
      count: 0,
      refreshing: false,
      hasMore: true,
      modalMember: false,
      modalPro: false,
      modalZoom: false,
      images: [],
      dataZoom: '',
      hasCommentPros: true,
      hasCommentMembers: true,
      viewPro: false,
      viewMem: false,
      keyboard1: false,
      isShowKeyboard: false,
      keyword: '',
      openSearch: false,
      isErrorAvatar: false,
    }
  }

  _keyboardDidShow () {
    this.setState({
      isShowKeyboard: true
    })
  }
  _keyboardDidHide () {
    this.setState({
      isShowKeyboard: false
    })
  }
  _keyboardWillShow(e) {
	}

  componentWillMount(){
    _keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.props.actions.hotDebateRequest();
  }

  componentDidMount(){
    if(Platform.OS === 'android') {
      SplashScreen.hide();
    }
    timeout = setTimeout( () => {
      this.setState({
        timeoutCloseSpin: true
      })
    },ConstantSystem.TIMEOUT);
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.loadHotDebate(this.props.id);
      this.openSocket();
    });
    GoogleAnalytics.trackScreenView('View Event: '+(this.props.title) ? this.props.title : this.props.eventDetail.eventDetail.title);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.timeoutCloseSpin){
      clearTimeout(timeout);
    }
  }

  componentWillUnmount() {
    socket.emit('leaveRoom', {room: this.props.id, username: this.props.profile.username, objectId: this.props.id });
  }


  back(){
    if(this.state.back){
      if(this.props.deepLink){
        Actions.tab();
      }else{
        Actions.pop();
      }
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

  randomColor(index){
    var arrColor = [
      'red',
      'blue',
      '#2e313c',
      '#522d0e',
      '#490e52',
      '#164d9e',
      '#169e29',
      '#9e3616',
      '#e7410e',
      '#8b572a',
    ];
    var b = index%10;
    return arrColor[b];
  }

  viewProfile(id) {
    // Actions.otherProfile({id: id})
  }

  openSocket() {
      var _this = this;
      socket.emit('joinRoom', {room: this.props.id, username: this.props.profile.currentUser.id, objectId: this.props.id, key: 'HSCHATHOTDEBATE' });

      socket.on('list_message', function(data){
          var commentMembers = _this.state.commentMembers;
          var commentPros = _this.state.commentPros;
          //commentMembers.push(data);
          data.map(function(d, index) {
            if (d.type == 'hotdebate') {
              commentMembers = commentMembers.concat(d);
            } else {
              commentPros = commentPros.concat(d);
            }
          });
          //commentMembers = commentMembers.concat(data);
          _this.setState({ commentMembers: commentMembers, commentPros: commentPros });
          setTimeout(function(){
            if (_this.refs.listMember && commentMembers.length > 0 ) {
              _this.refs.listMember.scrollToEnd({animated: true});
            }
            if (_this.refs.listPro && commentPros.length > 0 ) {
              _this.refs.listPro.scrollToEnd({animated: true});
            }
          }, 1000);
        
      });

      socket.on('list_message_more', function(data){
        if (data.length > 0) {
          var commentMembers = _this.state.commentMembers;
          var commentPros = _this.state.commentPros;
          commentMembers.reverse();
          commentPros.reverse();
          data.map(function(d, index) {
            if (d.type == 'hotdebate') {
              commentMembers = commentMembers.concat(d);
            } else {
              commentPros = commentPros.concat(d);
            }
          });
          commentMembers.reverse();
          commentPros.reverse();
          _this.setState({ commentMembers: commentMembers, commentPros: commentPros });
        } else {
          if (_this.state.modalPro) {
            _this.setState({hasCommentPros: false});
          }
          if (_this.state.modalMember) {
            _this.setState({hasCommentMembers: false});
          }
        }
      });

      

      socket.on('total_member', function(data){
        _this.setState({ totalConnections: data.total });
      });
  }

  onChange(content) {
    // this.setState({
    //   content: content
    // })
    var old_length = this.state.content.length;
    var new_length = content.length;

    if (new_length > old_length && content.charAt(content.length-3) == '@' && content.charAt(content.length-2) != ' ' && content.charAt(content.length-1) != ' ' ) {
      keyword = content.charAt(content.length-2)+content.charAt(content.length-1);
      this.setState({
        content: content,
        openSearch: true,
        keyword: keyword,
        start: content.length-2
      });
      // this.props.actions.tagUser(keyword);
    } else {
      this.setState({
        content: content,
      })
    }
  }

  submitChat() {
    var content = this.state.content;
    var images = this.state.images;
    if (content == '' && images.length == 0) {
      Toast.show('Xin hãy nhập nội dung');
    } else {
      var _this = this;
      dismissKeyboard();
      var type = this.props.explore.hotDebate.isMember ? 'hotdebate' : 'hotdebatePro';
      socket.emit('send_message', { content: content, room: this.props.id, user_id: this.props.profile.currentUser.id, full_name: this.props.profile.currentUser.full_name, avatar: this.props.profile.currentUser.avatar, type: type, images: this.state.images });
      this.setState({ content: '', images: [] });
      data_images = [];
      for(var i=0; i< images.length;i++) {
        data_images.push('data:image/jpeg;base64,'+images[i].data);
      }
      var d = { content: content, room: this.props.id, user_id: this.props.profile.currentUser.id, userName: this.props.profile.currentUser.full_name, avatar: this.props.profile.currentUser.avatar, type: type, images: data_images };
      if (type == 'hotdebatePro') {
        var commentPros = _this.state.commentPros;
        commentPros = commentPros.concat(d);
        _this.setState({  commentPros: commentPros });
        setTimeout(function(){
          if(!_this.state.viewPro){
           _this.refs.listPro.scrollToEnd({animated: true});
          }
        }, 1000);
      } else {
        var commentPros = _this.state.commentMembers;
        commentMembers = commentPros.concat(d);
        _this.setState({  commentMembers: commentMembers });
        setTimeout(function(){
          if(!_this.state.viewMem) {
           _this.refs.listMember.scrollToEnd({animated: true});
          }
        }, 1000);
      }
    }
  }

  selectImageTapped(){
    var _this = this;
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
      multiple: true,
      includeBase64: true
    }).then(images => {
      var urlImages = [];
      var itemImage=[];
      images.map(function(image, index){
        ImageResizer.createResizedImage(image.path, 600, 800, 'JPEG', 80)
        .then((uri) => {
            NativeModules.RNImageToBase64.getBase64String(uri.uri, (err, base64) => {
              var itemImage = {
                'data': base64
              }
              urlImages = urlImages.concat(itemImage);
                _this.setState({images: urlImages});
            });
        }).catch((err) => {
          // console.log(err);
        });
      })
    }).catch(e => {});
  }

  openModel(index, img) {
    var _this = this;
    if(index == 3) {
      this.setState({
        modalZoom: true,
        dataZoom: img,
      })
    }
    if (index == 1) {
      this.setState({ 
        modalPro: true,
        viewPro: false
       });
      setTimeout(function(){
        
        if (_this.state.commentPros.length>0) {
          _this.refs.listPro.scrollToEnd();
        }
      }, 1000);
    } 
    if(index ==2) {
      this.setState({ 
        modalMember: true,
        viewMem: false 
      });
      setTimeout(function(){
        if (_this.state.commentMembers.length>0) {
          _this.refs.listMember.scrollToEnd();
        }
      }, 1000);
    }
  }

  closeModal(index) {
    if(index == 3) {
      this.setState({
        modalZoom: false
      })
    }
    if (index == 1) {
      this.setState({ 
        modalPro: false,
         });
    }
    if (index == 2){
      this.setState({ 
        modalMember: false ,
      });
    }
    if (index == 4){
      this.setState({ 
        openSearch: false ,
      });
    }
  }

  

  showMore(index) {
    if (index == 1) {
      var type = 'hotdebatePro';
      var skip = this.state.commentPros.length;
      socket.emit('show_more', { room: this.props.id, objectId: this.props.id, type: type, skip: skip });
    } else {
      var type = 'hotdebate';
      var skip = this.state.commentMembers.length;
      socket.emit('show_more', { room: this.props.id, objectId: this.props.id, type: type, skip: skip });
    }
  }

  deleteImage(index) {
    var images = this.state.images.slice();
    images.splice(index, 1);
    this.setState({images: images});
  }

  followHotdebate() {
    //alert hien len
    Alert.alert(
      'Hot Debate',
      this.props.explore.hotDebate.isFollow == 1 ? 'Ngừng nhận thông báo từ Hot Debate này!' : 'Theo dõi để nhận thông báo khi có chuyên gia trò chuyện trong Hot Debate này!',
      [
        {text: this.props.explore.hotDebate.isFollow == 1 ? 'Hủy theo dõi' : 'Theo dõi', onPress: () => this.props.actions.followHotdebate(this.props.explore.hotDebate.id, this.props.explore.hotDebate.isFollow), style: 'cancel'},
        {text: 'Đóng', onPress: () => null}
      ]
    )
    
  }

  getStatus() {
    var status = this.props.explore.hotDebate.status;
    if (status == 1) {
      return 'Đang diễn ra';
    } else if (status == 2) {
      return 'Sắp diễn ra';
    } else {
      return 'Đã kết thúc';
    }
  }

  renderListPro(type) {
    var _this= this;
    if (this.state.commentPros.length > 0) {
      var len = this.state.commentPros.length-6;
      if(type == '1') {
        _this.setState({viewPro: true})
        return this.state.commentPros.map((comment, index) => {
          if(index > len){
            return (
              <View style={styles.itemComment} key={index}>
                <Image style={styles.proContentAvatar}
                      source={{uri: comment.avatar + '_100x100.png' }}
                />
                <View style={styles.containerContent}>
                  <Text style={index%2 == 0 ? styles.txtUserName : styles.txtUserName1}>{comment.userName}</Text>
                  <View style={index%2 == 0 ? styles.containerMesse : styles.containerMesse1}>
                    { comment.content != '' ?
                      <Text style={styles.txtMesse}>{comment.content}</Text>
                      : null
                    }
                    {
                      comment.images && comment.images.length > 0 ?
                      <View style={[styles.imgCommentList]} >
                        {
                          
                            comment.images.map(function(img, index){
                              return <TouchableOpacity style={styles.image} key={index} onPress={()=> _this.openModel(3, img)}>
                                        <Image source={{uri: img}} style={styles.imgCommentThumb}/>
                                    </TouchableOpacity>
                            })
                          
                        }
                      </View>
                      : null
                    }
                  </View>
                </View>
              </View>);
          }
          
        });
      } else{
        return this.state.commentPros.map((comment, index) => {
          return (
            <View style={styles.itemComment} key={index}>
              <Image style={styles.proContentAvatar}
                    source={{uri: comment.avatar + '_100x100.png' }}
              />
              <View style={styles.containerContent}>
                <Text style={index%2 == 0 ? styles.txtUserName : styles.txtUserName1}>{comment.userName}</Text>
                <View style={index%2 == 0 ? styles.containerMesse : styles.containerMesse1}>
                  { comment.content != '' ?
                    <Text style={styles.txtMesse}>{comment.content}</Text>
                    : null
                  }
                  {
                    comment.images && comment.images.length > 0 ?
                    <View style={[styles.imgCommentList]} >
                      {
                        
                          comment.images.map(function(img, index){
                            return <TouchableOpacity style={styles.image} key={index} onPress={()=> _this.openModel(3, img)}>
                                      <Image source={{uri: img}} style={styles.imgCommentThumb}/>
                                  </TouchableOpacity>
                          })
                        
                      }
                    </View>
                    : null
                  }
                </View>
              </View>
            </View>);
        });
      }
    } else {
      return <View style={styles.rowEmpty} >
                <Text>Chưa có bình luận</Text>
              </View>
    }
  }

  renderListMember(type) {
    var _this= this;
    if (this.state.commentMembers.length > 0) {
      var len = this.state.commentMembers.length-6;
      if(type =='2'){
        this.setState({viewMem: true})
        return this.state.commentMembers.map((comment, index) => {
          if(index > len) {
            return (
              <View key={index}>
                <View style={styles.itemCommentMember}>
                  <Text style={{color: this.randomColor(index)}}>{comment.userName}  <Text style={{marginLeft: 10,color: 'black'}}>{comment.content}</Text></Text>
                </View>
                {
                  comment.images && comment.images.length > 0 ?
                    <View style={[styles.imgCommentList]} >
                      {
                          comment.images.map(function(img, index){
                            return <TouchableOpacity style={styles.image} key={index} onPress={()=> _this.openModel(3, img)}>
                                      <Image source={{uri: img}} style={styles.imgCommentThumb}/>
                                  </TouchableOpacity>
                          })
                      }
                    </View>
                  : null
                }
              </View>
            );
          }
        });
      }else {
        return this.state.commentMembers.map((comment, index) => {
          return (
              <View>
                <View style={styles.itemCommentMember}>
                  <Text style={{color: this.randomColor(index)}}>{comment.userName}  <Text style={{marginLeft: 10,color: 'black'}}>{comment.content}</Text></Text>
                </View>
                {
                  comment.images && comment.images.length > 0 ?
                    <View style={[styles.imgCommentList]} >
                      {
                          comment.images.map(function(img, index){
                            return <TouchableOpacity style={styles.image} key={index} onPress={()=> _this.openModel(3, img)}>
                                      <Image source={{uri: img}} style={styles.imgCommentThumb}/>
                                  </TouchableOpacity>
                          })
                      }
                    </View>
                  : null
                }
              </View>
            );
        });
      }
    } else {
      return <View style={styles.rowEmpty} >
                <Text>Chưa có bình luận</Text>
              </View>
    }
  }

  searchUser(keyword) {
    clearTimeout(myTime);
    var _this = this;
    keyword = keyword.slice(1);
    this.setState({
      keyword: keyword,
    });
    var myTime = setTimeout(function(){
      _this.props.actions.tagUser(keyword);
    }, 1200);

  }

  selectUser(username) {
    var content = this.state.content;
    this.setState({
      openSearch: false,
      content: content.slice(0, this.state.start)+username+' '
    });
    this.refs.inputContent.focus();
  }

  renderForm() {
    var _this = this;
    return <View style={{backgroundColor: '#eeeeee' }}>
          {
              _this.state.images.length > 0 ?
                <View style={{height: 70}}>
                  <ScrollView
                    style={styles.images}
                    automaticallyAdjustInsets={false}
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={CARD_WIDTH + CARD_MARGIN*2}
                    snapToAlignment="start"
                    contentContainerStyle={styles.cartContent}
                    showsHorizontalScrollIndicator={true}>
                      {
                        this.state.images.map(function(img, index){
                          return <View>
                                  <View style={styles.image}>
                                    <Image source={{uri: 'data:image/jpeg;base64,' + img.data, isStatic: true}} style={styles.image_thumb}/>
                                    <TouchableOpacity style={styles.buttonClose} onPress={() => _this.deleteImage(index)}>
                                      <Image source={require('../../images/icons/ic_close_image.png')} style={styles.iconClose} />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                        })
                      }
                  </ScrollView>
                </View>
              : null
            }
          <View style={styles.boxFormSubmit}>
            <TouchableOpacity style={styles.containerCamera} onPress={ () => this.selectImageTapped() } >
              <Image style={styles.icCamera} source={require('../../images/icons/ic_camera_pink.png')}/>
            </TouchableOpacity>
            <TextInput
              ref="inputContent"
              style={styles.formInput}
              placeholder="Nhập nội dung..."
              placeholderTextColor="#c2c5d0"
              underlineColorAndroid="transparent"
              onChangeText={(content) => this.onChange(content)}
              autoCapitalize="sentences"
              autoGrow={true}
              value={this.state.content}
              autoCorrect={false}
              multiline={true}
            />
            <TouchableOpacity onPress={() => this.submitChat()}>
              <Image style={styles.btnSend} source={require('../../images/icons/ic_os_send.png')}/>
            </TouchableOpacity>
          </View>
        </View>
  }

  render(){
    var _this = this;
    return (
      <View style={styles.content}>
          <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBarWhite }} statusBar={{barStyle: 'light-content', backgroundColor: 'black'}}>
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back_blue2.png')}/>
              <View>
                <Text style={main.txtBack}>Khám phá</Text>
              </View>
            </NavButton>
            <NavButton style={{marginRight: 20}} onPress={ () => this.followHotdebate() }>
              {
                this.props.explore.hotDebate.isFollow == 1 ?
                  <Text>Bỏ theo dõi</Text>
                :
                  <Text>Theo dõi</Text>
              }
            </NavButton>
          </NavBar>

        <View style={styles.container}>
         
          <ScrollView
            scrollEventThrottle={16}
            style={styles.scrollView}
          >
            <Text style={styles.title}>{this.props.explore.hotDebate.title}</Text>
            <Image
                style={styles.thumbnail}
                source={{uri: this.props.explore.hotDebate.image_thumb+'_600x400.png'}}
            />
            <View style={styles.boxPro}>
              <Text style={ styles.labelPro }>Khách mời</Text>
              <View style={styles.listGuest}>
              <ScrollView
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                >
                { this.props.explore.hotDebate.users ?
                  this.props.explore.hotDebate.users.map((item, index) => {
                    return (
                      <View style={styles.itemListGuest} key={index}>
                        <TouchableOpacity onPress={()=> this.viewProfile(item.id)}>
                          <Image style={styles.avatarGuest} source={{uri: item.avatar+'_100x100.png'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.viewProfile(item.id)}>
                          <Text style={styles.nameGuest}>{item.full_name}</Text>
                        </TouchableOpacity>
                      </View>);
                }): null}
              </ScrollView>
              </View>
              <View style={styles.boxStatus}>
                <View style={styles.containerActive}>
                  <Text style={styles.status}>{this.getStatus()}</Text>
                  <Image source={require('../../images/icons/ic_point.png')}/>
                </View>
                <Text style={styles.count}>{this.state.totalConnections} thành viên đã tham gia</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.titleRelatedProducts} onPress={ () => this.openModel(1) } >
              <Text style={styles.colorWhite}>KHÁCH MỜI NÓI GÌ</Text>
              <Image style={styles.iconExpand} source={require('../../images/icons/ic_expand.png')}/>
            </TouchableOpacity>
            { 
                !this.state.modalPro ?
                  <View style={styles.boxProContent}
                  >
                    {
                      this.renderListPro('1')
                    }
                  </View>
                : null
            }
            <TouchableOpacity style={styles.titleRelatedProducts} onPress={ () => this.openModel(2) }>
              <Text style={styles.colorWhite}>BÌNH LUẬN TỪ THÀNH VIÊN</Text>
              <Image style={styles.iconExpand} source={require('../../images/icons/ic_expand.png')}/>
            </TouchableOpacity>
            {
              !this.state.modalMember ?
                  <View style={styles.containerMember}
                    >
                    {
                      this.renderListMember('2')
                    }
                  </View>
              : null
            }
           
          </ScrollView>
          {
              this.renderForm()
          }

            <Modal 
            isOpen={this.state.modalPro}
            ref={"modalPro"}
            swipeToClose={false}
            position={"top"}
            isAnimateOpen={false}
            animationDuration={10}
            onClosed={()=> this.closeModal(1)}
            >
              <TouchableOpacity style={styles.titleRelatedProducts} onPress={ () => this.closeModal(1) }>
                <Text style={styles.colorWhite}>KHÁCH MỜI NÓI GÌ</Text>
                <Image style={styles.iconExpand} source={require('../../images/icons/ic_compress.png')}/>
              </TouchableOpacity>
            
                <ScrollView style={styles.scrollViewModal}
                  ref="listPro"
                  >
                  {
                    _this.state.hasCommentPros && _this.state.commentPros.length >= 10 ?
                      <TouchableOpacity style={styles.showMore} onPress={ () => this.showMore(1) }><Text style={styles.txtShowMore}>Hiển thị thêm</Text></TouchableOpacity>
                    : null
                  }
                  {
                    this.renderListPro()
                  }
                  <View style={{height: 10, width: deviceWidth}}></View>
                </ScrollView>
                {
                  !this.props.explore.hotDebate.isMember ?
                    this.renderForm()
                  : null
                }
                <Modal style={[styles.modal1, styles.modalZoom,{backgroundColor: 'black'}]}
                  isOpen={this.state.modalZoom}
                  swipeToClose={true}
                  ref={"modalZoom"}
                  position={"top"}
                  onClosed={()=> this.closeModal(3) }>
                  <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}} >
                    <TouchableOpacity style={styles.ic_close} onPress={()=> this.closeModal(3)}>
                      <Image style={{height: 20, width: 20}} source={require('../../images/icons/ic_close_white.png')}/>
                    </TouchableOpacity>
                    <ImageZoom style={{height: deviceWidth-50, width: deviceWidth-50} } source={{uri: this.state.dataZoom}}/>
                  </View>
                </Modal>
          </Modal>

          <Modal 
            isOpen={this.state.modalMember}
            ref={"modalMember"}
            swipeToClose={false}
            position={"top"}
            backdrop={true}
            isAnimateOpen={false}
            animationDuration={10}
            onClosed={()=> this.closeModal(2)}>
            <TouchableOpacity style={styles.titleRelatedProducts} onPress={ () => this.closeModal(2) }>
                <Text style={styles.colorWhite}>BÌNH LUẬN TỪ THÀNH VIÊN</Text>
                <Image style={styles.iconExpand} source={require('../../images/icons/ic_compress.png')}/>
              </TouchableOpacity>
              <ScrollView style={styles.scrollViewModal}
                ref="listMember"
                >
                {
                  _this.state.hasCommentPros && _this.state.commentMembers.length >= 10 ?
                    <TouchableOpacity style={styles.showMore} onPress={ () => this.showMore(2) }><Text style={styles.txtShowMore}>Hiển thị thêm</Text></TouchableOpacity>
                  : null
                }
                {
                  this.renderListMember()
                }
              <View style={{height: 10, width: deviceWidth}}></View>
              </ScrollView>
              {
                this.props.explore.hotDebate.isMember ?
                  this.renderForm()
                : null
              }
              <Modal style={[styles.modal1, styles.modalZoom,{backgroundColor: 'black'}]}
                isOpen={this.state.modalZoom}
                swipeToClose={true}
                ref={"modalZoom"}
                position={"top"}
                onClosed={()=> this.closeModal(3) }>
                <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}} >
                  <TouchableOpacity style={styles.ic_close} onPress={()=> this.closeModal(3)}>
                    <Image style={{height: 20, width: 20}} source={require('../../images/icons/ic_close_white.png')}/>
                  </TouchableOpacity>
                  <ImageZoom style={{height: deviceWidth-50, width: deviceWidth-50} } source={{uri: this.state.dataZoom}}/>
                </View>
            </Modal>
          </Modal>

          <Modal style={styles.modal}
            isOpen={this.state.openSearch}
            ref={"modalTag"}
            position={"top"}
            animationDuration={0}
            swipeToClose={true}
            backdrop={false}
            entry="bottom">
            <View style={{alignItems: 'center', heigh: 45, flexDirection: 'row'}}>
              <TextInput
                style={styles.inputSearch}
                placeholderTextColor="#000000"
                autoFocus={true}
                underlineColorAndroid="transparent"
                onChangeText={(keyword) => {this.searchUser(keyword) } }
                value={'@'+this.state.keyword}
                autoCorrect={false}
                />
              <Icon onPress= {()=> this.closeModal(4)} style={{padding: 5, marginRight: 10}} name="md-close" size={30} color="#000" />
            </View>

            <ScrollView
              style={styles.tagUser}
              automaticallyAdjustInsets={false}
              keyboardShouldPersistTaps={true}
              snapToAlignment="start"
              contentContainerStyle={styles.cartContent}
              showsHorizontalScrollIndicator={false}>
                {
                  (this.props.common.users.length > 0) ?
                  this.props.common.users.map(function(user, index){
                    return (
                      <View key={index} style={styles.rowUser}>
                        <TouchableOpacity onPress={() => _this.selectUser(user.username)} style={styles.boxModal}>
                          <View style={styles.viewAvatar}>
                            <Image source={ !_this.state.isErrorAvatar && user.avatar != '' ? { uri: user.avatar+'_100x100.png' } : require('../../images/avatar.png') } style={styles.avatar} onError={(e) => {_this.setState({ isErrorAvatar: true}) } }/>
                          </View>
                          <View style={styles.viewName}>
                            <Text style={styles.textName}>{user.full_name}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )
                  })
                  : null
                }
            </ScrollView>
          </Modal>
        </View>

        <Modal style={[styles.modal1, styles.modalZoom,{backgroundColor: 'black'}]}
            isOpen={this.state.modalZoom}
            swipeToClose={true}
            ref={"modalZoom"}
            position={"center"}
            onClosed={()=> this.closeModal(3) }>
            <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}} >
              <TouchableOpacity style={styles.ic_close} onPress={()=> this.closeModal(3)}>
                <Image style={{height: 20, width: 20}} source={require('../../images/icons/ic_close_white.png')}/>
              </TouchableOpacity>
              <ImageZoom style={{height: deviceWidth-50, width: deviceWidth-50} } source={{uri: this.state.dataZoom}}/>
            </View>
          </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  ic_close: {
    position: 'absolute',
    top: 20,
    right: 0,
    padding: 5,
  },
  icCamera: {
    width: 30,
    height: 45*30/57
  },
  modal1: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalZoom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
  },
  txtMesse: {
    color: '#2e313c'
  },
  txtUserName: {
    color: '#e45513'
  },
  txtUserName1: {
    color: '#752b90'
  },
  containerMesse: {
    backgroundColor: '#ffe5d9',
    borderRadius: 5,
    marginTop: 5,
    marginRight: 5
    // padding: 7,
    // marginRight:10,
  },
  txtColor: {
    fontSize: 16,
    color:'#d0021b'
  },
  txtColor1: {
    fontSize: 16,
    color:'#f5a623',
  },
  txtColor2: {
    fontSize: 16,
    color:'#9013fe'
  },
  txtColor3: {
    fontSize: 16,
    color:'#8b572a'
  },
  containerMesse1: {
    backgroundColor: '#f3d2ff',
    borderRadius: 5,
    marginTop: 5,
    marginRight: 5
    // padding: 7,
    // marginRight:10,
  },
  navIcon: {
    width: 20,
    height: 20
  },
  txtMesse: {
    margin: 7, 
  },
  backIcon: {
    width: 13,
    height: 20
  },
  navButton: {
    justifyContent: 'center',
    height: 56,
    width: 40
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 20,
  },
  scrollView: {
    width: deviceWidth,

  },
  itemListGuest: {
    marginTop: 10,
    paddingBottom: 7,
    marginBottom: 3,
    width: deviceWidth/3-20,
    alignItems: 'center'
  },
  avatarGuest: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  userNameGuest: {
    color: '#4a4a4a'
  },
  nameGuest: {
    fontSize: 13,
    color: '#4a90e2'
  },
  itemComment: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 15,
    marginLeft: 5,
  },
  itemCommentMember: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 5
  },
  boxProContent: {
    paddingBottom: 5,
    paddingTop: 5,
    width: deviceWidth-20,
  },
  listGuest: {
    alignItems: 'center'
  },
  containerMember: {
     paddingBottom: 5,
     paddingTop: 5,
  },
  containerContent: {
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 20
  },
  title: {
    fontSize: 22,
    color: '#da4864',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  thumbnail: {
    width: deviceWidth,
    height: deviceWidth*312/820,
  },
  boxPro: {
    padding: 10,
    paddingLeft: 15
  },
  labelPro: {
    color: '#5d5d5d',
    paddingBottom: 10

  },
  containerActive: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itempro: {
    width: deviceWidth/3 - 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  proAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  proName: {
    color: '#0164b3',
    padding: 5
  },
  proKey: {
    color: '#5d5d5d',
  },
  boxStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 5
  },
  status: {
    marginRight: 5,
    color: '#5d5d5d',
  },
  count: {
    color: '#5d5d5d',
  },
  titleRelatedProducts: {
    height: 35,
    backgroundColor: '#b37384',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  colorWhite: {
    color: '#FFFFFF',
  },
  proContentAvatar: {
    padding: 5,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  boxFormSubmit: {
    // backgroundColor: 'red',
    //height: 40,
    width: deviceWidth,
    alignItems: 'center',
    flexDirection: 'row'
  },
  formInput: {
    flex: 1,
  },
  containerCamera: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  btnSend: {
    width: 26,
    height: 26,
    padding: 10,
    margin: 8
  },
  modal: {
  },
  btnCloseModal: {
    position: 'absolute',
    top: 80,
    right: 10,
    zIndex: 9999
  },
  iconCloseModal: {
    width: 30,
    height: 30
  },
  rowNamePro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  time: {
    color: '#5d5d5d',
  },
  iconExpand: {
    width: 16,
    height: 16
  },
  showMore: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  txtShowMore: {
    color: '#015fa9',
    fontSize: 14
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  image_thumb: {
    width: 50,
    height: 50,
    position: 'relative'
  },
  iconClose: {
    width: 20,
    height: 20,
  },
  buttonClose: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  imgCommentList: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imgCommentThumb: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  scrollViewModal: {
    flex: 1,
  },
  rowEmpty: {
    width: deviceWidth,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputSearch: {
    height: 45,
    flex: 1,
    paddingLeft: 20,
    color: '#000000',
  },
  rowUser: {
    borderTopWidth: 1,
    borderColor: '#eaeaea'
  },
  tagUser: {
    backgroundColor: '#ffffff',
  },
  user: {
    margin: 10,
    paddingRight: 5,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#d5dbdd'
  },
  boxModal: {
    width: deviceWidth,
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewName: {
    flexWrap: 'wrap',
    paddingRight: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
});
let main = require('../../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(HotDebateDetail);
