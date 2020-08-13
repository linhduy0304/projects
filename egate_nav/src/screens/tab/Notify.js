

import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform
} from 'react-native';
import StBar from '../../components/StBar';
import Item from '../../components/notify/Item';
import { color } from '../../config/System';

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: 'Nạp tiền từ Egate',
          code: '123456',
        },
        {
          title: 'Nạp tiền từ Egate',
          code: '123456',
        },
        {
          title: 'Nạp tiền từ Egate',
          code: '123456',
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
  ctIcon: {
    backgroundColor: '#fff',
    height: 30, 
    width: 30,
    borderRadius: 15,
  },
  container: {
    backgroundColor: '#23434d',
    flex: 1,
    padding: 15
  },
})

export default Notify;
