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
  TextInput
} from 'react-native';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

let css = require('../../Css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as postActions from '../../actions/postActions';
const actions = [
  postActions,
];
function mapStateToProps(state) {
  return {
    post: state.post,
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

class EditHtml extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content:this.props.content,
      title:this.props.title,
      error: null,
      loading: null
    },
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    // this.getHTML();
  }

  // async getHTML() {
  //   const titleHtml = await this.richtext.getTitleHtml();
  //   const contentHtml = await this.richtext.getContentHtml();
  // }

  async getHTML() {
    const a = await this.richtext.getTitleHtml();
    const b = await this.richtext.getContentHtml();
    // console.log(a)
    this.setState({
      title: a,
      content: b
    }) 
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      // this.getHTML();
    });
    this.richtext.setContentFocusHandler(() => {
      // this.getHTML();
    });
  }

  save() {
    this.getHTML()
    dismissKeyboard()
    this.setState({
      loading: true
    })
    setTimeout( () => {
      // console.log(this.state.title, this.state.content)
      this.props.actions.saveContent(this.state.title, this.state.content)
    }, 100)
    // this.props.actions.saveContent(this.state.title, this.state.content)
  }

  back() {
    dismissKeyboard()
    Actions.pop()
  }

  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => this.back()} style={css.navBack}  >
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back.png')} />
            </NavButton>
            <View style={{marginLeft: 9,justifyContent: 'center'}}>
              <Text style={css.txtTitle}>Bỏ qua</Text>
            </View>
          </NavGroup>
          <NavButton onPress={() => this.save()} style={css.navSearch}>
            <Text style={css.txtTitle}>Lưu</Text>
          </NavButton>
        </NavBar>
        <View style={styles.body}>
          {
            this.state.loading ?
            <View style={[css.ctLoading, {paddingBottom: 15}]}>
              <Image style={{width: 30, height: 30}} source={require('../../images/sending.gif')} />
              <Text style={css.txtLoading}>Đang xử lý</Text>
            </View>
            : null
          }
          <View style={{flex: 1, paddingRight: 15}}>
          
            <RichTextEditor
                ref={(r)=>this.richtext = r}
                style={styles.richText}
                initialTitleHTML={this.state.title}
                initialContentHTML={this.state.content}
                editorInitializedCallback={() => this.onEditorInitialized()}
            />
           
           
          </View>
          <RichTextToolbar
              getEditor={() => this.richtext}
            />
          {
            this.state.error ?
            <View style={{marginTop: 20}}>
              <Text style={css.txtError}>{this.state.error}</Text>
            </View>
            : null
          }
        </View>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  ctInputContent: {
    padding: 0,
    flex: 1,
    fontSize: 16, 
    color: 'rgb(31, 42, 53)', 
  },
  ctContent: {
    height: 150,
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 5,
    padding: 5
  },

  txtRegister: {
    color: '#fff',
    fontSize: 16,
  },
  btnRegister: {
    marginTop: 30,
    height: 48,
    backgroundColor:"rgb(48, 88, 154)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  txtTip: {
    color: 'rgb(51, 51, 51)',
    fontSize: 15,
    marginTop: 12
  },
  body: {
    // padding: 15,
    flex: 1
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditHtml);


