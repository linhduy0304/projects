/**
 * Created by Mrbacdoan on 04/08/2016.
 */
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  AlertIOS
} from "react-native";

import {Actions} from "react-native-router-flux";
import Toast from 'react-native-simple-toast';
var AsyncStorge = require('react-native').AsyncStorge;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as profileActions from '../../actions/profileActions';
var Spinner = require('react-native-spinkit');
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-57146563-2');

const actions = [
  profileActions
];

function mapStateToProps(state) {
  return {
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


class ModalFeedBack extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors: '',
      content: '',
    };
  }

  onChange(field,value) {
    this.setState({
      content: value,
    })
  }

  btnFeedBack() {
    if(this.state.content == '') {
      Toast.show('Nội dung không được bỏ trống!')
      return;
    }
    let data = {
      content : this.state.content,
    }
    this.props.actions.feedBack(data);
  }

  componentDidMount(){
    tracker.trackScreenView('Feed Back: ');
  }

  render(){
    return (
      <View >
        <View style={styles.container}>
          <Text style={styles.text}>
            Góp ý & Báo lỗi
          </Text>
          <View style={styles.inputView}>
            <TextInput
                style={styles.input}
                placeholder="Nhập nội dung..."
                placeholderTextColor="#c3c3c3"
                underlineColorAndroid="transparent"
                value={this.state.content}
                onChangeText={(content) => this.onChange('content', content)}
                autoCorrect={false}
                multiline={true}
                autoFocus={true}
                />
          </View>
          <Text style={styles.errors}>
            {
              //this.props.profile.isError ? this.props.profile.error : ''
            }
          </Text>
          <TouchableHighlight onPress={ () => this.btnFeedBack()} style={styles.btnSumit} underlayColor='#d73554'>
            <Text style={styles.colorWhite}>Góp ý</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 20
  },
  input: {
    width: 250,
    height: 120,
    fontSize: 15,
    borderRadius: 7,
    marginBottom: 8,
    marginLeft: 5,
    paddingBottom: 90,
  },
  colorWhite: {
    color: '#FFFFFF'
  },
  btnSumit: {
    backgroundColor: "#b92626",
    alignItems: 'center',
    width: 250,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
    marginTop: 15
  },
  inputView: {
    borderWidth: 1,
    borderColor: "#e7eaf3",
    marginTop:20,
    padding: -1
  },
  text: {
    fontSize: 18,
    color: "#000000"
  },
  errors: {
    color: 'red',
    fontSize: 14,
    marginTop: 10
  }
});
let theme = require('../../services/Theme');
export default connect(mapStateToProps, mapDispatchToProps)(ModalFeedBack);
