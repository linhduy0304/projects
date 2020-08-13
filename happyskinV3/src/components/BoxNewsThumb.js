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

class BoxNewsThumb extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      isError: false
    };
  }
  viewDetail(id, title) {
    Actions.newsDetail({id: id, typePost: 'post', title: title});
  }
  render(){
    return (
      <View style = {styles.boxNewsHaveThumb}>
        <TouchableOpacity style={styles.infoNews} onPress={()=> Actions.tab({'page':'magazine'})}>
          <Text style={styles.infoNewsGroup}>Happy Skin Magazine</Text>
        </TouchableOpacity>
        <View style = {styles.mainNewsHaveThumb}>
          <TouchableOpacity onPress={ () => this.viewDetail(this.props.post.id, this.props.post.title) }>
            <Image defaultSource={require('../images/image_default.jpg')} host={this.props.listView} source={ !this.state.isError &&  this.props.post.image_thumb != '' ? { uri: this.props.post.image_thumb+'_500x500.png' } : require('../images/avatar.png') } style={styles.newsThumb} onError={(e) => { this.setState({ isError: true}) } }/>
          </TouchableOpacity>
          <View style={styles.contentNewsHaveThumb}>
            <TouchableOpacity onPress={ () => this.viewDetail(this.props.post.id, this.props.post.title) }>
              <Text style={styles.titleNews}>
                <HTMLView value={this.props.post.title}/>
              </Text>
            </TouchableOpacity>
            <Text numberOfLines={5} style={styles.contentColor}>
              <HTMLView value={this.props.post.short_content}/>
            </Text>
          </View>
        </View>
        <BoxAction like={this.props.post.count_like} comment={this.props.post.count_comment} isLike={this.props.post.is_like_by_current_id} itemId={this.props.post.id} itemType={this.props.post.type} itemFeedType={(this.props.post.feedtype) ? this.props.post.feedtype : null} itemTitle={this.props.post.title} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxNewsHaveThumb: {
    marginTop: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 15,
  },
  mainNewsHaveThumb: {
    flex: 1
  },
  newsThumb: {
    width: deviceWidth - 30,
    height: 200,
    // marginRight: 10,
    resizeMode: 'cover'
  },
  contentNewsHaveThumb: {
    //flex: 1
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
  infoNewsGroup: {
    fontSize: 16,
    color: '#577dbd'
  },
  infoNewsTime: {
  },
  contentColor: {
    color: '#333333'
  },
});

module.exports = BoxNewsThumb;