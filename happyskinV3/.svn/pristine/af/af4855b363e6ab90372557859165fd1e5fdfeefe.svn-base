import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import { Actions } from "react-native-router-flux";
import Timeline from '../libs/react-native-timeline-listview'
import StarRating from 'react-native-star-rating';
class RoutineOld extends React.Component {
  constructor(){
    super()
    this.data = [
      {number: 1, title: 'Makeup Remover + Oil Cleanser', description: 'Sure, you could use your makeup remover on a cotton pad at night and call it a day, but that means you’ll most likely end up with black streaks…', textColor: '#7E7EA2', fontSize: 13},
      {number: 2, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
    ]
  }
  render() {
    return (
      <View style={styles.content}>
        <StatusBar
          backgroundColor="white"
          barStyle="default"
        />
        <ScrollView style={[styles.container, {marginTop: Platform.OS === 'ios' ? 20 : 0}]}>
          <View style={styles.boxTitle}>
            <Text style={styles.title}>Routine</Text>
          </View>
          <View style={styles.join}>
            <Text style={styles.titleJoin} onPress={() => Actions.routineList()}>Liệu trình bạn đang tham gia</Text>
          </View>
          <View style={styles.routineJoining}>
            <View style={styles.boxJoining}>
              <View style={styles.boxTitleJoining}>
                <Text style={styles.txtTitleJoining}>Tạm biệt mụn đầu đen vĩnh viễn</Text>
              </View>
              <View style={styles.boxTimeline}>
                <Timeline 
                  data={this.data}
                  timeContainerStyle={{minWidth:0}}
                  innerCircle={'number'}
                  circleSize={44}
                  circleColor={'#FFFFFF'}
                  circleStyle={{height: 22,width: 22,borderRadius: 11,alignItems: 'center',justifyContent: 'center',borderWidth: 1,borderColor: '#D8D8D8',position: 'absolute',left: 0,}}
                  rowContainerStyle={{marginLeft: 20,}}
                  lineColor={'#D8D8D8'}
                  titleStyle={{fontSize: 16, color: '#4A4A4A', fontWeight: '600'}}
                  descriptionStyle={{fontSize: 13, color: '#9B9B9B'}}
                />
              </View>
              <TouchableOpacity onPress={() => Actions.routineDetail()} style={styles.boxShowDetail}>
                <Text style={styles.txtShowDetail}>View Routine Detail</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.boxJoining}>
              <View style={styles.boxTitleJoining}>
                <Text style={styles.txtTitleJoining}>Dưỡng da ban đêm cùng Tammy Tran</Text>
              </View>
              <View style={styles.boxTimeline}>
                <Timeline 
                  data={this.data}
                  timeContainerStyle={{minWidth:0}}
                  innerCircle={'number'}
                  circleSize={44}
                  circleColor={'#FFFFFF'}
                  circleStyle={{height: 22,width: 22,borderRadius: 11,alignItems: 'center',justifyContent: 'center',borderWidth: 1,borderColor: '#D8D8D8',position: 'absolute',left: 0,}}
                  rowContainerStyle={{marginLeft: 20,}}
                  lineColor={'#D8D8D8'}
                  titleStyle={{fontSize: 16, color: '#4A4A4A', fontWeight: '600'}}
                  descriptionStyle={{fontSize: 13, color: '#9B9B9B'}}
                />
              </View>
              <TouchableOpacity onPress={() => Actions.routineDetail()} style={styles.boxShowDetail}>
                <Text style={styles.txtShowDetail}>View Routine Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.join}>
            <Text style={styles.titleJoin}>Liệu trình bạn đã tham gia</Text>
          </View>
          <View style={styles.routineJoined}>
            <View style={styles.boxJoining}>
              <View style={styles.boxImage}>
                <Image source={require('../images/thumb_routine.png')} style={styles.thumb_routine} />
              </View>
              <View style={styles.boxTitleJoined}>
                <Text style={styles.txtTitleJoined}>Tạm biệt mụn đầu đen vĩnh viễn</Text>
              </View>
              <View style={styles.boxRating}>
                <View style={styles.rating}>
                  <StarRating
                    disabled={true}
                    emptyStar={require('../images/icons/ic_start_old.png')}
                    fullStar={require('../images/icons/ic_star_ok.png')}
                    halfStar={require('../images/icons/ic_star_half.png')}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    maxStars={5}
                    rating={4}
                    starSize={13}
                    margin={2}
                    starStyle={{marginRight: 2}}
                  />
                  <Text style={styles.countReviewStar}> - 65 Reviews</Text>
                </View>
              </View>
              <View style={styles.boxAuthor}>
                <View style={styles.avatar}>
                  <Image source={require('../images/avatar_routine.png')} style={styles.avatar_routine} />
                </View>
                <View style={styles.boxInfo}>
                  <Text style={styles.txtUsername}>Siu Black</Text>
                  <Text style={styles.txtSkincare}>Expert in SkinCare</Text>
                </View>
              </View>
            </View>
            <View style={styles.boxJoining}>
              <View style={styles.boxImage}>
                <Image source={require('../images/thumb_routine.png')} style={styles.thumb_routine} />
              </View>
              <View style={styles.boxTitleJoined}>
                <Text style={styles.txtTitleJoined}>Tạm biệt mụn đầu đen vĩnh viễn</Text>
              </View>
              <View style={styles.boxRating}>
                <View style={styles.rating}>
                  <StarRating
                    disabled={true}
                    emptyStar={require('../images/icons/ic_start_old.png')}
                    fullStar={require('../images/icons/ic_star_ok.png')}
                    halfStar={require('../images/icons/ic_star_half.png')}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    maxStars={5}
                    rating={4}
                    starSize={13}
                    margin={2}
                    starStyle={{marginRight: 2}}
                  />
                  <Text style={styles.countReviewStar}> - 65 Reviews</Text>
                </View>
              </View>
              <View style={styles.boxAuthor}>
                <View style={styles.avatar}>
                  <Image source={require('../images/avatar_routine.png')} style={styles.avatar_routine} />
                </View>
                <View style={styles.boxInfo}>
                  <Text style={styles.txtUsername}>Siu Black</Text>
                  <Text style={styles.txtSkincare}>Expert in SkinCare</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  boxTitle: {
    paddingTop: 19,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 32,
  },
  join: {
    marginTop: 14,
    borderTopColor: '#F6F6F6',
    borderBottomColor: '#F6F6F6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  titleJoin: {
    fontSize: 17,
    paddingLeft: 15,
    paddingTop: 14,
    paddingBottom: 14,
  },
  routineJoining: {
    marginBottom: 20,
  },
  boxJoining: {
    marginTop: 18,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    shadowColor: "rgba(0, 0, 0, 9)",
    shadowOpacity: 0.2,
    shadowRadius: 7,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  boxTitleJoining: {
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
  },
  txtTitleJoining: {
    fontSize: 24
  },
  boxTimeline: {
    paddingBottom: 36,
  },
  boxShowDetail: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderTopWidth: 2,
    borderTopColor: '#F2E9E9'
  },
  txtShowDetail: {
    fontSize: 16,
    color: '#FE7535'
  },
  routineJoined: {
    marginBottom: 30
  },
  boxImage: {
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  thumb_routine: {
    height: 128,
  },
  boxTitleJoined: {
    padding: 15,
  },
  txtTitleJoined: {
    fontSize: 24,
  },
  boxRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  rating: {
    alignItems: "flex-start",
    flexDirection: 'row'
  },
  countReviewStar: {
    fontSize: 12,
    color: '#6D6F73'
  },
  boxAuthor: {
    alignItems: "flex-start",
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 25,
  },
  avatar: {
    paddingLeft: 15,
    overflow: 'hidden',
    borderRadius: 8,
  },
  avatar_routine: {
    width: 48,
    resizeMode: 'cover',
  },
  boxInfo: {
    width: deviceWidth - 48 - 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  txtUsername: {
    fontSize: 16,
    color: '#FE7535',
  },
  txtSkincare: {
    fontSize: 12,
    color: '#6D6F73',
  }
});

export default RoutineOld;
