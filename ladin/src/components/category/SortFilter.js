

import React from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  Image, 
  TouchableOpacity
} from 'react-native';

const SortFilter = ({
  openSort,
  openFilter
}) => (
    <View style={css.ct}>
      <TouchableOpacity onPress={openSort} style={css.ctItem}>
        <Image style={css.iconLeft} source={require('../../icons/ic_sort.png')} />
        <Text style={css.txt}>Sắp xếp</Text>
        <Image style={css.iconRight} source={require('../../icons/ic_down.png')} />
      </TouchableOpacity>
      <View style={css.ctLine}></View>
      <TouchableOpacity onPress={openFilter} style={css.ctItem}>
        <Image style={css.iconLeft} source={require('../../icons/ic_filter.png')} />
        <Text style={css.txt}>Bộ lọc</Text>
        <Image style={css.iconRight} source={require('../../icons/ic_down.png')} />
      </TouchableOpacity>
    </View>
);

const css = StyleSheet.create({
  ctLine: {
    height: 20,
    width: 1,
    backgroundColor: '#ccc'
  },
  txt: {
    color: '#333333',
    marginLeft: 8,
    marginRight: 8
  },
  ctItem: {
    flexDirection: 'row',
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    height: 20,
    width: 20
  },
  iconRight: {
    height: 10,
    width: 10
  },
  ct: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#e6eff1',
  },
})
export default SortFilter;
