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
let main = require('../styles/Main');

import { Actions } from "react-native-router-flux";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

class ChatBox2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markedDates:{
                '2017-11-17': {marked: true},
                '2017-11-18': {marked: true, dotColor: 'red'},
                '2017-11-19': {disabled: true}
            }
        }
    }

    getDateNow() {
        var today = new Date();
        return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
                <View
                    style={styles.scrollView}
                >
                    <View style={styles.header}>
                        <View style={styles.contentHeader}>
                            <Text style={styles.txtName}>Eddy Tran</Text>
                        </View>
                        <View style={styles.boxTitle}>
                            <Text style={styles.txtTitle}>Coach in Trị Mụn dành cho da dầu.</Text>
                        </View>
                    </View>
                    <View style={styles.boxContent}>
                        <View style={styles.boxHeader}>
                            <Text style={styles.txtContent}>
                                Tuấn Tú đã gửi lời hẹn lịch chat lúc 10:30 am ngày 23 tháng 10. Đợi phản hồi từ phía Eddy Tran.
                            </Text>
                        </View>
                        <View style={styles.boxBottom}>
                            <Text style={styles.txtContentBottom}>
                                Bạn hiện đã gửi cho Eddy Tran tương đối nhiều câu hỏi. Hãy kiên nhẫn đợi Eddy Tran tìm câu trả lời đúng với bạn nhất nhé.
                            </Text>
                        </View>
                    </View>
                </View>
							</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        alignItems: 'flex-end',
    },
    txtTitle: {
        fontSize: 14,
        color: '#292A39',
    },
    boxContent: {
        backgroundColor: '#E1F8FC',
        flex: 1,
        justifyContent: 'space-between',
    },
    boxHeader: {
        backgroundColor: '#FE7535',
        borderTopColor: '#F06423',
        borderTopWidth: 5,
        alignItems: 'center',
        padding: 15
    },
    txtContent: {
        fontSize: 14,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    boxBottom: {
        backgroundColor: '#FFEEEA',
        alignItems: 'center',
        padding: 15
    },
    txtContentBottom: {
        fontSize: 15,
        color: '#B38091',
        textAlign: 'center',
    },
});

export default ChatBox2;
