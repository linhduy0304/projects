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
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

class ChatStatics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <NavBar style={{navBar: styles.navBar, statusBar: styles.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#E1F8FC'}} >
                    
                </NavBar>
                <ScrollView style={styles.contentChat}>
                    <View style={styles.clear}></View>
                    <View style={styles.friendChat}>
                        <Text style={styles.contentFriendChat} onPress={() => Actions.pop()}>
                            WOW.
                        </Text>
                        <View style={styles.triangle}></View>
                    </View>
                    <View style={styles.friendChat}>
                        <Text style={styles.contentFriendChat}>
                            Xin chào bạn trẻ đến từ Ba Vì, bạn có câu hỏi nào muốn gửi đến các chuyên gia.
                        </Text>
                        <TouchableOpacity style={styles.boxButton}>
                            <Text style={styles.button}>
                                Có, tôi có thể tham dự
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boxButton}>
                            <Text style={styles.button}>
                                Không, tôi bận vào lúc đó
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.triangle}></View>
                    </View>
                    <View style={styles.myChat}>
                        <Text style={styles.contentMyChat}>
                            Xin chào Chuyên gia, em là Lê Hiển.
                        </Text>
                        <View style={styles.triangleMy}></View>
                    </View>
                    <View style={styles.myChat}>
                        <Text style={styles.contentMyChat}>
                            Em năm nay 18 tuổi.
                        </Text>
                        <View style={styles.triangleMy}></View>
                    </View>

                    <View style={styles.friendChat}>
                        <Text style={styles.contentFriendChat}>
                            Vấn đề này rất là khó khăn, các chuyên gia không thể giúp bạn được.
                        </Text>
                        <View style={styles.triangle}></View>
                    </View>

                    <View style={styles.chatStart}>
                        <Text style={styles.txtStart}>Live chat của bạn đã bắt đầu & sẽ kết thúc vào 12:30</Text>
                    </View>

                    <View style={styles.chatEnd}>
                        <Text style={styles.txtEnd}>Đã hết thời gian Live Chat (block 15 phút).  Từ lúc này, Coach sẽ có 24h để trả lời câu hỏi của bạn. Hoặc bạn có thể book lịch Live Chat mới.</Text>
                        <Text style={styles.txtEnd}>Bạn đánh giá Eddy Tran có giúp ích được cho bạn không ? (Câu hỏi đánh giá).</Text>
                        <View style={styles.boxButtonEnd}>
                            <TouchableOpacity style={styles.boxButtonThank}>
                                <Image style={styles.icThank} source={require('../images/icons/ic_thank_blue.png')}/>
                                <Text style={styles.txtButton}>
                                    Cám ơn Eddy Tran
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.boxButtonCancel}>
                                <Text style={styles.txtButtonCancel}>
                                   Bỏ qua
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.friendChat}>
                        <Text style={styles.contentFriendChat}>
                            Hihi
                        </Text>
                        <View style={styles.triangle}></View>
                    </View>

                    <View style={styles.boxImage}>
                        <TouchableOpacity onPress={()=>Actions.chatImage()}>
                            <Image style={styles.imgThumb} source={require('../images/skintest_birthday.png')}/>
                        </TouchableOpacity>
                        <Image style={styles.icDownload} source={require('../images/icons/ic_download_brown.png')}/>
                    </View>

                    <View style={styles.boxDate}>
                        <View style={styles.hrLeft}></View>
                        <Text style={styles.txtDate}>Ngày 17 tháng 11 2017</Text>
                        <View style={styles.hrRight}></View>
                    </View>

                    <View style={styles.clear}></View>
                </ScrollView>
                <View style={styles.boxChat}>
                    <TouchableOpacity style={styles.selectImage}>
                        <Image source={require('../images/icons/ic_camera_pink.png')} style={styles.icCamera}/>
                    </TouchableOpacity>
                    <View style={styles.mainTxtChat}>
                        <TextInput 
                            placeholder = "Nhập nội dung chat"
                            underlineColorAndroid='#f5f5f5'
                            style={styles.inputChat}
                            selectionColor='#C2C5D0'
                        />
                    </View>
                </View>
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
    navBar: {
        height: 0,
        borderBottomWidth: 0
    },
    statusBar: {
      backgroundColor: '#E1F8FC',
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
        flex: 0.7
    },
    txtChatTime: {
        fontSize: 14,
        color: '#FE7535',
        flex: 0.3
    },
    contentChat: {
        backgroundColor: '#E1F8FC',
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
        backgroundColor: '#F4FFEA',
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
        borderTopColor: '#F4FFEA',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
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
    chatStart: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 50,
        backgroundColor: '#FE7535',
        padding: 15
    },
    boxIcon: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        marginTop: 6
    },
    txtStart: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 15,
        paddingLeft: 5
    },
    chatEnd: {
        marginTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#446EB6',
        marginBottom: 50
    },
    txtEnd:{
        color: '#FFFFFF',
        fontSize: 15,
        paddingTop: 20,
        paddingBottom: 20
    },
    boxButtonEnd:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxButtonThank:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        marginBottom: 15
    },
    icThank:{
        width: 11,
        height: 11,
    },
    txtButton:{
        color: '#446EB6',
        fontSize: 16,
        paddingLeft: 5
    },
    boxButtonCancel:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
    },
    txtButtonCancel: {
        color: '#FFFFFF',
        fontSize: 16
    },
    boxImage: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    imgThumb: {
        width: 240,
        height: 141,
        borderRadius: 10
    },
    icDownload: {
        width: 16,
        height: 16,
        marginLeft: 15
    },
    boxDate: {
        marginTop: 60,
        marginBottom: 60,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hrLeft: {
        height: 1,
        backgroundColor: '#D9EDF1',
        marginRight: 15,
        flex: 1
    },
    hrRight: {
        height: 1,
        backgroundColor: '#D9EDF1',
        marginLeft: 15,
        flex: 1
    },
    txtDate: {
        fontSize: 12,
        color: '#95B3B8'
    },
});

export default ChatStatics;
