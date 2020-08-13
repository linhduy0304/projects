import React, { Component, PureComponent } from 'react';
import { 
  View, 
  Text,
  Image,
  ScrollView,
  FlatList,
  RefreshControl
} from 'react-native';

import Nav from '../../components/category/Nav';
import SortFilter from '../../components/category/SortFilter';
import Item from '../../components/home/Item';
import ModalSort from '../../components/category/ModalSort';
import ModalFilter from '../../components/category/ModalFilter';


class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openSort: false,
      openFilter: false,
      sort: 'Mặc định',
      data : [],
      refreshing: false,
      page: 1
    };
  }

  componentWillMount = () => {
    this.props.homeDetail(this.props.action)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.home.homeDetail) {
      this.setState({data: nextProps.home.homeDetail})
    }
  };

  renderHeader() {
    if(this.props.home.loadDetail) {
      return <Loading size={100} source={require('../../icons/loading.gif')}/>
    }
    else return null
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
      page: 1
    });
    this.props.homeDetail(this.props.action, 'RF');
    this.setState({
      refreshing: false,
    })
  }


  render() {
    const {openSort, openFilter, data, sort, refreshing} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#e6eff1'}}>
        <Nav 
          title={this.props.title}
        />
        {/* <SortFilter
          openSort={() => this.setState({openSort: true})}
          openFilter={() => this.refs.filter.setState({open: true})}
         /> */}
        <FlatList 
          data={data}
          numColumns={3}
          removeClippedSubviews
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._onRefresh()}
            />
          }
          ListHeaderComponent={() => this.renderHeader()}
          contentContainerStyle={{backgroundColor: '#fff',}}
          renderItem={data => <Item type={this.props.action === 'listSale' ? 'sale' : null} data={data.item}/>}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* <ModalSort
          openSort={openSort} 
          sort={sort}
          close={() => this.setState({openSort: false})}
          setSort={data => this.setState({sort: data, openSort: false})}
        />
        <ModalFilter
          ref='filter'
          filter={data => this.filter(data)}
        /> */}
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {homeDetail, } from '../../actions/home';
import Loading from '../../components/Loading';

const mapStateToProps = (state) => {
  return {
    home: state.home
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    homeDetail: (action, load, page) => dispatch(homeDetail(action, load, page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
