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
		Platform,
		InteractionManager
} from 'react-native';
const socket = io.connect('http://42.112.20.90:4002/', { transports: ['websocket'] });
let deviceWidth = Dimensions.get('window').width;
import ModalSearch from '../components/ModalSearch'

var Modal = require('react-native-modalbox');
import io from 'socket.io-client';
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import HTMLView from "react-native-htmlview";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as chatActions from '../actions/chatActions';
const actions = [
  chatActions
];
function mapStateToProps(state) {
  return {
		chat: state.chat,
		profile: state.profile
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

class ChatQAStep3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
					listMessage: [],
        }
		}

		componentDidMount(){
			InteractionManager.runAfterInteractions(() => {
				this.openSocket();
			});
		}

		openSocket() {
			var _this = this;
			if(socket !== undefined){
					var data = {room_id: _this.props.data.id};
					socket.emit('join_room', data);
					var message = this.state.listMessage;
					socket.on('list_message', function(data){
							// data.map(function(d, index) {
							// 		message = message.concat(d);
							// })
							message = message.concat(data)
							_this.setState({
									listMessage: message,
							});
                    });
                    setTimeout(function(){
                        _this.refs.listChat.scrollToEnd({animated: true});
                    }, 1000);
			} else {
					console.log('faild')
			}
		}

    render() {
        return (
            <View style={styles.content}>
                <View style={main.container}>
                    <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
                        <NavButton onPress={() => Actions.homeNew({type: 'reset'})} style={main.navBack}>
                            <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
                            <View>
                                <Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Chat</Text>
                            </View>
                        </NavButton>
                        <NavButton onPress={() => this.setState({openModal: true})} style={main.navSave}  >
                            <Image style={{height: 16, width: 16}} source={require('../images/icons/ic_search_black.png')} />
                        </NavButton>
                    </NavBar>
                    <View style={styles.header}>
                        <View style={styles.contentHeader}>
                            <Text style={styles.txtName}>Happy Skin</Text>
                        </View>
                        <View style={styles.boxTitle}>
                            <Text style={styles.txtTitle}>Happy Skin sẽ trả lời bạn trong vòng 48 giờ</Text>
                        </View>
                    </View>
                    <ScrollView ref={'listChat'} style={styles.contentChat}>
											<View style={styles.clear}></View>
											{
												this.state.listMessage.length != 0 ?
													this.state.listMessage.map((item, index) => {
														if(item.user_id == this.props.profile.currentUser.id) {
															return(
																<View key={index} style={styles.myChat}>
																		<HTMLView value={item.content} style={styles.contentMyChat} stylesheet={styles} />
																		<View style={styles.triangleMy}></View>
																</View>
															)
														}else {
															return (
																<View key={index} style={styles.friendChat}>
																	<HTMLView value={item.content} style={styles.contentFriendChat} stylesheet={styles} />
																	<View style={styles.triangle}></View>
															</View>
															)
														}
													})
												: null
											}
											<View style={styles.clear}></View>
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
    strong: {
      fontWeight: '600',
    },
    content: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1
    },
    header: {
        marginLeft: 15,
        marginRight: 15
    },
    contentHeader: {
        flexDirection: 'row',
        paddingBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtName: {
        color: '#292A39',
        fontSize: 24,
    },
    boxTitle: {
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    txtTitle: {
        fontSize: 14,
        color: '#292A39',
    },
    contentChat: {
			backgroundColor: 'rgb(253, 233, 240)',
        //paddingTop: 15
    },
    friendChat: {
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        maxWidth: deviceWidth - 40,
        flex: 1,
        alignSelf: 'flex-start',
        marginBottom: 6
    },
    contentFriendChat: {
        fontSize: 15,
        color: '#333333'
    },
    myChat: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'rgb(226, 93, 133)',
        borderRadius: 10,
        padding: 15,
        alignSelf: 'flex-end',
        maxWidth: deviceWidth - 40,
        borderRadius: 10,
        marginBottom: 6
    },
    contentMyChat: {
        fontSize: 15,
        color: '#333333'
    },
    clear: {
        height: 15
    },
    boxChat: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 50
    },
    selectImage: {
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icCamera: {
        width: 20,
        height: 18
    },
    mainTxtChat: {
        width: deviceWidth - 45,
        justifyContent: 'center'
    },
    inputChat: {
        height: 45,
        marginRight: 15,
        color: '#C2C5D0'
    },
    triangle: {
        position: 'absolute',
        top: 0,
        left: -10,
        width: 9,
        height: 12,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 10,
        borderTopColor: 'white',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    triangleMy: {
        position: 'absolute',
        top: 0,
        right: -10,
        width: 9,
        height: 12,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 10,
        borderTopColor: 'rgb(226, 93, 133)',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    boxButtonThank: {
        alignItems: 'center',
        marginTop: 10,
    },
    boxButtonBuy: {
        flexDirection: 'row',
        backgroundColor: '#FE7535',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    txtButton: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    ctItemDeals: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    txtDeals: {
      color: 'rgb(41, 42, 57)',
      fontSize: 32,
    },
    txtTitleDeals: {
      color: '#4E76A2',
      fontSize: 16,
      paddingBottom: 5,
    },
    priceNew: {
      color: '#292A39',
      fontSize: 14,
    },
    priceOld: {
      flex: 1,
      marginLeft: 5,
      color: '#C8C7CC',
      textDecorationLine : 'line-through',
      fontSize: 14
    },
    boxButton: {
        alignItems: 'center',
        paddingTop: 15,
    },
    button: {
        color: '#D73554',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D73554',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatQAStep3);
