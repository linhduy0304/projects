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

import Button from "react-native-button";
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

class Chat15M extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      page: 1,
      tip: true,
    }
  }

  componentWillMount() {
    this.props.actions.chatRecentRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.chatRecent('15M');
    })
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.chatRecent('15M');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.chat.loadMore) {
        return;
    }
    this.props.actions.chatRecent('15M','LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  
  _renderHeader() {
    if(this.state.tip) {
      return(
        <View style={{flexDirection: 'row',borderBottomColor: 'rgb(236, 238, 240)', borderBottomWidth: 1, padding: 15,paddingRight: 17}}>
          <Text style={{flex: 1, marginRight: 2, color: 'rgb(51, 51, 51)'}}>Bạn có thể hẹn lịch chat trực tiếp và được giải đáp mọi thắc mắc với coach trong vòng 15 phút.</Text>
          <TouchableOpacity onPress={() => this.setState({tip: false})} style={{padding: 8}}>
            <Image source={require('../../images/icons/ic_close_black_2.png')} style={{height: 8, width: 8}}/>
          </TouchableOpacity>
        </View>
      )
    }else return null
  }

  _renderFooter() {
    if(this.props.chat.loadMore) {
      return (
        <View style={{width: deviceWidth, marginTop:20,marginBottom: 10,alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image style={{height: 10, width: 10}} source={require('../../images/load_more.gif')} />
          <Text style={{color: 'rgb(197, 172, 211)', fontSize: 12, marginLeft: 8}}>Đang tải</Text>
        </View>)
    }
    if(this.props.chat.chat15M) {
      if (this.props.chat.chat15M.length == 0 ) {
        return (
          <View style = {main.footer}>
            <Text>Bạn chưa có cuộc trò chuyện nào gần đây.</Text>
          </View>
        )
      }else return null;
    }else return null
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
              ListHeaderComponent={() => this._renderHeader()}
              data={this.props.chat.chat15M}
              renderItem={(data) => (
                <View style={{flexDirection: 'row',padding: 18,flex: 1, paddingLeft: 15, paddingRight: 15, borderBottomWidth: 1, borderBottomColor: 'rgb(236, 238, 240)'}}>
                  <Image source={{uri: data.item.avatar+ '_100x100.png'}} style={styles.avatarCoach}/>
                  <View style={{flex: 1, marginLeft: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View>
                        <Text style={{fontSize: 17, color: 'rgb(68, 110, 182)'}}>{data.item.full_name}</Text>
                        <Text style={{color: 'rgb(215, 53, 84)'}}>{data.item.coach_name}</Text>
                      </View>
                      <Button 
                        onPress={()=> Actions.chatBox({data: data.item})}
                          containerStyle={{paddingLeft: 13, paddingRight: 13, backgroundColor:"rgb(254, 117, 53)", borderRadius: 20, height: 28, justifyContent: 'center', alignItems: 'center'}}
                          style={{color: '#fff', fontSize: 14}}>
                        Hẹn lịch
                      </Button>
                    </View>
                    <Text numberOfLines={4} style={{color: 'rgb(51, 51, 51)', marginTop: 6}}>{data.item.coach_description}</Text>
                  </View>
                </View>
              )}
              /> 
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatarCoach: {
		height: 50,
		width: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#fff'
	},
});
let main = require('../../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(Chat15M);