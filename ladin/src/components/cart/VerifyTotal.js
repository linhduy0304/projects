

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image
} from 'react-native';
import { renderVND } from '../Functions';

class VerifyTotal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  onChangeText(text) {
    var b = text.replace(/\./g,'')
    var a = Number(b);
    // if(isNaN(a) || !isFinite(a)) {
    if(!isFinite(a)) {
      return
    }
    if(a < (this.props.totalPrice + this.props.totalShip)) {
      this.setState({
        error: 'Giá thu hộ phải không được nhỏ hơn tổng tiền cộng phí ship'
      })
    }else {
      this.setState({
        error: null
      })
    }
    this.props.setCollected(a)
  }

  render() {
    const {error} = this.state
    return (
      <View style={css.ct}>
        <View>
          <Text style={css.add}>Tổng</Text>
          <Text style={css.name}>{renderVND(this.props.totalPrice)} đ</Text>
        </View>
        <View style={{marginTop: 8}}>
          <Text style={css.add}>Phí ship</Text>      
          <Text style={css.name}>{renderVND(this.props.totalShip)} đ</Text>
        </View>

        <View style={{marginTop: 8}}>
          <Text style={[css.addTH, ]}>Giá thu hộ</Text>      
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
              <View style={[css.ctTh, {borderColor: error ? 'red' : '#d1d1d1',}]}>
                <TextInput 
                  placeholder='0'
                  dataDetectorTypes='phoneNumber'
                  keyboardType='numeric'
                  style={{
                    padding: 5,
                    paddingLeft: 10,
                    paddingRight: 10
                  }}
                  value={renderVND(this.props.collected)}
                  onChangeText={text => this.onChangeText(text)}
                />
              </View>
              <Image style={css.edit} source={require('../../icons/ic_edit.png')} />
            </View>

            <View>
              <Text style={css.addTH}>Lãi trả lại</Text>
              <Text style={css.name}>{renderVND(this.props.collected - (this.props.totalPrice+ this.props.totalShip))} đ</Text>
            </View>
          </View>
        </View>
        {
          error ?
          <Text style={{color: 'red'}}>{error}</Text>
          : null
        }
      </View>
    )
  }
}


const css = StyleSheet.create({
  edit: {
    height: 20,
    width: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  ctTh: {
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  th: {
    color: '#0674c1',
    fontWeight: 'bold'
  },
  
  addTH: {
    color: '#333',
    fontSize: 13
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  add: {
    color: '#333',
  },
  ct: {
    padding: 10,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  
})

export default VerifyTotal;
