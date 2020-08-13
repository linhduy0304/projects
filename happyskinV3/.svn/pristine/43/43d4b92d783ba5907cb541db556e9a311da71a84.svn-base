import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  InteractionManager,
  TextInput,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import ActionSheet from 'react-native-actionsheet';
import {Actions} from "react-native-router-flux";
import HTMLView from "react-native-htmlview";
import {convertDateTime, redirectPage, getVariable} from './Functions';
import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as commonActions from '../actions/commonActions';

var Spinner = require('react-native-spinkit');

const actions = [
  commonActions
];

function mapStateToProps(state) {
  return {
    common: state.common
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

var CANCEL_INDEX = 2;
const DESTRUCTIVE_INDEX = 3
const options = ['Chỉnh sửa','Xóa bình luận', 'Huỷ bỏ']

class BoxCommentChild extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showComment: true,
    };
    this.handlePress = this.handlePress.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
  }

  showActionSheet() {
    this.ActionSheet.show()
  }

  handlePress(i) {
    if(i == 1){
      this.setState({'showComment': false});
      this.props.actions.deleteComment(this.props.commentChild.id, this.props.commentChild.target_id);
    }
    if(i == 0) {
      this.props.editComment(this.props.commentChild)
    }
 }

  renderReply(comment) {
    
    return (
      <TouchableOpacity onPress={() => this.props.reply(comment, 'child')}  style={styles.boxReply}>
        <Image source={require('../images/icons/ic_reply.png')} style = {styles.icReply}/>
        <Text style={styles.textReply}>Trả lời</Text>
          {
            comment.comments_total > 0
            ?
              <View style={styles.countReply}>
                <Text style={styles.txtCountReply} >{comment.comments_total}</Text>
              </View>
            : null
          }
      </TouchableOpacity>
    );
  }

  openAction(comment) {
    var store = new StoreService();
    return store.getSession(Constant.HS_DATA_USER).then(res => {
      if(comment.user_data.id == res.id) {
        this.showActionSheet();
      } else {
        return null;
      }
    });
  }

  openBrowser(url){
    var res = url.substring(0,9);
    if(res== 'happyskin'){
      var id= getVariable('id', url);
      var type = getVariable('type', url);
      redirectPage(type, id);
    } else {
      Linking.openURL(url);
    }
  }

  profile(id) {
    var store = new StoreService();
    return store.getSession(Constant.HS_DATA_USER).then(res => {
      if(id == res.id) {
        Actions.profile()
      } else {
        Actions.otherProfile({id: id})
      }
    });
  }


  render(){
    return (
      <View style={{paddingLeft: 15}}>
          {
            this.state.showComment ?
              <View >
                <TouchableWithoutFeedback delayLongPress={1000} onLongPress={() => this.openAction(this.props.commentChild)} style={styles.boxUserReview}>
                  <View style={styles.boxUserReview}>
                    <TouchableOpacity onPress={() => this.profile(this.props.commentChild.user_data.id)} style={styles.boxAvatarUser}>
                      <Image source={this.props.commentChild.user_data.avatar == '' ? require('../images/avatar.png') : {uri: this.props.commentChild.user_data.avatar + '_100x100.png'}} style={styles.avatarUser} />
                    </TouchableOpacity>
                    <View style={styles.boxContentReview}>
                      <View style={styles.boxUserRating}>
                        <View style={styles.boxUserInfo}>
                          <Text onPress={() => this.profile(this.props.commentChild.user_data.id)} style={styles.txtUsernameRating}>{this.props.commentChild.user_data.full_name}</Text>
                          <Text style={styles.txtUserRole}>Skin Lover</Text>
                        </View>
                        <View>
                          <Text style={styles.txtTimeAgo}>{convertDateTime(this.props.commentChild.created_at)}</Text>
                        </View>
                      </View>
                      <View style={styles.boxContentRating}>
                        <HTMLView 
                          value={this.props.commentChild.content} style={styles.txtContent} 
                          onLinkPress={(link) => this.openBrowser(link)}/>
                      </View>
                      {
                        this.props.commentChild.images ?
                        <ScrollView horizontal={true}>
                          {
                          this.props.commentChild.images.map((image, index) => {
                            return (
                              <TouchableOpacity onPress={() => Actions.imageView({images: this.props.commentChild.images, index: index})} style={{margin: 5}} key={index}>
                                <Image key={index} source={{uri: image+ '.png'}} style={{height: 50, width: 50}} />
                              </TouchableOpacity>
                            )
                          })
                        }
                        </ScrollView>
                        
                      : null
                    }
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                {
                  this.renderReply(this.props.commentChild)
                }
                {this.props.common.comments.length < this.props.common.comments.comments_total
                  ?
                  <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <Text onPress={()=> this.loadMoreComment(this.props.id)} style={{color: '#365899', fontSize: 13}}>Xem thêm bình luận ({this.props.common.comments_total- this.props.common.comments.length})</Text>
                  </View>
                  :
                  null
                }
              </View>
            : null
          }
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  boxReply: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginRight: 15
  },
  textReply: {
    fontSize: 14,
    color: '#d73554',
  },
  icReply: {
    width: 20,
    height: 20
  },
  countReply: {
    backgroundColor: '#CCCCCC',
    padding: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 9,
    marginLeft: 5
  },
  txtCountReply: {
    color: '#FFFFFF',
    fontSize: 12
  },
  containerJoin: {
    flexDirection: 'row',
    paddingTop: 14, 
    paddingBottom: 14, 
    alignItems: 'center', 
  },
  avatarMem: {
    height: 28,
    width: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff' 
  },
  txtCountComment: {
    color: '#8750A1',
    fontSize: 14,
    marginBottom: 15
  },
  boxUserReview: {
    alignItems: "flex-start",
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 15,
    borderTopColor: '#ECEEF0',
    borderTopWidth: 1,
  },
  avatarUser: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  boxAvatarUser: {
    marginRight: 15,
  },
  boxContentReview: {
    flex: 1,
    paddingRight: 15
  },
  boxUserRating: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtUsernameRating: {
    fontSize: 14,
    color: '#446EB6',
    paddingBottom: 3,
  },
  txtUserRole: {
    color: '#879BCE',
    fontSize: 13,
  },
  txtTimeAgo: {
    fontSize: 12,
    color: '#6D6F73',
  },
  boxContentRating: {
    paddingRight: 5,
  },
  txtContent: {
    fontSize: 16,
    color: '#333333'
  },
});
let theme = require('../services/Theme');

export default connect(mapStateToProps, mapDispatchToProps)(BoxCommentChild);

