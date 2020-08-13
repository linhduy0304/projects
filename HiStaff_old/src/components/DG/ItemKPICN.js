
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

const ItemKPICN = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Năm đánh giá:  <Text style={css.txtValue}>{data.KPI}</Text></Text>
    <Text style={css.txtStatus}>Kỳ đánh giá:  <Text style={css.txtValue}>{data.TCKPI}</Text></Text>
    <Text style={css.txtStatus}>Kiểu đánh giá:  <Text style={css.txtValue}>{data.CT}</Text></Text>
    <Text style={css.txtStatus}>Từ ngày:  <Text style={css.txtValue}>{data.NCN}</Text></Text>
    <Text style={css.txtStatus}>Đến ngày:  <Text style={css.txtValue}>{data.QLDG}</Text></Text>
    <Text style={css.txtStatus}>Tổng điểm đánh giá:  <Text style={css.txtValue}>{data.DQD}</Text></Text>
    <Text style={css.txtStatus}>Xếp hạng:  <Text style={css.txtValue}>{data.NDG}</Text></Text>
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

export default ItemKPICN;
  