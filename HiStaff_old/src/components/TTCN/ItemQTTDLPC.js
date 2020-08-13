
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

const ItemQTTDLPC = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Số quyết định:  <Text style={css.txtValue}>{data.SQD}</Text></Text>
    <Text style={css.txtStatus}>Ngày hiệu lực:  <Text style={css.txtValue}>{data.NHL}</Text></Text>
    <Text style={css.txtStatus}>Chức danh:  <Text style={css.txtValue}>{data.CD}</Text></Text>
    <Text style={css.txtStatus}>Cấp nhân sự:  <Text style={css.txtValue}>{data.CNS}</Text></Text>
    <Text style={css.txtStatus}>Đơn vị:  <Text style={css.txtValue}>{data.DV}</Text></Text>
    <Text style={css.txtStatus}>Lương cơ bản:  <Text style={css.txtValue}>{data.LCB}</Text></Text>
    <Text style={css.txtStatus}>% lương được hưởng:  <Text style={css.txtValue}>{data.LDH}</Text></Text>
    <Text style={css.txtStatus}>Chi phú hỗ trợ:  <Text style={css.txtValue}>{data.CPHT}</Text></Text>
    <Text style={css.txtStatus}>Tổng thu nhập:  <Text style={css.txtValue}>{data.TTN}</Text></Text>
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

export default ItemQTTDLPC;
  