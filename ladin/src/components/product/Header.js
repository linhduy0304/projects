

import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Slide from './Slide';
import StarRating from 'react-native-star-rating';
import { Color, ClTxtGrey } from '../../config/Constant';
import {renderView, renderVND, renderSaleVND} from '../../components/Functions';

const Header = ({
    data,
}) => (
    <View style={css.ct}>
      <Text style={css.name}>{data.name}</Text>
      <View style={css.ctView}>
        <Image style={css.icView} source={require('../../icons/ic_view.png')} />
        <Text style={css.countView}>{renderView(data.view+1)}</Text>
      </View>
      {
        data.image ? 
          <Slide 
            data={data.image}
            backgroundColor='#646465'
          />
        : null
      }
      
      <View style={{padding: 10}}>
        <View style={{width: 110, }}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={Math.round(data.rate)}
            starSize={18}
            margin={5}
            emptyStar={require('../../icons/ic_star_old.png')}
            fullStar={require('../../icons/ic_star.png')}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
        </View>
        {
						data.sale > 0 ?
						<Text style={css.old}>{renderVND(data.price)} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text>
						: null
					}
        <Text style={css.price}>{renderSaleVND(data.price, data.sale)} đ</Text>
        <Text style={css.status}>{data.new === 1 ? 'Hàng mới' : 'Hàng cũ'}</Text>
        <Text style={css.countPro}>Kho hàng: <Text style={{color: Color, fontWeight: 'bold'}}>{data.provider.address}</Text></Text>
        <Text style={css.countPro}>Kho có sẵn: <Text style={{color: Color, fontWeight: 'bold'}}>{data.status}</Text> sản phẩm</Text>
      </View>
      
    </View>
);

const css = StyleSheet.create({
  old: {
		textDecorationLine: 'line-through',
		color: '#ababab',
		fontSize: 12,
		marginTop: 5,
	},
  countPro: {
    color: ClTxtGrey,
    marginTop: 4,
  },
  status: {
    color: Color,
    marginTop: 4,
  },
  price: {
    color: '#0674c1',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10
  },
  countView: {
    color: Color,
    fontWeight: 'bold',
    marginLeft: 5
  },
  icView: {
    height: 20,
    width: 20,
  },
  ctView: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 15
  },
  name: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10
  },
  ct: {
    backgroundColor: '#fff'
  },
})
export default Header;
