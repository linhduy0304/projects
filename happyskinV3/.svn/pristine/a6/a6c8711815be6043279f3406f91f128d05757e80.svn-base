import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  RefreshControl,
  InteractionManager,
  Platform
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let theme = require('../styles/Theme');
let main = require('../styles/Main');
var Spinner = require('react-native-spinkit');
var Modal = require('react-native-modalbox');

import ModalSearch from '../components/ModalSearch'
import BoxFeed from '../components/BoxFeed'
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import { Actions } from "react-native-router-flux";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as magazineActions from '../actions/magazineActions';
const actions = [
  magazineActions
];
function mapStateToProps(state) {
  return {
    magazine: state.magazine,
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

class Magazine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      page: 1,
      openModal: false
    }
  }

  componentWillMount() {
    this.props.actions.magazineRequest();
  }
  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.magazine(this.props.typePost, this.props.id);
    })
  }

  refresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.magazine(this.props.typePost, this.props.id);
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.magazine.loadMore) {
        return;
    }
    this.props.actions.magazine(this.props.typePost, this.props.id,'LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  _renderFooter() {
    if(this.props.magazine.loadMore) {
       return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 10, width: 10}} source={require('../images/load_more.gif')} />
          <Text style={{color: 'rgb(197, 172, 211)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>)
    }
    if (this.props.magazine.data.length == 0 ) {
      return (
        <View style = {main.footer}>
          <Text>Không có dữ liệu. Vui lòng thử lại!</Text>
        </View>
      )
    }else return null;
  }

  _renderHeader() {
    return (
      <View style={{paddingLeft: 15,}}>
        <Text style={styles.txtTitle}>{this.props.title}</Text>
        {
          this.props.typePost == 'video' ?
            null
          :
            <Text style={styles.txtRecent}>BÀI VIẾT GẦN ĐÂY</Text>
        }
      </View>
    )
  }

  render(){
    return (
      <View style={styles.content}>
        <View style={main.container}>
          <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
              <View>
                <Text style={main.txtBack}>Khám phá</Text>
              </View>
            </NavButton>
          </NavBar>
          {
            this.props.magazine.isFetching ?
            <View style={main.mainSpin1}>
              <Image style={main.imgLoading} source={require('../images/rolling.gif')} />
            </View>
            :
            <FlatList
              ListHeaderComponent={() => this._renderHeader()}
              ListFooterComponent={() => this._renderFooter()}
              data={this.props.magazine.data}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.refresh()}
                />
              }
              onEndReached={() => this.loadMore()}
              onEndReachedThreshold={0.2}
              renderItem={(data) => <BoxFeed data={data.item}/>}
            />
          }
        </View>
        <Modal 
          style={main.modal}
          isOpen={this.state.openModal}
          swipeToClose={true}
          position="top"
          entry="bottom"
          animationDuration={200}
          backdropColor="#000"
          onClosed={()=> this.setState({openModal: false}) }>
          <ModalSearch closeModal={() => this.setState({openModal: false})}/>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 32,
    color: 'rgb(215, 53, 84)'
  },
  txtRecent: {
    color: 'rgb(135, 80, 161)',
    marginTop: 12,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  navSave: {
    padding: 10
  },
  navSearch: {
    width: 16,
    height: 16
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Magazine);