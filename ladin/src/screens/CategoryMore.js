

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import Nav from '../components/category/Nav';
import Css from '../config/css';
import { screen, countries, url } from '../config/Constant';
import { Actions } from 'react-native-router-flux';

const width=(screen.width-20)/3;
class CategoryMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
     data: [],
     refreshing: false
    };
  }

  componentWillMount = () => {
    this.props.homeDetail('categories')
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.home.categoriesMore) {
      this.setState({data: nextProps.home.categoriesMore})
    }
  };

  renderHeader() {
    if(this.props.home.loadDetail) {
      return <Loading size={100} source={require('../icons/loading.gif')}/>
    }else return null
  }

  renderItem(data, index) {
    return (
      <TouchableOpacity onPress={() => Actions.productCategory({title: data.name,id: data.id, load: 'category'})} key={index} style={css.ctItem}>
        <Image style={css.icon} source={{uri: url+data.image}} />
        <Text style={css.label}>{data.name}</Text>
      </TouchableOpacity>
    )
  }

  _onRefresh = async () => {
    this.setState({
      refreshing: true,
    });
    await this.props.homeDetail('categories')
    this.setState({
      refreshing: false,
    })
  }

  render() {
    const {data, refreshing} = this.state;
    return (
      <View style={[Css.container, ]}>
        <Nav 
          title={this.props.title}
        />
        <FlatList 
          data={data}
          ListHeaderComponent={() => this.renderHeader()}
          removeClippedSubviews
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 20
          }}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._onRefresh()}
            />
          }
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => this.renderItem(data.item, data.index)}
        />
      </View>
    );
  }
}

const css = StyleSheet.create({
  label: {
    textAlign: 'center',
    color: '#5d5d5d',
    fontSize: 12,
    marginTop: 10
  },
  ctItem:  {
    width,
    marginLeft: 5,
    backgroundColor: '#fff',
    marginBottom: 5,
    alignItems: 'center',
    paddingBottom:10,
    borderRadius: 5,
  },
  ct: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  icon: {
    width,
    height: width,
    borderRadius: 5,
  }
})

import {connect} from 'react-redux';
import {homeDetail, } from '../actions/home';
import Loading from '../components/Loading';

const mapStateToProps = (state) => {
  return {
    home: state.home
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    homeDetail: (action) => dispatch(homeDetail(action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMore);
