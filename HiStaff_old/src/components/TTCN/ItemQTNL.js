
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

const ItemQTNL = ({
  data,
  // onPress = item,
}) => (
  <View style={css.ctItem}>
    <Text style={css.txtStatus}>Năm:  <Text style={css.txtValue}>{data.N}</Text></Text>
    <Text style={css.txtStatus}>Đợt đánh giá:  <Text style={css.txtValue}>{data.DDG}</Text></Text>
    <Text style={css.txtStatus}>Nhóm năng lực:  <Text style={css.txtValue}>{data.NNL}</Text></Text>
    <Text style={css.txtStatus}>Năng lực:  <Text style={css.txtValue}>{data.NL}</Text></Text>
    <Text style={css.txtStatus}>Mức năng lực chuẩn:  <Text style={css.txtValue}>{data.MNLC}</Text></Text>
    <Text style={css.txtStatus}>Mức năng cá nhân:  <Text style={css.txtValue}>{data.MNLCN}</Text></Text>
    <Text style={css.txtStatus}>Diễn giải:  <Text style={css.txtValue}>{data.DG}</Text></Text>
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

export default ItemQTNL;
  