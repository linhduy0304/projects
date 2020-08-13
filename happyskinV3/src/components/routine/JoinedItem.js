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
class JoinedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalReview: false
    }
  }

  render(){
    return (
      <TouchableOpacity onPress={() => Actions.routineSubscribed({typeLoad: 'joined',data: this.props.routine, id: this.props.routine.routine.id, image_thumb: this.props.routine.routine.image_thumb, title: this.props.routine.routine.title})} style={styles.boxProduct}>
        <View style={styles.boxImageProduct}>
          <Image source={{uri: this.props.routine.routine.image_thumb+ '_100x100.png'}} style={styles.iconProduct} />
        </View>
        <View style={styles.boxDetailProduct}>
          <Text style={styles.txtNameProduct}>{this.props.routine.routine.title}</Text>
          <View style={styles.boxEditer}>
            <Text style={styles.txtTitle}>Hướng dẫn bởi</Text>
            <Text style={styles.txtContent}>{this.props.routine.routine.author.full_name}</Text>
          </View>
          <TouchableOpacity style={styles.boxRating} onPress={() => this.props.whenClicked(this.props.routine)}>
            <Text style={styles.txtRating}>Viết đánh giá</Text>
          </TouchableOpacity>
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
    marginLeft: 15,
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
  boxRating: {
    backgroundColor: '#FE7535',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingBottom: 7,
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 4
  },
  txtRating: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
module.exports = JoinedItem;