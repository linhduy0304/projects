import React, {Component} from 'react';
import {
  View
} from 'react-native';

import moment from 'moment';
require('moment/locale/vi');
moment.locale('vi');
import {
  findLastIndex
} from 'lodash';

import Styles from '../style';
import Picker from './Picker';

import {getDayOptions} from '../util';

const yearOptions = [];

export default class DatePickers extends Component {
  constructor(props) {
    const initialDate = moment(props.initialDate).format('YYYY-M-D');
    super(props);
    this.state = {
      selectedYear: initialDate.split('-')[0],
      selectedMonth: initialDate.split('-')[1],
      selectedDay: initialDate.split('-')[2],
      monthOptions: [],
      dayOptions: getDayOptions(initialDate)
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

    for (const i = startYear; i <= endYear; i++) {
      yearOptions.push({
        label: `Năm ${i}`,
        value: i.toString(),
        enabled: true
      });
    }

    // 初始化月份
    let monthOptions = [];
    for (const i = 1; i <= 12; i++) {
      monthOptions.push({
        label: `Tháng ${i}`,
        value: i.toString(),
        enabled: true
      });
    }
    this.setState({
      monthOptions
    });
  }

  getDateText = () => {
    const {
      selectedYear,
      selectedMonth,
      selectedDay
    } = this.state;

    const obj = {};
    obj.value = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    obj.text = `Ngày ${selectedDay} Tháng ${selectedMonth} Năm ${selectedYear}`;

    return obj;
  }

  changeYear = (value) => {
    let {selectedMonth, selectedDay} = this.state;
    const dayOptions = getDayOptions(`${value}-${selectedMonth}-0`);

    if (dayOptions[selectedDay - 1].enabled === false) {
      selectedDay = dayOptions[findLastIndex(dayOptions, item => item.enabled === true)].value;
    }

    this.setState({
      selectedYear: value,
      dayOptions,
      selectedDay
    }, () => {
      this.props.onChange(this.getDateText());
    });
  }

  changeMonth = (value) => {
    let {selectedYear, selectedDay} = this.state;
    const dayOptions = getDayOptions(`${selectedYear}-${value}-0`);

    if (dayOptions[selectedDay - 1].enabled === false) {
      selectedDay = dayOptions[findLastIndex(dayOptions, item => item.enabled === true)].value;
    }

    this.setState({
      selectedMonth: value,
      dayOptions,
      selectedDay
    }, () => {
      this.props.onChange(this.getDateText());
    });
  }

  changeDay = (value) => {
    const {dayOptions} = this.state;
    let _value = value;

    if (dayOptions[value - 1].enabled !== true) {
      _value = dayOptions[findLastIndex(dayOptions, item => item.enabled === true)].value;
    }

    this.setState({
      selectedDay: _value
    }, () => {
      this.props.onChange(this.getDateText());
    });
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
          styles={Styles.picker1}
          onChange={this.changeYear}
          selectValue={selectedYear}
          itemStyle={Styles.picker1Item}
          item={yearOptions} />
        <Picker
          styles={Styles.picker2}
          onChange={this.changeMonth}
          selectValue={selectedMonth}
          item={monthOptions} />
        <Picker
          styles={Styles.picker3}
          onChange={this.changeDay}
          selectValue={selectedDay}
          itemStyle={Styles.picker3Item}
          item={dayOptions} />
      </View>
    );
  }
}
