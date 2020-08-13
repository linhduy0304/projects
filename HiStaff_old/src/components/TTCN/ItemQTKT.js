
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

const ItemQTKT = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Số quyết định:  <Text style={css.txtValue}>{data.SQD}</Text></Text>
    <Text style={css.txtStatus}>Ngày hiệu lực:  <Text style={css.txtValue}>{data.NHL}</Text></Text>
    <Text style={css.txtStatus}>Cấp khen thưởng:  <Text style={css.txtValue}>{data.CKT}</Text></Text>
    <Text style={css.txtStatus}>Hình thức khen thưởng:  <Text style={css.txtValue}>{data.HTKT}</Text></Text>
    <Text style={css.txtStatus}>Nội dung khen thưởng:  <Text style={css.txtValue}>{data.NDKT}</Text></Text>
    <Text style={css.txtStatus}>Số tiền:  <Text style={css.txtValue}>{data.ST}</Text></Text>
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

export default ItemQTKT;
  