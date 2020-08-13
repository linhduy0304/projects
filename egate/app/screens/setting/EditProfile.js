

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Nav from '../../components/Nav';
import Css from '../../config/Css';
import { Actions } from 'react-native-router-flux';
import Input from '../../components/Input';
import ButtonGradient from '../../components/ButtonGradient';
import { screen } from '../../config/System';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_pass: '',
      new_pass: '',
      confirm_pass: '',
      verify: '',
    };
  }

  render() {
    const {old_pass, new_pass, confirm_pass, verify} = this.state;
    return (
      <View style={styles.container}>
        <Nav title='Edit Profile'>
          <TouchableOpacity onPress={() => Actions.pop()} style={Css.ctBack}>
            <Image style={Css.icBack} source={require('../../icons/ic_left.png')}/>
          </TouchableOpacity>
        </Nav>
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={styles.body}>
            <Input
              value={old_pass}
              label='FullName'
              textColor='#323643'
              tintColor = '#929292'
              paddingRight={80}
              onChangeText={text => this.setState({old_pass: text})}
            />
            <Input
              value={new_pass}
              label='ID'
              textColor='#323643'
              tintColor = '#929292'
              paddingRight={80}
              onChangeText={text => this.setState({new_pass: text})}
            />
            <Input
              value={confirm_pass}
              label='Email'
              textColor='#323643'
              tintColor = '#929292'
              paddingRight={80}
              onChangeText={text => this.setState({confirm_pass: text})}
            />
            <Input
              value={verify}
              label='Link to web'
              textColor='#323643'
              tintColor = '#929292'
              paddingRight={80}
              onChangeText={text => this.setState({verify: text})}
            />
            <View style={{alignItems: 'center'}}>
              <ButtonGradient
                label='SAVE'
                width={screen.width/2}
                borderRadius={30}
              />
            </View>
          
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },
  body: {
    flex: 1,
    padding: 15,
  }
})
export default EditProfile;
