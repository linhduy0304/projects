import React, {Component} from 'react';
import {
  DatePickers,
  LunarDatePickers,
  Header,
  Modal
} from './components';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLunar: false
    };
  }

  onPressPicker = () => {
    this.setState({
      showLunar: false
    });
  }

  onPressLunar = () => {
    this.setState({
      showLunar: true
    });
  }

  render() {
    const {
      showLunar
    } = this.state;
    const {
      defaultDate,
      onDateChange
    } = this.props;
    return (
      <Modal>
        <Header
          current={showLunar}
          onPressPicker={this.onPressPicker}
          onPressLunar={this.onPressLunar} />
        {!showLunar && <DatePickers onChange={onDateChange} initialDate={defaultDate} />}
        {showLunar && <LunarDatePickers onChange={onDateChange} initialDate={defaultDate} />}
      </Modal>
    );
  }
}
