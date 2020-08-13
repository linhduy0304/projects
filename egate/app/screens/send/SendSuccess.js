

import React, { Component } from 'react';
import {Image,View, Text, StyleSheet } from 'react-native';
import Css from '../../config/Css';
import { screen } from '../../config/System';
import Button from '../../components/Button';
import { Actions } from 'react-native-router-flux';

class SendSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: 'congratulations ....',
    };
  }

  render() {
    const {intro} = this.state;
    return (
      <View style={[Css.container, {alignItems: 'center'}]}>
        <View style={styles.body}>
          <View style={{alignItems: 'center'}}>
              <Image style={{width: 80, height: 80}} source={require('../../icons/ic_check.png')}/>
            </View>
          <Text style={styles.intro}>{intro} <Text style={{textDecorationLine: 'underline'}}>here</Text></Text>
          <Button
            label='OK'
            onPress={() => Actions.tab({type: 'reset'})}
            borderRadius={30}
            marginTop={30}
            width={screen.width/2}
          />
          
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
    paddingTop: 60,
    alignItems: 'center',
  },
})

export default SendSuccess;
