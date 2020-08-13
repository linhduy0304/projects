

import React from 'react';
import { Text, Image , TouchableOpacity} from 'react-native';
import { Color } from '../../config/Constant';

const AddCart = ({
    onPress,
}) => (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: '#69d356',flex: 1, flexDirection: 'row',  alignItems: 'center', justifyContent: 'center'}}>
      <Image style={{width: 20, height: 20, marginRight: 10}} source={require('../../icons/ic_cart_active.png')}/>
      <Text style={{
        color: '#fff',
        fontWeight: 'bold'
      }}>THÊM VÀO GIỎ</Text>
    </TouchableOpacity>
);

export default AddCart;
