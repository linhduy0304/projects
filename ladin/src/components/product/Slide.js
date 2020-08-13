import React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { screen, url } from '../../config/Constant';
import SizeImage from './SizeImage';

class Slide extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      index: 1,

    }
  }

  render() {
    const {data} = this.props
    return (
      <View >
        <Swiper
          showsButtons={false}
          showsPagination={false}
          autoplay={true}
          onIndexChanged={index => this.setState({index: index+1})}
          style={css.ct}>
          {
            this.props.data ? 
            this.props.data.map((item, index) => {
              return (
                <View key={index} style={css.ct}>
                  <SizeImage
                    uri = {url+item}
                    size = {screen.width}
                  />
                </View>
              )
            })
            : null
          }
        </Swiper>
        <View style={[css.ctCount, {backgroundColor:  '#004a5c'}]}>
          <Text style={{color: '#e3f2ff'}}>{this.state.index}/<Text style={{color: '#a9a9a9'}}>{data.length}</Text></Text>
        </View>
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
    height: screen.width,
    width: screen.width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
})

export default Slide;
