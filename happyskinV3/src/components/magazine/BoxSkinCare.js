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
import BoxAction from '../BoxAction';
let deviceWidth = Dimensions.get('window').width;

class BoxSkinCare extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    };
  }
 
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() =>  Actions.newsDetail({id: this.props.post.id, typePost: 'post'})}>
          <Image style={styles.thumbnail} source={{uri: this.props.post.image_thumb+'.png'}} />
        </TouchableOpacity>
        <View style={styles.containerContent}>
          <Text style={styles.txtTitle}  onPress={() =>  Actions.newsDetail({id: this.props.post.id, typePost: 'post'})}>{this.props.post.title}</Text>          
        </View>
        <View style={styles.BoxAction}>
          <BoxAction view={this.props.post.count_views} like={this.props.post.count_like} comment={this.props.post.count_comment} isLike={this.props.post.is_like_by_current_id} itemId={this.props.post.id} itemType={this.props.post.type} itemFeedType={(this.props.post.feedtype) ? this.props.post.feedtype : null} itemTitle={this.props.post.title} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F2'
  },
  thumbnail: {
    width: deviceWidth-30,
    height: (deviceWidth-30)*200/345,
    borderRadius: 4,
  },
  txtTitle: {
    flex: 1,
    fontSize: 16,
    marginTop: 14,
    color: '#446EB6',
    marginRight: 28
  },
  containerContent: {
    flexDirection: 'row',
  },
  BoxAction: {
    alignItems: 'flex-end',
    paddingTop: 5
  }
});

module.exports = BoxSkinCare;