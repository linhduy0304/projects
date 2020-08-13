

import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { screen, url } from '../../config/Constant';
import Carousel from 'react-native-snap-carousel';

const width = screen.width*2/3;
class Banner extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentWillMount = () => {
    this.props.getHome('banners')
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.home.banners) {
      this.setState({data: nextProps.home.banners})
    }
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this.direct(item)} style={{width, height: (width-15)*140/400,}}>
        <Image style={{width: width-15, height: (width-15)*140/400}} source={{uri: url+item.image}}/>
      </TouchableOpacity>
    )
  }

  direct = (data) => {
    switch(data.target_type) {
      case 'link':
        return Linking.openURL(data.target)
      case 'country':
        return Actions.productCategory({title: data.title,id: data.target, load: 'madeBy'})
      case 'provider':
       return Actions.productCategory({title: data.title,id: data.target, load: 'provider'})
      case 'category':
       return Actions.productCategory({title: data.title,id: data.target, load: 'category'})
      case 'product':
       return Actions.productDetail({id: data.target});
      default: 
        return;
    }
  }

  render() {
    const {data} = this.state;
    return (
      <View style={{padding: 10}}>
        {
          this.props.home.loadBanner ?
              <Loading />
          : 
          <Carousel
              ref={(c) => { this._carousel = c; }}
              data={data}
              renderItem={this._renderItem}
              sliderWidth={screen.width}
              inactiveSlideScale={1}
              activeSlideAlignment={'start'}
              itemWidth={width}
            />
        }
       
      </View>
       
    )
  }
}

const css = StyleSheet.create({
  
  ct: {
    height: 150,
    width: screen.width,
  },
})

import {connect} from 'react-redux';
import {getHome, } from '../../actions/home';
import Loading from '../Loading';
import { Actions } from 'react-native-router-flux';
import { renderCountry } from '../Functions';

const mapStateToProps = (state) => {
  return {
    home: state.home
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getHome: (action) => dispatch(getHome(action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
