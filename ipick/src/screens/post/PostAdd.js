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
  TextInput,
  Dimensions
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import PostBlank from './PostBlank';
import PostImage from './PostImage';
import PostLink from './PostLink';
import PostVideo from './PostVideo';
import PostAudio from './PostAudio';
import PostArticle from './PostArticle';
//import RNFirebase from 'react-native-firebase';
import RNFirebase from 'react-native-firebase';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let css = require('../../Css');
var Modal = require('react-native-modalbox');


class PostAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // openModal: false,
      action: 'image',
    }
  }

  componentWillMount() {
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("Post_Screen");
  }

  renderType() {
    switch(this.state.action) {
      case 'image':
        return <PostImage scroll={() => this.refs.scroll.scrollTo({x: 0, y: 0, animated: true})} />
      case 'link':
        return <PostLink scroll={() => this.refs.scroll.scrollTo({x: 0, y: 0, animated: true})} />
      case 'video':
        return <PostVideo scroll={() => this.refs.scroll.scrollTo({x: 0, y: 0, animated: true})} />
      case 'audio':
        return <PostAudio scroll={() => this.refs.scroll.scrollTo({x: 0, y: 0, animated: true})} />
      default:
        return <PostArticle scroll={() => this.refs.scroll.scrollTo({x: 0, y: 0, animated: true})} />
      }
    
  }

  setAction(action) {
    this.setState({
      action: action, 
      openModal: false
    })
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
              <Text style={css.txtTitle}>Bài viết mới</Text>
            </View>
          </NavGroup>
          {/* <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Text style={css.txtSave}>Lưu nháp</Text>
            </NavButton>
            <NavButton onPress={() => this.send()} style={css.navBack}  >
            <Text style={css.txtSave}>Gửi</Text>
            </NavButton>
          </NavGroup> */}
        </NavBar>

        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
          ref='scroll'>
         
          <View style={styles.ctHeader}>
            <TouchableOpacity onPress={() => this.setState({action: 'image'})} style={[styles.ctItemHeader, {backgroundColor: this.state.action === 'image' ? 'rgb(0, 193, 125)' :  null}]}>
              <Text style={styles.txtItemHeader}>Ảnh</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this.setState({action: 'article'})} style={[styles.ctItemHeader, {backgroundColor: this.state.action === 'article' ? 'rgb(0, 193, 125)' :  null}]}>
              <Text style={styles.txtItemHeader}>Bài</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({action: 'link'})} style={[styles.ctItemHeader, {backgroundColor: this.state.action === 'link' ? 'rgb(0, 193, 125)' :  null}]}>
              <Text style={styles.txtItemHeader}>Link</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({action: 'video'})} style={[styles.ctItemHeader, {backgroundColor: this.state.action === 'video' ? 'rgb(0, 193, 125)' :  null}]}>
              <Text style={styles.txtItemHeader}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({action: 'audio'})} style={[styles.ctItemHeader, {backgroundColor: this.state.action === 'audio' ? 'rgb(0, 193, 125)' :  null}]}>
              <Text style={styles.txtItemHeader}>Audio</Text>
            </TouchableOpacity>
          </View>
         
          {
            this.renderType() 
          }

        </ScrollView>
        {/* <TouchableOpacity onPress={() => this.setState({openModal: true})} style={styles.ctBottom}>
          <Text style={styles.txtAdd}>Thêm vào bài viết của bạn</Text>
          <View>
            <Image style={styles.icBottom} source={require('../../images/icons/ic_picture.png')} />
          </View>
          <View >
            <Image style={styles.icBottom} source={require('../../images/icons/ic_play.png')} />
          </View>
          <View  >
            <Image style={styles.icBottom} source={require('../../images/icons/ic_comment_send.png')} />
          </View>
        </TouchableOpacity>
        <Modal 
          style={{height: 250}}
          isOpen={this.state.openModal}
          swipeToClose={true}
          position="bottom"
          animationDuration={200}
          backdropColor="rgb(0, 138, 139)"
          onClosed={()=> this.setState({openModal: false}) }>
            <PostBlank active={this.state.action} action={(action) => this.setAction(action)} closeModal={() => this.setState({openModal: false})} />
        </Modal> */}
      </View>
    )
  }
}

const styles= StyleSheet.create({
  ctHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgb(210, 210, 210)'
  },
  ctItemHeader: {
    flex: 1,
    alignItems: 'center',
    borderRightColor: '#fff',
    borderRightWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  txtItemHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
  // txtAdd: {
  //   color: 'rgb(51, 51, 51)',
  //   fontSize: 16,
  //   flex: 1
  // },
  // icBottom: {
  //   marginLeft: 10
  // },
  // ctBottom: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 15,
  //   borderTopColor: 'rgb(236, 238, 240)',
  //   borderTopWidth: 1
  // },
});
export default (PostAdd);


