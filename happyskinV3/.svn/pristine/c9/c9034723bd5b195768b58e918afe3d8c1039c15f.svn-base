import React from 'react';
import {
  StatusBar,
  View,
  Text
} from "react-native"
import {Actions} from "react-native-router-flux";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as loginActions from '../actions/loginActions';

const StoreService = require('../services/StoreService').default;

const actions = [
  loginActions
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
  componentWillMount() {
    this.props.actions.checkLogin();
  }

  componentDidMount(){
  }

  render(){
    return (
      <View>
        <StatusBar
          backgroundColor="white"
          barStyle="default"
        />
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

