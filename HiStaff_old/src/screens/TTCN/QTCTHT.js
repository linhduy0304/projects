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
import ItemQTCTHT from '../../components/TTCN/ItemQTCTHT';

const window = Dimensions.get('window');

class QTCTHT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'Tờ trình tuyển dụng',
          time_start: '01/01/2016',
          time_end: '15/06/2018',
          situation: 'Nhân viên',
          level: 14,
          unit: 'Ban BQLDA',
          time: '01/01/2016',
          user: 'Nguyễn Việt Sơn',
          level_user: 'Chánh văn phòng chủ tịch'
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
              <Text style={css.txtTitle}>Qúa trình công tác hiện tại</Text>
            </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../../icons/ic_back.png')} />
          </TouchableOpacity>
        </NavBar>
        <FlatList 
          data={this.state.data}
          contentContainerStyle={{ backgroundColor: '#e7e7e7', padding: 15}}
          renderItem = {data =>  <ItemQTCTHT data = {data.item}/>}
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

export default (QTCTHT)
