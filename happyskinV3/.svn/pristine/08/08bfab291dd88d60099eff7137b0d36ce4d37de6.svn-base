import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  ActionSheetIOS
} from "react-native";
import {Actions} from "react-native-router-flux";
import BoxAction from '../components/directives/BoxAction';
import HTMLView from "react-native-htmlview";
const StoreService = require('../services/StoreService').default;
import Constant from '../services/Constant';
var moment = require('moment');
require('moment/locale/vi');
moment.locale('vi');

// import {
//     LazyloadScrollView,
//     LazyloadView,
//     LazyloadImage,
//     LazyloadListView
// } from 'react-native-lazyload';

// connect
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as communityActions from '../actions/communityActions';


let deviceWidth = Dimensions.get('window').width;
var BUTTONS = [
  'Xóa bài viết',
  'Hủy bỏ',
];
var CANCEL_INDEX = 1;

const actions = [
  communityActions
];

function mapStateToProps(state) {
  return {
    // feed: state.feed
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
class BoxLookOfTheDay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      isError: false,
      showImage: true,
    };
  }

  viewDetail(target_id, content) {
    // Actions.lookOfTheDayDetail({id: target_id, title: content});
  }

  viewProfile(user_id){
    Actions.otherProfile({id: user_id});
  }

  checkOpenModel() {
    var store = new StoreService();
    return store.getSession(Constant.HS_DATA_USER).then(res => {
      if(this.props.feed.user.id == res.id) {
        ActionSheetIOS.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX
        },
        (buttonIndex) => {
          if(buttonIndex == 0){
            this.setState({'showImage': false});
            this.props.actions.deleteFeed(this.props.feed.id);
          }
        });
      } else {
        return null;
      }
    });
  }

  detechImageThumb(){
    if(deviceWidth <= 320){
      return <Image defaultSource={require('../images/image_default.jpg')} host={this.props.listView} animation={false} source={ !this.state.isError &&  this.props.feed.image != '' ? { uri: this.props.feed.image+'_300x300.png' } : require('../images/avatar.png') } style={styles.newsThumb} onError={(e) => { this.setState({ isError: true}) } }/>
    }else{
      return <Image defaultSource={require('../images/image_default.jpg')} host={this.props.listView} animation={false} source={ !this.state.isError &&  this.props.feed.image != '' ? { uri: this.props.feed.image+'_800x600.png' } : require('../images/avatar.png') } style={styles.newsThumb} onError={(e) => { this.setState({ isError: true}) } }/>
    }
  }

  render(){
    return (
      <View>
      {(this.state.showImage) ?
        <View style = {styles.boxNewsHaveThumb}>
          <View style = {styles.mainNewsHaveThumb}>
             {
              (this.props.feed.group.name && this.props.feed.group.short_name != "OTHER") ?
              <TouchableOpacity style={styles.header} onPress= {(this.props.currentUser.skintest == this.props.feed.group.short_name || this.props.feed.group.type == 'public') ? () => null : null}>
                <Text style = {styles.titleHeader}>{this.props.feed.group.name}</Text>
              </TouchableOpacity>
              : null
            }
            <View style={styles.boxAvatar} >
              <TouchableOpacity style={styles.windowWidth} onPress = {() => this.viewProfile(this.props.feed.user.id)} style={styles.boxAvatarLeft}>
                {
                   (this.props.feed.user.avatar != '') ?
                   <Image source = {{uri : this.props.feed.user.avatar + '_100x100.png'}}
                          style={styles.avatar}
                     />
                  : <Image source={require('../images/avatar.png')}
                           style = {styles.avatar}
                    />
                }
                <View style={styles.contentDetail}>
                  <Text style={[styles.contentColor, styles.textSmall]} >
                    <Text style={[styles.bold, styles.contentColor, styles.textSmall]} > {this.props.feed.user.full_name}</Text>
                    <Text>{' đã gửi 1 '}<Text style={styles.bold}>ảnh.</Text></Text>
                  </Text>
                  {
                    // <Text style={[styles.infoNewsTime, styles.contentColor, styles.textSmall]}><TimeAgo time={this.props.feed.created_at} /></Text>  
                  }
                </View>
              </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={() => this.viewDetail(this.props.feed.id, this.props.feed.content)} delayLongPress={1000} onPressIn={() => this.setState({'pressIn': true})} onPressOut={() => this.setState({'pressIn': false})} onLongPress={() => this.checkOpenModel()}>
              <View style={styles.windowWidth}>
                <View>
                  {this.detechImageThumb()}
                </View>
                <View style = {styles.optionImage}>
                  {
                    (this.props.feed.products) ? 
                      this.props.feed.products.map(function(product, index){

                        if(product.id != ''){
                          return <Image source={{uri: product.categories.thumbnail+'_70x70.png'}} key = {index} style = {styles.iconMakeup}></Image>  
                        }else{
                          return <Image source={require('../images/default_lftd.png')} key = {index} style = {styles.iconMakeup}></Image>  
                        }
                      })
                    : null
                  }
                </View>
                <View style={styles.contentNewsHaveThumb}>
                  <Text numberOfLines={5} style={styles.contentColor}>
                    <HTMLView value={this.props.feed.short_content}/>
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <BoxAction 
            like={this.props.feed.count_like} 
            comment={this.props.feed.count_comment} 
            isLike={this.props.feed.is_like_by_current_id} 
            itemId={this.props.feed.id} 
            itemType={this.props.feed.type} 
            itemFeedType={(this.props.feed.feedtype) ? this.props.feed.feedtype : null} 
            itemTitle={this.props.feed.content} />
        </View>
        : null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxNewsHaveThumb: {
    marginTop: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 15
  },
  mainNewsHaveThumb: {
    flex: 1
  },
  newsThumb: {
    width: deviceWidth,
    height: deviceWidth,
    marginRight: 10,
    resizeMode: 'contain'
  },
  contentNewsHaveThumb: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  titleNews:{
    fontSize: 17,
    marginTop: 10,
    marginBottom: 5,
    color: '#D73554'
  },
  infoNews: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  infoNewsTime: {
  },
  contentColor: {
    color: '#333333'
  },
  header: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleHeader: {
    fontSize: 16,
    color: '#4972b8'
  },
  boxAvatar: {
    paddingLeft: 15,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxAvatarLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar :{
    width: 20,
    height: 20,
    borderRadius: 10,
  },
   contentDetail: {
    flex: 1,
    marginLeft: 6,
  },
  textSmall: {
    fontSize: 12
  },
   bold: {
    fontWeight: 'bold'
  },
  optionImage: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  iconMakeup: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain'
  },
  windowWidth: {
    width: deviceWidth
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(BoxLookOfTheDay);