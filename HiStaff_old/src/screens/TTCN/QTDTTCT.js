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
import ItemQTDTTCT from '../../components/TTCN/ItemQTDTTCT';

const window = Dimensions.get('window');

class QTDTTCT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          TKDT: 'Tờ trình tuyển dụng',
          TCTDT: '01/01/2016',
          NCC: '15/06/2018',
          LVDT: '',
          HTDT: '',
          TL: '6 tháng',
          TGBD: '12/1/2017',
          TGKT: '12/07/2017',
          TTDT: 'ITPlus',
          NDDT: '',
          MD: '',
          DDTC: '',
          DDT: '',
          KQ: '',
          XL: '',
          VBCC: '',
          THCC: '',
          NCCC: '',
          NHCC: '',
          SCC: '',
          TGCC: '',
          NBDCC: '',
          NKTCC: '',
          GC: '',
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
              <Text style={css.txtTitle}>Qúa trình đào tạo trong công ty</Text>
            </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../../icons/ic_back.png')} />
          </TouchableOpacity>
        </NavBar>
        <FlatList 
          data={this.state.data}
          contentContainerStyle={{ backgroundColor: '#e7e7e7', padding: 15}}
          renderItem = {data =>  <ItemQTDTTCT data = {data.item}/>}
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

export default (QTDTTCT)
