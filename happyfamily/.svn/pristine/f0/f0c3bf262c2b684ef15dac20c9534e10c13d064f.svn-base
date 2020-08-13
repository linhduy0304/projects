import React, {Component} from 'react';
import {
  View
} from 'react-native';

import moment from 'moment';
import chineseLunar from '../chineseLunar';
import {
  findLastIndex
} from 'lodash';

import Styles from '../style';
import Picker from './Picker';
import {getDayOptions} from '../util';
const yearOptions = [];

export default class LunarDatePickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: this.props.selectedOption.split('-')[2],
      selectedMonth: this.props.selectedOption.split('-')[1],
      selectedDay: this.props.selectedOption.split('-')[0],
      monthOptions: [],
      dayOptions: []
    };
  }

  static defaultProps = {
    minDate: '1950-1-1',
    maxDate: '2050-12-31',
    initialDate: new Date()
  }

  componentWillMount() {
    const {
      minDate,
      maxDate
    } = this.props;

    const startYear = minDate.split('-')[0];
    const endYear = maxDate.split('-')[0];

    // 初始化年
    for (const i = startYear; i <= endYear; i++) {
      yearOptions.push({
        label: `${i} ${chineseLunar.traditionalYearName(i)}`,
        value: chineseLunar.monthLable(i),
        enabled: true
      });
    }

    this._initMonth();
    this._initDay();
  }

  // 初始化月份
  _initMonth = () => {
    const {
      selectedYear
    } = this.state;

    let monthOptions = [];

    const leapMonth = chineseLunar.leapMonthOfYear(selectedYear);
    for (const i = 1; i <= 12; i++) {
      monthOptions.push({
        label: chineseLunar.monthName(i, true),
        value: chineseLunar.monthLable(i),
        date: chineseLunar.lunarToSolar(selectedYear, i, 0),
        enabled: true,
        leap: false
      });

      // leap month
      if (leapMonth === i) {
        monthOptions.push({
          label: chineseLunar.monthName(i, true, true),
          value: chineseLunar.monthLable(i),
          date: chineseLunar.lunarToSolar(selectedYear, i, 0),
          enabled: true,
          leap: true
        });
      }
    }
    this.setState({
      monthOptions
    });
  }

  _initDay = () => {
    const {
      selectedYear,
      selectedMonth
    } = this.state;

    let dayOptions = [];

    let days = chineseLunar.daysOfMonth(parseInt(selectedYear, 10), parseInt(selectedMonth, 10));

    for (const i = 1; i < 31; i++) {
      dayOptions.push({
        label: chineseLunar.dayName(i),
        value: chineseLunar.monthLable(i),
        enabled: i < days
      });
    }

    this.setState({
      dayOptions
    });

  }

  changeYear = (value) => {
    let {selectedMonth, selectedDay} = this.state;

    this.setState({
      selectedYear: value,
    });
    this.props.onChangeDate(selectedDay+'-'+selectedMonth+'-'+value, selectedDay+'-'+selectedMonth+' '+chineseLunar.traditionalYearName(value));
  }

  changeMonth = (value) => {
    let {selectedYear, selectedDay} = this.state;

    this.setState({
      selectedMonth: value,
    });
    this.props.onChangeDate(selectedDay+'-'+value+'-'+selectedYear, selectedDay+'-'+value+' '+chineseLunar.traditionalYearName(selectedYear));
  }

  changeDay = (value) => {
    const {dayOptions} = this.state;
    var {selectedMonth, selectedYear} = this.state;
    this.setState({
      selectedDay: value
    });
    this.props.onChangeDate(value+'-'+selectedMonth+'-'+selectedYear, value+'-'+selectedMonth+' '+chineseLunar.traditionalYearName(selectedYear));
  }

  render() {
    const {
      selectedYear,
      selectedMonth,
      selectedDay,
      monthOptions,
      dayOptions
    } = this.state;

    return (
      <View style={Styles.pickerContainer}>
        <Picker
          styles={Styles.picker3}
          onChange={this.changeDay}
          selectValue={selectedDay}
          itemStyle={Styles.picker3Item}
          item={dayOptions} />
        <Picker
          styles={Styles.picker2}
          onChange={this.changeMonth}
          selectValue={selectedMonth}
          item={monthOptions} />
        <Picker
          styles={Styles.picker1}
          onChange={this.changeYear}
          selectValue={selectedYear}
          itemStyle={Styles.picker1Item}
          item={yearOptions} />
      </View>
    );
  }
}
