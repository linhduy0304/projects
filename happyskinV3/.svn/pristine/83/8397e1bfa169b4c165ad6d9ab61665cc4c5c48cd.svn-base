import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import {Actions} from "react-native-router-flux";

class RoutineProduct extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  _handerOnScroll(e) {
    if (e.nativeEvent.contentOffset.y > 0) {
      this.state.scrollY.setValue(e.nativeEvent.contentOffset.y);
    }
  }

	render() {
		const headerHeight = Animated.diffClamp(this.state.scrollY, 0, 44).interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.content}>
      	<StatusBar
          backgroundColor="white"
          barStyle="default"
        />
        <View style={{marginTop: Platform.OS === 'ios' ? 20 : 0, flex: 1}}>
	        <Animated.View style={[main.header, {height: headerHeight}]}>
		        <View style={styles.customerNav}>
		        	<View></View>
		          <TouchableOpacity onPress={() => Actions.pop()} style={styles.customerNavBack}>
		            <Image style={styles.navBack} source={require('../images/icons/ic_close_black.png')}/>
		          </TouchableOpacity>
		        </View>
	        </Animated.View>
	        <Animated.View style={[styles.container, {marginTop: headerHeight}]}>
	        	<ScrollView
	            style={styles.scrollView}
	            onScroll={ (e) => this._handerOnScroll(e) }
	            scrollEventThrottle={16}
	            bounces={false}
	          >
	          	<View style={styles.boxProduct}>
	          		<View style={styles.boxInfoProduct}>
	          			<Text style={styles.txtNameProduct}>Phy-mong She Water Blossom Collagen F-ampoule</Text>
	          			<Text style={styles.txtTimeStart}>Ngày bắt đầu: <Text style={styles.txtTime}>10/10/2017</Text></Text>
	          			<Text style={styles.txtTimeStart}>Ngày kết thúc: <Text style={styles.txtTime}>10/10/2017</Text></Text>
	          		</View>
	          		<View style={styles.boxThumbProduct}>
	          			<Image style={styles.thumbProduct} source={require('../images/thumb_product.png')}/>
	          		</View>
	          	</View>
	          	<View style={styles.boxCoach}>
	          		<Text style={styles.txtTitle}>{'Lưu ý từ Coach'.toUpperCase()}</Text>
	          		<Text style={styles.txtContentCoach}>Chỗ này dành một dòng nhỏ về mẹo của sản phẩm, hoặc hướng dẫn sử dụng. Có thể dùng chung các mẹo với nhiều sản phẩm, ví dụ 1 mẹo dành cho mask có thể hiện ở tất cả các sản phẩm mask.</Text>
	          	</View>
	          	<View style={styles.boxDetailProduct}>
	          		<Text style={[styles.txtTitle, {paddingLeft: 15, paddingRight: 15}]}>{'Cập nhận thông tin sản phẩm'.toUpperCase()}</Text>
	          		<View style={styles.boxInfo}>
	          			<View style={styles.boxInfoDetail}>
	          				<View style={styles.boxCart}>
		          				<Image style={styles.ic_cart} source={require('../images/icons/ic_cart_blue.png')}/>
		          				<Text style={styles.txtDetail}>Tìm mua trên SkinStore</Text>
	          				</View>
	          				<Image style={styles.ic_arrow_next} source={require('../images/icons/ic_arrow_next_blue.png')}/>
	          			</View>
	          			<View style={styles.boxInfoDetail}>
	          				<View style={styles.boxCart}>
		          				<Image style={styles.ic_out_product} source={require('../images/icons/ic_out_product_blue.png')}/>
		          				<Text style={styles.txtDetail}>Tôi đã dùng hết sản phẩm này</Text>
	          				</View>
	          			</View>
	          			<View style={styles.boxInfoDetail}>
	          				<View style={styles.boxCart}>
		          				<Image style={styles.ic_trash} source={require('../images/icons/ic_trash_blue.png')}/>
		          				<Text style={styles.txtDetail}>Tôi không dùng sản phẩm này nữa</Text>
	          				</View>
	          			</View>
	          		</View>
	          	</View>
	          	<View style={styles.boxCoach}>
	          		<Text style={styles.txtTitle}>{'Review từ happyskin'.toUpperCase()}</Text>
	          		<Text style={styles.txtContentCoach}>Chỗ này dành một dòng nhỏ về mẹo của sản phẩm, hoặc hướng dẫn sử dụng. Có thể dùng chung các mẹo với nhiều sản phẩm, ví dụ 1 mẹo dành cho mask có thể hiện ở tất cả các sản phẩm mask.</Text>
	          	</View>
	          	<View style={styles.boxCoach}>
	          		<Text style={styles.txtTitle}>{'Review về sản phẩm này'.toUpperCase()}</Text>
	          		<Text style={styles.txtContentCoach}>Chỗ này dành một dòng nhỏ về mẹo của sản phẩm, hoặc hướng dẫn sử dụng. Có thể dùng chung các mẹo với nhiều sản phẩm, ví dụ 1 mẹo dành cho mask có thể hiện ở tất cả các sản phẩm mask.</Text>
	          	</View>
	          </ScrollView>
	        </Animated.View>
        </View>
      </View>
    )
  }
}
const HEADER_MAX_HEIGHT = 44;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

let main = require('../styles/Main');
const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	customerNav: {
		height: 44,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	customerNavBack: {
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	navBack: {
		width: 16,
		height: 16,
		marginRight: 5
	},
	txtBack: {
		fontSize: 14,
		color: '#446EB6',
	},
	navSave: {
		width: 15,
		height: 16,
	},
	container: {
		flex: 1,
	},
	scrollView: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    width: deviceWidth,
    flex: 1,
  },
  boxProduct: {
  	justifyContent: 'flex-start',
		flexDirection: 'row',
		paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  boxInfoProduct: {
  	width: deviceWidth - 165
  },
  txtNameProduct: {
  	fontSize: 24,
  	color: '#4E76A2',
  	paddingBottom: 15,
  },
	txtTimeStart: {
		fontSize: 15,
		color: '#858E98',
		paddingBottom: 5
	},
	txtTime: {
		fontSize: 15,
		color: '#333333'
	},
	boxThumbProduct: {
		paddingLeft: 5
	},
	thumbProduct: {
		width: 135,
		height: 135,
	},
	boxCoach: {
		paddingTop: 15,
		paddingBottom: 65,
    paddingLeft: 15,
    paddingRight: 15
	},
	txtTitle: {
		fontSize: 14,
		color: '#8750A1',
		paddingBottom: 15
	},
	txtContentCoach: {
		fontSize: 14,
		color: '#333333'
	},
	boxDetailProduct: {
		paddingTop: 15,
	},
	boxInfo: {
		borderBottomWidth: 1,
		borderBottomColor: '#ECEEF0'
	},
	boxInfoDetail: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingLeft: 15,
    paddingRight: 15,
    borderTopWidth: 2,
		borderTopColor: '#ECEEF0',
		paddingTop: 20,
		paddingBottom: 20
	},
	boxCart: {
		flexDirection: 'row',
	},
	ic_cart: {
		width: 22,
		height: 19,
	},
	txtDetail: {
		fontSize: 15,
		color: '#333333',
		paddingLeft: 10
	},
	ic_arrow_next: {
		width: 6,
		height: 10
	},
	ic_out_product: {
		width: 22,
		height: 22
	},
	ic_trash: {
		width: 20,
		height: 22
	},
});

export default RoutineProduct;