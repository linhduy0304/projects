import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";

var windowSize = Dimensions.get('window');

import {Actions} from "react-native-router-flux";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as skintestActions from '../actions/skintestActions';

import GoogleAnalytics from 'react-native-google-analytics-bridge';
GoogleAnalytics.setTrackerId('UA-57146563-2');

const actions = [
  skintestActions
];

function mapStateToProps(state) {
  return {
    skintest: state.skintest
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

class ModalSkintestBrandProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors: ''
    };
  }

  selectFilter(value, name) {
    if(value == '' && this.props.skintest.filterCategory == ''){
      this.props.actions.closeModalBrand();
      return;
    }
    this.props.actions.selectFilter(this.props.skintype, this.props.skintest.filterCategory, value, this.props.skintest.nameCategory,name);
    
  }

  componentDidMount(){
    GoogleAnalytics.trackScreenView('Skintest Brand Product: ');
  }

  renderData() {
    if (this.props.skintest.brands) {
      return this.props.skintest.brands.map((brand, index) => {
        return <View key={brand.id}>
                  <TouchableOpacity style={styles.row} onPress={ () => this.selectFilter(brand.id, brand.name) } >
                    <Text style={this.props.skintest.filterBrand == brand.id ? styles.selectActive : {} }>{brand.name}</Text>
                  </TouchableOpacity>
                </View>
      });
    } else {
      return null;
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView>
          { this.renderData() }
        </ScrollView>
        <TouchableOpacity style={styles.rowCancel} onPress={ () => this.selectFilter('', '') } key='cancelCategory' ><Text style={{ color: '#FFF' }}>Bỏ chọn</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    width: windowSize.width,
  },
  input: {
    height: 30,
    fontSize: 15,
    borderRadius: 7,
    marginBottom: 8,
    textAlign: 'center'
  },
  colorWhite: {
    color: '#FFFFFF'
  },
  btnSumit: {
    backgroundColor: "#b92626",
    alignItems: 'center',
    width: windowSize.width,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
    marginTop: 20
  },
  inputView: {
    borderWidth: 1,
    borderColor: "#e7eaf3",
    marginTop:20,
    padding: -1
  },
  text: {
    fontSize: 18,
    color: "#000000"
  },
  errors: {
    color: 'red',
    fontSize: 15,
    marginTop: 10
  },
  row: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: windowSize.width
  },
  rowChild: {
    paddingLeft: 40
  },
  rowCancel: {
    padding: 15,
    backgroundColor: '#f5a6a6',
    width: windowSize.width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectActive: {
    color: 'red'
  }
});
let theme = require('../services/Theme');
export default connect(mapStateToProps, mapDispatchToProps)(ModalSkintestBrandProduct);