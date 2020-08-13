

import React, {Component} from 'react';
import { Text, View, Slider , StyleSheet} from 'react-native';
import { renderVND } from '../Functions';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { screen } from '../../config/Constant';

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vnd: '100.000',
      values: [this.props.min, this.props.max],
    };
  }

  setprice = (values) => {
    this.setState({values})
    this.props.setPrice(values[0], values[1])
  }

  render() {
    const {values} = this.state;
    return (
      <View style={{marginTop: 10}}>
        <View style={{marginBottom: 15, alignItems: 'center', }}>
          {/* <Text style={css.price}>100.000đ</Text> */}
          <Text style={css.current}>{renderVND(values[0])}  -  {renderVND(values[1])}</Text>
          {/* <Text style={css.price}>5.000.000đ</Text> */}
        </View>
        <View style={{alignItems: 'center',}}>
          <MultiSlider
              values={[this.state.values[0], this.state.values[1]]}
              sliderLength={screen.width*2/3 -50}
              onValuesChange={this.setprice}
              min={0}
              max={20000000}
              step={10000}

              selectedStyle={{
                backgroundColor: '#0066b3',
              }}
              unselectedStyle={{
                backgroundColor: '#e6eff1',
              }}
              
              touchDimensions={{
                height: 60,
                width: 60,
                borderRadius: 30,
                slipDisplacement: 60,
              }}
          />
        </View>
        

        {/* <Slider 
          value={price}
          style={{transform: [{ scaleY: 1.3 }]}}
          thumbTintColor={'#0066b3'}
          minimumValue={100000}
          maximumValue={5000000}
          maximumTrackTintColor='#e6eff1'
          minimumTrackTintColor='#0066b3'
          onValueChange={price => this.setprice(price)}
          step={100000}
        /> */}
      </View>
    )
  }
}

const css = StyleSheet.create({
  current: {
    color: '#c41a36',
    fontSize: 16
  },
  price: {
    color: '#000033',
    fontSize: 11
  },
})


export default Price;
