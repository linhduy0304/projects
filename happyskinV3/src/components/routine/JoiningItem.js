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

import {getTime} from '../Functions';
import { Actions } from "react-native-router-flux";
import StarRating from 'react-native-star-rating';
class JoiningItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render(){
    return (
      <TouchableOpacity onPress={() => Actions.routineSubscribed({id: this.props.routine.routine.id, image_thumb: this.props.routine.routine.image_thumb, title: this.props.routine.routine.title})} style={styles.boxProduct}>
        <View style={styles.boxImageProduct}>
          <Image source={{uri: this.props.routine.routine.image_thumb+'_100x100.png'}} style={styles.iconProduct} />
        </View>
        <View style={styles.boxDetailProduct}>
          <Text style={styles.txtNameProduct}>{this.props.routine.routine.title}</Text>
          <View style={styles.boxRating}>
            <View style={styles.rating}>
              <StarRating
                disabled={true}
                emptyStar={require('../../images/icons/ic_start_old.png')}
                fullStar={require('../../images/icons/ic_star_ok.png')}
                halfStar={require('../../images/icons/ic_star_half.png')}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                maxStars={5}
                rating={this.props.routine.routine.raty_score}
                starSize={13}
                margin={2}
                starStyle={{marginRight: 2}}
              />
            </View>
            <Text style={styles.txtCount}>(224)</Text>
          </View>
          <View style={styles.boxEditer}>
            <Text style={styles.txtTitle}>Hướng dẫn bởi</Text>
            <Text style={styles.txtContent}>{this.props.routine.routine.author.full_name}</Text>
          </View>
          <View style={styles.boxEditer}>
            <Text style={styles.txtTitle}>Thời gian còn</Text>
            <Text style={styles.txtContent}>{getTime(this.props.routine.routine.time_end)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  boxProduct: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8F1F9',
    paddingBottom: 15,
    paddingTop: 15,
    paddingRight: 15,
    flexDirection: 'row',
    marginLeft: 15
    // alignItems: 'center',
  },
  boxImageProduct: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 84,
    height: 84,
    marginRight: 20,
  },
  iconProduct: {
    width: 84,
    height: 84,
    borderRadius: 4
  },
  boxDetailProduct: {
    flex: 1
  },
  txtNameProduct: {
    fontSize: 18,
    color: '#446EB6',
    paddingBottom: 10
  },
  txtActive: {
    fontSize: 15,
    color: '#333333'
  },
  boxRating: {
    paddingBottom: 10,
    flexDirection: 'row'
  },
  rating: {
    alignItems: "flex-start",
    flexDirection: 'row'
  },
  txtCount: {
    color: '#879BCE',
    fontSize: 12,
    paddingLeft: 3
  },
  boxEditer: {
    paddingBottom: 10,
  },
  txtTitle: {
    color: '#929292',
    fontSize: 14,
  },
  txtContent: {
    color: '#333333',
    fontSize: 14,
  },
});
module.exports = JoiningItem;