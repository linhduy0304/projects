import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface HomeProps {}

const Home = (props: HomeProps) => {
  const toDetail = () => props.navigation.navigate('Detail');
  return (
    <View style={styles.container}>
      <Text onPress={toDetail}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
});
