

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Linking, 
  WebView,
  ScrollView,
  Platform
} from 'react-native';

const window = Dimensions.get('window');

import Web from 'react-native-webview2';
import {Actions} from 'react-native-router-flux'
import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import css from '../../Css'
import PostRelate from '../../components/posts/PostRelate';
import Loading from '../../components/Loading';
import NoData from '../../components/NoData';
import Comments from '../../components/Comments';
import BoxComment from '../../components/BoxComment';
import Button from '../../components/Button';

import {postDetail, loadComment, sendComment} from '../../actions/post'
import { connect } from 'react-redux'

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      page: 1,
      scrollY: new Animated.Value(0),
      height: 20,
      relate: [
        {
          title: " 11 mẹo vặt hữu ích được 'học lỏm' từ các đầu bếp nhà hàng ",
          image_thumb: 'https://static.ipick.vn/images/posts/9a09ca4da679665a3fcd06e709b5b022/he-den-cho-con-lam-gi_LA0tXJ_1140x600.png',
          source: "Meo Vat"
        },
        {
          title: " Nghệ thuật bày biện món ăn của người Hàn",
          image_thumb: 'https://static.ipick.vn/images/posts/9a09ca4da679665a3fcd06e709b5b022/he-den-cho-con-lam-gi_LA0tXJ_1140x600.png',
          source: "Meo Vat"
        },
      ],
      data: {
        title: " 11 mẹo vặt hữu ích được 'học lỏm' từ các đầu bếp nhà hàng ",
        image_thumb: 'https://static.ipick.vn/images/posts/9a09ca4da679665a3fcd06e709b5b022/he-den-cho-con-lam-gi_LA0tXJ_1140x600.png',
        content: "Chuyện nấu ăn dường như là đối với rất nhiều người, và các tình trạng như nấu lúc sống lúc chín, thịt cháy, rau héo nát, đứt tay... hoàn toàn có thể xảy ra. Thế nhưng, bạn có từng nghĩ, nếu  được các mẹo vặt nấu ăn đơn giản từ chính các đầu bếp nhà hàng thì sẽ thế nào không?"
      },
    }
  }

  componentWillMount() {
    this.props.postDetail(this.props.slug)
  } 
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.post.commentSuccess) {
      this.setState({
        comment: ''
      })
    }
  }

  _onNavigationStateChange(webViewState){
    if(webViewState.url != (`https://happyapi.techup.vn/api/v1/webview?slug=${this.props.slug}`)) {
      this.refs.web.stopLoading();
      Linking.openURL(webViewState.url);
    }
  }
  
  renderLoading() {
    return (
      <Loading title='Đang tải nội dung' />
    )
  }

  onLoadStart() {
    this.props.loadComment(this.props.post.postDetail.id, 'post');
  }

  loadMoreComment() {
    this.props.loadComment(this.props.post.postDetail.id, 'post', 'LM', this.state.page +1);
    this.setState({page: this.state.page + 1})
  }

  sendComment(comment) {
    var body = {
      type: 'post',
      content: comment,
      target_id: this.props.post.postDetail.id,
    }
    this.props.sendComment(body)
  }

  render() {
    const navTranslate = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [0, -75],
      extrapolate: 'clamp',
    });
    const navOpacity = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={css.container}>
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
        
        {
          this.props.post.postDetail ?
            <ScrollView style={{flex: 1}}>
              <View style={{flex: 1,padding: 15, paddingBottom: 30}}>
                <Text style={styles.txtTitle}>{this.props.post.postDetail.title}</Text>
                <Image style={styles.img} source={{uri: this.props.post.postDetail.image_thumb+ '_600x400.png'}} />
                <View style={{marginTop: 15, }}>
                  <Web
                    ref='web'
                    source={{uri: `https://happyapi.techup.vn/api/v1/webview?slug=${this.props.slug}`}}
                    scrollEnabled={false}
                    javaScriptEnabled
                    renderLoading={this.renderLoading}
                    startInLoadingState
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    onLoadStart={this.onLoadStart.bind(this)}
                    // onLoadEnd={this.onLoadEnd.bind(this)}
                    evalReturn={((r) => {eval(r)}).bind(this)}
                    automaticallyAdjustContentInsets={false}
                    // style={{width: window.width - 15, }}
                    scalesPageToFit={true}
                    dataDetectorTypes="none"
                  />
                </View>
                <View style={styles.ctComments}>
                  <Text style={{color: '#333333', fontWeight: 'bold',}}>Bình luận</Text>
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

                {
                  this.props.post.postDetail.related_posts ?
                    this.props.post.postDetail.related_posts.length !== 0 ?
                      <PostRelate
                        title='Bài viết khác'
                        data = {this.props.post.postDetail.related_posts}
                      />
                    : null
                  : null
                }
                
              </View>
            </ScrollView>
          : null
        }
        {
          this.props.post.loading ? 
            <View style={css.mainSpin1}>
              <Image style={{width: 50, height: 50}} source={require('../../images/loading.gif')} />
            </View>
          : null
        }
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

      </View>
    )
  }
}

const styles = StyleSheet.create({
  img: {
    width: window.width-30,
    height: 150,
    marginTop: 10
  },
  txtTitle: {
    color: '#c6247d',
    fontSize: 30,
    // marginTop: 10,
    // paddingLeft: 15
  },
  navScroll: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
  },
})

const mapStateToProps = (state) => {
  return {
    post: state.post,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postDetail: (slug) => dispatch(postDetail(slug)),
    loadComment: (id, type, action, page) => dispatch(loadComment(id, type, action, page)),
    sendComment: (body) => dispatch(sendComment(body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);