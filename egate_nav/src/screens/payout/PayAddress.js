

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
import ButtonGradient from '../../components/ButtonGradient';
import { screen } from '../../config/System';
import AddressTotal from '../../components/send/AddressTotal';
import StBar from '../../components/StBar';

class PayAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    console.log(this.props.navigation)
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Nav goBack={goBack} title='Send to ABC123' sub='900000'/>
          <View style={styles.body}>
            <View style={styles.ctTo}>
              <TextInput
                placeholder='email or eGate address'
                style={{
                  flex: 1,
                  marginRight: 10
                }}
              />
              <Text style={{marginRight: 15}}>ETH</Text>
              <Image style={{height: 20, width: 20}} source={require('../../icons/ic_kyc.png')}/>
            </View>
          </View>
        <AddressTotal/>
        <ButtonGradient
          label='NEXT'
          borderRadius={0}
          marginTop={0}
          onPress={() => Actions.sendSuccess()}
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
export default PayAddress;
