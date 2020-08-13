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
  Dimensions,
  StatusBar,
  Platform,
  Alert,
  InteractionManager
} from "react-native";
import Button from "react-native-button";
import Toast from 'react-native-simple-toast';
import {Actions} from "react-native-router-flux";
import ImagePicker from 'react-native-image-crop-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import ModalMenu from '../components/profile/ModalMenu';
import ReviewList from '../components/ReviewList'
import StarRating from 'react-native-star-rating';
import ModalReview from '../components/routine/ModalReview';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Modal = require('react-native-modalbox');
var DeviceInfo = require('react-native-device-info');

import * as profileActions from '../actions/profileActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';

const actions = [
  profileActions
];

function mapStateToProps(state) {
  return {
    profile: state.profile,
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

class CoachProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalReview: false,
      error: '',
      routine: '',
      avatar: this.props.profile.otherProfile.avatar ? this.props.profile.otherProfile.avatar : '',
      users: [
        {
          avatar: 'https://statics.happyskin.vn/images/avatars/ce2e8044aafdcda1cc579cbf43860d9c/thanhhuyenbui180991_dFyietopeP_100x100.png',
          user_name: 'Eddy278'
        },
        {
          avatar: 'https://statics.happyskin.vn/images/avatars/ce2e8044aafdcda1cc579cbf43860d9c/vmtrang96_N0gwbWtIHZ_100x100.png',
          user_name: 'Eddy278'
        },
        {
          avatar: 'https://statics.happyskin.vn/images/avatars/ce2e8044aafdcda1cc579cbf43860d9c/thaogiang1213_uz6NRo_100x100.png',
          user_name: 'Eddy278'
        },
        {
          avatar: 'https://statics.happyskin.vn/images/avatars/ce2e8044aafdcda1cc579cbf43860d9c/tinhyeumaymancuatoi_U9XW4jdDOb_100x100.png',
          user_name: 'Eddy278'
        }
      ],
      routine: [
        {
          title: 'Trị nám dành cho da dầu',
          star: 3,
          date: '4 tuần',
          count_member: 67,
        },
        {
          title: 'Trị nám dành cho da dầu',
          star: 3,
          date: '4 tuần',
          count_member: 67,
        },
        {
          title: 'Trị nám dành cho da dầu',
          star: 3,
          date: '4 tuần',
          count_member: 67,
        },
        {
          title: 'Trị nám dành cho da dầu',
          star: 3,
          date: '4 tuần',
          count_member: 67,
        }
      ],
      review: [
        {
          avatar: 'https://statics.happyskin.vn/images/avatars/ce2e8044aafdcda1cc579cbf43860d9c/fb-820058734847233_oZqhrq.png',
          userName: 'Tammy Ng.',
          star: 4,
          nameRoutine: 'Trị mụn trong 7 ngày',
          time: '7 ngày trước',
          content: 'Liệu trình rất tốt. Mình đã tham gia và đạt hiệu quả rõ rệt chỉ sau 7 ngày.'
        },
        {
          avatar: 'https://statics.happyskin.vn/images/avatars/ce2e8044aafdcda1cc579cbf43860d9c/fb-820058734847233_oZqhrq.png',
          userName: 'July2109',
          star: 4,
          nameRoutine: '· Không sợ nhám',
          time: '7 ngày trước',
          content: 'Tuyệt vời, đây là một review ngắn chỉ 2 dòng nhưng rất tuyệt vời.'
        }
      ],
      intro: 'Lời giới thiệu về liệu trình nói trên. Được coach soạn, không quá 500 từ vì không cần thiết phải nói nhiều, về mẹo, về đối tượng phù hợp nhất và cam kết khi tham gia liệu trình. Chúc các bạn vui vẻ.'
    }
  }

  componentWillMount() {
    this.props.actions.otherProfileRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.otherProfile(this.props.id);
    })
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.profile !=  this.props.profile) {
      this.setState({
        avatar: nextProps.profile.otherProfile.avatar
      })
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{flex: 1, paddingTop: Platform.OS == 'ios' ? 20 :  DeviceInfo.getSystemVersion().slice(0, 1) != 4 ? StatusBar.currentHeight : 0}}>
            <View style={styles.containerAvatar}>
              <Image style={{width: deviceWidth,position: 'absolute', height: 220, resizeMode: 'stretch'}} source={require('../images/bg_profile1.png')} />
              <Image style={{width: deviceWidth,position: 'absolute', height: 220, resizeMode: 'stretch'}} source={require('../images/background_cover.png')} />
              <Image style={styles.avatar} source={this.state.avatar ? {uri: this.state.avatar+ '.png'} : require('../images/avatar.png')}/>
              <TouchableOpacity onPress={() => Actions.pop()} style={{position: 'absolute', top: 6, left: 7,padding: 8,alignItems: 'center', flexDirection: 'row'}}>
                <Image style={{height: 12, width: 13,marginRight: 7}} source={require('../images/icons/ic_back_blue2.png')} />
                <Text style={{color: 'rgb(68, 110, 182)', backgroundColor: 'transparent'}}>Quay lại</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerName}>
              <Text style={styles.txtName}>{this.props.userName ? this.props.userName : this.props.profile.otherProfile.full_name}</Text>
              <Image style={{height: 20, width: 22}} source={require('../images/icons/ic_heart_pink_small.png')} />
            </View>
            {
              this.props.profile.isFetching ?
              <View style={main.mainSpinTop}>
                <Image style={main.imgLoading} source={require('../images/spinner.gif')} />
              </View>
              :
              <View>
                <Text style={styles.txtSkinCare}>Chuyên gia chăm sóc da</Text>
                <View style={styles.ctCount}>
                  <View style={styles.ctLike}>
                    <Text style={styles.txtCount}>627</Text>
                    <View style={styles.ctText}>
                      <Image source={require('../images/icons/ic_subscriber_pink.png')} />
                      <Text style={styles.txtLike}>Người tham gia</Text>
                    </View>
                  </View>
                  <View style={styles.ctLike}>
                    <Text style={styles.txtCount}>2223</Text>
                    <View style={styles.ctText}>
                      <Image style={{height: 11, width: 11}} source={require('../images/icons/ic_sun_pink.png')} />
                      <Text style={styles.txtLike}>Cám ơn</Text>
                    </View>
                  </View>
                  <View style={styles.ctLike}>
                    <Text style={styles.txtCount}>16</Text>
                    <View style={styles.ctText}>
                      <Image style={{height: 10, width: 11}} source={require('../images/icons/ic_heart_pink_small.png')} />
                      <Text style={styles.txtLike}>Thích</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.ctIntro}>
                  <Text style={styles.txtIntro}>GIỚI THIỆU</Text>
                  <Text style={styles.contentIntro}>{this.state.intro}</Text>
                  <View style={{flexWrap: 'wrap', flexDirection: 'row', marginTop: 9, paddingBottom: 22}}>
                    <View style={styles.ctFb}>
                      <Image style={styles.icFb} source={require('../images/icons/ic_fb2.png')} />
                      <Text style={styles.txtFb}>Hanna Huynh</Text>
                    </View>
                    <View style={styles.ctFb}>
                      <Image style={styles.icFb} source={require('../images/icons/ic_youtube_red.png')} />
                      <Text style={styles.txtYoutube}>Hanna Channel</Text>
                    </View>
                    <View style={styles.ctFb}>
                      <Image style={styles.icFb} source={require('../images/icons/ic_instagram_orange.png')} />
                      <Text style={styles.txtIstan}>hann.890</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.ctRoutine}>
                  <Text style={styles.txtRoutines}>CÁC LIỆU TRÌNH CỦA COACH HANNAH</Text>
                  <View style={{paddingRight: 15}} >
                    <ReviewList data={this.state.routine} />
                  </View>
                </View>

                <View style={styles.ctFeedBack}>
                  <Text style={styles.txtFeedBack}>FEDDBACK</Text>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
                  {
                    this.state.users.map((item, index) => {
                      return (
                        <View style={styles.itemFeedBack}>
                          <View style={{width: 135, height: 149}}>
                            <Image style={{width: 135, height: 149, borderRadius: 2}} source={{uri: item.avatar}} />
                            <View style={{position: 'absolute',borderTopRightRadius: 2, borderBottomRightRadius: 2,right: 0, width: 66, height: 149, backgroundColor: 'rgba(0,0,0,0.7)'}}/>
                          </View>
                          <Text style={styles.txtUserFeedBack}>{item.user_name}</Text>                     
                        </View>
                      )
                    })
                  }
                  </ScrollView>
                </View>

                <View style={styles.ctReview}>
                  <Text style={{color: 'rgb(135, 80, 161)', marginBottom: 13}}>PHẢN HỒI TỪ NGƯỜI THAM GIA</Text>
                  {
                    this.state.review.map((item, index) => {
                      return(
                        <View style={styles.ctItemReview}>
                          <Image style={styles.avatarReview} source={{uri: item.avatar}} />
                          <View style={styles.ctRightReview}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                              <Text style={{color: 'rgb(135, 155, 206)'}}>{item.userName}</Text>
                              <Text style={{fontSize: 12, color: 'rgb(138, 138, 143)'}}>{item.time}</Text>
                            </View>
                            <View style={styles.rating}>
                              <StarRating
                                disabled={true}
                                emptyStar={'star'}
                                fullStar={'star'}
                                halfStar={'star-half-o'}
                                iconSet={'FontAwesome'}
                                maxStars={5}
                                rating={item.star}
                                emptyStarColor={'rgb(224, 224, 225)'}
                                starSize={13}
                                starColor={'rgb(225, 117, 54)'}
                                starStyle={{marginRight: 2}}
                              />
                              <Text style={{flex: 1,color: 'rgb(135, 155, 206)', marginLeft: 5}}>{item.nameRoutine}</Text>
                            </View>
                            <Text style={{color: 'rgb(92, 92, 92)', marginTop: 5}}>{item.content}</Text>
                          </View>
                        </View>
                      )
                    })
                  }
                  {/* <View style={{flexDirection: 'row'}}>
                    <Button 
                      onPress={() => this.setState({modalReview: true})}
                      containerStyle={{ backgroundColor:"rgb(254, 117, 53)", borderRadius: 4, height: 40, marginTop: 20, marginLeft: 55,paddingLeft: 18, paddingRight: 18, alignItems: 'center', justifyContent: 'center'}}
                      style={styles.txtWrite}
                      >
                      Viết đánh giá liệu trình
                    </Button>
                  </View> */}
                </View>
              </View>
            }
          </View>
        </ScrollView>
        <Modal style={styles.modal}
          isOpen={this.state.modalReview}
          ref={"modalReview"}
          swipeToClose={true}
          position={"center"}
          onClosed={()=> this.setState({modalReview: false})}>
          <ModalReview data={this.state.routine} onClosed={()=> this.setState({modalReview: false})} />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    height: deviceHeight - 200,
    width: deviceWidth - 30,
    borderRadius: 2
  },
  txtWrite: {
    fontSize: 16,
    color: '#fff'
  },
  ctRightReview: {
    paddingTop: 13,
    marginLeft: 10, 
    flex: 1, 
    paddingBottom: 17, 
    borderBottomColor: 'rgb(236, 238, 240)', 
    borderBottomWidth: 1,
    borderTopColor: 'rgb(236, 238, 240)',
    borderTopWidth: 1
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  avatarReview: {
    height: 40, 
    width: 40,
    borderRadius: 20,
    marginTop: 13
  },
  ctItemReview: {
    flexDirection: 'row'
  },
  ctReview: {
    paddingTop: 22,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  ctIntro: {
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    paddingTop: 22,
    borderBottomColor: 'rgb(236, 238, 240)'
  },
  ctLike: {
    flex: 1,
  },
  ctText: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ctFb: {
    width: (deviceWidth - 30)/2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7
  },
  icFb: {
    width: 24,
    height: 24,
    marginRight: 11
  },
  txtFb: {
    color: 'rgb(68, 110, 182)',
    fontWeight: 'bold'
  },
  txtYoutube: {
    color: 'rgb(215, 53, 84)',
    fontWeight: 'bold'
  },
  txtIstan: {
    color: 'rgb(215, 117, 54)',
    fontWeight: 'bold'
  },
  txtDate: {
    marginTop: 7,
    color: 'rgb(51, 51, 51)'
  },
  ctCount: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgb(236, 238, 240)',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 17,
    paddingBottom: 17
  },
  containerAvatar: {
    height: 220,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  txtLike: {
    fontSize: 12,
    color: 'rgb(243, 174, 193)',
    marginLeft: 3
  },
  txtIntro: {
    color: 'rgb(135, 80, 161)'
  },
  contentIntro: {
    color: 'rgb(51, 51, 51)',
    fontSize: 15,
    marginTop: 11,
  },
  txtCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(233, 69, 122)'
  },
  avatar: {
    height: 130, 
    width: 130,
    borderRadius: 65,
    borderWidth: 6,
    borderColor: '#fff'
  },
  containerName: {
    marginTop: 20,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  txtSkinCare: {
    color: 'rgb(215, 53, 84)',
    marginLeft: 15,
    marginBottom: 14,
  },
  txtName: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold'
  },
  ctRoutine: {
    paddingLeft: 15,
    paddingTop: 22,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 238, 240)'
  },
  txtRoutines: {
    color: 'rgb(135, 80, 161)',
    marginBottom: 15,

  },
  ctFeedBack: {
    paddingTop: 22, 
    paddingLeft: 15,
    paddingBottom: 21,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 238, 240)'
  },
  txtFeedBack: {
    color: 'rgb(135, 80, 161)',
    marginBottom: 15
  },
  itemFeedBack: {
    marginRight: 5
  },
  txtUserFeedBack: {
    color: 'rgb(135, 155, 206)',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 7
  },
});
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(CoachProfile);
