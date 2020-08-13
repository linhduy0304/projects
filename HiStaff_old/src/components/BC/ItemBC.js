
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

const ItemBC = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Mã nhân viên:  <Text style={css.txtValue}>{data.MNV}</Text></Text>
    <Text style={css.txtStatus}>Tên nhân viên:  <Text style={css.txtValue}>{data.HTNVT}</Text></Text>
    <Text style={css.txtStatus}>Chức danh:  <Text style={css.txtValue}>{data.CD}</Text></Text>
    <Text style={css.txtStatus}>Cấp nhân sự:  <Text style={css.txtValue}>{data.CNS}</Text></Text>
    <Text style={css.txtStatus}>Công làm việc ngày thường:  <Text style={css.txtValue}>{data.CNT}</Text></Text>
    <Text style={css.txtStatus}>Công làm việc ngày lễ:  <Text style={css.txtValue}>{data.CNL}</Text></Text>
    <Text style={css.txtStatus}>Công đào tạo:  <Text style={css.txtValue}>{data.CDT}</Text></Text>
    <Text style={css.txtStatus}>Công làm việc ca 3:  <Text style={css.txtValue}>{data.CLVC3}</Text></Text>
    <Text style={css.txtStatus}>Công công tác:  <Text style={css.txtValue}>{data.CCT}</Text></Text>
    <Text style={css.txtStatus}>Cấp nghỉ phép:  <Text style={css.txtValue}>{data.CNP}</Text></Text>
    <Text style={css.txtStatus}>Công nghỉ Lễ/Tết:  <Text style={css.txtValue}>{data.CNLT}</Text></Text>
    <Text style={css.txtStatus}>Công nghỉ việc riêng hưởng lương:  <Text style={css.txtValue}>{data.CNVRHL}</Text></Text>
    <Text style={css.txtStatus}>Công nghỉ chế độ con nhỏ:  <Text style={css.txtValue}>{data.NCDCN}</Text></Text>
    <Text style={css.txtStatus}>Công nghỉ bù:  <Text style={css.txtValue}>{data.CNB}</Text></Text>
    <Text style={css.txtStatus}>Công ngừng việc:  <Text style={css.txtValue}>{data.CNV}</Text></Text>
    <Text style={css.txtStatus}>Cấp nghỉ TNLĐ:  <Text style={css.txtValue}>{data.CNTNLD}</Text></Text>
    <Text style={css.txtStatus}>Tổng công hưởng lương:  <Text style={css.txtValue}>{data.TCHL}</Text></Text>
    <Text style={css.txtStatus}>Công nghỉ thai sản:  <Text style={css.txtValue}>{data.CNTS}</Text></Text>
    <Text style={css.txtStatus}>Công nghỉ ốm:  <Text style={css.txtValue}>{data.CNO}</Text></Text>
    <Text style={css.txtStatus}>Công nghỉ việc riêng không hưởng lương:  <Text style={css.txtValue}>{data.CNVRKHL}</Text></Text>
    <Text style={css.txtStatus}>Tổng công hưởng BHXH hoặc không hưởng lương:  <Text style={css.txtValue}>{data.TCHBHXH}</Text></Text>
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

export default ItemBC;
  