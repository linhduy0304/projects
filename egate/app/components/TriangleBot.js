

import React from 'react';
import { Text, View } from 'react-native';
import Svg,{
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

const TriangleBot = ({
    params,
}) => (
  <View style={{position: 'absolute',left: -100, bottom: 0}}>
    <Svg
      height="100"
      width="280"
    >
      <Polygon
          points="0,100 280,100 150,0"
          fill="#2e4d56"
      />
    </Svg>
  </View>
  
);

export default TriangleBot;
