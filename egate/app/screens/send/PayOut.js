

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import Nav from '../../components/send/Nav';
import Css from '../../config/Css';
import { Actions } from 'react-native-router-flux';
import Input from '../../components/Input';
import ButtonGradient from '../../components/ButtonGradient';
import { screen } from '../../config/System';
import StBar from '../../components/StBar';

class PayOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav title='Smart Pay Out'/>
          <View style={styles.body}>
            <View style={styles.ctTo}>
              <Text>To</Text>
              <TextInput
                placeholder='email or eGate address'
                style={{
                  flex: 1,
                  marginLeft: 10,
                  marginRight: 10
                }}
              />
              <Image style={{height: 20, width: 20}} source={require('../../icons/ic_kyc.png')}/>
            </View>
          </View>
        <ButtonGradient
          label='NEXT'
          onPress={() => Actions.payAddress()}
          borderRadius={0}
          width={screen.width}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctTo: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    position: 'absolute',
    width: screen.width-30,
    top: -25,
    left: 15,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  container: {
    flex: 1,

  },
  body: {
    flex: 1,
    padding: 15,
    paddingTop: 0
  }
})
export default PayOut;
