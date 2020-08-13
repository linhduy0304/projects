
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

const ItemQTDG = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Mã nhân viên:  <Text style={css.txtValue}>{data.MNV}</Text></Text>
    <Text style={css.txtStatus}>Họ tên:  <Text style={css.txtValue}>{data.HT}</Text></Text>
    <Text style={css.txtStatus}>Năm đánh giá:  <Text style={css.txtValue}>{data.NDG}</Text></Text>
    <Text style={css.txtStatus}>Kỳ đánh giá:  <Text style={css.txtValue}>{data.KDG}</Text></Text>
    <Text style={css.txtStatus}>Kiểu đánh giá:  <Text style={css.txtValue}>{data.KDG1}</Text></Text>
    <Text style={css.txtStatus}>Thời gian:  <Text style={css.txtValue}>{data.TN} - {data.DN}</Text></Text>
    <Text style={css.txtStatus}>Tổng điểm đánh giá:  <Text style={css.txtValue}>{data.TDDG}</Text></Text>
    <Text style={css.txtStatus}>Xếp hạng:  <Text style={css.txtValue}>{data.XH}</Text></Text>
    <Text style={css.txtStatus}>Trạng thái:  <Text style={css.txtValue}>{data.TT}</Text></Text>
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

export default ItemQTDG;
  