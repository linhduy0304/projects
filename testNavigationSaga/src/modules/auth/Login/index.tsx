import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { compose, withCallback, withState } from '@truefit/bach';

interface LoginProps {
  navigation: any;
}

const Login = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>{props.count}</Text>
      <Text onPress={props.handleClick(+1)}>Login</Text>
      <Text onPress={props.handleClick(-1)}>Login</Text>
    </View>
  );
};

export default compose(
  withState('count', 'setCount', 0),

  withCallback('handleClick', ({ count, setCount }) => (delta) => () => {
    console.log(count, delta);

    setCount(count + delta);
  }),
)(Login);

const styles = StyleSheet.create({
  container: {},
});
