

import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Platform
} from 'react-native';
import Css from '../../config/Css';
import StBar from '../../components/StBar';
import Item from '../../components/history/Item';
import { color } from '../../config/System';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: 'Nạp tiền từ Egate',
          code: '123456',
          price: '129.000',
          status: 1
        },
        {
          title: 'Nạp tiền từ Egate',
          code: '123456',
          price: '129.000',
          status: 1
        },
        {
          title: 'Nạp tiền từ Egate',
          code: '123456',
          price: '129.000',
          status: 1
        }
      ]
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
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => <Item index={data.index} length={this.state.data.length} data={data.item}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23434d',
    flex: 1,
    padding: 15
  },
})

export default History;
