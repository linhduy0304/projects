/**
 * Created by Mrbacdoan on 04/08/2016.
 */
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  AlertIOS,
  Platform,
  Dimensions
} from "react-native";
import {Actions} from "react-native-router-flux";
import Swiper from 'react-native-swiper';
import ImageZoom from 'react-native-transformable-image';
var DeviceInfo = require('react-native-device-info');

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

class ImageView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     
    };
  }


  render(){
    return (
      <View style={styles.container}>
        <StatusBar
         backgroundColor="#000"
         barStyle= 'light-content'
       />
        <Swiper 
          loop={true}
          index={this.props.index}
        >
         { this.props.images ?
           this.props.images.map((image, index) => {
             return <Image key={index} style={{ resizeMode: 'cover',width: deviceWidth, height: deviceHeight}} source={{uri: image+'.png'}} />
           })
           : null
         }
        </Swiper>
        
        <TouchableOpacity style={styles.ic_close} onPress={()=> Actions.pop()}>
          <Image style={{height: 20, width: 20}} source={require('../images/icons/ic_close_black.png')}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ic_close: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 20 :  DeviceInfo.getSystemVersion().slice(0, 1) != 4 ? 30 : 10,
    right: 10,
    padding: 10,
  },
});
module.exports = ImageView;
