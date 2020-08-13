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
import StarRating from '../../libs/react-native-star-rating';

class SearchProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.colThumbnail} onPress={() => Actions.exploreReview({id : this.props.product.id})}>
          <Image source={{uri: this.props.product.image_thumb+'_300x300.png'}} style={styles.thumbnail} onPress={() => Actions.exploreReview({id : this.props.product.id})}/>
        </TouchableOpacity>
        <View style={styles.colDescription}>
          <TouchableOpacity onPress={() => Actions.exploreReview({id : this.props.product.id})}>
            <Text numberOfLines={3} style={styles.title}>{this.props.product.title ? this.props.product.title : this.props.product.name }</Text>
          </TouchableOpacity>
          <View style = {styles.rating}>
            <StarRating
              disabled={true}
              emptyStar={require('../../images/icons/ic_star.png')}
              fullStar={require('../../images/icons/ic_star_ok.png')}
              halfStar={require('../../images/icons/ic_star_half.png')}
              maxStars={5}
              rating={this.props.product.raty_score}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              starSize={13}
              margin={2}
              />
            <Text> - {this.props.product.raty_count} Review</Text>
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
    padding: 10,
    paddingRight: 15,
  },
  colDescription: {
    flex: 0.7,
    padding: 10,
    paddingLeft: 15,
    height: 120,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  thumbnail: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 10,
    resizeMode: 'contain',
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
  rating: {
    flexDirection: 'row'
  }
});

module.exports = SearchProductList;