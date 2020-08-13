import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  AlertIOS,
  ScrollView,
  Dimensions,
  InteractionManager,
  ListView,
  RefreshControl,
  RecyclerViewBackedScrollView,
  Alert,
  FlatList
} from "react-native";

import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import ActionButton from 'react-native-action-button';

import GoogleAnalytics from 'react-native-google-analytics-bridge';
GoogleAnalytics.setTrackerId('UA-57146563-2');
var Spinner = require('react-native-spinkit');

// import FXBlurView from 'react-native-fxblurview';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as pageGroupActions from '../actions/pageGroupActions';
import BoxFeed from '../components/BoxFeed';
let ConstantSystem = require('../services/ConstantSystem');
let deviceWidth = Dimensions.get('window').width;


const actions = [
  pageGroupActions
];

function mapStateToProps(state) {
  return {
    ...state
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

let timeout;

class PageGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      isLoadingTail: false,
      dataSource: this.props.pageGroup.post_ids,
      is_join_group: this.props.pageGroup.groups.is_join_group,
      isErrorGroup: false,
      timeoutCloseSpin: false,
      back: true,
      isRefreshing: false,
      loadFirst: false
    }
  }

  componentWillMount() {
    this.props.actions.loading();
  }

  componentDidMount(){
    timeout = setTimeout( () => {
      this.setState({
        timeoutCloseSpin: true
      })
    },ConstantSystem.TIMEOUT);
    InteractionManager.runAfterInteractions(() => {
      this.props.actions.loadDataPageGroup(this.props.group.id, page=1);
    });
    GoogleAnalytics.trackScreenView('View Page Group: '+this.props.group.name+'( '+this.props.group.short_name+' )');
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.pageGroup.post_ids !== this.props.pageGroup.post_ids){
      if(!this.state.timeoutCloseSpin && this.props.pageGroup.post_ids.length == 0){
        clearTimeout(timeout);
      }
      this.setState({
        dataSource: nextProps.pageGroup.post_ids,
        loadFirst: true
      })
    }
    if(nextProps.pageGroup.groups !== this.props.pageGroup.groups){
      this.setState({
        is_join_group: nextProps.pageGroup.groups.is_join_group,
      })
    }
  }

  _onRefresh() {
    this.props.actions.refreshDataPageGroup(this.props.group.id, page =1);
    this.setState({
      page: 1
    });
  }

  _handleEndReached() {
    if(!this.state.loadFirst){
      return;
    }
    if (this.state.isLoadingTail) {
      return;
    }
    this.setState({
      isLoadingTail: true,
      page: this.state.page + 1
    });
    this.getDataSource(this.state.page +1);
  }

  _renderFooter() {
    if (this.props.pageGroup.loadMore) {
      return (
        <View style={main.footer}>
          <Text style={main.textFooter}>
            Loading...
          </Text>
        </View>
      );
    }
    return null;
  }

  getDataSource(page) {
    this.props.actions.pageGroupLoadMore(this.props.pageGroup.groups.id , page);
    this.setState({
      isLoadingTail: false
    });
  }

  joinGroup(action, type, id) {
    if(this.state.is_join_group == 0) {
      this.setState({is_join_group: 1});
    } else {
      this.setState({is_join_group: 0});
    }
    this.props.actions.joinGroup(this.props.pageGroup.groups,action, type, id);
  }

  back(){
    if(this.state.back){
      Actions.pop();
      this.setState({
        back: false
      })
      let _this = this;
      setTimeout(function(){
        _this.setState({
          back: true
        });
      }, 2000);
    }
  }

  actions(type) {
    if(this.state.is_join_group == 1) {
      switch(type){
        case 'question':
          Actions.question({'group_id': this.props.pageGroup.groups.id});
          break;
        case 'lookOfTheDayPage': 
          Actions.lookOfTheDayPage1({'group_id': this.props.pageGroup.groups.id});
          break;
        case 'tips':
          Actions.tips({'group_id': this.props.pageGroup.groups.id});
          break;
        case 'review':
          Actions.review({'group_id': this.props.pageGroup.groups.id});
          break;
        }
    } else {
      Alert.alert(
        'Thông báo',
        'Bạn chưa tham gia nhóm, bạn có muốn tham gia không?',
        [
          {text: 'Tham gia', onPress: () => this.joinGroup('action',type,this.props.pageGroup.groups.id)},
          {text: 'Hủy', style: 'cancel'}
        ] 
      );
    }
  }

  _renderHeader() {
    return (
      <View style={{position: 'relative'}}>
        <Image source={ !this.state.isErrorGroup && this.props.group.image_thumb != '' ? { uri: this.props.group.image_thumb+'_600x400.png' } : require('../images/group_thumb.png') } style={styles.backgroundImg} onError={(e) => {this.setState({ isErrorGroup: true}) } }>
        </Image>
        <View style={styles.blurImage}></View>
        <View style= {{position: 'absolute', left:0, top: 0, right:0, bottom:0, justifyContent: 'space-around'}}>
          <TouchableOpacity style={styles.viewGroupName} >
            <Text style={styles.groupLabel} numberOfLines={2}>
              {this.props.group.name}
            </Text>
            <Text style={styles.groupShort}>
              #{this.props.group.short_name}
            </Text>
          </TouchableOpacity>
          <View style={styles.viewGroupInfo} >
            <View style={styles.colGroupInfo}>
              <Text style={styles.colNumber}>
                {this.props.group.total_members}
              </Text>
              <Text style={styles.colText}>
                Thành viên
              </Text>
            </View>
            <View style={styles.colGroupInfo}>
              <Text style={styles.colNumber}>
                {this.props.group.total_feeds}
              </Text>
              <Text style={styles.colText}>
                Bài viết
              </Text>
            </View>
            {(this.props.group.type == 'public') ?
              <View style={styles.optionGroup}>
                {(this.state.is_join_group == 1) ?
                  <TouchableOpacity style={styles.buttonUnFollow} onPress={() => this.joinGroup()}>
                    <Text style={styles.textButtonJoin}>Bỏ tham gia</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.buttonFollow} onPress={() => this.joinGroup()}>
                    <Text style={styles.textButtonJoin}>Tham gia</Text>
                  </TouchableOpacity>
                }
              </View>
              :null
            }
          </View>
        </View>
      </View>
    );
  }

  render(){
    return (
      <View style={styles.content}>
        <NavBar style={{navBar: main.navBar }} statusBar={{barStyle: 'light-content', backgroundColor: 'black'}}>
          <NavButton onPress={() => this.back()}>
            <Image style={main.navBack} source={require('../images/icons/ic_back.png')} />
          </NavButton>
          <NavTitle style={main.navTitle}>
            {'Chi tiết nhóm'}
          </NavTitle>
          <NavButton>
            <Text style={main.navEmpty}></Text>
          </NavButton>
        </NavBar>
        <View style={[styles.container, {opacity : (this.props.pageGroup.isFetching) ? 0 : 1}]}>
          <FlatList
                ListHeaderComponent={() => this._renderHeader()}
                ListFooterComponent={() => this._renderFooter()}
                data={this.state.dataSource}
                onEndReached={() => this._handleEndReached()}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this._onRefresh()}
                    />
                }
                renderItem={(data) => this.renderItemListView(data.item)}
                onEndReachedThreshold={ConstantSystem.PER_PAGE}
                disableVirtualization={ConstantSystem.FLATLIST_VITUAL}
                keyExtractor={(data, index) => index}
            />
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)" size={40} spacing={10} offsetY={25} offsetX={25} bgColor="rgba(0,0,0,0.4)" >
          <ActionButton.Item buttonColor='#446EB6' title="Hỏi" onPress={() => this.actions('question')}>
            <Image source={require('../images/icons/ic_hoi2.png')} style={{width: 22, height: 16.5}}/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#e9457a' title="Ảnh" onPress={() => this.actions('lookOfTheDayPage')}>
            <Image source={require('../images/icons/ic_image2.png')} style={{width: 22, height: 16.5}}/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#8750A1' title="Mẹo" onPress={() => this.actions('tips')}>
            <Image source={require('../images/icons/ic_meo2.png')} style={{width: 22, height: 17}}/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#FE7535' title="Review" onPress={() => this.actions('review')}>
            <Image source={require('../images/icons/ic_review2.png')} style={{width: 17, height: 17}}/>
          </ActionButton.Item>
        </ActionButton>
        <Spinner isFullScreen={true} isVisible={(this.props.pageGroup.isFetching && this.state.timeoutCloseSpin == false)} size={50} type={theme.SpinnerType} color={theme.SpinnerColor}/>
      </View>
    );
  }

  renderItemListView(id){
    return <BoxFeed 
    feed={this.props.data.posts[id]} 
    key={id} 
    currentUser={this.props.profile.currentUser} 
    listView="lazyload-group-detail"/>;
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImg: {
    width: deviceWidth,
    height: 200,
    resizeMode: 'cover',
  },
  viewGroupName: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center'
  },
  groupLabel: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  groupShort: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    paddingBottom: 5,
  },
  viewGroupInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  colGroupInfo: {
    flex: 0.33,
    alignItems: 'center'
  },
  optionGroup: {
    flex: 0.33,
    alignItems: 'center',
  },
  colNumber: {
    fontSize: 18,
    color: '#FFFFFF'
  },
  colText: {
    fontSize: 14,
    color: '#FFFFFF'
  },
  buttonFollow: {
    width: 90,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fe7535',
    borderRadius: 3,
  },
  buttonUnFollow: {
    width: 120,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  textButtonFollow: {
    color: 'white',
    fontSize: 16,
  },
  textButtonJoin: {
    color: 'white',
  },
  blurImage: {
    backgroundColor: '#000',
    position: 'absolute',
    width: deviceWidth,
    height: 200,
    top: 0,
    left: 0,
    opacity: 0.5
  }
});
let theme = require('../services/Theme');
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(PageGroup);


