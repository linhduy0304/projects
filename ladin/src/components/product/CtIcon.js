

import React from 'react';
import { Image, View } from 'react-native';

const CtIcon = ({
  source,
  view =26,
  icon= 18,
}) => (
  <View style={{height: view,alignItems: 'center', justifyContent: 'center', width: view, backgroundColor: '#de1838', borderRadius: 4}}>
    <Image style={{height: icon, width: icon}} source={source} />
  </View>
);

export default CtIcon;
