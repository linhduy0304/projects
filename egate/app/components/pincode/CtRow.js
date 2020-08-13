

import React from 'react';
import { Text, View } from 'react-native';

const CtRow = ({
    children,
    marginTop = 0
}) => (
    <View style={{flexDirection: 'row',marginTop}}>
      {children}
    </View>
);

export default CtRow;
