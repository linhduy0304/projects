import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  TouchableOpacity
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

class BoxNewsAnnounce extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      isError: false
    };
  }
  viewDetail(id, title) {
    // Actions.announceDetail({id: id, title: title})
  }
  viewProfile(id){
    Actions.otherProfile({id: id})
  }
  displayTypeDetail(type) {
    switch(type) {
      case 'g_announce':
      return <Text>{' đã gửi 1 '}<Text style={styles.bold}>thông báo.</Text></Text>;
      default :
      return '';
    }
  }
  render(){
    return (
      <View style={styles.boxSimpleNews}>
        <View style={styles.boxAvatar} >
          <View style={styles.boxAvatarLeft} >
            <Image source={require('../images/avatar_happyskin.png')}
                         style = {styles.avatar}
                  />
            <View style={styles.contentDetail}>
              <Text style={[styles.contentColor, styles.textSmall]} >
                <Text style={[styles.bold, styles.contentColor, styles.textSmall]} > Happy Skin</Text>
                { this.displayTypeDetail(this.props.feed.feedtype) }
              </Text>
              {
                // <Text style={[styles.infoNewsTime, styles.contentColor, styles.textSmall]}><TimeAgo time={this.props.feed.created_at} /></Text>  
              }
            </View>
          </View>
        </View>

        { this.props.feed.title ?
            <TouchableOpacity onPress={() => this.viewDetail(this.props.feed.id, this.props.feed.title) }>
              <Text style={styles.titleNews} numberOfLines={3}>
                <HTMLView value={this.props.feed.title}/>
              </Text>
            </TouchableOpacity>
            : null
        }

        <View style={styles.boxContent}>
          {
            (this.props.feed.images != '') ?
            <TouchableOpacity style={styles.colThumbnail} onPress={() => this.viewDetail(this.props.feed.id, this.props.feed.title) }>
              <Image defaultSource={require('../images/image_default.jpg')} host={this.props.listView} source={{ uri: this.props.feed.images[0]+'.png' }} style={styles.thumbnail} onError={(e) => { this.setState({ isError: true}) } }/>
            </TouchableOpacity>
            : null
          }
          
          <View style={styles.colDescription}>
            <TouchableOpacity style={styles.contentNews} onPress={() => this.viewDetail(this.props.feed.id, this.props.feed.title) }>
              <Text numberOfLines={5} style= {styles.contentColor}>
                <HTMLView value={this.props.feed.short_content}/>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <BoxAction like={this.props.feed.count_like} comment={this.props.feed.count_comment} isLike={this.props.feed.is_like_by_current_id} itemId={this.props.feed.id} itemType={this.props.feed.type} itemFeedType={(this.props.feed.feedtype) ? this.props.feed.feedtype : null} itemTitle={this.props.feed.title} />
        <Image source={require('../images/icons/ic_announce_hot.png')} style={styles.iconAnnounce}></Image>
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
    borderBottomWidth: 15
  },
  titleNews:{
    fontSize: 17,
    color: '#d73554',
    paddingBottom: 5,
    //fontWeight: 'bold'
    fontFamily: 'SanFranciscoText-Medium'
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
    flex: 1,
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
    color: '#6d6f73'
  },
  textSmall: {
    fontSize: 12
  },
  iconAnnounce: {
    width: 35, 
    height: 20,
    position: 'absolute',
    resizeMode: 'contain',
    top: 0,
    right: 0
  }
});

module.exports = BoxNewsAnnounce;
