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
  Keyboard,
  Animated,
  Picker,
  KeyboardAvoidingView
  // Modal
} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-datepicker';
import FMPicker from '../libs/react-native-select-option/FMPicker';

let ConstantSystem = require('../services/ConstantSystem');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Modal = require('react-native-modalbox');
let shareOptions = {
  title: "React Native",
  message: "Hola mundo",
  url: "http://facebook.github.io/react-native/",
  subject: "Share Link" //  for email
};

import YouTube from 'react-native-youtube';
import ModalSearch from '../components/ModalSearch'
import BoxVideo from '../components/magazine/BoxVideo';
import Input from '../components/spa/Input';
import InputDoctor from '../components/spa/InputDoctor';
import InputNumber from '../components/spa/InputNumber';
import InputNote from '../components/spa/InputNote';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as homeActions from '../actions/homeActions';

const actions = [
  homeActions,
];
function mapStateToProps(state) {
  return {
    home: state.home,
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

class SpaBooking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      show: null,
      isCheck: 0,
      showBranch: null,
      showTime: null,
      showTech: null,
      time: 'Thời gian',
      service: 'Dịch vụ',
      branch: 'Chi nhánh',
      tech: 'Kỹ thuật viên',
      techId: null,
      // mobile: '',
      note: '',
      date: null,
      email: null,
      mobile: this.props.profile.currentUser ? this.props.profile.currentUser.telephone : null,
      note: null,
      timeList: [
       
        {
          title: '9-00',
        },
        {
          title: '10-00',
        },
        {
          title: '11-00',
        },
        {
          title: '14-00',
        },
        {
          title: '15-00',
        },
        {
          title: '16-00',
        },
        {
          title: '17-00',
        },
        
      ],
      branchList: [
        {
          title: 'Hà Nội',
        },
        {
          title: 'Đà Nẵng',
        },
        {
          title: 'Sài Gòn',
        },

      ],
      techList: [
        {
          id: 1,
          title: 'Kĩ thuật viên 1',
        },
        {
          id: 2,
          title: 'Kĩ thuật viên 2',
        },
      ],
      serviceList: [
        {
          title: 'Chăm sóc da',
        },
        {
          title: 'Tẩy da chết',
        },
        {
          title: 'Nặn mụn',
        },
        {
          title: 'Tắm trắng',
        },
      ],
    }
  }

  show(type) {
    switch(type) {
      case 'service':
        this.setState({
          show: this.state.show ? null : true,
        });
        return;
      case 'isCheck':
        this.setState({
          isCheck: this.state.isCheck === 1 ? 0 : 1,
        });
        return;
      case 'time':
        this.setState({
          showTime: this.state.showTime ? null : true,
        })
        return;
      case 'tech':
        this.setState({
          showTech: this.state.showTech ? null : true,
        })
        return;
      default:
        this.setState({
          showBranch: this.state.showBranch ? null : true,
        })
        return;
    }
  }

  setTech(tech) {
    this.setState({
      showTech: false,
      tech: tech.title,
      techId: tech.id
    })
  }

  setService(name) {
    this.setState({
      show: false,
      service: name
    })
  }

  setBranch(name) {
    this.setState({
      showBranch: false,
      branch: name
    })
  }

  setTime(name) {
    this.setState({
      showTime: false,
      time: name
    })
  }

  dateNow() {
    var date = new Date();
    var now = date.getDate()+'-'+(parseInt(date.getMonth())+1)+'-'+date.getFullYear();
    return now;
  }

  booking() {
    if(this.state.service === 'Dịch vụ' || this.state.time === 'Thời gian' || this.state.branch === 'Chi nhánh' || this.state.tech === 'Kỹ thuật viên' || this.state.mobile == '') {
      Toast.show('Các trường không được để trống');
      return;
    }
    var data = {
      service: this.state.service,
      time: this.state.time,
      branch: this.state.branch,
      technician_id: this.state.techId,
      phone: this.state.mobile,
      note: this.state.note,
      is_doctor: this.state.isCheck
    }
    this.props.actions.booking(data)
  }

  render(){
    var _this = this;
    return (
      <View style={main.content}>
        <View style={[main.container]}>
          <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#d73554'}}></View>
          <NavBar style={{navBar: main.navBarRed, statusBar: main.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#d73554' }} >
            <NavButton/>
              <NavTitle>
                <Text style={{color: '#fff',fontWeight: '400' }}>Đặt lịch</Text>
              </NavTitle>
            <NavButton/>
            <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
              <Image style={{height: 17, width: 16}} source={require('../images/icons/ic_back_white.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.routineHistory()} style={{position: 'absolute', right: 0, padding: 15}}>
              <Text style={{color: '#fff',}}>Lịch sử đặt hẹn</Text>
            </TouchableOpacity>
          </NavBar>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0} style={{ flex: 1 }} >
            <ScrollView
              bounces={false}
              keyboardShouldPersistTaps={'always'}>
              <View style={styles.ctContent}>
              <Image style={{width: 156, height: 60,}} source={require('../images/logo_new.png')} />
              <Input
                title = {this.state.service}
                onPress={() => this.show('service')}
                source={require('../images/icons/ic_service.png')}
              />
              <Input
                title = {this.state.branch}
                onPress={() => this.show('branch')}
                source={require('../images/icons/ic_location.png')}
              />
              <Input
                title = {this.state.time}
                onPress={() => this.show('time')}
                source={require('../images/icons/ic_time.png')}
              />
              <Input
                title = {this.state.tech}
                onPress={() => this.show('tech')}
                source={require('../images/icons/ic_user.png')}
              />
              <InputDoctor
                onPress={() => this.show('isCheck')}
                isCheck = {this.state.isCheck}
                source={require('../images/icons/ic_doctor.png')}
              />
              <InputNumber
                // onPress={() => this.show('isCheck')}
                value={this.state.mobile}
                onChangeText = {(mobile) => this.setState({mobile})}
                source={require('../images/icons/ic_mobile.png')}
              />
              <InputNote
                onPress={() => this.show('isCheck')}
                value={this.state.note}
                onChangeText = {(note) => this.setState({note})}
                source={require('../images/icons/ic_mobile.png')}
              />
              
              
              
              {/* <View style={[styles.ctItem, {paddingTop: 5, paddingBottom: 5}]}>
                <DatePicker
                  style={{flex: 1}}
                  date={this.state.date}
                  mode="date"
                  placeholder="Ngày"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minDate={this.dateNow()}
                  maxDate='01-01-2100'
                  showIcon={false}
                  onDateChange={(date) => this.setState({date: date})}
                  customStyles={
                    {dateInput: {
                      borderWidth: 0,
                      color: 'rgb(194, 197, 208)',
                      alignItems:'flex-start'
                    },
                    dateIcon: {
                      height: 25,
                      width: 25,
                      marginRight: 10
                    },
                    placeholderText:{color: 'rgb(194, 197, 208)',fontSize: 16}
                  }}
                />
                <Input
                  title = {this.state.branch}
                  onPress={() => this.show('branch')}
                  source={require('../images/icons/ic_location.png')}
                />
                <Input
                  title = {this.state.time}
                  onPress={() => this.show('time')}
                  source={require('../images/icons/ic_time.png')}
                />
                <Input
                  title = {this.state.tech}
                  onPress={() => this.show('tech')}
                  source={require('../images/icons/ic_user.png')}
                />
                <InputDoctor
                  onPress={() => this.show('isCheck')}
                  isCheck = {this.state.isCheck}
                  source={require('../images/icons/ic_doctor.png')}
                />
                <InputNumber
                  // onPress={() => this.show('isCheck')}
                  value={this.state.mobile}
                  onChangeText = {(mobile) => this.setState({mobile})}
                  source={require('../images/icons/ic_mobile.png')}
                />
                <InputNote
                  onPress={() => this.show('isCheck')}
                  value={this.state.note}
                  onChangeText = {(note) => this.setState({note})}
                  source={require('../images/icons/ic_mobile.png')}
                />
                
                
                
                {/* <View style={[styles.ctItem, {paddingTop: 5, paddingBottom: 5}]}>
                  <DatePicker
                    style={{flex: 1}}
                    date={this.state.date}
                    mode="date"
                    placeholder="Ngày"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    minDate={this.dateNow()}
                    maxDate='01-01-2100'
                    showIcon={false}
                    onDateChange={(date) => this.setState({date: date})}
                    customStyles={
                      {dateInput: {
                        borderWidth: 0,
                        color: 'rgb(194, 197, 208)',
                        alignItems:'flex-start'
                      },
                      dateIcon: {
                        height: 25,
                        width: 25,
                        marginRight: 10
                      },
                      placeholderText:{color: 'rgb(194, 197, 208)',fontSize: 16}
                    }}
                  />
                  <Image source={require('../images/icons/ic_arrow_next_blue.png')} />
                </View> */}
                    
                {/* <TouchableOpacity onPress={() => this.showTime()} style={styles.ctItem}>
                  <Text style={[styles.txtItem, {color: this.state.time === 'Giờ' ? 'rgb(194, 197, 208)' : 'rgb(41, 42, 57)',}]}>{this.state.time}</Text>
                  <Image source={require('../images/icons/ic_arrow_next_blue.png')} />
                </TouchableOpacity> */}

                {/* <View style={styles.ctItem}>
                  <TextInput
                    placeholder='Số điện thoại'
                    placeholderTextColor='rgb(194, 197, 208)'
                    value={this.state.phone}
                    // onEndEditing={(e) => alert('oo')}
                    style={styles.txtInput}
                    keyboardType= 'numeric'
                    onChangeText={(phone) => this.setState({phone: phone})}
                    underlineColorAndroid='transparent'
                  />
                </View> */}

                {/* <View style={styles.ctItem}>
                  <TextInput
                    placeholder='Email'
                    placeholderTextColor='rgb(194, 197, 208)'
                    value={this.state.email}
                    style={styles.txtInput}
                    onChangeText={(email) => this.setState({email: email})}
                    underlineColorAndroid='transparent'
                  />
                </View>

                <View style={styles.ctItem}>
                  <TextInput
                    placeholder='Ghi chú'
                    placeholderTextColor='rgb(194, 197, 208)'
                    value={this.state.note}
                    style={styles.txtInput}
                    onChangeText={(note) => this.setState({note: note})}
                    underlineColorAndroid='transparent'
                  />
                </View> */}
                <View style={{alignItems: 'center'}}>
                  {
                    this.props.home.loadBooking ?
                      <View>
                        <Text style={{marginTop: 20, fontSize: 13, }}>Đang đặt lịch</Text>
                      </View>
                    :
                    <TouchableOpacity onPress={() => this.booking()} style={styles.ctBtn}>
                      <Text style={{fontSize: 17, color: '#fff',  fontWeight: 'bold'}}>Đặt lịch</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          
          <Modal
              isOpen={this.state.showTime}
              swipeToClose={false}
              position="center"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', width: deviceWidth- 60, height: deviceHeight- 300}}
              // entry="right"
              animationDuration={200}
              backdropColor="#000"
              onClosed={()=> this.setState({showTime: null}) }>
                <ScrollView style={styles.ctList}>
                  <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', padding: 15,}}>
                  {
                    this.state.timeList.map((item, index) => {
                      return (
                        <TouchableOpacity key={index} onPress={() => this.setTime(item.title)} style={styles.ctItemList}>
                          <Text style={styles.txtList}>{item.title}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                  </View>
                </ScrollView>
          </Modal>
        

          <Modal
              isOpen={this.state.show}
              swipeToClose={false}
              position="center"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', width: deviceWidth- 60, height: deviceHeight- 300}}
              // entry="right"
              animationDuration={200}
              backdropColor="#000"
              onClosed={()=> this.setState({show: null}) }>
                <ScrollView style={styles.ctList}>
                  <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', padding: 15,}}>
                  {
                    this.state.serviceList.map((item, index) => {
                      return (
                        <TouchableOpacity key={index} onPress={() => this.setService(item.title)} style={styles.ctItemList}>
                          <Text style={styles.txtList}>{item.title}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                  </View>
                </ScrollView>
          </Modal>
          <Modal
              isOpen={this.state.showBranch}
              swipeToClose={false}
              position="center"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', width: deviceWidth- 60, height: deviceHeight- 300}}
              // entry="right"
              animationDuration={200}
              backdropColor="#000"
              onClosed={()=> this.setState({showBranch: null}) }>
                <ScrollView style={styles.ctList}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',padding: 15,}}>
                  {
                    this.state.branchList.map((item, index) => {
                      return (
                        <TouchableOpacity key={index} onPress={() => this.setBranch(item.title)} style={styles.ctItemList}>
                          <Text style={styles.txtList}>{item.title}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                  </View>
                </ScrollView>
          </Modal>

          <Modal
              isOpen={this.state.showTech}
              swipeToClose={false}
              position="center"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', width: deviceWidth- 60, height: deviceHeight- 300}}
              // entry="right"
              animationDuration={200}
              backdropColor="#000"
              onClosed={()=> this.setState({showTech: null}) }>
                <ScrollView style={styles.ctList}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',padding: 15,}}>
                  {
                    this.state.techList.map((item, index) => {
                      return (
                        <TouchableOpacity key={index} onPress={() => this.setTech(item)} style={styles.ctItemList}>
                          <Text style={styles.txtList}>{item.title}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                  </View>
                </ScrollView>
          </Modal>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 
  ctBtn: {
    height: 45,
    width: deviceWidth-30,
    justifyContent: 'center',
    backgroundColor: '#d73554',
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  txtInput: {
    flex: 1,
    padding: 0,
  },
  txtList: {
    color: 'rgb(41, 42, 57)',
    fontSize: 18
  },
  ctItemList: {
    padding: 7,
    width: deviceWidth -90,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  ctList: {
    flex: 1,
    backgroundColor: '#fff'
  },
  txtItem: {
    flex: 1,
    fontSize: 15,
  },
  ctItem: {
    width: deviceWidth-30,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEEF0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13
  },
  ctContent: {
    flex: 1,
    padding: 15,
    paddingTop: 7,
    alignItems: 'center',
    paddingBottom: 30
    // backgroundColor: 'rgb(253, 233, 240)'
  },
});
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(SpaBooking);
