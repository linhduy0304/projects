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
import BoxAction from '../BoxAction';
import {convertDateTime} from '../Functions';
let deviceWidth = Dimensions.get('window').width;


class BoxEvent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      isError: false
    };
  }
  
  render(){
    return (
      <View style={styles.boxVideo}>
        <TouchableOpacity onPress={() => Actions.eventDetail({id: this.props.data.id})}>
          <Image style={styles.thumbVideo} source={{uri: this.props.data.image_thumb+'.png'}}/>
          {
            this.props.status == 'started' ?
              <View style={[styles.ctStatus, {backgroundColor: 'rgb(243, 174, 193)'}]}>
                <Text style={styles.txtStatus}>Hot Deal</Text>
              </View>
              :
              <View style={styles.ctStatus}>
                <Text style={styles.txtStatus}>Đã kết thúc</Text>
              </View>
          }
          
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.eventDetail({id: this.props.data.id})}>
          <Text style={[styles.titleVideo]} numberOfLines={2} >
            {this.props.data.name}
          </Text>
        </TouchableOpacity>
        <View style={styles.boxAction}>
          <BoxAction view={this.props.data.count_views} like={this.props.data.count_like} comment={this.props.data.count_comment} isLike={this.props.data.is_like_by_current_id} itemId={this.props.data.id} itemType={'event'} itemTitle={this.props.data.title} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtStatus: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold'
  },
  ctStatus: {
    backgroundColor: 'rgb(197, 172, 211)',
    borderRadius: 12,
    padding: 8,
    paddingTop: 4,
    paddingBottom: 4,
    position: 'absolute',
    left: 7,
    bottom: 10
  },
  boxVideo: {
    marginTop: 20,
    marginLeft: 15,
    paddingBottom: 10,
    width: deviceWidth-30,
    borderBottomColor: 'rgb(245, 245, 242)',
    borderBottomWidth: 1
  },
  titleVideo:{
    fontSize: 16,
    color: 'rgb(68, 110, 182)',
    paddingBottom: 10,
    paddingTop: 10,
  },
 
  thumbVideo: {
    width: deviceWidth - 30,
    height: 200,
  },
  boxAction: {
    alignItems: 'flex-end',
  }
  
});

module.exports = BoxEvent;