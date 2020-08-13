import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  Alert
} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

class Payment extends React.Component {
  constructor(props) {
    super()
    this.state = {
      info: 'Bạn đã kết nối 01 thẻ tới tài khoản HappySkin của mình. Bạn có thể kết nối với tài khoản ATM và tài khoản ngân hàng trong nước.'
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#000' }} >
          <NavButton onPress={() => Actions.pop()} style={main.navButton}>
            <Image style={{height: (42*8)/24, width: 8, marginRight: 10}} source={require('../images/icons/ic_arrow_back_blue.png')} />
            <Text style={{color: 'rgb(68, 110, 182)'}}>Back</Text>
          </NavButton>
        </NavBar>
        
        <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
          <Text style={styles.txtPayment}>Payment</Text>
          <Text style={styles.txtChoose}>{this.state.info}</Text>
          <View style={styles.ctPayment}>
            <Image style={{width: 35, height:25}} source={require('../images/icons/ic_visa.png')} />
            <Text style={styles.expiry}>Expiry Date</Text>
            <Text style={styles.txtDate}>05/2022</Text>
          </View>
          <Button 
            containerStyle={{backgroundColor:"rgb(254, 117, 53)", borderRadius: 2, height: 48, width: deviceWidth-30, marginTop: 37, alignItems: 'center', justifyContent: 'center'}}
            style={styles.txtAdd}
            onPress={() => Actions.paymentAdd()}
            >
            Thêm thẻ thanh toán
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  txtPayment: {
    color: 'rgb(215, 53, 84)',
    fontSize: 32,
  },
  txtChoose: {
    color: 'rgb(51, 51, 51)',
    marginTop: 8,
    marginBottom: 16
  },
  expiry: {
    color: 'rgb(138, 138, 143)',
    fontSize: 12
  },
  ctPayment: {
    borderColor: 'rgb(189, 210, 233)',
    borderWidth: 1,
    paddingTop: 25,
    paddingLeft: 35,
    paddingBottom: 35
  },
  txtAdd: {
    fontSize: 16,
    color: '#fff'
  },
  txtDate: {
    color: 'rgb(51, 51, 51)'
  },
  
});
let main = require('../styles/Main');
module.exports = Payment;
