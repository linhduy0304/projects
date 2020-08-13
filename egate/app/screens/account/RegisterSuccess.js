

import React, { Component } from 'react';
import {Image,View, Text, StyleSheet,Platform } from 'react-native';
import Css from '../../config/Css';
import { screen } from '../../config/System';
import Button from '../../components/Button';
import { Actions } from 'react-native-router-flux';

class RegisterSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: 'Register is successfully! Please check your inbox or spam email to confirm new account',
      reset: 'Email to reset password send successfully! Please check your email to reset password',
    };
  }

  render() {
    const {register, reset} = this.state;
    return (
      <View style={[Css.container, {alignItems: 'center'}]}>
        <View style={styles.body}>
          <View style={{alignItems: 'center'}}>
              <Image style={{width: 80, height: 80}} source={require('../../icons/ic_check.png')}/>
            </View>
          <Text style={styles.intro}>{this.props.load === 'reset' ? reset : register}</Text>
          {
            this.props.load === 'reset' ?
            <Button
              label='OK'
              onPress={() => Actions.login({type: 'reset'})}
              borderRadius={30}
              marginTop={30}
              width={screen.width/2}
            />
            : 
            <Button
              label='LOGIN NOW'
              onPress={() => Actions.login({type: 'reset'})}
              borderRadius={30}
              marginTop={30}
              width={screen.width/2}
            />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  intro: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    fontSize: 16,
    lineHeight: 30
  },
  body: {
    paddingTop: Platform.OS === 'ios' ? screen.height/6 : 60,
    alignItems: 'center',
  },
})

export default RegisterSuccess;
