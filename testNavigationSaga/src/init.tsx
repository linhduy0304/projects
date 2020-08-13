// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from './modules/home/Detail';
import { Text } from 'react-native';
import Login from './modules/auth/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './modules/tab/Home';
import Profile from './modules/tab/Profile';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';

// import { helloSaga } from './sagas';

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(helloSaga);

const StackHome = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen name={'Detail'} component={Detail} />
    </Stack.Navigator>
  );
};
const Tab = () => {
  return (
    <Tabs.Navigator tabBarOptions={{}}>
      <Tabs.Screen name='StackHome' component={StackHome} />
      <Tabs.Screen name='Profile' component={Profile} />
    </Tabs.Navigator>
  );
};

const App: () => React.ReactNode = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name={'Login'}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={Login}
      />
      <Stack.Screen name='Tab' component={Tab} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
