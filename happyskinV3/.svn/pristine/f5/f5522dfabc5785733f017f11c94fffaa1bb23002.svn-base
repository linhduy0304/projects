import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  Platform,
  FlatList,
  RefreshControl,
  InteractionManager,
  Image,
  ScrollView
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Modal = require('react-native-modalbox');

import ModalReview from './ModalReview';
import {Actions} from "react-native-router-flux";
import JoiningItem from './JoiningItem';
import JoinedItem from './JoinedItem'
import GiftedSpinner from "../../libs/react-native-gifted-spinner/GiftedSpinner";

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

class Joining extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      page: 1,
    }
  }

  componentWillMount() {
    this.props.actions.routineRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.routine('joining');
    })
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.routine('joining');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.routine.loadMore) {
        return;
    }
    this.props.actions.routine('joining','LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  _renderFooter() {
    if(this.props.routine.loadMore) {
      return (<View style={{width: deviceWidth, marginTop:20,marginBottom: 10, alignItems: 'center'}}><Text>Loading</Text></View>)
    }
    if (this.props.routine.routineJoining.length == 0 ) {
      return (
        <View style = {main.footer}>
          <Text>Bạn chưa tham gia liệu trình nào.</Text>
        </View>
      )
    }else return null;
  }


	render() {
    return (
      <View style={styles.content}>
        {
          this.props.routine.isFetching ?
          <View style={main.mainSpinTop}>
            <Image style={main.imgLoading} source={require('../../images/spinner.gif')} />
          </View>
          :
         
          <ScrollView style={styles.content}>
            {
              this.props.routine.routineJoining.routine_joining ?
              this.props.routine.routineJoining.routine_joining.map((item, index) => {
                return <JoiningItem routine={item} key={index} />
              })
              : null
            }
            <View style={styles.boxJoined}>
              <Text style={styles.txtJoined}>LIỆU TRÌNH ĐÃ THAM GIA</Text>
            </View>
            {
              this.props.routine.routineJoining.routine_joined ?
                this.props.routine.routineJoining.routine_joined.length == 0 ? 
                  <View style={{alignItems: 'center'}}>
                    <Text>Bạn chưa tham gia liệu trình nào.</Text>
                  </View>
                :
                  this.props.routine.routineJoining.routine_joined.map((item, index) => {
                    return <JoinedItem whenClicked={(routine) => this.props.openModal(routine)} routine={item} key={index} />
                  })
              : null
            }
          </ScrollView>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
	content: {
    flex: 1,
	},
	container: {
    paddingTop: 25,
	},
  boxJoined: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  txtJoined: {
    color: '#8750A1',
    fontSize: 14,
    paddingLeft: 15
  },
});
let main = require('../../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(Joining);