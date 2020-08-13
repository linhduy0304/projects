/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  InteractionManager,
  Dimensions
} from 'react-native';

import NavBar, { NavButton, NavGroup, NavTitle } from 'react-native-nav';
import { Actions } from "react-native-router-flux";
import Button from "react-native-button";
import NoInternet from '../../components/NoInternet'
// //import RNFirebase from 'react-native-firebase';
import RNFirebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
let css = require('../../Css');
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as exploreActions from '../../actions/exploreActions';

const actions = [
  exploreActions,
];
function mapStateToProps(state) {
  return {
    explore: state.explore,
    tab: state.tab
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

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      avatar: 'http://static.ipick.vn/images/postCategories/khoi-nghiep_993fP7.png',
      
    }
  }

  componentWillMount() {
    this.props.actions.exploreRequest();
    var firebase = RNFirebase.initializeApp({ debug: false });
    firebase.analytics().logEvent("Explore_Screen");
  }

  componentDidMount() {
    timeout = setTimeout( () => {
    }, 1000);
    InteractionManager.runAfterInteractions(()=> {
      this.props.actions.explore();
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tab.category) {
      this.refs.list.scrollTo({x: 0, y: 0, animated: true})
    }
  }
  

  like(category) {
    if(category.is_like === 0 && this.props.explore.explore.favoritecategories.length > 11) {
      Toast.show('Bạn chỉ được chọn tối đa 12 chủ đề yêu thích.')
      return;
    }
    this.props.actions.pickCategory(category);
  }
 
  render() {
    return (
      <View style={css.container}>
        <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
          <NavGroup>
            <NavButton onPress={() => Actions.pop()} style={css.navBack}  >
              <Image source={require('../../images/icons/ic_search_blue.png')} />
            </NavButton>
              <TextInput
                style={{padding: 0,fontSize: 15, flex: 1,color: 'rgb(31, 42, 53)', marginLeft: 5}}
                placeholder="Chạm để tìm kiếm hoặc xem chủ đề"
                underlineColorAndroid="transparent"
                placeholderTextColor="rgb(194, 197, 208)"
                onChangeText={(search) => this.setState({search: search})}
                value={this.state.search}
                autoCapitalize="none"
              />
          </NavGroup>
        </NavBar>

        <NoInternet />
        
        <ScrollView
          ref='list'
          bounces={false}
          keyboardShouldPersistTaps={'always'}>
          <View style={styles.ctTitle}>
            <Text style={styles.txtTitle}>CHỦ ĐỀ YÊU THÍCH</Text>
          </View>
          {
            this.props.explore.isFetching ? 
            <View style={{width: deviceWidth, alignItems: 'center', margin: 15}}>
              <Image style={{width: 50, height: 50}} source={require('../../images/loading_1.gif')} />
            </View>
            :
            this.props.explore.explore ?
              this.props.explore.explore.favoritecategories.length !== 0 ?
                this.props.explore.explore.favoritecategories.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() =>  Actions.category({category: item})} style={styles.ctItem}>
                      <Image style={styles.avatar} source={{uri: item.image_thumb + '_100x100.png'}} />
                      <Text style={styles.txtItem}>{item.title}</Text>
                      <TouchableOpacity onPress={() => this.like(item)} style={{padding: 7}}>
                        <Image style={styles.icLike} source={require('../../images/icons/ic_picked.png')} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )
                })
              : 
              <View style={{alignItems: 'center'}}>
                <Text style={{margin: 15}}>Bạn chưa thích chủ đề nào</Text>
              </View>
            : null
          }

          <View style={styles.ctTitle}>
            <Text style={styles.txtTitle}>CÁC CHỦ ĐỀ</Text>
          </View>
          {
            this.props.explore.isFetching ? 
             <View style={{width: deviceWidth, alignItems: 'center', margin: 15}}>
               <Image style={{width: 50, height: 50}} source={require('../../images/loading_1.gif')} />
             </View>
             :
            this.props.explore.explore ?
              this.props.explore.explore.categories.length !== 0 ?
                this.props.explore.explore.categories.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() =>  Actions.category({category: item})} style={styles.ctItem}>
                      <Image style={styles.avatar} source={{uri: item.image_thumb + '_100x100.png'}} />
                      <Text style={styles.txtItem}>{item.title}</Text>
                      <TouchableOpacity onPress={() => this.like(item)} style={{ padding: 7}}>
                        <Image source={require('../../images/icons/ic_pichup_blank.png')} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )
                })
              : null
            : null  
          }
        </ScrollView>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  txtItem: {
    flex: 1,
    color: 'rgb(0, 0, 0)',
    marginLeft: 30
  },
  avatar: {
    height: 38, 
    width: 38,
    borderRadius: 19
  },
  ctItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5
  },
  ctTitle: {
    backgroundColor: 'rgb(237, 239, 241)',
    padding: 15,
  },
  txtTitle: {
    color: 'rgb(27, 48, 70)',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Explore);


