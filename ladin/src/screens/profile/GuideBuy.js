

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Nav from '../../components/cart/Nav';

const Css = require('../../config/css');

class GuideBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={Css.container}>
        <Nav
          label='HƯỚNG DẪN MUA HÀNG' 
        />
      </View>

    );
  }
}

export default GuideBuy;
