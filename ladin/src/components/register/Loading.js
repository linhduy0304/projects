

import React from 'react';
import { Image, View } from 'react-native';
import { screen } from '../../config/Constant';

const Loading = ({
    params,
}) => (
  <View style={{
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center', 
    position: 'absolute', 
    top:0,
    zIndex: 99, 
    height: screen.height, 
    width: screen.width
  }}>
    <Image style={{width: 100, height: 100}} source={require('../../icons/loadLogin.gif')} />
  </View>
);

export default Loading;
