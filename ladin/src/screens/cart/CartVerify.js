
import React, { Component, PureComponent } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import Nav from '../../components/cart/Nav';
import Button from '../../components/Button';
import { screen } from '../../config/Constant';
import VerifyAddress from '../../components/cart/VerifyAddress';
import SimpleToast from 'react-native-simple-toast'
import Loading from '../../components/register/Loading';

class CartVerify extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.cart.orders,
      th: this.props.cart.totalPrice,
      totalShip: 0,
      carts: [],
    };
  }

  componentWillMount = () => {
    // var body = {
    //   "name": this.props.data.name,
    //   "phone": this.props.data.phone,
    //   "address": this.props.data.address,
    //   "city": this.props.data.city,
    //   "town": this.props.data.town,
    //   "area": this.props.data.area,
    //   "carts": [],
    // };
    // this.setState({
    //   body
    // })

  };
  

  verfy() {
    // if(this.state.th < (this.props.cart.totalPrice+this.state.totalShip)) {
    //   SimpleToast.show('Giá thu hộ phải không được nhỏ hơn thành tiền')
    //   return;
    // }
    for(let i of this.state.carts) {
      if(i.collected < i.totalPrice) {
        return
      }
    }
    var body = {
      "name": this.props.data.name,
      "phone": this.props.data.phone,
      "address": this.props.data.address,
      "city": this.props.data.city,
      "town": this.props.data.town,
      "area": this.props.data.area,
      carts: this.state.carts
    }
    this.props.verifyOrder(body, this.props.cart.orders)
  }

  setNote(text, product_id, provider_id) {
    var carts = this.state.carts
    for(let i of carts) {
      if(i.provider_id == provider_id) {
        for(let j of i.products) {
          if(j.product_id == product_id) {
            j.note = text;
            this.setState({carts})
            return;
          }
        }
      }
    }
  }

  setCart = (data) => {
    var carts = this.state.carts;
    carts.push(data)
    this.setState({carts})
  }

  setCollected = (collected, provider_id) => {
    var carts = this.state.carts
    for(let i of carts) {
      if(i.provider_id == provider_id) {
        i.collected = collected;
        this.setState({carts})
        return;
      }
    }
  }

  render() {
    const { data} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#e6eff1', }}>
        {
          this.props.cart.loading ? 
            <Loading/>
          : null
        }
        <Nav label='XÁC NHẬN ĐƠN HÀNG'
        />
        <ScrollView>
          <View style={{flex: 1,width: screen.width, padding: 10}}>
            {
              data.map((item, index) => {
                return (
                  <ItemCartVerify
                    data={item}
                    key={index}
                    toTown={this.props.data.town_id}
                    setNote={(text, product_id, provider_id) => this.setNote(text, product_id, provider_id)}
                    setCart={data => this.setCart(data)}
                    setCollected={(collected, provider_id) => this.setCollected(collected, provider_id)}
                  />
                )
              }) 
            }
            <VerifyAddress data={this.props.data}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button 
                label='HUỶ BỎ'
                color='#9a9a9a'
                fontWeight='bold'
                borderRadius={20}
                onPress={() => Actions.tab({type: 'reset'})}
                backgroundColor='#fff'
              />
               <Button 
                label='XÁC NHẬN'
                color='#fff'
                onPress={() => this.verfy()}
                borderRadius={20}
                fontWeight='bold'
                backgroundColor='#c41a36'
              />
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {loadAddress, verifyOrder} from '../../actions/cart';
import ItemCartVerify from '../../components/cart/ItemCartVerify';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadAddress: () => dispatch(loadAddress()),
    verifyOrder: (body, orders) => dispatch(verifyOrder(body, orders))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartVerify);
