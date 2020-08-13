import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { screen } from '../../config/Constant';
import HeaderItem from './HeaderItem';
import Item from './Item';

class ProductNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount = () => {
    this.props.getHome('listNew')
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.home.new) {
      this.setState({data: nextProps.home.new})
    }
  };

  render() {
    const {data} = this.state;
    return (
      data.length == 0 ? null : 
      <View style={css.ct}>
        <HeaderItem
          label='SẢN PHẨM MỚI'
          onPress={() => Actions.category({title: 'SẢN PHẨM MỚI', action: 'listNew'})}
          color='#333333'
        />
        {
          this.props.home.loadNew ?
            <Loading />
          : 
          <View style={css.ctList}>
            {
              data.map((item, index) => {
                return <Item data={item} key={index}/>
              })
            }
          </View>
        }
      </View>
    );
  }
}

const css = StyleSheet.create({
  ct: {
    marginTop: 10
  },
  
  label: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 12,
    marginTop: 10
  },
  ctItem: {
    width: screen.width/4,
    alignItems: 'center',
    padding: 10
  },
  ctList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  icon: {
    height: 25,
    width: 25,
  }
})

import {connect} from 'react-redux';
import {getHome, } from '../../actions/home';
import Loading from '../Loading';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    home: state.home
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getHome: (action) => dispatch(getHome(action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductNew);
