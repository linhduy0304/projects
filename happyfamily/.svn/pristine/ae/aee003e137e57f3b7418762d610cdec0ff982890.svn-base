

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
const window = Dimensions.get('window')
import {Actions} from 'react-native-router-flux';
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import css from '../../Css'
import { TextField } from 'react-native-material-textfield';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import Loading from '../../components/Loading';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import DatePicker from 'react-native-datepicker';
import Button from '../../components/Button'

import {updateProfile, updateAvatar} from '../../actions/profile'
import { connect } from 'react-redux'

class EditProfile extends React.Component {
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
        this.props.updateAvatar(uri.path)
      }).catch((er)=> {
      })
    }).catch(e => {});
  }

  dateNow() {
    var date = new Date();
    var now = date.getDate()+'-'+(1+date.getMonth())+'-'+date.getFullYear();
    return now;
  }

  update() {
    this.setState({error: null})
    dismissKeyboard()
    if(this.state.username == '') {
      this.setState({error: 'Bạn phải nhập Tên đăng nhập'})
      return;
    }
    var body = {
      full_name: this.state.full_name,
      username: this.state.username,
      address: this.state.address,
      telephone: this.state.telephone,
      sex: this.state.sex,
      birthday: this.state.birthday,
      job: this.state.job,
      email: this.state.email
    }
    this.props.updateProfile(body)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D'}}></View>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#C6247D'}} >
          <NavButton/>
          <NavTitle style={css.navTitle}>
            <Text style={css.txtTitle}>Chỉnh sửa cá nhân</Text>
          </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../../images/icons/ic_back.png')} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', right: 0, padding: 15}}>
            <Image source={require('../../images/icons/ic_edit.png')} />
          </TouchableOpacity> */}
        </NavBar>

         <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <View style={styles.body}>
            <View style={{flexDirection: 'row'}}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.ctAvatar}>
                  <Image style={styles.avatar} source={this.state.pickImage ? {uri: this.state.avatar} :this.state.avatar ? {uri: this.state.avatar + '_100x100.png'} : require('../../images/avatar_default.png')} />
                </View>
                <TouchableOpacity onPress={() => this.selectImage()} style={styles.ctCamera}>
                  <Image  source={require('../../images/icons/ic_camera_1.png')} />
                </TouchableOpacity>
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
                            <Image source={require('../../images/icons/ic_check_green.png')}/>
                            : null
                        }
                      </View>
                      <Text style={{color: 'rgb(31, 42, 53)'}}>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({sex: this.state.sex == 0 ? 1: 0})} style={styles.ctSex}>
                      <View style={styles.ctTick}>
                      {
                        this.state.sex == 0 ?
                          <Image source={require('../../images/icons/ic_check_green.png')}/>
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
                  style={{width: window.width- 30}}
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
               <Loading title='Đang lưu'/>
              :
                <Button 
                  title = 'Lưu thay đổi'
                  color = 'white'
                  width = {window.width-30}
                  onPress = {() => this.update()}
                  fontSize = {16}
                  fontWeight = '500'
                  backgroundColor = 'rgb(38, 114, 203)'
                  
                />
            }
           </View>
          </View>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    // position: 'absolute', 
    width: 30,
    height: 20,
    marginTop: 10
  },
  ctAvatar: {
    // borderWidth: 3,
    // borderColor: 'rgb(0, 193, 125)',
    // borderRadius: 4
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
    borderRadius: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (body) => dispatch(updateProfile(body)),
    updateAvatar: (path) => dispatch(updateAvatar(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);