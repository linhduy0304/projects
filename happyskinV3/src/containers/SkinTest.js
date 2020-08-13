import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
  Picker
} from "react-native";

// Google Analytic tracking
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
let tracker = new GoogleAnalyticsTracker('UA-57146563-2');


var windowSize = Dimensions.get('window');

import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
var Spinner = require('react-native-spinkit');
var Slider = require('react-native-slider');
import * as Progress from 'react-native-progress';
import Swiper from 'react-native-swiper';
import DatePicker from 'react-native-datepicker';
import PickerItem from '../libs/PickerItem';

import ConstantSystem from '../services/ConstantSystem';

import { TextField } from 'react-native-material-textfield';
import StepIndicator from 'react-native-step-indicator';

var windowSize = Dimensions.get('window');
var Modal = require('react-native-modalbox');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as skintestActions from '../actions/skintestActions';
const actions = [
  skintestActions
];
function mapStateToProps(state) {
  return {
    profile: state.profile,
    skintest: state.skintest
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

const dataGender = [
  {label: 'Nam', value: '0'},{label: 'Nữ', value: '1'}
];

const cities = ConstantSystem.cities;
class SkinTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      background: '../images/skin_info.png',
      alert1: false,
      alert2: false,
      modalFinished: false,
      isSubmit: false,
      back: true,
      isErrorAvatar: false,
      birthday: '',
      loadSlide: false,
      telephone: this.props.profile.currentUser.telephone ? this.props.profile.currentUser.telephone : '',
      gender: this.props.profile.currentUser.sex ? this.props.profile.currentUser.sex : 0,
      showGender: false,
      city: this.props.profile.currentUser.city ? this.props.profile.currentUser.city : 'an-giang',
      showCity: false,
      full_name: this.props.profile.currentUser.full_name ? this.props.profile.currentUser.full_name : '',
      job: this.props.profile.currentUser.job ? this.props.profile.currentUser.job : '',

    };
    this.swiper = Object;
  }

  componentWillMount() {

  }

  back() {
    if (this.state.back) {
      if (this.props.deepLink) {
        Actions.tab({ page: 'home', type: 'reset' });
      } else {
        Actions.pop();
      }
      this.setState({
        back: false
      })
      let _this = this;
      setTimeout(function () {
        _this.setState({
          back: true
        });
      }, 2000);
    }
  }

  componentDidMount() {
    if (this.props.skintest.questions.length == 0) {
      this.props.actions.loadDataSkintest();
    }
    if (this.props.profile.currentUser.birthday != '') {
      var birthday = this.convertDate(this.props.profile.currentUser.birthday);
      this.setState({ birthday: birthday });
    }
    // Google analytics
    tracker.trackScreenView('Doing Skintest: ');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.skintest !== this.props.skintest) {
      this.props.skintest = nextProps.skintest;
    }
    if (this.state.isSubmit) {
      this.setState({ isSubmit: false });
      if (nextProps.skintest.continuePage != -1) {
        var scroll = nextProps.skintest.continuePage - this.props.skintest.currentSlide - 1;
        this.swiper.scrollBy(scroll);
      }
    }
  }

  slidePrev() {
    var value = this.props.skintest.currentSlide > 1 ? this.props.skintest.currentSlide - 1 : 1;
    var scroll = this.props.skintest.currentSlide > 1 ? -1 : 0;
    if (scroll != 0) {
      this.swiper.scrollBy(scroll);
      //this.props.actions.slideChange(value);
    }
  }

  slideNext() {
    var value = this.props.skintest.currentSlide < 55 ? this.props.skintest.currentSlide + 1 : 55;
    var scroll = this.props.skintest.currentSlide < 55 ? 1 : 0;
    if (scroll == 1) {
      this.swiper.scrollBy(scroll);
      //this.props.actions.slideChange(value);
    }
  }

  checkPageDone() {
    var continuePage = -1;
    this.props.skintest.questions.map((question, index) => {
      if (question.value == -1 && continuePage == -1) {
        continuePage = index;
      }
    });
    return continuePage;
  }

  onMomentumScrollEnd(e, state, context) {
    var value = state.index + 1;
    if (value != this.props.skintest.currentSlide) {
      this.props.actions.slideChange(value);
    }
  }

  selectValue(question_id, value_answer) {
    var scroll = this.props.skintest.currentSlide < 55 ? 1 : 0;
    if (scroll == 1) {
      this.swiper.scrollBy(scroll);
    }
    if (this.props.skintest.currentSlide != 55) {
      this.props.actions.slideSelectValue(question_id, value_answer);
    }

    var page = this.checkPageDone();
    this.props.actions.storeLocal(this.props.skintest.questions, page);

    //comment vi bay gio co them cau 55 nhap ngay sinh
    if (scroll == 0 && page == -1) {
      Alert.alert(
        'Thông báo',
        'Bạn đã hoàn thành bài test.',
        [
          { text: 'Kiểm tra kết quả', onPress: () => this.saveSkintest(), style: 'cancel' },
          { text: 'Đóng', onPress: () => { }, style: 'cancel' },
        ]
      );
    }

    if (scroll == 0 && page != -1) {
      var scroll = page - this.props.skintest.currentSlide + 1;
      var pageIndex = page + 1;
      Alert.alert(
        'Thông báo',
        'Bạn chưa hoàn thành câu hỏi số ' + pageIndex + '?',
        [
          { text: 'Quay lại', onPress: () => { this.swiper.scrollBy(scroll) }, style: 'cancel' },
        ]
      );
    }

  }

  convertDate(date) {
    if (date != '' && typeof date != 'undefined') {
      var d = new Date(date);
      this.setState({
        birthday: d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
      })
      return d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    } else {
      return null;
    }
  }

  convertDate1(date) {
    if (date) {
      var date1 = date.split('-');
      var date2 = date1[2] + '-' + date1[1] + '-' + date1[0];
      return date2;
    }
    return date;
  }

  dateNow() {
    var date = new Date();
    var now = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    return now;
  }

  displayBirthday() {
    if (this.state.birthday == '') {
      if (this.props.profile.currentUser.birthday != '') {
        return this.convertDate(this.props.profile.currentUser.birthday);
      } else {
        return 'Nhập ngày sinh';
      }
    } else {
      return this.state.birthday;
    }
  }

  getValueDataSelect(type, value) {
    dataSelect = [];
    if (type == 'gender') {
      dataSelect = dataGender;
      for(var i = 0; i< dataSelect.length; i++) {
        if (dataSelect[i].value == value) {
          return dataSelect[i].label;
          break;
        }
      }
    }
    if (type == 'city') {
      dataSelect = cities;
      for(var i = 0; i< dataSelect.length; i++) {
        if (dataSelect[i].value == value) {
          return dataSelect[i].label;
          break;
        }
      }
    }
    
    return value;
  }

  convertDataCity() {
    var dataCities = [];
    for(var i = 0; i< cities.length; i++) {
      dataCities.push({name: cities[i].label, value: cities[i].value});
    }
    return dataCities;
  }

  onChangeBirthday(date) {
    this.setState({
      birthday: date
    });
  }

  chooseDate() {
    this.refs.date_picker.onPressDate();
  }

  renderItemPicker(data) {
    var view = [];
    for (var i = 0; i < data.length; i++) {
        const j = i;
        view.push(
            <Picker.Item label={data[j].name} value={data[j].key} key={data[j].key}/>
        )
    }
    return view;
}

  _renderQuestionNormal(question, index) {
    return (
        <View style={styles.viewContent} key={question.id}>
                  <ScrollView 
                  style={styles.scrollView}
                  >
                  <Image style={styles.background} source={{ uri: question.thumbnail+'.png' }}/>
                    <View style={styles.mainQuestion}>
                      <View style={styles.mainTitle}>
                        <Text style={styles.textStep}>{ this.props.skintest.currentSlide}.</Text>
                        <Text style={styles.questionTitle}>
                            {question.name}
                        </Text>
                      </View>
                      { question.answers.map((answer, key) => {
                        var actionBtn = key == question.value ? styles.answerSelectedBtn : {};
                        var actionTxt = key == question.value ? styles.answerSelectedTxt : {};
                         return <TouchableOpacity style={[styles.questionSelect,  actionBtn ]} key={key} onPress={() => this.selectValue(question.id, key) }>
                            <Text style={[styles.answerText, actionTxt ]}>
                              {answer.name}
                            </Text>
                          </TouchableOpacity>
                        })
                      }
                    </View>
                  </ScrollView>
        </View>
      );
  }

  _renderQuestionInfo() {
    return <View style={styles.viewContent} key='birthday'>
                          <ScrollView 
                          style={styles.scrollView}
                          >
                          <Image style={styles.background} source={ require('../images/skintest_birthday.png') }/>
                            <Text style={{margin: 15, color: '#dd556f'}}>Chúc mừng bạn đã hoàn thành bài Test da! Điền ngay thông tin để xem kết quả loại da của bạn.</Text>
                            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                               <TextField
                                  label='Họ tên'
                                  style={{paddingLeft: 10}}
                                  autoCorrect={false}
                                  onChangeText={(full_name) => this.setState({full_name: full_name}) }
                                  //onSubmitEditing={() => {} }
                                  // onEndEditing={(e) => this.setState({full_name: e.nativeEvent.text}) }
                                  tintColor="#5A5E6F"
                                  textColor="#0E0E11"
                                  baseColor="#E9457A"
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  value={this.state.full_name}
                              />

                              {
                                Platform.OS === 'android' ?
                                  <View style={ [styles.fieldBirthday, {borderBottomWidth: 0} ]}>
                                    <Text style={ styles.labelFieldSelectSmall }>Giới tính</Text>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        style={{ height: 50, width: windowSize.width - 30, borderWidth: 0 }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                                        <Picker.Item label="Nam" value={0} />
                                        <Picker.Item label="Nữ" value={1} />
                                      </Picker>
                                  </View>
                                :

                                <TouchableOpacity style={ styles.fieldBirthday } onPress={() => this.setState({showGender: true}) }>
                                  {
                                      this.state.gender == '' || this.state.gender == null ?
                                    <Text style={ styles.labelFieldSelectBig }>Giới tính</Text>
                                    :
                                    <View>
                                      <Text style={ styles.labelFieldSelectSmall }>Giới tính</Text>
                                      <Text style={ styles.valueFieldSelect }>{ this.getValueDataSelect('gender', this.state.gender) }</Text>
                                    </View>
                                  }
                                </TouchableOpacity>
                              }

                               <TouchableOpacity style={ styles.fieldBirthday } onPress={() => { this.chooseDate() } }>
                                 {
                                    this.state.birthday == '' || this.state.birthday == null ?
                                   <Text style={ styles.labelFieldSelectBig }>Ngày sinh</Text>
                                   :
                                   <View>
                                     <Text style={ styles.labelFieldSelectSmall }>Ngày sinh</Text>
                                     <Text style={ styles.valueFieldSelect }>{ this.state.birthday }</Text>
                                   </View>
                                 }
                              </TouchableOpacity>

                              <TextField
                                  label='Điện thoại'
                                  autoCorrect={false}
                                  style={{paddingLeft: 10}}
                                  onChangeText={(telephone) => this.setState({telephone: telephone}) }
                                  //onSubmitEditing={() => {} }
                                  // onEndEditing={(e) => this.setState({job: e.nativeEvent.text}) }
                                  tintColor="#5A5E6F"
                                  keyboardType = 'numeric'
                                  textColor="#0E0E11"
                                  baseColor="#E9457A"
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  value={this.state.telephone}
                              />

                              <TextField
                                  label='Nghề nghiệp'
                                  autoCorrect={false}
                                  style={{paddingLeft: 10}}
                                  onChangeText={(job) => this.setState({job: job}) }
                                  //onSubmitEditing={() => {} }
                                  // onEndEditing={(e) => this.setState({job: e.nativeEvent.text}) }
                                  tintColor="#5A5E6F"
                                  textColor="#0E0E11"
                                  baseColor="#E9457A"
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  value={this.state.job}
                              />

                              {
                                Platform.OS === 'android' ?
                                  <View style={ [styles.fieldBirthday, {borderBottomWidth: 0} ]}>
                                    <Text style={ styles.labelFieldSelectSmall }>Nơi sống</Text>
                                    <Picker
                                        selectedValue={this.state.city}
                                        style={{ height: 50, width: windowSize.width - 30, borderWidth: 0 }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
                                        {cities.map((item, index) => {
                                          return (
                                            <Picker.Item label={item.label} value={item.value} />
                                          )
                                        })}
                                      </Picker>
                                  </View>
                                :

                              <TouchableOpacity style={ styles.fieldBirthday } onPress={() => this.setState({showCity: true}) }>
                                {
                                    this.state.city == '' || this.state.city == null ?
                                   <Text style={ styles.labelFieldSelectBig }>Nơi sống</Text>
                                   :
                                   <View>
                                     <Text style={ styles.labelFieldSelectSmall }>Nơi sống</Text>
                                     <Text style={ styles.valueFieldSelect }>{ this.getValueDataSelect('city', this.state.city) }</Text>
                                   </View>
                                }
                              </TouchableOpacity>
                              }
                              {this.state.showGender &&
                                <PickerItem
                                  options={ dataGender }
                                  selectedOption={this.state.gender}
                                  boxDisplayStyles={main.mainPicker}
                                  modalVisible={this.state.showGender}
                                  onCancel={() => this.setState({showGender: false})}
                                  onSubmit={ (gender) => this.setState({ gender: gender, showGender: false }) }
                                />
                              }
                              
                              
                              {this.state.showCity &&
                                <PickerItem
                                  options={ cities }
                                  selectedOption={this.state.city}
                                  boxDisplayStyles={main.mainPicker}
                                  modalVisible={this.state.showCity}
                                  onCancel={() => this.setState({showCity: false})}
                                  onSubmit={ (city) => this.setState({ city: city, showCity: false }) }
                                />
                              }

                              <DatePicker
                                ref="date_picker"
                                style={{width: 200, fontSize: 16, opacity: 0}}
                                date={(this.state.birthday) ? this.state.birthday : this.convertDate(this.props.profile.currentUser.birthday)}
                                mode="date"
                                placeholder="Chọn năm sinh"
                                format="DD-MM-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minDate="01-01-1900"
                                maxDate={this.dateNow()}
                                onDateChange={(date) => this.onChangeBirthday(date)}
                                showIcon={false}
                                customStyles={{dateInput: {borderWidth: 0}}}
                                />
                            </View>

                            
                          </ScrollView>
                  </View>
  }

  _renderQuestionImage(question,index) {
    return (
                  <View style={styles.viewContent} key={question.id}>
                      <ScrollView style={styles.scrollView}>
                      <Image style={styles.background} source={{ uri: question.thumbnail+'.png' }}/>
                        <View style={styles.mainQuestion}>
                          <View style={styles.mainTitle}>
                                <Text style={styles.textStep}>{this.props.skintest.currentSlide}.</Text>
                                <Text style={styles.questionTitle}>
                                    {question.name}
                                </Text>
                              </View>

                          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}>
                            { question.answers.map((answer, key) => {
                                    var actionBtn = key == question.value ? styles.answerSelectedImg : {};
                                    var actionTxt = key == question.value ? styles.answerSelectedTxt : {};
                                   return <TouchableOpacity style={styles.questionSelectImg} key={key} onPress={() => this.selectValue(question.id, key) }>
                                      <Image style={styles.answerImage} source={{ uri: answer.image+'.png' }}/>
                                      <View style={[styles.answerImageView, actionBtn]}>
                                        <Text style={[styles.answerImageTxt, actionTxt]}>{ answer.name }</Text>
                                      </View>
                                    </TouchableOpacity>
                                  })
                                }
                          </View>
                        </View>
                      </ScrollView>
                  </View>
                );
  }

  _renderQuestionStep(question,index) {
    var value = parseInt(question.value);
    var currentPosition = value == -1 ? 4 : value;
    var stepIndicatorStyles = {
      stepIndicatorSize: 12,
      currentStepIndicatorSize:30,
      separatorStrokeWidth: 4,
      currentStepStrokeWidth: 5,
      stepStrokeCurrentColor: '#f9f9f9',
      separatorFinishedColor: '#D8D8D8',
      //separatorUnFinishedColor: value == -1 ?  '#D8D8D8' : '#F05522',
      separatorUnFinishedColor: '#F05522',
      stepIndicatorFinishedColor: '#D8D8D8',
      stepIndicatorUnFinishedColor: '#F05522',
      stepIndicatorCurrentColor: '#F05522',
      stepIndicatorLabelFontSize: 6,
      currentStepIndicatorLabelFontSize: 6,
      stepIndicatorLabelCurrentColor: '#F05522',
      stepIndicatorLabelFinishedColor: '#D8D8D8',
      stepIndicatorLabelUnFinishedColor: '#F05522',
      // labelColor: '#666666',
      // labelSize: 15,
      // currentStepLabelColor: '#fe7013'
    }
    labels = [{title: '10%'}, {title: '20%'}, {title: '30%'}, {title: '40%'}];
    return (
        <View style={styles.viewContent} key={question.id}>
                  <ScrollView 
                  style={styles.scrollView}
                  >
                  <Image style={styles.background} source={{ uri: question.thumbnail+'.png' }}/>
                    <View style={styles.mainQuestion}>
                      <View style={styles.mainTitle}>
                        <Text style={styles.textStep}>{ this.props.skintest.currentSlide}.</Text>
                        <Text style={styles.questionTitle}>
                            {question.name}
                        </Text>
                      </View>

                        <View style={{ flexDirection: 'row'}}>
                          <View style style={{width: 60}}>
                          </View>
                          <View style={styles.stepIndicator}>
                            <StepIndicator
                                    customStyles={stepIndicatorStyles}
                                    stepCount={question.answers.length}
                                    direction='vertical'
                                    currentPosition={currentPosition}
                                    //labels={labels.map(item => item.title)}
                                    onPress={  (index) => this.selectValue(question.id, index) }
                                    />
                          </View>
                          <View style={{ flex: 0.6,  justifyContent: 'space-between', }}>
                              { question.answers.map((answer, key) => {
                                  var actionBtn = question.value == key ? styles.questionSelectedStep : {};
                                  var actionTxt = question.value == key ? styles.answerSelectedStep : {};
                                   return <TouchableOpacity style={[styles.questionSelectStep,  actionBtn ]} key={key} onPress={() => this.selectValue(question.id, key)} >
                                      <Text style={[styles.answerSelectStep, actionTxt]} >{ answer.name }</Text>
                                    </TouchableOpacity>
                                  })
                                }
                          </View>
                        </View>

                    </View>
                  </ScrollView>
        </View>
      );
  }

  _renderProduct() {
    var questions = this.props.skintest.questions;
    if (questions.length > 0 ) {
      var question = {
        id: "birthday",
        name: "Ngày sinh của bạn",
        thumbnail: "",
        description: "",
        answers: [],
        value: 0
      }
      if (questions.length == 54) {
        questions = questions.concat([question]);
      }
          return questions.map((question, index) => {
            if (index+1 >= this.props.skintest.currentSlide-3 && index+1 <= this.props.skintest.currentSlide + 3){
           // if (true){
              // if (question.answers[0].image == '') {
              //   if (index != 54) {
              //     if (question.id == '56383fb47f8b9ad6058b4574') {
              //       return this._renderQuestionStep(question, index);
              //     } else {
              //      return this._renderQuestionNormal(question, index);
              //     }
              //   } else {
              //     return this._renderQuestionInfo();
              //   }
              // } else {
              //   return this._renderQuestionImage(question, index);
              // }
              if (question.type == 'normal') {
                return this._renderQuestionNormal(question, index);
              } else if (question.type == 'image') {
                return this._renderQuestionImage(question, index);
              } else if (question.type == 'step') {
                return this._renderQuestionStep(question, index);
              } else {
                return this._renderQuestionInfo();
              }
            }
          });
    } else {
      return null;
    }

  }

  saveSkintest() {
    // this.swiper.scrollBy(54)
    var birthday_convert = this.convertDate1(this.state.birthday ? this.state.birthday : this.props.profile.currentUser.birthday);
    var page = this.checkPageDone();
    if (page == -1 && this.state.birthday != '' && this.state.full_name != '' && this.state.job != '') {
      //this.refs.modalFinished.open();
      this.setState({ isSubmit: true, modalFinished: true });
      this.props.actions.saveResult(this.props.skintest.questions, this.state.birthday, birthday_convert, this.state.full_name, this.state.gender,  this.state.job, this.state.city);

    } else {
      // if (this.state.birthday == '' || this.state.full_name == '' || this.state.gender == '' || this.state.job == '' || this.state.city == '') {
      //   var scroll = 55 - this.props.skintest.currentSlide;
      // } else {
      //   var scroll = page - this.props.skintest.currentSlide + 1;
      // }
      if (page<54 && page!= -1) {
        var scroll = page - this.props.skintest.currentSlide + 1;
      } else {
        var scroll = 55 - this.props.skintest.currentSlide;
      }
      Alert.alert(
        'Thông báo',
        'Bạn chưa hoàn thành bài test?',
        [
          { text: 'Ok', onPress: () => { this.swiper.scrollBy(scroll); }, style: 'cancel' },
        ]
      );
    }
  }

  closeModal1() {
    this.refs.modalAlert1.close();
  }
  closeModal2() {
    this.refs.modalAlert2.close();
  }

  render() {
    return (
      <View style={main.content}>
        <View style={main.container}>
          <View style={{flex: 1}}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
                <NavButton onPress={() => Actions.pop()} style={{flexDirection: 'row',  alignItems: 'center',marginLeft: 0, padding: Platform.OS === 'ios' ? 7 : 15,}}>
                  <Image style={{height: 10, width: 16}} source={require('../images/icons/ic_back_blue.png')}/>
                  <Text style={{fontSize: 14, color: '#446EB6', marginLeft: 5}}>Quay lại</Text>
                </NavButton>
                <NavButton style={main.navSave} onPress={() => this.saveSkintest() } >
                    <Text style={styles.txtBack}>Kết quả</Text>
                </NavButton>
            </NavBar>

            <View style={styles.content}>
              <View style={styles.mainContent}>
                <View style={styles.header}>
                  <Text style={styles.txtHeader}>Kiểm tra da</Text>
                </View>
                {
                  this.props.skintest.questions.length > 0 ?
                    <Swiper loop={false} index={this.props.skintest.currentSlide - 1} ref={component => this.swiper = component}
                      onMomentumScrollEnd={(e, state, context) => this.onMomentumScrollEnd(e, state, context)}
                      removeClippedSubviews={false}
                      showsPagination={false}
                    >
                      {
                        this._renderProduct()
                      }
                    </Swiper>
                    : <View style={{ flex: 1, alignItems: 'center' }}><Text style={{ marginTop: 20 }}>Đang tải nội dung</Text></View>
                }
              </View>

              <View style={styles.footer}>
                <View style={styles.footerLeft}>
                  <View style={{alignItems: 'center', paddingBottom: 5}}>
                    {
                      this.props.skintest.currentSlide === 1 ?
                        null
                      :
                      <TouchableOpacity onPress={() => this.swiper.scrollBy(-1)} style={{position: 'absolute', left: 0, paddingRight: 20,}}>
                        <Image style={{width: 10, height: 18}} source={require('../images/icons/ic_arrow_back_blue.png')} />
                      </TouchableOpacity>
                    }
                    <Text style={styles.textProgress}>{this.props.skintest.currentSlide} trên 55 câu hỏi</Text>
                    {
                      this.props.skintest.currentSlide === 55 ?
                        null
                      :
                      <TouchableOpacity onPress={() => this.swiper.scrollBy(1)} style={{paddingLeft: 20,position: 'absolute', right: 0,}}>
                        <Image style={{width: 11, height: 18}} source={require('../images/icons/ic_next_blue.png')} />
                      </TouchableOpacity>
                    }
                    
                  </View>
                  <Progress.Bar 
                    progress={this.props.skintest.currentSlide/55} 
                    width={windowSize.width - 30} 
                    color="#e30052"
                    borderColor="white"
                    unfilledColor = "#e3e3e8"
                  />
                </View>

              </View>
              <Spinner isFullScreen={true} isVisible={this.props.skintest.isFetching} size={50} type={theme.SpinnerType} color={theme.SpinnerColor} />
            </View>
          </View>
        </View>
        {
          this.props.skintest.currentSlide == 18 && this.state.alert1 == false ?
            <Modal style={{}}
              isOpen={true}
              ref={"modalAlert1"}
              swipeToClose={true}
              onClosed={() => { this.setState({ alert1: true }) }}>
              <View style={{ flex: 1, }}>
                <Image style={styles.imageGif} source={{ uri: 'https://statics.happyskin.vn/images/others/skintest_2.gif' }} />
                <View style={styles.skinAlert}>
                  <Text style={styles.textAlertInfo}>
                    Ô la la, đã được 1/3 bài test rồi. Cùng đi tiếp nhé!
                      </Text>
                  <TouchableOpacity style={styles.btnAlert} onPress={() => this.closeModal1()}>
                    <Text style={styles.textAlertBtn}>Tiếp tục</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            :
            null
        }
        {
          this.props.skintest.currentSlide == 36 && this.state.alert2 == false ?
            <Modal style={{}}
              isOpen={true}
              ref={"modalAlert2"}
              swipeToClose={true}
              onClosed={() => { this.setState({ alert2: true }) }}>
              <View style={{ flex: 1 }}>
                <Image style={styles.imageGif} source={{ uri: 'https://statics.happyskin.vn/images/others/skintest_2.gif' }} />
                <View style={styles.skinAlert}>
                  <Text style={styles.textAlertInfo}>
                    Thật tuyệt vời, bạn đã hoàn thành 2/3 bài test rồi. Cố lên nào!
                      </Text>
                  <TouchableOpacity style={styles.btnAlert} onPress={() => this.closeModal2()}>
                    <Text style={styles.textAlertBtn}>Tiếp tục</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            :
            null
        }
        <Modal style={{}}
          isOpen={this.state.modalFinished}
          ref={"modalFinished"}
          swipeToClose={false}
          onClosed={() => { this.setState({ modalFinished: true }) }}
          backdrop={false}
          animationDuration={0}
        >
          <View style={styles.modalContent}>
            <Image source={(!this.state.isErrorAvatar && this.props.profile.currentUser.avatar != '')
              ? { uri: this.props.profile.currentUser.avatar + '_200x200.png' }
              : require('../images/avatar.png')}
              style={styles.modalAvatar}
              onError={(e) => { this.setState({ isErrorAvatar: true }) }} />

            <Text style={styles.modalTitle}>
              Chúc mừng {this.props.profile.currentUser.full_name}
            </Text>
            <Text style={styles.modalText}>
              đã hoàn thành xong bài kiểm tra da. Xin hãy đợi kết quả trong giây lát...
                  </Text>
            <View>
              <Spinner isVisible={true} size={50} type='ThreeBounce' color={theme.SpinnerColor} style={{ backgroundColor: '#d73554' }} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

let styles = require('../styles/SkinTest');
let main = require('../styles/Main');
let theme = require('../services/Theme');

export default connect(mapStateToProps, mapDispatchToProps)(SkinTest);




