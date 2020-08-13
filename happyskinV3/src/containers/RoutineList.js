import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight - 110;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;


const SLIDER_1_FIRST_ITEM = 0;
class RoutineList extends React.Component {
  constructor(){
    super();
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            slider1Ref: null
    }
    this.data = [
      {number: 1, title: 'Makeup Remover + Oil Cleanser', description: 'Sure, you could use your makeup remover on a cotton pad at night and call it a day, but that means you’ll most likely end up with black streaks…', textColor: '#7E7EA2', fontSize: 13},
      {number: 2, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
      {number: 3, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
      {number: 3, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
      {number: 3, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
      {number: 3, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
      {number: 3, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
      {number: 3, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
      {number: 3, title: 'Water-based Cleanser', description: 'It’s called double cleansing for a reason. Wash your face with a water-based cleanser to whisk...', textColor: '#7E7EA2', fontSize: 13},
    ]
  }

  _renderItem ({item, index}, parallaxProps) {
    return (
      <View style={styles.slideInnerContainer}>
        <View style={[styles.imageContainer]}>
          <View style={styles.boxImage}>
            <Image source={require('../images/thumb_routine.png')} style={styles.thumb_routine} />
          </View>
          <View style={styles.content}>
            <View style={styles.boxContent}>
              <Text style={styles.txtTitle}>Tạm biệt mụn đầu đen vĩnh viễn</Text>
              <Text style={styles.txtDescription}>Ai cũng biết là để tạo điểm nhấn cho gương mặt góc cạnh thì tạo khối là phương pháp làm nhanh và hiệu quả nhất. Tuy nhiên đâu phải ai cũng có thể rút ví chi một khoản tiền cực lớn để sở hữu những bảng tạo khối đắt xắt ra miếng đâu.</Text>
              <View style={styles.boxButton}>
                <View style={styles.boxButtonSkip}>
                  <Image source={require('../images/icons/ic_save_blue.png')} style={styles.iconClose} />
                  <Text style={styles.txtSave}>Save</Text>                   
                </View>
                <View style={styles.boxButtonDone}>
                  <Text style={styles.txtDone}>View Routine</Text>
                </View>
              </View>
            </View>
            <View style={styles.boxAuthor}>
              <Text style={styles.txtCoach}>Skin Coach</Text>
              <View style={styles.boxAuthorDetail}>
                <View style={styles.boxAvatar}>
                  <View style={styles.avatar}>
                    <Image source={require('../images/avatar_routine.png')} style={styles.avatar_routine} />
                  </View>
                  <View style={styles.boxInfo}>
                    <Text style={styles.txtUsername}>Siu Black</Text>
                    <Text style={styles.txtSkincare}>Expert in SkinCare</Text>
                  </View>
                </View>
                <View style={styles.boxSubscriber}>
                  <Text style={styles.txtSubscriber}>65 Subscriber</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.background}>
          <StatusBar
            backgroundColor="white"
            barStyle="light-content"
          />
          <View style={styles.boxCongrats}>
            <Text style={styles.txtCongrats}>Congrats</Text>
          </View>
          <Pagination
            dotsLength={this.data.length}
            activeDotIndex={this.state.slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={'rgba(255, 255, 255, 0.92)'}
            dotStyle={styles.paginationDot}
            inactiveDotColor={'#FFFFFF'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
            // inactiveDotStyle={{width: 8, height: 8, borderRadius: 4}}
            carouselRef={this.state.slider1Ref}
            tappableDots={!!this.state.slider1Ref}
          />
          <Carousel
            data={this.data}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem={SLIDER_1_FIRST_ITEM}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            enableMomentum={false}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            loop={true}
            loopClonesPerSide={2}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    backgroundColor: '#FE7535'
  },
  boxCongrats: {
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  txtCongrats: {
    fontSize: 17,
    color: '#000000'
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  boxImage: {
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  thumb_routine: {
    width: itemWidth,
    height: 128,
    resizeMode: 'cover'
  },
  content: {
    flex: 1
  },
  boxContent: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2E9E9',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    flex: 0.75
  },
  txtTitle: {
    fontSize: 24,
    color: '#333333',
    paddingBottom: 15,
  },
  txtDescription: {
    fontSize: 14,
    color: '#333333',
    paddingBottom: 48,
  },
  boxButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxButtonSkip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#446EB6'
  },
  iconClose: {
    width: 15,
    height: 16,
    marginRight: 10
  },
  txtSave: {
    fontSize: 18,
    color: '#446EB6'
  },
  boxButtonDone: {
    backgroundColor: '#446EB6',
    borderRadius: 100,
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    height: 40,
    justifyContent: 'center'
  },
  txtDone: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  boxAuthor: {
    flex: 0.25,
    paddingLeft: 15,
    paddingRight: 15,
  },
  txtCoach: {
    paddingTop: 5,
    color: '#D73554',
    fontSize: 12
  },
  boxAuthorDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxAvatar: {
    paddingTop: 5,
    alignItems: "flex-start",
    flexDirection: 'row',
  },
  avatar: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  avatar_routine: {
    width: 48,
    resizeMode: 'cover',
  },
  boxInfo: {
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
  },
  txtSubscriber: {
    color: '#9DA3B4',
    fontSize: 10
  },
  sliderContentContainer: {
  },
  paginationContainer: {
    paddingVertical: 8
  },
});



export default RoutineList;
