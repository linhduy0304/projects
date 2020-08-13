
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ConstSystem from '../../services/ConstSystem'

const window = Dimensions.get('window');

const ItemQTHDLD = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Loại hợp đồng:  <Text style={css.txtValue}>{data.LHD}</Text></Text>
    <Text style={css.txtStatus}>Số hợp đồng:  <Text style={css.txtValue}>{data.TSHDT}</Text></Text>
    <Text style={css.txtStatus}>Thời gian:  <Text style={css.txtValue}>{data.NBD} - {data.NKT}</Text></Text>
    <Text style={css.txtStatus}>Người ký:  <Text style={css.txtValue}>{data.NK}</Text></Text>
    <Text style={css.txtStatus}>Ngày ký:  <Text style={css.txtValue}>{data.TGK}</Text></Text>
    <Text style={css.txtStatus}>Chức danh người ký:  <Text style={css.txtValue}>{data.CDNK}</Text></Text>
  </View>
)

const css = StyleSheet.create({
  txtValue: {
    fontSize: 14,
    color: '#1f2a35',
    fontFamily: ConstSystem.family_value
  },
  txtStatus: {
    color: '#c2c4ca',
    // fontSize: 12,
    fontFamily: ConstSystem.family_label
  },
  ctItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 4,
    paddingTop: 10,
    padding: 15
  },
})

export default ItemQTHDLD;
  