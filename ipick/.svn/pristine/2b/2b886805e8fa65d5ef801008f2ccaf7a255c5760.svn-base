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
  Dimensions,
  TextInput
} from 'react-native';
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let css = require('../../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as postActions from '../../actions/postActions';
import * as exploreActions from '../../actions/exploreActions';
const actions = [
  postActions,
  exploreActions
];
function mapStateToProps(state) {
  return {
    post: state.post,
    explore: state.explore,
    profile: state.profile,
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

class EditAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.data.categories,
      tags: this.props.data.tags,
      title: this.props.data.title,
      content: this.props.data.content,
      error: null,
      audio: '',
      url_audio: this.props.data.atribute_radios,
      image: this.props.data.image_thumb,
      path: '',
      pickImage: null,
    }
  }

  componentWillMount() {
    this.props.actions.explore()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.post.title || nextProps.post.content) {
      this.setState({
        title: nextProps.post.title,
        content: nextProps.post.content
      })
    }
  }

  addCategory(category) {
    var arrCate = this.state.category;
    for(var i=0; i<= arrCate.length; i++) {
      if(arrCate[i] == category.id) {
        arrCate: arrCate.splice(i, 1);
        this.setState({
          category: arrCate,
        })
        return;
      }
    }
    arrCate: arrCate.unshift(category.id);
    this.setState({
      category: arrCate
    })
  }

  selectImage(){
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
      includeBase64: true
    }).then(image => {
      ImageResizer.createResizedImage(image.path, 600, 800, 'JPEG', 80).then((uri) => {
        // source = {uri: 'data:image/jpeg;base64,' + uri.uri, isStatic: true};
        this.setState({
          pickImage: true,
          image: uri.uri,
          path: uri.path
        })
      }).catch((er)=> {
      })
    }).catch(e => {});
  }

  addUrlVideo() {
    this.setState({
      error: null
    })
    if(this.state.audio == '') {
      this.setState({
        error: 'Bạn phải nhập đường dẫn Audio trước khi nhấn thêm'
      })
      this.refs.scroll.scrollTo({x: 0, y: 0, animated: true})
      return
    }
    var url = this.state.url_audio;
    var audio = this.state.audio;
    url.push(audio);
    this.setState({
      url_audio: url,
      audio: '',
    })
  }

  delUrl(index) {
    var url = this.state.url_audio;
    uri: url.splice(index, 1);
    this.setState({
      url_audio: url
    })
  }

  renderCategory() {
    var data = this.props.explore.explore.categories;
    var length= data.length;
    var dataView = [];
    var data1=[];
    var data2= [];
    for(const i= 0; i < length; i ++) {
      if(data[i].title.search(' ') == -1) {
        data1.unshift(data[i])
      }else data2.unshift(data[i])
    }
    var leng = data1.length >= data2.length ? data1.length : data2.length;
    for(const j= 0; j < leng; j ++) {
      dataView.push(
        <View key={j}>
          {
            data1[j] ?
              <TouchableOpacity onPress={() => this.addCategory(data1[j])}  style={[styles.ctCategory, this.state.category.indexOf(data1[j].id) != -1 ? {backgroundColor: 'rgb(0, 193, 125)'} : null]}>
                <Text style={{color: '#fff'}}>{data1[j].title}</Text>
              </TouchableOpacity>
            : null
          }
          {
            data2[j] ?
              <TouchableOpacity onPress={() => this.addCategory(data2[j])}  style={[styles.ctCategory, this.state.category.indexOf(data2[j].id) != -1 ? {backgroundColor: 'rgb(0, 193, 125)'} : null]}>
                <Text style={{color: '#fff'}}>{data2[j].title}</Text>
              </TouchableOpacity>
            : null
           }
        </View>
      )
    }
    return dataView;
  }

  send() {
    this.setState({error: null});
    dismissKeyboard();
    if(this.state.url_audio.length == 0) {
      
      this.setState({
        error: 'Bạn phải thêm Mã nhúng audio'
      })
      this.refs.scroll.scrollTo({x: 0, y: 0, animated: true})
      return
    }
    if(this.state.title == '') {
      
      this.setState({
        error: 'Bạn phải nhập tiêu đề'
      })
      this.refs.scroll.scrollTo({x: 0, y: 0, animated: true})
      return
    }
    if(this.state.image == '') {
      
      this.setState({
        error: 'Bạn phải chọn ảnh'
      })
      this.refs.scroll.scrollTo({x: 0, y: 0, animated: true})
      return
    }
   
    // title, content, category_ids, atribute_image, tags
    var data = {
      title: this.state.title,
      content: this.state.content,
      category_ids: this.state.category,
      tags: this.state.tags,
      atribute_link_radio: this.state.url_audio,
      image_upload: this.state.path
    }
    this.props.actions.editArticle(data, 'image', this.props.data.slug);

  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back.png')} />
            </NavButton>
            <View style={{marginLeft: 9,justifyContent: 'center'}}>
              <Text style={css.txtTitle}>Chỉnh sửa bài viết</Text>
            </View>
          </NavGroup>
        </NavBar>

        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
          ref='scroll'>
          <View style={{padding: 15}}>
          {
              this.state.error ?
                <Text style={[css.txtError, {marginBottom: 10}]}>{this.state.error}</Text>
              : null
            }
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => Actions.editHtml({title: this.state.title, content: this.state.content})} style={css.ctAddContent}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>Sửa nội dung</Text>
              </TouchableOpacity>
            </View>
            {
              this.state.url_audio.length != 0 ?
              <View style={styles.ctUrl}>
                {
                  this.state.url_audio.map((item, index) => {
                    return (
                      <View key={index} style={{flexDirection: 'row',paddingBottom: 3, alignItems: 'center', borderBottomColor: 'rgb(237, 239, 241)', borderBottomWidth: 1,}}>
                        <Text style={{flex: 1}}>{item}</Text>
                        <Text onPress={() => this.delUrl(index)} style={{color: 'blue', fontWeight: 'bold'}}>Xóa</Text>
                      </View>
                    )
                  })
                }
              </View>
              : null
            }

            <View style={{flexDirection: 'row', marginTop: 15}} >
              <View style={{flex: 1,height: 40, borderColor: 'rgb(237, 239, 241)', borderWidth: 1, borderRadius: 5, marginRight: 15}}>
                <TextInput
                  style={css.ctInputTags}
                  placeholder="Mã nhúng audio"
                  underlineColorAndroid="transparent"
                  autoGrow={true}
                  placeholderTextColor="rgb(194, 197, 208)"
                  onChangeText={(audio) => this.setState({audio: audio})}
                  value={this.state.audio}
                  autoCapitalize="none"
                  multiline={true}
                />
              </View>
              <TouchableOpacity onPress={() => this.addUrlVideo()} style={styles.ctImage}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>Thêm audio</Text>
              </TouchableOpacity>
            </View>
            



            {/* <View style={css.ctTitle}>
              <TextInput
                  style={css.ctInputTitle}
                  placeholder="Tiêu đề bài viết"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="rgb(194, 197, 208)"
                  onChangeText={(title) => this.setState({title: title})}
                  value={this.state.title}
                  autoCapitalize="none"
                />
            </View>
            <View style={css.ctContent}>
              <TextInput
                style={css.ctInputContent}
                placeholder="Nội dung..."
                underlineColorAndroid="transparent"
                autoGrow={true}
                placeholderTextColor="rgb(194, 197, 208)"
                onChangeText={(content) => this.setState({content: content})}
                value={this.state.content}
                autoCapitalize="none"
                multiline={true}
              />
            </View> */}
            <View style={css.ctTags}>
              <TextInput
                style={css.ctInputTags}
                placeholder="Tags: hà nội, khởi nghiệp, du lịch, ..."
                underlineColorAndroid="transparent"
                autoGrow={true}
                placeholderTextColor="rgb(194, 197, 208)"
                onChangeText={(tags) => this.setState({tags: tags})}
                value={this.state.tags}
                autoCapitalize="none"
                multiline={true}
              />
            </View>
          
            <View style={{flexDirection: 'row', marginTop: 15}} >
              <View style={{flex: 1}}>
              {
                this.state.image ?
                  <Image style={{height:50, width: 50 }} source={this.state.pickImage ? {uri: this.state.image} : {uri: this.state.image+ '_100x100.png'}} />
                : null
              }
              </View>
              <TouchableOpacity onPress={() => this.selectImage()} style={styles.ctImage}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>Sửa ảnh</Text>
              </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props.actions.explore()} style={styles.ctAddImage}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>Chọn chuyên mục</Text>
              </TouchableOpacity>
            </View>
            {
              this.props.explore.isFetching ?
              <View style={css.ctLoading}>
                <Image style={{width: 30, height: 30}} source={require('../../images/sending.gif')} />
                <Text style={{fontSize: 12, color: 'rgb(0, 193, 125)'}}>Đang tải chuyên mục...</Text>
              </View>
              :
              <View style={{flexWrap: 'wrap', flexDirection: 'row', marginTop: 15}}>
              { this.props.explore.explore ?
                  this.props.explore.explore.categories.length != 0 ?
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                      {this.renderCategory()}
                    </ScrollView>
                  : null
                : null
              }
              </View>
            }
            {
              this.props.post.loadPost ?
                <View style={css.ctLoading}>
                  <Image style={{width: 30, height: 30}} source={require('../../images/sending.gif')} />
                  <Text style={css.txtLoading}>Đang lưu bài</Text>
                </View>
              :
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                  <Button 
                    containerStyle={styles.btnSend}
                    style={styles.txtSend}
                    onPress={() => Actions.pop()}
                    >
                    Bỏ qua
                  </Button>
                  <Button 
                    containerStyle={styles.btnSend}
                    style={styles.txtSend}
                    onPress={() => this.send()}
                    >
                    Lưu bài
                  </Button>
                </View>
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  ctUrl: {
    borderRadius: 5,
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5
  },
  ctImage: {
    backgroundColor: 'rgb(0, 193, 125)',
    width: 100, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  ctItem: {
    borderWidth: 1,
    borderColor: 'rgb(191, 224, 216)',
    padding: 15,
    marginTop: 15,
    flexDirection: 'row'
  },
  ctInputLink: {
    padding: 0,
    flex: 1,
    fontSize: 16, 
    margin: 10,
    color: 'rgb(31, 42, 53)', 
  },
  ctGetLink: {
    backgroundColor: 'rgb(0, 139, 125)',
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  ctLink: {
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    flex: 1,
    marginRight: 15,
    borderRadius: 5
  },
  txtSend: {
    color: '#fff',
    fontSize: 16,
  },
  btnSend: {
    width: 100,
    height: 40,
    backgroundColor:"rgb(48, 88, 154)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  ctCategory: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding:5,
    marginRight: 5,
    marginBottom: 5
  },
  ctAddImage: {
    backgroundColor: 'rgb(0, 193, 125)',
    width: 200, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15
  },


});
export default connect(mapStateToProps, mapDispatchToProps)(EditAudio);


