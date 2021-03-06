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
let deviceHeight = Dimensions.get('window').width;
var Modal = require('react-native-modalbox');

import { Actions } from "react-native-router-flux";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as chatActions from '../actions/chatActions';
const actions = [
  chatActions
];
function mapStateToProps(state) {
  return {
    chat: state.chat
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

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
					selected: '',
					date: [this.now()],
					open: false,
					time: [
						{
							value: "1",
							label: "10:15",
						},
						{
							value: "2",
							label: "11:15",
						},
						{
							value: "3",
							label: "14:15 ",
						},
						{
							value: "4",
							label: "15:15",
						},
					],
					timeSelect: {
						value: "1",
						label: "10:15",
					},
				},
				this.onDayPress = this.onDayPress.bind(this);
		}
		
		now() {
			var today = new Date();
			var getDate =today.getDate() < 10 ? "0"+today.getDate() : today.getDate();
			var getMonth =today.getMonth() < 10 ? "0"+(1+today.getMonth()) : (1+today.getMonth());
			return getDate+' THÁNG '+getMonth;
		}

    getDateNow() {
			var today = new Date();
			var getDate =today.getDate() < 10 ? "0"+today.getDate() : today.getDate();
			var getMonth =today.getMonth() < 10 ? "0"+(1+today.getMonth()) : (1+today.getMonth());
			return today.getFullYear()+'-'+getMonth+'-'+getDate;
		}

		onDayPress(day) {
			this.setState({
				selected: day.dateString,
				date: day.day +' THÁNG '+day.month
			});
		}

		onChange(item) {
			this.setState({
				open: false,
				timeSelect: item
			})
		}

		submitSend() {
			var date = this.state.selected.split('-');
			var time = date[2]+'-'+date[1]+'-'+date[0]+' '+this.state.timeSelect.label
			this.props.actions.chatBook(this.props.data.id, time)
			// Actions.chatBox2();
		}

    render() {
        return (
            <View style={styles.content}>
                <View style={main.container}>
                    <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
											<NavButton onPress={() => Actions.pop()} style={main.navButton}>
													<Image style={styles.navBack} source={require('../images/icons/ic_back_blue2.png')}/>
													<View>
														<Text style={main.txtBack}>Chat</Text>
													</View>
											</NavButton>
                    </NavBar>
                    <ScrollView
                        style={styles.scrollView}
                        bounces={false}
                    >
                        <View style={styles.header}>
                            <View style={styles.contentHeader}>
                                <Text style={styles.txtName}>{this.props.data.full_name}</Text>
                                <View style={styles.boxLive}>
                                    <View style={styles.iconLive}></View>
                                    <Text style={styles.txtLive}>{'Live'.toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={styles.boxTitle}>
                                <Text style={styles.txtTitle}>Coach · <Text style={{fontWeight: 'bold'}}>Trị Mụn dành cho da dầu.</Text></Text>
                                <TouchableOpacity style={{borderColor: 'rgb(254, 117, 53)', borderWidth: 1, borderRadius: 20, padding: 13, paddingTop: 3, paddingBottom: 3}}>
																	<Text style={styles.txtChatTime}>Hủy</Text>
																</TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.boxContent}>
                            <Text style={styles.txtSelect}>Chọn ngày hẹn</Text>
                            <Calendar
                                style={styles.calendar}
                                current={this.state.selected}
                                markedDates={{[this.state.selected]: {selected: true}}}
                                hideArrows={false}
                                onMonthChange={(month) => {console.log('month changed', month)}}
																onDayPress={this.onDayPress}
																theme={{
																	selectedDayBackgroundColor: 'rgb(254, 117, 53)',
																}}
                            />
                            <View style={styles.boxDateSelected}>
                                <Text style={styles.txtDateSelected}>{this.state.date}</Text>
                            </View>
														<View style={styles.ctTimeBook}>
															<Text style={{color: 'rgb(194, 197, 208)', fontSize: 12}}>Thời gian bạn muốn chat</Text>
															<TouchableOpacity onPress={() => this.setState({open: true})}>
																<Text style={{fontSize: 16, color: 'rgb(41, 42, 57)', marginTop: 5}}>{this.state.timeSelect.label}</Text>
															</TouchableOpacity>
														</View>
                            <View style={styles.boxChatFree}>
                                <Text style={styles.txtChatFree}>Bạn còn 02 lượt hẹn chat miễn phí.</Text>
                            </View>
                            <View style={styles.boxSend}>
                                <TouchableOpacity style={styles.buttonSend} onPress={() => this.submitSend()}>
																	<Text style={styles.txtSend}>Gửi lịch hẹn chat trực tuyến</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
											
                    </ScrollView>
										
                </View>
								<Modal 
											style={styles.modalCoach}
											isOpen={this.state.open}
											swipeToClose={true}
											position="center"
											entry="bottom"
											animationDuration={200}
											backdropColor="#000"
											onClosed={()=> this.setState({open: false}) }>
												<View style={{alignItems: 'center'}}>
													{
														this.state.time.map((item, index) => {
															return (
																<TouchableOpacity key={index} style={styles.ctItem} onPress={() => this.onChange(item)}>
																	<Text style={styles.txtItem}>{item.label}</Text>
																</TouchableOpacity>
															)
														})
													}
												</View>
										</Modal>
            </View>
        );
    }
}

let main = require('../styles/Main');

const styles = StyleSheet.create({
	txtItem: {
		color: 'rgb(41, 42, 57)'
	},
	ctItem: {
		borderBottomColor: 'rgb(236, 238, 240)',
		borderBottomWidth: 1,
		padding: 15
	},
	modalCoach: {
    height: deviceHeight-100,
    width: deviceWidth/2,
    backgroundColor: '#fff',
    // marginTop: deviceHeight/4
  },
	ctTimeBook: {
		margin: 15
	},
	txtDateSelected: {
		fontSize: 20, 
		color: 'rgb(51, 51, 51)'
	},
	content: {
			flex: 1,
			backgroundColor: 'white'
	},
	container: {
			flex: 1
	},
	customerNavBack: {
			padding: 15,
			paddingLeft: Platform.OS === 'ios' ? 7 : 15,
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'row',
	},
	navBack: {
		width: 13,
		height: 12,
	},
	scrollView: {
			flex: 1,
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
			color: 'rgb(135, 155, 206)',
	},
	txtChatTime: {
			color: 'rgb(254, 117, 53)',
			fontWeight: 'bold'
	},
	boxContent: {
			borderTopWidth: 1,
			borderTopColor: '#ECEEF0'
	},
	txtSelect: {
			fontSize: 12,
			color: '#858E98',
			padding: 15,
	},
	calendar: {
			borderTopWidth: 1,
			paddingTop: 5,
			borderBottomWidth: 1,
			borderColor: '#ECEEF0',
			height: 350
	},
	text: {
			textAlign: 'center',
			borderColor: '#bbb',
			padding: 10,
			backgroundColor: '#eee'
	},
	boxDateSelected: {
			borderBottomWidth: 1,
			borderBottomColor: '#ECEEF0',
			alignItems: 'center',
			padding: 15,
	},
	boxChatFree: {
			borderBottomWidth: 1,
			borderBottomColor: '#ECEEF0',
	},
	txtChatFree: {
			color: '#292A39',
			fontSize: 14,
			padding: 15,
	},
	boxSend: {
			padding: 15
	},
	buttonSend: {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#FE7535',
			paddingTop: 15,
			borderRadius: 2,
			paddingBottom: 15,
	},
	txtSend: {
			fontSize: 16,
			color: '#FFFFFF',
			fontWeight: 'bold'
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
