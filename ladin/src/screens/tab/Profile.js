

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Store from '../../services/Store';
import { Actions } from 'react-native-router-flux';
import Nav from '../../components/home/Nav';
import Header from '../../components/profile/Header';
import CtIcon from '../../components/product/CtIcon';
import {profiles} from '../../config/Constant';

const Const = require('../../services/Const');
const Css = require('../../config/css');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPress(data) {
    switch(data.type) {
      case 0:
        Actions.profile()
        return;
      case 1:
        Actions.cartListAddress()
        return;
      case 2:
        Actions.listOrder()
        return;
      case 3:
        Actions.about({title: data.title, slug: 'huong-dan-mua-hang'});
        return;
      case 4:
        Actions.about({title: data.title, slug: 'huong-dan-ban-hang'});
        return;
      case 5:
        Actions.about({title: data.title, slug: 'huong-dan-rut-tien-lai-ban-hang'});
        return;
      case 6:
        Actions.about({title: data.title, slug: 'chinh-sach'});
        return;
      case 7:
        Actions.about({title: data.title, slug: 'tro-giup'});
        return;
      case 8:
        this.logout()
        return;
      case 9:
        Actions.contact();
        return;
      default: 
        return
    }
  }

  logout() {
    new Store().deleteSessionToken(Const.IS_LOGIN);
    new Store().deleteSessionToken(Const.TOKEN);
    this.props.setTab('home')
    Actions.login({type: 'reset', back: 'logout'})
  }

  render() {

    const {data} = this.state;
    const {user} = this.props.profile;
    return (
      <View style={Css.container}>
        <Nav/>
        <ScrollView>
          <Header
            name={user.name}
          >
            <Text style={{color: '#0674c1'}}>{user.email}</Text>
          </Header>
          <View style={{marginTop: 4}}>
            {
              profiles.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => this.onPress(item)} key={index} style={styles.ctItem}>
                    <CtIcon 
                      view={24}
                      icon={16}
                      source={item.icon}
                    />
                    <Text style={styles.title}>{item.title}</Text>
                    <Image style={styles.icRight} source={require('../../icons/ic_arrow_right.png')} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    color: '#333',
    marginLeft: 10,
    fontSize: 15
  },
  ctItem: {
    flexDirection: 'row',
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  icRight: {
    height: 16,
    width: 16
  },
})

import {connect} from 'react-redux';
import {setTab} from '../../actions/tab';
const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTab: (data) => dispatch(setTab(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
