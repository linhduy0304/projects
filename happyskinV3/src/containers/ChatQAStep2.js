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
import ModalSearch from '../components/ModalSearch'

var Modal = require('react-native-modalbox');
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import FMPicker from '../libs/react-native-select-option/FMPicker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as chatActions from '../actions/chatActions';

const actions = [
  chatActions
];
function mapStateToProps(state) {
  return {
        chat: state.chat,
    profile: state.profile,
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

class ChatQAStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    type: 1
        }
    }

    onSelect(type) {
        this.setState({
                    type: type,
        })
        }
        
        submitQuestion() {
            if(this.props.profile.currentUser.city !== '' && this.state.type == 1) {
                this.props.actions.chatQA(this.props.product.id,this.props.product.name, this.state.type, this.props.profile.currentUser.full_name, this.props.profile.currentUser.avatar, this.props.profile.currentUser.city, this.props.profile.currentUser.skintest);
            }else {
                if(this.props.profile.currentUser.skintest == '' || this.props.profile.currentUser.city == '') {
                    Actions.chatQAStep3({typeQA: this.state.type, product: this.props.product})
                }else {
                    this.props.actions.chatQA(this.props.product.id,this.props.product.name, this.state.type, this.props.profile.currentUser.full_name, this.props.profile.currentUser.avatar, this.props.profile.currentUser.city, this.props.profile.currentUser.skintest);
                }
            }
        }

    render() {
        return (
            <View style={styles.content}>
							<View style={main.container}>
									<NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
											<NavButton onPress={() => Actions.pop()} style={main.navButton}>
													<Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
													<View>
															<Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Chọn sản phẩm</Text>
													</View>
											</NavButton>
											<NavButton onPress={() => this.setState({openModal: true})} style={main.navSave}  >
													<Image style={{height: 16, width: 16}} source={require('../images/icons/ic_search_black.png')} />
											</NavButton>
									</NavBar>
									<ScrollView style={styles.header} bounces={false} showsVerticalScrollIndicator={false}>
													<Text style={styles.h1}>Hỏi đáp với Happy Skin</Text>
													<Text style={styles.title}>Sản phẩm</Text>
													<View style={styles.boxProduct}>
																	<Text style={styles.txtProduct}>{this.props.product.name}</Text>
																	<View style={styles.boxThumb}>
																					<Image style={styles.icProduct} source={{uri: this.props.product.image_thumb + '_300x300.png'}} />
																	</View>
													</View>
													<View style={styles.boxQuestion}>
																	<Text style={styles.title}>Bạn chọn nội dung câu hỏi.</Text>
																	<TouchableOpacity style={[styles.boxSelect, {backgroundColor: this.state.type == 1 ? '#F0F0FF' : '#FFFFFF'}]} onPress={() => this.onSelect(1)}>
																					<View style={[styles.boxIcon, {borderColor: this.state.type == 1 ? '#879BCE' : '#D2DAED'}]}>
																									<Image style={styles.icQuestion1} source={this.state.type == 1 ? require('../images/icons/ic_question_1_blue.png') : require('../images/icons/ic_question_1.png')} />
																					</View>
																					<Text style={[styles.txtQuestion, {color: this.state.type == 1 ? '#446EB6' : '#292A39'}]}>Mua sản phẩm ở đâu ?</Text>
																	</TouchableOpacity>
																	<TouchableOpacity style={[styles.boxSelect, {backgroundColor: this.state.type == 2 ? '#F0F0FF' : '#FFFFFF'}]} onPress={() => this.onSelect(2)}>
																					<View style={[styles.boxIcon, {borderColor: this.state.type == 2 ? '#879BCE' : '#D2DAED'}]}>
																									<Image style={styles.icQuestion2} source={this.state.type == 2 ? require('../images/icons/ic_question_2_blue.png') : require('../images/icons/ic_question_2.png')} />
																					</View>
																					<Text style={[styles.txtQuestion, {color: this.state.type == 2 ? '#446EB6' : '#292A39'}]}>Sản phẩm này có hợp tôi không ?</Text>
																	</TouchableOpacity>
																	<TouchableOpacity style={[styles.boxSelect, {backgroundColor: this.state.type == 3 ? '#F0F0FF' : '#FFFFFF'}]} onPress={() => this.onSelect(3)}>
																					<View style={[styles.boxIcon, {borderColor: this.state.type == 3 ? '#879BCE' : '#D2DAED'}]}>
																									<Image style={styles.icQuestion3} source={this.state.type == 3 ? require('../images/icons/ic_question_3_blue.png') : require('../images/icons/ic_question_3.png')} />
																					</View>
																					<Text style={[styles.txtQuestion, {color: this.state.type == 3 ? '#446EB6' : '#292A39'}]}>Sản phẩm này dùng thế nào ?</Text>
																	</TouchableOpacity>
													</View>
													{
															this.props.chat.isFetching ?
																	<View style={{alignItems: 'center'}}>
																			<Image style={{width: 75, height: 75}} source={require('../images/spinner.gif')} />
																	</View>
															:
																	<TouchableOpacity style={styles.button} onPress={() => this.submitQuestion()}>
																			<Text style={styles.txtButton}>Gửi tới Happy  Skin</Text>
															</TouchableOpacity>
													}
											
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
    header: {
        marginLeft: 15,
        marginRight: 15,
    },
    h1: {
        color: '#D73554',
        fontSize: 32,
        paddingBottom: 25
    },
    title: {
        color: '#333333',
        fontSize: 14,
        paddingBottom: 15
    },
    boxProduct: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: 50
    },
    txtProduct: {
        color: '#333333',
        fontSize: 20,
        paddingRight: 10,
        flex: 1
    },
    boxThumb: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icProduct: {
        width: 60,
        height: 60,
    },
    boxQuestion: {
        marginBottom: 30,
    },
    boxSelect: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingRight: 30,
        borderRadius: 20
    },
    boxIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#879BCE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icQuestion1: {
        width: 22,
        height: 19
    },
    txtQuestion: {
        fontSize: 16,
        marginLeft: 15
    },
    icQuestion2: {
        width: 22,
        height: 22
    },
    icQuestion3: {
        width: 22,
        height: 22
    },
    button: {
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#FE7535',
        alignItems: 'center',
        justifyContent: 'center',
				marginBottom: 20,
				borderRadius: 4
    },
    txtButton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatQAStep2);
