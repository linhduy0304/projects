

import React from 'react';
import { View, Image } from 'react-native';

const Logo = ({
    params,
}) => (
    <View style={{paddingRight: 13}}>
        <Image style={{height: 120, width: 120*1990/2080, marginTop: 10}} source={require('../icons/logo_1.png')}/>
    </View>
);

export default Logo;
