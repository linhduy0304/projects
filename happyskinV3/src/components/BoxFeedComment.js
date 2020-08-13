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
  Dimensions
} from "react-native";
import {Actions} from "react-native-router-flux";
import BoxAction from '../components/directives/BoxAction';
import HTMLView from "react-native-htmlview";
var moment = require('moment');
require('moment/locale/vi');
moment.locale('vi');

// import {
//     LazyloadScrollView,
//     LazyloadView,
//     LazyloadImage,
//     LazyloadListView
// } from 'react-native-lazyload';

let deviceWidth = Dimensions.get('window').width;

class BoxFeedComment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      isError: false
    };
  }

  viewDetail(id, title) {
    switch(this.props.post.typefeed){
      case 'post':
        Actions.newsDetail({id: id, typePost: 'post', title: title});
        break;
      case 'video':
        Actions.videoDetail({id: id, title: title});
        break;
      case 'product':
        Actions.ProductDetail({id: id});
        break;
      case 'groupfeed':
        switch(this.props.post.feed.feedtype){
          case 'g_review':
            Actions.productReview({id: id, title: title})
            break;
          case 'g_question':
            Actions.questionDetail({id: id, title: title});
            break;
          case 'g_tips':
            Actions.newsDetail({id: id, title: title});
            break;
          case 'g_announce':
            Actions.announceDetail({id: id, title: title});
            break;
          case 'g_image':
            Actions.lookOfTheDayDetail({id: id, title: title});
            break;
        }
    }
  }

  displayTypeDetail(){
    switch(this.props.post.typefeed){
      case 'post':
        return <Text><Text> đã bình luận một <Text style={styles.bold}>bài viết.</Text></Text></Text>;
      case 'video':
        return <Text><Text> đã bình luận một <Text style={styles.bold}>bài video.</Text></Text></Text>;
      case 'product':
        if(this.props.post.raty_score){
          return <Text><Text> đã review một <Text style={styles.bold}>sản phẩm.</Text></Text></Text>;
        }else {
          return <Text><Text> đã đặt câu hỏi cho <Text style={styles.bold}>sản phẩm.</Text></Text></Text>;
        }
        
      case 'groupfeed':
        switch(this.props.post.feed.feedtype){
          case 'g_review':
            return <Text><Text> đã bình luận một <Text style={styles.bold}>review</Text> {(this.props.post.feed.group.name == 'Other') ? null : <Text>ở trong nhóm <Text style={styles.bold}>{this.props.post.feed.group.name}</Text></Text>}.</Text></Text>;
          case 'g_question':
            return <Text><Text> đã bình luận một <Text style={styles.bold}>câu hỏi</Text> {(this.props.post.feed.group.name == 'Other') ? null : <Text>ở trong nhóm <Text style={styles.bold}>{this.props.post.feed.group.name}</Text></Text>}.</Text></Text>;
          case 'g_tips':
            return <Text><Text> đã bình luận một <Text style={styles.bold}>mẹo.</Text> {(this.props.post.feed.group.name == 'Other') ? null : <Text>ở trong nhóm <Text style={styles.bold}>{this.props.post.feed.group.name}</Text></Text>}.</Text></Text>;
          case 'g_announce':
            return <Text><Text> đã bình luận một <Text style={styles.bold}>thông báo.</Text></Text></Text>;
          case 'g_image':
            return <Text><Text> đã bình luận một <Text style={styles.bold}>Ảnh</Text> {(this.props.post.feed.group.name == 'Other') ? null : <Text>ở trong nhóm <Text style={styles.bold}>{this.props.post.feed.group.name}</Text></Text>}.</Text></Text>;
          default: 
            return null; 
        }
      default:
        return null;
    }
  }

  renderTitle(){
    if(this.props.post.feed.title){
      return <TouchableOpacity onPress={() => this.viewDetail(this.props.post.feed.id, this.props.post.feed.title) }>
              <Text style={styles.titleNews} numberOfLines={3}>
                <HTMLView value={this.props.post.feed.title}/>
              </Text>
            </TouchableOpacity>
    }else{
      return null;
    }
  }

  renderContent(){
    if(this.props.post.feed.content){
      return <View style={styles.colDescription}>
            <TouchableOpacity style={styles.contentNews} onPress={() => this.viewDetail(this.props.post.feed.id, this.props.post.feed.title) }>
              <Text numberOfLines={5} style= {styles.contentColor}>
                <HTMLView value={this.props.post.feed.content}/>
              </Text>
            </TouchableOpacity>
          </View>
    }else if(this.props.post.feed.short_content){
      return <View style={styles.colDescription}>
            <TouchableOpacity style={styles.contentNews} onPress={() => this.viewDetail(this.props.post.feed.id, this.props.post.feed.title) }>
              <Text numberOfLines={5} style= {styles.contentColor}>
                <HTMLView value={this.props.post.feed.short_content}/>
              </Text>
            </TouchableOpacity>
          </View>
    }else{
      return null;
    }
  }

  render(){
    return (
      <View style={styles.boxSimpleNews}>
        <View style={styles.boxAvatar}>
          <View style={styles.boxAvatarLeft} >
            {
                (this.props.post.user_data.avatar != '') ?
                 <Image source = {{uri : this.props.post.user_data.avatar + '_100x100.png'}}
                        style={styles.avatar}
                   />
                : <Image source={require('../images/avatar.png')}
                         style = {styles.avatar}
                  />
            }
            <View style={styles.contentDetail}>
              <TouchableOpacity style={[styles.contentColor, styles.textSmall]} onPress={() => this.viewDetail(this.props.post.feed.id, this.props.post.feed.title)}>
                <Text> <Text style={[styles.bold, styles.contentColor, styles.textSmall]}> {this.props.post.user_data.full_name}</Text>
                { this.displayTypeDetail(this.props.post.typefeed) }</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.mainTitle}>
          {
            this.renderTitle()
          }
        </View>

        {
          // this.renderContent()
        }

        {
          (this.props.post.typefeed == 'groupfeed' && this.props.post.feed.feedtype == 'g_image') ? 
          <TouchableOpacity onPress={() => this.viewDetail(this.props.post.feed.id)} style={styles.imageLOTD}>
            <Image defaultSource={require('../images/image_default.jpg')} host={this.props.listView} animation={false} source={ !this.state.isError &&  this.props.post.feed.image != '' ? { uri: this.props.post.feed.image+'_300x300.png' } : require('../images/avatar.png') } style={styles.newsThumb} onError={(e) => { this.setState({ isError: true}) } }/>
          </TouchableOpacity>
          : null
        }
        
        
      </View>
    );
  }

}

