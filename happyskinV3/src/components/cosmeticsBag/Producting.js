import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
  FlatList,
  RefreshControl,
  InteractionManager
} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

let main = require('../../styles/Main');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as cosmeticsActions from '../../actions/cosmeticsActions';

const actions = [
  cosmeticsActions
];
function mapStateToProps(state) {
  return {
    cosmetics: state.cosmetics,
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

class Producting extends React.Component {
  constructor(props) {
    super()
    this.state = {
      page: 1,
      isRefreshing: false
    }
  }

  componentWillMount() {
    this.props.actions.productRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.product('producting');
    })
  }

  refresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.product('producting');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.cosmetics.loadMore) {
        return;
    }
    this.props.actions.product('producting','LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  renderProduct(data) {
    return(
      <TouchableOpacity key={data.id} onPress={() => Actions.cosmeticsDetail({id: data.product.id})} style={{flexDirection: 'row', marginTop: 16}}>
        <Image style={{width: 100, height: 100}} source={{uri: data.product.image_thumb+ '_100x100.png'}} />
        <View style={styles.ctRight}>
          <Text style={styles.title}>{data.product.name} </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.txtBegin}>Ngày bắt đầu sử dụng</Text>
            <Text style={styles.numBegin}>{data.time_start}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.txtBegin}>Hạn dùng</Text>
            <Text style={styles.numBegin}>{data.expiry_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderFooter() {
    if(this.props.cosmetics.loadMore) {
      return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 10, width: 10}} source={require('../../images/load_more.gif')} />
          <Text style={{color: 'rgb(197, 172, 211)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>)
    }
    if(this.props.cosmetics.producting){
      if (this.props.cosmetics.producting.length == 0 ) {
        return (
          <View style = {main.footer}>
            <Text>Bạn chưa có sản phẩm nào</Text>
          </View>
        )
      }else return null
    }else return null;
  }

 
  render(){
    return (
      <View style={styles.container}>
        {
        this.props.cosmetics.isFetching ?
          <View style={main.mainSpinTop}>
            <Image style={main.imgLoading} source={require('../../images/spinner.gif')} />
          </View>
          :
          <FlatList
            contentContainerStyle={styles.list}
            ListFooterComponent={() => this._renderFooter()}
            data={this.props.cosmetics.producting}
            refreshControl={
              <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => this.refresh()}
              />
            }
            onEndReached={() => this.loadMore()}
            onEndReachedThreshold={0.2}
            renderItem={(data) => this.renderProduct(data.item)}
          /> 
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30
  },
  btnCart: {
    fontSize: 16,
    color: 'rgb(215, 53, 84)'
  },
  icCart: {
    height: 19, 
    width: 22,
    marginRight: 13,
  },
  titleCoach: {
    fontSize: 17,
    color: 'rgb(41, 42, 57)',
    marginTop: 5,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
  },
  ctRight: {
    flex: 1
  },
  coachSuggest: {
    fontWeight: '500',
    color: 'rgb(68, 110, 182)'
  },
  title: {
    fontSize: 17,
    color: 'rgb(78, 118, 162)'
  },
  txtBegin: {
    flex: 1,
    fontSize: 13,
    marginTop: 3,
    color: 'rgb(133, 142, 152)'
  },
  numBegin: {
    color: 'rgb(51,51, 51)',
    marginRight: 20,
    fontSize: 13
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Producting);
