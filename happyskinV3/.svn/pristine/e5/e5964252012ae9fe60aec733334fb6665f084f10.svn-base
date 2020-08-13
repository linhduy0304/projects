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

class UpdateProduct extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      check: this.props.product.is_using
    }
	}
	// componentWillReceiveProps(nextProps) {
	// 	if(nextProps != this.props) {
	// 		this.setState({
	// 			check: nextProps.product.is_using
	// 		})
	// 	}
	// }

  addId() {
    this.setState({
      check: this.state.check == 1 ? 2 : 1
    })
    this.props.addId(this.props.product.product.id, this.props.time)
  }

	render() {
    return (
      <View style={styles.content}>
				<View style={styles.boxListProduct}>
					<View style={styles.hrLeft}></View>
					<View style={styles.hr}></View>
				</View>
  			<View style={styles.boxListProduct}>
          {
            this.state.check == 1 ?
              <TouchableOpacity onPress={() => this.addId()}>
                <Image style={styles.icCheck} source={require('../../images/icons/ic_checked.png')} />
              </TouchableOpacity>
            :
              <TouchableOpacity onPress={() => this.addId()}>
                <Image style={styles.icCheck} source={require('../../images/icons/ic_check.png')} />
              </TouchableOpacity>
          }
          <View style={styles.boxIcon}>
  					<Image style={styles.icProduct} source={{uri: this.props.product.product.image_thumb+'_100x100.png'}}/>
  				</View>
  				<View style={styles.boxContentProduct}>
  					<Text style={styles.txtCategory}>Sửa rửa mặt</Text>
  					<Text style={styles.txtName}>{this.props.product.product.name}</Text>
  				</View>
  			</View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  icCheck: {
    width: 12,
    height: 12,
    margin: 15
  },
	content: {
		flex: 1,
	},
	hrLeft: {
		width: 100,
	},
	hr: {
		flex: 1,
		backgroundColor: '#ECEEF0',
		height: 1
	},
	boxListProduct: {
		alignItems: "center",
    flexDirection: 'row',
	},
	icProduct: {
		width: 100,
		height: 100
	},
	boxContentProduct: {
		paddingLeft: 5,
		paddingRight: 5,
		flex: 1
	},
	txtCategory: {
		color: '#ABB6D2',
		fontSize: 13
	},
	txtName: {
		color: '#4E76A2',
		fontSize: 16
	},
	txtTime: {
		fontSize: 13,
		color: '#333333'
	}
});

export default UpdateProduct;