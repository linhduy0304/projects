
import React, { Component, PureComponent } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Nav from '../../components/cart/Nav';
import Button from '../../components/Button';
import { Actions } from 'react-native-router-flux';

class Add extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  verify() {
    var data = this.props.data;
    data['type'] = this.state.active
    Actions.cartVerify({data})
  }

  render() {
    const {active} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#e6eff1'}}>
        <Nav label='TẠO ĐƠN HÀNG'
        />
        <View style={{flex: 1, padding: 20, alignItems: 'center'}}>
          <Text style={styles.intro}>Vui lòng chọn phương thức đơn hàng</Text>
          <View style={styles.ct}>
            <TouchableOpacity onPress={() => this.setState({active: 0})} style={[styles.ctItem, {backgroundColor: active === 0 ? '#026eb9' : '#fff', borderTopLeftRadius: 4, borderBottomLeftRadius: 4}]}>
              <Text style={[styles.txt, {color: active === 0 ? '#fff' : '#333'}]}>MUA HÀNG</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({active: 1})} style={[styles.ctItem, {backgroundColor: active === 1 ? '#026eb9' : '#fff', borderTopRightRadius: 4, borderBottomRightRadius: 4}]}>
              <Text style={[styles.txt, {color: active === 1 ? '#fff' : '#333'}]}>BÁN HÀNG ONLINE</Text>
            </TouchableOpacity>
          </View>
          <Button 
            label='XÁC NHẬN'
            marginTop={30}
            backgroundColor='#c41a36'
            color='#fff'
            fontWeight='bold'
            borderRadius={20}
            onPress={() => this.verify()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt: {
    fontWeight: 'bold',
    fontSize: 13
  },
  intro: {
    color: '#333'
  },
  ctItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  ct: {
    height: 45,
    flexDirection: 'row',
    marginTop: 20,
  },
})

export default Add;
