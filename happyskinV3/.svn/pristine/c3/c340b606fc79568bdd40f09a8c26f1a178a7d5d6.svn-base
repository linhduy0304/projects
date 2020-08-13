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
  Picker
} from "react-native";
import Button from "react-native-button";
import Toast from 'react-native-simple-toast';
import {Actions} from "react-native-router-flux";
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
import Spinner from "react-native-spinkit";
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ 'Cancel', 'Thư viện', 'Máy ảnh', ]
const title = 'Which one do you like?'

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';
import Switch from 'react-native-switch-pro'

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var DeviceInfo = require('react-native-device-info');

import * as profileActions from '../actions/profileActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';

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

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pickAvatar: false,
      avatar: this.props.profile.currentUser.avatar ? this.props.profile.currentUser.avatar : '',
      email: this.props.profile.currentUser.email ? this.props.profile.currentUser.email : '',
      displayName: this.props.profile.currentUser.full_name ? this.props.profile.currentUser.full_name : '',
      username: this.props.profile.currentUser.username ? this.props.profile.currentUser.username : '',
      phone: this.props.profile.currentUser.telephone ? this.props.profile.currentUser.telephone : '',
      address: this.props.profile.currentUser.address ? this.props.profile.currentUser.address : '',
      description: this.props.profile.currentUser.description ? this.props.profile.currentUser.description : '',
      gender: this.props.profile.currentUser.sex ? this.props.profile.currentUser.sex : 1,
      date: this.props.profile.currentUser.birthday ? this.convertBirthDay(this.props.profile.currentUser.birthday) : '',
    },
    this.handlePress = this.handlePress.bind(this)
  }

  pickAvatar(library){
    if(library){
      ImagePicker.openPicker({
        width: 800,
        height: 800,
        cropping: true,
        includeBase64: true
      }).then(image => {
        var source;
        // You can display the image using either:
        source = {uri: 'data:image/jpeg;base64,' + image.data, isStatic: true};
        this.setState({
          avatar: source,
          pickAvatar: true
        });
        this.onChange('avatar', source.uri);
      }).catch(e => {});
    }else{
      ImagePicker.openCamera({
        width: 800,
        height: 800,
        cropping: true,
        includeBase64: true
      }).then(image => {
        var source;
        // You can display the image using either:
        source = {uri: 'data:image/jpeg;base64,' + image.data, isStatic: true};
        this.setState({
          avatar: source,
          pickAvatar: true
        });
        this.onChange('avatar', source.uri);
      }).catch(e => {});
    }
    
  }

  handlePress(i) {
    if(i == 1){
       this.pickAvatar(true)
     }
     if(i == 2){
       this.pickAvatar(false)
     }
  }

  convertBirthDay(time) {
    var dt = time.split("-");
    return dt[2]+'-'+dt[1]+'-'+dt[0];
  }


  dateNow() {
    var date = new Date();
    var now = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
    return now;
  }

  editProfile(){
    dismissKeyboard();
    let dataUser = {
      avatar: this.state.pickAvatar ? this.state.avatar.uri : '',
      full_name: this.state.displayName,
      description: this.state.description,
      telephone: this.state.phone,
      address: this.state.address,
      date: this.state.date,
      sex: this.state.gender
    };
    this.props.actions.editProfile(dataUser);
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={main.container}>
          <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
              <View>
                <Text style={main.txtBack}>Quay lại</Text>
              </View>
            </NavButton>
            <NavButton onPress={() => this.editProfile()} style={main.navSave}>
              <Text style={{fontSize: 17, color: 'rgb(68, 110, 182)'}}>Lưu</Text>
            </NavButton>
          </NavBar>
          <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}>
            <Text style={{fontSize: 32, color: 'rgb(215, 53, 84)', marginLeft: 15, marginBottom: 5}}>Sửa thông tin</Text>
            <View>
              <Image style={styles.imgBg} source={require('../images/background_edit_profile.png')} />
              <View style={styles.ctAvatar}>
                <Image style={styles.avatar} source={this.state.pickAvatar ? this.state.avatar : (this.state.avatar ? {uri: this.state.avatar+'.png'} : require('../images/avatar_happyskin.png'))} />
              </View>
              <TouchableOpacity onPress={() => this.ActionSheet.show()} style={styles.ctCamera}>
                <Image style={styles.icCamera} source={require('../images/icons/ic_camera.png')} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.content}>
              <Text style={{color: 'rgb(135, 80, 161)'}}>THÔNG TIN HIỂN THỊ</Text>
              <TextField
                label='Họ và tên'
                autoCorrect={false}
                onChangeText={(displayName) => this.setState({displayName: displayName})}
                tintColor="rgb(90, 94, 111)"
                textColor="rgb(14, 14, 17)"
                baseColor="#c2c5d0"
                value={this.state.displayName}
              />
              <TextField
                label='Giới thiệu'
                autoCorrect={false}
                onChangeText={(description) => this.setState({description: description})}
                tintColor="rgb(90, 94, 111)"
                textColor="rgb(14, 14, 17)"
                baseColor="#c2c5d0"
                value={this.state.description}
              />
              <Text style={{color: 'rgb(135, 80, 161)', marginTop: 30}}>THÔNG TIN CÁ NHÂN</Text>

              <TextField
                label='Tên đăng nhập'
                editable={false}
                autoCorrect={false}
                onChangeText={(username) => this.setState({username: username})}
                tintColor="rgb(90, 94, 111)"
                textColor="rgb(14, 14, 17)"
                baseColor="#c2c5d0"
                value={this.state.username}
              />
              <TextField
                label='Email'
                editable={false}
                autoCorrect={false}
                onChangeText={(email) => this.setState({email: email})}
                tintColor="rgb(90, 94, 111)"
                textColor="rgb(14, 14, 17)"
                baseColor="#c2c5d0"
                value={this.state.email}
              />
              <TextField
                label='Số điện thoại'
                autoCorrect={false}
                keyboardType= 'numeric'
                onChangeText={(phone) => this.setState({phone: phone})}
                tintColor="rgb(90, 94, 111)"
                textColor="rgb(14, 14, 17)"
                baseColor="#c2c5d0"
                value={this.state.phone}
              />
              <TextField
                label='Địa chỉ'
                autoCorrect={false}
                onChangeText={(address) => this.setState({address: address})}
                tintColor="rgb(90, 94, 111)"
                textColor="rgb(14, 14, 17)"
                baseColor="#c2c5d0"
                value={this.state.address}
              />
              <View style={styles.ctEmail}>
                <Text style={styles.txtEmail}>Ngày sinh</Text>
                <DatePicker
                  style={styles.txtInput}
                  // date={(this.props.profile.currentUser.birthday)}
                  date={this.state.date}
                  mode="date"
                  placeholder="Ngày sinh"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minDate='01-01-1900'
                  maxDate={this.dateNow()}
                  showIcon={false}
                  onDateChange={(date) => this.setState({date: date})}
                  customStyles={
                    {dateInput: {
                      borderWidth: 0,
                      alignItems:'flex-start'
                    },
                    dateIcon: {
                      height: 25,
                      width: 25,
                      marginRight: 10
                    },
                    placeholderText:{color:'#c2c5d0',fontSize: 15}
                  }}
                />
              </View>
              <View style={[styles.ctEmail, {borderBottomWidth: 0}]}>
                <Text style={styles.txtEmail}>Giới tính</Text>
                <Picker
                  selectedValue={this.state.gender}
                  style={{borderBottomWidth: 0}}
                  onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                  <Picker.Item label="Nam" value="1" />
                  <Picker.Item label="Nữ" value="2" />
                  <Picker.Item label="Khác" value="3" />
                </Picker>
              </View>

              <Text style={{color: 'rgb(135, 80, 161)', marginTop: 30}}>MẠNG XÃ HỘI</Text>
              <Text style={{fontSize: 13, color: 'rgb(138, 138, 143)', marginTop: 10}}>Chọn hiển thị các tài khoản của bạn tại các mạng xã hội khác.</Text>
              <View style={styles.ctItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtFb}>Facebook</Text>
                  <Text style={styles.txtSub}>Lê Linh Duy</Text>
                </View>
                <Switch 
                  height={30}
                  width={55}
                  defaultValue={true}
                  backgroundActive={'rgb(68, 110, 182)'}
                  onSyncPress={value => console.log(value)}/>
              </View>
              <View style={styles.ctItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtFb}>Youtube</Text>
                  <Text style={styles.txtSub}>Lê Linh Duy</Text>
                </View>
                <Switch 
                  height={30}
                  width={55}
                  defaultValue={false}
                  backgroundActive={'rgb(68, 110, 182)'}
                  onSyncPress={value => console.log(value)}/>
              </View>
              <View style={styles.ctItem}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtFb}>Instagram</Text>
                  <Text style={styles.txtSub}>Lê Linh Duy</Text>
                </View>
                <Switch 
                  height={30}
                  width={55}
                  defaultValue={false}
                  backgroundActive={'rgb(68, 110, 182)'}
                  onSyncPress={value => console.log(value)}/>
              </View>
            </View>
              
              
          </ScrollView>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={options}
            cancelButtonIndex={CANCEL_INDEX}
            destructiveButtonIndex={DESTRUCTIVE_INDEX}
            onPress={this.handlePress}
          />
           {
            (this.props.profile.isFetching) ? 
              <View style={main.mainSpin}>
                <Spinner isFullScreen={true} isVisible={true} size={50} type={'Circle'} color={'#FFFFFF'}/>
              </View> : null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txtFb: {
    fontSize: 17,
    color: 'rgb(68, 110, 182)',
    fontWeight: 'bold'
  },
  txtSub: {
    color: 'rgb(133, 142, 152)',
    marginTop: 3
  },
  ctItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: 'rgb(228, 232, 242)',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FF974D'
  },
  ctEmail: {
    borderBottomColor: 'rgb(228, 232, 242)',
    borderBottomWidth: 1,
    marginTop: 10
  },
  txtEmail: {
    color: 'rgb(194, 197, 208)',
    fontSize: 12
  } ,
  ctCamera: {
    position: 'absolute',
    top: 137,
    height: 26,
    width: 26,
    borderRadius: 13,
    left: deviceWidth/2 + 38,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  icCamera: {
    height: 25,
    width: 25
  },
  txtBack: {
    color: '#fff',
    marginLeft: 5,
    backgroundColor: 'transparent'
  },

  imgBg: {
    height: 150,
    width: deviceWidth
  },
  content: {
    flex: 1,
    padding: 15,
    paddingBottom: 30,
    marginTop: 30
  },
  ctAvatar: {
    position: 'absolute',
    top: 60,
    left: deviceWidth/2 - 56,
    borderRadius: 57,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 114,
    width: 114,
  },
  avatar: {
    height: 106,
    width: 106,
    borderRadius: 53,
  },
});
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
