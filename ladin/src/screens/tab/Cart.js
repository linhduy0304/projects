

import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  Alert,
  FlatList
} from 'react-native';
import Nav from '../../components/home/Nav';
import ItemCart from '../../components/cart/ItemCart';
import Button from '../../components/Button';
import NoData from '../../components/NoData';
import {Color} from '../../config/Constant';
import { Actions } from 'react-native-router-flux';
import realm , { showAll, delProduct } from "../../database/allSchema";


// if(arrProduct.length === 0) {
//   arrProduct.unshift(product);
//   arrId.unshift(product.id);
//   var orders = {
//     id: provider.id,
//     name: provider.name,
//     types: provider.types,
//     weight: 10000,
//     product: arrProduct
//   }
//   this.setState({
//     arrProduct,
//     arrId,
//     arrOder: orders
//   })
  
// }else {
//   for(var i = 0; i< arrProduct.length; i++) {
//     if(arrProduct[i].id === product.id) {
//       arrProduct.splice(i, 1);
//       arrId.splice(i, 1);
//       this.setState({arrProduct, arrId});
//       return;
//     }
//   }
//   arrProduct.unshift(product);
//   arrId.unshift(product.id)
//   this.setState({arrProduct, arrId})

// }

const Css = require('../../config/css');

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      arrProduct: [],
      arrOder: [],
      arrId: [],
    };
    realm.addListener('change', () => {
      this.loadAll()
    })
  }

  loadAll() {
    showAll().then(data => {
      // for(i of data[0].product) {
      //   console.log(i)
      // }
      this.setState({data})
    }).catch(error => {
      console.log(error)
    })
  }

  componentWillMount = () => {
    this.loadAll()
  };

  renderFooter() {
    return (
      <View style={{alignItems: 'center'}}>
        {
          this.state.data.length === 0 ?
            <NoData label='Giỏ hàng của bạn chưa có sản phẩm nào'/>
          :
          <Button 
            onPress={() => this.create()}
            label='TẠO ĐƠN HÀNG'
            borderRadius={20}
            color='#fff'
            fontWeight='bold'
            backgroundColor={Color}
          />
      }
      </View>
    )
  }

  calculate(arrOder) {
    var totalWeight = 0;
    var totalPrice = 0
    for(let item of arrOder) {
      for(let i of item.product) {
        totalPrice = totalPrice + i.price * i.quantity;
        totalWeight = totalWeight + i.weight
      }
    }
    // var totalShip = renderShip('ha-noi', totalWeight)
    this.props.createOder(this.state.arrOder, totalPrice, totalWeight)
  }

  create() {
    if(this.state.arrOder.length === 0) {
      SimpleToast.show('Bạn chưa chọn sản phẩm nào')
      return;
    }
    this.calculate(this.state.arrOder)
    Actions.cartListAddress({action: 'cart'})
  }

  setArrId = (product) => {
    var arrId = this.state.arrId;
    for(let i = 0; i < arrId.length; i++) {
      if(arrId[i] === product.product_id) {
        arrId.splice(i, 1);
        this.setState({arrId});
        return
      }
    }
    arrId.unshift(product.product_id);
    this.setState({arrId})
  }

  pick = (product, provider) => {
    this.setArrId(product)
    this.setArrOder(product, provider)
  }

  setArrOder = (product, provider) => {
    var arrOder = this.state.arrOder;
    if(arrOder.length === 0) {
      var arrProduct=[];
      arrProduct.unshift(product)
      var orders = {
        provider_id: provider.provider_id,
        name: provider.name,
        town_id: provider.town_id,
        types: provider.types,
        address: provider.address,
        product: arrProduct
      }
      arrOder.unshift(orders);
      this.setState({arrOder})
    }else {
      for(let i = 0; i < arrOder.length; i++) {
        if(arrOder[i].provider_id === provider.provider_id) {
          for(let j = 0; j <arrOder[i].product.length; j++) {
            if(arrOder[i].product[j].product_id === product.product_id) {
              if(arrOder[i].product.length === 1) {
                arrOder.splice(i, 1);
                this.setState({arrOder})
                return
              }else {
                arrOder[i].product.splice(j, 1);
                this.setState({arrOder})
                return
              }
            }
          }
          arrOder[i].product.unshift(product)
          this.setState({arrOder})
          return
        }
      }
      var arrProduct=[];
      arrProduct.unshift(product)
      var orders = {
        provider_id: provider.provider_id,
        name: provider.name,
        town_id: provider.town_id,
        types: provider.types,
        address: provider.address,
        product: arrProduct
      }
      arrOder.unshift(orders);
      this.setState({arrOder})
    }
  }

  actionDel(data, item) {
    delProduct(data, item);
    this.setState({
      arrId: [],
      arrOder: []
    })
  }

  delProduct(data, item) {
    Alert.alert(
      'Thông báo',
      'Bạn muốn xoá sản phẩm này khỏi giỏ hàng?',
      [
        {text: 'Xoá', onPress: () => this.actionDel(data,item), style: 'cancel'},
        {text: 'Huỷ bỏ', onPress: () => null}
      ]
    )
    
  }

  render() {
    const {data} = this.state;
    return (
      <View style={Css.container}>
        <Nav/>
        <FlatList 
          data={data}
          removeClippedSubviews
          contentContainerStyle={{padding: 10}}
          ListFooterComponent={this.renderFooter()}
          renderItem={data => <ItemCart delProduct={(data, item) => this.delProduct(data, item)} arrId={this.state.arrId} pick={(product, provider) => this.pick(product, provider)} data={data.item}/>}
          keyExtractor={(item, index) => index.toString()}
        />
       
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {createOder} from '../../actions/cart';
import SimpleToast from 'react-native-simple-toast';

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createOder: (body, totalPrice, totalWeight) => dispatch(createOder(body, totalPrice, totalWeight)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
