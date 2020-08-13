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

class PostLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_url: '',
      description_share: '',
      title_share: '',
      image_share: '',
      category: [],
      tags: '',
      title: '',
      content: '',
      error: null,
      errorLink: null,
      link: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.post.title || nextProps.post.content) {
    //   this.setState({
    //     title: nextProps.post.title,
    //     content: nextProps.post.content
    //   })
    // }
    if(nextProps.post != this.props.post) {
      this.setState({
        errorLink: nextProps.post.errorLink,
      })
    }
    if(nextProps.post.link && this.props.post.link != nextProps.post.link) {
      this.setState({
        full_url: nextProps.post.link.full_url,
        description_share: nextProps.post.link.description,
        title_share: nextProps.post.link.title,
        image_share: nextProps.post.link.image,
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

  checkLink() {
    this.setState({
      error: null,
    })
    dismissKeyboard();
    if(this.state.link == '') {
      this.setState({
        error: 'Bạn phải nhập link trước khi kiểm tra'
      })
      return;
    }
    this.props.actions.getLink(this.state.link)
  }

  send() {
    this.setState({error: null});
    dismissKeyboard();
    if(this.state.link == '') {
      
      this.setState({
        error: 'Bạn phải nhập đường dẫn'
      })
      this.props.scroll()
      return
    }
    if(this.props.post.link == null) {
      this.setState({
        error: 'Bạn phải nhập đúng đường dẫn. Nhấn kiểm tra'
      })
      this.props.scroll()
      return
    }
    // title, content, category_ids, atribute_image, tags
    var data = {
      title: this.state.title,
      content: this.state.content,
      category_ids: this.state.category,
      tags: this.state.tags,
      link_url: this.state.full_url,
      image_share: this.state.image_share,
      title_share: this.state.title_share,
      description_share: this.state.description_share,
      full_url: this.state.full_url,
    }
    this.props.actions.postLink(data, 'link');
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

  render() {
    return (
      <View style={{padding: 15}}>
        {
          this.state.error ?
            <Text style={[css.txtError, {marginBottom: 10}]}>{this.state.error}</Text>
          : null
        }

        {/* <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => Actions.editHtml({title: this.state.title, content: this.state.content})} style={css.ctAddContent}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>Thêm nội dung</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={styles.ctLink}>
            <TextInput
              style={styles.ctInputLink}
              placeholder="Link"
              underlineColorAndroid="transparent"
              placeholderTextColor="rgb(194, 197, 208)"
              onChangeText={(link) => this.setState({link: link})}
              value={this.state.link}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity onPress={() => this.checkLink()} style={styles.ctGetLink}>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: '#fff'}}>Kiểm tra</Text>
          </TouchableOpacity>
        </View>
        {
          this.state.errorLink ?
            <View style={css.ctLoading}>
              <Text style={css.txtLoading}>Link không tồn tại.Vui lòng thử lại</Text>
            </View>
            : null
        }
        {
          this.props.post.loadLink ? 
            <View style={css.ctLoading}>
              <Image style={{width: 30, height: 30}} source={require('../../images/sending.gif')} />
              <Text style={css.txtLoading}>Đang lấy nội dung link</Text>
            </View>
          :
          this.props.post.link ?
            <View style={styles.ctItem}>
              <Image style={{height: 80, width: 80}} source={{uri: this.props.post.link.image}} />
              <View style={{flex: 1, marginLeft: 15}}>
                <Text style={{color: 'rgb(51, 51, 51)', fontSize: 16}}>{this.props.post.link.title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <View style={{height: 24, width: 24, borderRadius: 12, backgroundColor: 'rgb(216, 216, 216)'}}/>
                  <Text style={{fontSize: 12, color: 'rgb(155, 155, 155)', marginLeft: 5}}>{this.props.post.link.domain}</Text>
                </View>
              </View>
            </View>
          : 
          null
        }
        
        <View style={css.ctTitle}>
          <TextInput
            style={css.ctInputTitle}
            placeholder="Tiêu đề khác"
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
        </View>

        <View>
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
          />
        </View>
      
        
        {
          this.props.post.loadPost ?
            <View style={css.ctLoading}>
              <Image style={{width: 30, height: 30}} source={require('../../images/sending.gif')} />
              <Text style={css.txtLoading}>Đang đăng bài</Text>
            </View>
          :
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
              {/* <Button 
                containerStyle={styles.btnSend}
                style={styles.txtSend}
                onPress={() => null}
                >
                Lưu nháp
              </Button> */}
              <Button 
                containerStyle={styles.btnSend}
                style={styles.txtSend}
                onPress={() => this.send()}
                >
                Đăng
              </Button>
            </View>
        }
      </View>
    )
  }
}

const styles= StyleSheet.create({
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
    backgroundColor: 'rgb(0, 193, 125)',
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  ctLink: {
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    flex: 1,
    height: 40,
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
    backgroundColor: '#b3b3b3',
    width: 200, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PostLink);


