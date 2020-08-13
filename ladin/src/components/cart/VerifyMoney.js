

import React from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { screen } from '../../config/Constant';
import { renderVND } from '../Functions';

class VerifyMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      th: 0,
      tl: 0,
      th_text: '',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.th) {
      this.setState({
        th: nextProps.th,
        th_text: nextProps.th.toString(),
      })
    }
  };
  

  onChangeText(text) {
    var a = Number(text);
    var b = a-this.props.tt;
    this.props.setTh(a)
    this.setState({
      th_text: text,
      tl: b
    })
  }


  render() {
    return (
      <View style={css.ct}>
        {/* <View>
          <Text style={css.add}>Thành tiền</Text>
          <Text style={css.name}>{renderVND(this.props.tt)} đ</Text>
        </View> */}
        
        <View>
          <Text style={[css.add, ]}>Giá thu hộ</Text>      
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <View style={css.ctTh}>
                <TextInput 
                  placeholder='0'
                  keyboardType='numeric'
                  style={{
                    padding: 0
                  }}
                  value={this.state.th_text}
                  onChangeText={text => this.onChangeText(text)}
                />
              </View>
              <Image style={css.edit} source={require('../../icons/ic_edit.png')} />
            </View>
            
            <View >
              <Text style={css.add}>Lãi trả lại</Text>
              <Text style={css.name}>{renderVND(this.state.tl)} đ</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const css = StyleSheet.create({
  edit: {
    height: 20,
    width: 20,
    marginLeft: 15
  },
  ctTh: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  th: {
    color: '#0674c1',
    fontWeight: 'bold'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  add: {
    color: '#333',
    fontSize: 13
  },
  ct: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 15
  },
  
})

export default VerifyMoney;
