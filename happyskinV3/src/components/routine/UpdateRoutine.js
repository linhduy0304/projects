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
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import {Actions} from "react-native-router-flux";
import UpdateProduct from "./UpdateProduct";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as routineActions from '../../actions/routineActions';
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

class UpdateRoutine extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      array_id: [],
      time: null,
    }
  }

	componentWillMount() {
    this.props.actions.productUpdateRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.productUpdate(this.props.id_routine, this.props.time);
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.routine != this.props.routine) {
      var arr =[]
      nextProps.routine.productUpdate.map((routine, index) => {
        routine.data.map((item, index) => {
          if(item.is_using == 1) {
            arr.unshift(item.product.id)
          }
        })
        // routine
      })
      this.setState({array_id: arr})
    }
  }


  addId(id, time) {
    var array_id = this.state.array_id;
    for(var i= 0; i < array_id.length ; i++ ){
      if(array_id[i] == id){
        array_id : array_id.splice(i, 1);
        this.setState({
          array_id: array_id,
          time: time
        })
        return ;
      }
    }
    array_id : array_id.unshift(id);
    this.setState({
      array_id: array_id,
      time: time
    })
  }

	render() {
    const headerHeight = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [150, 75],
      extrapolate: 'clamp',
    });
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
    return (
      <View style={styles.content}>
        <View style={main.container}>
          <ScrollView
            scrollEventThrottle={16}
            bounces={false}
            style={styles.container}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
          >
            <View style={{marginTop: 45}}>
              <Text style={styles.txtSetting}>Cập nhật tiến trình</Text>
              <View style={styles.boxContent}>
                <View style={styles.boxGradiend}></View>
                <View style={styles.boxRoutine}>
                {
                  this.props.routine.productUpdate.map((routine, index) => {
                    return (
                      <View key={index} style={styles.boxProduct}>
                        <View style={[styles.boxHeader, {backgroundColor: '#85BAFF', borderTopColor: '#72A7EF', borderTopWidth: 4}]}>
                          <View style={styles.boxIcon}>
                            <Image style={styles.icMorning} source={require('../../images/icons/ic_morning_black.png')}/>
                          </View>
                          <View style={styles.boxLabel}>
                            <Text style={styles.txtLabel}>{routine.lable.toUpperCase()}</Text>
                            <Image style={styles.icArrow} source={require('../../images/icons/ic_arrow_down_black.png')}/>
                          </View>
                        </View>
                        {
                          routine.data.map((product, index) => {
                            return (
                              <UpdateProduct time={this.props.time ? this.props.time : null} addId={(id, time) => this.addId(id, time)} product={product} key={index} />
                            )
                          })
                        }
                      </View>
                    ) })
                }
                </View>
              </View>
            </View>
            
          </ScrollView>
          {
             this.props.routine.isFetching ?
             <View style={main.mainSpin1}>
               <Image style={main.imgLoading} source={require('../../images/rolling.gif')} />
             </View>
           : null
          }
         
        <Animated.View style={[styles.buttonScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
          {
            this.props.routine.fetchingLoad ?
              <View style={{alignItems: 'center',justifyContent: 'center', backgroundColor: '#F6F6F6',flex: 1}}>
                <Image style={{width: 75, height: 75,}} source={require('../../images/spinner.gif')} />
              </View>
              :
              <View style={styles.ctButton}>
                <TouchableOpacity onPress={() => this.props.actions.routineUpdate(this.props.id_routine, this.state.array_id, this.state.time)} style={[styles.button, {backgroundColor: '#D73554'}]}>
                  <Text style={styles.txtButton}>Lưu tiến trình</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>Actions.pop()} style={[styles.button, {backgroundColor: '#FE7535'}]}>
                  <Text style={styles.txtButton}>Bỏ qua</Text>
                </TouchableOpacity>
              </View>
          }
          
        </Animated.View>

        <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
          <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back_blue2.png')}/>
              <View>
                <Text style={main.txtBack}>Quay lại</Text>
              </View>
            </NavButton>
          </NavBar>
        </Animated.View>
        </View>
      </View>
    )
  }
}
let main = require('../../styles/Main');
const styles = StyleSheet.create({
  buttonScroll: {
    height: 64,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: deviceWidth,
  },
  ctButton: {
    flex: 1, 
    paddingLeft: 16,
    paddingRight: 16, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: '#F6F6F6',
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
  txtSetting: {
    color: 'rgb(215, 53, 84)',
    fontSize: 32,
    marginLeft: 15,
    marginBottom: 5,
  },
	content: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	container: {
		flex: 1,
	},
	boxContent: {
		alignItems: "flex-start",
    flexDirection: 'row',
    backgroundColor: '#85BAFF',
	},
	boxGradiend: {
		width: 8,
	},
	boxRoutine: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	boxProduct: {
		borderTopWidth: 1,
		borderTopColor: '#ECEEF0',
		borderBottomWidth: 4,
		borderBottomColor: '#ECEEF0',
	},
	boxHeader: {
		alignItems: "center",
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
	},
	boxIcon: {
		width: 100,
		alignItems: 'center',
		justifyContent: 'center'
	},
	icMorning: {
		width: 21,
		height: 18
	},
	boxLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		alignItems: 'center',
		paddingLeft: 5,
		paddingRight: 5
	},
	txtLabel: {
		color: '#1F2027',
		fontSize: 14
	},
	icArrow: {
		width: 10,
		height: 6,
		marginRight: 15,
	},
	icNight: {
		width: 20,
		height: 18
	},
	icStar: {
		width: 20,
		height: 21
	},
});

export default connect(mapStateToProps, mapDispatchToProps) (UpdateRoutine);