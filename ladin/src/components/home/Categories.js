import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { screen, url } from '../../config/Constant';

const width = screen.width/4;
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount = () => {
    this.props.getHome('categories')
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.home.categories) {
      this.setState({data: nextProps.home.categories})
    }
  };

  render() {
    const {data} = this.state;
    return (
      <View>
      {
        this.props.home.loadCate ?
          <Loading />
          : 
          <View style={css.ct}>
          {
            data.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => Actions.productCategory({title: item.name,id: item.id, load: 'category'})} key={index} style={css.ctItem}>
                  <Image style={css.icon} source={{uri: url+item.image}} />
                  <Text style={css.label}>{item.name}</Text>
                </TouchableOpacity>
              )
            })
          }
          <TouchableOpacity onPress={() => Actions.categoryMore({title: 'Danh mục'})} style={css.ctItem}>
            <View style={{height: width-20, width: width-20, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{width: 30, height: 30}} source={require('../../icons/ic_more.png')} />
            </View>
            <Text style={css.label}>Mục khác</Text>
          </TouchableOpacity>
      </View>
      }
      </View>
    );
  }
}
// onPress={() => Actions.categoryDetail({id: item.id})}

const css = StyleSheet.create({
  label: {
    textAlign: 'center',
    color: '#5d5d5d',
    fontSize: 12,
    marginTop: 10
  },
  ctItem: {
    width: width,
    alignItems: 'center',
    padding: 10
  },
  ct: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  icon: {
    height: width-20,
    width: width-20,
    borderRadius: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
