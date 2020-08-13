

import React from 'react';
import { Text,StatusBar, View,Platform, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Color } from '../../config/Constant';
import StBar from '../StBar';
import realm , { showAll } from "../../database/allSchema";

class Nav extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: 0
    };
    realm.addListener('change', () => {
      this.loadAll()
    })
  }

  loadAll() {
    var countCart = 0;
    showAll().then(data => {
      for(let i = 0; i < data.length; i++) {
        length = data[i].product.length;
        countCart = countCart + length;
      }
      this.setState({data: countCart})
    }).catch(error => {
      console.log(error)
    })
  }

  componentWillMount = () => {
    this.loadAll()
  };

  renderCount() {
    if(this.props.auth.isLogin) {
      if(this.state.data == 0) {
        return null
      }else {
        return (
          <View style={{position: 'absolute',right: 0, width: 20, marginTop: 2,height: 20,backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{color: '#e3004b', fontSize: 12}}>{this.state.data > 9 ? '9+' : this.state.data}</Text>
          </View>
        )
      }
    }else return null
  }

  render() {
    const {share, checkCart} = this.props;
    return(
      <View>
        <StatusBar
          backgroundColor={Color}
          barStyle='light-content'
        />
        {
          Platform.OS === 'ios' ?
            <StBar/>
          : null
        }
        <View style={css.ct}>
          <TouchableOpacity onPress={() => Actions.pop()} style={{padding: 15}}>
            <Image style={css.icClose} source={require('../../icons/ic_close.png')} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={checkCart} style={{padding: 15}}>
              {this.renderCount()}
              <Image style={css.icCart} source={require('../../icons/ic_cart_active.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={share} style={{padding: 15}}>
              <Image style={css.icShare} source={require('../../icons/ic_download.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const css = StyleSheet.create({
  icShare: {
    height: 20,
    width: 20
  },
  icCart: {
    height: 24,
    width: 24
  },
  icClose: {
    height: 18,
    width: 18
  },
  ct: {
    flexDirection: 'row',
    backgroundColor: '#c41a36', 
    height: 50, 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);