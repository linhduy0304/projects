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

class BoxReview extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    };
  }
 
  render(){
    return (
      <View style={styles.boxListCoach}>
        <TouchableOpacity onPress={() => Actions.coachProfile({id: this.props.data.id, userName: this.props.data.full_name})} style={styles.boxImageCoach}>
            <Image style={styles.bgCoach} source={this.props.data.avatar ? {uri: this.props.data.avatar+ '.png'} : require('../../images/avatar.png')}/>
            <Image style={styles.imgAvatar} source={this.props.data.avatar ? {uri: this.props.data.avatar+'.png'} : require('../../images/avatar.png')}/>
        </TouchableOpacity>
        <View style={styles.boxInfoCoach}>
          <Text onPress={() => Actions.coachProfile({id: this.props.data.id, userName: this.props.data.full_name})} style={styles.txtNameCoach}>{this.props.data.full_name}</Text>
          <Text style={styles.txtRoleCoach}>Happy Skin's Coach</Text>
          <View style={styles.actions}>
            <View style={styles.boxFollow}>
              <Image style={styles.icFollow} source={require('../../images/icons/ic_follow_blue.png')}/>
              <Text style={styles.txtCount}>{this.props.data.count_follow}</Text>
            </View>
            <View style={styles.boxLike}>
              <Image style={styles.icLike} source={require('../../images/icons/ic_like_blue2.png')}/>
              <Text style={styles.txtCount}>{this.props.data.count_like}</Text>
            </View>
          </View>
          <Text numberOfLines={4} style={styles.txtDesCoach}>{this.props.data.coach_description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxInfoCoach: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 5,
    paddingTop: 20
  },
  txtNameCoach: {
    fontSize: 20,
    color: '#000000',
    paddingBottom: 10,
  },
  txtRoleCoach: {
    color: '#D73554',
    fontSize: 14,
    paddingBottom: 10,
  },
  boxImageCoach: {
    width: 85,
    paddingRight: 15,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    overflow: 'hidden'
  },
  boxListCoach: {
    marginBottom: 15,
    marginTop: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEEF0',
    borderTopWidth: 1,
    borderTopColor: '#ECEEF0'
  },
  actions: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  bgCoach: {
    width: 70,
    height: 193
  },
  imgAvatar: {
    position: 'absolute',
    top: 15,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#FFFFFF',
    borderWidth: 4
  },
  boxFollow: {
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center'
  },
  icFollow: {
    width: 11,
    height: 12,
  },
  txtCount: {
    color: '#879BCE',
    fontSize: 13,
    paddingLeft: 5
  },
  boxLike: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icLike: {
    width: 11,
    height: 12
  },
  txtDesCoach: {
    color: '#333333',
    fontSize: 15,
  },

});

module.exports = BoxReview;