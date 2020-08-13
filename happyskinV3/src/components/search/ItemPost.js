import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  AlertIOS,
  Dimensions
} from "react-native";
import {Actions} from "react-native-router-flux";

let deviceWidth = Dimensions.get('window').width;

class ItemPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isError: false
    };
  }
  // Actions.newsDetail({id: this.props.posts.id, typePost: 'post'}
  checkTypeRedirect(id, type) {
    switch(type){

      case 'posts':
      case 'post' :
        Actions.newsDetail({id: id, typePost: 'post'});
      break;

      case 'video':
        Actions.videoDetail({id: id});
      break;

      case 'event':
        Actions.eventDetail({id: id, title: this.props.posts.title});
      break;

      case 'groupfeed':
        // switch(this.props.posts.feedtype) {
        //   case 'g_question':
        //     Actions.questionDetail({id: id, title: this.props.posts.title});
        //   break;

        //   case 'g_tips':
        //     Actions.newsDetail({id: id, title: this.props.posts.title});
        //   break;

        //   case 'g_review':
        //     Actions.productReview({id: id, title: this.props.posts.title});
        //   break;

        //   case 'g_image':
        //     Actions.lookOfTheDayDetail({id: target_id, title: this.props.posts.title});
        //   break;

        //   case 'g_announce':
        //     Actions.announceDetail({id: id});
        //   break;
        // }
        break;
      default:
      return null;
    }
  }

  viewImage(type) {
    switch(type){

      case 'posts':
      case 'post' :
        return <Image source={ !this.state.isError &&  this.props.posts.image_thumb != '' ? { uri: this.props.posts.image_thumb+'_300x300.png' } : require('../../images/avatar.png') } style={styles.thumbnail} onError={(e) => { this.setState({ isError: true}) } }/>
      break;

      case 'video':
        return <Image source={ !this.state.isError &&  this.props.posts.image_thumb != '' ? { uri: this.props.posts.image_thumb } : require('../../images/avatar.png') } style={styles.thumbnail} onError={(e) => { this.setState({ isError: true}) } }/>
      break;

      case 'event':
        return <Image source={ !this.state.isError &&  this.props.posts.image_thumb != '' ? { uri: this.props.posts.image_thumb+'_200x150.png' } : require('../../images/avatar.png') } style={styles.thumbnail} onError={(e) => { this.setState({ isError: true}) } }/>
      break;

      case 'groupfeed':
        if (this.props.posts.image_thumb != "") {
          return <Image source={{uri: this.props.posts.image_thumb+'_70x70.png'}} style={styles.thumbnail}/>
        } else if (this.props.posts.images[0] != "") {
          return <Image source={{uri: this.props.posts.images[0]+'_100x100.png'}} style={styles.thumbnail}/>
        } else if (this.props.posts.user.avatar != "") {
          return <Image source={{uri: this.props.posts.user.avatar+'_100x100.png'}} style={styles.thumbnail}/>
        } else if (this.props.posts.group.image_thumb != "") {
          return <Image source={{uri: this.props.posts.group.image_thumb+'_200x200.png'}} style={styles.thumbnail}/>
        } else {
          return <Image source={require('../../images/bg_profile5.jpg')} style = {styles.thumbnail}/>
        }
      break;

      default:
      return null;
    }
  }

  showLabel(type){
    switch(type){
      case 'posts':
      case 'post' :
        return 'Bài viết';
        break;
      case 'video':
        return 'Video';
        break;
      case 'event':
        return 'Event';
        break;
      case 'groupfeed':
        switch(this.props.posts.feedtype){
          case 'g_question':
            return 'Hỏi';
            break;
          case 'g_tips':
            return 'Mẹo';
            break;
          case 'g_review':
            return 'Review';
          break;
          case 'g_image':
            return 'Ảnh';
            break;
          case 'g_announce':
            return 'Thông báo';
            break;
        }
        break;

      default:
        return null;
    }
  }

  render(){
      
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.colThumbnail} onPress={() => this.checkTypeRedirect(this.props.posts.id, this.props.posts.type)}>
            {
              this.viewImage(this.props.posts.type)
            }
          </TouchableOpacity>
          <View style={styles.colDescription}>
            <TouchableOpacity onPress={() => this.checkTypeRedirect(this.props.posts.id, this.props.posts.type)}>
              <Text numberOfLines={3} style={styles.title}>{(this.props.posts.title) ? this.props.posts.title : this.props.posts.short_content}</Text>
            </TouchableOpacity>
            <View style = {styles.label}>
              <Text>
              {
                this.showLabel(this.props.posts.type)
              }
              </Text>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 120,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    backgroundColor: '#FFFFFF'
  },
  colThumbnail: {
    flex: 0.3,
    padding: 10
  },
  colDescription: {
    flex: 0.7,
    padding: 10,
    paddingLeft: 0,
    height: 120,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  thumbnail: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 10
  },
  title: {
    color: '#000000',
    fontSize: 18,
    marginBottom: 10
  },
  author: {
    color: '#000000',
    fontSize: 15
  },
  textNormal: {
    color: '#565656',
    fontSize: 14
  },
  label: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 1
  }
});

module.exports = ItemPost;