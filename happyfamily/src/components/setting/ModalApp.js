
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

const ModalApp = ({
  isOpen,
  close,
  data
}) => (
    <Modal
      style={[css.ctModal]}
      isOpen={isOpen}
      position="center"
      swipeToClose={true}
      backdropColor="#292c34"
      onClosed={close}
      >
        <View style={[css.ctModal]}>
          <Text>ddd</Text>
        </View>
    </Modal>
)

const css = StyleSheet.create({
  
  ctModal: {
    height: window.height,
    backgroundColor: '#fff',
    width: window1.width - 60
  },
})

export default ModalApp;
  