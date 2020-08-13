

import React from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';

const Store = require('../services/Store').default;
import Const from '../services/Const';
import {Actions} from 'react-native-router-flux'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
    new Store().getSession(Const.HS_IS_LOGIN).then((is_login) => {
      console.log(is_login)
      if(is_login) {
        new Store().getSession(Const.HS_HEADER).then(headers => {
          this.props.dataUser(headers)
        })
        // Actions.home()
      }else {
        Actions.login({type: 'reset'})
      }
    })
  }

  render() {
    return (
      <View>

      </View>
    )
  }
}

import {connect} from 'react-redux';
import {dataUser} from '../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dataUser: (hdeadr) => dispatch(dataUser(hdeadr))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);