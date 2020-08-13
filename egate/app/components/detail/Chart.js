

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import ChartHeader from '../ChartHeader';
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1, //1: day, 2: weedk, 3: month
    };
  }

  render() {
    const {type} = this.state;
    return (
      <View style={css.ct}>
        <ChartHeader type={type} onPress={data => this.setState({type: data})}/>
        <View style={[css.ctHeader, {marginTop: 12}]}>
          <View style={css.ctHeader}>
            <View style={css.circle}/>
            <Text style={{color: '#1ec070', marginLeft: 5}}>Max: $55.55</Text>
          </View>
          <View style={[css.ctHeader, {marginLeft: 20}]}>
            <View style={[css.circle,{backgroundColor: '#ffba00'}]}/>
            <Text style={{color: '#ffba00', marginLeft: 5}}>Min: $55.55</Text>
          </View>
        </View>
      </View>
    );
  }
}

const css = StyleSheet.create({
  ct: {
    marginTop: 20
  },
  ctHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#1ec070',
  },
})

export default Chart;
