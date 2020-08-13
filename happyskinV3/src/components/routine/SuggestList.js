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
import StarRating from 'react-native-star-rating';

class SuggestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render(){
    return (
      <View style={styles.boxProduct}>
        <View style={styles.boxImage}>
          <View style={styles.boxImageProduct}>
            <Image source={require('../../images/bg_routine.png')} style={styles.iconProduct} />
            <View style={styles.boxAvatar}>
              <Image source={require('../../images/avatar_happyskin.png')} style={styles.avatar} />
            </View>
          </View>
        </View>
        <View style={styles.boxDetailProduct}>
          <Text style={styles.txtNameProduct} numberOfLines={2}>{this.props.suggest.title}</Text>
          <View style={styles.boxRating}>
            <View style={styles.rating}>
              <StarRating
                disabled={true}
                emptyStar={require('../../images/icons/ic_start_old.png')}
                fullStar={require('../../images/icons/ic_star_ok.png')}
                halfStar={require('../../images/icons/ic_star_half.png')}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                maxStars={5}
                rating={this.props.suggest.raty_score}
                starSize={13}
                margin={2}
                starStyle={{marginRight: 2}}
              />
            </View>
          </View>
          <View style={styles.hr}></View>
          <Text style={styles.boxAuthor}>bởi <Text style={styles.txtAuthor}>{this.props.suggest.author}</Text></Text>
          <Text style={styles.txtAuthor}>{this.props.suggest.count_join} người đã tham gia</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  boxProduct: {
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E8F1F9',
    padding: 15,
    flexDirection: 'row',
    marginBottom: 17,
    // alignItems: 'center',
  },
  boxImage: {
    width: 104,
    height: 104,
  },
  boxImageProduct: {
    width: 84,
    height: 84,
  },
  iconProduct: {
    width: 84,
    height: 84,
    borderRadius: 8,
  },
  boxAvatar: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: -20,
    right: -10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  boxDetailProduct: {
    flex: 1
  },
  txtNameProduct: {
    fontSize: 24,
    color: '#446EB6',
    paddingBottom: 7
  },
  txtActive: {
    fontSize: 15,
    color: '#333333'
  },
  boxRating: {
    paddingBottom: 10,
  },
  rating: {
    alignItems: "flex-start",
    flexDirection: 'row'
  },
  hr: {
    backgroundColor: '#ECEEF0',
    height: 1,
    marginBottom: 10
  },
  boxAuthor: {
    fontSize: 14,
    color: '#8A8A8F'
  },
  txtAuthor: {
    fontSize: 14,
    color: '#333333'
  }
});
module.exports = SuggestList;