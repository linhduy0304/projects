

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import Calendar1 from '../../libs/react-native-lunar-calendar';
import NavBar, { NavButton, NavTitle } from 'react-native-nav';
import css from '../../Css'
import ItemEvent from '../../components/calendar/ItemEvent';
import getLunarDate from "../../libs/react-native-lunar-calendar/calendar/getLunarDate";
var Modal = require('react-native-modalbox');
import {loadEvent, deleteEvent} from '../../actions/calendar';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import NoData from '../../components/NoData';
import PageTypeEvent from '../../components/calendar/PageTypeEvent';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    let cur = new Date()
    this.state = {
      date: this.getDateNow(cur),
      lunar: this.getLunar(getLunarDate(cur)),
      lunarValue: this.getLunarValue(getLunarDate(cur)),
      modalTypeEvent: false,
      openTypeEvent: false,
    }
  }

  getLunar(today) {
    var day = today.day.length === 1 ? ('0'+today.day) : today.day;
    var month = today.month < 10 ? ('0'+today.month.toString()) : today.month;
    return  day+' - '+month+ ' '+today.year
  }

  getLunarValue(today) {
    var day = today.day.length === 1 ? ('0'+today.day) : today.day;
    var month = today.month < 10 ? ('0'+today.month.toString()) : today.month;
    return  day+'-'+month+ '-'+today.yearNumber
  }

  getDateNow(today) {
    var getDate = today.getDate() < 10 ? "0"+today.getDate() : today.getDate();
    var getMonth =today.getMonth() < 10 ? "0"+(1+today.getMonth()) : (1+today.getMonth());
    return getDate+'-'+getMonth+'-'+today.getFullYear();
  }

  componentWillMount() {
    this.props.loadEvent(this.state.date)
  }
  
  selectDate(date, lunar) {
    var newDate = this.getDateNow(date);
    var newLunar = this.getLunar(lunar)
    var newLunarValue = this.getLunarValue(lunar)
    this.setState({
      date: newDate,
      lunar: newLunar,
      lunarValue: newLunarValue,
    })
    this.props.loadEvent(newDate)
  }

  onDelete(data) {
    this.props.deleteEvent(data.slug)
  }

  onEdit(data) {
    Actions.addEvent({id: data.id, date: this.state.date, lunar: this.state.lunar, lunarValue: this.state.lunarValue, event_type_child: data.type_event})
  }

  setTypeEvent(data) {
    this.setState({
      openTypeEvent: false
    })
    Actions.addEvent({data: data})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D'}}></View>
        <NavBar style={{navBar: css.navBar2, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#C6247D'}} >
          <NavButton/>
          <NavTitle style={css.navTitle}>
            <Text style={css.txtTitle}>Calendar</Text>
          </NavTitle>
          <NavButton/>
        </NavBar>
        
        <ScrollView>
          <Calendar1
            headerStyle={{backgroundColor: '#3f4553'}}
            weekHeadStyle={{backgroundColor: '#3f4553'}}
            onDateSelect={(date, lunar) => this.selectDate(date, lunar)}
            onMonthSelect={(mon) => console.log(mon)}
            // onDateLunarSelect ={(date) => console.log(date)}
            dateStyle={{backgroundColor: '#f8f9f9'}}
            // selectDateStyle={{backgroundColor: '#f00'}}
            // weekendStyle={{backgroundColor: '#f00'}}
            style={{backgroundColor: '#fff'}} 
          />

          <View style={styles.ctEvent}>
            <Text style={styles.txtEvent}>Sự kiện</Text>
            <TouchableOpacity onPress={() => this.setState({modalTypeEvent: true})} style={styles.ctAdd}>
              <Image source={require('../../images/icons/ic_add_white.png')} />
            </TouchableOpacity>
          </View>
          {
            this.props.calendar.loading ? 
            <Loading title={'Đang tải sự kiện'}/>
            : 
            this.props.calendar.event ?
              this.props.calendar.event.length === 0 ? 
                <NoData title={'Chưa có sự kiện nào'} />
                :
                this.props.calendar.event.map((item, index) => {
                  return (
                    <ItemEvent 
                      onDelete={(data) => this.onDelete(data)} 
                      onEdit={(data) => this.onEdit(data)} 
                      key={index} 
                      data={item} 
                    />
                  )
                })
             : null
          }
          
        </ScrollView>
        <Modal 
          isOpen={this.state.modalTypeEvent}
          swipeToClose={false}
          position="bottom"
          entry="bottom"
          animationDuration={300}
          // backdropColor="red"
          onClosed={()=> this.setState({modalTypeEvent: false}) }
          >
            <PageTypeEvent date = {this.state.date} lunar= {this.state.lunar} lunarValue= {this.state.lunarValue} close={() => this.setState({modalTypeEvent: false})} />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ctAdd: {
    padding: 20
  },
  txtEvent: {
    color: '#fff',
    fontSize: 15,
  },
  ctEvent: {
    backgroundColor: '#e87151',
    paddingLeft: 15,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = (state) => {
  return {
    calendar: state.calendar,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvent: (date) => dispatch(loadEvent(date)),
    deleteEvent: (slug) => dispatch(deleteEvent(slug)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);