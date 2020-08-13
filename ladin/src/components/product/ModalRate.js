

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modalbox';
import { screen, } from '../../config/Constant';
import StarRating from 'react-native-star-rating';
import Button from '../Button'
class ModalRate extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      star: 0,
    }
  }

  rate = (idRate,star) => {
    this.setState({
      star: 0
    })
    this.props.rate(idRate,star)
  }

  onClose = () => {
    this.setState({
      star: 0
    })
    this.props.onClose()
  }

  render() {
    const {open, onClose,idRate } = this.props;
    return (
      <Modal
        isOpen={open}
        entry={'top'}
        position={'center'}
        onClosed={onClose}
        style={{backgroundColor: 'ababab', width: screen.width-40, justifyContent: 'center' }}
        >
          <View style={{backgroundColor: '#fff',}}>
            <View style={css.header}>
              <Text style={css.label}>ĐÁNH GIÁ SẢN PHẨM</Text>
            </View>
            <View style={css.body}>
              <StarRating
                maxStars={5}
                rating={this.state.star}
                starSize={30}
                margin={0}
                emptyStar={require('../../icons/ic_star_old.png')}
                fullStar={require('../../icons/ic_star.png')}
                selectedStar={(rating) => this.setState({star: rating})}
              />
              <View style={{flexDirection: 'row',marginTop: 20, justifyContent: 'space-between'}}>
                <Button 
                  label='HUỶ BỎ'
                  borderRadius={20}
                  marginTop={10}
                  width = {screen.width/3-15}
                  onPress={() => this.onClose()}
                  color={'#9a9a9a'}
                  backgroundColor='#fff'
                  fontWeight={'bold'}
                />
                <Button 
                  label='XÁC NHẬN'
                  borderRadius={20}
                  marginTop={10}
                  width = {screen.width/3-15}
                  onPress={() => this.rate(idRate, this.state.star)}
                  color={'#fff'}
                  backgroundColor='#c41a36'
                  fontWeight={'bold'}
                />
              </View>
            </View>
          </View>
        </Modal>
    )
  }
}

const css = StyleSheet.create({
  body: {
    paddingTop: 30,
    padding: 40,
    paddingBottom: 20,
    backgroundColor: '#e6eff1'
  },
  label: {
    color: '#333'
  },
  header: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default ModalRate;
