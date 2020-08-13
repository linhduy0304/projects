import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import {Actions} from 'react-native-router-flux';
import { screen, ClTxtGrey, url } from '../../config/Constant';
import Button from '../Button';
import { renderVND, renderSaleVND } from '../Functions';
import SizeImage from './SizeImage';

const width = (screen.width-30)/3;

const CountSale = ({data}) => (
	<View style={css.ctCount}>
		<Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>-{data}%</Text>
	</View>
)

class Item extends React.Component {
  constructor(props) {
    super(props);
    	this.state = {
			style: {}
		}
	}

	buyNow = (data) => {
		if(!data.status) {
			SimpleToast.show('Hiện tại kho đã hết sản phẩm này');
			return;
		}
		var price = data.price;
		if(data.sale) {
			price = data.price_sale;
		}
		if(this.props.auth.isLogin) {
			let provider = {
				id: Math.floor(Date.now()/1000),
				provider_id: data.provider.id,
				name: data.provider.name,
				types: data.provider.types,
				town_id: data.provider.town_id,
				address: data.provider.address,
				product: [{
					id: Math.floor(Date.now()/1000)+1,
					product_id: data.id,
					name:  data.name,
					price,
					image: data.image[0] ? data.image[0] : '',
					quantity: 1,
					weight: data.weight,
					status: data.status,
				}]
			}
			insert(provider).then(() => {
				
			}
            ).catch(error => console.log(error))
            this.props.setTab('cart')
            Actions.tab()
		}else {
			
			var request = {
			type: 'buyNow',
			data: {
					id: Math.floor(Date.now()/1000),
					provider_id: data.provider.id,
					name: data.provider.name,
					types: data.provider.types,
					town_id: data.provider.town_id,
					address: data.provider.address,
					product: [{
						id: Math.floor(Date.now()/1000)+1,
						product_id: data.id,
						name:  data.name,
						price,
						image: data.image[0] ? data.image[0] : '',
						quantity: 1,
						weight: data.weight,
						status: data.status,
					}]
				}
			}
      		this.props.updateRequest(request)
			Actions.login()
		}
		

		// var body = {
		// 	id: Math.floor(Date.now()/1000),
		// 	provider_id: data.provider.id,
		// 	city_code: data.provider.city_code,
		// 	name: data.provider.name,
		// 	types: data.provider.types,
		// 	product: [
		// 		{
		// 			id: Math.floor(Date.now()/1000),
		// 			product_id: data.id,
		// 			name: data.name,
		// 			price: data.price,
		// 			image: data.image[0],
		// 			weight: data.weight,
		// 			quantity: 1,
		// 		}
		// 	]
		// }
		// insert(body).then(
		// 	Actions.tab({tab: 'cart'})
      
		// ).catch(error => console.log(error))
	}

	render() {
		const {data, type} = this.props;
		const {style} = this.state;
		return(
			<TouchableOpacity onPress={() => Actions.productDetail({id: data.id,})} style={css.ct}>
				<View>
					{
						data.sale ?
							<CountSale data={data.sale}/>
							
						: null
					}
					<View style={{height: width, width, justifyContent: 'center', alignItems: 'center'}}>
						<Image style={style} source={{uri: url+ data.image[0]}} />
						<SizeImage
							size={width}
							uri={url+ data.image[0]}
						/>
					</View>
					<Text style={css.name}>{data.name}</Text>
				</View>
				<View>
					<View style={{width: 50, marginTop: 10}}>
						<StarRating
							disabled={true}
							maxStars={5}
							rating={Math.round(data.rate)}
							starSize={13}
							margin={5}
							emptyStar={require('../../icons/ic_star_old.png')}
							fullStar={require('../../icons/ic_star.png')}
							selectedStar={(rating) => this.onStarRatingPress(rating)}
						/>
					</View>
					{
						data.sale ?
						<Text style={css.old}>{renderVND(data.price)} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text>
						: null
					}
					<Text style={css.price}>{renderVND(parseInt(data.price_sale))} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text>
					<Button
						label='Xem chi tiết'
						color='#e53e6a'
						onPress={() => Actions.productDetail({id: data.id,})}
						width={(screen.width-30)/3}
					/>
				</View>
    	</TouchableOpacity>
		)
	}
}


const css = StyleSheet.create({
	old: {
		textDecorationLine: 'line-through',
		color: '#ababab',
		fontSize: 12,
		marginTop: 3,
	},
	ctCount: {
		padding: 3,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 5,
		position: 'absolute',
		zIndex: 1000,
		backgroundColor: '#d50303'
	},
	name: {
		color: ClTxtGrey,
		marginTop: 10,
		fontSize: 13
	},
	img: {
		height: width -15,
		width: width -15
	},
	price: {
		color: '#0674c1',
		marginTop: 5,
		fontSize: 12,
		fontWeight: 'bold',
	},
	ct: {
		width: width,
		margin: 5,
		marginTop: 15,
		justifyContent: 'space-between'
	}
})

import {connect} from 'react-redux';
import {createOder} from '../../actions/cart';
import {setTab} from '../../actions/tab';
import {updateRequest} from '../../actions/auth';
import { insert } from '../../database/allSchema';
import SimpleToast from 'react-native-simple-toast';

const mapStateToProps = (state) => {
  return {
		cart: state.cart,
		auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
		createOder: (body, totalPrice, totalWeight) => dispatch(createOder(body, totalPrice, totalWeight)),
		updateRequest: (data) => dispatch(updateRequest(data)),
		setTab: (data) => dispatch(setTab(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
