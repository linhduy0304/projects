import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
	Platform,
	InteractionManager
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import {Actions} from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import StarRating from 'react-native-star-rating';
import Slider from 'react-native-slider';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Map} from 'immutable';
import * as routineActions from '../actions/routineActions';
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

class RoutineDetail extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
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
    }
    this.data = [
      {number: 1, title: 'Makeup Remover + Oil Cleanser', description: 'Sure, you could use your makeup remover on a cotton pad at night and call it a day, but that means you’ll most likely end up with black streaks…', textColor: '#7E7EA2', fontSize: 13},
      {number: 2, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
      {number: 3, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
    ]
  }

  _handerOnScroll(e) {
    if (e.nativeEvent.contentOffset.y > 0) {
      this.state.scrollY.setValue(e.nativeEvent.contentOffset.y);
    }
	}
	
	componentWillMount() {
    this.props.actions.rtDetailRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 12000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.routineDetail(this.props.id);
    })
  }

	render() {
		const headerHeight = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [150, 75],
      extrapolate: 'clamp',
    });
    const navTranslate = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 75],
      outputRange: [0, -75],
      extrapolate: 'clamp',
    });
    const navOpacity = Animated.diffClamp(this.state.scrollY, 0, 75).interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.content}>
      	<View style={main.container}>
	        <View style={{flex: 1}}>
		        	<ScrollView
		            style={styles.scrollView}
		            onScroll={ (e) => this._handerOnScroll(e) }
		            scrollEventThrottle={16}
		            bounces={false}
		          >
							<View style={{marginTop: 45}}>
		          	<View style={styles.boxThumbContent}>
			          	<View style={styles.boxContent}>
			          		<View style={styles.boxImage}>
		                  <Image source={{uri: this.props.routine.routineDetail.image_thumb+'.png'}} style={styles.thumb_routine} />
		                </View>
		                <View style={styles.boxDescription}>
		                	<View style={styles.boxTitle}>
		                		<Text style={styles.txtTitle}>{this.props.routine.routineDetail.title}</Text>
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
				                    rating={this.props.routine.routineDetail.raty_score}
				                    starSize={13}
				                    margin={2}
				                    starStyle={{marginRight: 2}}
				                  />
				                </View>
						          </View>
		                </View>
			          	</View>
			          	<View style={styles.boxIntroduce}>
			          		<Text style={styles.txtIntroduce}>{'Giới thiệu'.toUpperCase()}</Text>
			          	</View>
			          	<View style={styles.boxContentIntroduce}>
			          		<Text style={styles.txtContentIntroduce}>{this.props.routine.routineDetail.introduce}</Text>
			          	</View>
			          	<View style={styles.boxList}>
									{
										this.props.routine.routineDetail.info ?
										this.props.routine.routineDetail.info.map((item, index) => {
											return (
												<View key={index} style={styles.boxListDetail}>
													<Text style={styles.txtDetailTitle}>{item.label}</Text>
													<Text style={styles.txtDetailContent}>{item.content}</Text>
												</View>
											)
										}) : null
									}
			          	</View>
		          	</View>
		          	<View style={styles.boxProducts}>
		          		<View style={styles.boxTopReview}>
	          				<Text style={styles.txtSkinCoach}>{'Nhật ký liệu trình'.toUpperCase()}</Text>
		          		</View>
		          		<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
		              {
		                this.state.users.map((item, index) => {
		                  return (
		                    <View key={index} style={styles.itemFeedBack}>
		                      <View style={{width: 135, height: 149}}>
		                        <Image style={{width: 135, height: 149, borderRadius: 2}} source={{uri: item.avatar}} />
		                      </View>
		                      <Text style={styles.txtUserFeedBack}>{item.user_name}</Text>                     
		                    </View>
		                  )
		                })
		              }
		              </ScrollView>
	              </View>
		          	<View style={styles.boxSkinCoach}>
		          		<View style={styles.boxTopSkinCoach}>
	          				<Text style={styles.txtSkinCoach}>{'Được hướng dẫn bởi Coach'.toUpperCase()}</Text>
		          		</View>
		          		<View style={styles.boxAuthor}>
		          			<View style={styles.avatar}>
		                  <Image source={this.props.routine.routineDetail.author ? {uri: this.props.routine.routineDetail.author.avatar+ '_100x100.png'} : null} style={styles.avatar_routine} />
		                </View>
		                <View style={styles.boxInfo}>
		                  <Text style={styles.txtUsername}>{this.props.routine.routineDetail.author ? this.props.routine.routineDetail.author.full_name : ''}</Text>
		                  <Text style={styles.txtSkincare}>Expert in SkinCare</Text>
		                </View>
		          		</View>
		          	</View>
	              <View style={styles.boxReviews}>
		          		<View style={styles.boxTopReview}>
	          				<Text style={styles.txtSkinCoach}>{'Review'.toUpperCase()}</Text>
		          		</View>
		          		<View style={styles.boxScoreReview}>
		          			<Text style={styles.txtScoreReview}>{this.props.routine.routineDetail.raty_score}</Text>
		          			<Text style={styles.txtCountReview}>{this.props.routine.routineDetail.raty_count} lượt đánh giá.</Text>
		          		</View>
		          		<View style={styles.boxInfoRating}>
		          			<View style={styles.boxListRating}>
		          				<View style={[styles.rating, {flex: 0.28}]}>
			          				<StarRating
			                    disabled={true}
			                    emptyStar={require('../images/icons/ic_start_old.png')}
			                    fullStar={require('../images/icons/ic_star_ok.png')}
			                    halfStar={require('../images/icons/ic_star_half.png')}
			                    selectedStar={(rating) => this.onStarRatingPress(rating)}
			                    maxStars={5}
			                    rating={5}
			                    starSize={13}
			                    margin={4}
			                    starStyle={{marginRight: 2}}
			                  />
		                  </View>
		                  <View style={{flex: 0.075}}>
		        						<Text style={styles.txtRating}>{this.props.routine.routineDetail.raty_1}</Text>
		        					</View>
		        					<View style={{flex: 0.645}}>
		          					<Slider
						              maximumValue={100}
						              minimumValue={0}
						              value={this.props.routine.routineDetail.raty_1}
						              minimumTrackTintColor="#FF7536"
						              maximumTrackTintColor="#E7E7F0"
						              thumbTintColor="#FF7536"
						              thumbStyle={{width: 0, height: 0}}
						              thumbTouchSize={{width: 0, height: 0}}
						              animateTransitions={true}
						              animationType="spring"
						              disabled={true}
						            />
					            </View>
					          </View>
					          <View style={styles.boxListRating}>
		          				<View style={[styles.rating, {flex: 0.28}]}>
			          				<StarRating
			                    disabled={true}
			                    emptyStar={require('../images/icons/ic_start_old.png')}
			                    fullStar={require('../images/icons/ic_star_ok.png')}
			                    halfStar={require('../images/icons/ic_star_half.png')}
			                    selectedStar={(rating) => this.onStarRatingPress(rating)}
			                    maxStars={5}
			                    rating={4}
			                    starSize={13}
			                    margin={4}
			                    starStyle={{marginRight: 2}}
			                  />
		                  </View>
		                  <View style={{flex: 0.075}}>
		        						<Text style={styles.txtRating}>{this.props.routine.routineDetail.raty_2}</Text>
		        					</View>
		        					<View style={{flex: 0.645}}>
		          					<Slider
						              maximumValue={100}
						              minimumValue={0}
						              value={this.props.routine.routineDetail.raty_2}
						              minimumTrackTintColor="#FF7536"
						              maximumTrackTintColor="#E7E7F0"
						              thumbTintColor="#FF7536"
						              thumbStyle={{width: 0, height: 0}}
						              thumbTouchSize={{width: 0, height: 0}}
						              animateTransitions={true}
						              animationType="spring"
						              disabled={true}
						            />
					            </View>
					          </View>
					          <View style={styles.boxListRating}>
		          				<View style={[styles.rating, {flex: 0.28}]}>
			          				<StarRating
			                    disabled={true}
			                    emptyStar={require('../images/icons/ic_start_old.png')}
			                    fullStar={require('../images/icons/ic_star_ok.png')}
			                    halfStar={require('../images/icons/ic_star_half.png')}
			                    selectedStar={(rating) => this.onStarRatingPress(rating)}
			                    maxStars={5}
			                    rating={3}
			                    starSize={13}
			                    margin={4}
			                    starStyle={{marginRight: 2}}
			                  />
		                  </View>
		                  <View style={{flex: 0.075}}>
		        						<Text style={styles.txtRating}>{this.props.routine.routineDetail.raty_3}</Text>
		        					</View>
		        					<View style={{flex: 0.645}}>
		          					<Slider
						              maximumValue={100}
						              minimumValue={0}
						              value={this.props.routine.routineDetail.raty_3}
						              minimumTrackTintColor="#FF7536"
						              maximumTrackTintColor="#E7E7F0"
						              thumbTintColor="#FF7536"
						              thumbStyle={{width: 0, height: 0}}
						              thumbTouchSize={{width: 0, height: 0}}
						              animateTransitions={true}
						              animationType="spring"
						              disabled={true}
						            />
					            </View>
					          </View>
					          <View style={styles.boxListRating}>
		          				<View style={[styles.rating, {flex: 0.28}]}>
			          				<StarRating
			                    disabled={true}
			                    emptyStar={require('../images/icons/ic_start_old.png')}
			                    fullStar={require('../images/icons/ic_star_ok.png')}
			                    halfStar={require('../images/icons/ic_star_half.png')}
			                    selectedStar={(rating) => this.onStarRatingPress(rating)}
			                    maxStars={5}
			                    rating={2}
			                    starSize={13}
			                    margin={4}
			                    starStyle={{marginRight: 2}}
			                  />
		                  </View>
		                  <View style={{flex: 0.075}}>
		        						<Text style={styles.txtRating}>{this.props.routine.routineDetail.raty_4}</Text>
		        					</View>
		        					<View style={{flex: 0.645}}>
		          					<Slider
						              maximumValue={100}
						              minimumValue={0}
						              value={this.props.routine.routineDetail.raty_4}
						              minimumTrackTintColor="#FF7536"
						              maximumTrackTintColor="#E7E7F0"
						              thumbTintColor="#FF7536"
						              thumbStyle={{width: 0, height: 0}}
						              thumbTouchSize={{width: 0, height: 0}}
						              animateTransitions={true}
						              animationType="spring"
						              disabled={true}
						            />
					            </View>
					          </View>
					          <View style={styles.boxListRating}>
		          				<View style={[styles.rating, {flex: 0.28}]}>
			          				<StarRating
			                    disabled={true}
			                    emptyStar={require('../images/icons/ic_start_old.png')}
			                    fullStar={require('../images/icons/ic_star_ok.png')}
			                    halfStar={require('../images/icons/ic_star_half.png')}
			                    selectedStar={(rating) => this.onStarRatingPress(rating)}
			                    maxStars={5}
			                    rating={1}
			                    starSize={13}
			                    margin={4}
			                    starStyle={{marginRight: 2}}
			                  />
		                  </View>
		                  <View style={{flex: 0.075}}>
		        						<Text style={styles.txtRating}>{this.props.routine.routineDetail.raty_5}</Text>
		        					</View>
		        					<View style={{flex: 0.645}}>
		          					<Slider
						              maximumValue={100}
						              minimumValue={0}
						              value={this.props.routine.routineDetail.raty_5}
						              minimumTrackTintColor="#FF7536"
						              maximumTrackTintColor="#E7E7F0"
						              thumbTintColor="#FF7536"
						              thumbStyle={{width: 0, height: 0}}
						              thumbTouchSize={{width: 0, height: 0}}
						              animateTransitions={true}
						              animationType="spring"
						              disabled={true}
						            />
					            </View>
					          </View>
		          		</View>

									{
										this.props.routine.routineDetail.user_raties ? 
										this.props.routine.routineDetail.user_raties.length == 0 ? null :
										this.props.routine.routineDetail.user_raties.map((item, index) => {
											return (
												<View key={index} style={styles.boxUserReview}>
													<View style={styles.boxAvatarUser}>
														<Image source={{uri: item.user_data.avatar+ '_100x100.png'}} style={styles.avatarUser} />
													</View>
													<View style={styles.boxContentReview}>
														<View style={styles.boxUserRating}>
															<View style={styles.boxUserInfo}>
																<Text style={styles.txtUsernameRating}>{item.user_data.full_name}</Text>
																<View style={styles.boxRating}>
																	<StarRating
																		disabled={true}
																		emptyStar={require('../images/icons/ic_start_old.png')}
																		fullStar={require('../images/icons/ic_star_ok.png')}
																		halfStar={require('../images/icons/ic_star_half.png')}
																		selectedStar={(rating) => this.onStarRatingPress(rating)}
																		maxStars={5}
																		rating={item.raty_score}
																		starSize={13}
																		margin={4}
																		starStyle={{marginRight: 2}}
																	/>
																</View>
															</View>
															<View>
																<Text style={styles.txtTimeAgo}>{<TimeAgo time={item.created_at}/>}</Text>
															</View>
														</View>
														{/* <View style={styles.boxImageRating} >
															<ScrollView style={{}} horizontal={true}>
																<TouchableOpacity onPress={() => null}>
																	<Image style={styles.img} source={require('../../images/img_review1.png')}/>
																</TouchableOpacity>
																<TouchableOpacity onPress={() => null}>
																	<Image style={styles.img} source={require('../../images/img_review2.png')}/>
																</TouchableOpacity>
																<TouchableOpacity onPress={() => null}>
																	<Image style={styles.img} source={require('../../images/img_review3.png')}/>
																</TouchableOpacity>
															</ScrollView>
														</View> */}
														<View style={styles.boxContentRating}>
															<Text style={styles.txtContent}>{item.comment}</Text>
														</View>
													</View>
												</View>
											)
										}): null
									}
		          		
	              </View>
							</View>
		          </ScrollView>
						{
							this.props.routine.isFetching ?
							<View style={main.mainSpin1}>
								<Image style={main.imgLoading} source={require('../images/rolling.gif')} />
							</View>
							: null
          	}
		        <Animated.View style={[styles.footer,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
		        	<View style={styles.boxInfoReview}>
			          <View style={styles.boxInfoPrice}>
			            <Text style={styles.price}>$ 10</Text>
			            <Text style={styles.time}>/ month</Text>
			          </View>
		          </View>
							{
								this.props.routine.routineDetail.is_join ==  1 ?
									<View style={styles.boxSubscribe}>
										<Text style={styles.txtSubscribe}>Đã tham gia</Text>
									</View>
								: 
									<TouchableOpacity onPress={() => this.props.actions.routineJoin(this.props.id)} style={styles.boxSubscribe}>
										<Text style={styles.txtSubscribe}>Tham gia</Text>
									</TouchableOpacity>
							}
		        </Animated.View>
	        </View>
	        <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
              <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
								<Text style={styles.txtBack}>Liệu trình</Text>
              </NavButton>
            </NavBar>
          </Animated.View>
	      </View>
      </View>
    )
  }
}
const HEADER_MAX_HEIGHT = 64;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const FOOTER_MAX_HEIGHT = 0;
const FOOTER_MIN_HEIGHT = -64;
const FOOTER_SCROLL_DISTANCE = FOOTER_MAX_HEIGHT - FOOTER_MIN_HEIGHT;

