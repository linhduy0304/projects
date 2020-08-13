/**
 * Created by Mrbacdoan on 09/08/2016.
 */
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
import StarRating from '../libs/react-native-star-rating';

import BoxAction from '../components/directives/BoxAction';
import HTMLView from "react-native-htmlview";
import TimeAgo from "react-native-timeago";
const StoreService = require('../services/StoreService').default;
import Constant from '../services/Constant';
var moment = require('moment');
require('moment/locale/vi');
moment.locale('vi');
// connect
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as communityActions from '../actions/communityActions';

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
class BoxProductReview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      isError: false,
      showReview: true,
    };
  }
  viewDetail(id, title) {
    // Actions.productReview({id: id, title: title})
  }
  onStarRatingPress(rating){

  }
  viewProfile(id){
    Actions.otherProfile({id: id})
  }
  checkOpenModel() {
    var store = new StoreService();
    return store.getSession(Constant.HS_DATA_USER).then(res => {
      if(this.props.product.user.id == res.id) {
        ActionSheetIOS.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX
        },
        (buttonIndex) => {
          if(buttonIndex == 0){
            this.setState({'showReview': false});
            this.props.actions.deleteFeed(this.props.product.id);
          }
        });
      } else {
        return null;
      }
    });
  }
  render(){
    return (
      <View>
        {(this.state.showReview) ?
          <View style = {styles.boxNewsHaveThumb}>
                  { (this.props.product.group.name && this.props.product.group.short_name != "OTHER") ?
                  <TouchableOpacity style={styles.infoNews} onPress= {(this.props.currentUser.skintest == this.props.product.group.short_name || this.props.product.group.type == 'public') ? () => null : null}>
                    <Text style={styles.infoNewsGroup}>{this.props.product.group.name}</Text>
                  </TouchableOpacity>
                  : null
                  }
                  { this.props.product.user ?
                    <View style={styles.boxAvatar} >
                      <TouchableOpacity onPress = {() => this.viewProfile(this.props.product.user.id)} style={styles.boxAvatarLeft} >
                        {
                          (this.props.product.user.avatar != '') ?
                            <Image source = {{uri : this.props.product.user.avatar + '_100x100.png'}}
                                   style={styles.avatar}
                              />
                            : <Image source={require('../images/avatar.png')}
                                     style = {styles.avatar}
                            />
                        }
                        <View style={styles.contentDetail}>
                          <Text style={[styles.contentColor, styles.textSmall]} >
                            <Text style={[styles.bold, styles.contentColor, styles.textSmall]} > {this.props.product.user.full_name}</Text>
                            {' đã chia sẻ 1 '}<Text style={styles.bold}>review.</Text>
                          </Text>
                          {
                            // <Text style={[styles.infoNewsTime, styles.contentColor, styles.textSmall]}>
                            //   <TimeAgo time={this.props.product.created_at} />
                            // </Text>
                          }
                        </View>
                      </TouchableOpacity>
                    </View>
                    :
                    null
                  }
                  <TouchableWithoutFeedback onPress={() => this.viewDetail(this.props.product.id, this.props.product.title)} delayLongPress={1000} onPressIn={() => this.setState({'pressIn': true})} onPressOut={() => this.setState({'pressIn': false})} onLongPress={() => this.checkOpenModel()}>
                    <View style = {styles.mainNewsHaveThumb}>
                      <View style={styles.contentNewsHaveThumb}>
                        <Text numberOfLines={5} style={styles.contentNews}>
                          <HTMLView value={this.props.product.short_content ? this.props.product.short_content :this.props.product.title}/>
                        </Text>
                        <View style = {styles.rating}>
                          <StarRating
                            disabled={true}
                            emptyStar={require('../images/icons/ic_star.png')}
                            fullStar={require('../images/icons/ic_star_ok.png')}
                            halfStar={require('../images/icons/ic_star_half.png')}
                            maxStars={5}
                            rating={this.props.product.raty_score}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            starSize={13}
                            margin={2}
                            />
                        </View>
                        <Text style={styles.titleNews}>
                          <HTMLView value={this.props.product.title}/>
                        </Text>
                      </View>
                      <View>
                        <Image defaultSource={require('../images/image_default.jpg')} host={this.props.listView} animation={false} source={ !this.state.isError &&  this.props.product.image_thumb != '' ? { uri: this.props.product.image_thumb+'_200x200.png' } : require('../images/avatar.png') } style={styles.newsThumb} onError={(e) => { this.setState({ isError: true}) } }/>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <BoxAction like={this.props.product.count_like} comment={this.props.product.count_comment} isLike={this.props.product.is_like_by_current_id} itemId={this.props.product.id} itemType={this.props.product.type} itemFeedType={(this.props.product.feedtype) ? this.props.product.feedtype : null} itemTitle={this.props.product.title}/>
                </View>
                : null
              }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxNewsHaveThumb: {
    borderBottomColor: '#eaeaea',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 15,
  },
  mainNewsHaveThumb: {
    flexDirection: 'row',
  },
  newsThumb: {
    width: 100,
    height: 150,
    marginRight: 10,
    resizeMode: 'contain',
  },
  contentNewsHaveThumb: {
    flex: 1,
    paddingRight: 5
  },
  contentNews: {
    marginBottom: 5,
  },
  titleNews:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D73554',
    marginBottom: 5
  },
  infoNews: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  infoNewsGroup: {
    fontSize: 16,
    color: '#577dbd'
  },
  infoNewsTime: {
    fontSize: 12,
    color: '#ccc'
  },
  rating: {
    alignItems: "flex-start",
    flexDirection: 'row',
    marginBottom: 5
  },
  boxAvatar: {
    flex: 1,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxAvatarLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  contentDetail: {
    flex: 1,
    marginLeft: 6,
  },
  avatar :{
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  bold: {
    fontWeight: 'bold'
  },
  contentColor: {
    color: '#6d6f73'
  },
  textSmall: {
    fontSize: 12
  }
});
// module.exports = BoxProductReview;
export default connect(mapStateToProps, mapDispatchToProps)(BoxProductReview);
