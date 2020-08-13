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
var Modal = require('react-native-modalbox');

class ChatNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
                    <NavButton onPress={() => Actions.pop()} style={styles.customerNavBack}>
                        <Image style={styles.navBack} source={require('../images/icons/ic_arrow_back_blue.png')}/>
                        <View>
                            <Text style={styles.txtBack}>Message</Text>
                        </View>
                    </NavButton>
                    <NavButton style={main.navSave} onPress={() => this.refs.modal.open()} >
                        <Image style={{height: 16, width: 16}} source={require('../images/icons/ic_search_black.png')} />
                    </NavButton>
                </NavBar>
                <View style={styles.header}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.txtName}>Eddy Tran</Text>
                        <View style={styles.boxLive}>
                            <View style={styles.iconLive}></View>
                            <Text style={styles.txtLive}>{'Live'.toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={styles.boxTitle}>
                        <Text style={styles.txtTitle}>Coach in Trị Mụn dành cho da dầu.</Text>
                        <Text style={styles.txtChatTime}>Hẹn lịch chat</Text>
                    </View>
                </View>
                <View style={styles.contentChat}>
                    <ScrollView>
                        <View style={styles.clear}></View>
                        <View style={styles.friendChat}>
                            <Text style={styles.contentFriendChat}>
                                WOW.
                            </Text>
                            <View style={styles.triangle}></View>
                        </View>
                        <View style={styles.friendChat}>
                            <Text style={styles.contentFriendChat}>
                                Xin chào bạn trẻ đến từ Ba Vì, bạn có câu hỏi nào muốn gửi đến các chuyên gia.
                            </Text>
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
                        <View style={styles.myChat}>
                            <Text style={styles.contentMyChat}>
                                Các chuyên gia cho em hỏi là năm nay em 18 tuổi rồi nhưng mà vẫn chưa có người yêu, bây giờ em phải làm sao để có người yêu ạ.
                            </Text>
                            <View style={styles.triangleMy}></View>
                        </View>
                        <View style={styles.myChat}>
                            <Text style={styles.contentMyChat}>
                                :(, hix hix
                            </Text>
                            <View style={styles.triangleMy}></View>
                        </View>
                        <View style={styles.myChat}>
                            <Text style={styles.contentMyChat}>
                                Em xin cảm ơn ạ.
                            </Text>
                            <View style={styles.triangleMy}></View>
                        </View>

                        <View style={styles.friendChat}>
                            <Text style={styles.contentFriendChat}>
                                Vấn đề này rất là khó khăn, các chuyên gia không thể giúp bạn được.
                            </Text>
                            <View style={styles.triangle}></View>
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
                    <Modal style={styles.modal}
                        isOpen={false}
                        ref={"modal"}
                        swipeToClose={true}
                        position={"top"}
                        entry="top"
                        swipeToClose={false}
                        startOpen={true}
                        // onClosed={()=> this.closeModalChangePass()}
                        >
                        <View style={styles.boxHeader}>
                            <Text style={styles.txtContent}>
                                Tuấn Tú đã gửi lời hẹn lịch chat lúc 10:30 am ngày 23 tháng 10. Đợi phản hồi từ phía Eddy Tran.
                            </Text>
                            <View style={styles.boxButton}>
                                <TouchableOpacity style={styles.buttonLeft} onPress={() => this.refs.modal.close()}>
                                    <Text style={styles.txtButtonLeft}>Thôi, bỏ qua</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonRight} onPress={() => Actions.chatStatics()}>
                                    <Text style={styles.txtButtonRight}>Hẹn lịch chat khác</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
    customerNavBack: {
        padding: 15,
        paddingLeft: Platform.OS === 'ios' ? 7 : 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
        backgroundColor: '#292A39',
        flex: 1,
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
        backgroundColor: '#F4FFEA',
        borderRadius: 10,
        padding: 15,
        alignSelf: 'flex-end',
        maxWidth: deviceWidth - 70,
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
    modal: {
        backgroundColor: 'rgba(74, 74, 74, 0.55)'
    },
    boxHeader: {
        backgroundColor: '#FE7535',
        borderTopColor: '#F06423',
        borderTopWidth: 5,
        padding: 15
    },
    txtContent: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center'
    },
    boxButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15
    },
    buttonLeft: {
        padding: 10
    },
    txtButtonLeft: {
        color: '#FFFFFF'
    },
    buttonRight: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF'
    },
    txtButtonRight: {
        color: '#FE7535'
    },
});

export default ChatNotification;
