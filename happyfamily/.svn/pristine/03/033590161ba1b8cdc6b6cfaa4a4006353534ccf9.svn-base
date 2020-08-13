import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Styles from '../style';

class DatePickerHead extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    current: false,
    onPressSwitch: () => {},
    onPressLunar: () => {}
  }

  render() {
    const {
      current,
      onPressPicker,
      onPressLunar
    } = this.props;

    return (
      <View style={Styles.pickerHeader}>
        <TouchableOpacity style={Styles.pickerHeaderButton} onPress={onPressPicker}>
          <Text style={[Styles.pickerTitle, {color: current ? '#ccc' : '#333'}]}>Dương lịch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.pickerHeaderButton} onPress={onPressLunar}>
          <Text style={[Styles.pickerTitle, {color: !current ? '#ccc' : '#333'}]}>Âm lịch</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DatePickerHead;
