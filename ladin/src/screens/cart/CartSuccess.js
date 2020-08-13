
import React, { Component, PureComponent } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import Button from '../../components/Button';
import { Actions } from 'react-native-router-flux';
import { delProduct } from '../../database/allSchema';
import NavCartSuccess from '../../components/cart/NavCartSuccess';

class CartSuccess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount = () => {
    for(let i of this.props.orders) {
      for(let j of i.product) {
        delProduct(i.provider_id, j)
      }
    }
  };

  next = () => {
    this.props.setTab('home')
    Actions.tab({type: 'reset'})
  }
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#e6eff1'}}>
        <NavCartSuccess label='ĐẶT HÀNG THÀNH CÔNG'
        />
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image style={{width: 30, height: 30, margin: 15}} source={require('../../icons/ic_confirm.png')} />
          <Text style={styles.intro}>Chúc mừng bạn đã đặt hàng thành công</Text>
          <Button 
            label='TRANG CHỦ'
            marginTop={24}
            color='#fff'
            onPress={() => this.next()}
            backgroundColor='#c41a36'
            borderRadius={20}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 intro: {
   color: '#333'
 },
})

import {connect} from 'react-redux';
import {setTab} from '../../actions/tab'
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTab: (data) => dispatch(setTab(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSuccess);
