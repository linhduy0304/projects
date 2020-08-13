

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Css from '../../config/Css';
import Number from '../../components/pincode/Number';
import CtRow from '../../components/pincode/CtRow';
import Input from '../../components/pincode/Input';

class PinCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: [],
    };
  }

  addNumber(num) {
    var pincode = this.state.pincode;
    if(pincode.length < 4) {
      pincode.push(num)
      this.setState({
        pincode
      })
    };
  }

  del() {
    var pincode = this.state.pincode;
    pincode.pop();
    this.setState({pincode})
  }

  render() {
    console.log(this.state.pincode)
    const {pincode} = this.state
    return (
      <View style={[Css.container, {alignItems: 'center',paddingTop: 40}]}>
        <Text style={styles.intro}>Type your PIN code</Text>
        <Input
          length={pincode.length}
        />
        <CtRow marginTop={20}>
          <Number onPress={num => this.addNumber(num)} label={1}/>
          <Number onPress={num => this.addNumber(num)} label={2}/>
          <Number onPress={num => this.addNumber(num)} label={3}/>
        </CtRow>
        <CtRow>
          <Number onPress={num => this.addNumber(num)} label={4}/>
          <Number onPress={num => this.addNumber(num)} label={5}/>
          <Number onPress={num => this.addNumber(num)} label={6}/>
        </CtRow>
        <CtRow>
          <Number onPress={num => this.addNumber(num)} label={7}/>
          <Number onPress={num => this.addNumber(num)} label={8}/>
          <Number onPress={num => this.addNumber(num)} label={9}/>
        </CtRow>
        <CtRow>
          <Number onPress={num => null} label={'FORGOT PIN CODE'}/>
          <Number onPress={num => this.addNumber(num)} label={0}/>
          <Number onPress={num => this.del()} label={'DEL'}/>
        </CtRow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  intro: {
    color: '#fff'
  },
 
})

export default PinCode;