const styles = StyleSheet.create({
  boxSimpleNews: {
    borderBottomColor: '#eaeaea',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 15,
    position: 'relative',
    width: deviceWidth
  },
  titleNews:{
    fontSize: 17,
    color: '#D73554',
    paddingBottom: 5
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
    flex: 0.92,
    marginLeft: 6,
  },
  boxContent: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10
  },
  colThumbnail: {
    flex: 0.4,
    paddingRight: 15,
    paddingBottom: 30
  },
  thumbnail: {
    flex: 1,
    height: 100
  },
  colDescription: {
    flex: 0.6,
    padding: 10,
    paddingLeft: 0,
    paddingTop: 0,
    alignItems: 'flex-start',
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
    color: '#333333'
  },
  textSmall: {
    fontSize: 12
  },
  iconQuestion: {
    width: 26, 
    height: 22,
    flex:0.08,
    resizeMode: 'contain',
  },
  newsThumb:{
    width: deviceWidth-30,
    height: deviceWidth-30,
    marginRight: 10,
    resizeMode: 'contain'
  },
  imageLOTD: {
    marginBottom: 20,
    backgroundColor: '#000000',
  },
  mainTitle: {
    marginBottom: 10
  },
  windowWidth: {
    width: deviceWidth
  }
});

module.exports = BoxFeedComment;