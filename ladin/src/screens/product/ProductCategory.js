

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl
} from 'react-native';
import Nav from '../../components/category/Nav';
import Css from '../../config/css';
import Loading from '../../components/Loading';
import NoData from '../../components/NoData';
import { screen } from '../../config/Constant';
import Item from '../../components/product/Item';
import SortFilter from '../../components/category/SortFilter';
import ModalSort from '../../components/category/ModalSort';
import ModalFilter from '../../components/category/ModalFilter';

class ProductCategory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openSort: false,
      openFilter: false,
      sort: {
        label: 'Mặc định',
        value: 0
      },
      data: null,
      page: 1,
      refreshing: false
    };
  }

  filter(data) {
    var body = data;
    body['sort'] = this.state.sort.value;
    this.refs.filter.setState({open: false})
    this.props.productCategory(body, 'filter')
  }

  setSort(data) {
    const load = this.props.load;
    this.setState({sort: data, openSort: false})
    switch(load) {
      case 'category':
        var body = {
          category_id: this.props.id,
          sort: data.value,
        }
        this.props.productCategory(body,load)
        return;
      case 'madeBy':
        var body = {
          country: this.props.id,
          sort: data.value,
        }
        this.props.productCategory(body,load)
        return;
      default: //provier
        var body = {
          provider_id: this.props.id,
          sort: data.value,
        }
        this.props.productCategory(body, load)
        return;
    }
  }

  productCategory = () => {
    const load = this.props.load;
    switch(load) {
      case 'category':
        var body = {
          category_id: this.props.id,
          sort: '0',
          page: this.state.page
        }
        this.props.productCategory(body,load)
        return;
      case 'madeBy':
        var body = {
          country: this.props.id,
          sort: '0',
          page: this.state.page
        }
        this.props.productCategory(body,load)
        return;
      default: //provier
        var body = {
          provider_id: this.props.id,
          sort: '0',
          page: this.state.page
        }
        this.props.productCategory(body, load)
        return;
    }
  }

  componentWillMount = () => {
    this.productCategory()
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.product.productCategory) {
      this.setState({
        data: nextProps.product.productCategory,
      })
    }
  };
  
  renderHeader() {
    if(this.props.product.loading) {
      return <Loading size={100} source={require('../../icons/loading.gif')}/>
    }else return null
  }

  renderFooter() {
    if( this.props.product.productCategory && this.props.product.productCategory.length === 0) {
      return <NoData label='Không có sản phẩm nào'/>
    }else return null
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
      page: 1
    });
    const load = this.props.load;
    switch(load) {
      case 'category':
        var body = {
          category_id: this.props.id,
          sort: this.state.sort.value,
          page: 1
        }
        this.props.productCategory(body,load, 'RF')
        this.setState({
          refreshing: false,
        })
        return;
      case 'madeBy':
        var body = {
          country: this.props.id,
          sort: this.state.sort.value,
          page: 1
        }
        this.props.productCategory(body,load, 'RF')
        this.setState({
          refreshing: false,
        })
        return;
      case 'provider':
        var body = {
          provider_id: this.props.id,
          sort: this.state.sort.value,
          page: 1
        }
      this.props.productCategory(body, load, 'RF')
      this.setState({
        refreshing: false,
      })
      default: //provier
        this.setState({
          refreshing: false,
        })
        return;
    }
  }

  render() {
    const {openSort, refreshing, data, sort} = this.state;
    return (
      <View style={Css.ctWhite}>
        <Nav 
          title={this.props.title}
        />
        <SortFilter
          openSort={() => this.setState({openSort: true})}
          openFilter={() => this.refs.filter.setState({open: true})}
         />
        <FlatList 
          data={data}
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={() => this.renderFooter()}
          contentContainerStyle={{
            paddingBottom: 20,
            backgroundColor: '#fff'
          }}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._onRefresh()}
            />
          }
          numColumns={3}
          removeClippedSubviews
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => <Item data={data.item}/>}
        />
        <ModalSort
          openSort={openSort} 
          sort={sort}
          close={() => this.setState({openSort: false})}
          setSort={data => this.setSort(data)}
        />
        <ModalFilter
          ref='filter'
          id={this.props.id}
          load={this.props.load}
          loadAgain = {() => this.productCategory()}
          filter={data => this.filter(data)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})

import {connect} from 'react-redux';
import {productCategory} from '../../actions/product';

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    productCategory: (body, load) => dispatch(productCategory(body, load)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategory);
