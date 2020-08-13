

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import Nav from '../../components/Nav';
import {setting, screen} from '../../config/System';
import Css from '../../config/Css';
import Switch from 'react-native-switch-pro'

class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.profile.checkPincode
    };
  }

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Nav title='Security'>
          <TouchableOpacity onPress={() => goBack()} style={Css.ctBack}>
            <Image style={Css.icBack} source={require('../../icons/ic_left.png')}/>
          </TouchableOpacity>
        </Nav>

        <View style={styles.body}>
          <View style={styles.ctItem}>
            <View>
              <Text style={styles.title}>Verify with PIN code</Text>
              <Text style={styles.sub}>Verify with PIN code</Text>
            </View>
            <Switch
              value={this.state.value}
              backgroundActive='#19353d'
              backgroundInactive='#a8b2b5'
              onAsyncPress={(callback) => {
                callback(value => this.setState({value}))
              }}
            />
          </View>
          {/* <View style={styles.ctItem}>
            <View>
              <Text style={styles.title}>Verify with Touch ID</Text>
              <Text style={styles.sub}>Verify with Touch ID</Text>
            </View>
            <Switch
              value={this.state.value}
              backgroundActive='#19353d'
              backgroundInactive='#a8b2b5'
              onAsyncPress={(callback) => {
                callback(value => this.setState({value}))
              }}
            />
          </View> */}
        </View>
        
        
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title:{
    color: '#323643',
    fontSize: 16
  },
  sub: {
    marginTop: 3,
    fontSize: 13,
    color: '#929292'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  ctItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dadde2',
    paddingTop: 10,
    paddingBottom: 10,
  },
  body: {
    flex: 1,
    padding: 15,
  }
})

import {connect} from 'react-redux';
// import {checkServer} from '../../actions/auth';

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // checkServer: () => dispatch(checkServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Security);
