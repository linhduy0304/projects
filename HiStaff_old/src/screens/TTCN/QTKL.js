/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Picker, 
  FlatList,
  Dimensions,
} from 'react-native';

import NavBar, { NavButton, NavTitle } from 'react-native-nav';
import css from '../../Css';
import { Actions } from '../../../node_modules/react-native-router-flux';
import ItemQTKL from '../../components/TTCN/ItemQTKL';

const window = Dimensions.get('window');

class QTKL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          SQD: 'Không xác định thời gian',
          NHL: '12/7/HDLD',
          NVP: '12/7/2018',
          CKL: '2',
          HTKL: '',
          TP: '50000'
        },
        
      ]
    }
  }

  render() {
    return (
      <View style={[css.container, {backgroundColor: '#e7e7e7'}]}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#1ab394'}} >
          <NavButton/>
            <NavTitle style={css.navTitle}>
              <Text style={css.txtTitle}>Qúa trình kỷ luật</Text>
            </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../../icons/ic_back.png')} />
          </TouchableOpacity>
        </NavBar>
        <FlatList 
          data={this.state.data}
          contentContainerStyle={{ backgroundColor: '#e7e7e7', padding: 15}}
          renderItem = {data =>  <ItemQTKL data = {data.item}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  body: {
    padding: 15,
    paddingBottom: 30
  },

});

export default (QTKL)
