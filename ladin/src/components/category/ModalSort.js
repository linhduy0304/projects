

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, StatusBar} from 'react-native';
import Modal from 'react-native-modalbox';
import { screen } from '../../config/Constant';
const height = Platform.OS === 'ios' ? screen.height : screen.height-StatusBar.currentHeight
const list = [
  {
    label: 'Mặc định',
    value: 0,
  },
  {
    label: 'Giá tăng dần',
    value: 1,
  },
  {
    label: 'Giá giảm dần',
    value: 2,
  },
  {
    label: 'Bán chạy nhất',
    value: 3,
  },
];
const ModalSort = ({
    openSort,
    close,
    sort,
    setSort = item
}) => (
        <Modal
          isOpen={openSort}
          entry={'bottom'}
          onClosed={close}
          style={{backgroundColor: 'ababab', width: screen.width,flex: 1, }}
        >
          <View style={{backgroundColor: '#fff', alignItems: 'center', position: 'absolute', bottom: 0}}>
            <Text style={css.label}>Sắp xếp theo</Text>
            {
              list.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => setSort(item)} style={css.ctItem} key={index}>
                    <Text style={sort.label === item.label ? css.txtActive : css.txt}>{item.label}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          
        </Modal>
);

const css = StyleSheet.create({
  ctItem: {
    backgroundColor: '#ffeeee',
    padding: 10,
    width: screen.width,
    borderBottomWidth: 1,
    borderBottomColor: '#f2e2e2',
    alignItems: 'center',
  },
  label: {
    color: '#333',
    margin: 8,
    fontSize: 15
  },
  txt: {
    color: '#333',
    fontSize: 13
  },
  txtActive: {
    color: '#e3004b',
    fontSize: 13
  },
})

export default ModalSort;
