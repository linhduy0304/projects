import React from 'react';

import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';


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

  like() {
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

  render() {
    return (
      <View style={styles.boxAction}>
        <View style={styles.boxLike}>
          <Image style={styles.icLike} source={this.props.isLike ? require('../images/icons/ic_like_small.png') : require('../images/icons/ic_like.png')}/>
          <Text style={styles.txtCount}>{this.props.like}</Text>
        </View>
        <View style={styles.boxLike}>
          <Image style={styles.icComment} source={require('../images/icons/ic_comment_small.png')}/>
          <Text style={styles.txtCount}>{this.props.comment}</Text>
        </View>
        <View style={styles.boxLike}>
          <Image style={styles.icView} source={require('../images/icons/ic_view_small.png')}/>
          <Text style={styles.txtCount}>{this.props.view}</Text>
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  boxAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxLike: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 15
  },
  icLike: {
    width: 12,
    height: 10,
  },
  icComment: {
    width: 10,
    height: 10
  },
  icView: {
    width: 12,
    height: 10
  },
  txtCount: {
    color: '#8A8A8F',
    fontSize: 12,
    marginLeft: 5
  },
});

export default BoxAction;
