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
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import ConstSystem from '../../services/ConstSystem'
import TypeLot from '../../components/LOT/TypeLot';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const  type_LOT = ConstSystem.LOT;
const window = Dimensions.get('window');

class PDN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'P/B',
      employee: '',
      data: [
        {
          id: 1,
          full_name: 'Le Linh Duy',
          time: '01/01/2017',
          time_start: '01/01/2017',
          time_end: '10/01/2017',
          lot: '[P/B] 1/2 ngày nghỉ phép',
          type: 0,
          note: ''
        },
        {
          id: 1,
          full_name: 'Le Linh Duy',
          time: '01/01/2017',
          time_start: '01/01/2017',
          time_end: '10/01/2017',
          lot: '[P/B] 1/2 ngày nghỉ phép',
          type: 1,
          note: ''
        },
        {
          id: 1,
          full_name: 'Le Linh Duy',
          time: '01/01/2017',
          time_start: '01/01/2017',
          time_end: '10/01/2017',
          lot: '[P/B] 1/2 ngày nghỉ phép',
          type: 2,
          note: ''
        },
      ]
    }
  }

  renderAction(type) {
    switch(type) {
      case 0:
        return (
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1,paddingRight: 15}}>
              <Button 
                title = 'Duyệt'
                color = 'white'
                height = {35}
                marginTop = {10}
                onPress = {() => null}
                fontSize = {14}
                fontWeight = '400'
                backgroundColor = 'rgb(38, 114, 203)'
              />
            </View>
            <View style={{flex: 1, paddingLeft: 15}}>
              <Button 
                title = 'Không duyệt'
                color = 'white'
                height = {35}
                marginTop = {10}
                onPress = {() => null}
                fontSize = {14}
                fontWeight = '400'
                backgroundColor = '#D83601'
              />
            </View>
          </View>
        )
      case 1:
        return <Text><Text>Trạng thái: </Text>Đã duyệt</Text>
      default:
        return <Text><Text>Trạng thái: </Text>Không duyệt</Text>
    }
  }

  renderItem(data) {
    return (
      <View style={{padding: 15,margin: 15,marginBottom: 0, backgroundColor: '#fff', borderRadius: 4}}>
        <Text><Text>Mã NV: </Text>{data.id}</Text>
        <Text><Text>Tên NV: </Text>{data.full_name}</Text>
        <Text><Text>Ngày đăng ký: </Text>{data.time}</Text>
        <Text><Text>Từ ngày: </Text>{data.time_start}</Text>
        <Text><Text>Đến ngày: </Text>{data.time_end}</Text>
        <Text><Text>Loại đăng ký: </Text>{data.type}</Text>
        <Text><Text>Ghi chú: </Text>{data.note}</Text>
        {this.renderAction(data.type)}
      </View>
    )
  }

  renderHeader() {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <View style={styles.ctDate}>
            <DatePicker
              style={{flex: 1}}
              date={this.state.date}
              mode="date"
              placeholder="Từ ngày"
              format="DD-MM-YYYY"
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minDate='01-01-1900'
              maxDate={'01-01-2200'}
              onDateChange={(date) => this.setState({date: date})}
              customStyles={
                {
                    dateInput: {
                      // marginLeft: 40,
                    borderWidth: 0,
                    alignItems:'flex-start',
                    flex: 1,
                  },
                  placeholderText:{color:'#c2c5d0',fontSize: 15}
              }}
            />
            <Text style={{marginLeft: 10, marginRight: 10}}>-></Text>
            <DatePicker
              style={{flex: 1}}
              date={this.state.date}
              mode="date"
              placeholder="Đến ngày"
              format="DD-MM-YYYY"
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minDate='01-01-1900'
              maxDate={'01-01-2200'}
              onDateChange={(date) => this.setState({date: date})}
              customStyles={
                {
                    dateInput: {
                      // marginLeft: 40,
                    borderWidth: 0,
                    alignItems:'flex-start',
                    flex: 1,
                  },
                  placeholderText:{color:'#c2c5d0',fontSize: 15}
              }}
            />
          </View>
          <View style={{padding: 15, paddingTop: 0}}>
            <TypeLot 
              title={'Loại đăng ký'} 
              data={type_LOT}
              value={this.state.value}
              onChange={(value) => this.setState({value})}
            />
            <TextInput 
              label='Nhân viên'
              value={this.state.employee}
              editable={true}
              onChange={value => this.setState({employee: value})}
            />
            <Button 
              title = 'Tìm kiếm'
              color = 'white'
              marginTop = {10}
              onPress = {() => null}
              fontSize = {16}
              fontWeight = '500'
              backgroundColor = 'rgb(38, 114, 203)'
            />
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
          

          <View style={{flex: 1}}>
            <FlatList 
              data={this.state.data}
              ListHeaderComponent = {() => this.renderHeader()}
              contentContainerStyle={{ backgroundColor: '#e7e7e7',paddingBottom: 15}}
              renderItem={data => this.renderItem(data.item)}
            />
          </View>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctDate: {
    flexDirection: 'row',
    margin: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#c2c4ca',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});

export default (PDN);
