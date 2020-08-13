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
  Dimensions,
  FlatList,
} from 'react-native';

import NavBar, { NavButton, NavTitle } from 'react-native-nav';
import css from '../../Css';
import { Actions } from 'react-native-router-flux';
import TypeLot from '../../components/LOT/TypeLot';
import InputReason from '../../components/LOT/InputReason';
import DatePicker from 'react-native-datepicker';
import ItemFilter from '../../components/LOT/ItemFilter';
import ConstSystem from '../../services/ConstSystem'
import Button from '../../components/Button';

const  DMVS = ConstSystem.DMVS;
const window = Dimensions.get('window');

export default class DKN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'RVS',
      reason: '',
      arrFilter: [0, 1, 2, 3],
      time: '',
      data: [
        {
          time: '15-06-2018'
        },
        {
          time: '15-06-2018'
        },
        {
          time: '15-06-2018'
        },
        {
          time: '15-06-2018'
        },
        {
          time: '15-06-2018'
        }
      ],
    }
  }

  renderItem(data) {
    return (
      <View style={styles.ctItem}>
        <Text>{data.time}</Text> 
        <Text>{data.time}</Text>  
        <Text>{data.time}</Text> 
        <Text>{data.time}</Text> 
        <Text>{data.time}</Text> 

      </View>
    )
  }

  filter(value) {
    var a = this.state.arrFilter;
    for(var i = 0; i <= a.length; i++) {
      if(a[i] === value) {
        a.splice(i, 1);
        this.setState({
          arrFilter: a
        });
        return;
      }
    }
    a.unshift(value);
    this.setState({
      arrFilter: a
    })
  }

  renderHeader() {
    return (
      <View style= {{backgroundColor: '#fff'}}>
        <View style={{padding: 15}}>
            <TypeLot 
              title={'Loại đi muộn về sớm'} 
              data={DMVS}
              value={this.state.value}
              onChange={(value) => this.setState({value})}
            />
            <InputReason 
                onChange={reason => this.setState({reason})}
                value={this.state.reason}
              />
            <InputReason 
                title='Thời gian đăng ký (Đơn vị: Phút)'
                onChange={time => this.setState({time})}
                value={this.state.time}
              />

            <Button 
              title = 'Gửi đăng ký'
              color = 'white'
              marginTop = {15}
              onPress = {() => null}
              fontSize = {16}
              fontWeight = '500'
              backgroundColor = 'rgb(38, 114, 203)'
            />
           
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Image style={{height: 20, width: 20, marginRight: 15}} source={require('../../icons/ic_filter.png')} />
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <ItemFilter filter={this.state.arrFilter} onPress={(value) => this.filter(value)} data={{title: 'Đăng ký', value: 0, color: 'green'}}/>
                  <ItemFilter filter={this.state.arrFilter} onPress={(value) => this.filter(value)} data={{title: 'Chờ phê duyệt', value: 1, color: '#D83601'}}/>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <ItemFilter filter={this.state.arrFilter} onPress={(value) => this.filter(value)} data={{title: 'Đã phê duyệt', value: 2, color: 'blue'}}/>
                  <ItemFilter filter={this.state.arrFilter} onPress={(value) => this.filter(value)} data={{title: 'Từ chối', value: 3, color: 'red'}}/>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.ctTitle}>
            <Text style={styles.txtTitle}>Danh sách đã đăng ký đi muộn về sớm</Text>
          </View>
      </View>
    )
  }


  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#1ab394'}} >
          <NavButton/>
            <NavTitle style={css.navTitle}>
              <Text style={css.txtTitle}>{this.props.title}</Text>
            </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../../icons/ic_back.png')} />
          </TouchableOpacity>
        </NavBar>

        <View style={styles.content}>
          
          <View style={{flex: 1, backgroundColor: '#e7e7e7'}}>
            <FlatList 
              data={this.state.data}
              ListHeaderComponent = {() => this.renderHeader()}
              contentContainerStyle={{ backgroundColor: '#e7e7e7',paddingBottom: 15 }}
              renderItem={data => this.renderItem(data.item)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 15,
    marginBottom: 0
  },
  txtTitle: {
    color: '#fff'
  },
  ctTitle: {
    backgroundColor: '#D83601',
    padding: 10,
    paddingLeft: 15

  },
  content: {
    flex: 1,
  },
});
