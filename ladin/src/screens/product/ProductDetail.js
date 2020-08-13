import React, { Component, PureComponent } from 'react';
import { 
	View, 
	Text,
	Image,
	ScrollView,
	Clipboard,
	PermissionsAndroid,
	RefreshControl,
	TouchableOpacity,
} from 'react-native';
import Nav from '../../components/product/Nav';
import Header from '../../components/product/Header';
import Detail from '../../components/product/Detail';
import MadeBy from '../../components/product/MadeBy';
import AddCart from '../../components/product/AddCart';
import QA from '../../components/product/QA';
import Toast from "react-native-simple-toast";
import { insert, showAll } from "../../database/allSchema";
// import Share , {ShareSheet, Button as ButtonShare} from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob'

let shareOptions = {
	title: "Chia sẻ với",
	message: "",
	url: "http://facebook.github.io/react-native/",
	subject: "Share Post" //  for email
};
class ProductDetail extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			openRate: null,
			refreshing: false
		};
	}

	componentWillMount = () => {
		var body = {
		list_id: [this.props.id]
		}
		this.props.productDetail(body);
		this.props.productView(this.props.id)
	};

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.product.productDetail) {
		// var a = <HTMLView
		//   value={nextProps.product.productDetail.description}
		//   // stylesheet={{height: 40}}
		// />;
		// console.log(a)
		shareOptions.url = url+ nextProps.product.productDetail.image[0];
		shareOptions.message = nextProps.product.productDetail.text_description
		
		this.setState({
			data: nextProps.product.productDetail
		})
		}
	};

	addCart() {
		if(this.props.product.productDetail.status) {
		const {data} = this.state;
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
			insert(provider).then(
			Toast.show('Thêm vào giỏ hàng thành công')
			).catch(error => console.log(error))

		}else {
			let request = {
			type: 'addCart',
			provider: {
				id: Math.floor(Date.now()/1000),
				provider_id: data.provider.id,
				name: data.provider.name,
				types: data.provider.types,
				town_id: data.provider.town_id,
				address: data.provider.address,
				product: [{
				id: Math.floor(Date.now()/1000),
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
		}else {
		Toast.show('Hiện tại kho đã hết sản phẩm này')
		}
	}

	buyNow() {
		if(this.props.product.productDetail.status) {
		const {data} = this.state;
		var price = data.price;
		if(data.sale) {
			price = price - Math.floor(price*data.sale/100);
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
			insert(provider).then(
			).catch(error => console.log(error))
			Actions.tab();
			this.props.setTab('cart')

		}else {
			let request = {
				type: 'buyNow',
				data: {
					id: Math.floor(Date.now()/1000),
					provider_id: data.provider.id,
					name: data.provider.name,
					types: data.provider.types,
					town_id: data.provider.town_id,
					address: data.provider.address,
					product: [{
						id: Math.floor(Date.now()/1000),
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
		}else {
		Toast.show('Hiện tại kho đã hết sản phẩm này')
		}
	}

	onCancel() {
		this.setState({visible:false});
	}

	checkCart() {
		if(this.props.auth.isLogin) {
		Actions.tab({type: 'reset'})
		this.props.setTab('cart')
		}else {
		Actions.login()
		}
	}

	copy(text) {
		var newText = renderHtmlEntities(text);
		Clipboard.setString(newText)
		SimpleToast.show('Nội dung đã được copy');
	}

	onRefresh = () => {
		this.setState({refreshing: true})
		var body = {
		list_id: [this.props.id]
		}
		this.props.productDetail(body, 'RF');
		this.props.productView(this.props.id);
		this.props.getQA(this.props.id);
		this.setState({refreshing: false})
	}

	async requestCameraPermission(image) {
		for(let i of image) {
		if(i) {
			var uri= url+i;
			var ext=this.extention(uri);
			ext = "."+ext[0];
			const { config, fs } = RNFetchBlob
			let PictureDir = fs.dirs.PictureDir
			let options = {
			fileCache: true,
			addAndroidDownloads : {
				useDownloadManager : true,
				notification : true,
				path:  PictureDir + "/"+Math.floor(Date.now()/1000)+ext,
				description : 'Image'
			}
			}
			config(options).fetch('GET', uri).then((res) => {
			// console.log(res)
			});
		}
		}
	}

	extention(filename){
		return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
	}

    render() {
		const {data} = this.state;
        return (
        <View style={{flex: 1, backgroundColor: '#e6eff1'}}>
            <Nav 
            share={() => this.requestCameraPermission(this.state.data.image)}
            checkCart={() => this.checkCart()}
            />
            {
            this.props.product.loading ?
                <Loading />
                : 
                data ?
                <View style={{flex: 1}}>
                    <ScrollView
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.refreshing}
                        />
                    }
                    style={{flex: 1}}>
                    <Header data={data}/>
                    <Detail onPress={() => this.copy(data.text_description)} name = {data.name} data = {data.description}/>
                    <Rate onPress={() => this.setState({openRate: true})} data={data.country}/>
                    <MadeBy data={data.country}/>
                    <Provider data={data.provider.name}/> 
                    
                    <QA id={this.props.id}/>
                    </ScrollView>
                    <View style={{flexDirection: 'row', height: 50}}>
                        <TouchableOpacity
                            style={{ flex: 1, alignItems: 'center',backgroundColor: '#c41a36', justifyContent: 'center'}}
                            onPress={() => this.buyNow()}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>MUA NGAY</Text>
                        </TouchableOpacity>
                        <AddCart
                            onPress={() => this.addCart()}
                        />
                    </View>
                
                </View>
                : null
            }

            <ModalRate
            open={this.state.openRate}
            idRate={this.props.id}
            rate={(idRate, star) => {
                var body = {
                products: [
                    {
                    id: idRate,
                    rate: star
                    }
                ]
                }
                this.props.rate(body);
                this.setState({openRate: null})
            }}
            onClose={() => this.setState({openRate: null, idRate: null})}
            />

        </View>
        );
    }
}

import {connect} from 'react-redux';
import {productDetail, productView, getQA} from '../../actions/product';
import {updateRequest} from '../../actions/auth';
import {setTab} from '../../actions/tab';
import {rate} from '../../actions/profile';
import Loading from '../../components/register/Loading';
import { url } from '../../config/Constant';
import Provider from '../../components/product/Provider';
import { Actions } from 'react-native-router-flux';
import SimpleToast from 'react-native-simple-toast';
import Rate from '../../components/product/Rate';
import ModalRate from '../../components/product/ModalRate';
import { renderHtmlEntities } from '../../components/Functions';

const mapStateToProps = (state) => {
    return {
        product: state.product,
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        productDetail: (body, action) => dispatch(productDetail(body, action)),
        updateRequest: (data) => dispatch(updateRequest(data)),
        rate: (body) => dispatch(rate(body)),
        productView: (id) => dispatch(productView(id)),
        setTab: (data) => dispatch(setTab(data)),
        getQA: (id) => dispatch(getQA(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
