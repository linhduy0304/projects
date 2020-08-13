import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../modules/home';

const Stack = createStackNavigator();

const RootStack: () => React.ReactNode | undefined = () => (
  <Stack.Navigator>
    <Stack.Screen name={'Home'} component={Home} />
  </Stack.Navigator>
);

export default RootStack;
