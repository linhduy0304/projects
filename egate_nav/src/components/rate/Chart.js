

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
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
        <View style={[{marginTop: 12}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={css.ctHeader}>
              <View style={css.circle}/>
              <Text style={{color: '#1ec070', marginLeft: 5}}>Max: $55.55</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{width: 7, height: 10}} source={require('../../icons/ic_decre.png')}/>
              <Text style={{color: '#ffba00', marginLeft: 5}}>8.55 USD (2.56%)</Text>
            </View>
          </View>
        
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <View style={[css.ctHeader, ]}>
              <View style={[css.circle,{backgroundColor: '#ffba00'}]}/>
              <Text style={{color: '#ffba00', marginLeft: 5}}>Min: $55.55</Text>
            </View>
            <Text style={{color: '#fff'}}>since last</Text>
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
    width: 120,
  },
  circle: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#1ec070',
  },
})

export default Chart;
