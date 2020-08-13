

import React from 'react';
import { Image, View } from 'react-native';
import { screen } from '../config/System';

const LoadingScreen = ({
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
    <Image source={require('../icons/loading.gif')} />
  </View>
);

export default LoadingScreen;
