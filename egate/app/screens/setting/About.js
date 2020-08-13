

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
import AboutHeader from '../../components/setting/AboutHeader';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav title='About Us'>
          <TouchableOpacity onPress={() => Actions.pop()} style={Css.ctBack}>
            <Image style={Css.icBack} source={require('../../icons/ic_left.png')}/>
          </TouchableOpacity>
        </Nav>
       <AboutHeader/>
    
        <View style={[styles.ctItem, {paddingLeft: 0}]}>
          <Text style={styles.title}>Terms of use</Text>
          <Image style={{height: 13, width: 7}} source={require('../../icons/ic_right_black.png')}/>
        </View>
        <View style={[styles.ctItem, {borderTopWidth: 0}]}>
          <Text style={styles.title}>Terms of use</Text>
          <Image style={{height: 13, width: 7}} source={require('../../icons/ic_right_black.png')}/>
        </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    color: '#323643'
  },
  ctItem: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 0,
    borderColor: '#dadde2',
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default About;
