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

import Carousel from 'react-native-snap-carousel';
import ModalSearch from '../components/ModalSearch'
import BoxEvent from '../components/magazine/BoxEvent'
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

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      page: 1,
      openModal: false,
      coming: [],
    }
  }

  componentWillMount() {
    this.props.actions.eventRequest();
  }
  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.event();
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.magazine != this.props.magazine) {
      this.setState({
        coming: nextProps.magazine.event.coming
      })
    }
  }

  refresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.event();
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.magazine.loadMore) {
        return;
    }
    this.props.actions.event('LM', this.state.page + 1);
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
    if (this.props.magazine.event.length == 0 ) {
      return (
        <View style = {main.footer}>
          <Text>Không có dữ liệu. Vui lòng thử lại!</Text>
        </View>
      )
    }else return null;
  }

  _renderItem ({item, index}) {
    return (
        <View style={styles.ctItemSlide}>
          <TouchableOpacity onPress={() => Actions.eventDetail({id: item.id})}>
            <Image style={{width: deviceWidth - 135, height: 133, borderRadius: 2}} source={{uri: item.image_thumb+'.png'}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.eventDetail({id: item.id})}>
            <Text style={styles.txtItemTitle}>{ item.name }</Text>
          </TouchableOpacity>
        </View>
    );
  }

  _renderHeader() {
    return (
      <View>
        <Text style={styles.txtTitle}>{this.props.title}</Text>
        <Text style={[styles.txtStatus,{marginTop: 26}]}>SẮP TỚI</Text>
        <View style={styles.ctSlide}>
          {
            this.props.magazine.event ?
              this.state.coming.length == 0 ?
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'rgb(197, 172, 211)'}}>Coming soon</Text>
              </View>
              :
                <Carousel
                  data={this.state.coming}
                  renderItem={this._renderItem.bind(this)}
                  sliderWidth={deviceWidth-15}
                  itemWidth={deviceWidth - 135}
                  inactiveSlideScale={1}
                  activeSlideAlignment={'start'}
                />
            : null
          }
          
        </View>
        <Text style={styles.txtStatus}>ĐANG DIỄN RA</Text>
        {
          this.props.magazine.event ?
            this.props.magazine.event.started.length == 0 ?
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'rgb(197, 172, 211)'}}>Coming soon</Text>
              </View>
              : 
              this.props.magazine.event.started.map((item, index) => {
                return (
                  <BoxEvent status={'started'} data={item}/>
                )
              }) 
            : null
        }
        <Text style={[styles.txtStatus, {marginTop: 30}]}>ĐÃ KẾT THÚC</Text>
      </View>
    )
  }

  render(){
    return (
      <View style={styles.content}>
        <View style={main.container}>
          <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff' }} >
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
              <View>
                <Text style={main.txtBack}>Khám phá</Text>
              </View>
            </NavButton>
            <NavButton onPress={() => this.setState({openModal: true})} style={styles.navSave}  >
              <Image style={styles.navSearch} source={require('../images/icons/ic_search_black.png')} />
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
              data={this.props.magazine.event.finished}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.refresh()}
                />
              }
              onEndReached={() => this.loadMore()}
              onEndReachedThreshold={0.2}
              renderItem={(data) => <BoxEvent data={data.item}/>}
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
  txtItemTitle: {
    fontSize: 16,
    color: 'rgb(68, 110, 182)',
    paddingBottom: 10,
    paddingTop: 10,
  },
  ctItemSlide: {
    width: deviceWidth - 135,
    marginRight: 40
  },
  ctSlide: {
    marginTop: 20,
    paddingBottom: 10,
    marginLeft: 15
  },
  txtStatus: {
    color: 'rgb(135, 80, 161)',
    marginLeft: 15,
  },
  txtTitle: {
    fontSize: 32,
    color: 'rgb(215, 53, 84)',
    marginLeft: 15,
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
export default connect(mapStateToProps, mapDispatchToProps)(Event);