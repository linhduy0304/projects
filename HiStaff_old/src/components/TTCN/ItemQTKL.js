
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

const ItemQTKL = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Số quyết định:  <Text style={css.txtValue}>{data.SQD}</Text></Text>
    <Text style={css.txtStatus}>Ngày hiệu lực:  <Text style={css.txtValue}>{data.NHL}</Text></Text>
    <Text style={css.txtStatus}>Ngày vi phạm:  <Text style={css.txtValue}>{data.NVP}</Text></Text>
    <Text style={css.txtStatus}>Cấp kỷ luật:  <Text style={css.txtValue}>{data.CKL}</Text></Text>
    <Text style={css.txtStatus}>Hình thức kỷ luật:  <Text style={css.txtValue}>{data.HTKL}</Text></Text>
    <Text style={css.txtStatus}>Tiền phạt:  <Text style={css.txtValue}>{data.TP}</Text></Text>
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

export default ItemQTKL;
  