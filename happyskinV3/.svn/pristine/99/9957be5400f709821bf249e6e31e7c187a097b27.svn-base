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
		FlatList
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import ModalSearch from '../components/ModalSearch'

var Modal = require('react-native-modalbox');

import ChatRecent from '../components/chat/ChatRecent'
import Chat15M from '../components/chat/Chat15M'
import StarRating from 'react-native-star-rating';
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../components/inventory/ScrollableTabBar';
import ProductSuggest from '../components/cosmeticsBag/ProductSuggest'
import Button from "react-native-button";

class ChatList extends React.Component {
    constructor(props) {
			super(props);
			this.state = {
        input: '',
				openModal: false,
				tip: true,
				bookCoach: [
					{
						avatar: 'https://statics.happyskin.vn/images/avatars/ce2e8044aafdcda1cc579cbf43860d9c/fb-820058734847233_oZqhrq.png',
						userName: 'Luis Hoang',
						description: "Lời giới thiệu của coach, không quá 4 câu do coach viết. Sẽ được hiện ở đây. Đây là nội dung viết tiếp cho đủ 4 dòng nè.",
						level: "Happy Skin's Coach",
					},
					{
						avatar: 'https://statics.happyskin.vn/images/avatars/ce2e8044aafdcda1cc579cbf43860d9c/fb-820058734847233_oZqhrq.png',
						userName: 'Luis Hoang',
						description: "Lời giới thiệu của coach, không quá 4 câu do coach viết. Sẽ được hiện ở đây. Đây là nội dung viết tiếp cho đủ 4 dòng nè.",
						level: "Chuyên Gia Trị Mụn",
					},
					{
						avatar: 'https://statics.happyskin.vn/images/avatars/ce2e8044aafdcda1cc579cbf43860d9c/fb-820058734847233_oZqhrq.png',
						userName: 'Luis Hoang',
						description: "Lời giới thiệu của coach, không quá 4 câu do coach viết. Sẽ được hiện ở đây. Đây là nội dung viết tiếp cho đủ 4 dòng nè.",
						level: "Skin Expert",
					},
				],
			}
		}
		
    render() {
			return (
				<View style={styles.container}>
          <View style={main.container}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
							<NavButton onPress={() => Actions.pop()} style={main.navButton}>
                <Image style={{height: 12, width:13}} source={require('../images/icons/ic_back_blue2.png')}/>
                <Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Home</Text>
              </NavButton>
							{/* <NavTitle style={main.navExplore}>
								Chat
							</NavTitle> */}
							<NavButton onPress={() => this.setState({openModal: true})} style={main.navSave}  >
								<Image style={{height: 16, width: 16}} source={require('../images/icons/ic_search_black.png')} />
							</NavButton>
            </NavBar>

						<View style={{flex: 1}}>
							<View style={styles.ctHeader}>
								<Text style={{color: '#fff'}}>HỎI ĐÁP VỚI HAPPYSKIN</Text>
								<Text style={{color: '#fff', marginTop: 24}}>Bạn đang băn khoăn điều gì về da? Chuyên gia của Happy Skin sẽ giải đáp thắc mắc của bạn trong vòng 48 giờ.</Text>
								<TouchableOpacity onPress={() => Actions.chatQAStep1()} style={styles.boxQuestion}>
									<Image style={{height: 22, width: 22, margin: 15}} source={require('../images/icons/ic_question.png')} />
									<Text style={styles.txtQuestion}>Gửi ngay thắc mắc của bạn</Text>
								</TouchableOpacity>
							</View>
              <View style={{flex: 1}}>
                <ScrollableTabView  renderTabBar={() => <ScrollableTabBar />}
									initialPage={0}
									tabBarBackgroundColor='white'
									tabBarInactiveTextColor='rgb(133, 142, 152)'
									tabBarActiveTextColor='rgb(51, 51, 51)'
									prerenderingSiblingsNumber={0}
									tabBarTextStyle={{fontSize: 14}}
									scrollWithoutAnimation={true}
									>
									<ChatRecent tabLabel="CHAT GẦN ĐÂY" />
                	{/* <Chat15M tabLabel="CHAT 15 PHÚT" /> */}
                </ScrollableTabView>
              </View>
            </View>
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
	boxQuestion: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 4,
		height: 48,
		marginTop: 20,
	},
	txtQuestion: {
		color: '#1F2027',
		fontSize: 16,
		fontWeight: 'bold'
	},
	ctHeader: {
		marginTop: 10,
		backgroundColor: 'rgb(135, 80, 161)',
		paddingLeft: 15,
		paddingTop: 23,
		paddingRight: 15,
		paddingBottom: 17
	},
  container: {
		flex: 1,
		backgroundColor: '#fff'
	},
});

export default ChatList;
