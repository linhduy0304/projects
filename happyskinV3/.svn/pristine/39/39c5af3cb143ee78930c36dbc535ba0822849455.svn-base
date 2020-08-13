import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Spinner = require('react-native-spinkit');

import Button from "react-native-button";
import StarRating from 'react-native-star-rating';
import { Actions } from "react-native-router-flux";
import { TextField } from 'react-native-material-textfield';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as exploreActions from '../actions/exploreActions';
const actions = [
  exploreActions
];
function mapStateToProps(state) {
  return {
    explore: state.explore
  };
}
function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class ModalReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      star: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.explore != this.props.explore) {
      if(nextProps.explore.openModal) {
        this.props.closeModal()
      }
    }
  }

  review() {
    this.props.actions.review(this.state.comment, this.props.data.id, this.state.star, this.props.data.name)
  }

  render(){
    return (
      <View style={styles.ctModal}>
        <ScrollView>
          <View style={{padding: 35}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={[styles.txtReview, {marginLeft: 0}]}>ĐÁNH GIÁ SẢN PHẨM</Text>
                <Text style={{fontSize: 17,marginTop: 18, fontWeight: 'bold', color: 'rgb(78, 118, 162)'}}>{this.props.data.name}</Text>
              </View>
              <Image style={{height: 100, width: 100}} source={{uri: this.props.data.image_thumb+'.png'}} />
            </View>
            <View style={styles.ctStar}>
              <Text style={{color: 'rgb(194, 197, 208)', fontSize: 12}}>Chấm điểm</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={styles.rating}>
                  <StarRating
                    emptyStar={require('../images/icons/ic_start_old.png')}
                    fullStar={require('../images/icons/ic_star_ok.png')}
                    halfStar={require('../images/icons/ic_star_half.png')}
                    selectedStar={(rating) => this.setState({star: rating})}
                    maxStars={5}
                    rating={this.state.star}
                    starSize={20}
                    margin={0}
                    starStyle={{marginRight: 4}}
                  />
                </View>
                <Text style={{color: 'rgb(194, 197, 208)', fontSize: 16}}>{this.state.star}/5</Text>
              </View>
            </View>
            <View>
              <TextField
                label='Đánh giá của bạn'
                autoCorrect={false}
                onChangeText={(comment) => this.setState({comment: comment})}
                tintColor="#5A5E6F"
                multiline={true}
                textColor="#0E0E11"
                baseColor="rgb(194, 197, 208)"
                tintColor='rgb(194, 197, 208)'
                autoCapitalize="none"
                value={this.state.comment}
              />
            </View>
            {
              this.props.explore.fetchingModal ?
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image style={{width: 75, height: 75,}} source={require('../images/spinner.gif')} />
              </View> 
              : 
              <View style={{flexDirection: 'row',justifyContent: 'space-between', flex: 1, alignItems: 'flex-end',}}>
                <Button 
                    onPress={() => this.review()}
                    containerStyle={{paddingLeft: 15, paddingRight: 15, backgroundColor:"rgb(254, 117, 53)", marginTop: 13, borderRadius:4, height: 32, justifyContent: 'center', alignItems: 'center'}}
                    style={styles.btnWrite}>
                  Gửi đánh giá sản phẩm
                </Button>
                <Button 
                    onPress={() => this.props.closeModal()}
                    containerStyle={{backgroundColor:"#fff", marginTop: 13, borderRadius:2, height: 32, justifyContent: 'center', alignItems: 'center'}}
                    style={{color: 'rgb(254, 117, 53)', fontSize: 14}}>
                  Bỏ qua
                </Button>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}
let main = require('../styles/Main');
const styles = StyleSheet.create({
  btnWrite: {
    color: '#fff',
    fontSize: 14
  },
  input: {
    padding: 0,
    fontSize: 16
  },
  rating: {
    marginTop: 10,
    flexDirection: 'row',
  },
  ctModal: {
    flex: 1
  },
  txtReview: {
    color: 'rgb(135, 80, 161)',
    marginLeft: 15,
  },
  ctStar: {
    marginTop: 22,
    borderBottomColor: 'rgb(228, 232, 242)',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
export default connect(mapStateToProps, mapDispatchToProps) (ModalReview)