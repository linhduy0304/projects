import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import main from '../styles/Main'
import {Actions} from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as homeActions from '../actions/homeActions';

const actions = [
  homeActions,
];
function mapStateToProps(state) {
  return {
    home: state.home,
    profile: state.profile,
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

class RoutineHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          product: 'LLCS FACE',
          price: '1.035.000',
          doctor: 'BS.Nguyễn Thị Nguyệt',
          address: 'Skin Medical Spa Pico Plaza',
          created_at: '02/05/2018 14:30'
        }, {
          product: 'LLCS FACE',
          price: '1.035.000',
          doctor: 'BS.Nguyễn Thị Nguyệt',
          address: 'Skin Medical Spa Pico Plaza',
          created_at: '02/05/2018 14:30'
        },
        {
          product: 'LLCS FACE',
          price: '1.035.000',
          doctor: 'BS.Nguyễn Thị Nguyệt',
          address: 'Skin Medical Spa Pico Plaza',
          created_at: '02/05/2018 14:30'
        },
        {
          product: 'LLCS FACE',
          price: '1.035.000',
          doctor: 'BS.Nguyễn Thị Nguyệt',
          address: 'Skin Medical Spa Pico Plaza',
          created_at: '02/05/2018 14:30'
        }
      ],
    }
  }

  
  componentWillMount() {
    
    // this.props.actions.spaHistory();
    // this.props.actions.hotDeal();
}

  renderItem(data) {
    return (
      <View style={styles.ctContent}>
        <View style={styles.ctHeader}>
          <Text style={styles.txtHeader}>{data.product}</Text>
          <Text  style={[styles.txtHeader, {color: '#363636',}]}>{data.price}</Text>
        </View>
        <View style={styles.ctItem}>
          <View style={[styles.ctCirle, {backgroundColor: '#d73554'}]}/>
          <Text numberOfLines={1} style={styles.txtName}>{data.doctor}</Text>
        </View>
        <View style={styles.ctItem}>
          <View style={[styles.ctCirle, {backgroundColor: '#e87151'}]}/>
          <Text numberOfLines={1} style={styles.txtName}>{data.address}</Text>
        </View>
        <View style={styles.ctItem}>
          <View style={[styles.ctCirle, {backgroundColor: '#8c44a7'}]}/>
          <Text numberOfLines={1} style={styles.txtName}>{data.created_at}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={main.content}>
        <View style={[main.container, ]}>
          <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#d73554'}}></View>
          <NavBar style={{navBar: main.navBarRed, statusBar: main.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#d73554' }} >
            <NavButton/>
              <NavTitle>
                <Text style={{color: '#fff',fontWeight: '400' }}>Lịch sử đặt hẹn</Text>
              </NavTitle>
            <NavButton/>
            <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
              <Image style={{height: 17, width: 16}} source={require('../images/icons/ic_back_white.png')} />
            </TouchableOpacity>
            
          </NavBar>

          <View style={{flex: 1}}>
          <FlatList 
                data={this.state.data}
                contentContainerStyle={{backgroundColor: '#cdcdcd'}}
                renderItem={(data) => this.renderItem(data.item)}
              />
          {/* {
            this.props.home.spaHistory ?
              <FlatList 
                data={this.props.home.spaHistory}
                contentContainerStyle={{backgroundColor: '#cdcdcd'}}
                renderItem={(data) => this.renderItem(data.item)}
              />
              : null
          } */}
            
          </View>
        </View>
      </View>
    );
  }
}

const styles= StyleSheet.create({
  txtHeader: {
    color: 'rgb(68, 110, 182)',
    fontSize: 17,
  },
  ctHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctContent: {
    backgroundColor: '#fff',
    marginBottom: 1,
    padding: 15
  },
  txtName: {
    color: '#363636',
    fontSize: 15,
    flex: 1
  },
  ctItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  ctCirle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#cccccc',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(RoutineHistory);
