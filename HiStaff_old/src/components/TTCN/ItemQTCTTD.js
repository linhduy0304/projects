
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

const ItemQTCTTD = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <View style={css.ctName}>
      <Image style={css.icName} source={require('../../icons/ic_company.png')} />
      <Text style={css.txtName}>{data.name}</Text>
    </View>
    <View style={css.ctName}>
      <Image style={css.icName} source={require('../../icons/ic_phone.png')} />
      <Text style={css.txtName}>{data.phone}</Text>
    </View>
    <View style={css.ctName}>
      <Image style={css.icName} source={require('../../icons/ic_location.png')} />
      <Text style={css.txtName}>{data.adress}</Text>
    </View>
    <View style={css.ctName}>
      <Image style={css.icName} source={require('../../icons/ic_dollar.png')} />
      <Text style={css.txtName}>{data.salary}</Text>
    </View>
    <Text style={css.txtStatus}>Thời gian: <Text style={css.txtValue}>{data.time_start} - {data.time_end}</Text></Text>
    <Text style={css.txtStatus}>Lý do nghỉ: <Text style={css.txtValue}>{data.reason_leave}</Text></Text>
    <Text style={css.txtStatus}>Trạng thái: <Text style={css.txtValue}>{data.stauts}</Text></Text>
    <Text style={css.txtStatus}>Lý do không phê duyệt: <Text style={css.txtValue}>{data.reason}</Text></Text>
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
  txtName: {
    color: '#1f2a35'
  },
  icName: {
    height: 15, 
    width: 15,
    marginRight: 15
  },
  ctName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  ctItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 4,
    paddingTop: 10,
    padding: 15
  },
})

export default ItemQTCTTD;
  