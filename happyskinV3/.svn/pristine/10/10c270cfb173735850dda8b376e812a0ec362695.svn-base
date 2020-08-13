import React from 'react';

import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as commonActions from '../../actions/commonActions';

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

class BoxAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      isLike: this.props.isLike,
      count_like: this.props.count_like,
      clickLike: true,
      typePost: this.props.typePost
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
    var count_like = this.state.isLike == 1 ? this.state.count_like -1 : this.state.count_like +1;
    this.setState({isLike: isLike, count_like: count_like});
    this.props.actions.like(this.state.id, this.state.typePost, isLike);
    var _this = this;
    setTimeout(function(){
      _this.setState({
        clickLike: true
      })
    }, 3000);
  }

  render() {
    return (
      <View style={styles.containerAction}>
        {
          this.state.isLike == 1 ?
            <TouchableOpacity onPress={() => this.like()} style={styles.boxLike}>
              <Image style={styles.icLike} source={require('../../images/icons/ic_heart_pink_small.png')}/>
              <Text style={styles.txtCount}>Đã thích</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => this.like()} style={styles.boxLike}>
              <Image style={styles.icLike} source={require('../../images/icons/ic_like_blue.png')}/>
              <Text style={styles.txtCount}>Thích</Text>
            </TouchableOpacity>
        }
        
        <TouchableOpacity onPress={() => this.props.focus()} style={styles.boxLike}>
          <Image style={styles.icComment} source={require('../../images/icons/ic_comment_blue.png')}/>
          <Text style={styles.txtCount}>Bình luận</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.openShare()} style={styles.boxLike}>
          <Image style={styles.icView} source={require('../../images/icons/ic_share_blue.png')}/>
          <Text style={styles.txtCount}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  containerAction: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50, 
    borderBottomColor: '#ECEEF0',
    borderBottomWidth: 1,
    borderTopColor: '#ECEEF0',
    borderTopWidth: 1,
  },
  boxLike: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icLike: {
    width: 16,
    height: 13
  },
  icComment: {
    width: 16,
    height: 16
  },
  icView: {
    width: 16,
    height: 14
  },
  txtCount: {
    color: '#446EB6',
    fontSize: 15,
    paddingLeft: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoxAction);
