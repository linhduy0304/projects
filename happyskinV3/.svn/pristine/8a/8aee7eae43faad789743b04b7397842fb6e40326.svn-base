import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import {Actions} from "react-native-router-flux";
import StarRating from 'react-native-star-rating';
import TimeAgo from "react-native-timeago";
import Constant from '../services/Constant';

const StoreService = require('../services/StoreService').default;

class BoxUserReview extends React.Component {
  constructor(props) {
    super(props);
  }
 
  profile(id) {
    var store = new StoreService();
    return store.getSession(Constant.HS_DATA_USER).then(res => {
      if(id == res.id) {
        Actions.profile()
      } else {
        Actions.otherProfile({id: id})
      }
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={{marginRight: 20}}>
          <TouchableOpacity onPress={() => this.profile(this.props.data.user.id)}>
            <Image style={styles.avatarCoach} source={this.props.data.user.avatar ? {uri: this.props.data.user.avatar+ '.png'} : require('../images/avatar.png')} />
          </TouchableOpacity>
          <View style={{flex: 1}}/>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text onPress={() => this.profile(this.props.data.user.id)} style={styles.nameCoach}>{this.props.data.user.full_name}</Text>
            <Text style={{color: 'rgb(138, 138, 143)', fontSize: 12}}><TimeAgo time={this.props.data.created_at}/></Text>
          </View>
          <View style={{flexDirection: 'row',marginTop: 3,marginBottom: 3}}>
            <StarRating
              disabled={true}
              emptyStar={require('../images/icons/ic_start_old.png')}
              fullStar={require('../images/icons/ic_star_ok.png')}
              halfStar={require('../images/icons/ic_star_half.png')}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              maxStars={5}
              rating={this.props.data.raty_score}
              starSize={14}
              margin={0}
              starStyle={{marginRight: 4}}
            />
          </View>
          <Text style={{color: 'rgb(92, 92, 92)', marginTop: 4}}>{this.props.data.comment}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    paddingBottom: 17, 
    paddingTop: 14, 
    borderTopColor: 'rgb(236, 238, 240)', 
    borderTopWidth: 1,
    paddingRight: 15
  },
  avatarCoach: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  nameCoach: {
    fontWeight: 'bold',
    color: 'rgb(68, 110, 182)'
  },
});
module.exports = BoxUserReview;
