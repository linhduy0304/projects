
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

const ItemQTCTHT = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Loại quyết định:  <Text style={css.txtValue}>{data.name}</Text></Text>
    <Text style={css.txtStatus}>Ngày hiệu lực:  <Text style={css.txtValue}>{data.time_start}</Text></Text>
    <Text style={css.txtStatus}>Ngày kết thúc:  <Text style={css.txtValue}>{data.time_end}</Text></Text>
    <Text style={css.txtStatus}>Chức danh:  <Text style={css.txtValue}>{data.situation}</Text></Text>
    <Text style={css.txtStatus}>Cấp nhân sự:  <Text style={css.txtValue}>{data.level}</Text></Text>
    <Text style={css.txtStatus}>Đơn vị:  <Text style={css.txtValue}>{data.unit}</Text></Text>
    <Text style={css.txtStatus}>Ngày ký:  <Text style={css.txtValue}>{data.time}</Text></Text>
    <Text style={css.txtStatus}>Người ký:  <Text style={css.txtValue}>{data.user}</Text></Text>
    <Text style={css.txtStatus}>Chức danh người ký:  <Text style={css.txtValue}>{data.level_user}</Text></Text>
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

export default ItemQTCTHT;
  