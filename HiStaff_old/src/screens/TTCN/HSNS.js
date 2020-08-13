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
  ScrollView
} from 'react-native';

import NavBar, { NavButton, NavTitle } from 'react-native-nav';
import css from '../../Css';
import { Actions } from '../../../node_modules/react-native-router-flux';
import { TextField } from 'react-native-material-textfield';
import TextInput from '../../components/TextInput';
import TextShow from '../../components/TextShow';

const window = Dimensions.get('window');

class HSNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: 'Lê Linh Duy',
      email: 'linhduy.0304.utc@gmail.com',
      username: 'linhduy0304',
      cmt: '168480683',
      address: 'Kim Bảng Hà Nam',
      telephone: '0973425393',
      sex: 1,
      birthday: '25-03-1993',
      job: 'IT',
      avatar: '',
    }
  }


  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#1ab394'}} >
          <NavButton/>
            <NavTitle >
              <Text style={css.txtTitle}>Hồ sơ nhân sự</Text>
            </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../../icons/ic_back.png')} />
          </TouchableOpacity>
        </NavBar>

        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <View style={styles.body}>
            <View style={{flexDirection: 'row'}}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.ctAvatar}>
                  <Image style={styles.avatar} source={this.state.pickImage ? {uri: this.state.avatar} :this.state.avatar ? {uri: this.state.avatar + '_100x100.png'} : require('../../icons/avatar_default.jpg')} />
                </View>
              </View>
              
              <View style={{flex: 1, marginLeft: 15}}>
                <TextShow
                  label='Tên hiển thị'
                  value={this.state.full_name}
                />
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Text style={{color: 'rgb(194, 196, 202)'}} >Giới tính:</Text>
                  <View style={{marginLeft: 20, flexDirection: 'row'}}>
                    <View onPress={() => this.setState({sex: this.state.sex == 0 ? 1: 0})} style={styles.ctSex}>
                      <View style={styles.ctTick}>
                        {
                          this.state.sex == 1 ?
                            <Image source={require('../../icons/ic_check_green.png')}/>
                            : null
                        }
                      </View>
                      <Text style={{color: 'rgb(31, 42, 53)'}}>Nam</Text>
                    </View>
                    <View onPress={() => this.setState({sex: this.state.sex == 0 ? 1: 0})} style={styles.ctSex}>
                      <View style={styles.ctTick}>
                      {
                        this.state.sex == 0 ?
                          <Image source={require('../../icons/ic_check_green.png')}/>
                          : null
                      }
                      </View>
                      <Text style={{color: 'rgb(31, 42, 53)'}}>Nữ</Text>
                    </View>
                  </View>
                </View>
                
              </View>
            </View>
            <TextShow
              label='Email'
              value={this.state.email}
            />
            <TextShow
              label='Chức danh'
              value={this.state.job}
            />
            <View style={{flexDirection: 'row'}}>
              <TextShow
                label='Số điện thoại'
                value={this.state.telephone}
              />
               <TextShow
                label='Ngày sinh'
                value={'25-03-1993'}
              />
            </View>
            <View style={{flexDirection: 'row', }}>
              <TextShow
                label='Số CMTND'
                value={this.state.cmt}
              />
              <TextShow
                label='Ngày cấp'
                value={'14-03-2015'}
              />
              <TextShow
                label='Nơi cấp'
                value={'CA Hà Nam'}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <TextShow
                label='Quốc tịch'
                value={'Việt Nam'}
              />
              <TextShow
                label='Dân tộc'
                value={'Kinh'}
              />
              <TextShow
                label='Địa chỉ'
                value={this.state.address}
              />
            </View>
            
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    padding: 15,
    paddingBottom: 30
  },
  avatar: {
    height: 80, 
    width: 80,
    borderRadius: 40
  },
  ctTick: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10
  },
  ctSex: {
    flexDirection: 'row',
    padding: 5,
  },
});

export default (HSNS)
