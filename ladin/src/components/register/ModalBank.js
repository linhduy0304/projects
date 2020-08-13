

import React from 'react';
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modalbox';
import { screen, ClTxtGrey } from '../../config/Constant';

const ModalBank = ({
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
                <TouchableOpacity onPress={() => onPress(item)} style={{width: screen.width-40,padding: 15, paddingTop:7, paddingBottom: 7, alignItems: 'center', justifyContent: 'center'}} key={index}>
                  <Text style={{color: ClTxtGrey, textAlign: 'center'}}>{item.name}</Text>
                </TouchableOpacity>
              )
            })
          }
          </View>
        </ScrollView>
      </View>
    
    
  </Modal>
);

export default ModalBank;
