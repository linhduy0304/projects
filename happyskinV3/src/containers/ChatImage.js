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
let deviceHeight = Dimensions.get('window').height;
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

class ChatImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <NavBar style={{navBar: styles.navBar, statusBar: styles.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
                    <NavButton onPress={() => Actions.pop()} style={styles.customerNavBack}>
                        <Image style={styles.navBack} source={require('../images/icons/ic_arrow_prev_white.png')}/>
                        <View>
                            <Text style={styles.txtBack}>Eddy Tran</Text>
                        </View>
                    </NavButton>
                    <NavButton style={main.navSave} onPress={() => Actions.chatQAStep1()} >
                        <Image style={{height: 16, width: 16}} source={require('../images/icons/ic_download_white.png')} />
                    </NavButton>
                </NavBar>
                <View style={styles.container}>
                    <Image style={{ resizeMode: 'cover',width: deviceWidth}} source={require('../images/bg_image.png')} />
                </View>
            </View>
        );
    }
}

let main = require('../styles/Main');

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#000000'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navBar: {
        backgroundColor: '#000000',
        padding: 0,
        height: 44,
        width: windowSize.width,
    },
    statusBar: {
        backgroundColor: '#000000',
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
    txtBack: {
        color: '#FFFFFF'
    },
});

export default ChatImage;
