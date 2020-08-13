
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
    <Text style={css.txtStatus}>Tên khóa đào tạo:  <Text style={css.txtValue}>{data.TKDT}</Text></Text>
    <Text style={css.txtStatus}>Tên chương trình đào tạo:  <Text style={css.txtValue}>{data.TCTDT}</Text></Text>
    <Text style={css.txtStatus}>Nhóm chương trình:  <Text style={css.txtValue}>{data.NCC}</Text></Text>
    <Text style={css.txtStatus}>Lĩnh vực đào tạo:  <Text style={css.txtValue}>{data.LVDT}</Text></Text>
    <Text style={css.txtStatus}>Hình thức đào tạo:  <Text style={css.txtValue}>{data.HTDT}</Text></Text>
    <Text style={css.txtStatus}>Thời lượng:  <Text style={css.txtValue}>{data.TL}</Text></Text>
    <Text style={css.txtStatus}>Thời gian:  <Text style={css.txtValue}>{data.TGBD} - {data.TGKT}</Text></Text>
    <Text style={css.txtStatus}>Trung tâm đào tạo:  <Text style={css.txtValue}>{data.TTDT}</Text></Text>
    <Text style={css.txtStatus}>Nội dung đào tạo:  <Text style={css.txtValue}>{data.NDDT}</Text></Text>
    <Text style={css.txtStatus}>Mục đích:  <Text style={css.txtValue}>{data.MD}</Text></Text>
    <Text style={css.txtStatus}>Địa điểm tổ chức  <Text style={css.txtValue}>{data.DDTC}</Text></Text>
    <Text style={css.txtStatus}>Điểm đào tạo:  <Text style={css.txtValue}>{data.DDT}</Text></Text>
    <Text style={css.txtStatus}>Kết quả:  <Text style={css.txtValue}>{data.KQ}</Text></Text>
    <Text style={css.txtStatus}>Xếp loại:  <Text style={css.txtValue}>{data.XL}</Text></Text>
    <Text style={css.txtStatus}>Văn bằng/Chứng chỉ:  <Text style={css.txtValue}>{data.VBCC}</Text></Text>
    <Text style={css.txtStatus}>Thời hạn chứng chỉ:  <Text style={css.txtValue}>{data.THCC}</Text></Text>
    <Text style={css.txtStatus}>Ngày cấp chứng chỉ:  <Text style={css.txtValue}>{data.NCCC}</Text></Text>
    <Text style={css.txtStatus}>Ngày hết hạn chứng chỉ:  <Text style={css.txtValue}>{data.NHCC}</Text></Text>
    <Text style={css.txtStatus}>Số cam kết:  <Text style={css.txtValue}>{data.SCC}</Text></Text>
    <Text style={css.txtStatus}>Thời gian cam kết:  <Text style={css.txtValue}>{data.TGCC}</Text></Text>
    <Text style={css.txtStatus}>Ngày bắt đầu cam kết:  <Text style={css.txtValue}>{data.NBDCC}</Text></Text>
    <Text style={css.txtStatus}>Ngày kết thúc cam kết:  <Text style={css.txtValue}>{data.NKTCC}</Text></Text>
    <Text style={css.txtStatus}>Ghi chú:  <Text style={css.txtValue}>{data.GC}</Text></Text>
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
  