

import React, { Component } from 'react';
import { View, Text, FlatList , StyleSheet, RefreshControl} from 'react-native';
import Nav from '../../components/cart/Nav';
import Button from '../../components/Button';
import ItemOrder from '../../components/profile/ItemOrder';
import ModalRate from '../../components/product/ModalRate';

const Css = require('../../config/css');

class ListOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openRate: null,
      idRate: null,
      refreshing: false,
      page: 1,
      money: '',
    };
  }

  componentWillMount = () => {
    this.props.listOrder()
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.profile.listOrder) {
      this.setState({data: nextProps.profile.listOrder})
    }
    if(nextProps.profile.money) {
      this.setState({money: nextProps.profile.money})
    }
  };

  renderHeader() {
    const {money} = this.state;
    if(this.props.profile.loading) {
      return <Loading size={100} source={require('../../icons/loading.gif')}/>
    }else {
      return (
        <View style={styles.ctHeader}>
          <View >
            <Text style={styles.txt}>Đang có:</Text>
            <Text style={styles.value}>{money.available ? renderVND(money.available) : '0'} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text>
          </View>
          <View style={{marginTop: 5}}>
            <Text style={styles.txt}>Đang chờ duyệt:</Text>
            <Text style={styles.value}>{money.pending ? renderVND(money.pending): '0'} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text>
          </View>
          {/* <View style={styles.ctLine}></View> */}
          <View style={{marginTop: 5}}>
            <Text style={styles.txt}>Đã rút:  </Text>
            <Text style={styles.value}>{money.withDraw ? renderVND(money.withDraw): '0'} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text>
          </View>
          
          <Button 
            label='RÚT TIỀN'
            backgroundColor='#c41a36'
            color='#fff'
            width={100}
            onPress={() => this.props.takeMoney()}
            marginTop={10}
            height={40}
            fontWeight='bold'
            borderRadius={20}
          />
        </View>
      )
    }
  }

  renderFooter() {
    if(this.props.profile.loadMore) {
      return <LoadMore/>
    }
    if(this.state.data.length === 0) {
      return <NoData label='Bạn chưa có đơn hàng nào' />
    }else return null
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
      page: 1
    });
    this.props.listOrder('RF');
    this.setState({
      refreshing: false,
    })
  }

  loadMore = () => {
    if(!this.props.profile.loadMore) {
        return;
    }
    this.props.listOrder('LM', this.state.page + 1);
    this.setState({
      page: this.state.page + 1,
    });
  }

  render() {
    const {refreshing} = this.state;
    return (
      <View style={Css.container}>
        <Nav
          label='DANH SÁCH ĐƠN HÀNG' 
        />
        {
          this.props.profile.loadingMoney ? 
            <Loading />
          : null
        }
        <FlatList 
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={() => this.renderFooter()}
          data={this.state.data}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._onRefresh()}
            />
          }
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.4}
          removeClippedSubviews
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => <ItemOrder openRate={(id) => this.setState({openRate: true, idRate: id})} data={data.item}/>}
        />
        <ModalRate
          open={this.state.openRate}
          idRate={this.state.idRate}
          rate={(idRate, star) => {
            var body = {
              products: [
                {
                  id: idRate,
                  rate: star
                }
              ]
            }
            this.props.rate(body);
            this.setState({openRate: null})
          }}
          onClose={() => this.setState({openRate: null, idRate: null})}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  ctLine: {
    height: 20,
    width: 1,
    backgroundColor: '#ccc',
    margin: 10
  },
  value: {
    color: '#0674c1',
    fontWeight: 'bold',
  },
  ctHeader: {
    backgroundColor: '#fff',
    // paddingLeft: 10,
    // paddingRight: 10,
    padding: 10,
  },
  txt: {
    color:'#494949',
    fontSize: 12
  },
})

import {connect} from 'react-redux';
import {listOrder, rate, takeMoney} from '../../actions/profile';
import Loading from '../../components/register/Loading';
import NoData from '../../components/NoData';
import { renderVND } from '../../components/Functions';
import LoadMore from '../../components/LoadMore';

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    listOrder: (action, page) => dispatch(listOrder(action, page)),
    rate: (body) => dispatch(rate(body)),
    takeMoney: () => dispatch(takeMoney()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
