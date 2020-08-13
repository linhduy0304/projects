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
import TimeAgo from "react-native-timeago";
import HTMLView from "react-native-htmlview";
var moment = require('moment');
require('moment/locale/vi');
moment.locale('vi');

let deviceWidth = Dimensions.get('window').width;

// import {
//     LazyloadScrollView,
//     LazyloadView,
//     LazyloadImage,
//     LazyloadListView
// } from 'react-native-lazyload';

class BoxSponsorPost extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      isError: false
    };
  }
  viewDetail(target_id, target_type) {
    switch(target_type){
      case 'product':
        Actions.ProductDetail({id : target_id})
        break;

      case 'posts':
        Actions.newsDetail({id: target_id, typePost: 'post'})
        break;

      case 'video':
        Actions.videoDetail({id: target_id})
        break;

      case 'category':
        Actions.pageCategory({id: target_id, typePost: 'post'})
        break;

      case 'skintest':
        Actions.skinTest()
        break;

      case 'event':
        Actions.eventDetail({id: target_id})
        break;

      case 'g_question':
        Actions.questionDetail({id: target_id})
        break;

      case 'g_tips':
        Actions.newsDetail({id: target_id})
        break;

      case 'g_review':
        Actions.productReview({id: target_id})
        break;

      case 'g_image':
        Actions.lookOfTheDayDetail({id: target_id});
        break;

      case 'g_announce':
        Actions.announceDetail({id: target_id})
        break;

      case 'minigame':
        Actions.minigameDetail({id: target_id});
        break;

      case 'hotdebate':
        Actions.hotDebateDetail({id: target_id});
        break;  

      default:
      return null;


    }
  }
  render(){
    return (
      <View style = {styles.boxNewsHaveThumb}>
        <View style = {styles.mainNewsHaveThumb}>
          <View style={styles.header}>
            <Text style = {styles.titleHeader}>{this.props.post.title_type}</Text>
          </View>
          {(this.props.post.image_thumb == '') ?
            <View style={styles.boxAvatar} >
              <View style={styles.boxAvatarLeft} >
                {
                    (this.props.post.image_brand != '') ?
                     <Image source = {require('../images/avatar.png')}
                            style={styles.avatar}
                       />
                    : <Image source={require('../images/avatar.png')}
                             style = {styles.avatar}
                      />
                }
                <View style={styles.contentDetail}>
                  <Text style={[styles.contentColor, styles.textSmall]} >
                    <Text style={[styles.bold, styles.contentColor, styles.textSmall]} > {this.props.post.brand_name}</Text>
                    {" "+this.props.post.brand_text }
                  </Text>
                  {
                    // <Text style={[styles.infoNewsTime, styles.contentColor, styles.textSmall]}><TimeAgo time={this.props.post.created_at} /></Text>  
                  }
                </View>
              </View>
            </View>
            :
            <TouchableOpacity style={styles.windowWidth} onPress={ () => this.viewDetail(this.props.post.target_id, this.props.post.target_type) }>
              <Image defaultSource={require('../images/image_default.jpg')} host={this.props.listView} animation={false} source={ !this.state.isError &&  this.props.post.image_thumb != '' ? { uri: this.props.post.image_thumb+'_820x312.png' } : require('../images/avatar.png') } style={styles.newsThumb} onError={(e) => { this.setState({ isError: true}) } }/>
            </TouchableOpacity>
          }
          <View style={styles.contentNewsHaveThumb}>
            <TouchableOpacity onPress={ () => this.viewDetail(this.props.post.target_id, this.props.post.target_type) }>
              <Text style={styles.titleNews}>
                <HTMLView value={this.props.post.title}/>
              </Text>
            </TouchableOpacity>
            <Text numberOfLines={5} style={styles.contentColor}>
              <HTMLView value={this.props.post.short_content+'...'}/>
            </Text>
            <TouchableOpacity style={styles.buttonViewMore} onPress={ () => this.viewDetail(this.props.post.target_id, this.props.post.target_type) }>
              <Text style={styles.titleButton}>Tìm hiểu thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxNewsHaveThumb: {
    marginTop: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 15
  },
  mainNewsHaveThumb: {
    flex: 1
  },
  newsThumb: {
    width: deviceWidth,
    height: (deviceWidth * 312)/ 820,
    // marginRight: 10
  },
  contentNewsHaveThumb: {
    //flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleNews:{
    fontSize: 17,
    marginTop: 10,
    marginBottom: 5,
    color: '#D73554'
  },
  infoNews: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  infoNewsTime: {
  },
  contentColor: {
    color: '#333333'
  },
  header: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconHeader: {
    width: 14,
    height: 14
  },
  titleHeader: {
    fontSize: 18,
    color: '#fe7535',
    paddingLeft: 5
  },
  buttonViewMore: {
    width: 120,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fe7535',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  titleButton: {
    color: 'white'
  },
  boxAvatar: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
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
  textSmall: {
    fontSize: 12
  },
  windowWidth: {
    width: deviceWidth
  }
});

module.exports = BoxSponsorPost;