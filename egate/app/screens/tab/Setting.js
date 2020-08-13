

import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import Nav from '../../components/Nav';
import Header from '../../components/setting/Header';
import {setting, screen, color} from '../../config/System';
import Item from '../../components/setting/Item';
import Button from '../../components/Button';
import StBar from '../../components/StBar';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatar: 'https://static.ipick.vn/images/avatars/conheonho_9x_Rxpj7AObCG_300x300.png',
        id: '123555',
        name: 'Lê Linh Duy'
      }
    };
  }

  render() {
    return (
      <View>
        {
          Platform.OS === 'ios' ?
            <StBar backgroundColor={color}/>
            : null
        }
        <Header data={this.state.user}/>
        {
          setting.map((item, index) => {
            return <Item data={item} length = {setting.length} key={index} index={index}/>
          })
        }
        <View style={{flex: 1, alignItems: 'center'}}>
          <Button
            label='LOG OUT'
            color='red'
            fontSize={16}
            width={screen.width/2}
          />
        </View>
       
      </View>
    );
  }
}

export default Setting;
