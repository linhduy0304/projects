
import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import {like} from '../../actions/post'
import { connect } from 'react-redux'

class BotAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_like: this.props.is_like,
      count_like: this.props.count_like,
      count_comment: this.props.count_comment
    }
  }

  like(is_like) {
    this.setState({
      is_like: this.state.is_like === 1 ? 0 : 1,
      count_like: this.state.is_like === 1 ? this.state.count_like - 1 : this.state.count_like + 1
    })
    this.props.like(this.props.type, this.props.id)
  }

  render() {
    return(
      <View style={css.container}>
        <View style={css.ctCount}>
          <Text style={css.like}>{this.state.count_like} lượt thích</Text>
          <Text style={css.like}>{this.state.count_comment} bình luận</Text>
        </View>
        <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F1F8FF'}}>
          {
            this.state.is_like === 1 ? 
            <TouchableOpacity onPress = {() => this.like(this.state.is_like)} style={css.ctLike}>
              <Image source={require('../../images/icons/ic_like_active.png')} />
              <Text style={[css.txtLike, {color: '#C6247D'}]}>Like</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress = {() => this.like(this.state.is_like)} style={css.ctLike}>
              <Image source={require('../../images/icons/ic_like.png')} />
              <Text style={css.txtLike}>Like</Text>
            </TouchableOpacity>
          }
          
          {/* <Image source={require('../../images/icons/ic_comment.png')} />
          <Text style={css.like}>{this.props.count_comment}</Text>
          <Image source={require('../../images/icons/ic_share.png')} /> */}
        
          <TouchableOpacity onPress={() => this.props.onPress()} style={css.ctLike}>
            <Image source={require('../../images/icons/ic_comment_1.png')} />
            <Text style={css.txtLike}>Bình luận</Text>
          </TouchableOpacity>
        </View>
        {/* <Image source={require('../../images/icons/ic_star.png')} /> */}
      </View>
    )
  }
}

const css = StyleSheet.create({
  ctCount: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  ctLike: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 15,
  },
  txtLike: {
    marginLeft: 8,
    color: '#9ea8b1'
  },
  like: {
    marginLeft: 8,
    marginRight: 15,
    fontSize: 12,
  },
  container:  {
    // flexDirection: 'row',
  },
})

const mapStateToProps = (state) => {
  return {
    post: state.post,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    like: (type, id) => dispatch(like(type, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BotAction);
  