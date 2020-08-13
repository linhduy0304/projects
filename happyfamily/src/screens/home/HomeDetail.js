

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  Animated,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

const window = Dimensions.get('window');

import {Actions} from 'react-native-router-flux'
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import css from '../../Css'
import Loading from '../../components/Loading';
import NoData from '../../components/NoData';
import {renderTime} from '../../components/Functions'
import Swiper from 'react-native-swiper';
import Button from '../../components/Button';

import {loadComment, sendComment} from '../../actions/post'
import { connect } from 'react-redux'
import Comments from '../../components/Comments';
import BoxComment from '../../components/BoxComment';
import SimpleToast from 'react-native-simple-toast';

class HomeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      comment: '',
      scrollY: new Animated.Value(0),
      page: 1,
    }
  }

  componentWillMount() {
    this.props.loadComment(this.props.data.id)
  } 
  
  loadMoreComment() {
    this.props.loadComment(this.props.data.id, 'LM', this.state.page +1);
    this.setState({page: this.state.page + 1})
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.post.commentSuccess) {
      this.setState({
        comment: ''
      })
    }
  }

  sendComment(comment) {
    var body = {
      type: 'feed',
      content: comment,
      target_id: this.props.data.id,
    }
    this.props.sendComment(body)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D'}}></View>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#C6247D'}} >
          <NavButton/>
          {/* <NavTitle style={css.navTitle}>
            <Text style={css.txtTitle}>{this.props.title}</Text>
          </NavTitle> */}
          <NavButton/>
          <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', left: 0, padding: 15}}>
            <Image source={require('../../images/icons/ic_back.png')} />
          </TouchableOpacity>
        </NavBar>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0}  style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.ctHeader}>
              <Image style={styles.avatar} source={this.props.data.user.avatar ? {uri: this.props.data.user.avatar+'.png'} : require('../../images/avatar_default.png')} />
              <View style={styles.ctName}>
                <Text style={styles.fullName}>{this.props.data.user.full_name}<Text style={styles.des}> {this.props.data.des}</Text></Text>
                <Text style={styles.time}>{renderTime(this.props.data.created_at)}</Text>
              </View>
            </View>
            {
              this.props.data.type === 'image' ?
                <View>
                  <Text style={styles.content}>{this.props.data.content}</Text>
                  <View style={{marginTop: 15, height: 200}}>
                    <Swiper 
                        style={{height: (window.width-30)*170/300}}
                        loop={true}
                        paginationStyle={{height: 30, top: 0, right: 25, justifyContent: 'flex-end'}}
                        dot={<View style={{backgroundColor:'rgba(255,255,255,0.5)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                        activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                        >
                      {
                        this.props.data.images.map((item, index) => {
                          return (
                            <View style={Platform.OS == 'android' ? { height: 200, width: window.width,backgroundColor: '#000'} : {backgroundColor: '#000'}} key={index}>
                              <Image  style={{height: (window.width)*170/300, resizeMode: 'contain'}} source={{uri: item + '.png'}} />
                            </View>
                          )
                        })
                      }
                    </Swiper>
                  </View>
                    {/* <Swiper 
                        style={{height: (window.width-30)*170/300}}
                        loop={true}
                        paginationStyle={{height: 30, top: 0, right: 25, justifyContent: 'flex-end'}}
                        dot={<View style={{backgroundColor:'rgba(255,255,255,0.5)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                        activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                        >
                      {
                        this.props.data.images.map((item, index) => {
                          return (
                            <View style={{backgroundColor: '#000'}} key={index}>
                              <Image  style={{height: (window.width-30)*170/300, resizeMode: 'contain'}} source={{uri: item + '.png'}} />
                            </View>
                          )
                        })
                      }
                      </Swiper>
                    </View> */}
                </View>
                  
                : 
                <View>
                    <View style={styles.ctContent}>
                      <Text style={styles.contentText}>{this.props.data.content}</Text>
                    </View>
                  
                </View>
            }
            <View style={styles.ctComments}>
              <Text>Bình luận</Text>
              {
                this.props.post.loadComment ? 
                  <Loading title = 'Đang tải bình luận'/>
                : 
                  this.props.post.comments ?
                    this.props.post.comments.length === 0 ?
                      <NoData title='Chưa có bình luận nào'/>
                    :
                      this.props.post.comments.map((item, index) => {
                        return <Comments key= {index} data={item}/>
                      })
                  : null
              }
              {
                this.props.post.loadMoreComment ?
                  <View style={{alignItems: 'center', marginTop: 10,}}>
                    <Button
                      title = 'Xem thêm bình luận'
                      color = '#e87151'
                      onPress = {() => this.loadMoreComment()}
                      fontSize = {16}
                      fontWeight = '500'
                      backgroundColor = '#fff'
                    />
                  </View>
                : null
              }
            </View>
            
          
          </ScrollView>
          {
            this.props.post.sendComment ?
              <View style={{alignItems: 'center', padding: 5}}>
                <Text style={{fontSize: 12}}>Đang gửi bình luận...</Text>
              </View>
            : null
          }
          <BoxComment 
            show = {this.state.comment === '' ? null : true}
            value={this.state.comment}
            send = {() => this.sendComment(this.state.comment)}
            onChange= {(comment) => this.setState({comment})}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ctComments: {
    padding: 15
  },
  contentText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  ctContent: {
    backgroundColor: '#c6247d',
    padding: 15,
    paddingTop: 30,
    paddingBottom: 30
  },
  content: {
    color: '#0d0e15',
    // fontSize: 30,
    margin: 15,
    marginTop: 5
  },
  time: {
    color: '#768196',
    fontSize: 12,
    marginTop: 5
  },
  ctName: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  des: {
    fontWeight: '400',
  },
  fullName: {
    color: '#0d0e15',
    fontSize: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  ctHeader: {
    flexDirection: 'row',
    padding: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = (state) => {
  return {
    post: state.post,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadComment: (id, action, page) => dispatch(loadComment(id, action, page)),
    sendComment: (body) => dispatch(sendComment(body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeDetail);