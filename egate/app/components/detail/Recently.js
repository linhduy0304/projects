

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import Item from '../history/Item';

class Recently extends Component {
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
      <View style={css.ct}>
        <Text style={css.label}>Recently</Text>
        {
          this.state.data.map((item, index) => {
            return <Item key={index} index={index} length={this.state.data.length} data={item}/>
          })
        }
      </View>
    );
  }
}

const css = StyleSheet.create({
  ctLeft: {
    flex: 1,
  },
  ctItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    marginBottom: 1,
    padding: 15
  },
  ct: {
    marginTop: 20
  },
  label: {
    color: '#fff',
    marginBottom: 10
  },
})

export default Recently;
