

import React from 'react';
import {Image, View} from 'react-native';

const Logo = ({
	params,
}) => (
    <View style={{alignItems: 'center',}}>
      <Image style={{width: 35*276/58,height: 35 }} source={require('../icons/logo.png')} />
    </View>
);

export default Logo;
