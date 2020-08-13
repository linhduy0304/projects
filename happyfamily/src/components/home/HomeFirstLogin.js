
import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
const Store = require('../../services/Store').default;
import Constant from '../../services/Constant';
import { Actions } from 'react-native-router-flux';
const window = Dimensions.get('window');
class HomeFirstLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    new Store().storeSession(Constant.HF_IS_FIRST_LOGIN, null);
    new Store().getSession(Constant.HF_IS_FIRST_LOGIN).then((is_first) => {
      })
  }

  render() {
    return(
      <View style={css.container}>
        <Image source={require('../../images/logo.png')} style={css.logo} />
        <Text style={css.txtTitle}>Để bắt đầu sử dụng app</Text>
        <Text style={css.txtContent}>Mời bạn nhập thông tin gia đình để bắt đầu</Text>
        <TouchableOpacity style={css.btnSubmit} onPress={() => this.props.onPress()}>
            <Text style={css.txtSubmit}>Nhập thông tin</Text>
        </TouchableOpacity>
        <Text style={[css.txtTitle, {marginTop: 5}]}>hoặc</Text>
        <Text style={css.txtContent}>Gửi yêu cầu tham gia vào gia đình</Text>
        <TouchableOpacity style={[css.btnSubmit, {backgroundColor: 'rgb(38, 114, 203)'}]} onPress={() => this.props.onPress({'request': true})}>
            <Text style={css.txtSubmit}>Gửi yêu cầu</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const css = StyleSheet.create({
    container:  {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    logo: {
        marginTop: 40,
        marginBottom: 40,
    },
    txtTitle: {
        color: '#046FDB',
        fontSize: 16,
        textAlign: 'center'
    },
    txtContent: {
        color: '#555555',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    btnSubmit: {
        backgroundColor: '#C6247D',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    txtSubmit: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default HomeFirstLogin;
  