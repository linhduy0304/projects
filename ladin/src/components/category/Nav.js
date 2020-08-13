

import React from 'react';
import { Text, View, Image,Platform, TextInput, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Color, screen } from '../../config/Constant';
import { Actions } from 'react-native-router-flux';
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

  direct() {
    if(this.props.auth.isLogin) {
      this.props.setTab('cart')
      Actions.tab({type: 'reset'})

    }else {
      Actions.login()
    }
  }

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
    const {title} = this.props
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
            <Image style={{height: 20, width: 20 }} source={require('../../icons/ic_back.png')} />
          </TouchableOpacity>

          <Text numberOfLines={1} style={{color: '#fff', maxWidth: screen.width/3}}>{title}</Text>
          
          <TouchableOpacity onPress={() => Actions.search()} style={css.ctSearch}>
            <TextInput 
              placeholder='Tìm kiếm'
              selectionColor={'#fff'}
              editable={false}
              autoCapitalize='none'
              placeholderTextColor='#d4abaf'
              style={{
                flex: 1,
                padding: 0,
                fontSize: 13,
                fontStyle: 'italic',
                paddingLeft: 15,
                color: '#fff'
              }}
            />
            <Image style={{height: 15, width: 15 }} source={require('../../icons/ic_search.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.direct()} style={{padding: 15}}>
            {this.renderCount()}
            <Image style={{width: 22, height: 22}} source={require('../../icons/ic_cart_active.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const css = StyleSheet.create({
  ct: {
    backgroundColor: '#c41a36', 
    height: 50, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctSearch: {
    flex: 1,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9d152b',
    borderRadius: 20,
    marginLeft: 20,
    paddingRight: 15
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
