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

class Routine extends React.Component {
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

	componentWillMount() {
    this.props.actions.routineProductRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.routineProduct(this.props.id_routine);
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
						<View style={styles.boxContent}>
							<View style={styles.boxGradiend}></View>
							<View style={styles.boxRoutine}>
							{
								this.props.routine.routineProduct.length == 0 ?

								<View style={{alignItems: 'center', marginTop: 20}}>
									<Text style={{color: 'rgb(197, 172, 211)'}}>Chưa có sản phẩm nào cho liệu trình này</Text>
								</View>
								:

								this.props.routine.routineProduct.map((routine, index) => {
									return (
										<View key={index} style={styles.boxProduct}>
											<View style={[styles.boxHeader, {backgroundColor: '#85BAFF', borderTopColor: '#72A7EF', borderTopWidth: 4}]}>
												<View style={styles.boxIcon}>
													<Image style={styles.icMorning} source={require('../../images/icons/ic_morning_black.png')}/>
												</View>
												<View style={styles.boxLabel}>
													<Text style={styles.txtLabel}>{routine.lable.toUpperCase()}</Text>
													<Image style={styles.icArrow} source={require('../../images/icons/ic_arrow_down_black.png')}/>
												</View>
											</View>
											{
												routine.data.map((product, index) => {
													return (
														<Product product={product.product} key={index} type="morning" />
													)
												})
											}
										</View>
									) })
							}
							</View>
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
	boxContent: {
		alignItems: "flex-start",
    flexDirection: 'row',
    backgroundColor: '#85BAFF',
	},
	boxGradiend: {
		width: 8,
	},
	boxRoutine: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	boxProduct: {
		borderTopWidth: 1,
		borderTopColor: '#ECEEF0',
		borderBottomWidth: 4,
		borderBottomColor: '#ECEEF0',
	},
	boxHeader: {
		alignItems: "center",
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
	},
	boxIcon: {
		width: 100,
		alignItems: 'center',
		justifyContent: 'center'
	},
	icMorning: {
		width: 21,
		height: 18
	},
	boxLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		alignItems: 'center',
		paddingLeft: 5,
		paddingRight: 5
	},
	txtLabel: {
		color: '#1F2027',
		fontSize: 14
	},
	icArrow: {
		width: 10,
		height: 6,
		marginRight: 15,
	},
	icNight: {
		width: 20,
		height: 18
	},
	icStar: {
		width: 20,
		height: 21
	},
});

export default connect(mapStateToProps, mapDispatchToProps) (Routine);