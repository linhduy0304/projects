
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const window = Dimensions.get('window');

const ItemTDG = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Mã KPI:  <Text style={css.txtValue}>{data.KPI}</Text></Text>
    <Text style={css.txtStatus}>Tiêu chí KPI:  <Text style={css.txtValue}>{data.TCKPI}</Text></Text>
    <Text style={css.txtStatus}>Chỉ tiêu:  <Text style={css.txtValue}>{data.CT}</Text></Text>
    <Text style={css.txtStatus}>Trọng số:  <Text style={css.txtValue}>{data.TS}</Text></Text>
    <Text style={css.txtStatus}>Từ ngày:  <Text style={css.txtValue}>{data.TN}</Text></Text>
    <Text style={css.txtStatus}>Đến ngày:  <Text style={css.txtValue}>{data.DN}</Text></Text>
    <Text style={css.txtStatus}>Kết quả:  <Text style={css.txtValue}>{data.KQ}</Text></Text>
    <Text style={css.txtStatus}>Ngày cập nhật:  <Text style={css.txtValue}>{data.NCN}</Text></Text>
    <Text style={css.txtStatus}>Quản lý đánh giá kết quả công việc:  <Text style={css.txtValue}>{data.QLDG}</Text></Text>
    <Text style={css.txtStatus}>Điểm quy đổi theo trọng số:  <Text style={css.txtValue}>{data.DQD}</Text></Text>
    <Text style={css.txtStatus}>Ngày đánh giá:  <Text style={css.txtValue}>{data.NDG}</Text></Text>
    <Text style={css.txtStatus}>Trạng thái:  <Text style={css.txtValue}>{data.TT}</Text></Text>
  </View>
)

const css = StyleSheet.create({
  txtValue: {
    fontSize: 14,
    color: '#1f2a35',
  },
  txtStatus: {
    color: '#c2c4ca',
    // fontSize: 12,
  },
  ctItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 4,
    paddingTop: 10,
    padding: 15
  },
})

export default ItemTDG;
  