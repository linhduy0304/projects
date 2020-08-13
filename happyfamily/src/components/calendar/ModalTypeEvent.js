
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import ItemEvent from './ItemEvent';
var Modal = require('react-native-modalbox');

const window1 = Dimensions.get('window');

const ModalTypeEvent = ({
  isOpen,
  close,
  onPress,
  data
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
          {
            data.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => onPress({item})} style={css.ctItem} key={index}>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              )
            })
          }
          <TouchableOpacity onPress={() => onPress({type: 2, title: 'Dấu mốc gia đình và dòng họ'})} style={css.ctItem}>
            <Text>Dấu mốc gia đình và dòng họ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress({type: 3, title: 'Sự kiện cá nhân'})} style={css.ctItem}>
            <Text>Sự kiện cá nhân</Text>
          </TouchableOpacity>
        </View>
    </Modal>
)

const css = StyleSheet.create({
  ctItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  ctModal: {
    height: window.height,
    backgroundColor: '#fff',
    width: window1.width,
  },
})

export default ModalTypeEvent;
  