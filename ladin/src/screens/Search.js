

import React, { Component } from 'react';
import { View, Text, FlatList  } from 'react-native';

import Css from '../config/css';
import Nav from '../components/search/Nav';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword:'',
      data: [],
      show: null
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.search.search) {
      this.setState({data: nextProps.search.search})
    }
  };
  
  renderHeader() {
    if(this.state.data.length === 0 && this.state.show) {
      return (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{fontSize: 13}}>Không có sản phẩm nào</Text>
        </View>
      )
      
    }else return null
  }

  search() {
    this.setState({show: true})
    var body = {
      name: this.state.keyword
    }
    this.props.actionSearch(body)
  }

  render() {
    const {keyword, data} = this.state
    return (
      <View style={[Css.container, {backgroundColor: '#fff'}]}>
        <Nav
          value={keyword}
          search={() => this.search()}
          onChangeText={text => this.setState({keyword: text})}
        />
        {
          this.props.search.loading ? 
          <Loading size={50} source={require('../icons/loading.gif')} />
          : 
          <FlatList 
            data={data}
            numColumns={3}
            removeClippedSubviews
            ListHeaderComponent={() => this.renderHeader()}
            contentContainerStyle={{backgroundColor: '#fff', borderTopWidth: 4, borderTopColor: '#e6eff1'}}
            renderItem={data => <Item data={data.item}/>}
            keyExtractor={(item, index) => index.toString()}
          />
        }
        
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {actionSearch} from '../actions/search';
import Loading from '../components/Loading';
import Item from '../components/home/Item';

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actionSearch: (body) => dispatch(actionSearch(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
