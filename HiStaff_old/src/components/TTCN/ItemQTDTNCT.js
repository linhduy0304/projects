
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

const ItemQTDTTCT = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Thời gian:  <Text style={css.txtValue}>{data.time_start} - {data.time_end}</Text></Text>
    <Text style={css.txtStatus}>Năm tốt nghiệp:  <Text style={css.txtValue}>{data.NTN}</Text></Text>
    <Text style={css.txtStatus}>Tên trường:  <Text style={css.txtValue}>{data.TT}</Text></Text>
    <Text style={css.txtStatus}>Hình thức đào tạo:  <Text style={css.txtValue}>{data.HTDT}</Text></Text>
    <Text style={css.txtStatus}>Chuyên ngành:  <Text style={css.txtValue}>{data.CN}</Text></Text>
    <Text style={css.txtStatus}>Kết quả dào tạo:  <Text style={css.txtValue}>{data.KQDT}</Text></Text>
    <Text style={css.txtStatus}>Bằng cấp/Chứng chỉ:  <Text style={css.txtValue}>{data.BCCC}</Text></Text>
    <Text style={css.txtStatus}>Ngày hiệu lực:  <Text style={css.txtValue}>{data.NHL}</Text></Text>
    <Text style={css.txtStatus}>Ngày hết hiệu lực:  <Text style={css.txtValue}>{data.NHHL}</Text></Text>
    <Text style={css.txtStatus}>Trạng thái phê duyệt:  <Text style={css.txtValue}>{data.TTPD}</Text></Text>
    <Text style={css.txtStatus}>Lý do không phê duyệt:  <Text style={css.txtValue}>{data.LD}</Text></Text>
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

export default ItemQTDTTCT;
  