

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Image }  from 'react-native';
import CtIcon from './CtIcon';
import { screen } from '../../config/Constant';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-render-html';

const Detail = ({
    data,
    name,
    onPress
}) => (
    <View>
		<View style={css.ct}>
			<View style={{flexDirection: 'row', alignItems: 'center',}}>
			<CtIcon source={require('../../icons/ic_info.png')}/>
			<Text style={css.label}>Chi tiết sản phẩm</Text>
			<TouchableOpacity style={{padding: 5}} onPress={onPress}>
				<Image style={{width: 16, height: 16}} source={require('../../icons/ic_copy.png')}/>
			</TouchableOpacity>
			</View>
			<View style={{maxHeight: 300, paddingVertical: 5}}>
				<HTMLView
					html={data}
					tagsStyles={{
						p : {
							marginBottom: 0,
							marginTop: 5
						}
					}}
				/>
			</View>
			
		</View>
		<TouchableOpacity onPress={() => Actions.productDetailMore({title: name, data:data})} style={css.ctMore}>
			<Text style={css.more}>Xem thêm</Text>
		</TouchableOpacity>
    </View>
    
);

const css = StyleSheet.create({
	more: {
		color: '#de1838',
	},
	ctMore: {
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f7f7f7',
	},
	label: {
		fontSize: 16,
		marginLeft: 10,
		color: '#333',
		flex: 1

	},
	ct: {
		marginTop: 10,
		backgroundColor: '#fff',
		padding: 10,
	},
})
export default Detail;
