

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../Button';

const Info = ({
    data,
    onPress
}) => (
    <View>
      <View style={[styles.ctItem, {marginTop: 4}]}>
        <Text style={styles.title}>Email</Text>
      <Text style={[styles.value, {color: '#9a9a9a'}]}>{data.email}</Text>
      </View>
      <View style={styles.ctItem}>
        <Text style={styles.title}>Số điện thoại</Text>
        <Text style={styles.value}>{data.phone}</Text>
      </View>
      <View style={styles.ctItem}>
        <Text style={styles.title}>Địa chỉ</Text>
        <Text style={styles.value}>{data.address}</Text>
      </View>
      <View style={styles.ctItem}>
        <Text style={styles.title}>Chủ tài khoản</Text>
        <Text style={styles.value}>{data.owner_account}</Text>
      </View>
      <View style={styles.ctItem}>
        <Text style={styles.title}>Ngân hàng</Text>
        <Text style={styles.value}>{data.bank}</Text>
      </View>
      <View style={styles.ctItem}>
        <Text style={styles.title}>Chi nhánh</Text>
        <Text style={styles.value}>{data.bank_branch}</Text>
      </View>
      <View style={styles.ctItem}>
        <Text style={styles.title}>Số tài khoản</Text>
        <Text style={styles.value}>{data.bank_number}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button 
          label='CHỈNH SỬA'
          backgroundColor='#c41a36'
          fontWeight ='bold'
          onPress={onPress}
          color='#fff'
          marginTop={30}
          borderRadius={20}
        />
      </View>
    </View>
);

const styles = StyleSheet.create({
  value: {
    color: '#0674c1',
    flex: 1
  },
  title: {
    color: '#494949',
    flex: 1
  },
  ctItem:  {
    flexDirection: 'row',
    marginBottom: 1,
    backgroundColor: '#fff',
    padding: 10
  },
})

export default Info;
