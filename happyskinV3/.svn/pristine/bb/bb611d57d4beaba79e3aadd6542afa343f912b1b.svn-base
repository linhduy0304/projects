import React, { Component } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
export default class GiftedSpinner extends Component {
  render() {
    return (
        <ActivityIndicator
        animating={true}
        style={{alignItems: 'center',justifyContent: 'center',height: deviceHeight - 200, width: deviceWidth}}
        color="#ccc"
        size="large"
        {...this.props}
        />
    );
  }
}
