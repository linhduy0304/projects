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
    TextInput,
    Animated,
    InteractionManager,
    Linking
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var Modal = require('react-native-modalbox');

import ModalReview from './ModalReview'
import { TextField } from 'react-native-material-textfield';
import Button from "react-native-button";
import StarRating from 'react-native-star-rating';
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import TimeAgo from "react-native-timeago";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as cosmeticsActions from '../../actions/cosmeticsActions';

const actions = [
  cosmeticsActions
];
function mapStateToProps(state) {
  return {
    cosmetics: state.cosmetics,
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

class CosmeticsDetail extends React.Component {
    constructor(props) {
			super(props);
			this.state = {
        scrollY: new Animated.Value(0),
        openModal : false,
        action: '',
        comment: '',
        star: 0,
        showRelate: null,
        product: [
          {
            image_thumb: '',
            title: 'aaaa'
          }
        ],
			}
    }

    componentWillMount() {
      this.props.actions.loadDetailRequest();
    }
  
    componentDidMount() {
      timeout = setTimeout( () => {
      }, 12000);
      InteractionManager.runAfterInteractions(()=> {
        this.props.actions.loadDetail(this.props.id);
      })
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.cosmetics != this.props.cosmetics) {
        if(nextProps.cosmetics.showRelate) {
          this.setState({
            showRelate: true
          })
        }
      }
    }

    openLink(product_id) {
      Linking.openURL('https://www.skinstore.vn/view-product/'+product_id);
    }

    editReview() {
      this.setState({
        openModal: true,
        action: 'update'
      })
    }
    
    delete() {
      this.props.actions.productDelete(this.props.cosmetics.cmDetail.id)
    }

    update() {
      this.props.actions.productUpdate(this.props.cosmetics.cmDetail.id)
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
				<View style={styles.container}>
        <View style={main.container}>
          <ScrollView style={{ flex: 1,}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
            bounces={false}>
						<View style={{flex: 1, marginTop: 45}}>
              <View style={styles.header}>
                <Text style={styles.titleProduct}>{this.props.cosmetics.cmDetail.name}</Text>
                <Image style={{height: 135, width: 135}} source={{uri: this.props.cosmetics.cmDetail.image_thumb+'_100x100.png'}} />
              </View>
              <View style={styles.ctBegin}>
                <Text style={styles.txtBegin}>Ngày bắt đầu</Text>
                <Text style={styles.numBegin}>{this.props.cosmetics.cmDetail.time_start}</Text>
                {/* <Image style={{height: 11, width: 11}} source={require('../../images/icons/ic_pen_black.png')} /> */}
              </View>
              <View style={styles.ctBegin}>
                <Text style={styles.txtBegin}>Hạn dùng</Text>
                <Text style={[styles.numBegin, {fontWeight: '400'}]}>{this.props.cosmetics.cmDetail.expiry_date}</Text>
                {/* <Image style={{height: 11, width: 11}} source={require('../../images/icons/ic_pen_black.png')} /> */}
              </View>
              <View style={styles.ctBegin}>
                <Text style={styles.txtBegin}>Trạng thái</Text>
                <Text style={[styles.numBegin, {fontWeight: '400'}]}>{this.props.cosmetics.cmDetail.type}</Text>
                {/* <Image style={{height: 11, width: 11}} source={require('../../images/icons/ic_pen_black.png')} /> */}
              </View>
              {/* <View style={styles.ctNoteCoach}>
                <Text style={styles.txtNote}>LƯU Ý TỪ COACH</Text>
                {
                  this.state.notes.map((item, index) => {
                    return(
                      <View key={index} style={styles.ctItemNote}>
                        <Image style={styles.avatarCoach} source={{uri: item.avatar}} />
                        <View style={styles.ctContentNote}>
                          <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                              <Text style={styles.nameCoach}>{item.user_name}</Text>
                              <Text numberOfLines={1} style={styles.nameRoutine}>{item.name_routine}</Text>
                            </View>
                            <Image style={{height: 6, width: 6}} source={require('../../images/icons/ic_close_black2.png')} />
                          </View>
                          <Text style={styles.contentNote}>{item.content}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View> */}

              <View style={styles.ctUpdate}>
                <Text style={styles.txtUpdate}>CẬP NHẬT THÔNG TIN SẢN PHẨM</Text>
                <View style={{height: 1, backgroundColor: 'rgb(236, 238, 240)'}}/>
                {
                  this.props.cosmetics.cmDetail.skinstore_product_id != '' ?
                  <TouchableOpacity onPress={() => this.openLink(this.props.cosmetics.cmDetail.skinstore_product_id)} style={styles.ctBuy}>
                    <Image style={{height: 19, width: 22}} source={require('../../images/icons/ic_cart_blue.png')} />
                    <Text style={styles.txtBuy}>Đặt mua sản phẩm</Text>
                  </TouchableOpacity>
                : null
                }
                {
                  this.props.cosmetics.cmDetail.type == 'Đang không sử dụng' 
                  ? 
                    null 
                  :
                    this.props.cosmetics.fetchingUpdate ?
                      <View style={styles.ctBuy}>
                        <Image style={{width: 30, height: 30, marginRight: 15}} source={require('../../images/rolling.gif')} />
                        <Text style={{color: 'rgb(197, 172, 211)'}}>Đang cập nhật</Text>
                      </View>
                      :
                      <TouchableOpacity onPress={() => this.update()} style={styles.ctBuy}>
                        <Image style={{height: 22, width: 22}} source={require('../../images/icons/ic_out_product_blue.png')} />
                        <Text style={styles.txtBuy}>Tôi đã dùng hết sản phẩm này</Text>
                      </TouchableOpacity>
                }
                {
                  this.state.showRelate ? 
                    this.props.cosmetics.productRelate ?
                      <TouchableOpacity onPress={() => Linking.openURL('https://www.skinstore.vn/view-product/'+this.props.cosmetics.productRelate.skinstore_product_id)} style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                        <Image style={{height: 70, width: 70}} source={{uri: this.props.cosmetics.productRelate.image_thumb+'.png'}} />
                        <Text style={{color: '#4E76A2',fontSize: 16,marginLeft: 15}}>{this.props.cosmetics.productRelate.name}</Text>
                      </TouchableOpacity>
                    : null
                  : null
                }
                {
                  this.props.cosmetics.fetchingDelete ?
                  <View style={styles.ctBuy}>
                    <Image style={{width: 30, height: 30, marginRight: 15}} source={require('../../images/rolling.gif')} />
                    <Text style={{color: 'rgb(197, 172, 211)'}}>Đang xóa</Text>
                  </View>
                  : 
                  <TouchableOpacity onPress={() => this.delete()} style={styles.ctBuy}>
                    <Image style={{height: 22, width: 20}} source={require('../../images/icons/ic_trash_blue.png')} />
                    <Text style={styles.txtBuy}>Tôi không dùng sản phẩm này nữa</Text>
                  </TouchableOpacity>
                }
              </View>

              <View style={styles.ctReview}>
                <Text style={styles.txtReview}>REVIEW TỪ HAPPYSKIN</Text>
                {
                  this.props.cosmetics.cmDetail.author_raties ?
                    this.props.cosmetics.cmDetail.author_raties.length > 0 ?
                    this.props.cosmetics.cmDetail.author_raties.map((item, index) => {
                        return(
                        <TouchableOpacity onPress={() => Actions.exploreReview({id: this.props.id})} key={index} style={{flexDirection: 'row', paddingTop: 14, borderTopColor: 'rgb(236, 238, 240)', borderTopWidth: 1}}>
                          <Image style={styles.avatarCoach} source={{uri: item.author.avatar+'_200x200.png'}} />
                          <View style={{flex: 1}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                              <Text style={styles.nameCoach}>{item.author.name}</Text>
                              <Text style={{color: 'rgb(138, 138, 143)', fontSize: 12}}><TimeAgo time={item.created_at}/></Text>
                            </View>
                            {/* <View style={{flexDirection: 'row',marginTop: 3}}>
                              <StarRating
                                disabled={true}
                                emptyStar={require('../../images/icons/ic_start_old.png')}
                                fullStar={require('../../images/icons/ic_star_ok.png')}
                                halfStar={require('../../images/icons/ic_star_half.png')}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                maxStars={5}
                                rating={this.props.cosmetics.cmDetail.user_raty.raty_score}
                                starSize={14}
                                margin={0}
                                starStyle={{marginRight: 4}}
                              />
                            </View> */}
                            <Text style={{color: 'rgb(92, 92, 92)', marginTop: 4}}>{item.author_say}</Text>
                          </View>
                        </TouchableOpacity>
                        )
                      })
                    : <View><Text>Chưa có review nào từ Happy Skin</Text></View>
                  : null
                }
              </View> 
              
              
              <View style={styles.ctBtnReview}>
              <Text style={{color: 'rgb(135, 80, 161)', marginBottom: 12}}>REVIEW TỪ BẠN</Text>
              {
              this.props.cosmetics.cmDetail.user_raty ?
              <View style={{flexDirection: 'row', paddingTop: 14, borderTopColor: 'rgb(236, 238, 240)', borderTopWidth: 1}}>
                <Image style={styles.avatarCoach} source={{uri: this.props.cosmetics.cmDetail.user_raty.user.avatar+'_100x100.png'}} />
                <View style={{flex: 1}}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.nameCoach}>{this.props.cosmetics.cmDetail.user_raty.user.full_name}</Text>
                    <Text style={{color: 'rgb(138, 138, 143)', fontSize: 12}}><TimeAgo time={this.props.cosmetics.cmDetail.user_raty.created_at}/></Text>
                  </View>
                  <View style={{flexDirection: 'row',marginTop: 3}}>
                    <StarRating
                      disabled={true}
                      emptyStar={require('../../images/icons/ic_start_old.png')}
                      fullStar={require('../../images/icons/ic_star_ok.png')}
                      halfStar={require('../../images/icons/ic_star_half.png')}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      maxStars={5}
                      rating={this.props.cosmetics.cmDetail.user_raty.raty_score}
                      starSize={14}
                      margin={0}
                      starStyle={{marginRight: 4}}
                    />
                  </View>
                  <Text style={{color: 'rgb(92, 92, 92)', marginTop: 4}}>{this.props.cosmetics.cmDetail.user_raty.comment}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Button 
                        onPress={() => this.editReview()}
                        containerStyle={{paddingLeft: 15, paddingRight: 15, backgroundColor:"rgb(254, 117, 53)", marginTop: 13, borderRadius:4, height: 32, justifyContent: 'center', alignItems: 'center'}}
                        style={{color: '#fff', fontSize: 14}}>
                      Sửa đánh giá
                    </Button>
                    {
                      this.props.cosmetics.reviewDelete ?
                      <View style={styles.ctDelete}>
                        <Image style={{width: 30, height: 30, marginRight: 8}} source={require('../../images/rolling.gif')} />
                        <Text style={{color: 'rgb(197, 172, 211)'}}>Đang xóa</Text>
                      </View>
                      : 
                      <Button 
                          onPress={() => this.props.actions.reviewDelete(this.props.cosmetics.cmDetail.user_raty.id)}
                          containerStyle={{marginLeft: 18, backgroundColor:"#fff", marginTop: 13, borderRadius:2, height: 32, justifyContent: 'center', alignItems: 'center'}}
                          style={{color: 'rgb(254, 117, 53)', fontSize: 14}}>
                        Xóa đánh giá
                      </Button>
                    }
                  </View>
                </View>
              </View>
              : 
              <Button 
                  onPress={() => this.setState({openModal: true, action: ''})}
                  containerStyle={{backgroundColor:"rgb(254, 117, 53)", marginTop: 13, borderRadius:2, height: 48, justifyContent: 'center', alignItems: 'center'}}
                  style={styles.btnWrite}>
                Viết đánh giá sản phẩm
              </Button>
            }
            </View>
                
              
						</View>
          </ScrollView>

          {
            this.props.cosmetics.isFetching ?
            <View style={main.mainSpin1}>
              <Image style={main.imgLoading} source={require('../../images/rolling.gif')} />
            </View>
            : null
          }

          <Animated.View style={[main.navScroll,{opacity: navOpacity, transform: [{translateY: navTranslate}]}]}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
              <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back_blue2.png')}/>
                <Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Tủ mỹ phẩm</Text>
              </NavButton>
            </NavBar>
          </Animated.View>

          <Modal 
            style={styles.modal}
            isOpen={this.state.openModal}
            swipeToClose={true}
            position="center"
            entry="bottom"
            animationDuration={200}
            backdropColor="#000"
            onClosed={()=> this.setState({openModal: false}) }>
             <ModalReview action={this.state.action} closeModal={() => this.setState({openModal: false})} data={this.props.cosmetics.cmDetail}/>
          </Modal>
          </View>
				</View>
			);
    }
}

let main = require('../../styles/Main');
const styles = StyleSheet.create({
  ctDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    height: 32,
    paddingLeft: 15
  },
  input: {
    padding: 0,
    fontSize: 16
  },
  ctStar: {
    marginTop: 22,
    borderBottomColor: 'rgb(228, 232, 242)',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  ctModal: {
    padding: 35,
    flex: 1
  },
  rating: {
    marginTop: 10,
    flexDirection: 'row',
  },  rating: {
    marginTop: 10,
    flexDirection: 'row',
  },
  modal: {
    backgroundColor: '#fff',
    height: deviceHeight - 150,
    width: deviceWidth - 30
  },
  btnWrite: {
    color: '#fff',
    fontSize: 14
  },
  ctBtnReview: {
    paddingTop: 22,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 17
  },
  txtReview: {
    color: 'rgb(135, 80, 161)',
    // marginLeft: 15,
  },
  ctReview: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 238, 240)',
    paddingTop: 26,
    paddingBottom: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
  txtBuy: {
    fontSize: 15,
    color: 'rgb(51, 51, 51)',
    marginLeft: 13
  },
  ctBuy: {
    flexDirection: 'row',
    borderBottomColor: 'rgb(236, 238, 240)',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    height: 56,
    alignItems: 'center'
  },
  txtUpdate: {
    color: 'rgb(135, 80, 161)',
    margin: 15,
  },
  contentNote: {
    color: 'rgb(92, 92, 92)',
    marginTop: 5,
  },
  nameRoutine: {
    color: 'rgb(135, 155, 206)',
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    fontWeight: '400'
  },
  nameCoach: {
    fontWeight: 'bold',
    color: 'rgb(68, 110, 182)'
  },
  avatarCoach: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 20
  },
  ctContentNote: {
    flex: 1
  },
  ctItemNote: {
    borderColor: 'rgb(232, 241, 249)',
    borderRadius: 2,
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    marginTop: 16
  },
  txtNote: {
    color: 'rgb(135, 80, 161)'
  },
  ctNoteCoach: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 16,
    paddingBottom: 20,
  },
  numBegin: {
    fontSize: 15,
    color: 'rgb(41, 42, 57)',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 45,
  },
  txtBegin: {
    fontSize: 15,
    width: 100,
    color: 'rgb(138, 138, 143)'
  },
  ctBegin: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 238, 240)',
  },
  titleProduct: {
    fontSize: 24,
    color: 'rgb(31, 32, 39)',
    flex: 1,
    marginRight: 5,
    fontWeight: 'bold'
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 238, 240)',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  container: {
		flex: 1,
		backgroundColor: '#fff'
  },
  navBarWhite: {
    backgroundColor: '#fff',
    padding: 0,
    height: 44,
    width: windowSize.width,
    justifyContent: 'flex-end',
    borderBottomColor: "transparent"
  },
	navTitle: {
    marginLeft: 15,
		color: 'rgb(215, 53, 84)',
		fontSize: 32,
		fontWeight: '400',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CosmeticsDetail);
