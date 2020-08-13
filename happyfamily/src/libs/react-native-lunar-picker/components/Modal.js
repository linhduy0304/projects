import React, {Component} from 'react';
import {
  View
} from 'react-native';

import Styles from '../style';

class Picker extends Component {
  render() {
    const {
      children
    } = this.props;

    return (
      <View style={Styles.modal}>
        {children}
      </View>
    );
  }
}

export default Picker;
