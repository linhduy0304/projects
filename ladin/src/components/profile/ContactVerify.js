

import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Image,NativeModules
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { screen } from '../../config/Constant';

class ContactVerify extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			active: 1,
			pick: null,
			path: '',
			uri: ''
		}
	}

	pick() {
		ImagePicker.openCamera({
			width: 300,
			height: 300,
			includeBase64: true
		}).then(image => {
			
			this.setState({
				pick: true,
				uri: image.data,
			})
			this.props.setImage(image.data)
		
		}).catch(e => {});
	}

	set(type) {
		this.setState({active: type})
		this.props.setActive(type)
	}

	render() {
		const {active,pick} = this.state
		return (
			<View style={{width: screen.width-60}}>
				<View style={css.ct}>
					<Text style={{color:'#8c9192', marginTop: 10}}>Giấy phép kinh doanh</Text>
					<View style={{flex: 1}}>
						<View style={{ flexDirection: 'row',}}>
							<TouchableOpacity onPress={() => this.set(1)} style={css.ctAction}>
								<View style={css.ctCircle}>
									{
										active === 1 ?
											<View style={css.ctPick}></View>
										: null
									}
								</View>
								<Text style={css.yes}>Có</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.set(0)} style={css.ctAction}>
								<View style={css.ctCircle}>
									{
										active === 0 ?
											<View style={css.ctPick}></View>
										: null
									}
								</View>
								<Text style={css.yes}>Không</Text>
							</TouchableOpacity>
						</View>
						{
							active ?
							 !pick ?
							<TouchableOpacity onPress={() => this.pick()} style={css.ctAdd}>
								<Text style={css.add}>+</Text>
							</TouchableOpacity>
							: null : null
						}
					</View>
					
				</View>
				{
					active ?
					pick ?
						<View style={{alignItems: 'center', marginTop: 10}}>
								<TouchableOpacity onPress={() => this.pick()} >
									<Image style={{height: 200, width: 200}} source={{uri: `data:image/jpeg;base64,${this.state.uri}`}} />
								</TouchableOpacity>
						</View>
					
					: null : null
				}
			</View>
			
		)
	}
}


const css = StyleSheet.create({
	add: {
		fontSize: 50,
		color: '#c1c1c1',
		// fontWeight: '200',
	},
	ctAdd: {
		height: 80, 
		width: 80,
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	yes: {
		color: '#8c9192',
		marginLeft: 8
	},
	ct: {
		flexDirection: 'row',
		marginTop: 10
		// alignItems: 'center'
	},
	ctAction: {
		flexDirection: 'row',
		padding: 10,
		flex: 1,
		// justifyContent: 'center',
	},
	ctPick: {
		height:12,
		width: 12,
		borderRadius: 6,
		backgroundColor: '#167efb',
	},
	ctCircle: {
		borderColor: '#167efb',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		height: 20,
		width: 20,
		borderRadius: 10
	}
})
export default ContactVerify;
