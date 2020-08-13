import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Modal = require('react-native-modalbox');
var ScrollableTabView = require('react-native-scrollable-tab-view');

import ModalSearch from '../components/ModalSearch'
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import DefaultTabBar from '../components/routine/DefaultTabBar';
import Suggest from '../components/routine/Suggest';
import RoutineOld from './RoutineOld';
import Joining from '../components/routine/Joining';
import Joined from '../components/routine/Joined';
import ModalReview from '../components/routine/ModalReview';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as homeActions from '../actions/homeActions';

const actions = [
  homeActions
];
function mapStateToProps(state) {
  return {
    home: state.home
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

class Routine extends React.Component {
  constructor(){
    super()
    this.state = {
      openModal: false,
      openModalReview: false,
      page: 0,
      routine: ''
    }
  }

  openModal(action) {
    this.setState({
      openModal: action
    })
  }
  openModalReview(routine) {
    this.setState({
      openModalReview: true,
      routine: routine
    })
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={main.container}>
          <StatusBar
            backgroundColor="white"
            barStyle="default"
          />
          <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
            <NavTitle style={main.navExplore}>
              {'Liệu trình'}
            </NavTitle>
            <NavButton onPress={() => this.openModal(true)} style={styles.navSave}  >
              <Image style={styles.navSearch} source={require('../images/icons/ic_search_black.png')} />
            </NavButton>
          </NavBar>
          <View style={[styles.container]}>
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar />}
                tabBarTextStyle={{fontSize: 12}}
                initialPage={(!this.props.home.home.total_routine || this.props.home.home.total_routine == 0 ? 2 : 0)}
                tabBarActiveTextColor={'#333333'}
                tabBarUnderlineStyle={{height: 2, backgroundColor: '#333333'}}
              >
                  <Joining openModal={(routine) => this.openModalReview(routine)} tabLabel="CỦA TÔI" />
                  <Joined tabLabel="ĐÃ LƯU"/>
                  <Suggest tabLabel="GỢI Ý"/>
            </ScrollableTabView>
          </View>
        </View>
        <Modal style={styles.modal}
          isOpen={this.state.openModalReview}
          ref={"modalReview"}
          swipeToClose={true}
          position={"center"}
          onClosed={()=> this.setState({openModalReview: false})}>
          <ModalReview data={this.state.routine} onClosed={()=> this.setState({openModalReview: false})} />
        </Modal>
        <Modal 
          style={main.modal}
          isOpen={this.state.openModal}
          swipeToClose={true}
          position="top"
          entry="bottom"
          animationDuration={200}
          backdropColor="#000"
          onClosed={()=> this.openModal(false) }>
          <ModalSearch closeModal={() => this.openModal(false)}/>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    height: deviceHeight - 200,
    width: deviceWidth - 30,
    borderRadius: 2
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  customerNav: {
    height: 44,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  customerNavBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navSave: {
    padding: 10
  },
  navSearch: {
    width: 16,
    height: 16
  },

});
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(Routine);
