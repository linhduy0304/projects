import React, {Component} from 'react';
import {
  PickerIOS,
  Platform
} from 'react-native';
import PickerAndroid from 'react-native-picker-android';

const Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
const Item = Picker.Item;

class Pickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: 1,
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
    };
  }

  static defaultProps = {
    item: []
  }

  handleDateChange = (value) => {
    this.setState({
      selected1: value
    });
  }

  render() {
    const {
      onChange,
      selectValue,
      item,
      styles,
      itemStyle
    } = this.props;
    return (
      <Picker
        style={styles}
        itemStyle={itemStyle}
        selectedValue={selectValue}
        onValueChange={onChange}>
          { item.map((data, index) =>
              <Item
                color={data.enabled ? '#333' : '#999'}
                key={index}
                value={data.value}
                label={data.label}
              />
          )}
      </Picker>
    );
  }
}

export default Pickers;
