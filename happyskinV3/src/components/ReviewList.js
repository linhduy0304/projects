import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
	ScrollView,
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import { Actions } from "react-native-router-flux";
import Carousel from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
		},
		home= this.props.home
  }

  _renderItem ({item, index}) {
			return (
				<View style={styles.boxSlide}>
					<View style={styles.slide}>
						<View style={{flexDirection: 'row'}}>
							<Text style={styles.txtRoutine}>{ item.title }</Text>
							{this.home == 'home' ?
								null
								:
								<Image style={{width: 15, height: 22}} source={require('../images/icons/ic_save_blue_1.png')} />
							}
						</View>
						<View style={{width: 100}}>
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
							</View>
						</View>
						{
							this.home == 'home' ?
							<View>
								<View style={styles.ctLine}/>
								<Text style={{color: 'rgb(138, 138, 143)'}}>bởi <Text style={{color: 'rgb(51, 51, 51)'}}>{item.userName}</Text></Text>
							</View>
							: 
							<Text style={styles.txtDate}>{item.date}</Text>
						
						}
						<Text style={styles.txtDate}>{item.count_member} Người tham gia</Text>
							{item.image_thumb && item.image_thumb.length > 0 ?
								<View style={styles.boxImage}>
										{
											item.image_thumb.map((item, index) => {
											return (
													<Image style={styles.imgReview} key={index} source={require('../images/img_review_3.png')} />
											)})
										}
								</View>
							: null
							}
					</View>
				</View>
			);
    }

  render(){
    return (
			<View style={styles.container}>
				<Carousel
						data={this.props.data}
						renderItem={this._renderItem}
						sliderWidth={deviceWidth-15}
						itemWidth={325}
						inactiveSlideScale={1}
						activeSlideAlignment={'start'}
				/>
			</View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
			flex: 1
    },
    boxSlide: {
			width: 325
    },
    slide: {
			width: 310,
			borderWidth: 1,
			borderColor: 'rgb(232, 241, 249)',
			paddingTop: 17,
			paddingLeft: 18,
			paddingRight: 20,
			borderRadius: 2,
			paddingBottom: 22,
			backgroundColor: '#fff'
    },
    txtRoutine: {
			fontSize: 24,
			marginRight: 10,
			flex: 1,
			color: '#446EB6'
    },
    txtDate: {
			marginTop: 7,
			color: '#333333',
			fontSize: 14,
    },
    rating: {
			alignItems: "flex-start",
			flexDirection: 'row'
    },
    boxImage: {
			flexDirection: "row",
			justifyContent: 'flex-start',
			paddingTop: 10
    },
    imgReview: {
			width: 72,
			height: 72,
			borderRadius: 2,
			marginRight: 15
		},
		ctLine: {
			height: 1,
			backgroundColor: 'rgb(236, 238, 240)',
			marginTop: 8,
			marginBottom: 8
		},
});
module.exports = ReviewList;