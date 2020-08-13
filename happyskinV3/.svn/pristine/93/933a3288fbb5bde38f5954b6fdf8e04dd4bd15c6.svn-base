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

import {Actions} from "react-native-router-flux";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as chatActions from '../../actions/chatActions';
const actions = [
  chatActions
];
function mapStateToProps(state) {
  return {
    chat: state.chat
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

class ChatRecent extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      page: 1,
    }
  }

  componentWillMount() {
    this.props.actions.chatRecentRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.chatRecent('recent');
    })
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.chatRecent('recent');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.chat.loadMore) {
        return;
    }
    this.props.actions.chatRecent('recent','LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  _renderFooter() {
    if(this.props.chat.loadMore) {
      return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 10, width: 10}} source={require('../../images/load_more.gif')} />
          <Text style={{color: 'rgb(197, 172, 211)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>)
    }
    if(this.props.chat.chatRecent) {
      if (this.props.chat.chatRecent.length == 0 ) {
        return (
          <View style = {main.footer}>
            <Text>Bạn chưa có cuộc trò chuyện nào gần đây.</Text>
          </View>
        )
      }else return null;
    }else return null
  }

  renderCoach(item) {
    switch(item.type) {
      case 1:
        return(
          <TouchableOpacity  onPress={() => Actions.chatDetail({data: item})} style={styles.ctItemCoach}>
            <TouchableOpacity onPress={() => Actions.coachProfile()}>
              <Image style={styles.avatarCoach} source={{uri: item.routine.author.avatar+ '_100x100.png'}} />
            </TouchableOpacity>
            <View style={styles.ctContent}>
              <Text style={styles.userName}>{item.routine.author.full_name}</Text>
              <Text style={styles.des}></Text>
            </View>
            <Image source={require('../../images/icons/ic_arrow_next_blue.png')} />
          </TouchableOpacity>
        )
      case 2:
        return(
          <TouchableOpacity onPress={() => Actions.chatDetail({data: item})} style={styles.itemCoachLive}>
            <View style={styles.hr}></View>
            <View style={styles.ctItemCoachLive}>
              <TouchableOpacity onPress={() => Actions.coachProfile()}>
                <Image style={styles.avatarCoach} source={{uri: item.coach.avatar+ '_100x100.png'}} />
              </TouchableOpacity>
              <View style={styles.ctContent}>
                <Text style={[styles.userName, {color: '#fff'}]}>{item.coach.full_name}</Text>
                <Text style={[styles.des, {color: '#fff'}]}>{item.coach.description}</Text>
              </View>
              <Image style={{height:10, width: 10*27/45}} source={require('../../images/icons/ic_arrow_next3.png')} />
            </View>
          </TouchableOpacity>
        )
      case 3:
        return(
          <TouchableOpacity onPress={() => Actions.chatDetail({data: item})} style={styles.itemCoach}>
            <View style={styles.hr}></View>
            <View style={[styles.ctItemCoach, {backgroundColor: 'rgb(135, 155, 206)'}]}>
              <TouchableOpacity onPress={() => Actions.coachProfile()}>
                <Image style={styles.avatarCoach} source={{uri: item.happyskin.avatar+ '.png'}} />
              </TouchableOpacity>
              <View style={styles.ctContent}>
                <Text style={[styles.userName, {color: '#fff'}]}>{item.happyskin.full_name}</Text>
                <Text style={[styles.des, {color: '#fff'}]}>{item.happyskin.description}</Text>
              </View>
              <Image style={{height:10, width: 10*27/45}} source={require('../../images/icons/ic_arrow_next3.png')} />
            </View>
          </TouchableOpacity>
        )
    }
  }

	render() {
    return (
      <View>
        {
          this.props.chat.isFetching ?
            <View style={main.mainSpinTop}>
              <Image style={main.imgLoading} source={require('../../images/spinner.gif')} />
            </View>
          :
            <FlatList 
              ListFooterComponent={() => this._renderFooter()}
              data={this.props.chat.chatRecent}
              renderItem={(data) => this.renderCoach(data.item)}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  des: {
		color: 'rgb(138, 138, 143)',
		marginTop: 3
	},
  userName: {
		fontSize: 17,
		color: 'rgb(68, 110, 182)',
		fontWeight: 'bold'
	},
  ctContent: {
		flex: 1,
		marginLeft: 20
	},
  ctItemCoachLive: {
		flexDirection: 'row',
		padding: 15,
		paddingLeft: 7,
		alignItems: 'center',
		backgroundColor: 'rgb(254, 117, 53)',
		flex: 1
	},
	ctItemCoach: {
		flexDirection: 'row',
		padding: 15,
		alignItems: 'center',
		flex: 1
	},
  itemCoachLive: {
  	backgroundColor: '#E30052',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(236, 238, 240, 0.25)',
		flexDirection: 'row',
  },
  itemCoach: {
  	backgroundColor: '#446EB6',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ECEEF0'
  },
  hr: {
  	width: 3,
  },
  avatarCoach: {
		height: 50,
		width: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#fff'
	},
});
let main = require('../../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(ChatRecent);