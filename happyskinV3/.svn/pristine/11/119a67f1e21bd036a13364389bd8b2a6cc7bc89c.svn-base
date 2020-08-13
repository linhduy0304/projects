import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Platform
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
var Modal = require('react-native-modalbox');
import ModalSearch from '../components/ModalSearch'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { TextField } from 'react-native-material-textfield';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as cosmeticsActions from '../actions/cosmeticsActions';

const actions = [
  cosmeticsActions
];
function mapStateToProps(state) {
  return {
    cosmetics: state.cosmetics,
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

class ChatQAStep1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
					product: '',
					show: false,
					openModal: false
        }
		}
		
		onChange(product) {
			this.setState({product: product})
			if(product == '') {
        return;
      }
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.setState({
          show: true
        })
        this.props.actions.search(product)
      }, 1000)
		}
		
		pickProduct(product) {
			dismissKeyboard()
			Actions.chatQAStep2({product: product})
      this.setState({
				show: false,
      })
    }

    render() {
        return (
					<View style={styles.content}>
						<View style={main.container}>
							<NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
								<NavButton onPress={() => Actions.pop()} style={main.navButton}>
									<Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
									<View>
										<Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Chat</Text>
									</View>
								</NavButton>
								<NavButton onPress={() => this.setState({openModal: true})} style={main.navSave}  >
									<Image style={{height: 16, width: 16}} source={require('../images/icons/ic_search_black.png')} />
								</NavButton>
							</NavBar>

							<ScrollView
							bounces={false}
							keyboardShouldPersistTaps={'always'}>
							<View style={styles.header}>
								<Text style={styles.h1}>Hỏi đáp với Happy Skin</Text>
								<Text style={styles.title}>Nhập tên sản phẩm bạn muốn hỏi.</Text>
								<TextField
									label='Tên sản phẩm'
									autoCorrect={false}
									onChangeText={(product) => this.onChange(product)}
									tintColor="#5a5e6f"
									textColor="#0e0e11"
									baseColor="#c2c5d0"
								/>
                {
									this.props.cosmetics.isFetching ? 
										<View style={{alignItems: 'center'}}>
											<Image style={{width: 75, height: 75}} source={require('../images/spinner.gif')} />
										</View>
										: null
								}          
								{
									this.props.cosmetics.searchProduct.length !== 0 && this.state.show ?
										<View>
											{
												this.props.cosmetics.searchProduct.map((item, index) => {
													return (
														<TouchableOpacity key={index} style={{flexDirection: 'row',alignItems: 'center', padding: 5}} onPress={() => this.pickProduct(item)}>
															<Image style={{height: 40, width: 40, marginRight: 10}} source={{uri: item.image_thumb+'.png'}} />
															<Text style={{color: 'rgb(68, 110, 182)'}}>{item.name}</Text>
														</TouchableOpacity>
													)
												})
											}
										</View>
										: null
								}
							</View>
							</ScrollView>
						</View>
						<Modal 
							style={main.modal}
							isOpen={this.state.openModal}
							swipeToClose={true}
							position="top"
							entry="bottom"
							animationDuration={200}
							backdropColor="#000"
							onClosed={()=> this.setState({openModal: false}) }>
							<ModalSearch closeModal={() => this.setState({openModal: false})}/>
						</Modal>
					</View>
        );
    }
}

let main = require('../styles/Main');

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1
    },
    navBack: {
        width: 8,
        height: 14,
        marginRight: 5
    },
    header: {
        marginLeft: 15,
        marginRight: 15
    },
    h1: {
        color: '#D73554',
        fontSize: 32,
        paddingBottom: 25
    },
    title: {
        color: '#333333',
        fontSize: 14,
        paddingBottom: 25
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatQAStep1);
