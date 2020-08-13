

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Clipboard
} from 'react-native';
import Triangle from '../components/Triangle';
import TriangleBot from '../components/TriangleBot';
import StBar from '../components/StBar';
import Nav from '../components/detail/Nav';
import { screen } from '../config/System';
import Toast from 'react-native-simple-toast';

class ScanAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      address: 'ASDF41DFASFAF12ASDF',
      wallet: [
        {
          icon: require('../icons/ic_egate.png'),
          name: 'Egate',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: true,
        },
        {
          icon: require('../icons/ic_bitcoin.png'),
          name: 'Bitcoin',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: true,
        },
        {
          icon: require('../icons/ic_ethereum.png'),
          name: 'Ethereum',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: false,
        },
        {
          icon: require('../icons/ic_litecoin.png'),
          name: 'Lite',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: true,
        },
        {
          icon: require('../icons/ic_bitcoin_cash.png'),
          name: 'Bitcoin Cash',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: true,
        },
        {
          icon: require('../icons/ic_egate.png'),
          name: 'Egate',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: true,
        },
        {
          icon: require('../icons/ic_bitcoin.png'),
          name: 'Bitcoin',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: true,
        },
        {
          icon: require('../icons/ic_ethereum.png'),
          name: 'Ethereum',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: false,
        },
        {
          icon: require('../icons/ic_litecoin.png'),
          name: 'Lite',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: true,
        },
        {
          icon: require('../icons/ic_bitcoin_cash.png'),
          name: 'Bitcoin Cash',
          sub: '401',
          price: '0,33333333',
          percent: '3.97',
          dollar: '43,33',
          incre: true,
        },
       
      ],
    };
  }

  pick = (data, index) => {
    this.setState({active: index})
  }

  copy = (address) => {
    Clipboard.setString(address);
    Toast.show('Copied')
  }

  render() {
    const {wallet, active, address} = this.state;
    return (
      <View style={styles.container}>
        {
          Platform.OS === 'ios' ?
            <StBar backgroundColor={color}/>
            : null
        }
        <Triangle/>
        <TriangleBot/>
        <Nav title='Scan'/>
        <ScrollView style={{flex: 1}}>
          <View style={styles.body}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              {
                wallet.map((item, index) => {
                  return (
                      <TouchableOpacity onPress={() => this.pick(item, index)} key={index} style={[styles.ctItem, {borderWidth: active === index ? 2 : 0,}]}>
                        {
                          active === index 
                          ? 
                            null 
                          :
                            <View style={styles.ctBlur}/>
                        }

                        <Image style={{height: 40, width: 40}} source={item.icon}/>
                      </TouchableOpacity>
                  )
                })
              }
              
            </ScrollView>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.intro}>My address</Text>
              <View style={styles.ctAddress}>
                <Text style={styles.address}>{address}</Text>
                <TouchableOpacity onPress={() => this.copy(address)}>
                  <Image style={{height: 15, resizeMode: 'contain'}} source={require('../icons/ic_detail.png')}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  intro: {
    color: '#fff',
    fontSize: 13,
    marginTop: 30,
    marginBottom: 15
  },
  address: {
    flex: 1,
    color: '#1f3d47'
  },
  ctAddress: {
    backgroundColor: '#fff',
    height: 35,
    borderRadius: 4,
    width: screen.width - 40,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  ctBlur: {
    height: 40,
    width: 40,
    borderRadius: 20,
    position: 'absolute',
    zIndex: 11,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  ctItem: {
    marginRight: 7,
    borderColor: '#fff',
    borderRadius: 21,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#23434d',
  },
  body: {
    flex: 1,
    padding: 20,
  },
})

export default ScanAddress;
