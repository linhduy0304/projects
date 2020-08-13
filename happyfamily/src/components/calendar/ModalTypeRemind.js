
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
var Modal = require('react-native-modalbox');

const window1 = Dimensions.get('window');

const ModalTypeRemind = ({
  data,
  isOpen,
  close,
  onPress = type
}) => (
    <Modal
      style={[css.ctModal]}
      isOpen={isOpen}
      position="bottom"
      swipeToClose={true}
      backdropColor="#292c34"
      onClosed={close}
      >
        <View style={[css.ctModal]}>
          <TouchableOpacity onPress={() => onPress({title: 'Không nhắc', type: 0})} style={css.ctItem}>
            <Text>Không nhắc</Text>
            {
              data.indexOf(0) !== -1 ?
              <Image source={require('../../images/icons/ic_checked.png')} />

              : null 
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress({title: 'Nhắc lúc xảy ra sự kiện', type: 1})} style={css.ctItem}>
            <Text>Nhắc lúc xảy ra sự kiện</Text>
            {
              data.indexOf(1) !== -1 ?
              <Image source={require('../../images/icons/ic_checked.png')} />

              : null 
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress({title: 'Nhắc trước 30 phút', type: 2})} style={css.ctItem}>
            <Text>Nhắc trước 30 phút</Text>
            {
              data.indexOf(2) !== -1 ?
              <Image source={require('../../images/icons/ic_checked.png')} />

              : null 
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress({title: 'Nhắc trước 1 giờ', type: 3})} style={css.ctItem}>
            <Text>Nhắc trước 1 giờ</Text>
            {
              data.indexOf(3) !== -1 ?
              <Image source={require('../../images/icons/ic_checked.png')} />

              : null 
            }
          </TouchableOpacity>
        </View>
    </Modal>
)

const css = StyleSheet.create({
  ctItem: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between'
  },
  ctModal: {
    height: window.height,
    backgroundColor: '#fff',
    width: window1.width,
  },
})

export default ModalTypeRemind;
  