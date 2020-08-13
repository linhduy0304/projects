

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
const window = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import NavBar, { NavButton, NavTitle } from 'react-native-nav';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import css from '../../Css'
import Input from '../../components/Input';
import Button from '../../components/Button';
import DatePicker from 'react-native-datepicker';
import getLunarDate from "../../libs/react-native-lunar-calendar/calendar/getLunarDate";

import {addEvent, loadDataCreateEvent, loadDataEditEvent, editEvent} from '../../actions/calendar';
import { connect } from 'react-redux';

import ModalTypeEvent from '../../components/calendar/ModalTypeEvent';
import ModalTypeRemind from '../../components/calendar/ModalTypeRemind';
import ModalIndividualSelected from '../../components/calendar/ModalIndividualSelected';
import ModalIndividualRemind from '../../components/calendar/ModalIndividualRemind';
import ButtonTypeCalendar from '../../components/calendar/ButtonTypeCalendar';
import SimpleToast from 'react-native-simple-toast';
import Loading from '../../components/Loading';
import LunarPicker from '../../libs/react-native-lunar-picker/FMPicker';
import Spinner from "react-native-spinkit";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    let cur = new Date()
    this.state = {
      note: '',
      openTypeEvent: false,
      openTypeRemind: false,
      modelLunarPicker: false,
      openIndividualSelected: false,
      openIndividualReminds: false,
      individual: this.props.individual ? this.props.individual : '',
      individualReminds: [],
      individualRemindIds: [],
      typeEvent: {},
      typeRemind: [],
      arrType: [],
      typeCalendar: 1,  //0: âm, 1: dương
      date: this.props.date ? this.props.date : '',
      lunar: this.props.lunar ? this.props.lunar : '',
      lunarValue: this.props.lunarValue ? this.props.lunarValue : '',
    }
  }

  componentWillMount() {
    var {id, event_type, event_type_child} = this.props;
    if(id) {
      this.props.loadDataEditEvent(id, event_type_child.type);
    } else {
      this.props.loadDataCreateEvent(event_type.type);
    }
  }

  componentWillReceiveProps(nextProps){
    var {id} = this.props;
    if(id && nextProps && !this.isEmpty(nextProps.calendar.itemEditing)){
      var {itemEditing, individuals} = nextProps.calendar;
      this.setState({
        individualRemindIds: itemEditing.individual_remind_ids,
        individualReminds: this.individualReminds(itemEditing.individual_remind_ids, individuals),
        typeEvent: itemEditing.type_event,
        arrType: itemEditing.time_reminds,
        typeRemind: this.typeRemind(itemEditing.time_reminds),
        individual: itemEditing.individual,
        typeCalendar: itemEditing.type_time,
        note: itemEditing.note
      });
    }
  }

  individualReminds(individual_remind_ids, individuals) {
    var individualReminds = [];
    individuals.forEach(item => {
      if(individual_remind_ids.indexOf(item.id) !== -1) {
        individualReminds.push(item);
      }
    });
    return individualReminds;
  }

  typeRemind(time_reminds = []) {
    var typeRemind = [];
    if(time_reminds.length > 0) {
      time_reminds.forEach(item => {
        if(item === 0) {
          typeRemind.push({title: 'Không nhắc', type: 0})
        }
        if(item === 1) {
          typeRemind.push({title: 'Nhắc lúc xảy ra sự kiện', type: 1})
        }
        if(item === 2) {
          typeRemind.push({title: 'Nhắc trước 30 phút', type: 2})
        }
        if(item === 3) {
          typeRemind.push({title: 'Nhắc trước 1 giờ', type: 3})
        }
      });
    }
    return typeRemind;
  }

  setTypeRemind(data) {
    var remind = this.state.typeRemind;
    var arrType = this.state.arrType;
    for(const i= 0; i < remind.length ; i++ ){
      if(remind[i].type === data.type){
        remind.splice(i, 1);
        arrType.splice(i, 1);
        this.setState({
          typeRemind: remind,
          arrType: arrType
        })
        return ;
      }
    }

    //chọn không nhắc
    if(data.type === 0) {
      this.setState({
        typeRemind: [data],
        arrType: [0]
      })
      return;
    }

    //chọn '"không nhắc"' xong chọn cái khác
    for(const i= 0; i < remind.length ; i++ ){
      if(remind[i].type === 0){
        remind.splice(i, 1);
        arrType.splice(i, 1);
        this.setState({
          typeRemind: remind,
          arrType: arrType
        })
      }
    }
    remind.unshift(data);
    arrType.unshift(data.type)
    this.setState({
      typeRemind: remind,
      arrType: arrType
    })
  }

  setTypeEvent(data) {
    this.setState({
      typeEvent: data.item,
      openTypeEvent: false,
    });
  }

  setIndividualSelected(data) {
    this.setState({
      individual: data,
      openIndividualSelected: false,
    });
  }

  setIndividualReminds(data) {
    var {individualReminds, individualRemindIds} = this.state;
    var index = individualReminds.indexOf(data.item);
    if(index !== -1) {
      individualReminds.splice(index, 1);
      individualRemindIds.splice(index, 1),
      this.setState({
        individualReminds,
        individualRemindIds
      })
    } else {
      individualReminds.unshift(data.item);
      individualRemindIds.unshift(data.item.id)
      this.setState({
        individualReminds,
        individualRemindIds,
      })
    }
  }

  addEvent() {
    var {id} = this.props;
    var {individual, individualRemindIds, typeEvent, arrType, typeCalendar, date, lunarValue, note} = this.state;
    dismissKeyboard();
    if(individual === '') {
      SimpleToast.show('Bạn phải chọn thành viên');
      return;
    };
    if(individualRemindIds.length === 0) {
      SimpleToast.show('Bạn phải chọn người nhận thông báo cho sự kiện');
      return;
    }
    if(typeEvent === '') {
      SimpleToast.show('Bạn phải chọn loại sự kiện, dấu mốc');
      return;
    };
    if(arrType.length === 0) {
      SimpleToast.show('Bạn phải chọn nhắc nhở');
      return;
    };
    if(typeCalendar === 0) {
      if(lunarValue === '') {
        SimpleToast.show('Bạn phải nhập ngày');
        return;
      }
    }
    if(typeCalendar === 1) {
      if(date === '') {
        SimpleToast.show('Bạn phải nhập ngày');
        return;
      }
    }
    var body = {
      note: note,
      individual_id: individual.id,
      individual_remind_ids: individualRemindIds,
      type_event_id: typeEvent.id,
      type_time: typeCalendar,
      time_start: typeCalendar === 1 ? date : lunarValue,
      time_reminds: arrType,
    };
    if(id) {
      this.props.editEvent(body, id);
    } else {
      this.props.addEvent(body);
    }
  }

  pickEvent() {
    dismissKeyboard();
    this.setState({openTypeEvent: true})
  }

  pickRemind() {
    dismissKeyboard();
    this.setState({openTypeRemind: true})
  }

  pickIndividualSelected() {
    dismissKeyboard();
    this.setState({openIndividualSelected: true})
  }

  pickIndividualRemind() {
    dismissKeyboard();
    this.setState({openIndividualReminds: true})
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  showIcon() {
    // var {typeEvent} = this.state;
    var {typeEvent} = this.state;
    if(typeEvent.type === 1) {
      return require('../../images/icons/ic_baby.png');
    }
    if(typeEvent.type === 2) {
      return require('../../images/icons/ic_adults.png');
    }
    if(typeEvent.type === 3) {
      return require('../../images/icons/ic_event_family.png');
    }
    if(typeEvent.type === 4) {
      return require('../../images/icons/ic_event_individual.png');
    }
  }
  showTitle() {
    var {typeEvent} = this.state;
    if(typeEvent.type === 1) {
      return 'Dấu mốc đầu đời';
    }
    if(typeEvent.type === 2) {
      return 'Dấu mốc trưởng thành';
    }
    if(typeEvent.type === 3) {
      return 'Sự kiện trong gia đình';
    }
    if(typeEvent.type === 4) {
      return 'Sự kiện cá nhân';
    }
  }

  render() {
    var {event_type, calendar, id} = this.props;
    var {date, lunar, modelLunarPicker, lunarValue, individualReminds} = this.state;
    console.log(this.state.individual);
    return (
      <View style={styles.container}>
        <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D'}}></View>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#C6247D'}} >
          <NavButton/>
          <NavTitle style={css.navTitle}>
            <Text style={css.txtTitle}>{id ? 'Sửa sự kiện' : 'Thêm sự kiện'}</Text>
          </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../../images/icons/ic_back.png')} />
          </TouchableOpacity>
        </NavBar>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0} style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <View style={styles.content}>
              <View style={styles.boxType}>
                <Image source={event_type ? event_type.icon : this.showIcon()} style={styles.image} />
                <Text style={styles.txtTitle}>{event_type ? event_type.title : this.showTitle()}</Text>
              </View>
              <TouchableOpacity onPress={() => this.pickIndividualSelected()} style={styles.ctEvent}>
                <Image source={require('../../images/icons/ic_profile.png')} />
                <Input 
                  title='Chọn thành viên'
                  value ={this.state.individual.full_name}
                  marginLeft = {10}
                  editable = {false}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.pickEvent()} style={styles.ctEvent}>
                <Image source={require('../../images/icons/ic_event.png')} />
                <Input 
                  title='Loại sự kiện / dấu mốc'
                  value ={!this.isEmpty(this.state.typeEvent) ? this.state.typeEvent.title : ''}
                  marginLeft = {10}
                  editable = {false}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.pickRemind()} style={styles.ctEvent}>
                <Image source={require('../../images/icons/ic_remind.png')} />
                
                {
                  this.state.typeRemind.length === 0 ?
                  <Input 
                    title='Nhắc nhở'
                    value ={''}
                    marginLeft = {10}
                    editable = {false}
                  />
                  : 
                  <View>
                  {
                    this.state.typeRemind ?
                    this.state.typeRemind.map((item, index) => {
                      return (
                        <Text key={index} style={{marginLeft: 10, color: '#141823'}}>{item.title}</Text>
                      )
                    })
                    : null
                  }
                  </View>
                }
                
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.pickIndividualRemind()} style={styles.ctEvent}>
                <Image source={require('../../images/icons/ic_remind.png')} />
                {
                  individualReminds.length === 0 ?
                  <Input 
                    title='Nhận thông báo khi sự kiện sắp diễn ra'
                    value ={''}
                    marginLeft = {10}
                    editable = {false}
                  />
                  : 
                  <View>
                  {
                    individualReminds.map((item, index) => {
                      return (
                        <Text key={index} style={{marginLeft: 10, color: '#141823'}}>{item.full_name}</Text>
                      )
                    })
                  }
                  </View>
                }
                
              </TouchableOpacity>

              <View style={[styles.ctEvent, {justifyContent: 'space-between'}]}>
                <TouchableOpacity onPress = {() => this.setState({typeCalendar: 1})} style={[styles.btnDate, {backgroundColor: this.state.typeCalendar === 1 ? '#0D6ECF' : '#FFFFFF'}]}>
                  <Image source={this.state.typeCalendar === 1 ? require('../../images/icons/ic_sun_active.png') : require('../../images/icons/ic_sun.png')} style={styles.imgDate} />
                  <Text style={[styles.txtTitle, {color: this.state.typeCalendar === 1 ? '#FFFFFF' : '#373737'}]}>Dương lịch</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.setState({typeCalendar: 0})} style={[styles.btnDate, {backgroundColor: this.state.typeCalendar === 0 ? '#0D6ECF' : '#FFFFFF'}]}>
                  <Image source={this.state.typeCalendar === 1 ? require('../../images/icons/ic_moon.png') : require('../../images/icons/ic_moon_active.png')} style={styles.imgDate} />
                  <Text style={[styles.txtTitle, {color: this.state.typeCalendar === 0 ? '#FFFFFF' : '#373737'}]}>Âm lịch</Text>
                </TouchableOpacity>
              </View>
              {
                this.state.typeCalendar === 0 ?
                <TouchableOpacity style={styles.ctEvent} onPress={() => this.setState({'modelLunarPicker': true})}>
                  <Image source={require('../../images/icons/ic_event.png')} />
                  <Text style={ styles.valueFieldSelect }>{lunar ? lunar : 'Chọn ngày'}</Text>
                </TouchableOpacity>
                :
                <View style={styles.ctEvent}>
                  <Image source={require('../../images/icons/ic_event.png')} />
                  <DatePicker
                    style={{width: window.width- 30}}
                    // date={(this.props.profile.currentUser.birthday)}
                    date={date}
                    showIcon={false}
                    mode="date"
                    placeholder="Chọn ngày"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    minDate='01-01-1900'
                    onDateChange={(date) => this.setState({date: date})}
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
              }
              {
                modelLunarPicker &&
                <LunarPicker
                  itemSelected={lunarValue}
                  // boxDisplayStyles={main.mainPicker}
                  modalVisible={modelLunarPicker}
                  onCancel={() => this.setState({modelLunarPicker: false})}
                  onSubmit={(lunarValue, lunar) => this.setState({lunarValue: lunarValue, lunar: lunar, modelLunarPicker: false}) }
                />
              }
              <View style={styles.ctEvent}>
                <Image source={require('../../images/icons/ic_event.png')} />
                <Input 
                  title='Ghi chú'
                  value ={this.state.note}
                  marginLeft = {10}
                  onChange={(note) => this.setState({note})}
                />
              </View>
              {
                this.props.calendar.loading ?
                <Loading title={'Đang tạo mới'}/>
                :
                <Button
                  title = 'Cập nhật'
                  color = 'white'
                  onPress = {() => this.addEvent()}
                  fontSize = {16}
                  fontWeight = '500'
                  backgroundColor = '#c6247d'
                />
              }
              
            </View>
          </ScrollView>
          {
            this.props.calendar.is_loading_create ? 
            <View style={css.mainSpin}>
            <Spinner isFullScreen={true} isVisible={true} size={50} type={'Circle'} color={'#FFFFFF'}/>
            </View> : null
          }
        </KeyboardAvoidingView>
        <ModalTypeRemind 
          data={this.state.arrType}
          isOpen = {this.state.openTypeRemind}
          onPress ={(data) => this.setTypeRemind(data)}
          close = {() => this.setState({openTypeRemind: false})}
        />
        <ModalTypeEvent
          data={calendar.event_types}
          isOpen = {this.state.openTypeEvent}
          onPress ={(data) => this.setTypeEvent(data)}
          close = {() => this.setState({openTypeEvent: false})}
        />
        <ModalIndividualSelected
          data={calendar.individuals}
          isOpen = {this.state.openIndividualSelected}
          onPress ={(data) => this.setIndividualSelected(data)}
          close = {() => this.setState({openIndividualSelected: false})}
        />
        <ModalIndividualRemind 
          data={calendar.individuals}
          dataSelected={individualReminds}
          isOpen = {this.state.openIndividualReminds}
          onPress ={(data) => this.setIndividualReminds(data)}
          close = {() => this.setState({openIndividualReminds: false})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ctCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ctEvent: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(194, 196, 202)',
    // height: 60,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  content: {
    padding: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  boxType: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  image: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: 5
  },
  txtTitle: {
      fontSize: 14,
      color: '#373737',
  },
  btnDate: {
    height: 50,
    width: window.width / 2 - 35,
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(194, 196, 202)',
    borderRadius: 30
  },
  imgDate: {
    marginRight: 10
  },
})

const mapStateToProps = (state) => {
  return {
    calendar: state.calendar,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (body) => dispatch(addEvent(body)),
    loadDataCreateEvent: (event_type) => dispatch(loadDataCreateEvent(event_type)),
    loadDataEditEvent: (id, event_type) => dispatch(loadDataEditEvent(id, event_type)),
    editEvent: (body, id) => dispatch(editEvent(body, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);