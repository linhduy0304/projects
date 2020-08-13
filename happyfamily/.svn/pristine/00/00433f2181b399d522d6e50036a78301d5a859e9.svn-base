

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import css from '../../Css'

import {chatDetail, send} from '../../actions/chat'
import { connect } from 'react-redux'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.profile.currentUser
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D'}}></View>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#C6247D'}} >
          <NavButton/>
          <NavTitle style={css.navTitle}>
          </NavTitle>
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../../images/icons/ic_back.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', right: 0, padding: 15}}>
            <Image source={require('../../images/icons/ic_edit.png')} />
          </TouchableOpacity>
        </NavBar>

        <View>
          <View style={styles.ctAvatar}>
            <Image style={styles.avatar} source={this.state.user.avatar ? {uri: this.state.user.avatar + '.png'} : require('../../images/avatar_default.png')} />
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  ctAvatar: {
    alignItems: 'center',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    send: (body) => dispatch(send(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);