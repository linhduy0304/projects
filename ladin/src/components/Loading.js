

import React from 'react';
import { Image, View } from 'react-native';

const Loading = ({
    size = 20,
    marginTop = 0,
    source=require('../icons/loadHome.gif')
}) => (
    <View style={{alignItems: 'center', marginTop, padding: 20,}}>
      <Image style={{width: size, height: size}} source={source} />
    </View>
);

export default Loading;
