

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { renderCate } from '../Functions';
import ItemProduct from './ItemProduct';
import VerifyTotal from './VerifyTotal';

class ItemCartVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ship: 0,
      totalPrice: 0,
      collected: 0,
    };
  }

  api() {
    var weight = 0;
    var totalPrice = 0;
    var products = [];
    for(let i of this.props.data.product) {
      weight = (weight + i.weight*i.quantity);
      totalPrice = totalPrice + i.price*i.quantity;
      products.unshift({
        product_id: i.product_id,
        quantity: i.quantity,
        price: i.price,
        note: '',
      })
    }
    // var body = {
    //   "from_city_code": this.props.data.town_id, //this.props.data.city_code
    //   "to_city_code": this.props.toTown,//this.props.toCityCode
    //   "total_weight": weight
    // }
    // console.log(`https://cms.aladin.pea.vn/api/ships/calculate?from_id=${this.props.data.town_id}&to_id=${this.props.toTown}&weight=${weight}`)
    return fetch(`https://cms.aladin.pea.vn/api/ships/calculate?from_id=${this.props.data.town_id}&to_id=${this.props.toTown}&weight=${weight}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(body),
    }).then((response) => response.json())
    .then((res) => {
      // console.log(res)
      if(res.code == 1) {
        this.setState({
          ship: res.data.shipfee,
          totalPrice,
          collected: totalPrice + res.data.shipfee
        })
        var cart = {
          provider_id: this.props.data.provider_id,
          totalPrice,
          collected: totalPrice + res.data.shipfee,
          ship: res.data.shipfee,
          products: products
        }
        this.props.setCart(cart)
      }
      return res;
    })
    .catch((error) => {
      console.error(error);
    });;
  }

  componentWillMount = () => {
    this.api();
  };

  setCollected = (collected) => {
    this.setState({collected})
    this.props.setCollected(collected, this.props.data.provider_id)
  }

  render() {
    const {data} = this.props
    return (
      <View style={{marginBottom: 8}}>
        <View style={styles.ctHeader}>
          <Text style={{color: '#333', fontSize: 16}}>{data.name}</Text>
          <Text style={{color: '#0674c1', fontSize: 13}}>{renderCate(data.types)}</Text>
          <Text style={{color: '#888', marginTop: 5, fontSize: 13}}>{data.address}</Text>
          {/* <Text style={styles.id}>Mã đơn hàng: <Text style={{color: '#0674c1', fontWeight: 'bold', fontSize: 15}}>{item.id}</Text></Text> */}
        </View>
        <View style={styles.ctProduct}>
          {
            data.product.map((item, index) => {
              return <ItemProduct
                      ref='ItemProduct'
                      setNote={(text, product_id) => this.props.setNote(text, product_id, data.provider_id)}
                      key={index}
                      data={item}
                    />
            })
          }
        </View>
        <VerifyTotal
          totalPrice={this.state.totalPrice}
          totalShip = {this.state.ship}
          collected={this.state.collected}
          setCollected={collected => this.setCollected(collected)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctProduct: {
    backgroundColor: '#fff'
  },
  id: {
    color: '#4192cb',
    fontSize: 13
  },
  ctHeader: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    marginBottom: 1
 },
})

export default (ItemCartVerify);
