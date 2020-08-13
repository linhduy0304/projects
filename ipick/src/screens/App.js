import React from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  NetInfo
} from "react-native"
import {Actions} from "react-native-router-flux";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as authActions from '../actions/authActions';
// import NoInternet1 from '../components/NoInternet1'

import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;

const actions = [
  authActions
];

function mapStateToProps(state) {
  return {
      //...state
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

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: null
    }
  }
  componentWillMount() {
    this.props.actions.checkLogin();
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if(connectionInfo.type == 'none') {
        this.setState({show: true})
      }
    });
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
        />
        {/* <NoInternet1 /> */}
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          {this.state.show ?
          <TouchableOpacity 
            style={{
              backgroundColor: 'rgb(0, 139, 125)',
              alignItems: 'center', 
              justifyContent: 'center', 
              width: 80, height: 40, 
              borderRadius: 4
            }} 
            onPress={() => this.props.actions.checkLogin()}>
              <Text style={{color: '#fff', fontWeight: '500'}}>Thử lại</Text>
          </TouchableOpacity>
          : null}
        </View>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

