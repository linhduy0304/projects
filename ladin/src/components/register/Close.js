

import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { screen } from '../../config/Constant';
import { Actions } from 'react-native-router-flux';

const Close = ({
    params,
}) => (
    <View style={{width: screen.width, alignItems: 'flex-end'}}>
      <TouchableOpacity onPress={() => Actions.pop()} style={{padding: 15}}>
        <Image style={{width: 20, height: 20}} source={require('../../icons/ic_close.png')} />
      </TouchableOpacity>
    </View>
);

export default Close;
