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
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let ConstantSystem = require('../services/ConstantSystem');
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import PickerItem from "../libs/PickerItem"
import ModalSearch from '../components/ModalSearch'

var Modal = require('react-native-modalbox');

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

var cities = ConstantSystem.cities;
class ChatQAStep3 extends React.Component {
    constructor(props) {
			super(props);
			this.state = {
				modalVisible: false,
				city: 'ha-noi',
			}
    }

    setModalVisible(state) {
			this.setState({
				modalVisible: state,
			});
		}
		
		onChange(value) {
			this.setState({
				city: value,
				modalVisible: false
			})
			this.props.actions.chatQA(this.props.product.id, this.props.product.name, this.props.typeQA, this.props.profile.currentUser.full_name, this.props.profile.currentUser.avatar, value, this.props.profile.currentUser.skintest);
			// Actions.chatQAStep31({typeQA: this.props.typeQA, product_name: this.props.product_name});
		}

		renderAction() {
			if(this.props.typeQA == 1) {
				return (
					<View style={styles.friendChat}>
							<Text style={styles.contentFriendChat}>
									Chào bạn. Bạn vui lòng cho Happy Skin biết nơi bạn đang sống để được tư vấn cụ thể nhé.
							</Text>
							<TouchableOpacity style={styles.boxButtonThank} onPress={() => this.setModalVisible(true)}>
									<Text style={styles.txtButton}>
											Chọn địa điểm
									</Text>
							</TouchableOpacity>
							<View style={styles.triangle}></View>
					</View>
				)
			}else {
				return (
					<View style={styles.friendChat}>
							<Text style={styles.contentFriendChat}>
									Chào bạn. Bạn chưa làm bài test da. Bạn vui lòng thực hiện bài test da tại đây để được tư vấn cụ thể nhé.
							</Text>
							<TouchableOpacity style={styles.boxButtonThank} onPress={() => Actions.skinTest()}>
									<Text style={styles.txtButton}>
											Làm bài test da
									</Text>
							</TouchableOpacity>
							<View style={styles.triangle}></View>
					</View>
				)
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
														<Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Chat</Text>
												</View>
										</NavButton>
										<NavButton style={main.navSave} onPress={() => this.setState({openModal: true})} >
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
									<ScrollView style={styles.contentChat}>
										<View style={styles.clear}></View>

										<View style={styles.myChat}>
											<Text style={styles.contentMyChat}>
													Xin chào, mình muốn hỏi sản phẩm <Text style={{fontWeight: 'bold'}}>{this.props.product.name}</Text> có thể mua ở đâu vậy. 
											</Text>
										<View style={styles.triangleMy}></View>
									</View>

									{this.renderAction()}

									<View style={styles.clear}></View>
									</ScrollView>
                </View>
                <PickerItem
                  options={cities}
                  selectedOption={this.state.city}
                  onCancel={() => this.setState({modalVisible: false})}
                  onSubmit={(value) => this.onChange(value)}
                  boxDisplayStyles={styles.mainPicker}
                  modalVisible={this.state.modalVisible}
                />
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
        marginTop: 10
    },
    txtButton: {
        backgroundColor: '#FE7535',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        overflow: 'hidden',
        color: '#FFFFFF',
        fontSize: 16,
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatQAStep3);
