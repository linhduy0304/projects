import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {Actions} from "react-native-router-flux";
import BoxAction from '../BoxAction';
import {convertDateTime} from '../Functions';
let deviceWidth = Dimensions.get('window').width;


class BoxVideo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      isError: false
    };
  }
  
  render(){
    return (
      <View  style={styles.boxVideo}>
        <TouchableOpacity onPress={ () => Actions.videoDetail({id: this.props.post.id, typePost: 'video'}) }>
            <ImageBackground defaultSource={require('../../images/image_default.jpg')} animation={false} source={ !this.state.isError &&  this.props.post.image_small != '' ? { uri: this.props.post.image_small } : require('../../images/avatar.png') } style={styles.thumbVideo} onError={(e) => { this.setState({ isError: true}) } }>
              <View style={styles.ctBlur}/>
              <Image style={styles.iconPlay} source={require('../../images/icons/ic_play_video_white.png')}/>
            </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => Actions.videoDetail({id: this.props.post.id, typePost: 'video'}) }>
          <Text style={[styles.titleVideo]} numberOfLines={2} >
            {this.props.post.title}
          </Text>
        </TouchableOpacity>
        <View style={styles.BoxAction}>
          <BoxAction view={this.props.post.count_views} like={this.props.post.count_like} comment={this.props.post.count_comment} isLike={this.props.post.is_like_by_current_id} itemId={this.props.post.id} itemType={'video'} itemFeedType={(this.props.post.feedtype) ? this.props.post.feedtype : null} itemTitle={this.props.post.title} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxVideo: {
    marginTop: 20,
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    width: deviceWidth-30,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F2'
  },
  titleVideo:{
    fontSize: 16,
    color: 'rgb(68, 110, 182)',
    paddingBottom: 10,
    paddingTop: 10,
  },
  ctBlur: {
    width: deviceWidth - 30,
    height: 200,
    position: 'absolute',
    backgroundColor: 'rgba(78, 118, 162, 0.4)'
  },
  thumbVideo: {
    width: deviceWidth - 30,
    height: 200,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  iconPlay: {
    width: 30,
    height: 36
  },
  windowWidth: {
    width: deviceWidth
  },
  BoxAction: {
    alignItems: 'flex-end',
  }
  
});

module.exports = BoxVideo;
