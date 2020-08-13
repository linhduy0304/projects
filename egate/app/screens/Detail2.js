

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import Nav from '../components/detail/Nav';
import Css from '../config/Css';
import { Actions } from 'react-native-router-flux';
import Triangle from '../components/Triangle';
import TriangleBot from '../components/TriangleBot';
import Header from '../components/detail2/Header';
import StBar from '../components/StBar';
import { color } from '../config/System';
import Action from '../components/detail2/Action';
import ItemHistory from '../components/detail2/ItemHistory';

class Detail2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      histories: [
        {
          date: 'Jun 15, 2018',
          history: [
            {
              label: 'Payout',
              to: '0xxx..555',
              status: 0,
              price: '0.4444'
            },
            {
              label: 'Payout',
              to: '0xxx..555',
              status: 1,
              price: '0.4444'
            },
            {
              label: 'Payout',
              to: '0xxx..555',
              status: 1,
              price: '0.4444'
            }
          ]
        },
        {
          date: 'Jun 15, 2018',
          history: [
            {
              label: 'Payout',
              to: '0xxx..555',
              status: 0,
              price: '0.4444'
            },
            {
              label: 'Payout',
              to: '0xxx..555',
              status: 1,
              price: '0.4444'
            },
            {
              label: 'Payout',
              to: '0xxx..555',
              status: 1,
              price: '0.4444'
            }
          ]
        }
      ]
    };
  }

  render() {
    const {histories} = this.state;
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
        <ScrollView>
          <View style={styles.body}>
            <Header data={{price: '3.3432342', usd: '30.400.000'}}/>
            <Action/>
            {
              histories.map((item, index) => {
                return <ItemHistory key={index} data={item}/>
              })
            }
          </View>
        </ScrollView>
       
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
export default Detail2;
