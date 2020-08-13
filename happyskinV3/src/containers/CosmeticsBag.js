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
    Linking
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import ModalSearch from '../components/ModalSearch'

var Modal = require('react-native-modalbox');

import StarRating from 'react-native-star-rating';
import { Actions } from "react-native-router-flux";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../components/inventory/ScrollableTabBar';
import Producted from '../components/cosmeticsBag/Producted';
import Producting from '../components/cosmeticsBag/Producting';
import ProductSuggest from '../components/cosmeticsBag/ProductSuggest'
import Button from "react-native-button";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as cosmeticsActions from '../actions/cosmeticsActions';

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

class CosmeticsBag extends React.Component {
    constructor(props) {
			super(props);
			this.state = {
        input: '',
        openModal: false,
        openModalBuy: false,
        product: '',
			}
    }

    // componentWillReceiveProps(nextProps) {
    //   switch(nextProps.cosmetics.tab) {
    //     case 0:
    //       this.refs.Tabs.goToPage(2);
    //       return ;
    //     case 1:
    //       this.refs.Tabs.goToPage(1);
    //       return ;
    //   }
    // }
    
    openLink(product_id) {
      Linking.openURL('https://www.skinstore.vn/view-product/'+product_id);
    }
		
    render() {
			return (
				<View style={styles.container}>
          <View style={main.container}>
            <NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
              <NavButton onPress={() => Actions.pop()} style={main.navButton}>
                <Image style={{height: 12, width: 13}} source={require('../images/icons/ic_back_blue2.png')}/>
                <View>
                  <Text style={main.txtBack}>Hồ sơ làm đẹp</Text>
                </View>
              </NavButton>
            </NavBar>

						<View style={{flex: 1}}>
              <Text style={styles.consmeticBag}>Tủ mỹ phẩm</Text>
              <View style={styles.ctHeader}>
                <Image style={styles.bgBag} source={require('../images/bg_bag.png')}/>
                <Button 
                    containerStyle={{backgroundColor:"#fff",alignItems: 'flex-start', width: deviceWidth- 30, borderRadius:2, marginTop: 16, height: 48, justifyContent: 'center',}}
                    style={styles.input}
                    onPress={() => Actions.cosmeticsBagAdd()}>
                  <Image style={styles.icPlus} source={require('../images/icons/ic_plus_orange.png')}/>
                  Thêm sản phẩm mới
                </Button>
              </View>
              <View style={{flex: 1,paddingLeft: 15, paddingRight: 15,}}>
                <ScrollableTabView  renderTabBar={() => <ScrollableTabBar />}
                initialPage={0}
                ref="Tabs"
                tabBarBackgroundColor='white'
                tabBarInactiveTextColor='rgb(133, 142, 152)'
                tabBarActiveTextColor='rgb(51, 51, 51)'
                prerenderingSiblingsNumber={0}
                tabBarTextStyle={{fontSize: 14}}
                scrollWithoutAnimation={true}
                >
                <Producting product={this.state.product} tabLabel="ĐANG SỬ DỤNG" />
                <Producted  product={this.state.producted} tabLabel="ĐÃ SỬ DỤNG" />
                <ProductSuggest openModalBuy={(data) => this.setState({openModalBuy: true, product: data})} product={this.state.productSuggest} tabLabel="GỢI Ý" />
                </ScrollableTabView>
              </View>
            </View>
          </View>
          <Modal 
            style={styles.modal}
            isOpen={this.state.openModalBuy}
            swipeToClose={true}
            position="center"
            entry="bottom"
            animationDuration={200}
            backdropColor="#000"
            onClosed={()=> this.setState({openModalBuy: false}) }>
              <View style={styles.ctModal}>
                <Text style={{color: 'rgb(135, 80, 161)'}}>THÔNG BÁO</Text>
                <Text style={{color: 'rgb(41, 42, 57)',marginTop: 16, fontSize: 16}}>Bạn có muốn mua sản phẩm <Text style={{fontWeight: 'bold'}}>{this.state.product.name}</Text> trên Skin Store không?</Text>
                
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
                  <Image style={{height: 100, width: 100}} source={{uri: this.state.product.image_thumb+'_100x100.png'}} />
                  <View style={styles.rating}>
                    <StarRating
                      emptyStar={require('../images/icons/ic_start_old.png')}
                      fullStar={require('../images/icons/ic_star_ok.png')}
                      halfStar={require('../images/icons/ic_star_half.png')}
                      selectedStar={(rating) => this.setState({star: rating})}
                      maxStars={5}
                      rating={this.state.product.raty_score}
                      starSize={14}
                      margin={0}
                      starStyle={{marginRight: 4}}
                    />
                    <Text style={{marginTop: 5, color: 'rgb(41, 42, 57)', fontWeight: 'bold'}}>760.000đ <Text style={{color: 'rgb(200, 199, 204)',textDecorationLine: 'line-through'}}>800.000đ</Text></Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 34}}>
                  <Button 
                      onPress={() => this.openLink(this.state.product.skinstore_product_id)}
                      containerStyle={{paddingLeft: 15, paddingRight: 15, backgroundColor:"rgb(215, 53, 84)", borderRadius:4, height: 32, justifyContent: 'center', alignItems: 'center'}}
                      style={{color: '#fff', fontSize: 14}}>
                      <Image style={styles.icCart} source={require('../images/icons/ic_cart_white.png')}/>
                    Đặt mua
                  </Button>
                  <Button 
                      onPress={() => this.setState({openModalBuy: false})}
                      containerStyle={{backgroundColor:"#fff", marginLeft: 23, borderRadius:2, height: 32, justifyContent: 'center', alignItems: 'center'}}
                      style={{color: 'rgb(215, 53, 84)', fontSize: 14}}>
                    Bỏ qua
                  </Button>
                </View>
              </View>
          </Modal>
          <Modal 
            style={main.modal}
            isOpen={this.state.openModal}
            swipeToClose={true}
            position="top"
            entry="bottom"
            animationDuration={200}
            backdropColor="#000"
            onClosed={()=> this.setState({openModal: false}) }>
            <ModalSearch closeModal={() => this.setState({openModal: false})}/>
          </Modal>
				</View>
			);
    }
}

let main = require('../styles/Main');
const styles = StyleSheet.create({
  icCart: {
    height: 16, 
    width: 16,
    marginRight: 14,
  },
  ctModal: {
    padding: 35,
    flex: 1
  },
  modal: {
    backgroundColor: '#fff',
    height: deviceHeight - 200,
    width: deviceWidth - 30
  },
  input: {
    color: 'rgb(254, 117, 53)',
    fontWeight: 'bold',
    fontSize: 16
  },
  icPlus: {
    height: 12, 
    width: 12,
    margin: 12
  },
  bgBag: {
    height: 186,
    width: deviceWidth,
    position: 'absolute'
  },
  ctHeader: {
    height: 186,
    width: deviceWidth,
    alignItems: 'center',
    marginTop: 10
  },
  consmeticBag: {
    fontSize: 32, 
    color: 'rgb(215, 53, 84)',
    marginLeft: 15
  },
  container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	navTitle: {
    marginLeft: 15,
		color: 'rgb(215, 53, 84)',
		fontSize: 32,
		fontWeight: '400',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CosmeticsBag);
