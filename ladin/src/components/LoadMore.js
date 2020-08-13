
import React from 'react';
import { Text, View, Image} from 'react-native';
import { screen } from '../config/Constant';

const LoadMore = ({
    params,
}) => (
  <View style={{width: screen.width, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
    <Image style={{height: 30, width: 30}} source={require('../icons/loading.gif')} />
    <Text style={{color: '#c41a36', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
  </View>
);

export default LoadMore;
