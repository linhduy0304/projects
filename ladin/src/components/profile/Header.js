

import React from 'react';
import { Text, View , StyleSheet} from 'react-native';

const Header = ({
  name ='',
  children,
}) => (
  <View style={{alignItems: 'center', backgroundColor: '#fff', paddingTop: 15, paddingBottom: 15}}>
    <Text style={css.name}>{name}</Text>
    {children}
  </View>
);

const css = StyleSheet.create({
  name: {
    color: '#0674c1',
    fontWeight: 'bold',
    fontSize: 20
  },
  email: {
    color: '#0674c1'
  },
})
export default Header;
