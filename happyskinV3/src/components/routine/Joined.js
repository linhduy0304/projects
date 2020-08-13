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
  Image
} from 'react-native';
let main = require('../../styles/Main');
let deviceWidth = Dimensions.get('window').width;
import {Actions} from "react-native-router-flux";
import ReviewRoutine from "../ReviewRoutine";
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

class Joined extends React.Component {
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
      this.props.actions.routine('joined');
    })
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      page: 1
    });
    this.props.actions.routine('joined');
    this.setState({
      isRefreshing: false,
    })
  }

  loadMore() {
    if (!this.props.routine.loadMore) {
        return;
    }
    this.props.actions.routine('joined','LM', this.state.page + 1);
    this.setState({
        page: this.state.page + 1,
    });
  }

  _renderFooter() {
    if(this.props.routine.loadMore) {
      return (<View style={{width: deviceWidth, marginTop:20,marginBottom: 10, alignItems: 'center'}}><Text>Loading</Text></View>)
    }
    if (this.props.routine.routineJoined.length == 0 ) {
      return (
        <View style = {main.footer}>
          <Text>Lưu các liệu trình mà bạn quan tâm.</Text>
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
        <FlatList
          contentContainerStyle={styles.container}
          ListFooterComponent={() => this._renderFooter()}
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={0.2}
          data={this.props.routine.routineJoined}
          refreshControl={
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this._onRefresh()}
            />
          }
          renderItem={(data) => <ReviewRoutine routineSave={((id) => this.props.actions.routineSave(id))} fetchingLoad={this.props.routine.fetchingLoad} routineJoin={(id, image_thumb, title) => this.props.actions.routineJoin(id, image_thumb, title)} data = {data.item}/>}
          />
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
    // paddingTop: 25,
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(Joined);