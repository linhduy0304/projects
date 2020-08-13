

import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native-animatable';

const height= 16;

class Item extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      spinValue: new Animated.Value(0),
    }
  }
  ref = null;
  handleRef = ref => {
    this.ref = ref;
  };

  onPress(name) {
    this.props.setActive(name, this.ref, this.props.animationType)
    // Animated.timing(this.state.spinValue, {
    //   toValue: this.props.active === name ? 0 : 1,
    //   duration: 1000,
    //   easing: Easing.linear,
    //   // useNativeDriver: Platform.OS === 'android',
    // }).start()
  }

  renderIcon = (data) => {
    if(data > 0) {
      return require('../../icons/ic_incre.png');
    }else {
      return require('../../icons/ic_decre.png')
    }
  }

  render() {
  //  const opacity = this.state.spinValue.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: [0, 1],
  //   });
    const {data, index, navigation, active} = this.props;
    return (
      <LinearGradient
        start={{x: 0.0, y: 0.0}} 
        end={{x: 1.0, y: 1.0}}
        style={{
          borderRadius: 5,
          marginTop: 7,
        }}
        colors={['#4f7a88','#3d616d',]} 
      >
        <TouchableWithoutFeedback onPress={() => this.onPress(index)} >
          <View
            ref={this.handleRef}
            useNativeDriver={this.props.useNativeDriver}
            style={css.ctActive} >
            <View style={css.ct}>
            <Image style={css.icon} source={{uri: data.icon}} />
            <View style={css.center}>
              <Text style={css.name}>{data.name}</Text>
              { 
                active === index ?
                  null
                :
                <Text style={css.sub}>{data.info.price_usd}</Text>
              }
            </View>
            {
              active === index ? 
                <Animated.View style={[css.ctPercentActive, {backgroundColor: data.info.percent_change_1h > 0 ? '#12ff8a' : '#ffba00',}]}>
                  <Text style={css.percentActive}>{data.info.percent_change_1h}%</Text>
                </Animated.View>
              : 
              <Animated.View style={[css.right ,]}>
                <Text style={css.price}>{data.info.price_btc}</Text>
                <View style={css.ctPercent}>
                  <Text style={[css.percent, {color: data.info.percent_change_1h > 0 ? '#12ff8a' : '#ffba00'}]}>{data.info.percent_change_1h}%</Text>
                  <Image style={{width: 7, height: 10}} source={this.renderIcon(data.info.percent_change_1h)}/>
                </View>
              </Animated.View>
            }
            </View>
            
            {
              active === index ?
              <View>
                <Text style={css.priceActive}>{data.info.price_btc} {data.symbol}</Text>
                <Text style={css.dollar}>$ {data.info.price_usd}</Text>
                <View style={css.ctBot}>
                  <TouchableOpacity onPress={() => navigation.navigate('detail')} style={[css.ctSend, {paddingLeft: 20}]}>
                    <Image style={{height, width: height*39/30}} source={require('../../icons/ic_detail.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('qrCode')} style={[css.ctSend, {paddingLeft: 20}]}>
                    <Image style={{height, width: height*35/28}} source={require('../../icons/ic_scan.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('scan')} style={[css.ctSend, {paddingLeft: 20}]}>
                    <Image style={{height, width: height}} source={require('../../icons/ic_qrcode.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('pay')} style={[css.ctSend, {paddingLeft: 20}]}>
                    <Image style={{height, width: height}} source={require('../../icons/ic_send.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('rate')} style={[css.ctSend, {paddingLeft: 20}]}>
                    <Image style={{height, width: height*37/24}} source={require('../../icons/ic_chart.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
              : null
            }

          </View>
        </TouchableWithoutFeedback>
        
      </LinearGradient>
    )
  }
}




const css = StyleSheet.create({
  ctSend: {
    padding: 15,
  },
  ctBot: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  priceActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5
  },
  dollar: {
    color: '#aeb8c4',
    fontSize: 13,
    marginTop: 3
  },
  percentActive: {
    color: '#fff',
  },
  ctPercentActive: {
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15
  },
  ctHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameActive: {
    color: '#fff',
    flex: 1,
    fontSize: 16,
    marginLeft: 10
  },

  ctPercent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  price: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  percent: {
    marginRight: 5
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  sub: {
    color: '#85a0aa',
    marginTop: 3
  },
  right: {
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    marginLeft: 20,
  },
  icon: {
    height: 40,
    width: 40
  },
  ctActive: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    flex: 1,
  },
  ct: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
})
export default Item;
