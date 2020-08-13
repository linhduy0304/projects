

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import Nav from '../components/detail/Nav';
import Css from '../config/Css';
import { Actions } from 'react-native-router-flux';
import Triangle from '../components/Triangle';
import TriangleBot from '../components/TriangleBot';
import Header from '../components/detail/Header';
import Recently from '../components/detail/Recently';
import Chart from '../components/detail/Chart';
import StBar from '../components/StBar';
import { color } from '../config/System';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {
          Platform.OS === 'ios' ?
            <StBar backgroundColor={color}/>
            : null
        }
        <Triangle/>
        <TriangleBot/>
        <Nav title='Egate'/>
        <View style={styles.body}>
          <Header data={{percent: 3.56, incre: true, date: 'Fireday, December, 22 2018'}}/>
          <Chart/>
          <Recently/> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23434d',
  },
  body: {
    flex: 1,
    padding: 20
  },
})
export default Detail;
