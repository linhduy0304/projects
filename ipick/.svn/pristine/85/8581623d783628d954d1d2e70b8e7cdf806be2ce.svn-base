import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    NetInfo,
    Platform
} from "react-native";
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import { withConnection, connectionShape } from 'react-native-connection-info';
    
const NoInternet = ({ connection }) => (
        (!connection.isConnected)  ? 
            <View style={{
                width: deviceWidth, 
                height: 40, 
                justifyContent:'center', 
                alignItems: 'center', 
                backgroundColor: 'red'}}>
                <Text style={{color: 'white'}}>Không có kết nối mạng! Vui lòng kiểm tra lại!</Text>
            </View> : null
)

NoInternet.propTypes = {
    connection: connectionShape,
};

export default withConnection(NoInternet);



 