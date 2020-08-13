import React from 'react';

import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import {Actions} from "react-native-router-flux";
// import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as commonActions from '../../actions/commonActions';

const actions = [
  commonActions
];

function mapStateToProps(state) {
  return {
    common: state.common,
    data: state.data
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

class BoxAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: this.props.isLike,
      like: this.props.like,
      comment: this.props.comment,
      itemId: this.props.itemId,
      itemType: this.props.itemType,
      itemFeedType: (this.props.itemFeedType) ? this.props.itemFeedType : null,
      itemTitle: this.props.itemTitle,
      clickLike: true
    };
  }
  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.common.isLikeError == true) { //truong hop loi thi tra lai state khi chua click like
      var isLike = this.state.isLike == 1 ? 0 : 1;
      var like = this.state.isLike == 1 ? this.state.like -1 : this.state.like +1;
      this.setState({isLike: isLike, like: like});
    }
    if(nextProps.data.posts[this.state.itemId].is_like_by_current_id !== this.state.isLike){
      this.setState({
        isLike: nextProps.data.posts[this.state.itemId].is_like_by_current_id,
        like: nextProps.data.posts[this.state.itemId].count_like
      });
    }
    if(nextProps.data.posts[this.state.itemId].count_comment !== this.state.comment){
      this.setState({
        comment: nextProps.data.posts[this.state.itemId].count_comment
      });
    }
  }

  likeItem() {
    if(!this.state.clickLike){
      return;
    }
    this.setState({
      clickLike: false
    })
    var isLike = this.state.isLike == 1 ? 0 : 1;
    var like = this.state.isLike == 1 ? this.state.like -1 : this.state.like +1;
    this.setState({isLike: isLike, like: like});
    this.props.actions.like(this.state.itemId, this.state.itemType, isLike);
    var _this = this;
    setTimeout(function(){
      _this.setState({
        clickLike: true
      })
    }, 3000);
  }

  viewDetail() {
    // switch (this.state.itemType) {
    //   case 'groupfeed':
    //     if (this.state.itemFeedType == 'g_question') {
    //       Actions.questionDetail({id: this.state.itemId, title: this.state.itemTitle});
    //     } else if (this.state.itemFeedType == 'g_tips') {
    //       Actions.newsDetail({id: this.state.itemId, title: this.state.itemTitle});
    //     } else if (this.state.itemFeedType == 'g_review') {
    //       Actions.productReview({id: this.state.itemId, title: this.state.itemTitle});
    //     } else if (this.state.itemFeedType == 'g_announce') {
    //       Actions.announceDetail({id: this.state.itemId, title: this.state.itemTitle});
    //     } else if (this.state.itemFeedType == 'g_image') {
    //       Actions.lookOfTheDayDetail({id: this.state.itemId, title: this.state.itemTitle});
    //     }
    //     break;
    //   case 'post':
    //     Actions.newsDetail({id: this.state.itemId, typePost: 'post'});
    //     break;
    //   case 'product':
    //     Actions.ProductDetail({id: this.state.itemId});
    //     break;
    //   case 'video':
    //     Actions.videoDetail({id: this.state.itemId, title: this.state.itemTitle});
    //     break;
    //   case 'hotdebate': 
    //     Actions.hotDebateDetail({id: this.state.itemId, title: this.state.itemTitle});
    //     break;
    // }
  }

  render() {
    return (
        <View style={styles.boxActionNews}>
          <TouchableOpacity style={styles.itemBoxActionNews} onPress={ () => this.likeItem() }>
            {
              this.state.isLike == 0 ?
              <Image source={require('../../images/icons/ic_like.png')} style={styles.imageAction}/>
              :
              <Image source={require('../../images/icons/ic_like_ok.png')} style={styles.imageAction}/>
            }
            <Text style={this.state.isLike == 1 ? styles.textLike : styles.txtAction}>{(this.state.like <= 0) ? '' : this.state.like} Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemBoxActionNews} onPress={ () => this.viewDetail() }>
            <Image source={require('../../images/icons/ic_comment_gray.png')} style={styles.imageComment}/>
            <Text style={styles.txtAction} >{(this.props.comment == 0) ? '' : this.props.comment} Bình luận</Text>
          </TouchableOpacity>
        </View>
    );
  }
};

var styles = StyleSheet.create({
  boxActionNews: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    marginTop: 10,
  },
  itemBoxActionNews: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageAction: {
    width: 16,
    height: 13,
    marginRight: 10
  },
  imageComment: {
    width: 14,
    height: 16,
    marginRight: 10
  },
  textLike: {
    color: '#e30052'
  },
  txtAction: {
    color: '#6D6F73',
    fontSize: 14
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoxAction);