let main = require('../styles/Main');
const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	customerNav: {
		height: 44,
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	customerNavBack: {
		padding: 15,
		paddingLeft: Platform.OS === 'ios' ? 7 : 15,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	navBack: {
		width: 8,
		height: 14,
		marginRight: 5
	},
	customerNavSave: {
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	navSave: {
		width: 15,
		height: 22
	},
	txtBack: {
		fontSize: 14,
		color: '#446EB6',
		paddingLeft: 7
	},
	container: {
		flex: 1,
	},
	scrollView: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 50,
    paddingTop: 10,
    width: deviceWidth,
    flex: 1,
  },
  boxThumbContent: {
  	marginLeft: 15,
  	borderBottomWidth: 1,
  	borderBottomColor: '#ECEEF0'
  },
  boxContent: {
  	alignItems: "flex-start",
    flexDirection: 'row',
    marginBottom: 10,
  	paddingRight: 15,
  },
  boxImage: {
  	paddingRight: 26,
  },
  thumb_routine: {
    height: 114,
    width: 114,
    borderRadius: 8
  },
  boxDescription: {
  	width: deviceWidth - 170
  },
  boxTitle: {
  	marginBottom: 10,
  },
  txtTitle: {
  	fontSize: 24,
  	color: '#333333'
  },
  boxIntroduce: {
  	paddingTop: 15,
  },
  txtIntroduce: {
  	fontSize: 14,
  	color: '#8750A1'
  },
  boxContentIntroduce: {
  	paddingTop: 15,
  	paddingBottom: 15,
  	paddingRight: 15,
  },
	txtContentIntroduce: {
		fontSize: 15,
		color: '#5C5C5C'
	},
	boxList: {
	},
	boxListDetail: {

	},
	txtDetailTitle: {
		color: '#879BCE',
		fontSize: 14,
		paddingBottom: 10,
	},
	txtDetailContent: {
		color: '#333333',
		fontSize: 15,
		paddingBottom: 10,
	},
  boxSkinCoach: {
  	paddingTop: 30,
  	paddingBottom: 30,
  	marginLeft: 15,
  	borderBottomWidth: 1,
  	borderBottomColor: '#ECEEF0'
  },
  boxTopSkinCoach: {
  	justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'flex-end'
  },
  txtSkinCoach: {
  	fontSize: 14,
  	color: '#8750A1'
  },
  boxScoreReview: {
  	flexDirection: 'row',
  	alignItems: 'flex-end'
  },
  txtScoreReview: {
  	fontSize: 24,
  	color: '#292A39',
  	paddingRight: 15,
  },
  txtCountReview: {
  	color: '#8A8A8F',
  	fontSize: 14,
  },
  boxInfoRating: {
  	paddingBottom: 15,
  	paddingRight: 15,
  },
  boxListRating: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  txtRating: {
  	fontSize: 10,
  	color: '#8A8A8F'
  },
  txtView: {
  	fontSize: 10,
  	color: '#9DA3B4'
  },
  boxAuthor: {
    alignItems: "flex-start",
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 5,
  },
  avatar_routine: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  boxInfo: {
  	width: deviceWidth - 56 - 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  txtUsername: {
    fontSize: 24,
    color: '#292A39',
  },
  txtSkincare: {
  	paddingTop: 5,
    fontSize: 14,
    color: '#6D6F73',
  },
  txtContent: {
  	fontSize: 16,
  	color: '#333333',
  },
  boxProducts: {
  	paddingTop: 30,
  	paddingBottom: 35,
  	paddingLeft: 15,
  	paddingRight: 15,
  	backgroundColor: '#FFFFFF'
  },
  boxTimeline: {
  	paddingTop: 25,
  	paddingBottom: 20
  },
  boxReviews: {
  	paddingTop: 30,
  	paddingBottom: 35,
  	backgroundColor: '#FFFFFF',
  	marginLeft: 15,
  	borderBottomWidth: 1,
  	borderBottomColor: '#ECEEF0',
  },
  boxTopReview: {
  	justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingRight: 15,
		paddingBottom: 20
  },
  boxUserReview: {
  	paddingRight: 15,
  	alignItems: "flex-start",
    flexDirection: 'row',
    paddingBottom: 15,
  },
  boxAvatarUser: {
  	paddingRight: 15,
  },
  avatarUser: {
  	width: 40,
  	height: 40,
  	borderRadius: 20
  },
  boxContentReview: {
  	width: deviceWidth - 40 - 45,
  },
  boxUserRating: {
  	justifyContent: 'space-between',
		flexDirection: 'row',
  },
  txtUsernameRating: {
  	fontSize: 14,
  	color: '#446EB6',
  	paddingBottom: 3,
  },
  txtTimeAgo: {
  	fontSize: 12,
  	color: '#6D6F73',
  },
  boxContentRating: {
  	paddingRight: 5
  },
  txtContent: {
  	fontSize: 16,
  	color: '#333333'
  },
  boxImageRating: {
  	paddingBottom: 10
  },
  img: {
  	height: 64,
    width: 64,
    borderRadius: 4,
    marginRight: 7
  },
  footer: {
  	height: 64,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#F6F6F6',
    width: deviceWidth,
    paddingLeft: 15,
    paddingRight: 8,
    justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
  },
  boxInfoReview: {
  	paddingTop: 8
  },
  boxInfoPrice: {
  	justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingTop: 4,
		paddingBottom: 4,
  },
  price: {
  	fontSize: 24,
  	color: '#446EB6',
  },
  time: {
  	fontSize: 14,
  	color: '#454553'
  },
  boxRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  rating: {
    alignItems: "flex-start",
    flexDirection: 'row'
  },
  countReviewStar: {
    fontSize: 12,
    color: '#6D6F73'
  },
  boxSubscribe: {
  	backgroundColor: '#446EB6',
  	alignItems: 'center',
  	justifyContent: 'center',
  	paddingLeft: 30,
  	paddingRight: 30,
  	height: 40
  },
  txtSubscribe: {
  	color: '#FFFFFF',
  	fontSize: 20,
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
export default connect(mapStateToProps, mapDispatchToProps)(RoutineDetail);