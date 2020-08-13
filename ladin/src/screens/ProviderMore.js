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
import { screen, url } from '../config/Constant';
import { Actions } from 'react-native-router-flux';

const width = (screen.width-20)/3;
class ProviderMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      refreshing: false
    };
  }

  componentWillMount = () => {
    this.props.homeDetail('providers')
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.home.providersMore) {
      this.setState({data: nextProps.home.providersMore})
    }
  };

  renderHeader() {
    if(this.props.home.loadDetail) {
      return <Loading size={100} source={require('../icons/loading.gif')}/>
    }else return null
  }

  renderItem(data, index) {
    return (
      <TouchableOpacity onPress={() => Actions.productCategory({title: data.name,id: data.id, load: 'provider'})} style={styles.ctItem} key={index}>
        {/* <View style={{height: 80, width: (screen.width-20)/3,}}> */}
          <Image style={{width, height: width, borderRadius: 5}} source={{uri: url+data.thumbnail}} />
        {/* </View> */}
        <View style={styles.ctBottom}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.cate}>{data.types ? renderCate(data.types) : null}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  _onRefresh = async() => {
    this.setState({
      refreshing: true,
    });
    await this.props.homeDetail('providers')
    this.setState({
      refreshing: false,
    })
  }

  render() {
    const {data, refreshing} = this.state;
    return (
      <View style={Css.container}>
        <Nav 
          title={this.props.title}
        />
        <FlatList 
          data={data}
          ListHeaderComponent={() => this.renderHeader()}
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

const styles = StyleSheet.create({
  cate: {
    color: '#2b7fdb',
    fontSize: 12,
    textAlign: 'center'
  },
  name: {
    color: '#595959',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  ctBottom: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    padding: 5,
    flex: 1
  },
  ctItem:  {
    width: (screen.width-20)/3,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
})

import {connect} from 'react-redux';
import {homeDetail, } from '../actions/home';
import Loading from '../components/Loading';
import { renderCate } from '../components/Functions';

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

export default connect(mapStateToProps, mapDispatchToProps)(ProviderMore);