

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import Nav from '../components/Nav';
import Css from '../config/Css';
import StBar from '../components/StBar';
import { color } from '../config/System';

class QrCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {goBack} = this.props.navigation
    return (
      <View style={styles.container}>
        <Nav title='Scan Qrcode'>
          <TouchableOpacity onPress={() => goBack()} style={Css.ctBack}>
            <Image style={Css.icBack} source={require('../icons/ic_left.png')}/>
          </TouchableOpacity>
        </Nav>
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default QrCode;
