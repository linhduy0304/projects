import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import { Actions } from "react-native-router-flux";

class ExploreList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Actions.exploreDetail({title: this.props.explore.title, thumbnail: this.props.explore.image_thumb, id: this.props.explore.id})}>
          <Image style={styles.thumbnail} source={{uri: this.props.explore.image_thumb+'.png'}} />
          
        </TouchableOpacity>
        <View style={styles.containerContent}>
          <Text style={styles.txtTitle}>{this.props.explore.title}</Text>
          <View style={styles.containerAction}>
            <Image style={{width: 12, height: 10, marginRight: 5}} source={require('../../images/icons/ic_heart_purple.png')}/>
            <Text style={styles.txtLike}>{this.props.explore.count_like}</Text>
            <Image style={{height: 10, width: 10, marginRight: 5}} source={require('../../images/icons/ic_comment_purple.png')}/>
            <Text style={{fontSize: 12, color: 'rgb(135, 155, 206)',}}>{this.props.explore.count_comment}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15
  },
  containerAction: {
    flexDirection: 'row', 
    alignItems: 'center',
    height: 12, 
    marginTop: 19
  },
  txtLike: {
    color: 'rgb(135, 155, 206)',
    fontSize: 12,
    marginRight: 17
  },
  thumbnail: {
    width: deviceWidth-30,
    height: (deviceWidth-30)*200/345,
    borderRadius: 2,
  },
  txtTitle: {
    flex: 1,
    fontSize: 16,
    marginTop: 14,
    color: 'rgb(68, 110, 182)',
    marginRight: 28
  },
  containerContent: {
    flexDirection: 'row',
  },
});
module.exports = ExploreList;