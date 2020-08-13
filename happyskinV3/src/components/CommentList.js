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
  TouchableWithoutFeedback
} from "react-native";
import BoxComment from './BoxComment';
import {Actions} from "react-native-router-flux";
import {convertDateTime} from './Functions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as commonActions from '../actions/commonActions';

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

class CommentList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentWillMount() {
    // this.props.actions.commentsRequest();
  }

  componentDidMount(){
    this.props.actions.loadComments(this.props.typePost, this.props.target_id, 1);
  }

  loadMore() {
    this.props.actions.loadComments(this.props.typePost, this.props.target_id, this.state.page + 1, 'LM')
    this.setState({
      page: this.state.page + 1
    })
  }

  render(){
    return (
      <View style={{paddingLeft: 15}}>
        <View style={styles.containerJoin}>
          <Image style={styles.avatarMem} source={require('../images/avatar_happyskin.png')} />
          <Image style={[styles.avatarMem,{marginLeft: -6}]} source={require('../images/avatar_happyskin.png')} />
          <Image style={[styles.avatarMem,{marginLeft: -6}]} source={require('../images/avatar_happyskin.png')} />
          <View style={{backgroundColor: 'rgb(68, 110, 182)', paddingLeft: 17, paddingRight: 17,  height: 28, alignItems: 'center', justifyContent: 'center', marginLeft: -13, opacity: 0.5, borderRadius: 14,}}>
            <Text style={{color: '#fff'}}>+{this.props.count_like}</Text>
          </View>
          <Text style={{color: 'rgb(135, 155, 206)', marginLeft: 8}}> thành viên thích bài viết này.</Text>
        </View>
        <Text style={styles.txtCountComment}>{this.props.count_comment} BÌNH LUẬN</Text>
        { this.props.common.comments.length == 0 ?
            <View style={{alignItems: 'center', marginBottom: 10}}>
              <Text>Chưa có bình luận nào cho bài viết này.</Text> 
            </View>
            :
            <View>
              {
                this.props.common.comments.map((item, index) => {
                  return <BoxComment editComment={(comment) => this.props.editComment(comment)} reply={(comment, action) => this.props.reply(comment, action)} key={index} comment={item}/>
                })
              }
              {
                this.props.common.loadMore ?
                  this.props.common.fetchingLoadMore ?
                  <View style={{ alignItems: 'center'}}>
                    <Image style={main.imgLoading} source={require('../images/spinner.gif')} />
                  </View> 
                    :
                  <TouchableOpacity onPress={() => this.loadMore()} style={{marginRight: 15, alignItems: 'center'}}>
                    <Text style={{color: '#446EB6',}}>Xem thêm</Text>
                  </TouchableOpacity>
                : null
              }
            </View>
            
            
        }

      </View>
    );
  }
}
let main = require('../styles/Main');
const styles = StyleSheet.create({
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
});
let theme = require('../services/Theme');
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);

