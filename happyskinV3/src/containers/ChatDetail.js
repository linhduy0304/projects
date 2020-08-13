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
    InteractionManager,
	NativeModules,
	KeyboardAvoidingView
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
var DeviceInfo = require('react-native-device-info');
const socket = io.connect('http://42.112.20.90:4002/', { transports: ['websocket'] });
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var Modal = require('react-native-modalbox');
import ModalSearch from '../components/ModalSearch'
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import Button from "react-native-button";
import io from 'socket.io-client';
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Toast from 'react-native-simple-toast';
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

class ChatDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
						listMessage: [],
						images:[],
						content: '',
						openModal: false,
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

		pickImages() {
			var _this = this;
			ImagePicker.openPicker({
				width: 800,
				height: 800,
				cropping: true,
				multiple: true,
				includeBase64: true,
				maxFiles: 10
			}).then(images => {
				this.setState({checkImage: false})
				var urlImages = [];
				var itemImage=[];
				images.map(function(image, index){
					ImageResizer.createResizedImage(image.path, 600, 800, 'JPEG', 80)
					.then((uri) => {
						if(Platform.OS == 'android') {
							NativeModules.RNImageToBase64.getBase64String(uri.uri ,( err, base64) => {
								var itemImage = {
									'data': base64
								}
								if(images.length > 5){
									// urlImages.push(itemImage);
									// if(index + 1 == 5){
									//   Toast.show('Bạn chỉ được chọn tối đa 5 ảnh');
									//   _this.onChange('images', urlImages);
									// }
									urlImages.push(itemImage);
									if(images.length == index + 1){
										_this.setState({images: urlImages});
									}
								}else {
									urlImages.push(itemImage);
									if(images.length == index + 1){
										_this.setState({images: urlImages});
									}
								}
							}).catch(error => {console.log(error)});
						} else {
							var itemImage = {
							'data': uri
							}
							urlImages.push(itemImage);
							 if(images.length == index + 1){
								 _this.setState({images: urlImages});
							 }
							 _this.setState({images: urlImages});
						}
					}).catch((err1) => {
					});
				})
			}).catch(e => {});
		}

		sendComment() {
			var _this= this;
			var img = '';
			// (this.state.images.length > 0) ?
			// 	this.state.images.map(function(image, index){
			// 		if(img == '') {
			// 			img = image.data;
			// 		} else {
			// 			img = img+'###'+image.data;
			// 		}
			// 	})
			// : '';
			// 
			socket.emit('send_message', {
					room_id: _this.props.data.id,
					user_id: _this.props.profile.currentUser.id,
					full_name: _this.props.profile.currentUser.full_name,
					avatar: _this.props.profile.currentUser.avatar,
					content: _this.state.content,
					images: _this.state.images,
			});
			this.setState({
					content: '',
					images: [],
			})
			setTimeout(function(){
				_this.refs.listChat.scrollToEnd({animated: true});
			}, 1000);
        }
        
		renderName() {
			switch(this.props.data.type) {
				case 1:
					return this.props.data.routine.author.full_name;
				case 2:
					return this.props.data.coach.full_name;
				case 3:
					return this.props.data.happyskin.full_name;
			}
		}

    render() {
        return (
            <View style={styles.content}>
							<View style={main.container} >
                <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
                    <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                        <Image style={styles.navBack} source={require('../images/icons/ic_back_blue2.png')}/>
                        <View>
                            <Text style={main.txtBack}>Chat</Text>
                        </View>
                    </NavButton>
                    <NavButton onPress={() => this.setState({openModal: true})} style={main.navSave}  >
                        <Image style={{height: 16, width: 16}} source={require('../images/icons/ic_search_black.png')} />
                    </NavButton>
                </NavBar>
                <View style={styles.header}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.txtName}>{this.renderName()}</Text>
                        <View style={styles.boxLive}>
                            <View style={styles.iconLive}></View>
                            <Text style={styles.txtLive}>{'Live'.toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={styles.boxTitle}>
                        <Text style={styles.txtTitle}>Coach <Text style={{fontWeight: 'bold'}}>Trị Mụn dành cho da dầu.</Text></Text>
												<Button 
													containerStyle={{backgroundColor:"rgb(254, 117, 53)", borderRadius:20,height: 28, alignItems: 'center',paddingLeft: 13, paddingRight: 13, justifyContent: 'center'}}
													style={{fontSize: 14, color: '#fff'}}>
													Hẹn lịch 
												</Button>
                    </View>
                </View>
                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={10} style={{ flex: 1 }}>
                <ScrollView ref="listChat" style={styles.contentChat}>
                    <View style={styles.clear}></View>
										{
											this.state.listMessage.length != 0 ?
												this.state.listMessage.map((item, index) => {
													if(item.user_id == this.props.profile.currentUser.id) {
														return(
															<View key={index} style={styles.myChat}>
																	<HTMLView value={item.content} style={styles.contentMyChat} stylesheet={styles} />
																	{
																		item.images ?
																		<ScrollView horizontal={true}>
																		{
																			item.images.length != 0 ?
																			item.images.map((image, index) => {
																				return (
																					<TouchableOpacity key={index} onPress={() => Actions.imageView({images: item.images, index: index})} style={{marginTop: 5, marginRight: 5}}>
																						<Image style={{height: 50, width: 50}} source={{uri: image+'.png'}} />
																					</TouchableOpacity>
																				)
																			})
																		: null 
																		}
																		</ScrollView>
																		: null
																	}
																	<View style={styles.triangleMy}></View>
															</View>
														)
													}else {
														return (
															<View key={index} style={styles.friendChat}>
																<HTMLView value={item.content} style={styles.contentFriendChat} stylesheet={styles} />
																{
																		item.images ?
																		<ScrollView horizontal={true}>
																		{
																			item.images.length != 0 ?
																			item.images.map((image, index) => {
																				return (
																					<TouchableOpacity key={index} onPress={() => Actions.imageView({images: item.images, index: index})} style={{marginTop: 5, marginRight: 5}}>
																						<Image style={{height: 50, width: 50}} source={{uri: image+'.png'}} />
																					</TouchableOpacity>
																				)
																			})
																		: null 
																		}
																		</ScrollView>
																		: null
																	}
																<View style={styles.triangle}></View>
														</View>
														)
													}
												})
											: null
										}
                    <View style={styles.clear}></View>
                </ScrollView>
								{
									this.props.data.type == 3 ?
										null 
									:
										<View style={main.boxChat}>
                    <TouchableOpacity onPress={() => this.pickImages()} style={styles.selectImage}>
                        <Image source={require('../images/icons/ic_camera_pink.png')} style={styles.icCamera}/>
                    </TouchableOpacity>
                    <View style={main.mainTxtChat}>
											{
												this.state.images.length > 0 ?
												<ScrollView horizontal={true} >
													{
													this.state.images.map((image, index) => {
														return (
															<Image key={index} source={{uri: 'data:image/jpeg;base64,' + image.data, isStatic: true}} style={{height: 30,marginTop: 5, marginRight: 3, width: 30}}/>
														)
													})
													}
												</ScrollView>
												: null
											}
											<TextInput 
													placeholder = "Nhập nội dung chat"
													underlineColorAndroid='transparent'
													placeholderTextColor={'rgb(194, 197, 208)'}
													style={styles.inputChat}
													selectionColor='#C2C5D0'
													onChangeText={(content) => this.setState({content: content})}
													autoGrow={true}
													value={this.state.content}
                  				multiline={true}
											/>
                    </View>
										<TouchableOpacity onPress = {() => this.sendComment()}>
											<Text style={main.txtSend}>Gửi</Text>
										</TouchableOpacity>
                	</View>
								}
								</KeyboardAvoidingView>
                
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
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Platform.OS === 'ios' ? 20 : DeviceInfo.getSystemVersion().slice(0, 1) != 4 ? 20 : 0,
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
				fontWeight: 'bold',
        fontSize: 24,
    },
    boxLive: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconLive: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E30052',
        marginRight: 3
    },
    txtLive: {
        color: '#E30052',
        fontSize: 14
    },
    boxTitle: {
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtTitle: {
        fontSize: 14,
        color: 'rgb(135, 155, 206)',
    },
		navBack: {
			width: 13,
			height: 12,
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
        maxWidth: deviceWidth - 70,
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
        maxWidth: deviceWidth - 70,
        borderRadius: 10,
        marginBottom: 12
    },
    contentMyChat: {
        fontSize: 15,
        color: 'rgb(51, 51, 51)'
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
			fontSize: 16,
      paddingTop: 0,
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatDetail);
