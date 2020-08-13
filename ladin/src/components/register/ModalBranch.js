

import React from 'react';
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modalbox';
import { screen, Cities, ClTxtGrey } from '../../config/Constant';

const ModalBranch = ({
    data,
    open,
    onClose,
    onPress=data
}) => (
  <Modal
    isOpen={open}
    entry={'top'}
    position={'center'}
    onClosed={onClose}
    style={{backgroundColor: 'ababab', width: screen.width-40, justifyContent: 'center' }}
    >
      <View style={{backgroundColor: '#fff',height: screen.height*2/3, }}>
        <ScrollView>
          <View style={{width: screen.width-40, alignItems: 'center'}}>
          {
            data.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => onPress(item)} style={{width: screen.width-40, height: 40, alignItems: 'center', justifyContent: 'center'}} key={index}>
                  <Text style={{color: ClTxtGrey}}>{item.province_name}</Text>
                </TouchableOpacity>
              )
            })
          }
          </View>
        </ScrollView>
      </View>
    
    
  </Modal>
);

export default ModalBranch;