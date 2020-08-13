import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface DetailProps {}

const Detail = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>Detail {}</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {},
});
