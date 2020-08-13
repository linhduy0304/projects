import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import StarRating from 'react-native-star-rating';
import { Actions } from "react-native-router-flux";
import { TextField } from 'react-native-material-textfield';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as routineActions from '../../actions/routineActions';
const actions = [
  routineActions
];
function mapStateToProps(state) {
  return {
    routine: state.routine
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
      rating: 0,
      content: '',
      error: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.routine != this.props.routine) {
      if(nextProps.routine.closeModalReview) {
        this.props.onClosed()
      }
    }
   
  }

  onStarRatingPress(rating)
  {
    this.setState({
      rating: rating,
    })
  }

  routineReview() {
    dismissKeyboard()
    this.setState({
      error: ''
    })
    if(this.state.rating == 0) {
      this.setState({
        error: 'Bạn phải chấm điểm liệu trình này'
      })
      return
    }
    if(this.state.content == '') {
      this.setState({
        error: 'Bạn phải nhập đánh giá'
      })
      return
    }
    this.props.actions.routineReview(this.props.data.routine.id, this.state.rating, this.state.content)
  }

  render(){
    return (
      <View style={styles.content}>
        <View style={styles.boxContent}>
          <Text style={{color: '#8750A1', fontSize: 14}}>{'Viết đánh giá liệu trình'.toUpperCase()}</Text>
          <View style={styles.boxInput}>
            <Text style={styles.txtTitle}>Liệu trình</Text>
            <Text style={styles.txtContent}>{this.props.data.routine.title}</Text>
          </View>
          <View style={styles.boxInput}>
            <Text style={styles.txtTitle}>Chấm điểm</Text>
            <View style={styles.boxRating}>
              <View style={styles.rating}>
                <StarRating
                  emptyStar={require('../../images/icons/ic_start_old.png')}
                  fullStar={require('../../images/icons/ic_star_ok.png')}
                  halfStar={require('../../images/icons/ic_star_half.png')}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  maxStars={5}
                  rating={this.state.rating}
                  starSize={15}
                  margin={2}
                  starStyle={{marginRight: 2}}
                />
              </View>
              <Text style={styles.txtRating}>{this.state.rating}/5</Text>
            </View>
          </View>
          <TextField
            label='Đánh giá của bạn'
            autoCorrect={false}
            onChangeText={(content) => this.setState({content: content})}
            tintColor="#5A5E6F"
            textColor="#0E0E11"
            baseColor="#E9457A"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.content}
            multiline={true}
          />
        </View>
        {
          this.state.error ?
          <Text style={styles.txtError}>{this.state.error}</Text>
          : null
        }
        {
          this.props.routine.fetchingLoad ? 
            <View style={{flex: 1, marginTop: 20, alignItems: 'center'}}>
              <Image style={{width: 75,height: 75,}} source={require('../../images/spinner.gif')} />
            </View>
            :
            <View style={styles.boxAction}>
              <TouchableOpacity onPress={() => this.routineReview()} style={styles.buttonUpdate}>
                <Text style={styles.txtButtonUpdate}>Gửi đánh giá liệu trình</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} onPress={this.props.onClosed}>
                <Text style={styles.txtButtonCancel}>Bỏ qua</Text>
              </TouchableOpacity>
            </View>
        }
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txtError: {
    color: 'rgb(255, 183, 101)',
    fontSize: 16
  },
  content: {
    height: deviceHeight - 200,
    width: deviceWidth - 30,
    marginTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
 
  boxAction: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  boxInput: {
    marginTop: 20,
  },
  txtTitle: {
    color: '#C2C5D0',
    fontSize: 12,
    marginBottom: 3
  },
  txtContent: {
    color: '#0E0E11',
    fontSize: 16
  },
  boxRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    alignItems: "flex-start",
    flexDirection: 'row'
  },
  txtRating: {
    color: '#C2C5D0',
    fontSize: 16
  },
  buttonUpdate: {
    width: 193,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#FE7535'
  },
  txtButtonUpdate: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  buttonCancel: {
    width: 105,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  txtButtonCancel: {
    fontSize: 14,
    color: '#FE7535'
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalReview);