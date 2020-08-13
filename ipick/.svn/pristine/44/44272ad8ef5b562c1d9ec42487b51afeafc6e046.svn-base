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
import { TextField } from 'react-native-material-textfield';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import {validateEmail} from '../../components/Functions'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import DatePicker from 'react-native-datepicker';
import NoInternet from '../../components/NoInternet'
//import RNFirebase from 'react-native-firebase';
import RNFirebase from 'react-native-firebase';

let css = require('../../Css');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as profileActions from '../../actions/profileActions';
const actions = [
  profileActions
];
function mapStateToProps(state) {
  return {
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

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: this.props.profile.currentUser.full_name,
      email: this.props.profile.currentUser.email,
      username: this.props.profile.currentUser.username,
      address: this.props.profile.currentUser.address,
      telephone: this.props.profile.currentUser.telephone,
      sex: this.props.profile.currentUser.sex ? this.props.profile.currentUser.sex : 1,
      birthday: this.props.profile.currentUser.birthday,
      job: this.props.profile.currentUser.job,
      avatar: this.props.profile.currentUser.avatar,
      pickImage: null,
      error: null
    }
  }

  componentWillMount() {
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("EditProfile_Screen");
  }

  selectImage(){
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
      includeBase64: true
    }).then(image => {
      ImageResizer.createResizedImage(image.path, 600, 800, 'JPEG', 80).then((uri) => {
        this.setState({
          avatar: uri.uri,
          pickImage: true
        });
        this.props.actions.updateAvatar(uri.path)
      }).catch((er)=> {
      })
    }).catch(e => {});
  }

  dateNow() {
    var date = new Date();
    var now = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
    return now;
  }

  update() {
    this.setState({error: null})
    dismissKeyboard()
    if(this.state.username == '') {
      this.setState({error: 'Bạn phải nhập Tên đăng nhập'})
      return;
    }
    var data = {
      full_name: this.state.full_name,
      username: this.state.username,
      address: this.state.address,
      telephone: this.state.telephone,
      sex: this.state.sex,
      birthday: this.state.birthday,
      job: this.state.job,
    }
    this.props.actions.updateProfile(data)
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
              <Text style={css.txtTitle}>Chỉnh sửa hồ sơ</Text>
            </View>
          </NavGroup>
        </NavBar>

        <NoInternet />
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <View style={styles.body}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 86, height: 84}}>
                <TouchableOpacity onPress={() => this.selectImage()} style={styles.ctCamera}>
                  <Image style={{width: 15, height: 15}} source={require('../../images/icons/ic_camera_black.png')} />
                </TouchableOpacity>
                <View style={styles.ctAvatar}>
                  <Image style={styles.avatar} source={this.state.pickImage ? {uri: this.state.avatar} :this.state.avatar ? {uri: this.state.avatar + '_100x100.png'} : require('../../images/avatar_default.png')} />
                </View>
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <TextField
                  label='Tên hiển thị'
                  onChangeText={(full_name) => this.setState({full_name: full_name})}
                  tintColor="rgb(47, 87, 153)"
                  textColor="rgb(31, 42, 53)"
                  baseColor="rgb(194, 196, 202)"
                  autoCapitalize="none"
                  selectionColor="rgb(41, 162, 104)"
                  value={this.state.full_name}
                />
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Text style={{color: 'rgb(194, 196, 202)'}} >Giới tính:</Text>
                  <View style={{marginLeft: 20}}>
                    <TouchableOpacity onPress={() => this.setState({sex: this.state.sex == 0 ? 1: 0})} style={styles.ctSex}>
                      <View style={styles.ctTick}>
                        {
                          this.state.sex == 1 ?
                            <Image source={require('../../images/icons/ic_check.png')}/>
                            : null
                        }
                      </View>
                      <Text style={{color: 'rgb(31, 42, 53)'}}>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({sex: this.state.sex == 0 ? 1: 0})} style={styles.ctSex}>
                      <View style={styles.ctTick}>
                      {
                        this.state.sex == 0 ?
                          <Image source={require('../../images/icons/ic_check.png')}/>
                          : null
                      }
                      </View>
                      <Text style={{color: 'rgb(31, 42, 53)'}}>Nữ</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
              </View>
            </View>

            <TextField
              label='Tên đăng nhập'
              onChangeText={(username) => this.setState({username: username})}
              tintColor="rgb(47, 87, 153)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 196, 202)"
              autoCapitalize="none"
              selectionColor="rgb(41, 162, 104)"
              value={this.state.username}
            />
            {
              this.state.error ?
              <Text style={css.txtError}>*** {this.state.error}</Text>
              : null
            }
            <TextField
              label='Email'
              onChangeText={(email) => this.setState({email: email})}
              tintColor="rgb(47, 87, 153)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 196, 202)"
              autoCapitalize="none"
              selectionColor="rgb(41, 162, 104)"
              editable={false}
              // containerStyle={{backgroundColor: 'red'}}
              value={this.state.email}
            />
            <TextField
              label='Công việc'
              onChangeText={(job) => this.setState({job: job})}
              tintColor="rgb(47, 87, 153)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 196, 202)"
              autoCapitalize="none"
              selectionColor="rgb(41, 162, 104)"
              value={this.state.job}
            />
            <TextField
              label='Địa chỉ'
              onChangeText={(address) => this.setState({address: address})}
              tintColor="rgb(47, 87, 153)"
              textColor="rgb(31, 42, 53)"
              baseColor="rgb(194, 196, 202)"
              autoCapitalize="none"
              selectionColor="rgb(41, 162, 104)"
              value={this.state.address}
            />
            <TextField
              label='Số điện thoại'
              onChangeText={(telephone) => this.setState({telephone: telephone})}
              tintColor="rgb(47, 87, 153)"
              textColor="rgb(31, 42, 53)"
              keyboardType='numeric'
              baseColor="rgb(194, 196, 202)"
              autoCapitalize="none"
              selectionColor="rgb(41, 162, 104)"
              value={this.state.telephone}
            />
             <View style={styles.ctInput}>
                {/* <Text style={styles.txtEmail}>Ngày sinh</Text> */}
                <DatePicker
                  style={{width: deviceWidth- 30}}
                  // date={(this.props.profile.currentUser.birthday)}
                  date={this.state.birthday}
                  mode="date"
                  placeholder="Ngày sinh"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minDate='01-01-1900'
                  maxDate={this.dateNow()}
                  onDateChange={(birthday) => this.setState({birthday: birthday})}
                  customStyles={
                    {dateInput: {
                      borderWidth: 0,
                      alignItems:'flex-start',
                      flex: 1,
                    },
                    placeholderText:{color:'#c2c5d0',fontSize: 15}
                  }}
                />
              </View>
            
            <View style={{alignItems: 'center', marginTop: 20}}>
            {
              this.props.profile.loading ?
               <View style={css.ctLoading}>
                  <Image style={{width: 30, height: 30}} source={require('../../images/sending.gif')} />
                  <Text style={css.txtLoading}>Đang lưu</Text>
                </View>
              :
                <Button 
                  containerStyle={styles.btnSend}
                  style={styles.txtSend}
                  onPress={() => this.update()}
                  >
                  Lưu thay đổi
                </Button>
            }
           </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  txtSend: {
    color: '#fff',
    fontSize: 16,
  },
  btnSend: {
    width: 120,
    marginTop: 15,
    height: 40,
    backgroundColor:"rgb(48, 88, 154)", 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  ctSex: {
    flexDirection: 'row',
    padding: 5,
  },
  ctTick: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10
  },
  ctCamera: {
    position: 'absolute', 
    zIndex: 2, 
    bottom: 4, 
    right: 4,
    width: 30,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctAvatar: {
    borderWidth: 3,
    borderColor: 'rgb(0, 193, 125)',
    borderRadius: 4
  },
  ctInput: {
    borderBottomColor: 'rgb(228, 232, 242)',
    borderBottomWidth: 1,
  },
  // txtEmail: {
  //   padding: 0,
  //   flex: 1,
  //   marginLeft: 10,
  //   color: 'rgb(31, 42, 53)', 
  // },
  body: {
    padding: 15,
    paddingBottom: 30
  },
  avatar: {
    height: 80, 
    width: 80,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);


