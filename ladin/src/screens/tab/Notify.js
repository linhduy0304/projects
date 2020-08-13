

import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import Nav from '../../components/home/Nav';
import { Actions } from 'react-native-router-flux';

import Store from '../../services/Store';
const Const = require('../../services/Const');

const Css = require('../../config/css');

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      page: 1,
    };
  }

  componentWillMount = () => {
    this.props.loadNoti()
  };
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.notify.notify) {
      this.setState({data: nextProps.notify.notify})
    }
  };

  checkId(id) {
    for(let i of this.props.notify.arrNoti) {
      if(i === id) {
        return 1; // co trong danh sach xem roi
      }
    }
    return 0;
  }

  detail(data) {
    // var arr = this.props.notify.arrNoti;
    // if(this.checkId(data.id) === 0) {
    //   arr.unshift(data.id)
    //   this.props.setArrNoti(arr)
    //   new Store().storeSession(Const.ARR_ID_NOTI, arr);
    // }
    if(data.target === 'order') {
      this.props.notiDetail(data.id)
      Actions.orderDetail({id: data.target_id})
    }else {
      Actions.notifyDetail({data: data})
    }
  }

  renderItem(data) {
    return (
      <TouchableOpacity onPress={() => this.detail(data)} style={[styles.ctItem, {borderBottomWidth: 1 , backgroundColor: data.is_read ? '#fff' : '#f0f0f0'}]}>
        <Text style={[styles.title, {color: data.is_read ? '#333' : '#0674c1'}]}>{data.title}</Text>
        <Text style={styles.date}>{data.time} {data.date}</Text>
        <Text style={styles.content}>{data.description}</Text>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    if(this.props.notify.loading) {
      return <Loading size={50} source={require('../../icons/loading.gif')}/>
    }else return null
  }

  renderFooter() {
    if(this.props.notify.loadMore) {
      return <LoadMore/>
    }
    if(this.state.data.length === 0 && !this.props.notify.loading) {
      return <NoData label='Không có thông báo nào'/>
    }else return null
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true,
      page: 1
    });
    this.props.loadNoti('RF');
    this.setState({
      refreshing: false,
    })
  }

  loadMore = () => {
    if (!this.props.notify.loadMore) {
        return;
    }
    this.props.loadNoti('LM', this.state.page + 1);
    this.setState({
      page: this.state.page + 1,
    });
  }

  render() {
    const {data, refreshing} = this.state;
    return (
      <View style={Css.container}>
        <Nav/>
        <FlatList
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={() => this.renderFooter()}
          contentContainerStyle={{paddingTop: 5, paddingBottom: 5}}
          data={data}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._onRefresh()}
            />
          }
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.2}
          removeClippedSubviews
          keyExtractor={(item, index) => index.toString()}
          renderItem={ (data) => this.renderItem(data.item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    color: '#333',
    marginTop: 5
  },
  date: {
    marginTop: 8,
    color: '#9a9a9a'
  },
  title: {
    fontSize: 16,
  },
  ctItem: {
    padding:10,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#cdcdcd',
  },
})

import {connect} from 'react-redux';
import {loadNoti, setArrNoti, notiDetail} from '../../actions/notify';
import Loading from '../../components/Loading';
import NoData from '../../components/NoData';
import LoadMore from '../../components/LoadMore';

const mapStateToProps = (state) => {
  return {
    notify: state.notify
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadNoti: (action, page) => dispatch(loadNoti(action, page)),
    notiDetail: (id) => dispatch(notiDetail(id)),
    setArrNoti: (data) => dispatch(setArrNoti(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
