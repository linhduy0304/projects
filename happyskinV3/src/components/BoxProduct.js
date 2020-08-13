/**
 * Created by Mrbacdoan on 09/08/2016.
 */
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
import StarRating from '../libs/react-native-star-rating';

import BoxAction from '../components/directives/BoxAction';
import HTMLView from "react-native-htmlview";
let deviceWidth = Dimensions.get('window').width;
var moment = require('moment');
require('moment/locale/vi');
moment.locale('vi');

// import {
//     LazyloadScrollView,
//     LazyloadView,
//     LazyloadImage,
//     LazyloadListView
// } from 'react-native-lazyload';

class BoxNewsThumb extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      isError: false
    };
  }

  onStarRatingPress(rating){

  }
  render(){
    return (
      <View style = {styles.boxNewsHaveThumb}>
        <View style = {styles.mainNewsHaveThumb}>
          <View style={styles.contentNewsHaveThumb}>
            <Text style={styles.titleNews} onPress={() => Actions.ProductDetail({id : this.props.product.id})}>
              <HTMLView value={this.props.product.title ? this.props.product.title : this.props.product.name}/>
            </Text>
            <View style = {styles.rating}>
              <StarRating
                disabled={true}
                emptyStar={require('../images/icons/ic_star.png')}
                fullStar={require('../images/icons/ic_star_ok.png')}
                halfStar={require('../images/icons/ic_star_half.png')}
                maxStars={5}
                rating={this.props.product.raty_score}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                starSize={13}
                margin={2}
                />
              {/*<Text> - {this.props.product.raty_count} Reviews</Text>*/}
            </View>

            {
              (this.props.product.categories && this.props.product.categories.length > 0) ?
                this.props.product.categories.map(function(category, index){
                  return <TouchableOpacity style={styles.category} key={index}
                          //  onPress={() => Actions.pageCategory({id: category.id, typePost: 'product', title: category.name})}
                           >
                    <Text style={[styles.colorWhite, styles.categoryName]}>{category.name}</Text>
                  </TouchableOpacity>
                })
                : null
            }
          </View>
          <TouchableOpacity 
            // onPress={() => Actions.ProductDetail({id : this.props.product.id})}
            >
            <Image defaultSource={require('../images/image_default.jpg')} host={this.props.listView} animation={false} source={ !this.state.isError &&  this.props.product.image_thumb != '' ? { uri: this.props.product.image_thumb+'_200x200.png' } : require('../images/avatar.png') } style={styles.newsThumb} onError={(e) => { this.setState({ isError: true}) } }/>
          </TouchableOpacity>
        </View>
        <Text style={styles.descriptionProduct}>
          <HTMLView value={this.props.product.short_content}/>
        </Text>
        <View style={styles.viewPadding}>
          <BoxAction like={this.props.product.count_like > 0 ? this.props.product.count_like : 0} comment={this.props.product.count_comment} isLike={this.props.product.is_like_by_current_id} itemId={this.props.product.id} itemType={this.props.product.type} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxNewsHaveThumb: {
    marginTop: 10,
    borderBottomWidth: 15,
    borderBottomColor: '#eaeaea',
    width: deviceWidth
  },
  mainNewsHaveThumb: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  newsThumb: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10
  },
  contentNewsHaveThumb: {
    flex: 1,
    paddingRight: 5,
    paddingTop: 15,
    alignItems: "flex-start",
  },
  titleNews:{
    fontSize: 16,
    //fontWeight: 'bold',
    color: '#D73554',
    marginBottom: 5
  },
  infoNews: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  infoNewsGroup: {
    fontSize: 12,
    color: '#ccc'
  },
  infoNewsTime: {
    fontSize: 12,
    color: '#ccc'
  },
  rating: {
    alignItems: "flex-start",
    flexDirection: 'row'
  },

  boxAvatar: {
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxAvatarLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar :{
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 2
  },
  bold: {
    fontWeight: 'bold'
  },
  contentColor: {
    color: '#6d6f73'
  },
  textSmall: {
    fontSize: 12
  },
  descriptionProduct: {
    padding: 15,
    color: '#333333'
  },
  category: {
    borderRadius: 10,
    backgroundColor: '#f3aec1',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 10
  },
  colorWhite: {
    color: '#FFFFFF'
  },
  categoryName: {
    fontSize: 13
  },
  viewPadding: {
    paddingLeft: 15,
    paddingRight: 15
  }
});

module.exports = BoxNewsThumb;
