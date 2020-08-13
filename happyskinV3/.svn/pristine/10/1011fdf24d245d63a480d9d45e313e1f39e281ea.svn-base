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
	ImageBackground,
  TouchableOpacity,
	Platform,
	InteractionManager
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import {Actions} from "react-native-router-flux";
import Product from "./Product";
import LinearGradient from 'react-native-linear-gradient';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as routineActions from '../../actions/routineActions';
const actions = [
  routineActions
];
function mapStateToProps(state) {
  return {
    routine: state.routine
  };
}
function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class Diary extends React.Component {
	constructor(props) {
    super(props);
    this.state = {

    }
  }

  _handerOnScroll(e) {
    if (e.nativeEvent.contentOffset.y > 0) {
      this.props.onScroll(e);
    }
  }

  products(products) {
  	products.map((product, index) => {
  		return (
  			<Product product={product} key={index} />
  		)
  	})
	}
	
	componentWillMount() {
    this.props.actions.routineProductRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.routineProduct(this.props.id_routine, 'diary');
    })
  }

	render() {
    return (
      <View style={styles.content}>
      	<ScrollView
      		onScroll={ (e) => this._handerOnScroll(e) }
          scrollEventThrottle={16}
          bounces={false}
      		style={styles.container}
      	>
				{
						this.props.routine.isFetching ?
							<View style={main.mainSpinTop}>
								<Image style={main.imgLoading} source={require('../../images/spinner.gif')} />
							</View>
						:
							<View style={styles.diary}>
							{
								this.props.routine.routineDiary.length == 0 ?

								<View style={{alignItems: 'center'}}>
									<Text style={{color: 'rgb(197, 172, 211)'}}>Chưa có nhật ký nào cho liệu trình này</Text>
								</View>
								:
								this.props.routine.routineDiary.map((diary, index) => {
									return (
										<View key={index} style={styles.boxDiary}>
											<View style={styles.boxDate}>
												<Text style={styles.txtDate}>Ngày {diary.time}</Text>
												<View style={styles.boxEdit}>
													<Text onPress={() => Actions.updateRoutine({id_routine: this.props.id_routine, time: diary.time})} style={styles.txtEdit}>{'Sửa'.toUpperCase()}</Text>
													<Image style={styles.icEdit} source={require('../../images/icons/ic_edit_black.png')} />
												</View>
											</View>
											<ScrollView style={styles.boxProduct} horizontal={true} showsHorizontalScrollIndicator={false}>
												{
													diary.data.map((product, index) => {
														return (
															<ImageBackground key={index} style={styles.icProduct} source={{uri: product.product.image_thumb+'_100x100.png'}}>
																<Image style={styles.icCheck} source={product.is_using ? require('../../images/icons/ic_checked.png') : require('../../images/icons/ic_check.png')}/>
															</ImageBackground>
														)
													})
												}
											</ScrollView>
										</View>
									)
								})
							}
							</View>
						}
	        
	      </ScrollView>
      </View>
    )
  }
}
let main = require('../../styles/Main');
const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	container: {
		flex: 1,
	},
	diary: {
		paddingTop: 20,
		paddingBottom: 30,
		paddingLeft: 15,
	},
	boxDiary: {
		paddingTop: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#ECEEF0'
	},
	boxDate: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	txtDate: {
		fontSize: 14,
		color: '#292A39'
	},
	boxEdit: {
		flexDirection: 'row',
		paddingRight: 15,
		alignItems: 'center'
	},
	txtEdit: {
		fontSize: 14,
		color: '#446EB6',
		marginRight: 5
	},
	icEdit: {
		width: 8,
		height: 8,
	},
	boxProduct: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	icProduct: {
    width: 70,
    height: 70,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 15
  },
  icCheck: {
    width: 12,
    height: 12
  },
});
export default connect(mapStateToProps, mapDispatchToProps) (Diary);