

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { screen } from '../../config/Constant';
import Button from '../Button';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.data.email,
      name: this.props.data.name,
      phone: this.props.data.phone,
      address: this.props.data.address,
      account: this.props.data.owner_account,
      bank_number: this.props.data.bank_number,
    };
  }

  update() {
    var body = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      owner_account: this.state.account,
      bank: this.props.bank,
      bank_branch: this.props.branch,
      bank_number: this.state.bank_number
    }
    this.props.update(body)
  }

  render() {
    const {email, phone, address, account, branch, bank, bank_number, name} = this.state
    return (
      <View>
        <View style={[css.ctItem , {marginTop: 4}]}>
          <Text style={css.email}>Email</Text>
          <View style={css.ctInput}>
            <TextInput 
              editable={false}
              value={email}
              style={{flex: 1, padding: 0,color: '#ccc', paddingLeft: 15,}}
            />
          </View>
        </View>
        <View style={css.ctItem}>
          <Text style={css.email}>Họ tên</Text>
          <View style={css.ctInput}>
            <TextInput 
              value={name}
              onChangeText={text => this.setState({name: text})}
              style={{flex: 1, padding: 0, paddingLeft: 15, color: '#333'}}
            />
          </View>
        </View>
        <View style={css.ctItem}>
          <Text style={css.email}>Số điện thoại</Text>
          <View style={css.ctInput}>
            <TextInput 
              value={phone}
              onChangeText={text => this.setState({phone: text})}
              style={{flex: 1, padding: 0, paddingLeft: 15, color: '#333'}}
            />
          </View>
        </View>
        <View style={css.ctItem}>
          <Text style={css.email}>Địa chỉ</Text>
          <View style={css.ctInput}>
            <TextInput 
              value={address}
              onChangeText={text => this.setState({address: text})}
              style={{flex: 1, padding: 0, paddingLeft: 15, color: '#333'}}
            />
          </View>
        </View>
        <View style={css.ctItem}>
          <Text style={css.email}>Chủ tài khoản</Text>
          <View style={css.ctInput}>
            <TextInput 
              value={account}
              onChangeText={text => this.setState({account: text})}
              style={{flex: 1, padding: 0, paddingLeft: 15, color: '#333'}}
            />
          </View>
        </View>

        <View style={css.ctItem}>
          <Text style={css.email}>Ngân hàng</Text>
          <TouchableOpacity onPress={() => this.props.openBank()} style={css.ctInput}>
            <Text numberOfLines={1} style={{color: '#333', marginLeft: 15}}>{this.props.bank}</Text>
          </TouchableOpacity>
        </View>

        <View style={css.ctItem}>
          <Text style={css.email}>Chi nhánh</Text>
          <TouchableOpacity onPress={() => this.props.openBranch()} style={css.ctInput}>
            <Text style={{color: '#333', marginLeft: 15}}>{this.props.branch}</Text>
          </TouchableOpacity>
        </View>

        <View style={css.ctItem}>
          <Text style={css.email}>Số tài khoản</Text>
          <View style={css.ctInput}>
            <TextInput 
              value={bank_number}
              onChangeText={text => this.setState({bank_number: text})}
              style={{flex: 1, padding: 0, paddingLeft: 15, color: '#333'}}
            />
          </View>
        </View>
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
          <Button 
            label='HUỶ BỎ'
            backgroundColor='#fff'
            fontWeight ='bold'
            onPress={() => this.props.cancel()}
            color='#0674c1'
            marginTop={20}
            borderRadius={20}
          />
          <Button 
            label='CẬP NHẬT'
            backgroundColor='#c41a36'
            fontWeight ='bold'
            onPress={() => this.update()}
            color='#fff'
            marginTop={20}
            borderRadius={20}
          />
        </View>
        
      </View>
    );
  }
}

const css = StyleSheet.create({
  email: {
    width: screen.width/3,
    color: '#6e6e6e'
  },
  ctItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 7,
    paddingBottom: 7
  },
  ctInput: {
    flex: 1,
    backgroundColor: '#e6eff1',
    height: 30,
    justifyContent: 'center',
    borderRadius: 20,
  },
})

export default EditProfile;
