

import React from 'react';
import { Text, View, StatusBar , Platform} from 'react-native';

const Nav = ({
    params,
}) => (
    <View>
      {
         Platform.OS === 'ios' ?
         <View style={{height: 20, backgroundColor: '#c41a36'}}></View>
         : null
      }
    </View>
);

export default Nav;
