import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  Platform,
  InteractionManager
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import {Actions} from "react-native-router-flux";
var ScrollableTabView = require('react-native-scrollable-tab-view');
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import DefaultTabBar from '../components/DefaultTabBar';
import Routine from '../components/routine/Routine';
import Diary from '../components/routine/Diary';
import Introduce from '../components/routine/Introduce';
import Product from '../components/routine/Product';
import ModalUpdate from '../components/routine/ModalUpdate';
import ModalReview from '../components/routine/ModalReview';
import {getTime} from '../components/Functions';
var Modal = require('react-native-modalbox');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as routineActions from '../actions/routineActions';
const actions = [
  routineActions
];
function mapStateToProps(state) {
  return {
    routine: state.routine
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

class RoutineSubscribed extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      modalUpdate: false
    }
  }

  componentWillMount () {
    this.props.actions.rtDetailRequest()
  }

  
  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.routineDetail(this.props.id);
    })
  }

  openModalUpdate() {
    this.setState({
      modalUpdate: true
    });
  }

  closeModalUpdate() {
    this.setState({
      modalUpdate: false
    });
  }

  back() {
    if(this.props.back == 'routine') {
      Actions.tab({page: 'routine'})
    }else Actions.pop()
  }

	render() {
    const navTranslate = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [0, -75],
      extrapolate: 'clamp',
    });
    const navOpacity = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const navTranslate2 = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    const top = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [45, 0],
      extrapolate: 'clamp',
    });
    var _this=this;
    return (
      <View style={styles.content}>
        <View style={main.container}>
          <View style={{flex: 1}}>
  	        <Animated.View style={[styles.container, {marginTop: top,}]}>
              <View style={styles.boxInfo}>
                <View style={styles.boxImage}>
                  <Image style={{height: 80, width: 80, borderRadius: 8}} source={{uri: this.props.routine.routineDetail.image_thumb+ '.png'}}/>
                </View>
              	<View style={styles.boxTitle}>
              		<Text style={styles.txtTitle}>{this.props.routine.routineDetail.title}</Text>
                  <Text style={styles.txtTime}>Thời gian còn</Text>
                  <Text style={styles.txtTimeAgo}>{this.props.routine.routineDetail.time_end ? getTime(this.props.routine.routineDetail.time_end) : null}</Text>
              	</View>
              </View>
            	<ScrollableTabView
                renderTabBar={() => <DefaultTabBar />}
                page={this.state.page}
                tabBarTextStyle={{fontSize: 16}}
                tabBarActiveTextColor={'#333333'}
                tabBarUnderlineStyle={{height: 2, backgroundColor: '#333333'}}
  	          >
  	              <Routine id_routine={this.props.id} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: _this.state.scrollY}}}])} tabLabel="LIỆU TRÌNH"/>
  	              <Diary id_routine={this.props.id} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: _this.state.scrollY}}}])} tabLabel="NHẬT KÝ"/>
                  <Introduce data={this.props.routine.routineDetail} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: _this.state.scrollY}}}])} tabLabel="GIỚI THIỆU"/>
  	          </ScrollableTabView>
  	        </Animated.View>
            <Animated.View style={[styles.footer, {opacity: navOpacity, transform: [{translateY: navTranslate2}]}]}>
              {
                this.props.typeLoad == 'joined' ?
                <TouchableOpacity onPress={() => this.setState({modalReview: true})} style={[styles.button, {backgroundColor: '#FE7535'}]}>
                  <Text style={styles.txtButton}>Viết đánh giá</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => Actions.updateRoutine({id_routine: this.props.id})} style={[styles.button, {backgroundColor: '#D73554'}]}>
                  <Text style={styles.txtButton}>Cập nhật tiến trình</Text>
                </TouchableOpacity>
              }
              <TouchableOpacity onPress={() => null} style={[styles.button, {backgroundColor: '#FE7535'}]}>
                <Text style={styles.txtButton}>Hẹn lịch chát</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
              <NavButton onPress={() => this.back()} style={main.navButton}>
                <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
                <View>
                  <Text style={styles.txtBack}>Liệu trình</Text>
                </View>
              </NavButton>
            </NavBar>
          </Animated.View>
        </View>
        <Modal style={styles.modal}
          isOpen={this.state.modalReview}
          ref={"modalReview"}
          swipeToClose={true}
          position={"center"}
          onClosed={()=> this.setState({modalReview: false})}>
          <ModalReview data={this.props.data} onClosed={()=> this.setState({modalReview: false})} />
        </Modal>
      </View>
    )
  }
}

let main = require('../styles/Main');
const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	customerNavBack: {
    padding: 15,
    paddingLeft: Platform.OS === 'ios' ? 7 : 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
	navBack: {
    width: 8,
    height: 14,
    marginRight: 5
  },
  txtBack: {
    fontSize: 14,
    color: '#446EB6',
    paddingLeft: 7,
  },
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
    width: deviceWidth,
	},
  boxInfo: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 10
  },
  boxImage: {
    paddingRight: 20,
  },
  boxTitle: {
    flex: 1,
  	paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  txtTitle: {
  	fontSize: 24,
  	color: '#333333',
    paddingBottom: 15
  },
  txtTime: {
    fontSize: 14,
    color: '#929292',
    paddingBottom: 5,
  },
  txtTimeAgo: {
    fontSize: 15,
    color: '#292A39'
  },
  footer: {
    height: 64,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#F6F6F6',
    width: deviceWidth,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  button: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    borderRadius: 4,
  },
  txtButton: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  modal: {
    alignItems: 'center',
    height: deviceHeight - 200,
    width: deviceWidth - 30,
    borderRadius: 2
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(RoutineSubscribed);