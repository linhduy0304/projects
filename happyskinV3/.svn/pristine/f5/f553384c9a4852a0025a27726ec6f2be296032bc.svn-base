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
  Platform,
  Animated,
  InteractionManager,
  Linking
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
var DeviceInfo = require('react-native-device-info');
var Spinner = require('react-native-spinkit');
var Modal = require('react-native-modalbox');
var ScrollableTabView = require('react-native-scrollable-tab-view');

import BoxCoach from '../components/magazine/BoxCoach'
import DefaultTabBar from '../components/home/DefaultTabBar';
import ModalSearch from '../components/ModalSearch'
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'; 
import ReviewList from '../components/ReviewList'
import TimeAgo from 'react-native-timeago';
import ReviewRoutine from "../components/ReviewRoutine";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as homeActions from '../actions/homeActions';
import * as routineActions from '../actions/routineActions';

const actions = [
  homeActions,
  routineActions
];
function mapStateToProps(state) {
  return {
    profile: state.profile,
    home: state.home,
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

class Home extends React.Component {
  constructor(props) {
    super()
    this.state = {
      scrollY: new Animated.Value(0),
      openModal: false,
      hi: 'Hi Tammy, bạn chưa làm bài Kiểm tra Da, hãy dành chút thời gian để xác định nhóm da của mình nhé.',
      hotDeal: {
        image: 'https://statics.happyskin.vn/images/hotDebates/82cf584b528cc1320285f19f3610ea86/bha-aha-da-nao-thi-nen-su-dung_2mAG8x.png',
        title: 'BEUINS',
        sale: 'GIẢM GIÁ TỚI 30%',
      },
      active: 1,
      
    }
  }
  componentWillMount() {
    this.props.actions.homeRequest();
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 1000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.home();
      this.props.actions.hotDeal();
    })
  }

  renderBeauty(type, routine) {
    switch(type) {
      case '':
        return (
          <View style={styles.ctBeauty}>
            <Text style={styles.txtBeauty}>Beauty Profile</Text>
            <View style={styles.ctContent}>
              <View style={{flex: 1}}>
                <Text numberOfLines={4} style={styles.txtHi}>{this.state.hi}</Text>
                <Button 
                  containerStyle={{backgroundColor:"rgb(41, 42, 57)", borderRadius: 2, height: 48,  marginBottom:15,marginRight: 5, alignItems: 'center', justifyContent: 'center'}}
                  style={styles.txtBuy}
                  onPress={() => Actions.skinTest()}
                  >
                  Làm bài kiểm tra Da
                </Button>
              </View>
              <Image style={{width: 193*204/304, height: 193}} source={require('../images/lg_skintest.png')} />
            </View>
          </View>
        );
      default:
        if(routine !== 0) {
          return (
            <View style={[styles.ctBeautySkin, {paddingRight: 15}]}>
              <Text style={styles.txtBeauty}>Hồ sơ làm đẹp</Text>
              <Text style={{color: '#fff', marginTop: 10}}>Bạn thuộc nhóm da</Text>
              <Text style={styles.typeSkin}>{this.props.profile.currentUser.skintest ? this.props.profile.currentUser.skintest : ''}</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <TouchableOpacity onPress={() => Actions.skinResult({skinType: this.props.profile.currentUser.skintest})} style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: '#fff', marginRight: 7}}>XEM THÔNG TIN VỀ {this.props.profile.currentUser.skintest ? this.props.profile.currentUser.skintest : ''}</Text>
                  <Image style={{height: 9, width: 9*18/27}} source={require('../images/icons/ic_arrow_next_white_2.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.boxRoutine}>
                <Text style={{color: '#FFFFFF', fontSize: 16, marginRight: 10}}>Bạn hiện đang tham gia {routine} liệu trình</Text>
              </View>
              {
                this.props.home.home.routine_joining?
                this.props.home.home.routine_joining.map((item, index) => {
                  return(
                    <ReviewRoutine routineSave={((id) => this.props.actions.routineSave(id))} fetchingLoad={this.props.routine.fetchingLoad} routineJoin={(id, image_thumb, title) => this.props.actions.routineJoin(id, image_thumb, title)} key={index} data={item.routine}/>
                  )
                }) : null
              }
            </View>
          );
        }else{
          return (
            <View style={[styles.ctBeautySkin, {paddingBottom: 0}]}>
              <Text style={styles.txtBeauty}>Hồ sơ làm đẹp</Text>
              <Text style={{color: '#fff', marginTop: 10}}>Bạn thuộc nhóm da</Text>
              <Text style={styles.typeSkin}>{this.props.profile.currentUser.skintest ? this.props.profile.currentUser.skintest : ''}</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <TouchableOpacity onPress={() => Actions.skinResult({skinType: this.props.profile.currentUser.skintest})} style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: '#fff', marginRight: 7}}>XEM THÔNG TIN VỀ {this.props.profile.currentUser.skintest ? this.props.profile.currentUser.skintest : ''}</Text>
                  <Image style={{height: 9, width: 9*18/27}} source={require('../images/icons/ic_arrow_next_white_2.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.hr}></View>
              <Text style={{color: '#fff', marginTop: 28}}>Liệu trình gợi ý</Text>
              <View style={{marginTop: 8}}>
                <View style={{flexDirection: 'row', borderBottomColor: '#fff', borderBottomWidth: 1}}>
                  <TouchableOpacity style={this.state.active == 1 ? styles.ctActive : styles.ctInActive} onPress={() => this.setState({active: 1})}>
                    <Text style={this.state.active == 1 ? styles.txtActive : styles.txtInActive}>MỚI NHẤT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={this.state.active == 2 ? styles.ctActive : styles.ctInActive} onPress={() => this.setState({active: 2})}>
                    <Text style={this.state.active == 2 ? styles.txtActive : styles.txtInActive}>PHỔ BIẾN NHẤT</Text>
                  </TouchableOpacity>
                </View>
                {
                  this.state.active == 1 ?
                    <View style={{paddingRight: 15}}>
                      {
                        this.props.home.home ?
                          this.props.home.home.routine_new.length == 0 ?
                            <View>
                              <Text>Chưa có liệu trình mới nào</Text>
                            </View>
                            :
                            this.props.home.home.routine_new.map((item, index) => {
                              return (
                                <ReviewRoutine key={index} data={item}/>
                              )
                            })
                          : null
                      }
                    </View>
                  :
                  <View style={{paddingRight: 15}}>
                  {
                    this.props.home.home ?
                      this.props.home.home.routine_common.length == 0 ?
                        <View>
                          <Text>Chưa có liệu trình mới nào</Text>
                        </View>
                        :
                        this.props.home.home.routine_common.map((item, index) => {
                          return (
                            <ReviewRoutine data={item}/>
                          )
                        })
                      : null
                  }
                </View>
                }

              </View>
              <View style={styles.ctMoreRoutine}>
                <Button 
                    containerStyle={{width: deviceWidth- 70, backgroundColor:"#fff",  borderRadius:4, height: 48, justifyContent: 'center', alignItems: 'center'}}
                    style={{color: 'rgb(254, 117, 53)', fontSize: 16}}>
                    Xem thêm liệu trình dành cho bạn
                </Button>
              </View>
            
            </View>
          );
        }
    }
    
  }

  openModal(action) {
    this.setState({
      openModal: action
    })
  }

  openLink(slug) {
    Linking.openURL('https://www.skinstore.vn/product/'+slug);
  }

  render() {
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
        <View style={[main.container]}>
          <ScrollView 
          style={{ flex: 1,}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          bounces={false}
          onMomentumScrollEnd={(e) => {
          }}
          onTouchEnd={(e)=>{
          }}>
          <View style={{flex: 1, marginTop: 45}}>
            <Text style={styles.txtToday}>Thời tiết hôm nay sẽ nhiều sương mù, có thể bạn sẽ cần thoa kem dưỡng ẩm trước khi ra khỏi nhà đấy.</Text>
            {
              this.props.home.home ? 
              this.renderBeauty(this.props.profile.currentUser.skintest, this.props.home.home.total_routine)
              : null
            }
            <View style={styles.boxCoach}>
              <View style={styles.boxSuggest}>
                <Text style={styles.txtSkinDiary}>Gợi ý Coach</Text>
              </View>
              {
                this.props.home.home.coaches ?
                  this.props.home.home.coaches.map((item, index) => {
                    return (
                      <BoxCoach key={index} data={item}/>
                    )
                  })
                : null
              }
              
            </View>

            <View style={styles.ctSkinDiary}>
              <Text style={styles.txtSkinDiary}>Spa Booking</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => Actions.spaBooking()} style={{backgroundColor: 'rgb(68, 110, 182)',marginTop: 20, height: 48,borderRadius: 4, paddingLeft: 25, paddingRight: 25, justifyContent: 'center'}}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Đặt lịch</Text>
                </TouchableOpacity>
              </View>

            </View>

            <View style={styles.ctSkinDiary}>
              <Text style={styles.txtSkinDiary}>Skin Diary</Text>
              <Text style={styles.txtFeel}>Da bạn hôm nay thế nào ?</Text>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
                <View style={{ flexDirection: 'row'}}>
                  <View style={{paddingTop: 20, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => Actions.skinDiary({skinDiary: this.props.home.home.skindiary})} style={styles.ctPhoto}>
                      <Image style={styles.icAdd} source={require('../images/icons/ic_plus.png')}/>
                      <Image style={styles.icCamera} source={require('../images/icons/ic_camera_white_2.png')}/>
                    </TouchableOpacity>
                    <Text style={{color: 'rgb(51, 51, 51)', marginTop: 16}}>Today?</Text>
                  </View>
                  {
                    this.props.home.home.skindiary ?
                    this.props.home.home.skindiary.length !== 0 ?
                        this.props.home.home.skindiary.map((item, index) => {
                          return(
                            <View key={index} style={{paddingTop: 20, alignItems: 'center', marginLeft: 24}}>
                              <View style={styles.ctAvatarSkinDiary}>
                                <Image style={styles.avatarSkinDiary} source={item.image_thumb ? {uri: item.image_thumb+'.png'} : require('../images/avatar.png')} />
                              </View>
                              
                              <Text style={{color: 'rgb(51, 51, 51)', marginTop: 16}}><TimeAgo time={item.created_at} /></Text>
                            </View>
                          )
                        })
                    : null : null
                  }
                </View>
              </ScrollView>

            </View>
            <View style={styles.ctHotDeal}>
              <Image style={styles.imgHotDeal} source={require('../images/bg_routine.png')} />
              <Text style={styles.txtHotDeal}>HOT DEAL</Text>
              <Text style={styles.nameHotDeal}>{this.state.hotDeal.title}</Text>
              <Text style={styles.txtSale}>{this.state.hotDeal.sale}</Text>
              <Button 
                containerStyle={{backgroundColor:"rgb(68, 110, 182)", borderRadius: 2, height: 48, width: 170, marginTop: 16, alignItems: 'center', justifyContent: 'center'}}
                style={styles.txtBuy}
                >
                Xem & Mua ngay
              </Button>
            </View>
            <View style={styles.ctCosmetics}>
              <Text style={styles.txtCosmetics}>Tủ mỹ phẩm</Text>
              
              {
                this.props.home.home.productsUsing ?
                  this.props.home.home.productsUsing.length == 0 ?
                  <View style={styles.ctCosmeticsEmpty}>
                    <Image style={{position: 'absolute', width: deviceWidth- 30, height: deviceWidth- 30}} source={require('../images/back_ground_cosmetics.png')} />
                    <Text style={styles.txtCosmeticEmpty}>Bạn chưa có sản phẩm nào trong tủ mỹ phẩm.</Text>
                    <Text style={styles.txtCosmeticEmpty}>Hãy cập nhật sản phẩm để theo dõi việc chăm sóc da của mình</Text>
                    <TouchableOpacity onPress={()=> Actions.cosmeticsBag()} style={[styles.ctAddProduct1]}>
                      <Image style={{height: 12, width: 12}} source={require('../images/icons/ic_plus_white.png')} />
                      <Text style={[styles.txtAddProduct, {fontSize: 16}]}>Thêm sản phẩm mới</Text> 
                    </TouchableOpacity>
                  </View>
                  :
                  <View>
                    <Text style={styles.txtProduct}>Bạn đang sử dụng {this.props.home.home.productsUsing ? this.props.home.home.productsUsing.length : '0'} sản phẩm</Text>
                    <View style={styles.ctListProduct}>
                      {
                        this.props.home.home.productsUsing ?
                        this.props.home.home.productsUsing.map((item, index) => {
                          return(
                            <Image key={index} style={{borderRadius: 4, marginLeft: 10,marginTop: 10, height: (deviceWidth-70)/3, width:  (deviceWidth-70)/3}} source={{uri: item.image_thumb+ '.png'}}/>
                          )
                        })
                        : null
                      }
                      <TouchableOpacity onPress={()=> Actions.cosmeticsBag()} style={styles.ctAddProduct}>
                        <Image style={{height: 12, width: 12}} source={require('../images/icons/ic_plus_white.png')} />
                        <Text style={styles.txtAddProduct}>Bạn mới có sản phẩm mới ?</Text> 
                      </TouchableOpacity>
                    </View>
                  </View>
                : null
              }
              
            </View>
            {
              this.props.profile.currentUser ?
              this.props.profile.currentUser.skintest != '' ?
              <View style={styles.ctDeals}>
                <Text style={styles.txtDeals}>Ưu đãi Hot</Text>
                {
                  this.props.home.hotDeal ?
                  this.props.home.hotDeal.map((item, index) => {
                    return (
                      <TouchableOpacity onPress={() => this.openLink(item.slug)} key={index} style={styles.ctItemDeals}>
                        <Image style={{height: 100, width: 100}} source={{uri: item.image_thumb+ '.png'}} />
                        <View style={{flex: 1}}>
                          <Text style={styles.txtTitleDeals}>{item.name}</Text>
                          <View style={{flexDirection: 'row', marginTop: 3}}>
                            <Text style={styles.priceNew}>{item.price_min}</Text>
                            <Text style={styles.priceOld}>{item.price}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }) : null
                }
              </View>
              : null : null
            }
            
          </View>
        </ScrollView>
      {
        this.props.home.isFetching ?
        <View style={main.mainSpin1}>
          <Image style={main.imgLoading} source={require('../images/rolling.gif')} />
        </View>
        : null
      }
      
          
        <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
          <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
            <NavTitle style={styles.navTitle}>
              {'Today Tips'}
            </NavTitle>
            <NavButton onPress={() => this.openModal(true)} style={main.navSave}  >
              <Image style={{height: 16, width: 16}} source={require('../images/icons/ic_search_black.png')} />
            </NavButton>
          </NavBar>
        </Animated.View>
      </View>
      <Modal 
        style={main.modal}
        isOpen={this.state.openModal}
        swipeToClose={true}
        position="top"
        entry="bottom"
        animationDuration={200}
        backdropColor="#000"
        onClosed={()=> this.openModal(false) }>
        <ModalSearch closeModal={() => this.openModal(false)}/>
      </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctMoreRoutine: {
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 2,
    padding: 15,
    marginTop: 24,
  },
  ctActive: {
    borderBottomWidth:2,
    borderBottomColor: '#fff',
    paddingBottom: 17,
    paddingTop: 5,
    padding: 10,
  },
  ctInActive: {
    paddingBottom: 17,
    paddingTop: 5,
    padding: 10,
  },
  txtActive: {
    color: '#fff',
    fontWeight: 'bold'
  },
  txtInActive: {
    color: '#fff'
  },
  txtCosmeticEmpty: {
    color: 'rgb(68, 110, 182)',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'transparent'
  },
  ctCosmeticsEmpty: {
    width: deviceWidth- 30,
    height: deviceWidth - 30,
    borderRadius: 2,
    justifyContent: 'flex-end',
    marginTop: 16
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 20 : DeviceInfo.getSystemVersion().slice(0, 1) != 4 ? 20 : 0,
  },
  navTitle: {
    paddingLeft: Platform.OS === 'ios' ? 7 : 15,
    color: 'rgb(68, 110, 182)',
    fontWeight: '400'
  },
  txtToday: {
    color: '#333333',
    marginLeft: 15, 
    marginRight: 15,
    fontSize: 14
  },
  ctBeauty: {
    backgroundColor: 'rgb(215, 53, 84)',
    paddingLeft: 15,
    paddingTop: 8,
    marginTop: 5,
  },
  ctBeautySkin: {
    backgroundColor: 'rgb(215, 53, 84)',
    paddingLeft: 15,
    paddingTop: 8,
    marginTop: 5,
    paddingBottom: 30
  },
  txtBeauty: {
    color: '#fff',
    fontSize: 32
  },
  txtHi: {
    fontSize: 16,
    color: '#fff',
    marginTop: 25,
    flex: 1, 
    marginRight: 5
  },
  ctContent: {
    flexDirection: 'row',
    marginTop: 41,
  },
  ctSkinDiary: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 39
  },
  txtSkinDiary: {
    color: 'rgb(41, 42, 57)',
    fontSize: 32,
  },
  txtFeel: {
    marginTop: 8,
    color: 'rgb(51, 51, 51)'
  },
  ctPhoto: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgb(197, 172, 211)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icCamera: {
    height: 17,
    width: 17*66/51,
  },
  icAdd: {
    position: 'absolute',
    height: 29,
    width: 29,
    right: 0,
    bottom: 0,
  },
  ctHotDeal: {
    height: 250,
    width: deviceWidth,
    paddingLeft: 15,
  },
  txtHotDeal: {
    color: 'rgb(135, 80, 161)',
    marginTop: 26,
    backgroundColor: 'transparent'
  },
  txtSale: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'transparent'
  },
  nameHotDeal: {
    fontSize: 32,
    color: '#fff',
    marginTop: 60,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  imgHotDeal: {
    height: 250,
    width: deviceWidth,
    position: 'absolute'
  },
  txtBuy: {
    color: '#fff',
    fontSize: 16
  },
  ctCosmetics: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 40,
    borderBottomColor: 'rgb(236, 238, 240)',
    borderBottomWidth: 1
  },
  txtCosmetics: {
    fontSize: 23,
    color: 'rgb(41, 42, 57)'
  },
  txtProduct: {
    color: 'rgb(51, 51, 51)',
    marginTop: 8
  },
  ctListProduct: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'rgba(135, 155, 206, 0.2)',
    borderRadius: 2,
    marginTop: 15,
    paddingBottom: 10
  },
  ctAddProduct1: {
    backgroundColor: 'rgba(227, 0, 82, 0.4)',
    height: 48,
    width: deviceWidth-30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 15,
  },
  ctAddProduct: {
    backgroundColor: 'rgba(227, 0, 82, 0.4)',
    position: 'absolute',
    bottom: 0,
    height: 48,
    width: deviceWidth-30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  txtAddProduct: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10
  },
  ctDeals: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 20
  },
  ctItemDeals: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  txtDeals: {
    color: 'rgb(41, 42, 57)',
    fontSize: 32,
  },
  txtTitleDeals: {
    color: '#4E76A2',
    fontSize: 16,
    paddingBottom: 5,
  },
  priceNew: {
    color: '#292A39',
    fontSize: 14,
  },
  priceOld: {
    flex: 1,
    marginLeft: 5,
    color: '#C8C7CC',
    textDecorationLine : 'line-through',
    fontSize: 14
  },
  typeSkin: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold'
  },
  avatarSkinDiary: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  ctAvatarSkinDiary: {
    borderColor: 'rgb(247, 107, 28)',
    borderWidth: 1,
    height: 88,
    width: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hr: {
    height: 4,
    backgroundColor: '#CE2949',
    width: deviceWidth - 30,
    marginTop: 15,
  },

  boxRoutine: {
    paddingTop: 30
  },
  boxCoach: {
    paddingLeft: 15,
  },
  boxSuggest: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  boxListCoach: {
    marginBottom: 15,
    marginTop: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEEF0',
    borderTopWidth: 1,
    borderTopColor: '#ECEEF0'
  },
  boxImageCoach: {
    width: 85,
    paddingRight: 15,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    overflow: 'hidden'
  },
  bgCoach: {
    width: 70,
    height: 193
  },
  imgAvatar: {
    position: 'absolute',
    top: 15,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#FFFFFF',
    borderWidth: 4
  },
  boxInfoCoach: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 5,
    paddingTop: 20
  },
  txtNameCoach: {
    fontSize: 20,
    color: '#000000',
    paddingBottom: 10,
  },
  txtRoleCoach: {
    color: '#D73554',
    fontSize: 14,
    paddingBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  boxFollow: {
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center'
  },
  icFollow: {
    width: 11,
    height: 12,
  },
  txtCount: {
    color: '#879BCE',
    fontSize: 13,
    paddingLeft: 5
  },
  boxLike: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icLike: {
    width: 11,
    height: 12
  },
  txtDesCoach: {
    color: '#333333',
    fontSize: 15,
  },
});
let theme = require('../styles/Theme');
let main = require('../styles/Main');
export default connect(mapStateToProps, mapDispatchToProps)(Home);
