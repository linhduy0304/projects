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
import css from '../Css';
import { Actions } from 'react-native-router-flux';
import TypeLot from '../components/LOT/TypeLot';
import Button from '../components/Button';
import ConstSystem from '../services/ConstSystem'
import {getYear} from '../components/Functions'
import TextShow from '../components/TextShow';
import ItemBC from '../components/BC/ItemBC';

const Year = ConstSystem.Year;
const Month = ConstSystem.Month
const window = Dimensions.get('window');

class PL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: getYear().toString(),
      month: '',
      data: [
        {
          MNV: '01',
          TNV: 'lê Linh Duy',
          CD: 'Nhân viên',
          CNS: '2',
          CNT: '100',
          CNL: '100',
          CDT: '100',
          CLVC3: '100',
          CCT: '100',
          CNP: '100',
          CNLT: '100',
          CNVRHL: '100',
          NCDCN: '100',
          CNB: '100',
          CNV: '100',
          CNTNLD: '100',
          TCHL: '100',
          CNTS: '100',
          CNO: '100',
          CNVRKHL: '100',
          TCHBHXH: '100',
        },
        
      ],
      // data: [
      //   {
      //     title: 'Mã nhân viên',
      //     value: '01'
      //   },
      //   {
      //     title: 'Họ tên',
      //     value: 'Lê Linh Duy'
      //   },
      //   {
      //     title: 'Chức danh',
      //     value: 'Nhân viên'
      //   },
      //   {
      //     title: 'Phòng ban',
      //     value: 'CNTT'
      //   },
      //   {
      //     title: 'Mức lương',
      //     value: '10,000,000'
      //   },
      //   {
      //     title: 'Khen thưởng',
      //     value: 'Không'
      //   },
      //   {
      //     title: 'Phúc lợi',
      //     value: '01'
      //   },
      //   {
      //     title: 'Lương tháng 13',
      //     value: '10,000,000'
      //   }
      // ]
    }
  }

  render() {
    return (
      <View style={[css.container, {backgroundColor: '#e7e7e7'}]}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#1ab394'}} >
          <NavButton/>
            <NavTitle style={css.navTitle}>
              <Text style={css.txtTitle}>Phiếu lương</Text>
            </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../icons/ic_back.png')} />
          </TouchableOpacity>
        </NavBar>

        <View style={styles.content}>
          <View style={{flexDirection: 'row', padding: 15, backgroundColor: '#fff', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <TypeLot 
                title={'Năm'} 
                data={Year}
                value={this.state.year}
                onChange={(year) => this.setState({year})}
              />
            </View>
            <View style={{flex: 1}}>
              <TypeLot 
                title={'Kỳ công'} 
                data={Month}
                value={this.state.month}
                onChange={(month) => this.setState({month})}
              />
            </View>
            <View style={{flex: 1,}}>
              <Button 
                title = 'Xem'
                color = 'white'
                height = {40}
                onPress = {() => null}
                fontSize = {16}
                fontWeight = '400'
                backgroundColor = 'rgb(38, 114, 203)'
              />
            </View>
           
          </View>
          <FlatList 
            data={this.state.data}
            contentContainerStyle={{ backgroundColor: '#e7e7e7', padding: 15}}
            renderItem = {data =>  <ItemBC data = {data.item}/>}
          />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  content: {
    flex: 1,
  },

});

export default (PL)
