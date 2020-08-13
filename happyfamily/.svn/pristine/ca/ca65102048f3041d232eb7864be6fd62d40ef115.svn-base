
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

const ModalIndividualSelected = ({
  isOpen,
  close,
  onPress = type,
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
                <TouchableOpacity onPress={() => onPress({id: item.id, full_name: item.full_name})} style={css.ctItem} key={index}>
                  <Text>{item.full_name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
    </Modal>
)

const css = StyleSheet.create({
  ctItem: {
    flexDirection: 'row',
    padding: 15
  },
  ctModal: {
    height: window.height,
    backgroundColor: '#fff',
    width: window1.width,
  },
})

export default ModalIndividualSelected;