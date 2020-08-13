

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

const width = (screen.width-20)/3;
class MadeByMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      refreshing: false
    };
  }

  // componentWillMount = () => {
  //   this.props.homeDetail('madeBy')
  // };

  // componentWillReceiveProps = (nextProps) => {
  //   if(nextProps.home.madeByMore) {
  //     this.setState({data: nextProps.home.madeByMore})
  //   }
  // };

  renderHeader() {
    if(this.props.home.loadDetail) {
      return <Loading size={100} source={require('../icons/loading.gif')}/>
    }else return null
  }

  renderItem(data, index) {
    return (
      <TouchableOpacity onPress={() => Actions.productCategory({title: data.name,id: data.id, load: 'madeBy'})} style={styles.ctItem} key={index}>
        <Image style={{width, height: width, borderRadius: 5}} source={{uri:`${url}${data.icon}`}} />
        <View style={styles.ctBottom}>
          <Text style={styles.name}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _onRefresh = async() => {
    this.setState({
      refreshing: true,
    });
    await this.props.getCountriesJson();
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
          data={this.props.auth.countries}
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

const styles = StyleSheet.create({
  cate: {
    color: '#2b7fdb',
  },
  name: {
    color: '#595959',
    fontWeight: 'bold',
  },
  ctBottom: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  ctItem:  {
    marginLeft: 5,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
  },
})

import {connect} from 'react-redux';
import {homeDetail, } from '../actions/home';
import {getCountriesJson, } from '../actions/auth';
import Loading from '../components/Loading';
import { renderCate } from '../components/Functions';

const mapStateToProps = (state) => {
  return {
    home: state.home,
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    homeDetail: (action) => dispatch(homeDetail(action)),
    getCountriesJson: () => dispatch(getCountriesJson())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MadeByMore);
