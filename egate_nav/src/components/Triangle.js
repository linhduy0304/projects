

import React from 'react';
import { Text, View } from 'react-native';
import Svg, {Polygon,} from 'react-native-svg';

const Triangle = ({
    params,
}) => (
  <View style={{position: 'absolute',right: -120}}>
    <Svg
      height="130"
      width="340"
    >
      <Polygon
          points="0,0 170,130 340,0"
          fill="#2e4d56"
      />
    </Svg>
  </View>
  
);

export default Triangle;
