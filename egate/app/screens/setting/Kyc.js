

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text
} from 'react-native';
import Nav from '../../components/Nav';
import Css from '../../config/Css';
import { Actions } from 'react-native-router-flux';

class Kyc extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav title='VeriME KYC'>
          <TouchableOpacity onPress={() => Actions.pop()} style={Css.ctBack}>
            <Image style={Css.icBack} source={require('../../icons/ic_left.png')}/>
          </TouchableOpacity>
        </Nav>
        <View style={styles.body}>
          <Text style={{color: '#323643', textAlign: 'center'}}>Scan QR code using VeriME app to complete KYC</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body:{
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
})

export default Kyc;
