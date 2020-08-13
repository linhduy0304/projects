

import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { screen, url } from '../../config/Constant';

class Slide extends Component{
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      data: [],
    }
  }

  componentWillMount = () => {
    this.props.getHome('slides')
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.home.slides) {
      this.setState({data: nextProps.home.slides})
    }
  };
  
  direct = (data) => {
    switch(data.target_type) {
      case 'country':
        return Actions.productCategory({title: renderCountry(data.target),id: data.target, load: 'madeBy'})
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
      <View>
        {
          this.props.home.loadSlise ?
           <Loading/>
           :
          <View>
            <Swiper
              showsButtons={false}
              showsPagination={false}
              autoplay={true}
              onIndexChanged={index => this.setState({index: index+1})}
              style={css.ct}>
              {
                data.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => this.direct(item)}>
                      <Image style={{height: screen.width*2/5, width: screen.width}} source={{uri: url+item.image}} />
                    </TouchableOpacity>
                  )
                })
              }
            </Swiper>
            <View style={[css.ctCount, {backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#004a5c'}]}>
              <Text style={{color: '#e3f2ff'}}>{this.state.index}/<Text style={{color: '#a9a9a9'}}>{data.length}</Text></Text>
            </View>
          </View>
        }
        
      </View>
    )
  }
}

const css = StyleSheet.create({
  ctCount: {
    height: 34, 
    width: 60,
    position: 'absolute',
    right: 0,
    bottom: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ct: {
    height: screen.width*2/5,
    width: screen.width,
    backgroundColor: '#fff'
  },
})

import {connect} from 'react-redux';
import {getHome, getProvider} from '../../actions/home';
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
    getProvider: (action) => dispatch(getProvider(action)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Slide);
