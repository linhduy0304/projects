

import React from 'react';
import { Text, View } from 'react-native';

const NoData = ({
  label,
  marginTop=20,
}) => (
    <View style={{alignItems: 'center', marginTop}}>
      <Text>{label}</Text>
    </View>
);

export default NoData;
